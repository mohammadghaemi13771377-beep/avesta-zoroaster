import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getProjectHealth } from "@/lib/admin-stats";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "system_admin");

  if (!access.ok) {
    return access.response;
  }

  const health = await getProjectHealth();

  return NextResponse.json({
    project: "AVESTA-ZOROASTER",
    nextSource: "Production health checks can add database ping, Meilisearch ping and storage checks.",
    health,
  });
}
