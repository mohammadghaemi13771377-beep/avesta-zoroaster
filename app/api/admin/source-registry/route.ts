import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import {
  buildSourceRegistryBib,
  buildSourceRegistryCsv,
  getSourceRegistryRecords,
  getSourceRegistrySummary,
} from "@/lib/source-registry";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const records = getSourceRegistryRecords();
  const format = searchParams.get("format");

  if (format === "csv") {
    return new NextResponse(buildSourceRegistryCsv(records), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": "attachment; filename=source-registry.csv",
      },
    });
  }

  if (format === "bib") {
    return new NextResponse(buildSourceRegistryBib(records), {
      headers: {
        "content-type": "application/x-bibtex; charset=utf-8",
        "content-disposition": "attachment; filename=source-registry.bib",
      },
    });
  }

  return NextResponse.json({
    source: "local-source-registry",
    nextSource: "CMS source registry table, DOI/ISBN metadata, library upload and citation publishing workflow",
    summary: getSourceRegistrySummary(records),
    records,
  });
}
