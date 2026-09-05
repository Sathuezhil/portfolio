import { NextResponse } from "next/server";
import { adminCredentials, checkLogin, issueToken } from "@/lib/server/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const email = String(body?.email ?? "");
  const password = String(body?.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 422 });
  }

  const result = checkLogin(email, password);

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json({
    token: await issueToken(),
    email: adminCredentials().email,
  });
}
