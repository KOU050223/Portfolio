import { describe, expect, it, vi } from "vitest";
import { getLatestArticles, parseArticles, type ArticleSource } from "@/lib/articles";

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
<rss version="2.0"><channel><item>
  <title><![CDATA[note の記事 & メモ]]></title>
  <link>https://note.com/kou050223/n/abc</link>
  <pubDate>Tue, 17 Nov 2026 09:00:00 +0900</pubDate>
</item></channel></rss>`;

describe("parseArticles", () => {
  it("Atom の公開日時と記事 URL を取得する", () => {
    expect(parseArticles(qiitaFeed, qiita)).toEqual([
      {
        title: "Qiita の記事",
        url: "https://qiita.com/KOU050223/items/abc",
        publishedAt: "2026-11-16T09:00:00+09:00",
        source: "Qiita",
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
      },
    ]);
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
});
