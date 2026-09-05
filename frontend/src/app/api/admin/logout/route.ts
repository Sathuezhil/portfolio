import { NextResponse } from "next/server";
import { bearerToken, forgetToken } from "@/lib/server/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await forgetToken(bearerToken(request));
  return NextResponse.json({ message: "Signed out." });
}
