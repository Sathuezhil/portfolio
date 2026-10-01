import { NextResponse } from "next/server";
import { getCvFile } from "@/lib/server/store";

export const dynamic = "force-dynamic";

const FILE_NAME = "Sathuryan-Ezhilarasi-CV.pdf";

export async function GET(request: Request) {
  const file = await getCvFile();

  if (!file) {
    return NextResponse.redirect(new URL("/sathuryan-ezhilarasi.pdf", request.url));
  }

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${FILE_NAME}"`,
      "Content-Length": String(file.byteLength),
      "Cache-Control": "no-store",
    },
  });
}
