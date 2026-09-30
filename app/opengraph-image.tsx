import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Samuel Kobina Gyasi — Leader & Group Intelligence Facilitator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "photo-hero.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          color: "#f5f3ef",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 0 0 80px",
          }}
        >
          <div style={{ fontSize: 24, color: "#7c8ffc", letterSpacing: 4, textTransform: "uppercase" }}>
            samuelgyasi.com
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, marginTop: 24 }}>
            Samuel Kobina Gyasi
          </div>
          <div style={{ fontSize: 34, marginTop: 24, color: "rgba(245,243,239,0.75)" }}>
            Leader &amp; Group Intelligence Facilitator
          </div>
          <div style={{ fontSize: 24, marginTop: 40, color: "rgba(245,243,239,0.55)" }}>
            Technology · Leadership · Intelligence · Transformation
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} width={642 * (590 / 820)} height={590} style={{ alignSelf: "flex-end", marginRight: 40 }} alt="" />
      </div>
    ),
    size,
  );
}
