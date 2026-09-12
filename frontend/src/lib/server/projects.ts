import type { Project } from "@/data/content";

function slugify(value: string, fallback: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
}

function cleanUrl(value: unknown) {
  const url = String(value ?? "").trim();
  return url ? url : null;
}

export function normalizeProject(input: Partial<Project>, index: number, used: Set<string>): Project | null {
  const title = String(input.title ?? "").trim();

  if (!title) {
    return null;
  }

  let slug = slugify(String(input.slug ?? title), `project-${index + 1}`);
  if (used.has(slug)) {
    slug = `${slug}-${index + 1}`;
  }
  used.add(slug);

  const stack = Array.isArray(input.stack)
    ? input.stack.map((item) => String(item).trim()).filter(Boolean)
    : String(input.stack ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  return {
    slug,
    title,
    client: String(input.client ?? "").trim() || "Client",
    year: String(input.year ?? "").trim() || String(new Date().getFullYear()),
    stack,
    href: cleanUrl(input.href),
    github: cleanUrl(input.github),
    featured: Boolean(input.featured),
    independent: Boolean(input.independent),
    description: String(input.description ?? "").trim(),
  };
}

export function normalizeProjects(input: unknown): Project[] {
  if (!Array.isArray(input)) {
    return [];
  }

  const used = new Set<string>();
  return input
    .map((item, index) => normalizeProject((item ?? {}) as Partial<Project>, index, used))
    .filter((item): item is Project => Boolean(item));
}
