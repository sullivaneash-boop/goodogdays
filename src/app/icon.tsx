import { ImageResponse } from "next/og";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 38,
        background: "#f2c230",
        color: "#0f2942",
        fontFamily: "Arial Black, Arial, sans-serif",
        fontSize: 72,
        fontWeight: 900,
        letterSpacing: -7,
      }}
    >
      GD
    </div>,
    size,
  );
}
