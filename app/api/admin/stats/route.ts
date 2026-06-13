import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getAdminStats } from "@/lib/admin-stats";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "system_admin");

  if (!access.ok) {
    return access.response;
  }

  const dashboard = await getAdminStats();

  return NextResponse.json({
    source: dashboard.source,
    nextSource: "Prisma aggregate queries with sample fallback",
    dashboard
  });
}
