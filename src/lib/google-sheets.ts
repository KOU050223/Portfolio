import { Client, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client";
import { unstable_cache } from "next/cache";
import { config } from "./config";
import { getOgpImage } from "./getOgp";

export interface Project {
  id: string;
  title: string;
  authors: string[];
  date: string;
  technologies: string[];
  youtubeUrl: string | null;
  description: string;
  deployLink: string | null;
  githubLink: string | null;
  articleLink: string | null;
  events: string[];
  awards: string[];
  ogpImage: string | null;
}

// プロジェクトIDを生成する関数
export function generateProjectId(title: string, date: string): string {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // 特殊文字を除去
    .replace(/\s+/g, "-") // スペースをハイフンに変換
    .replace(/-+/g, "-") // 連続するハイフンを単一に
    .trim();

  const cleanDate = date.replace(/\//g, "-");
  return `${cleanDate}-${cleanTitle}`.substring(0, 50); // 長すぎる場合は切り詰め
}

export interface Career {
  id: string;
  title: string;
  date: string;
  endDate: string | null;
  type: string;
  description: string;
  detailedDescription: string;
  skills: string[];
  achievements: string[];
  links: Array<{ label: string; url: string }>;
  imageUrl: string | null;
  location: string | null;
}

// キャリアIDを生成する関数
export function generateCareerId(title: string, date: string): string {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // 特殊文字を除去
    .replace(/\s+/g, "-") // スペースをハイフンに変換
    .replace(/-+/g, "-") // 連続するハイフンを単一に
    .trim();

  const cleanDate = date.replace(/\//g, "-");
  return `${cleanDate}-${cleanTitle}`.substring(0, 50); // 長すぎる場合は切り詰め
}

// Notionページのプロパティ取得ヘルパー
function getTitle(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  if (!p || p.type !== "title") return "";
  return p.title[0]?.plain_text ?? "";
}

function getRichText(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  if (!p || p.type !== "rich_text") return "";
  return p.rich_text[0]?.plain_text ?? "";
}

function getMultiSelect(page: PageObjectResponse, prop: string): string[] {
  const p = page.properties[prop];
  if (!p || p.type !== "multi_select") return [];
  return p.multi_select.map((t) => t.name);
}

function getUrl(page: PageObjectResponse, prop: string): string | null {
  const p = page.properties[prop];
  if (!p || p.type !== "url") return null;
  return p.url ?? null;
}

function getDate(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  if (!p || p.type !== "date") return "";
  return p.date?.start ?? "";
}

// ISO日付 (YYYY-MM-DD) を MM/DD/YYYY に変換
function formatDate(isoDate: string): string {
  if (!isoDate) return "";
  const match = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return isoDate;
  return `${match[2]}/${match[3]}/${match[1]}`;
}

// Notionクライアントを作成（サーバーサイド専用）
function createNotionClient(): Client {
  return new Client({ auth: config.notion.apiKey });
}

// DBIDからdata_source_idを取得
async function getDataSourceId(notion: Client, dbId: string): Promise<string> {
  const db = await notion.databases.retrieve({ database_id: dbId });
  if (!("data_sources" in db) || !db.data_sources.length) {
    throw new Error(`data_source が見つかりません: ${dbId}`);
  }
  return db.data_sources[0].id;
}

// ページネーション対応の全件取得
async function queryAllPages(
  notion: Client,
  dataSourceId: string,
  options: {
    filter?: Parameters<typeof notion.dataSources.query>[0]["filter"];
    sorts?: Parameters<typeof notion.dataSources.query>[0]["sorts"];
  },
): Promise<PageObjectResponse[]> {
  const results: PageObjectResponse[] = [];
  let cursor: string | undefined = undefined;
  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      ...options,
    });
    results.push(...response.results.filter(isFullPage));
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return results;
}

// キャッシュなしの内部実装
async function _getProjects(): Promise<Project[]> {
  try {
    if (!config.isConfigValid()) {
      console.warn("Notion環境変数が設定されていません。空の配列を返します。");
      return [];
    }

    const notion = createNotionClient();
    const dataSourceId = await getDataSourceId(notion, config.notion.projectsDbId);

    const pages = await queryAllPages(notion, dataSourceId, {
      filter: { property: "isPublished", checkbox: { equals: true } },
      sorts: [{ property: "date", direction: "descending" }],
    });

    const projectsData = pages
      .map((page) => {
        const title = getTitle(page, "title");
        const isoDate = getDate(page, "date");
        const date = formatDate(isoDate);

        return {
          id: generateProjectId(title, date),
          title,
          authors: getMultiSelect(page, "authors"),
          date,
          technologies: getMultiSelect(page, "technologies"),
          youtubeUrl: getUrl(page, "youtubeUrl"),
          description: getRichText(page, "description"),
          deployLink: getUrl(page, "deployLink"),
          githubLink: getUrl(page, "githubLink"),
          articleLink: getUrl(page, "articleLink"),
          events: getMultiSelect(page, "events"),
          awards: getMultiSelect(page, "awards"),
          ogpImage: null as string | null,
        };
      })
      .filter((project) => project.title && project.description.length > 0);

    // OGP画像を並列取得
    const projects = await Promise.all(
      projectsData.map(async (project) => {
        if (project.articleLink) {
          try {
            const ogpImage = await getOgpImage(project.articleLink);
            return { ...project, ogpImage };
          } catch (error) {
            console.error(`OGP取得失敗 (${project.title}):`, error);
            return project;
          }
        }
        return project;
      }),
    );

    console.log("取得したプロジェクトデータ:", projects);
    return projects;
  } catch (err) {
    console.error("プロジェクトデータ取得エラー:", err);
    return [];
  }
}

// 5分キャッシュ付きエクスポート
export const getProjects = unstable_cache(_getProjects, ["projects"], { revalidate: 300 });

// 特定のプロジェクトを取得する関数
export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((project) => project.id === id) || null;
}

