import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// title + date からスラッグIDを生成
export function generateSlugId(title: string, date: string, uniqueSuffix: string): string {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  const suffix = uniqueSuffix.replace(/-/g, "").slice(-8);
  const slug = `${date.replace(/\//g, "-")}-${cleanTitle}`
    .replace(/^-+|-+$/g, "") // 前後の余分なハイフンを除去
    .substring(0, 40);
  return suffix ? `${slug}-${suffix}` : slug;
}

// YYYY-MM-DD → YYYY/MM/DD 形式に変換
export function formatDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[1]}/${m[2]}/${m[3]}` : iso;
}

// アクティブなルートかどうかを判定する関数
export function isActiveRoute(pathname: string, path: string): boolean {
  if (path === "/") {
    return pathname === "/";
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

// YouTube系のホスト名かどうかを判定する関数
function isYouTubeHostname(hostname: string): boolean {
  return (
    hostname === "youtu.be" ||
    hostname === "youtube.com" ||
    hostname.endsWith(".youtube.com") ||
    hostname === "youtube-nocookie.com" ||
    hostname.endsWith(".youtube-nocookie.com")
  );
}

// YouTubeのビデオIDを抽出する関数
export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== "string") {
    return null;
  }

  // URLとしてパースし、YouTube系ホスト名かどうかを判定する
  let parsedUrl: URL | null = null;
  try {
    parsedUrl = new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`);
  } catch {
    // URLとして解釈できない場合はパターン一致のみ試みる
  }
  const isYouTubeUrl = parsedUrl !== null && isYouTubeHostname(parsedUrl.hostname);

  // URLとして解釈できる場合、YouTube系ホスト名でなければIDを返さない
  if (parsedUrl !== null && !isYouTubeUrl) {
    return null;
  }

  // 様々なYouTubeURL形式に対応
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
  }

  // 最後の手段: パス・クエリ・フラグメントから11文字の英数字を抽出（YouTube系ホスト名のみ）
  if (parsedUrl !== null && isYouTubeUrl) {
    const fallbackMatch = `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`.match(
      /([a-zA-Z0-9_-]{11})/,
    );
    if (fallbackMatch && fallbackMatch[1]) {
      return fallbackMatch[1];
    }
  }

  return null;
}
