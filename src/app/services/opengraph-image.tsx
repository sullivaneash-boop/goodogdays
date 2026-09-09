import { ImageResponse } from "next/og";

export const alt = "Good Dog Days services and pricing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ServicesOpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "58px 68px",
        background: "#f2c230",
        color: "#0f2942",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
        <span>GOOD DOG DAYS</span>
        <span>CUMMING + FORSYTH COUNTY</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 88, fontWeight: 900, lineHeight: 0.92, letterSpacing: -7 }}>
          Services<br />+ pricing.
        </div>
        <div style={{ display: "flex", marginTop: 38, fontSize: 27, fontWeight: 700 }}>
          CLEAR OPTIONS • TRANSPARENT PRICES • PERSONAL CARE
        </div>
      </div>
    </div>,
    size,
  );
}
