"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { fetchAdminCv, removeAdminCv, uploadAdminCv, type CvInfo } from "@/lib/api";

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

function CvEditor() {
  const input = useRef<HTMLInputElement>(null);
  const [cv, setCv] = useState<CvInfo | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "removed" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminCv()
      .then(setCv)
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load the CV."))
      .finally(() => setLoaded(true));
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      return;
    }

    setStatus("saving");
    setError("");

    try {
      setCv(await uploadAdminCv(file));
      setFile(null);
      if (input.current) input.current.value = "";
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to upload the CV.");
    }
  }

  async function onRemove() {
    if (!window.confirm("Remove the uploaded CV and go back to the original PDF?")) {
      return;
    }

    setStatus("saving");
    setError("");

    try {
      await removeAdminCv();
      setCv(null);
      setStatus("removed");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to remove the CV.");
    }
  }

  return (
    <>
      <p className="font-mono text-xs tracking-[0.28em] text-gold">CV</p>
      <h1 className="mt-2 font-serif text-4xl">Download CV file</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mute">
        Upload a new PDF here. The Download CV button on the public site serves it right after you save.
      </p>

      <section className="mt-10 rounded-[1.5rem] border border-line bg-surface/40 p-6">
        <p className="text-sm text-mute">Current file</p>
        {!loaded ? (
          <p className="mt-2 text-sm text-mute">Loading…</p>
        ) : cv ? (
          <div className="mt-2">
            <p className="text-lg">{cv.name}</p>
            <p className="mt-1 text-sm text-mute">
              {formatSize(cv.size)} · uploaded {new Date(cv.updatedAt).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-lg">Original CV (built into the site)</p>
        )}
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <a
            href="/api/cv"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-4 py-1.5 text-mute hover:text-ink"
          >
            Download current CV
          </a>
          {cv ? (
            <button
              type="button"
              onClick={onRemove}
              disabled={status === "saving"}
              className="rounded-full border border-line px-4 py-1.5 text-mute hover:text-ink disabled:opacity-60"
            >
              Remove upload
            </button>
          ) : null}
        </div>
      </section>

      <form onSubmit={onSubmit} className="mt-6 rounded-[1.5rem] border border-line bg-surface/40 p-6">
        <label className="block text-sm">
          <span className="text-mute">New CV (PDF, up to 4 MB)</span>
          <input
            ref={input}
            type="file"
            accept="application/pdf,.pdf"
            onChange={(event) => {
              setFile(event.target.files?.[0] ?? null);
              setStatus("idle");
            }}
            className="mt-3 block w-full text-sm text-mute file:mr-4 file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:font-medium file:text-paper"
          />
        </label>
        <button
          type="submit"
          disabled={!file || status === "saving"}
          className="mt-5 rounded-full bg-gold px-6 py-3 text-sm font-medium text-paper disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : "Save CV"}
        </button>
        {status === "ok" ? <p className="mt-3 text-sm text-gold-soft">Saved. Download CV on the site now serves this file.</p> : null}
        {status === "removed" ? <p className="mt-3 text-sm text-gold-soft">Removed. The site is back to the original CV.</p> : null}
        {status === "error" || (error && status === "idle") ? (
          <p className="mt-3 text-sm text-[var(--danger)]">{error}</p>
        ) : null}
      </form>
    </>
  );
}

export default function AdminCvPage() {
  return (
    <AdminShell>
      <CvEditor />
    </AdminShell>
  );
}
