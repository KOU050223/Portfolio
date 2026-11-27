import { XMLParser } from "fast-xml-parser";

type Fetcher = (url: string) => Promise<Response>;

export type ArticleSource = {
  name: string;
  profileUrl: string;
  feedUrl: string;
  format: "rss" | "atom";
  enrich?: (articles: Article[], fetcher: Fetcher, source: ArticleSource) => Promise<Article[]>;
};

export type Article = {
  title: string;
  url: string;
  publishedAt: string;
  source: string;
  tags: string[];
  imageUrl?: string;
};

// Qiita のフィードは最新数件だけなので、公開 API を使って全件へ広げる。
// API が失敗・レート制限でも、フィードから取得できた記事は表示できるようにする。
async function enrichQiitaArticles(
  articles: Article[],
  fetcher: Fetcher,
  source: ArticleSource,
): Promise<Article[]> {
  try {
    const perPage = 100;
    const apiUrl = (page: number) =>
      `https://qiita.com/api/v2/users/KOU050223/items?page=${page}&per_page=${perPage}`;
    const addApiArticles = async (page: number, articlesByUrl: Map<string, Article>) => {
      try {
        const response = await fetcher(apiUrl(page));
        if (!response.ok) return 0;
        const items: unknown = await response.json();
        if (!Array.isArray(items)) return 0;

        for (const item of items) {
          const article = validArticle(item.title, item.url, item.created_at, source);
          if (!article) continue;
          if (Array.isArray(item.tags)) {
            article.tags = item.tags
              .map((tag: unknown) => (tag as { name?: unknown })?.name)
              .filter((name: unknown): name is string => typeof name === "string" && name !== "");
          }
          articlesByUrl.set(article.url, article);
        }

        return Number(response.headers.get("total-count")) || items.length;
      } catch {
        return 0;
      }
    };

    const articlesByUrl = new Map<string, Article>();
    const totalCount = await addApiArticles(1, articlesByUrl);
    const pageCount = Math.ceil(totalCount / perPage);
    for (let page = 2; page <= pageCount; page += 1) {
      await addApiArticles(page, articlesByUrl);
    }

    for (const article of articles) {
      if (!articlesByUrl.has(article.url)) articlesByUrl.set(article.url, article);
    }
    return [...articlesByUrl.values()];
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
    enrich: enrichQiitaArticles,
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

async function fetchArticleGroups(
  sources: ArticleSource[],
  fetcher: Fetcher,
): Promise<Article[][]> {
  const results = await Promise.allSettled(
    sources.map(async (source) => {
      const response = await fetcher(source.feedUrl);
      if (!response.ok) return [];
      const articles = parseArticles(await response.text(), source);
      return source.enrich ? source.enrich(articles, fetcher, source) : articles;
    }),
  );

  return results.flatMap((result) => (result.status === "fulfilled" ? [result.value] : []));
}

export async function getLatestArticles(
  sources: ArticleSource[] = ARTICLE_SOURCES,
  fetcher: Fetcher = fetchFeed,
  limit = 6,
): Promise<Article[]> {
  const articleGroups = await fetchArticleGroups(sources, fetcher);
  const perSourceLimit = Math.ceil(limit / sources.length);

  return articleGroups
    .flatMap((articles) =>
      articles
        .toSorted((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
        .slice(0, perSourceLimit),
    )
    .toSorted((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, limit);
}

export async function getAllArticles(
  sources: ArticleSource[] = ARTICLE_SOURCES,
  fetcher: Fetcher = fetchFeed,
): Promise<Article[]> {
  const articleGroups = await fetchArticleGroups(sources, fetcher);

  return articleGroups
    .flat()
    .toSorted((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}
