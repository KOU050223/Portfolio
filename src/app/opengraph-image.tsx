import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/profile";
import { SharedOgLayout } from "./_components/SharedOgLayout";

export const dynamic = "force-static";

export const alt = PROFILE.siteTitle;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <SharedOgLayout
      backgroundColor="#1f2937"
      headerMarginBottom={40}
      avatar={{
        size: 120,
        gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        fontSize: 48,
        marginRight: 30,
      }}
      name={{ fontSize: 48, marginBottom: 10 }}
      subtitle={{ text: PROFILE.role, fontSize: 24, color: "#3b82f6" }}
      description={{
        text: PROFILE.ogDescription,
        color: "#9ca3af",
        fontSize: 20,
        maxWidth: 800,
        lineHeight: 1.4,
      }}
      techTags={PROFILE.ogTechTags}
      tagsContainer={{ marginTop: 30, gap: 20 }}
      tag={{
        backgroundColor: "#3b82f6",
        padding: "8px 16px",
        borderRadius: 8,
        fontSize: 16,
      }}
      footer={{ bottom: 30, right: 30, color: "#6b7280", fontSize: 18 }}
    />,
    {
      ...size,
    },
  );
}