// キャッシュなしの内部実装
async function _getCareer(): Promise<Career[]> {
  try {
    if (!config.isConfigValid()) {
      console.warn("Notion環境変数が設定されていません。空の配列を返します。");
      return [];
    }

    const notion = createNotionClient();
    const dataSourceId = await getDataSourceId(notion, config.notion.careerDbId);

    const pages = await queryAllPages(notion, dataSourceId, {
      filter: { property: "isPublished", checkbox: { equals: true } },
      sorts: [{ property: "date", direction: "descending" }],
    });

    const fetchedCareer = pages
      .map((page) => {
        const title = getTitle(page, "title");
        const isoDate = getDate(page, "date");
        const date = formatDate(isoDate);
        const isoEndDate = getDate(page, "endDate");
        const endDate = isoEndDate ? formatDate(isoEndDate) : null;

        // linksはRich Text（JSON文字列）として格納
        const linksRaw = getRichText(page, "links");
        let parsedLinks: Array<{ label: string; url: string }> = [];
        if (linksRaw && linksRaw.trim()) {
          try {
            parsedLinks = JSON.parse(linksRaw);
          } catch (error) {
            console.error("links JSONのパースエラー:", error, "links value:", linksRaw);
          }
        }

        const description = getRichText(page, "description");
        const detailedDescription = getRichText(page, "detailedDescription") || description;

        // typeはMulti-selectで格納、互換性のため","結合
        const typeArr = getMultiSelect(page, "type");
        const type = typeArr.join(",");

        return {
          id: generateCareerId(title, date),
          title,
          date,
          endDate,
          type,
          description,
          detailedDescription,
          skills: getMultiSelect(page, "skills"),
          achievements: getMultiSelect(page, "achievements"),
          links: parsedLinks,
          imageUrl: getUrl(page, "imageUrl"),
          location: getRichText(page, "location") || null,
        };
      })
      .filter((career) => career.title && career.description.length > 0);

    console.log("取得したキャリアデータ:", fetchedCareer);
    return fetchedCareer;
  } catch (err) {
    console.error("キャリアデータ取得エラー:", err);
    return [];
  }
}

// 5分キャッシュ付きエクスポート
export const getCareer = unstable_cache(_getCareer, ["career"], { revalidate: 300 });

// 特定のキャリアを取得する関数
export async function getCareerById(id: string): Promise<Career | null> {
  const career = await getCareer();
  return career.find((item) => item.id === id) || null;
}
