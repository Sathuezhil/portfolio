"use client";

import { mergeProfile, useSiteContent } from "@/lib/site-content";

export function Footer() {
  const profile = mergeProfile(useSiteContent());
  return (
    <footer className="border-t border-line">
      <div className="gold-rule" />
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 text-sm text-mute sm:flex-row sm:items-center sm:px-8">
        <p>© 2026 {profile.fullName}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="hover:text-ink">
            WhatsApp
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-ink">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
