import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Rakib Islam — Frontend Developer | React, Next.js, TypeScript";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#101114",
          color: "#f4f1e7",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 96,
            height: 96,
            backgroundColor: "#1b2ae0",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#a7a49a",
          }}
        >
          <span>Md. Rakib Islam</span>
          <span>Frontend developer</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 148,
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.06em",
              color: "#f4f1e7",
            }}
          >
            Rakib Islam<span style={{ color: "#8f9bff" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.35,
              color: "#c9c5ba",
              maxWidth: 900,
            }}
          >
            Building production web applications with React, Next.js and
            TypeScript.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 26,
            borderTop: "1px solid #35363c",
            fontFamily: "monospace",
            fontSize: 18,
            color: "#a7a49a",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <span>OgroniEdu</span>
            <span>Dhruto</span>
            <span>Gramer Bazar</span>
          </div>
          <span style={{ color: "#a3adff" }}>
            {siteConfig.url.replace("https://", "")}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
