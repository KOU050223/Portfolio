import type { MetadataRoute } from "next";
import { PROFILE } from "./profile";
import type { Career, Project } from "@/types";

const STATIC_PAGES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/production", changeFrequency: "monthly", priority: 0.8 },
  { path: "/career", changeFrequency: "monthly", priority: 0.8 },
  { path: "/skill", changeFrequency: "monthly", priority: 0.7 },
  { path: "/skill/github", changeFrequency: "monthly", priority: 0.6 },
  { path: "/hobby", changeFrequency: "yearly", priority: 0.5 },
] as const satisfies ReadonlyArray<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}>;

export function buildSitemapEntries(
  projects: Pick<Project, "id">[],
  careers: Pick<Career, "id">[],
): MetadataRoute.Sitemap {
  return [
    ...STATIC_PAGES.map((page) => ({
      url: `${PROFILE.siteUrl}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...projects.map((project) => ({
      url: `${PROFILE.siteUrl}/production/${project.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...careers.map((career) => ({
      url: `${PROFILE.siteUrl}/career/${career.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
