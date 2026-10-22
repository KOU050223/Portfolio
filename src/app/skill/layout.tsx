import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "技術スタック",
  description:
    "魚住 紘平が習得している技術スタック・プログラミング言語の一覧。React、Next.js、TypeScript、Python、Java等のスキルレベルと習熟度を紹介。",
  keywords: [
    "技術スタック",
    "スキル",
    "プログラミング言語",
    "フレームワーク",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "Node.js",
    "スキルレベル",
    "習熟度",
    "魚住紘平",
  ],
  ...createPageMetadata({
    path: "/skill",
    title: "技術スタック | 魚住 紘平",
    description:
      "魚住 紘平が習得している技術スタック・プログラミング言語の一覧。React、Next.js、TypeScript、Python、Java等のスキルレベルと習熟度を紹介。",
  }),
  twitter: {
    title: "技術スタック | 魚住 紘平",
    description: "魚住 紘平が習得している技術スタック・プログラミング言語の一覧。",
  },
};

export default function SkillLayout({ children }: { children: React.ReactNode }) {
  return children;
}
