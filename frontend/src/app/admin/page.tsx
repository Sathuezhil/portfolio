"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteMessage, fetchAdminMessages, markMessageRead, type InboxMessage } from "@/lib/api";

function Inbox() {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [unread, setUnread] = useState(0);
  const [selected, setSelected] = useState<InboxMessage | null>(null);
  const [error, setError] = useState("");

  async function load() {
    const data = await fetchAdminMessages();
    setMessages(data.messages);
    setUnread(data.unread);
    setSelected((current) => data.messages.find((item) => item.id === current?.id) ?? data.messages[0] ?? null);
  }

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : "Unable to load messages."));
  }, []);

  async function openMessage(message: InboxMessage) {
    setSelected(message);

    if (!message.read) {
      await markMessageRead(message.id);
      await load();
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs tracking-[0.28em] text-gold">Inbox</p>
          <h1 className="mt-2 font-serif text-4xl">Messages from the site</h1>
        </div>
        <p className="text-sm text-mute">
          {unread} unread · {messages.length} total
        </p>
      </div>
      {error ? <p className="mt-6 text-sm text-[var(--danger)]">{error}</p> : null}
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          {messages.length === 0 ? (
            <p className="rounded-2xl border border-line p-5 text-sm text-mute">No messages yet.</p>
          ) : (
            messages.map((message) => (
              <button
                key={message.id}
                type="button"
                onClick={() => openMessage(message)}
                className={`w-full rounded-2xl border px-4 py-4 text-left ${
                  selected?.id === message.id ? "border-gold bg-surface" : "border-line bg-surface/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium">{message.name}</p>
                  {!message.read ? <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] text-paper">New</span> : null}
                </div>
                <p className="mt-1 text-sm text-gold-soft">{message.subject}</p>
                <p className="mt-2 line-clamp-2 text-sm text-mute">{message.message}</p>
              </button>
            ))
          )}
        </div>
        <div className="rounded-[1.5rem] border border-line bg-surface/50 p-6">
          {selected ? (
            <>
              <p className="font-mono text-xs text-gold" suppressHydrationWarning>
                {new Date(selected.created_at).toLocaleString()}
              </p>
              <h2 className="mt-2 font-serif text-3xl">{selected.subject}</h2>
              <p className="mt-3 text-sm">
                {selected.name} ·{" "}
                <a href={`mailto:${selected.email}`} className="text-gold-soft hover:text-gold">
                  {selected.email}
                </a>
              </p>
              <p className="mt-6 whitespace-pre-wrap leading-7 text-mute">{selected.message}</p>
              <button
                type="button"
                className="mt-8 rounded-full border border-line px-4 py-2 text-sm text-mute hover:text-ink"
                onClick={async () => {
                  await deleteMessage(selected.id);
                  setSelected(null);
                  await load();
                }}
              >
                Delete message
              </button>
            </>
          ) : (
            <p className="text-sm text-mute">Select a message to read it.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default function AdminMessagesPage() {
  return (
    <AdminShell>
      <Inbox />
    </AdminShell>
  );
}
