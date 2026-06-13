import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { buildAvestaCsvTemplate, getAvestaImportTemplate } from "@/lib/avesta-import-template";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const template = getAvestaImportTemplate();

  if (searchParams.get("format") === "csv") {
    return new NextResponse(buildAvestaCsvTemplate(template.rows), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": "attachment; filename=avesta-import-template.csv",
      },
    });
  }

  return NextResponse.json({
    source: "local-avesta-import-template",
    nextSource: "CMS import mapper, Google Sheets content intake and production storage",
    template,
  });
}
