import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { buildAvestaFeatureFlagCsv, getAvestaFeatureFlags, getAvestaFeatureFlagSummary } from "@/lib/avesta-feature-flags";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const flags = getAvestaFeatureFlags();

  if (searchParams.get("format") === "csv") {
    return new NextResponse(buildAvestaFeatureFlagCsv(flags), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": "attachment; filename=avesta-feature-flags.csv",
      },
    });
  }

  return NextResponse.json({
    source: "local-avesta-feature-flags",
    nextSource: "database-backed feature flags, route middleware, sitemap visibility and beta access control",
    summary: getAvestaFeatureFlagSummary(flags),
    flags,
  });
}
