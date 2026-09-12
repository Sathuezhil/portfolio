"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { Project } from "@/data/content";
import { fetchAdminProjects, saveAdminProjects } from "@/lib/api";

function emptyProject(): Project {
  return {
    slug: "",
    title: "",
    client: "",
    year: String(new Date().getFullYear()),
    stack: [],
    href: null,
    github: null,
    featured: false,
    independent: false,
    description: "",
  };
}

function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminProjects()
      .then(setProjects)
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load projects."));
  }, []);

  function update(index: number, patch: Partial<Project>) {
    setProjects((current) =>
      current ? current.map((project, itemIndex) => (itemIndex === index ? { ...project, ...patch } : project)) : current,
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!projects) {
      return;
    }

    setStatus("saving");
    setError("");

    try {
      const saved = await saveAdminProjects(projects);
      setProjects(saved);
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to save projects.");
    }
  }

  if (!projects) {
    return <p className="text-sm text-mute">{error || "Loading projects…"}</p>;
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs tracking-[0.28em] text-gold">Work</p>
          <h1 className="mt-2 font-serif text-4xl">Selected projects</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-mute">
            Add a new project here. It shows on the public Work section after you save.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-paper"
          onClick={() => setProjects((current) => [emptyProject(), ...(current ?? [])])}
        >
          Add project
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-6">
        {projects.length === 0 ? (
          <p className="rounded-2xl border border-line p-5 text-sm text-mute">
            No projects yet. Click Add project to create one.
          </p>
        ) : (
          projects.map((project, index) => (
            <article key={`${project.slug || "new"}-${index}`} className="rounded-[1.5rem] border border-line bg-surface/40 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-xs text-gold">{String(index + 1).padStart(2, "0")}</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-line px-3 py-1 text-xs text-mute hover:text-ink disabled:opacity-40"
                    disabled={index === 0}
                    onClick={() =>
                      setProjects((current) => {
                        if (!current || index === 0) return current;
                        const next = [...current];
                        [next[index - 1], next[index]] = [next[index], next[index - 1]];
                        return next;
                      })
                    }
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-line px-3 py-1 text-xs text-mute hover:text-ink disabled:opacity-40"
                    disabled={index === projects.length - 1}
                    onClick={() =>
                      setProjects((current) => {
                        if (!current || index >= current.length - 1) return current;
                        const next = [...current];
                        [next[index + 1], next[index]] = [next[index], next[index + 1]];
                        return next;
                      })
                    }
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-line px-3 py-1 text-xs text-mute hover:text-ink"
                    onClick={() => setProjects((current) => current?.filter((_, itemIndex) => itemIndex !== index) ?? [])}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-mute">Title</span>
                  <input
                    required
                    value={project.title}
                    onChange={(event) => update(index, { title: event.target.value })}
                    className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-mute">Client / market</span>
                  <input
                    value={project.client}
                    onChange={(event) => update(index, { client: event.target.value })}
                    placeholder="Germany, Independent, Sri Lanka…"
                    className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-mute">Year</span>
                  <input
                    value={project.year}
                    onChange={(event) => update(index, { year: event.target.value })}
                    className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-mute">Stack</span>
                  <input
                    value={project.stack.join(", ")}
                    onChange={(event) =>
                      update(index, {
                        stack: event.target.value.split(",").map((item) => item.trim()).filter(Boolean),
                      })
                    }
                    placeholder="React, Next.js, Laravel"
                    className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-mute">Live site</span>
                  <input
                    value={project.href ?? ""}
                    onChange={(event) => update(index, { href: event.target.value || null })}
                    placeholder="https://"
                    className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-mute">GitHub</span>
                  <input
                    value={project.github ?? ""}
                    onChange={(event) => update(index, { github: event.target.value || null })}
                    placeholder="https://github.com/…"
                    className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
                  />
                </label>
              </div>

              <label className="mt-4 block text-sm">
                <span className="text-mute">Description</span>
                <textarea
                  required
                  rows={3}
                  value={project.description}
                  onChange={(event) => update(index, { description: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-line bg-bg px-3 py-2.5 outline-none ring-gold/40 focus:ring-2"
                />
              </label>

              <div className="mt-4 flex flex-wrap gap-5 text-sm">
                <label className="inline-flex items-center gap-2 text-mute">
                  <input
                    type="checkbox"
                    checked={Boolean(project.independent)}
                    onChange={(event) => update(index, { independent: event.target.checked })}
                  />
                  Independent work
                </label>
                <label className="inline-flex items-center gap-2 text-mute">
                  <input
                    type="checkbox"
                    checked={project.featured}
                    onChange={(event) => update(index, { featured: event.target.checked })}
                  />
                  Featured card
                </label>
              </div>
            </article>
          ))
        )}

        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-paper disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : "Save projects"}
        </button>
        {status === "ok" ? <p className="text-sm text-gold-soft">Saved. Refresh the public site to see the new work.</p> : null}
        {status === "error" ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
      </form>
    </>
  );
}

export default function AdminProjectsPage() {
  return (
    <AdminShell>
      <ProjectsEditor />
    </AdminShell>
  );
}
