import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getProductAnalyticsSummary, getProductEventSpecs, getProductFunnelStages } from "@/lib/product-analytics";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const stages = getProductFunnelStages();
  const events = getProductEventSpecs();

  return NextResponse.json({
    source: "local-product-analytics-model",
    nextSource: "PostHog, Matomo, GA4, first-party events table, UTM attribution and commerce conversion tracking",
    summary: getProductAnalyticsSummary(stages),
    stages,
    events,
  });
}
