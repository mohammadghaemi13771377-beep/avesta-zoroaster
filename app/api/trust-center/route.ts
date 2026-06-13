import { NextResponse } from "next/server";
import { getTrustCenterSummary, getTrustRecords } from "@/lib/trust-center";

export function GET() {
  const records = getTrustRecords();

  return NextResponse.json({
    source: "local-trust-center-rules",
    summary: getTrustCenterSummary(records),
    records,
    nextSource: "CMS citations, source versions, editorial approvals, DOI/library metadata and audit history",
  });
}
