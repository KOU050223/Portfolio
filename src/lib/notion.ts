import { Client, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client";
import { unstable_cache } from "next/cache";
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
  return p?.type === "title" ? (p.title[0]?.plain_text ?? "") : "";
}

function richText(page: PageObjectResponse, name: string): string {
  const p = prop(page, name);
  return p?.type === "rich_text" ? (p.rich_text[0]?.plain_text ?? "") : "";
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

// DBIDからdata_source_idを取得（結果をメモ化）
const dataSourceIdCache = new Map<string, string>();

async function resolveDataSourceId(dbId: string): Promise<string> {
  if (dataSourceIdCache.has(dbId)) return dataSourceIdCache.get(dbId)!;
  const db = await notion.databases.retrieve({ database_id: dbId });
  if (!("data_sources" in db) || !db.data_sources.length) {
    throw new Error(`data_source が見つかりません: ${dbId}`);
  }
  const id = db.data_sources[0].id;
  dataSourceIdCache.set(dbId, id);
  return id;
}

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
  if (!config.isConfigValid()) return [];
  try {
    const dsId = await resolveDataSourceId(config.notion.projectsDbId);
    const pages = await queryAll(dsId, { filter: PUBLISHED_FILTER, sorts: DATE_DESC });

    const items = pages
      .map((page) => {
        const t = title(page, "title");
        const d = formatDate(date(page, "date"));
        return {
          id: generateSlugId(t, d),
          title: t,
          authors: multiSelect(page, "authors"),
          date: d,
          technologies: multiSelect(page, "technologies"),
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
  if (!config.isConfigValid()) return [];
  try {
    const dsId = await resolveDataSourceId(config.notion.careerDbId);
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
            links = JSON.parse(linksRaw);
          } catch {
            // 不正なJSONはスキップ
          }
        }

        const desc = richText(page, "description");
        return {
          id: generateSlugId(t, d),
          title: t,
          date: d,
          endDate: endRaw ? formatDate(endRaw) : null,
          type: multiSelect(page, "type").join(","),
          description: desc,
          detailedDescription: richText(page, "detailedDescription") || desc,
          skills: multiSelect(page, "skills"),
          achievements: multiSelect(page, "achievements"),
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

export const getProjects = unstable_cache(_getProjects, ["projects"], { revalidate: 300 });
export const getCareer = unstable_cache(_getCareer, ["career"], { revalidate: 300 });

export async function getProjectById(id: string): Promise<Project | null> {
  return (await getProjects()).find((p) => p.id === id) ?? null;
}

export async function getCareerById(id: string): Promise<Career | null> {
  return (await getCareer()).find((c) => c.id === id) ?? null;
}
