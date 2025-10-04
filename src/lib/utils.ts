import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// YouTubeのビデオIDを抽出する関数
export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null
  }

  // 様々なYouTubeURL形式に対応
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1] && match[1].length === 11) {
      return match[1]
    }
  }

  // 最後の手段: URLから11文字の英数字を抽出
  const fallbackMatch = url.match(/([a-zA-Z0-9_-]{11})/)
  if (fallbackMatch && fallbackMatch[1]) {
    return fallbackMatch[1]
  }

  return null
}
