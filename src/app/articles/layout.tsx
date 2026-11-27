import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "記事",
  description:
    "魚住 紘平が Qiita、note、sizu.me に投稿した技術記事・ブログ記事の一覧。開発で得た知見や学びを発信しています。",
  keywords: [
    "記事",
    "ブログ",
    "技術記事",
    "Qiita",
    "note",
    "sizu.me",
    "執筆",
    "魚住紘平",
    "エンジニア",
  ],
  ...createPageMetadata({
    path: "/articles",
    title: "記事 | 魚住 紘平",
    description:
      "魚住 紘平が Qiita、note、sizu.me に投稿した技術記事・ブログ記事の一覧。開発で得た知見や学びを発信しています。",
  }),
  twitter: {
    title: "記事 | 魚住 紘平",
    description: "魚住 紘平が Qiita、note、sizu.me に投稿した技術記事・ブログ記事の一覧。",
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
