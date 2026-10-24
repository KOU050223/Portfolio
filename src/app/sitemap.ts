import type { MetadataRoute } from "next";
import { getCareer, getProjects } from "@/lib/notion";
import { buildSitemapEntries } from "@/lib/sitemap";
import type { Career, Project } from "@/types";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projects: Project[] = [];
  let careers: Career[] = [];
  try {
    [projects, careers] = await Promise.all([getProjects(), getCareer()]);
  } catch {
    // Notion 取得に失敗しても静的ページだけの sitemap を返す
  }
  return buildSitemapEntries(projects, careers);
}
