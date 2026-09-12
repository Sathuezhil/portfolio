import { NextResponse } from "next/server";
import type { Project } from "@/data/content";
import { requireAdmin } from "@/lib/server/admin";
import { getProjects, saveProjects } from "@/lib/server/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) {
    return denied;
  }

  return NextResponse.json({ projects: await getProjects() });
}

export async function PUT(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) {
    return denied;
  }

  const body = (await request.json().catch(() => null)) as { projects?: Project[] } | null;

  if (!Array.isArray(body?.projects)) {
    return NextResponse.json({ message: "Add at least the projects list." }, { status: 422 });
  }

  return NextResponse.json({ projects: await saveProjects(body.projects) });
}
