"use client";

import { useState } from "react";
import { navLinks } from "@/data/content";
import { mergeProfile, useSiteContent } from "@/lib/site-content";
import { CloseIcon, MenuIcon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const profile = mergeProfile(useSiteContent());

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-mono text-xs tracking-[0.22em] text-gold-soft">
          SE / {profile.firstName.toUpperCase()}
        </a>
        <nav className="hidden items-center gap-8 text-sm text-mute md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link transition-colors hover:text-gold">
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-shine rounded-full border border-gold/40 px-4 py-1.5 text-gold-soft transition-colors hover:bg-gold/10"
          >
            Hire me
          </a>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-line bg-bg/95 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-mute hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
