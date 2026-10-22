import type { Metadata } from "next";
import { PROFILE } from "./profile";

// Next.js の metadata は openGraph を浅くマージ（子で定義すると親の openGraph が
// 丸ごと上書き）されるため、ページごとの url と合わせてルートで定義している
// サイト共通の OG 情報（siteName・locale・画像）も明示的に引き継ぐ。
interface CreatePageMetadataOptions {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}

export function createPageMetadata({
  path,
  title,
  description,
  type = "website",
}: CreatePageMetadataOptions): Metadata {
  const sharedFields = {
    url: path,
    title,
    description,
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
  };

  const openGraph: NonNullable<Metadata["openGraph"]> =
    type === "article"
      ? { ...sharedFields, type: "article" }
      : { ...sharedFields, type: "website" };

  return {
    alternates: { canonical: path },
    openGraph,
  };
}
