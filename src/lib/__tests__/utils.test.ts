import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cn, devLog, extractYouTubeId, isActiveRoute, splitTags } from "@/lib/utils";

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

  it("YouTube系URLの既知パターン以外ではフォールバックでIDを抽出する", () => {
    expect(extractYouTubeId("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(extractYouTubeId("https://youtube-nocookie.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(extractYouTubeId("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ",
    );
  });

  it("YouTube以外のURLではフォールバックせずnullを返す", () => {
    expect(extractYouTubeId("https://example.com/dQw4w9WgXcQ")).toBeNull();
    expect(extractYouTubeId("https://notyoutube.com/watch?v=dQw4w9WgXcQ")).toBeNull();
    expect(extractYouTubeId("https://example.com/?q=youtube.com/dQw4w9WgXcQ")).toBeNull();
  });

  it("11文字英数字が存在しない場合nullを返す", () => {
    expect(extractYouTubeId("https://example.com/short")).toBeNull();
    expect(extractYouTubeId("https://www.youtube.com/short")).toBeNull();
  });
});

describe("splitTags()", () => {
  it("カンマ区切りのタグをトリムして返す", () => {
    expect(splitTags("仕事, インターン ,ハッカソン")).toEqual(["仕事", "インターン", "ハッカソン"]);
  });

  it("空文字になるタグを除外する", () => {
    expect(splitTags("仕事, ,インターン,,  ,ハッカソン,")).toEqual([
      "仕事",
      "インターン",
      "ハッカソン",
    ]);
  });

  it("空文字または空白のみでは空配列を返す", () => {
    expect(splitTags("")).toEqual([]);
    expect(splitTags("   ")).toEqual([]);
    expect(splitTags(", ,,")).toEqual([]);
  });
});

describe("isActiveRoute()", () => {
  it("path が / の場合は pathname === / のときのみ true", () => {
    expect(isActiveRoute("/", "/")).toBe(true);
    expect(isActiveRoute("/career", "/")).toBe(false);
  });

  it("完全一致で true を返す", () => {
    expect(isActiveRoute("/career", "/career")).toBe(true);
  });

  it("サブパスで true を返す", () => {
    expect(isActiveRoute("/career/1", "/career")).toBe(true);
    expect(isActiveRoute("/production/abc", "/production")).toBe(true);
  });

  it("前方一致だがパス境界でない場合は false を返す", () => {
    expect(isActiveRoute("/career-something", "/career")).toBe(false);
    expect(isActiveRoute("/careerabc", "/career")).toBe(false);
  });

  it("別パスでは false を返す", () => {
    expect(isActiveRoute("/hobby", "/career")).toBe(false);
  });
});
