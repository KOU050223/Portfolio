import { describe, expect, it, vi } from "vitest";
import {
  ARTICLE_SOURCES,
  getAllArticles,
  getLatestArticles,
  parseArticles,
  type ArticleSource,
} from "@/lib/articles";

const qiita: ArticleSource = {
  name: "Qiita",
  profileUrl: "https://qiita.com/KOU050223",
  feedUrl: "https://qiita.com/KOU050223/feed",
  format: "atom",
};

const note: ArticleSource = {
  name: "note",
  profileUrl: "https://note.com/kou050223",
  feedUrl: "https://note.com/kou050223/rss",
  format: "rss",
};

const qiitaFeed = `<?xml version="1.0"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <title>Qiita の記事</title>
    <link rel="alternate" type="text/html" href="https://qiita.com/KOU050223/items/abc"/>
    <published>2026-11-16T09:00:00+09:00</published>
  </entry>
</feed>`;

const noteFeed = `<?xml version="1.0"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/"><channel><item>
  <title><![CDATA[note の記事 & メモ]]></title>
  <link>https://note.com/kou050223/n/abc</link>
  <pubDate>Tue, 17 Nov 2026 09:00:00 +0900</pubDate>
  <media:thumbnail>https://assets.st-note.com/img/example.png</media:thumbnail>
</item></channel></rss>`;

describe("parseArticles", () => {
  it("Atom の公開日時と記事 URL を取得する", () => {
    expect(parseArticles(qiitaFeed, qiita)).toEqual([
      {
        title: "Qiita の記事",
        url: "https://qiita.com/KOU050223/items/abc",
        publishedAt: "2026-11-16T09:00:00+09:00",
        source: "Qiita",
        tags: [],
      },
    ]);
  });

  it("RSS の CDATA タイトルをそのまま取得する", () => {
    expect(parseArticles(noteFeed, note)).toEqual([
      {
        title: "note の記事 & メモ",
        url: "https://note.com/kou050223/n/abc",
        publishedAt: "Tue, 17 Nov 2026 09:00:00 +0900",
        source: "note",
        tags: [],
        imageUrl: "https://assets.st-note.com/img/example.png",
      },
    ]);
  });

  it("https 以外のサムネイル URL は無視する", () => {
    const feed = `<rss xmlns:media="http://search.yahoo.com/mrss/"><channel><item><title>記事</title><link>https://note.com/kou050223/n/abc</link><pubDate>Tue, 17 Nov 2026 09:00:00 +0900</pubDate><media:thumbnail>http://evil.example.com/x.png</media:thumbnail></item></channel></rss>`;
    expect(parseArticles(feed, note)[0].imageUrl).toBeUndefined();
  });

  it("不正な記事 URL と日付を表示対象から除外する", () => {
    const feed = `<rss><channel><item><title>危険なリンク</title><link>javascript:alert(1)</link><pubDate>Tue, 17 Nov 2026 09:00:00 +0900</pubDate></item><item><title>日付なし</title><link>https://note.com/kou050223/n/abc</link></item></channel></rss>`;
    expect(parseArticles(feed, note)).toEqual([]);
  });
});

