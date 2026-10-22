import { describe, it, expect } from "vitest";
import { PROFILE } from "@/lib/profile";

describe("PROFILE 定数", () => {
  it("表示名・肩書き・Twitterハンドルが定義されている", () => {
    expect(PROFILE.name).toBe("魚住 紘平");
    expect(PROFILE.role).toBe("Software Engineer");
    expect(PROFILE.twitterHandle).toBe("@uomikou_0223");
  });

  it("サイト情報が定義されている", () => {
    expect(PROFILE.siteTitle).toBe("魚住 紘平 | ウオミーのポートフォリオサイト");
    expect(PROFILE.siteName).toBe("魚住 紘平 Portfolio");
    expect(PROFILE.siteUrl).toBe("https://portfolio.uomi.dev");
    expect(PROFILE.siteDomain).toBe("portfolio.uomi.dev");
  });

  it("OG/Twitter画像の説明文が定義されている", () => {
    expect(PROFILE.ogDescription).toBe("福岡工業大学情報工学科在籍のフルスタック開発者");
    expect(PROFILE.twitterCardDescription).toBe(
      "福岡工業大学情報工学科在籍のフルスタック開発者のポートフォリオサイト",
    );
  });

  it("技術タグが定義されている", () => {
    expect(PROFILE.ogTechTags).toEqual(["React", "Next.js", "Node.js", "TypeScript"]);
    expect(PROFILE.twitterTechTags).toEqual(["React", "Next.js", "TypeScript", "Node.js"]);
  });
});
