import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Samuel Kobina Gyasi | All my links in one place";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const previewButtons = [
  { label: "Connect on LinkedIn" },
  { label: "Chat on WhatsApp" },
  { label: "Invite me to speak or facilitate", featured: true },
  { label: "View my faith page" },
];

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
          alignItems: "center",
          padding: "0 80px",
          gap: 70,
          color: "#f5f3ef",
          fontFamily: "sans-serif",
          backgroundColor: "#0b1230",
          backgroundImage:
            "radial-gradient(circle at 25% 15%, rgba(84,108,250,0.55), transparent 50%), radial-gradient(circle at 95% 95%, rgba(53,71,209,0.45), transparent 45%)",
        }}
      >
        {/* Left: profile */}
        <div style={{ display: "flex", flexDirection: "column", width: 540 }}>
          <div
            style={{
              display: "flex",
              width: 190,
              height: 190,
              padding: 7,
              borderRadius: 999,
              backgroundImage: "linear-gradient(135deg, #7c8ffc, #3547d1)",
              boxShadow: "0 20px 50px rgba(53,71,209,0.5)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              width={176}
              height={176}
              style={{ borderRadius: 999, border: "5px solid #0b1230" }}
              alt=""
            />
          </div>
          <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.05, marginTop: 34 }}>
            Samuel Kobina Gyasi
          </div>
          <div style={{ fontSize: 30, marginTop: 16, color: "#c9d2ff" }}>
            All my links in one place
          </div>
          <div style={{ fontSize: 22, marginTop: 14, color: "rgba(245,243,239,0.65)" }}>
            Leader · Group Intelligence Facilitator
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginTop: 30,
              padding: "10px 22px",
              borderRadius: 999,
              fontSize: 22,
              letterSpacing: 1,
              color: "#ffffff",
              backgroundColor: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            samuelgyasi.com/links
          </div>
        </div>

        {/* Right: a glimpse of the link buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
          {previewButtons.map((b) => (
            <div
              key={b.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 78,
                borderRadius: 20,
                fontSize: 26,
                fontWeight: b.featured ? 700 : 500,
                color: "#ffffff",
                backgroundColor: b.featured ? "#3547d1" : "rgba(255,255,255,0.09)",
                ...(b.featured && { backgroundImage: "linear-gradient(135deg, #546cfa, #3547d1)" }),
                border: b.featured ? "1px solid transparent" : "1px solid rgba(255,255,255,0.18)",
                boxShadow: b.featured ? "0 16px 40px rgba(53,71,209,0.55)" : "none",
              }}
            >
              {b.label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
