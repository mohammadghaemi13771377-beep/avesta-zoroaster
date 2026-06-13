import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { buildRouteVisibilityCsv, getRouteVisibilityAuditItems, getRouteVisibilitySummary } from "@/lib/route-visibility-audit";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const items = getRouteVisibilityAuditItems();

  if (searchParams.get("format") === "csv") {
    return new NextResponse(buildRouteVisibilityCsv(items), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": "attachment; filename=route-visibility-audit.csv",
      },
    });
  }

  return NextResponse.json({
    source: "local-route-visibility-audit",
    nextSource: "database-backed feature flags, sitemap policy, robots policy and route middleware",
    summary: getRouteVisibilitySummary(items),
    items,
  });
}
