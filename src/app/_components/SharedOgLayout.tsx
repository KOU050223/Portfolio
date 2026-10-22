import type { CSSProperties } from "react";
import { PROFILE } from "@/lib/profile";

export interface SharedOgLayoutProps {
  backgroundColor: string;
  headerMarginBottom: number;
  avatar: {
    size: number;
    gradient: string;
    fontSize: number;
    marginRight: number;
  };
  name: {
    fontSize: number;
    marginBottom: number;
  };
  subtitle: {
    text: string;
    fontSize: number;
    color: string;
  };
  description: {
    text: string;
    color: string;
    fontSize: number;
    maxWidth: number;
    lineHeight: number;
  };
  techTags: readonly string[];
  tagsContainer: {
    marginTop: number;
    gap: number;
    flexWrap?: CSSProperties["flexWrap"];
    justifyContent?: CSSProperties["justifyContent"];
  };
  tag: {
    backgroundColor: string;
    padding: string;
    borderRadius: number;
    fontSize: number;
  };
  footer: {
    bottom: number;
    right: number;
    color: string;
    fontSize: number;
  };
}

export function SharedOgLayout({
  backgroundColor,
  headerMarginBottom,
  avatar,
  name,
  subtitle,
  description,
  techTags,
  tagsContainer,
  tag,
  footer,
}: SharedOgLayoutProps) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        fontSize: 32,
        fontWeight: 600,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: headerMarginBottom,
        }}
      >
        <div
          style={{
            width: avatar.size,
            height: avatar.size,
            borderRadius: "50%",
            background: avatar.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: avatar.marginRight,
            color: "white",
            fontSize: avatar.fontSize,
            fontWeight: "bold",
          }}
        >
          {PROFILE.avatarInitial}
        </div>
        <div style={{ color: "white", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: name.fontSize, marginBottom: name.marginBottom }}>
            {PROFILE.name}
          </div>
          <div style={{ fontSize: subtitle.fontSize, color: subtitle.color }}>{subtitle.text}</div>
        </div>
      </div>
      <div
        style={{
          color: description.color,
          fontSize: description.fontSize,
          textAlign: "center",
          maxWidth: description.maxWidth,
          lineHeight: description.lineHeight,
        }}
      >
        {description.text}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: tagsContainer.marginTop,
          gap: tagsContainer.gap,
          ...(tagsContainer.flexWrap ? { flexWrap: tagsContainer.flexWrap } : {}),
          ...(tagsContainer.justifyContent ? { justifyContent: tagsContainer.justifyContent } : {}),
        }}
      >
        {techTags.map((tech) => (
          <div
            key={tech}
            style={{
              backgroundColor: tag.backgroundColor,
              color: "white",
              padding: tag.padding,
              borderRadius: tag.borderRadius,
              fontSize: tag.fontSize,
            }}
          >
            {tech}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: footer.bottom,
          right: footer.right,
          color: footer.color,
          fontSize: footer.fontSize,
        }}
      >
        {PROFILE.siteDomain}
      </div>
    </div>
  );
}
