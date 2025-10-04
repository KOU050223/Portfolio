import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercelは画像最適化をサポート
  images: {
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
      {
        protocol: 'https',
        hostname: 'lh7-us.googleusercontent.com',
        port: '',
        pathname: '/docs/**',
      },
      {
        protocol: 'https',
        hostname: 'qiita-user-contents.imgix.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ptera-publish.topaz.dev',
        port: '',
        pathname: '/project/**',
      },
      {
        protocol: 'https',
        hostname: 'static.canva.com',
        port: '',
        pathname: '/static/images/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.st-note.com',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
