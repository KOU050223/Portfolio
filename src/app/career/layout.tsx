import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "キャリア",
  description: "魚住 紘平の学習履歴、開発経験、受賞歴、参加イベントなどのキャリア・実績一覧。プログラミング学習から実務経験までの成長過程を紹介。",
  keywords: [
    "キャリア", "経歴", "学習履歴", "実績", "経験", "受賞",
    "イベント参加", "開発経験", "魚住紘平", "エンジニア"
  ],
  openGraph: {
    title: "キャリア | 魚住 紘平",
    description: "魚住 紘平の学習履歴、開発経験、受賞歴、参加イベントなどのキャリア・実績一覧。プログラミング学習から実務経験までの成長過程を紹介。",
    type: "website",
  },
  twitter: {
    title: "キャリア | 魚住 紘平",
    description: "魚住 紘平の学習履歴、開発経験、受賞歴などのキャリア・実績一覧。",
  },
}

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}