import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import assets from "@/data/assets.json";

const photoData = await readFile(
  join(process.cwd(), "public", assets.servicesSharePhoto.src),
  "base64",
);
const photoSrc = `data:image/jpeg;base64,${photoData}`;

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
        position: "relative",
        overflow: "hidden",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "58px 68px",
        background: "#f2c230",
        color: "#0f2942",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <img
        src={photoSrc}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ display: "flex", position: "absolute", inset: 0, background: "rgba(242, 194, 48, 0.78)" }} />
      <div style={{ display: "flex", position: "relative", justifyContent: "space-between", fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
        <span>GOOD DOG DAYS</span>
        <span>CUMMING + FORSYTH COUNTY</span>
      </div>
      <div style={{ display: "flex", position: "relative", flexDirection: "column" }}>
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
