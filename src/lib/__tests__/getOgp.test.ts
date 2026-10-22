import { describe, it, expect, vi } from "vitest";

vi.mock("next/cache", () => ({
  unstable_cache: (fn: unknown) => fn,
}));

vi.mock("open-graph-scraper", () => ({
  default: vi.fn(),
}));

import { isValidUrl } from "@/lib/getOgp";

describe("isValidUrl()", () => {
  describe("許可するURL", () => {
    it.each([
      "https://example.com",
      "https://www.google.com/path?q=1",
      "https://example.com:8080",
      "http://8.8.8.8",
      "https://[2606:4700:4700::1111]/",
      // 172.16.0.0/12 の範囲外は許可
      "http://172.15.0.1",
      "http://172.32.0.1",
    ])("%s を許可する", (url) => {
      expect(isValidUrl(url)).toBe(true);
    });
  });

  describe("拒否するURL", () => {
    it.each([
      // HTTP/HTTPS以外のプロトコル
      "ftp://example.com",
      "file:///etc/passwd",
      // 不正なURL
      "not-a-url",
      // ローカルホスト
      "http://localhost",
      "http://localhost:3000",
      // プライベートIPv4
      "http://127.0.0.1",
      "http://127.1",
      "http://10.0.0.1",
      "http://172.16.0.1",
      "http://172.31.255.1",
      "http://192.168.1.1",
      // IPv4リンクローカル・未指定アドレス
      "http://169.254.169.254",
      "http://0.0.0.0",
      // 非標準表記のIPv4（正規化されて127.0.0.1 / 0.0.0.0になる）
      "http://2130706433/",
      "http://0x7f000001/",
      "http://0/",
      // 内部ホスト名
      "http://foo.internal",
      // IPv6ループバック
      "http://[::1]/",
      // IPv6リンクローカル fe80::/10
      "http://[fe80::1]/",
      "http://[febf::1]/",
      // IPv6ユニークローカル fc00::/7
      "http://[fc00::1]/",
      "http://[fd12::1]/",
      // IPv6未指定アドレス
      "http://[::]/",
      // IPv4マップドIPv6
      "http://[::ffff:127.0.0.1]/",
      "http://[::ffff:7f00:1]/",
      "http://[0:0:0:0:0:ffff:7f00:1]/",
    ])("%s を拒否する", (url) => {
      expect(isValidUrl(url)).toBe(false);
    });
  });
});
