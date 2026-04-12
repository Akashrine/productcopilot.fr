import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Product Copilot — Pack Vibe Coding for PMs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F0F0F",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 14,
            fontWeight: 700,
            color: "#E8FF8B",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: 24,
          }}
        >
          Product Copilot
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 700,
            color: "#F5F5F5",
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          Pack Vibe Coding for PMs
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#A3A3A3",
            lineHeight: 1.4,
          }}
        >
          12 prompts chaînés. De l&apos;idée au produit en prod. 29 €.
        </div>
      </div>
    ),
    { ...size },
  );
}
