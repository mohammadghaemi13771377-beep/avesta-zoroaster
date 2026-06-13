import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getTrackingEventMatrix, getTrackingImplementationChecklist, getTrackingSummary } from "@/lib/event-tracking";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const events = getTrackingEventMatrix();

  return NextResponse.json({
    source: "local-event-tracking-matrix",
    nextSource: "First-party events table, PostHog, GA4, newsletter provider and commerce analytics",
    summary: getTrackingSummary(events),
    events,
    checklist: getTrackingImplementationChecklist(),
  });
}
