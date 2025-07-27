import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "魚住 紘平 | ウオミーのポートフォリオサイト",
    template: "%s | 魚住 紘平"
  },
  description: "福岡工業大学情報工学科在籍（3年生）のフルスタック開発者、魚住紘平のポートフォリオサイト。React、Next.js、Node.jsなど多様な技術スタックでの開発経験と作品を紹介。",
  keywords: [
    "魚住紘平", "うおずみこうへい", "フルスタック開発者", "ポートフォリオ",
    "React", "Next.js", "Node.js", "TypeScript", "JavaScript",
    "福岡工業大学", "情報工学科", "Webエンジニア", "プログラマー"
  ],
  authors: [{ name: "魚住 紘平", url: "https://github.com/KOU050223" }],
  creator: "魚住 紘平",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://portfolio.uomi.site",
    title: "魚住 紘平 | ウオミーのポートフォリオサイト",
    description: "福岡工業大学情報工学科在籍（3年生）のフルスタック開発者、魚住紘平のポートフォリオサイト。React、Next.js、Node.jsなど多様な技術スタックでの開発経験と作品を紹介。",
    siteName: "魚住 紘平 Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "魚住 紘平 | ウオミーのポートフォリオサイト",
    description: "福岡工業大学情報工学科在籍（3年生）のフルスタック開発者、魚住紘平のポートフォリオサイト。",
    creator: "@uomikou_0223",
    site: "@uomikou_0223",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "54b227c7ab084331",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="canonical" href="https://portfolio.uomi.site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/tinkani.png" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      {/* <!-- Google tag (gtag.js) --> */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-K46J4R2B4N"></script>
      <script>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-K46J4R2B4N');
        `}
        </script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-gray-950`}
      >
        <Header />
        <main className="pt-16 md:pt-20 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>

    </html>
  );
}
