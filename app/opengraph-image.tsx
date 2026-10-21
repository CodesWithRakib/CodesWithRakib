import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Md. Rakib Islam | Frontend Developer | React, Next.js, TypeScript";

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
          backgroundColor: "#09090b",
          color: "#f4f4f5",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle decorative glow in top right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 450,
            height: 450,
            borderRadius: "50%",
            backgroundColor: "#065f46",
            opacity: 0.25,
            filter: "blur(90px)",
          }}
        />

        {/* Top Bar: Brand Monogram & Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                backgroundColor: "#065f46",
                border: "1px solid #10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 700,
                color: "#ffffff",
                fontFamily: "monospace",
              }}
            >
              RI
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                Md. Rakib Islam
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "#a1a1aa",
                  fontFamily: "monospace",
                }}
              >
                Frontend Developer @ SOFOF Tech
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 20,
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              color: "#34d399",
              fontSize: 13,
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            <span>Available for Opportunities</span>
          </div>
        </div>

        {/* Center: Headline & Value Proposition */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 960,
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Building production-grade web systems with React, Next.js & TypeScript.
          </h1>
          <p
            style={{
              fontSize: 22,
              lineHeight: 1.4,
              color: "#a1a1aa",
              margin: 0,
            }}
          >
            Specializing in scalable frontend architecture, multi-role SaaS workflows,
            strict type contracts, and real-time media.
          </p>
        </div>

        {/* Bottom Bar: Stack Tags & Verification */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 24,
            borderTop: "1px solid #27272a",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {["React 19", "Next.js 16", "TypeScript", "Tailwind CSS", "NestJS", "PostgreSQL"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    fontSize: 14,
                    color: "#d4d4d8",
                    fontFamily: "monospace",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          <div
            style={{
              fontSize: 15,
              color: "#a1a1aa",
              fontFamily: "monospace",
            }}
          >
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
