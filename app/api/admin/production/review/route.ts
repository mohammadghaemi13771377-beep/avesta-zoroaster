import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getProductionReviewItems, getProductionReviewSummary } from "@/lib/production-review";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const items = getProductionReviewItems();

  return NextResponse.json({
    source: "local-production-review",
    nextSource: "CMS approval workflow, DAM review status, editorial comments and publish locks",
    summary: getProductionReviewSummary(items),
    items,
  });
}
