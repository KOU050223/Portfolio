import type { MetadataRoute } from "next";
import { PROFILE } from "@/lib/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${PROFILE.siteUrl}/sitemap.xml`,
  };
}
