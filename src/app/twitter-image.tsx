import { ImageResponse } from "next/og";
import { PROFILE } from "@/lib/profile";
import { SharedOgLayout } from "./_components/SharedOgLayout";

export const runtime = "edge";
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
      backgroundColor="#0f172a"
      headerMarginBottom={30}
      avatar={{
        size: 100,
        gradient: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
        fontSize: 40,
        marginRight: 25,
      }}
      name={{ fontSize: 42, marginBottom: 8 }}
      subtitle={{ text: PROFILE.twitterHandle, fontSize: 22, color: "#1d4ed8" }}
      description={{
        text: PROFILE.twitterCardDescription,
        color: "#cbd5e1",
        fontSize: 18,
        maxWidth: 700,
        lineHeight: 1.3,
      }}
      techTags={PROFILE.twitterTechTags}
      tagsContainer={{
        marginTop: 25,
        gap: 15,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
      tag={{
        backgroundColor: "#1e40af",
        padding: "6px 12px",
        borderRadius: 6,
        fontSize: 14,
      }}
      footer={{ bottom: 25, right: 25, color: "#64748b", fontSize: 16 }}
    />,
    {
      ...size,
    },
  );
}