describe("getLatestArticles", () => {
  it("投稿数の多い配信元だけで一覧が埋まらない", async () => {
    const busyFeed = `<rss><channel>
      <item><title>最新</title><link>https://note.com/kou050223/n/new</link><pubDate>Wed, 18 Nov 2026 09:00:00 +0900</pubDate></item>
      <item><title>次</title><link>https://note.com/kou050223/n/next</link><pubDate>Tue, 17 Nov 2026 09:00:00 +0900</pubDate></item>
      <item><title>その次</title><link>https://note.com/kou050223/n/third</link><pubDate>Mon, 16 Nov 2026 09:00:00 +0900</pubDate></item>
    </channel></rss>`;
    const fetcher = vi.fn(
      async (url: string) =>
        new Response(url === note.feedUrl ? busyFeed : qiitaFeed, { status: 200 }),
    );

    const articles = await getLatestArticles([note, qiita], fetcher, 3);

    expect(articles.map((article) => article.title)).toEqual(["最新", "次", "Qiita の記事"]);
  });

  it("取得できた記事を新しい順に並べ、失敗した配信元は飛ばす", async () => {
    const fetcher = vi.fn(async (url: string) => {
      if (url === qiita.feedUrl) return new Response(qiitaFeed, { status: 200 });
      if (url === note.feedUrl) return new Response(noteFeed, { status: 200 });
      throw new Error("feed unavailable");
    });

    const articles = await getLatestArticles(
      [qiita, { ...note, name: "sizu.me", feedUrl: "https://sizu.me/uomi/rss" }, note],
      fetcher,
      2,
    );

    expect(articles.map((article) => article.title)).toEqual([
      "note の記事 & メモ",
      "Qiita の記事",
    ]);
  });

  it("Qiita API にだけある記事も取得する", async () => {
    const qiitaSource = ARTICLE_SOURCES.find((source) => source.name === "Qiita");
    expect(qiitaSource).toBeDefined();
    const apiJson = JSON.stringify([
      {
        title: "APIだけの記事",
        url: "https://qiita.com/KOU050223/items/def",
        created_at: "2026-11-17T09:00:00+09:00",
        updated_at: "2026-11-17T09:00:00+09:00",
        tags: [{ name: "Cloudflare" }],
      },
      {
        title: "Qiita の記事",
        url: "https://qiita.com/KOU050223/items/abc",
        created_at: "2026-11-16T09:00:00+09:00",
        updated_at: "2026-11-16T09:00:00+09:00",
        tags: [{ name: "CloudRun" }],
      },
    ]);
    const fetcher = vi.fn(async (url: string) => {
      if (url === qiitaSource?.feedUrl) return new Response(qiitaFeed, { status: 200 });
      if (url.includes("api/v2")) {
        return new Response(apiJson, { status: 200, headers: { "total-count": "2" } });
      }
      return new Response("not found", { status: 404 });
    });

    const articles = await getLatestArticles([qiitaSource!], fetcher, 10);

    expect(articles.map((article) => article.title)).toEqual(["APIだけの記事", "Qiita の記事"]);
    expect(articles[0].tags).toEqual(["Cloudflare"]);
  });

  it("Qiita API の2ページ目以降も取得する", async () => {
    const qiitaSource = ARTICLE_SOURCES.find((source) => source.name === "Qiita");
    expect(qiitaSource).toBeDefined();
    const firstPageItems = Array.from({ length: 100 }, (_, index) => ({
      title: `1ページ目の記事${index + 1}`,
      url: `https://qiita.com/KOU050223/items/page1-${index + 1}`,
      created_at: "2026-11-16T09:00:00+09:00",
      updated_at: "2026-11-16T09:00:00+09:00",
      tags: [],
    }));
    const secondPageItems = [
      {
        title: "101件目の記事",
        url: "https://qiita.com/KOU050223/items/page2-101",
        created_at: "2026-11-15T09:00:00+09:00",
        updated_at: "2026-11-15T09:00:00+09:00",
        tags: [],
      },
    ];
    const fetcher = vi.fn(async (url: string) => {
      if (url === qiitaSource?.feedUrl) {
        return new Response(`<feed xmlns="http://www.w3.org/2005/Atom"></feed>`, { status: 200 });
      }
      if (url.includes("api/v2")) {
        const page = new URL(url).searchParams.get("page");
        const items = page === "2" ? secondPageItems : firstPageItems;
        return new Response(JSON.stringify(items), {
          status: 200,
          headers: { "total-count": "101" },
        });
      }
      return new Response("not found", { status: 404 });
    });

    const articles = await getLatestArticles([qiitaSource!], fetcher, 101);

    expect(articles).toHaveLength(101);
    expect(articles.some((article) => article.title === "101件目の記事")).toBe(true);
  });

  it("Qiita API が失敗してもフィードの記事は残す", async () => {
    const qiitaSource = ARTICLE_SOURCES.find((source) => source.name === "Qiita");
    expect(qiitaSource).toBeDefined();
    const fetcher = vi.fn(async (url: string) => {
      if (url === qiitaSource?.feedUrl) return new Response(qiitaFeed, { status: 200 });
      if (url.includes("api/v2")) return new Response("rate limited", { status: 429 });
      return new Response("not found", { status: 404 });
    });

    const articles = await getLatestArticles([qiitaSource!], fetcher, 5);

    expect(articles[0].title).toBe("Qiita の記事");
    expect(articles[0].tags).toEqual([]);
  });
});

describe("getAllArticles", () => {
  it("記事一覧用には配信元の全記事を返す", async () => {
    const items = Array.from({ length: 12 }, (_, index) => {
      const number = index + 1;
      const pubDate = new Date(Date.UTC(2026, 0, 20 - index)).toUTCString();
      return `<item><title>記事${number}</title><link>https://note.com/kou050223/n/${number}</link><pubDate>${pubDate}</pubDate></item>`;
    }).join("");
    const fetcher = vi.fn(
      async () => new Response(`<rss><channel>${items}</channel></rss>`, { status: 200 }),
    );
    const articles = await getAllArticles([note], fetcher);

    expect(articles).toHaveLength(12);
    expect(articles[0].title).toBe("記事1");
    expect(articles[11].title).toBe("記事12");
  });
});
