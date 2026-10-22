import { isIP } from "node:net";
import ogs from "open-graph-scraper";
import { unstable_cache } from "next/cache";

/**
 * SSRF対策: URLがプライベートIPアドレスやローカルホストを指していないか検証する
 * @param url - 検証するURL
 * @returns 正当なURLであればtrue, そうでなければfalse
 */
export function isValidUrl(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url);

    // HTTP/HTTPSプロトコルのみを許可
    if (!["http:", "https:"].includes(protocol)) {
      return false;
    }

    // IPv6アドレスは [::1] のように角括弧付きで返るため除去する
    const host = hostname.replace(/^\[|\]$/g, "");

    // ローカルホストやプライベートIP範囲をブロック
    if (
      host === "localhost" ||
      host === "0.0.0.0" ||
      host.startsWith("127.") ||
      host.startsWith("192.168.") ||
      host.startsWith("10.") ||
      host.startsWith("169.254.") ||
      host.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)
    ) {
      return false;
    }

    // Vercel環境の内部ホスト名をブロック
    if (host.endsWith(".internal")) {
      return false;
    }

    // IPv6の内部アドレスをブロック
    if (isIP(host) === 6) {
      const ipv6 = host.toLowerCase();
      if (
        ipv6 === "::" || // 未指定アドレス
        ipv6 === "::1" || // ループバック
        ipv6.startsWith("::ffff:") || // IPv4マップド
        /^f[cd]/.test(ipv6) || // ユニークローカル fc00::/7
        /^fe[89ab]/.test(ipv6) // リンクローカル fe80::/10
      ) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

// Next.jsのunstable_cacheを使用してOGP取得結果をキャッシュする関数
const getOgpWithCache = unstable_cache(
  async (url: string) => {
    if (!isValidUrl(url)) {
      console.error(`[OGP Fetch] Invalid or disallowed URL: ${url}`);
      return null;
    }

    console.log(`[OGP Fetch] Fetching OGP for: ${url}`);
    try {
      const { result } = await ogs({
        url,
        timeout: 5000, // 5秒のタイムアウト
        fetchOptions: {
          headers: {
            // 一部のサイトで403エラーを回避するためにUser-Agentを設定
            "user-agent":
              "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
          },
        },
      });

      if (result.success) {
        return result;
      }
      return null;
    } catch (error: unknown) {
      console.error(`[OGP Fetch] Error fetching OGP for ${url}:`, {
        message: error instanceof Error ? error.message : "Unknown error",
        result: error && typeof error === "object" && "result" in error ? error.result : undefined,
      });
      return null;
    }
  },
  ["ogp-data"], // キャッシュキーのプレフィックス
  {
    revalidate: 3600 * 24, // 24時間キャッシュを保持
  },
);

export async function getOgp(url: string) {
  return getOgpWithCache(url);
}

export async function getOgpImage(url: string): Promise<string | null> {
  try {
    const ogp = await getOgpWithCache(url);
    if (ogp?.ogImage && ogp.ogImage.length > 0) {
      // ogImage[0]がオブジェクトか文字列かを判定
      const image = ogp.ogImage[0];
      return typeof image === "string" ? image : image.url;
    }
    return null;
  } catch (error) {
    console.error("[OGP Fetch] Error extracting OGP image:", error);
    return null;
  }
}
