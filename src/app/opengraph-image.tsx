import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card. Generated at build time and reused for Open Graph and
 * Twitter, so a shared link renders a real preview instead of a bare gray link.
 *
 * Note: this is rendered by Satori, not a browser — every element with more
 * than one child needs an explicit `display: flex`, and there is no cascade.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#050f0a",
          backgroundImage:
            "radial-gradient(circle at 78% 22%, rgba(16,185,129,0.22) 0%, rgba(5,15,10,0) 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 44,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#34d399",
            }}
          />
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#34d399",
            }}
          >
            {SITE_TAGLINE}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1.05,
            color: "#f0fdf4",
          }}
        >
          <div style={{ display: "flex" }}>Your Kitchen,</div>
          <div style={{ display: "flex", color: "#34d399" }}>Powered by AI.</div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 32,
            lineHeight: 1.5,
            color: "rgba(209,250,229,0.75)",
            maxWidth: 820,
          }}
        >
          Track your pantry, plan meals with AI, reduce food waste, and hit your
          nutrition goals.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 56,
            fontSize: 28,
            fontWeight: 700,
            color: "rgba(240,253,244,0.55)",
          }}
        >
          {SITE_URL.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size
  );
}
