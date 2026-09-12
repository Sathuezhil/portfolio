import { siteCopy, type SiteContent } from "@/data/content";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const TOKEN_KEY = "portfolio-admin-token";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type InboxMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
};

async function parseJson<T>(response: Response): Promise<T | null> {
  return (await response.json().catch(() => null)) as T | null;
}

export async function sendContact(payload: ContactPayload) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await parseJson<{ message?: string }>(response);

  if (!response.ok) {
    throw new Error(data?.message ?? "Unable to send your message right now.");
  }

  return data;
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const response = await fetch(`${API_URL}/api/portfolio`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load site content.");
  }

  const data = (await response.json()) as Partial<SiteContent>;

  return {
    profile: data.profile as SiteContent["profile"],
    copy: { ...siteCopy, ...data.copy },
  };
}

export function getAdminToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  window.sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  window.sessionStorage.removeItem(TOKEN_KEY);
}

function adminHeaders() {
  const token = getAdminToken();

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function adminLogin(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseJson<{ token?: string; message?: string }>(response);

  if (!response.ok || !data?.token) {
    if (response.status === 503) {
      throw new Error(
        data?.message ??
          "Admin login is not configured on this host. In Netlify, add ADMIN_EMAIL and ADMIN_PASSWORD, then trigger a new deploy.",
      );
    }

    throw new Error(data?.message ?? "Unable to sign in.");
  }

  setAdminToken(data.token);
  return data;
}

export async function adminLogout() {
  const token = getAdminToken();

  if (token) {
    await fetch(`${API_URL}/api/admin/logout`, {
      method: "POST",
      headers: adminHeaders(),
    }).catch(() => undefined);
  }

  clearAdminToken();
}

export async function fetchAdminMe() {
  const response = await fetch(`${API_URL}/api/admin/me`, {
    headers: adminHeaders(),
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return parseJson<{ email: string }>(response);
}

export async function fetchAdminMessages() {
  const response = await fetch(`${API_URL}/api/admin/messages`, {
    headers: adminHeaders(),
    cache: "no-store",
  });

  const data = await parseJson<{ messages?: InboxMessage[]; unread?: number; message?: string }>(response);

  if (!response.ok) {
    throw new Error(data?.message ?? "Unable to load messages.");
  }

  return {
    messages: data?.messages ?? [],
    unread: data?.unread ?? 0,
  };
}

export async function markMessageRead(id: string) {
  const response = await fetch(`${API_URL}/api/admin/messages/${id}/read`, {
    method: "PATCH",
    headers: adminHeaders(),
  });

  if (!response.ok) {
    throw new Error("Unable to mark that message as read.");
  }
}

export async function deleteMessage(id: string) {
  const response = await fetch(`${API_URL}/api/admin/messages/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });

  if (!response.ok) {
    throw new Error("Unable to delete that message.");
  }
}

export async function fetchAdminContent() {
  const response = await fetch(`${API_URL}/api/admin/content`, {
    headers: adminHeaders(),
    cache: "no-store",
  });

  const data = await parseJson<SiteContent & { message?: string }>(response);

  if (!response.ok || !data) {
    throw new Error(data?.message ?? "Unable to load site texts.");
  }

  return data as SiteContent;
}

export async function saveAdminContent(payload: SiteContent) {
  const response = await fetch(`${API_URL}/api/admin/content`, {
    method: "PUT",
    headers: adminHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await parseJson<SiteContent & { message?: string }>(response);

  if (!response.ok || !data) {
    throw new Error(data?.message ?? "Unable to save texts.");
  }

  return data as SiteContent;
}
