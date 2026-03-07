import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// title + date からスラッグIDを生成
export function generateSlugId(title: string, date: string): string {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  // 英数字タイトルがある場合はそれを使い、なければタイトルの簡易ハッシュを使う
  const titlePart =
    cleanTitle ||
    title
      .split("")
      .reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) & 0xffff, 0)
      .toString(36);
  const slug = `${date.replace(/\//g, "-")}-${titlePart}`
    .replace(/^-+|-+$/g, "") // 前後の余分なハイフンを除去
    .substring(0, 50);
  return slug;
}

// YYYY-MM-DD → YYYY/MM/DD 形式に変換
export function formatDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[1]}/${m[2]}/${m[3]}` : iso;
}

// YouTubeのビデオIDを抽出する関数
export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== "string") {
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

  // 最後の手段: URLから11文字の英数字を抽出
  const fallbackMatch = url.match(/([a-zA-Z0-9_-]{11})/);
  if (fallbackMatch && fallbackMatch[1]) {
    return fallbackMatch[1];
  }

  return null;
}
