import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { buildAvestaReleaseWaveCsv, getAvestaReleaseWaves, getAvestaReleaseWaveSummary } from "@/lib/avesta-release-waves";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const waves = getAvestaReleaseWaves();

  if (searchParams.get("format") === "csv") {
    return new NextResponse(buildAvestaReleaseWaveCsv(waves), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": "attachment; filename=avesta-release-waves.csv",
      },
    });
  }

  return NextResponse.json({
    source: "local-avesta-release-waves",
    nextSource: "CMS scheduled publishing, feature flags, editorial approval and staged launch workflow",
    summary: getAvestaReleaseWaveSummary(waves),
    waves,
  });
}
