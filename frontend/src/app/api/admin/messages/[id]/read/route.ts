import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin";
import { getMessages, saveMessages } from "@/lib/server/store";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(request);
  if (denied) {
    return denied;
  }

  const { id } = await context.params;
  const messages = await getMessages();
  const index = messages.findIndex((message) => message.id === id);

  if (index < 0) {
    return NextResponse.json({ message: "Message not found." }, { status: 404 });
  }

  messages[index] = { ...messages[index], read: true };
  await saveMessages(messages);

  return NextResponse.json({ message: messages[index] });
}
