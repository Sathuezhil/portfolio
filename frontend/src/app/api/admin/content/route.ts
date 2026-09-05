import { NextResponse } from "next/server";
import type { SiteContent } from "@/data/content";
import { requireAdmin } from "@/lib/server/admin";
import { getContent, saveContent } from "@/lib/server/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) {
    return denied;
  }

  return NextResponse.json(await getContent());
}

export async function PUT(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) {
    return denied;
  }

  const body = (await request.json().catch(() => null)) as SiteContent | null;

  if (!body?.profile?.firstName || !body.copy?.heroIntro) {
    return NextResponse.json({ message: "Please complete the required texts." }, { status: 422 });
  }

  return NextResponse.json(await saveContent(body));
}
