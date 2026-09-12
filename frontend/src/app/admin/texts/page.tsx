"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { siteCopy, type SiteContent } from "@/data/content";
import { fetchAdminContent, saveAdminContent } from "@/lib/api";

const profileFields = [
  ["firstName", "First name"],
  ["lastName", "Last name"],
  ["role", "Role"],
  ["headline", "Headline"],
  ["availability", "Availability"],
  ["location", "Location"],
  ["email", "Email"],
  ["phone", "Phone"],
] as const;

const copyFields = [
  ["heroIntro", "Hero intro", 4],
  ["photoTagline", "Photo tagline", 1],
  ["aboutHeading", "About heading", 2],
  ["aboutSummary", "About summary", 5],
  ["experienceHeading", "Experience heading", 2],
  ["workHeading", "Work heading", 2],
  ["workIntro", "Work intro", 3],
  ["skillsHeading", "Skills heading", 2],
  ["educationHeading", "Education heading", 1],
  ["contactHeading", "Contact heading", 2],
  ["contactIntro", "Contact intro", 4],
  ["servicesHeading", "Services heading", 2],
  ["servicesIntro", "Services intro", 3],
  ["nowHeading", "Availability heading", 1],
  ["nowStatus", "Availability status", 1],
  ["nowStart", "Start date", 1],
  ["nowType", "Full-time or contract", 1],
  ["nowWhere", "Where you can work", 1],
] as const;

function TextsEditor() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminContent()
      .then(setContent)
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load texts."));
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content) {
      return;
    }

    setStatus("saving");
    setError("");

    try {
      const saved = await saveAdminContent(content);
      setContent(saved);
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to save texts.");
    }
  }

  if (!content) {
    return <p className="text-sm text-mute">{error || "Loading texts…"}</p>;
  }

  return (
    <>
      <p className="font-mono text-xs tracking-[0.28em] text-gold">Content</p>
      <h1 className="mt-2 font-serif text-4xl">Edit site texts</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mute">
        Changes go live on the public site after you save. Refresh the homepage to see them.
      </p>
      <form onSubmit={onSubmit} className="mt-10 space-y-10">
        <section className="rounded-[1.5rem] border border-line bg-surface/40 p-6">
          <h2 className="font-serif text-2xl text-gold-soft">Profile</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {profileFields.map(([key, label]) => (
              <label key={key} className="block text-sm">
                <span className="text-mute">{label}</span>
                <input
                  required
                  value={content.profile[key]}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      profile: { ...content.profile, [key]: event.target.value },
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
                />
              </label>
            ))}
          </div>
        </section>
        <section className="rounded-[1.5rem] border border-line bg-surface/40 p-6">
          <h2 className="font-serif text-2xl text-gold-soft">Page copy</h2>
          <div className="mt-6 grid gap-4">
            {copyFields.map(([key, label, rows]) => (
              <label key={key} className="block text-sm">
                <span className="text-mute">{label}</span>
                <textarea
                  required
                  rows={rows}
                  value={content.copy[key] ?? siteCopy[key]}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      copy: { ...content.copy, [key]: event.target.value },
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
                />
              </label>
            ))}
          </div>
        </section>
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-paper disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : "Save texts"}
        </button>
        {status === "ok" ? <p className="text-sm text-gold-soft">Saved. Refresh the public site to see the new copy.</p> : null}
        {status === "error" ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
      </form>
    </>
  );
}

export default function AdminTextsPage() {
  return (
    <AdminShell>
      <TextsEditor />
    </AdminShell>
  );
}
