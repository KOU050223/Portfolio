import { XMLParser } from "fast-xml-parser";

export type ArticleSource = {
  name: string;
  profileUrl: string;
  feedUrl: string;
  format: "rss" | "atom";
};

export type Article = {
  title: string;
  url: string;
  publishedAt: string;
  source: string;
};

export const ARTICLE_SOURCES: ArticleSource[] = [
  {
    name: "Qiita",
    profileUrl: "https://qiita.com/KOU050223",
    feedUrl: "https://qiita.com/KOU050223/feed",
    format: "atom",
  },
  {
    name: "note",
    profileUrl: "https://note.com/kou050223",
    feedUrl: "https://note.com/kou050223/rss",
    format: "rss",
  },
  {
    name: "sizu.me",
    profileUrl: "https://sizu.me/uomi",
    feedUrl: "https://sizu.me/uomi/rss",
    format: "rss",
  },
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

function asArray<T>(value: T | T[] | undefined): T[] {
  return value === undefined ? [] : Array.isArray(value) ? value : [value];
}

function validArticle(title: unknown, url: unknown, publishedAt: unknown, source: ArticleSource) {
  if (typeof title !== "string" || !title.trim()) return null;
  if (typeof url !== "string" || typeof publishedAt !== "string") return null;
  if (Number.isNaN(Date.parse(publishedAt))) return null;

  try {
    const articleUrl = new URL(url);
    if (
      articleUrl.protocol !== "https:" ||
      articleUrl.hostname !== new URL(source.profileUrl).hostname
    ) {
      return null;
    }
  } catch {
    return null;
  }

  return { title: title.trim(), url, publishedAt, source: source.name };
}

export function parseArticles(xml: string, source: ArticleSource): Article[] {
  const data = parser.parse(xml);

  if (source.format === "rss") {
    return asArray(data?.rss?.channel?.item)
      .map((item) => validArticle(item.title, item.link, item.pubDate, source))
      .filter((article): article is Article => article !== null);
  }

  return asArray(data?.feed?.entry)
    .map((entry) => {
      const alternate = asArray(entry.link).find((link) => link?.rel === "alternate");
      return validArticle(entry.title, alternate?.href, entry.published, source);
    })
    .filter((article): article is Article => article !== null);
}

async function fetchFeed(url: string): Promise<Response> {
  return fetch(url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) });
}

export async function getLatestArticles(
  sources: ArticleSource[] = ARTICLE_SOURCES,
  fetcher: (url: string) => Promise<Response> = fetchFeed,
  limit = 6,
): Promise<Article[]> {
  const results = await Promise.allSettled(
    sources.map(async (source) => {
      const response = await fetcher(source.feedUrl);
      if (!response.ok) return [];
      return parseArticles(await response.text(), source);
    }),
  );

  const perSourceLimit = Math.ceil(limit / sources.length);

  return results
    .flatMap((result) =>
      result.status === "fulfilled"
        ? result.value
            .toSorted((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
            .slice(0, perSourceLimit)
        : [],
    )
    .toSorted((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, limit);
}
