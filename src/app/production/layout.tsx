import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "作品一覧",
  description: "魚住 紘平が制作したWebアプリケーション、システム開発プロジェクトの一覧。React、Next.js、Node.js等を使用した実際の開発成果物を紹介。",
  keywords: [
    "作品", "プロジェクト", "ポートフォリオ", "Webアプリケーション", "システム開発",
    "React", "Next.js", "Node.js", "TypeScript", "魚住紘平"
  ],
  openGraph: {
    title: "作品一覧 | 魚住 紘平",
    description: "魚住 紘平が制作したWebアプリケーション、システム開発プロジェクトの一覧。React、Next.js、Node.js等を使用した実際の開発成果物を紹介。",
    type: "website",
  },
  twitter: {
    title: "作品一覧 | 魚住 紘平",
    description: "魚住 紘平が制作したWebアプリケーション、システム開発プロジェクトの一覧。",
  },
}

export default function ProductionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}