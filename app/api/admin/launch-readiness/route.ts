import { NextResponse } from "next/server";

import { requireAdminPermission } from "@/lib/admin-auth";
import { getLaunchReadinessSummary, launchReadinessItems } from "@/lib/launch-readiness";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "system_admin");

  if (!access.ok) {
    return access.response;
  }

  const summary = getLaunchReadinessSummary(launchReadinessItems);

  return NextResponse.json({
    source: "preflight-checklist",
    generatedAt: new Date().toISOString(),
    summary,
    items: launchReadinessItems,
    nextSource: "بعد از اتصال PostgreSQL و اجرای build، این چک‌لیست می‌تواند با داده واقعی CI/CD به‌روز شود.",
  });
}
