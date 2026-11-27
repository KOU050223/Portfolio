import { XMLParser } from "fast-xml-parser";

type Fetcher = (url: string) => Promise<Response>;

export type ArticleSource = {
  name: string;
  profileUrl: string;
  feedUrl: string;
  format: "rss" | "atom";
  enrich?: (articles: Article[], fetcher: Fetcher) => Promise<Article[]>;
};

export type Article = {
  title: string;
  url: string;
  publishedAt: string;
  source: string;
  tags: string[];
  imageUrl?: string;
};

// Qiita のフィードにはタグが含まれないため、公開 API からタグだけを補足する。
// API が失敗・レート制限でも記事自体はタグなしで表示できるよう、フィードを正としている。
async function enrichQiitaTags(articles: Article[], fetcher: Fetcher): Promise<Article[]> {
  try {
    const response = await fetcher("https://qiita.com/api/v2/users/KOU050223/items?per_page=20");
    if (!response.ok) return articles;
    const items: unknown = await response.json();
    if (!Array.isArray(items)) return articles;

    const tagsByUrl = new Map<string, string[]>();
    for (const item of items) {
      if (typeof item?.url !== "string" || !Array.isArray(item?.tags)) continue;
      const tags = item.tags
        .map((tag: unknown) => (tag as { name?: unknown })?.name)
        .filter((name: unknown): name is string => typeof name === "string" && name !== "");
      tagsByUrl.set(item.url, tags);
    }

    return articles.map((article) => {
      const tags = tagsByUrl.get(article.url);
      return tags ? { ...article, tags } : article;
    });
  } catch {
    return articles;
  }
}

export const ARTICLE_SOURCES: ArticleSource[] = [
  {
    name: "Qiita",
    profileUrl: "https://qiita.com/KOU050223",
    feedUrl: "https://qiita.com/KOU050223/feed",
    format: "atom",
    enrich: enrichQiitaTags,
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

function validImageUrl(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.startsWith("https://")) return undefined;
  try {
    new URL(value);
    return value;
  } catch {
    return undefined;
  }
}

function validArticle(
  title: unknown,
  url: unknown,
  publishedAt: unknown,
  source: ArticleSource,
  imageUrl?: string,
): Article | null {
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

  const article: Article = { title: title.trim(), url, publishedAt, source: source.name, tags: [] };
  if (imageUrl) article.imageUrl = imageUrl;
  return article;
}

export function parseArticles(xml: string, source: ArticleSource): Article[] {
  const data = parser.parse(xml);

  if (source.format === "rss") {
    return asArray(data?.rss?.channel?.item)
      .map((item) =>
        validArticle(
          item.title,
          item.link,
          item.pubDate,
          source,
          validImageUrl(item["media:thumbnail"]),
        ),
      )
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
  fetcher: Fetcher = fetchFeed,
  limit = 6,
): Promise<Article[]> {
  const results = await Promise.allSettled(
    sources.map(async (source) => {
      const response = await fetcher(source.feedUrl);
      if (!response.ok) return [];
      const articles = parseArticles(await response.text(), source);
      return source.enrich ? source.enrich(articles, fetcher) : articles;
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
