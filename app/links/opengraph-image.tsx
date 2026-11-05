import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Samuel Kobina Gyasi | All my links in one place";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Centred and large so it stays readable in a phone chat bubble and survives
// WhatsApp's square centre-crop of link previews.
export default async function LinksOpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "favicon.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#f5f3ef",
          fontFamily: "sans-serif",
          backgroundColor: "#0b1230",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(84,108,250,0.6), transparent 55%), radial-gradient(circle at 50% 120%, rgba(53,71,209,0.45), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 230,
            height: 230,
            padding: 8,
            borderRadius: 999,
            backgroundImage: "linear-gradient(135deg, #7c8ffc, #3547d1)",
            boxShadow: "0 20px 60px rgba(53,71,209,0.6)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            width={214}
            height={214}
            style={{ borderRadius: 999, border: "6px solid #0b1230" }}
            alt=""
          />
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, marginTop: 30, lineHeight: 1 }}>
          Samuel Kobina Gyasi
        </div>
        <div style={{ fontSize: 36, marginTop: 18, color: "#c9d2ff" }}>
          All my links in one place
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            padding: "12px 30px",
            borderRadius: 999,
            fontSize: 30,
            color: "#ffffff",
            backgroundImage: "linear-gradient(135deg, #546cfa, #3547d1)",
            boxShadow: "0 14px 34px rgba(53,71,209,0.55)",
          }}
        >
          samuelgyasi.com/links
        </div>
      </div>
    ),
    size,
  );
}
