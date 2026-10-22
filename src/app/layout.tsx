import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PROFILE } from "@/lib/profile";

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
    default: PROFILE.siteTitle,
    template: `%s | ${PROFILE.name}`,
  },
  description: PROFILE.description,
  keywords: [
    "魚住紘平",
    "うおずみこうへい",
    "フルスタック開発者",
    "ポートフォリオ",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "福岡工業大学",
    "情報工学科",
    "Webエンジニア",
    "プログラマー",
  ],
  authors: [{ name: PROFILE.name, url: PROFILE.githubUrl }],
  creator: PROFILE.name,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: PROFILE.siteUrl,
    title: PROFILE.siteTitle,
    description: PROFILE.description,
    siteName: PROFILE.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: PROFILE.siteTitle,
    description: PROFILE.shortDescription,
    creator: PROFILE.twitterHandle,
    site: PROFILE.twitterHandle,
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
        <link rel="canonical" href={PROFILE.siteUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/tinkani.png" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-gray-950`}
      >
        <Header />
        <main className="pt-16 md:pt-20 min-h-screen">{children}</main>
        <Footer />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K46J4R2B4N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K46J4R2B4N');
          `}
        </Script>
      </body>
    </html>
  );
}
