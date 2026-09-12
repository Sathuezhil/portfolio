"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin, fetchAdminMe, getAdminToken } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!getAdminToken()) {
        return;
      }

      fetchAdminMe()
        .then(() => router.replace("/admin"))
        .catch(() => undefined);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [router]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSending(true);
    setError("");

    try {
      await adminLogin(String(form.get("email") ?? ""), String(form.get("password") ?? ""));
      window.setTimeout(() => router.replace("/admin"), 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-[1.6rem] border border-line bg-surface/60 p-8"
      >
        <p className="font-mono text-xs tracking-[0.28em] text-gold">Admin</p>
        <h1 className="mt-3 font-serif text-4xl">Sign in</h1>
        <p className="mt-2 text-sm text-mute">Read contact messages and edit site texts.</p>
        <label className="mt-8 block text-sm">
          <span className="text-mute">Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="username"
            className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
          />
        </label>
        <label className="mt-4 block text-sm">
          <span className="text-mute">Password</span>
          <input
            required
            type="password"
            name="password"
            autoComplete="current-password"
            className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
          />
        </label>
        <button
          type="submit"
          disabled={sending}
          className="mt-6 w-full rounded-full bg-gold py-3 text-sm font-medium text-paper disabled:opacity-60"
        >
          {sending ? "Signing in…" : "Sign in"}
        </button>
        {error ? <p className="mt-3 text-sm text-[var(--danger)]">{error}</p> : null}
      </form>
    </div>
  );
}
