import { ImageResponse } from "next/og";

export const alt = "Good Dog Days — dog walking and personalized dog care in Cumming, Georgia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "58px 68px",
        background: "#0f2942",
        color: "#fffdf8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
        <span>GOOD DOG DAYS</span>
        <span style={{ color: "#f2c230" }}>CUMMING, GA</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 900, lineHeight: 0.92, letterSpacing: -7 }}>
          Better days<br />for good dogs.
        </div>
        <div style={{ display: "flex", marginTop: 38, color: "#f2c230", fontSize: 27, fontWeight: 700 }}>
          DOG WALKING • ENRICHMENT • IN-HOME CARE
        </div>
      </div>
    </div>,
    size,
  );
}
