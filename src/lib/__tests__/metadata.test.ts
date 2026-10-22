import { describe, it, expect, vi } from "vitest";
import { createPageMetadata } from "@/lib/metadata";
import { PROFILE } from "@/lib/profile";

describe("createPageMetadata()", () => {
  it("ページパスを canonical と og:url に設定する", () => {
    const metadata = createPageMetadata({
      path: "/career",
      title: "キャリア | 魚住 紘平",
      description: "説明文",
    });

    expect(metadata.alternates?.canonical).toBe("/career");
    expect(metadata.openGraph).toMatchObject({
      url: "/career",
      title: "キャリア | 魚住 紘平",
      description: "説明文",
    });
  });

  it("og:type のデフォルトは website", () => {
    const metadata = createPageMetadata({
      path: "/hobby",
      title: "趣味",
      description: "説明文",
    });

    expect(metadata.openGraph).toMatchObject({ type: "website" });
  });

  it("og:type に article を指定できる", () => {
    const metadata = createPageMetadata({
      path: "/career/some-id",
      title: "タイトル",
      description: "説明文",
      type: "article",
    });

    expect(metadata.openGraph).toMatchObject({ type: "article" });
  });

  it("ルートの OG 情報（siteName・locale・画像）を引き継ぐ", () => {
    const metadata = createPageMetadata({
      path: "/skill",
      title: "技術スタック",
      description: "説明文",
    });

    // Next.js は openGraph を浅くマージするため、子で url を設定すると
    // 親の siteName などが失われる。共通情報が含まれることを保証する。
    expect(metadata.openGraph).toMatchObject({
      siteName: PROFILE.siteName,
      locale: "ja_JP",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: PROFILE.siteTitle,
        },
      ],
    });
  });
});

vi.mock("@/lib/notion", () => ({
  getCareer: vi.fn(async () => []),
  getProjects: vi.fn(async () => []),
  getCareerById: vi.fn(async (id: string) =>
    id === "career-1"
      ? {
          id: "career-1",
          title: "インターン参加",
          date: "2024.01",
          endDate: null,
          type: "インターン",
          description: "キャリアの説明文",
          detailedDescription: "詳細",
          skills: [],
          achievements: "",
          links: [],
          imageUrl: null,
          location: null,
        }
      : null,
  ),
  getProjectById: vi.fn(async (id: string) =>
    id === "project-1"
      ? {
          id: "project-1",
          title: "作品A",
          authors: [],
          date: "2024.01",
          skills: [],
          youtubeUrl: null,
          description: "作品の説明文",
          deployLink: null,
          githubLink: null,
          articleLink: null,
          events: [],
          awards: [],
          ogpImage: null,
        }
      : null,
  ),
}));

describe("キャリア詳細ページの generateMetadata", () => {
  it("自分自身の canonical / og:url を返す", async () => {
    const { generateMetadata } = await import("@/app/career/[id]/page");
    const metadata = await generateMetadata({
      params: Promise.resolve({ id: "career-1" }),
    });

    expect(metadata.alternates?.canonical).toBe("/career/career-1");
    expect(metadata.openGraph).toMatchObject({
      url: "/career/career-1",
      type: "article",
    });
  });
});

describe("作品詳細ページの generateMetadata", () => {
  it("自分自身の canonical / og:url を返す", async () => {
    const { generateMetadata } = await import("@/app/production/[id]/page");
    const metadata = await generateMetadata({
      params: Promise.resolve({ id: "project-1" }),
    });

    expect(metadata.alternates?.canonical).toBe("/production/project-1");
    expect(metadata.openGraph).toMatchObject({
      url: "/production/project-1",
      type: "article",
    });
  });
});
