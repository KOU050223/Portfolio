import { describe, it, expect, vi } from "vitest";
import { buildSitemapEntries } from "@/lib/sitemap";
import { PROFILE } from "@/lib/profile";
import { getCareer, getProjects } from "@/lib/notion";
import type { Career, Project } from "@/types";

vi.mock("@/lib/notion", () => ({
  getProjects: vi.fn(),
  getCareer: vi.fn(),
}));

const mockedGetProjects = vi.mocked(getProjects);
const mockedGetCareer = vi.mocked(getCareer);

describe("buildSitemapEntries()", () => {
  it("静的ページの URL・changeFrequency・priority を含む", () => {
    const entries = buildSitemapEntries([], []);
    const byUrl = new Map(entries.map((e) => [e.url, e]));

    expect(byUrl.size).toBe(6);
    expect(byUrl.get(`${PROFILE.siteUrl}/`)).toMatchObject({
      changeFrequency: "weekly",
      priority: 1,
    });
    expect(byUrl.get(`${PROFILE.siteUrl}/production`)).toMatchObject({
      changeFrequency: "monthly",
      priority: 0.8,
    });
    expect(byUrl.get(`${PROFILE.siteUrl}/career`)).toMatchObject({
      changeFrequency: "monthly",
      priority: 0.8,
    });
    expect(byUrl.get(`${PROFILE.siteUrl}/skill`)).toMatchObject({
      changeFrequency: "monthly",
      priority: 0.7,
    });
    expect(byUrl.get(`${PROFILE.siteUrl}/skill/github`)).toBeDefined();
    expect(byUrl.get(`${PROFILE.siteUrl}/hobby`)).toMatchObject({
      changeFrequency: "yearly",
      priority: 0.5,
    });
  });

  it("作品・キャリアの id から動的ページの URL を生成する", () => {
    const entries = buildSitemapEntries(
      [{ id: "project-1" }, { id: "project-2" }],
      [{ id: "career-1" }],
    );
    const urls = entries.map((e) => e.url);

    expect(urls).toContain(`${PROFILE.siteUrl}/production/project-1`);
    expect(urls).toContain(`${PROFILE.siteUrl}/production/project-2`);
    expect(urls).toContain(`${PROFILE.siteUrl}/career/career-1`);
  });
});

describe("sitemap()", () => {
  it("Notion の取得結果を動的ページに反映する", async () => {
    mockedGetProjects.mockResolvedValue([{ id: "project-1" } as Project]);
    mockedGetCareer.mockResolvedValue([{ id: "career-1" } as Career]);

    const { default: sitemap } = await import("@/app/sitemap");
    const urls = (await sitemap()).map((e) => e.url);

    expect(urls).toContain(`${PROFILE.siteUrl}/production/project-1`);
    expect(urls).toContain(`${PROFILE.siteUrl}/career/career-1`);
  });

  it("Notion 取得が失敗しても静的ページだけの sitemap を返す", async () => {
    mockedGetProjects.mockRejectedValue(new Error("Notion API error"));
    mockedGetCareer.mockRejectedValue(new Error("Notion API error"));

    const { default: sitemap } = await import("@/app/sitemap");
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toContain(`${PROFILE.siteUrl}/`);
    expect(urls).toContain(`${PROFILE.siteUrl}/hobby`);
    expect(entries).toHaveLength(6);
  });

  it("Notion が空配列を返しても静的ページだけの sitemap を返す", async () => {
    mockedGetProjects.mockResolvedValue([]);
    mockedGetCareer.mockResolvedValue([]);

    const { default: sitemap } = await import("@/app/sitemap");
    const entries = await sitemap();

    expect(entries).toHaveLength(6);
  });
});
