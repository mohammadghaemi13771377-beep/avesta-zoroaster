import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { buildCitationCoverageCsv, getCitationCoverageItems, getCitationCoverageSummary } from "@/lib/citation-coverage";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const items = getCitationCoverageItems();

  if (searchParams.get("format") === "csv") {
    return new NextResponse(buildCitationCoverageCsv(items), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": "attachment; filename=citation-coverage.csv",
      },
    });
  }

  return NextResponse.json({
    source: "local-citation-coverage",
    nextSource: "CMS citation table, source registry foreign keys and publication QA workflow",
    summary: getCitationCoverageSummary(items),
    items,
  });
}
