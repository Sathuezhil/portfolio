"use client";

import { mergeProfile, useSiteContent } from "@/lib/site-content";

export function Footer() {
  const profile = mergeProfile(useSiteContent());
  return (
    <footer className="border-t border-line">
      <div className="gold-rule" />
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 text-sm text-mute sm:flex-row sm:items-center sm:px-8">
        <p>© 2026 {profile.fullName}</p>
        <p className="font-mono text-xs tracking-wider">
          Next.js · React · Laravel · MongoDB
        </p>
      </div>
    </footer>
  );
}
