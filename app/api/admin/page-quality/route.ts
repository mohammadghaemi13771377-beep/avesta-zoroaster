import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getPageQualityItems, getPageQualitySummary } from "@/lib/page-quality";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const items = getPageQualityItems();

  return NextResponse.json({
    source: "local-page-quality-matrix",
    nextSource: "Playwright visual QA, Lighthouse, CMS completeness, analytics and production uptime signals",
    summary: getPageQualitySummary(items),
    items,
  });
}
