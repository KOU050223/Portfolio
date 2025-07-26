import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages用の静的エクスポート設定
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  // Cloudflare Pagesでは画像最適化が利用できないため無効化
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/profile_images/**',
      },
      {
        protocol: 'https',
        hostname: 'skillicons.dev',
        port: '',
        pathname: '/icons/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // 静的エクスポート時にAPIルートを無効化
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
