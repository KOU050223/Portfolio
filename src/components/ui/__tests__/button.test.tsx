import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { Button } from "@/components/ui/button";

describe("Button コンポーネント", () => {
  it("デフォルトでレンダリングされる", () => {
    render(<Button>クリック</Button>);
    expect(screen.getByRole("button", { name: "クリック" })).toBeInTheDocument();
  });

  it("クリックイベントが発火する", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>クリック</Button>);
    await userEvent.click(screen.getByRole("button", { name: "クリック" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 状態ではクリックイベントが発火しない", async () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        クリック
      </Button>,
    );
    const button = screen.getByRole("button", { name: "クリック" });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("destructive variantのクラスが適用される", () => {
    render(<Button variant="destructive">delete</Button>);
    const button = screen.getByRole("button", { name: "delete" });
    expect(button.className).toContain("bg-destructive");
  });

  it("outline variantのクラスが適用される", () => {
    render(<Button variant="outline">outline</Button>);
    const button = screen.getByRole("button", { name: "outline" });
    expect(button.className).toContain("border");
  });

  it("ghost variantのクラスが適用される", () => {
    render(<Button variant="ghost">ghost</Button>);
    const button = screen.getByRole("button", { name: "ghost" });
    expect(button.className).toContain("hover:bg-accent");
  });

  it("sm sizeのクラスが適用される", () => {
    render(<Button size="sm">small</Button>);
    const button = screen.getByRole("button", { name: "small" });
    expect(button.className).toContain("h-8");
  });

  it("lg sizeのクラスが適用される", () => {
    render(<Button size="lg">large</Button>);
    const button = screen.getByRole("button", { name: "large" });
    expect(button.className).toContain("h-10");
  });

  it("icon sizeのクラスが適用される", () => {
    render(<Button size="icon">i</Button>);
    const button = screen.getByRole("button", { name: "i" });
    expect(button.className).toContain("h-9 w-9");
  });

  it("ref が転送される", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>ref test</Button>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("BUTTON");
  });

  it("asChild=true で Slot として描画される", () => {
    render(
      // oxlint-disable-next-line eslint-plugin-next/no-html-link-for-pages
      <Button asChild>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="https://example.com">リンク</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "リンク" });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
  });
});
