import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { buildProductionBriefMarkdown, getProductionBriefs, getProductionBriefSummary } from "@/lib/production-briefs";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const briefs = getProductionBriefs();
  const url = new URL(request.url);

  if (url.searchParams.get("format") === "markdown") {
    const headers = new Headers({
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "no-store",
    });

    if (url.searchParams.get("download") === "1") {
      headers.set("content-disposition", `attachment; filename="avesta-production-briefs-${new Date().toISOString().slice(0, 10)}.md"`);
    }

    return new NextResponse(buildProductionBriefMarkdown(briefs), { headers });
  }

  return NextResponse.json({
    source: "local-production-briefs",
    nextSource: "CMS task briefs, DAM creative briefs, audio scripts and AI generation queue",
    summary: getProductionBriefSummary(briefs),
    briefs,
  });
}
