import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Sathuryan Ezhilarasi · Frontend Engineer · Dubai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "avatar.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #140e10 0%, #24181b 58%, #3a2226 100%)",
          color: "#f6efe6",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#e88992",
            }}
          >
            Frontend Engineer
          </div>
          <div style={{ marginTop: 28, fontSize: 72, lineHeight: 1, fontFamily: "Georgia, serif" }}>
            Sathuryan
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 72,
              lineHeight: 1,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              color: "#f3b8bd",
            }}
          >
            Ezhilarasi
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#d4c4bb" }}>
            Sathuryan Ezhilarasi · Frontend Engineer · Dubai
          </div>
        </div>
        <img
          src={photoSrc}
          alt=""
          width={340}
          height={420}
          style={{
            objectFit: "cover",
            objectPosition: "center 18%",
            borderRadius: 36,
            border: "1px solid rgba(246, 239, 230, 0.18)",
          }}
        />
      </div>
    ),
    size,
  );
}
