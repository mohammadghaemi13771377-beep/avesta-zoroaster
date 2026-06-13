import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import {
  buildAvestaPublicationGateCsv,
  getAvestaPublicationGates,
  getAvestaPublicationGateSummary,
} from "@/lib/avesta-publication-gates";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const gates = getAvestaPublicationGates();

  if (searchParams.get("format") === "csv") {
    return new NextResponse(buildAvestaPublicationGateCsv(gates), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": "attachment; filename=avesta-publication-gates.csv",
      },
    });
  }

  return NextResponse.json({
    source: "local-avesta-publication-gate",
    nextSource: "CMS publication workflow, editorial approval and production deploy gate",
    summary: getAvestaPublicationGateSummary(gates),
    gates,
  });
}
