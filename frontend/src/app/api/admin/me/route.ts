import { NextResponse } from "next/server";
import { adminCredentials, requireAdmin } from "@/lib/server/admin";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) {
    return denied;
  }

  return NextResponse.json({ email: adminCredentials().email });
}
