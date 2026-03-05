import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge コンポーネント", () => {
  it("デフォルトでレンダリングされる", () => {
    render(<Badge>テスト</Badge>);
    expect(screen.getByText("テスト")).toBeInTheDocument();
  });

  it("children を表示する", () => {
    render(<Badge>バッジテキスト</Badge>);
    expect(screen.getByText("バッジテキスト")).toBeInTheDocument();
  });

  it("デフォルトvariantのクラスが適用される", () => {
    render(<Badge>default</Badge>);
    const badge = screen.getByText("default");
    expect(badge.className).toContain("bg-primary");
  });

  it("secondary variantのクラスが適用される", () => {
    render(<Badge variant="secondary">secondary</Badge>);
    const badge = screen.getByText("secondary");
    expect(badge.className).toContain("bg-secondary");
  });

  it("destructive variantのクラスが適用される", () => {
    render(<Badge variant="destructive">destructive</Badge>);
    const badge = screen.getByText("destructive");
    expect(badge.className).toContain("bg-destructive");
  });

  it("outline variantのクラスが適用される", () => {
    render(<Badge variant="outline">outline</Badge>);
    const badge = screen.getByText("outline");
    expect(badge.className).toContain("text-foreground");
  });

  it("追加 className が結合される", () => {
    render(<Badge className="custom-class">test</Badge>);
    const badge = screen.getByText("test");
    expect(badge.className).toContain("custom-class");
  });
});
