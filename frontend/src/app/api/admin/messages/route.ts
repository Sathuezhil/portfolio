import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin";
import { getMessages } from "@/lib/server/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) {
    return denied;
  }

  const messages = await getMessages();

  return NextResponse.json({
    messages,
    unread: messages.filter((message) => !message.read).length,
  });
}
