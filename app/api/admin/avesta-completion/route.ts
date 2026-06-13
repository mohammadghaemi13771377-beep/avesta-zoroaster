import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getAvestaCompletionSections, getAvestaCompletionSummary } from "@/lib/avesta-completion";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const sections = getAvestaCompletionSections();

  return NextResponse.json({
    source: "local-avesta-completion-matrix",
    nextSource: "PostgreSQL verse counts, CMS field completeness, media storage, citation database and SEO audit",
    summary: getAvestaCompletionSummary(sections),
    sections,
  });
}
