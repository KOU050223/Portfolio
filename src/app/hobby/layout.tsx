import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "趣味",
  description: "魚住 紘平のプログラミング以外の趣味や興味について紹介。バランスの取れた生活とプライベートの活動をご紹介します。",
  keywords: [
    "趣味", "プライベート", "興味", "活動", "ライフスタイル", "魚住紘平"
  ],
  openGraph: {
    title: "趣味 | 魚住 紘平",
    description: "魚住 紘平のプログラミング以外の趣味や興味について紹介。バランスの取れた生活とプライベートの活動をご紹介します。",
    type: "website",
  },
  twitter: {
    title: "趣味 | 魚住 紘平",
    description: "魚住 紘平のプログラミング以外の趣味や興味について紹介。",
  },
}

export default function HobbyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}