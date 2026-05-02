import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Sumit Tirmare - Motion Graphic Designer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to right, #04050d, #0f1b2e)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
          border: "4px solid #1a2a40",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            marginBottom: 20,
            background: "linear-gradient(to right, #ffffff, #89a2ff)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Sumit Tirmare
        </div>
        <div
          style={{
            fontSize: 42,
            color: "#59e7ff",
            letterSpacing: "2px",
          }}
        >
          MOTION GRAPHIC DESIGNER & 2D ANIMATOR
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            color: "#f85f9b",
            letterSpacing: "1px",
          }}
        >
          Crafting visuals that move emotions.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
