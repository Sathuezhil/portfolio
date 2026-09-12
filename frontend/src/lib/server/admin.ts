import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getTokens, saveTokens } from "./store";

const TOKEN_HOURS = 12;

function same(known: string, given: string) {
  return known.length === given.length && known === given;
}

export function adminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL ?? "",
    password: process.env.ADMIN_PASSWORD ?? "",
  };
}

export async function issueToken() {
  const token = randomBytes(32).toString("hex");
  const tokens = await getTokens();
  tokens[token] = new Date(Date.now() + TOKEN_HOURS * 60 * 60 * 1000).toISOString();
  await saveTokens(tokens);
  return token;
}

export async function validToken(token: string | null) {
  if (!token) {
    return false;
  }

  const tokens = await getTokens();
  const expires = tokens[token];

  if (!expires || Date.now() >= Date.parse(expires)) {
    delete tokens[token];
    await saveTokens(tokens);
    return false;
  }

  return true;
}

export async function forgetToken(token: string | null) {
  if (!token) {
    return;
  }

  const tokens = await getTokens();
  delete tokens[token];
  await saveTokens(tokens);
}

export function bearerToken(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  return header.startsWith("Bearer ") ? header.slice(7) : null;
}

export async function requireAdmin(request: Request) {
  if (await validToken(bearerToken(request))) {
    return null;
  }

  return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
}

export function checkLogin(email: string, password: string) {
  const admin = adminCredentials();

  if (!admin.email || !admin.password) {
    return {
      ok: false as const,
      status: 503,
      message:
        "Admin login is not configured on this host. In Netlify, add ADMIN_EMAIL and ADMIN_PASSWORD, then trigger a new deploy.",
    };
  }

  if (!same(admin.email, email) || !same(admin.password, password)) {
    return { ok: false as const, status: 422, message: "Invalid email or password." };
  }

  return { ok: true as const };
}
