import { NextResponse } from "next/server";
import { getMessages, saveMessages } from "@/lib/server/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const subject = String(body?.subject ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !email || !subject || !message || !email.includes("@")) {
    return NextResponse.json({ message: "Please fill in every field." }, { status: 422 });
  }

  const messages = await getMessages();
  messages.unshift({
    id: crypto.randomUUID(),
    name: name.slice(0, 120),
    email: email.slice(0, 180),
    subject: subject.slice(0, 180),
    message: message.slice(0, 4000),
    read: false,
    created_at: new Date().toISOString(),
  });
  await saveMessages(messages);

  return NextResponse.json({ message: "Message received.", storage: "netlify" }, { status: 201 });
}
