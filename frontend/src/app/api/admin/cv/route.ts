import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin";
import { getCvInfo, removeCv, saveCv } from "@/lib/server/store";

export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024;

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) {
    return denied;
  }

  return NextResponse.json({ cv: await getCvInfo() });
}

export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) {
    return denied;
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: "Choose a PDF file to upload." }, { status: 422 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ message: "The CV must be 4 MB or smaller." }, { status: 422 });
  }

  const data = await file.arrayBuffer();
  const head = new TextDecoder().decode(data.slice(0, 5));

  if (head !== "%PDF-") {
    return NextResponse.json({ message: "Only PDF files can be uploaded." }, { status: 422 });
  }

  return NextResponse.json({ cv: await saveCv(data, file.name) });
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) {
    return denied;
  }

  await removeCv();
  return NextResponse.json({ cv: null });
}
