import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getProductionQueueItems, getProductionQueueSummary } from "@/lib/production-queue";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const items = getProductionQueueItems();

  return NextResponse.json({
    source: "local-production-queue",
    nextSource: "CMS tasks, DAM production status, audio pipeline, citation workflow and assignment system",
    summary: getProductionQueueSummary(items),
    items,
  });
}
