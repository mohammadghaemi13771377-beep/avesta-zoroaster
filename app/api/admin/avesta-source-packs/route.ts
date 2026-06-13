import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import {
  buildAvestaSourcePackCsv,
  buildAvestaSourcePackMarkdown,
  getAvestaSourcePacks,
  getAvestaSourcePackSummary,
} from "@/lib/avesta-source-packs";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const packs = getAvestaSourcePacks();
  const format = searchParams.get("format");

  if (format === "csv") {
    return new NextResponse(buildAvestaSourcePackCsv(packs), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": "attachment; filename=avesta-source-packs.csv",
      },
    });
  }

  if (format === "md") {
    return new NextResponse(buildAvestaSourcePackMarkdown(packs), {
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        "content-disposition": "attachment; filename=avesta-source-packs.md",
      },
    });
  }

  return NextResponse.json({
    source: "local-avesta-source-pack-builder",
    nextSource: "CMS source registry, research approvals, source versioning and citation publishing workflow",
    summary: getAvestaSourcePackSummary(packs),
    packs,
  });
}
