import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getSourceReviewItems, getSourceReviewSummary } from "@/lib/source-review";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const items = getSourceReviewItems();

  return NextResponse.json({
    source: "local-source-review-control",
    nextSource: "CMS citation workflow, editorial approvals, source versions and research audit history",
    summary: getSourceReviewSummary(items),
    items,
  });
}
