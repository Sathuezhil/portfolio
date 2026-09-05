"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { adminLogout, fetchAdminMe, getAdminToken } from "@/lib/api";

const links = [
  { href: "/admin", label: "Messages" },
  { href: "/admin/texts", label: "Texts" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!getAdminToken()) {
        router.replace("/admin/login");
        return;
      }

      fetchAdminMe()
        .then((data) => {
          setEmail(data?.email ?? "");
          setReady(true);
        })
        .catch(() => {
          adminLogout();
          router.replace("/admin/login");
        });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-mute">
        Checking admin session…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="font-mono text-xs tracking-[0.24em] text-gold">Admin</p>
            <p className="mt-1 text-sm text-mute">{email}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 ${
                  pathname === link.href ? "bg-gold text-paper" : "border border-line text-mute hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/" className="rounded-full border border-line px-4 py-1.5 text-mute hover:text-ink">
              View site
            </Link>
            <button
              type="button"
              className="rounded-full border border-line px-4 py-1.5 text-mute hover:text-ink"
              onClick={async () => {
                await adminLogout();
                router.replace("/admin/login");
              }}
            >
              Sign out
            </button>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">{children}</div>
    </div>
  );
}
