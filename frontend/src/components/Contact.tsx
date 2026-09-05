"use client";

import { FormEvent, useState } from "react";
import { sendContact } from "@/lib/api";
import { mergeProfile, useSiteContent } from "@/lib/site-content";
import { Reveal } from "./Reveal";

export function Contact() {
  const content = useSiteContent();
  const profile = mergeProfile(content);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      await sendContact({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        subject: String(data.get("subject") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      form.reset();
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.28em] text-gold">06 / Contact</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
            {content.copy.contactHeading}
          </h2>
          <p className="mt-5 max-w-md leading-7 text-mute">
            {content.copy.contactIntro}
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <a href={`mailto:${profile.email}`} className="block text-gold-soft hover:text-gold">
              {profile.email}
            </a>
            <a href={profile.phoneHref} className="block text-mute hover:text-ink">
              {profile.phone}
            </a>
            <p className="text-mute">{profile.location}</p>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="block text-mute hover:text-ink"
            >
              {`github.com/${profile.githubHandle}`}
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
        <form onSubmit={onSubmit} className="rounded-[1.6rem] border border-line bg-surface/50 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-mute">Name</span>
              <input
                required
                name="name"
                className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
              />
            </label>
            <label className="block text-sm">
              <span className="text-mute">Email</span>
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm">
            <span className="text-mute">Subject</span>
            <input
              required
              name="subject"
              className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
            />
          </label>
          <label className="mt-4 block text-sm">
            <span className="text-mute">Message</span>
            <textarea
              required
              name="message"
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
            />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-shine mt-6 w-full rounded-full bg-gold py-3 text-sm font-medium text-paper transition hover:bg-gold-soft disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "ok" ? (
            <p className="mt-3 text-sm text-gold-soft">Received. I’ll get back to you shortly.</p>
          ) : null}
          {status === "error" ? (
            <p className="mt-3 text-sm text-[var(--danger)]">
              {error} You can also email me directly at {profile.email}.
            </p>
          ) : null}
        </form>
        </Reveal>
      </div>
    </section>
  );
}
