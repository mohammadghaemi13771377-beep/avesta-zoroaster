import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getAvestaProductionBatches, getAvestaProductionBatchSummary } from "@/lib/avesta-production-batches";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const batches = getAvestaProductionBatches();

  return NextResponse.json({
    source: "local-avesta-production-batches",
    nextSource: "CMS completeness, production workflow, team assignments, due dates and review states",
    summary: getAvestaProductionBatchSummary(batches),
    batches,
  });
}
