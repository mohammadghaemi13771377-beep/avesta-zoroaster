import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getProductionBriefs, getProductionBriefSummary } from "@/lib/production-briefs";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const briefs = getProductionBriefs();

  return NextResponse.json({
    source: "local-production-briefs",
    nextSource: "CMS task briefs, DAM creative briefs, audio scripts and AI generation queue",
    summary: getProductionBriefSummary(briefs),
    briefs,
  });
}
