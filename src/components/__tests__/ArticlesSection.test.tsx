import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ArticlesSection from "@/components/ArticlesSection";
import type { Article } from "@/lib/articles";

const article: Article = {
  title: "ブログ記事のタイトル",
  url: "https://qiita.com/KOU050223/items/abc",
  publishedAt: "2026-11-16T09:00:00+09:00",
  source: "Qiita",
};

describe("ArticlesSection", () => {
  it("記事へのリンクと3サービスのプロフィールを表示する", () => {
    render(<ArticlesSection articles={[article]} />);

    expect(screen.getByRole("link", { name: /ブログ記事のタイトル/ })).toHaveAttribute(
      "href",
      article.url,
    );
    expect(screen.getByRole("link", { name: /Qiita の記事一覧/ })).toHaveAttribute(
      "href",
      "https://qiita.com/KOU050223",
    );
    expect(screen.getByRole("link", { name: /note の記事一覧/ })).toHaveAttribute(
      "href",
      "https://note.com/kou050223",
    );
    expect(screen.getByRole("link", { name: /sizu.me の記事一覧/ })).toHaveAttribute(
      "href",
      "https://sizu.me/uomi",
    );
  });

  it("フィードが取得できなくてもプロフィールリンクを表示する", () => {
    render(<ArticlesSection articles={[]} />);
    expect(screen.getByRole("link", { name: /sizu.me の記事一覧/ })).toBeInTheDocument();
  });
});
