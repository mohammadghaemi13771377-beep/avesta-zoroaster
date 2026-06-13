import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getNewsletterScheduleItems, getNewsletterScheduleSummary } from "@/lib/newsletter-schedule";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_articles");

  if (!access.ok) {
    return access.response;
  }

  const items = getNewsletterScheduleItems();

  return NextResponse.json({
    source: "local-admin-newsletter-schedule",
    nextSource: "Email provider scheduled jobs, delivery logs, webhook events and retry queue",
    summary: getNewsletterScheduleSummary(items),
    items,
  });
}
