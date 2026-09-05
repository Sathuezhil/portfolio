import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin";
import { getMessages, saveMessages } from "@/lib/server/store";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(request);
  if (denied) {
    return denied;
  }

  const { id } = await context.params;
  const messages = await getMessages();
  const next = messages.filter((message) => message.id !== id);

  if (next.length === messages.length) {
    return NextResponse.json({ message: "Message not found." }, { status: 404 });
  }

  await saveMessages(next);
  return NextResponse.json({ message: "Deleted." });
}
