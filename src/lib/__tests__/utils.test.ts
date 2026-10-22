import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cn, devLog, extractYouTubeId } from "@/lib/utils";

describe("cn()", () => {
  it("単一クラス名を返す", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("複数クラス名を結合する", () => {
    expect(cn("foo", "bar", "baz")).toBe("foo bar baz");
  });

  it("falsy値を除外する", () => {
    expect(cn("foo", undefined, null, false, "", "bar")).toBe("foo bar");
  });

  it("Tailwind競合クラスを上書きする（twMerge）", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("条件付きクラスを処理する", () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn("base", isActive && "active", isDisabled && "disabled")).toBe("base active");
  });
});

describe("devLog()", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    logSpy.mockRestore();
  });

  it("development 環境では console.log に引数をそのまま渡す", () => {
    vi.stubEnv("NODE_ENV", "development");
    devLog("hogehoge", { foo: 1 }, 123);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith("hogehoge", { foo: 1 }, 123);
  });

  it("production 環境では console.log を呼ばない", () => {
    vi.stubEnv("NODE_ENV", "production");
    devLog("hogehoge");
    expect(logSpy).not.toHaveBeenCalled();
  });

  it("test 環境では console.log を呼ばない", () => {
    vi.stubEnv("NODE_ENV", "test");
    devLog("hogehoge");
    expect(logSpy).not.toHaveBeenCalled();
  });
});

describe("extractYouTubeId()", () => {
  it("youtube.com/watch?v=XXX 形式からIDを抽出する", () => {
    expect(extractYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("youtu.be/XXX 短縮形式からIDを抽出する", () => {
    expect(extractYouTubeId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("youtube.com/embed/XXX 形式からIDを抽出する", () => {
    expect(extractYouTubeId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("youtube.com/v/XXX 形式からIDを抽出する", () => {
    expect(extractYouTubeId("https://www.youtube.com/v/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("m.youtube.com モバイル形式からIDを抽出する", () => {
    expect(extractYouTubeId("https://m.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("複数クエリパラメータ付きURLからIDを抽出する", () => {
    expect(extractYouTubeId("https://www.youtube.com/watch?list=PLtest&v=dQw4w9WgXcQ&t=10")).toBe(
      "dQw4w9WgXcQ",
    );
  });

  it("空文字でnullを返す", () => {
    expect(extractYouTubeId("")).toBeNull();
  });

  it("YouTube以外のURLでフォールバック動作をする", () => {
    // フォールバック: 11文字英数字を抽出
    const result = extractYouTubeId("https://example.com/dQw4w9WgXcQ");
    expect(result).toBe("dQw4w9WgXcQ");
  });

  it("11文字英数字が存在しない場合nullを返す", () => {
    expect(extractYouTubeId("https://example.com/short")).toBeNull();
  });
});
