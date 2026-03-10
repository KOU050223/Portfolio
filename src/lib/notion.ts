import { Client, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client";
import { config } from "./config";
import { getOgpImage } from "./getOgp";
import { generateSlugId, formatDate } from "./utils";
import type { Career, Project } from "@/types";

// --- プロパティ取得ヘルパー ---

function prop(page: PageObjectResponse, name: string) {
  return page.properties[name];
}

function title(page: PageObjectResponse, name: string): string {
  const p = prop(page, name);
  return p?.type === "title" ? p.title.map((t) => t.plain_text).join("") : "";
}

function richText(page: PageObjectResponse, name: string): string {
  const p = prop(page, name);
  return p?.type === "rich_text" ? p.rich_text.map((t) => t.plain_text).join("") : "";
}

function multiSelect(page: PageObjectResponse, name: string): string[] {
  const p = prop(page, name);
  return p?.type === "multi_select" ? p.multi_select.map((t) => t.name) : [];
}

function url(page: PageObjectResponse, name: string): string | null {
  const p = prop(page, name);
  return p?.type === "url" ? (p.url ?? null) : null;
}

function date(page: PageObjectResponse, name: string): string {
  const p = prop(page, name);
  return p?.type === "date" ? (p.date?.start ?? "") : "";
}

// --- Notion クライアント & クエリ ---

const notion = new Client({ auth: config.notion.apiKey });

async function queryAll(
  dataSourceId: string,
  options: {
    filter?: Parameters<typeof notion.dataSources.query>[0]["filter"];
    sorts?: Parameters<typeof notion.dataSources.query>[0]["sorts"];
  },
): Promise<PageObjectResponse[]> {
  const results: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      ...options,
    });
    results.push(...res.results.filter(isFullPage));
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return results;
}

const PUBLISHED_FILTER = { property: "isPublished", checkbox: { equals: true } } as const;
const DATE_DESC = [{ property: "date", direction: "descending" as const }];

// --- データ取得 ---

async function _getProjects(): Promise<Project[]> {
  if (!config.isProjectsConfigValid()) return [];
  try {
    const dsId = config.notion.projectsDataSourceId;
    const pages = await queryAll(dsId, { filter: PUBLISHED_FILTER, sorts: DATE_DESC });

    const items = pages
      .map((page) => {
        const t = title(page, "title");
        const d = formatDate(date(page, "date"));
        return {
          id: generateSlugId(t, d, page.id),
          title: t,
          authors: multiSelect(page, "authors"),
          date: d,
          skills: multiSelect(page, "skills"),
          youtubeUrl: url(page, "youtubeUrl"),
          description: richText(page, "description"),
          deployLink: url(page, "deployLink"),
          githubLink: url(page, "githubLink"),
          articleLink: url(page, "articleLink"),
          events: multiSelect(page, "events"),
          awards: multiSelect(page, "awards"),
          ogpImage: null as string | null,
        };
      })
      .filter((p) => p.title && p.description.length > 0);

    return Promise.all(
      items.map(async (project) => {
        if (!project.articleLink) return project;
        try {
          return { ...project, ogpImage: await getOgpImage(project.articleLink) };
        } catch {
          return project;
        }
      }),
    );
  } catch (err) {
    console.error("プロジェクトデータ取得エラー:", err);
    return [];
  }
}

async function _getCareer(): Promise<Career[]> {
  if (!config.isCareerConfigValid()) return [];
  try {
    const dsId = config.notion.careerDataSourceId;
    const pages = await queryAll(dsId, { filter: PUBLISHED_FILTER, sorts: DATE_DESC });

    return pages
      .map((page) => {
        const t = title(page, "title");
        const d = formatDate(date(page, "date"));
        const endRaw = date(page, "endDate");

        const linksRaw = richText(page, "links");
        let links: Array<{ label: string; url: string }> = [];
        if (linksRaw) {
          try {
            const parsed: unknown = JSON.parse(linksRaw);
            if (Array.isArray(parsed)) {
              links = parsed.filter(
                (item): item is { label: string; url: string } =>
                  typeof item === "object" &&
                  item !== null &&
                  typeof (item as Record<string, unknown>).label === "string" &&
                  typeof (item as Record<string, unknown>).url === "string",
              );
            }
          } catch {
            // 不正なJSONはスキップ
          }
        }

        const desc = richText(page, "description");
        return {
          id: generateSlugId(t, d, page.id),
          title: t,
          date: d,
          endDate: endRaw ? formatDate(endRaw) : null,
          type: multiSelect(page, "type").join(","),
          description: desc,
          detailedDescription: richText(page, "detailedDescription") || desc,
          skills: multiSelect(page, "skills"),
          achievements: richText(page, "achievements"),
          links,
          imageUrl: url(page, "imageUrl"),
          location: richText(page, "location") || null,
        };
      })
      .filter((c) => c.title && c.description.length > 0);
  } catch (err) {
    console.error("キャリアデータ取得エラー:", err);
    return [];
  }
}

// --- キャッシュ付きエクスポート ---

// TODO: デバッグ中のためキャッシュ無効化中
export const getProjects = _getProjects;
export const getCareer = _getCareer;

export async function getProjectById(id: string): Promise<Project | null> {
  return (await getProjects()).find((p) => p.id === id) ?? null;
}

export async function getCareerById(id: string): Promise<Career | null> {
  return (await getCareer()).find((c) => c.id === id) ?? null;
}
