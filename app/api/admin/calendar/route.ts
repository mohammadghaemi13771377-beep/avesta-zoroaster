import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import {
  getCalendarEventsWithTaskReadiness,
  getPublishingCalendarSummary,
  publishingEvents,
} from "@/lib/publishing-calendar";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_articles");

  if (!access.ok) {
    return access.response;
  }

  const events = getCalendarEventsWithTaskReadiness();

  return NextResponse.json({
    source: "local-publishing-calendar",
    nextSource: "CMS scheduled publishing, notification jobs, social campaign planner and product launch calendar",
    summary: getPublishingCalendarSummary(publishingEvents),
    events,
  });
}
