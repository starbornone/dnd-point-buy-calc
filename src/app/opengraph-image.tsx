import { ImageResponse } from "next/og";
import { messages } from "@/i18n/messages";

export const runtime = "edge";
export const alt = messages.en.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const copy = messages.en;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #1a1612 0%, #2c241c 55%, #3d2f22 100%)",
          color: "#f4efe6",
          padding: "64px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c4a574",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              border: "1px solid #c4a574",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✧
          </div>
          Starmist Studio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, maxWidth: 980 }}>{copy.title}</div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: "#d9d0c3", maxWidth: 920 }}>
            {copy.description}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
