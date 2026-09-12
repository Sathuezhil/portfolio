import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { InboxMessage } from "@/lib/api";
import { projects as defaultProjects, type Project, type SiteContent } from "@/data/content";
import { defaultSiteContent, normalizeContent } from "./defaults";
import { normalizeProjects } from "./projects";

type TokenMap = Record<string, string>;

const DATA_DIR = path.join(process.cwd(), ".data");

async function blobStore() {
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore({ name: "portfolio-admin", consistency: "strong" });
  } catch {
    return null;
  }
}

async function readFileJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeFileJson(file: string, value: unknown) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(path.join(DATA_DIR, file), JSON.stringify(value, null, 2));
}

async function readKey<T>(key: string, fallback: T): Promise<T> {
  const store = await blobStore();

  if (store) {
    try {
      const value = await store.get(key, { type: "json" });
      return (value as T | undefined) ?? fallback;
    } catch {
      return fallback;
    }
  }

  return readFileJson(`${key}.json`, fallback);
}

async function writeKey(key: string, value: unknown) {
  const store = await blobStore();

  if (store) {
    await store.setJSON(key, value);
    return;
  }

  await writeFileJson(`${key}.json`, value);
}

export async function getMessages(): Promise<InboxMessage[]> {
  const messages = await readKey<InboxMessage[]>("messages", []);
  return [...messages].sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));
}

export async function saveMessages(messages: InboxMessage[]) {
  await writeKey("messages", messages);
}

export async function getContent(): Promise<SiteContent> {
  return normalizeContent(await readKey<SiteContent | null>("content", null));
}

export async function saveContent(content: SiteContent) {
  const next = normalizeContent(content);
  await writeKey("content", next);
  return next;
}

export async function getProjects(): Promise<Project[]> {
  const stored = await readKey<Project[] | null>("projects", null);
  return normalizeProjects(stored ?? defaultProjects);
}

export async function saveProjects(items: Project[]) {
  const next = normalizeProjects(items);
  await writeKey("projects", next);
  return next;
}

export async function getTokens(): Promise<TokenMap> {
  return readKey<TokenMap>("admin-tokens", {});
}

export async function saveTokens(tokens: TokenMap) {
  await writeKey("admin-tokens", tokens);
}

export function defaultContent() {
  return defaultSiteContent();
}
