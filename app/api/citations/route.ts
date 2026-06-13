import { NextResponse } from "next/server";
import { getCitationRecords, getCitationSummary, getCitationsForTarget } from "@/lib/citations";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("target");
  const records = target ? getCitationsForTarget(target) : getCitationRecords();

  return NextResponse.json({
    source: "local-citation-rules",
    summary: getCitationSummary(records),
    records,
    nextSource: "CMS footnotes, library metadata, source versions, edition/page references and editorial approval flow",
  });
}
