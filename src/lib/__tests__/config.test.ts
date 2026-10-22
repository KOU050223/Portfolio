import { describe, it, expect, vi, afterEach } from "vitest";

const importConfig = async () => {
  vi.resetModules();
  return import("@/lib/config");
};

describe("config の警告ログ", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("開発環境で NOTION_API_KEY 未設定なら警告を出力する", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NOTION_API_KEY", "");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    await importConfig();

    expect(warn).toHaveBeenCalledWith("警告: NOTION_API_KEY が設定されていません。");
  });

  it("本番環境では警告を出力しない", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NOTION_API_KEY", "");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    await importConfig();

    expect(warn).not.toHaveBeenCalled();
  });

  it("NOTION_API_KEY が設定済みなら開発環境でも警告を出力しない", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NOTION_API_KEY", "test-key");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    await importConfig();

    expect(warn).not.toHaveBeenCalled();
  });
});
