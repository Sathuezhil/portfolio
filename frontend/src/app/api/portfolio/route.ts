import { NextResponse } from "next/server";
import { getContent, getProjects } from "@/lib/server/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ...(await getContent()),
    projects: await getProjects(),
  });
}
