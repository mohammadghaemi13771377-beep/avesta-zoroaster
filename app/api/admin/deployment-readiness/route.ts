import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { deploymentReadinessItems, getDeploymentReadinessSummary } from "@/lib/deployment-readiness";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    source: "local-deployment-readiness",
    domain: "avesta-zoroaster.com",
    summary: getDeploymentReadinessSummary(),
    items: deploymentReadinessItems,
    nextSource: "GitHub checks, Vercel deployments, DNS, production env and database migration status",
  });
}
