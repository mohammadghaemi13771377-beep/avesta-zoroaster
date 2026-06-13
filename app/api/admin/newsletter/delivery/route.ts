import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import {
  getNewsletterDeliverySummary,
  newsletterDeliveryEvents,
  newsletterDeliveryReports,
} from "@/lib/newsletter-delivery";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_articles");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    source: "local-admin-newsletter-delivery",
    nextSource: "Email provider webhooks, delivery events, suppression list, bounce processing and complaint monitoring",
    summary: getNewsletterDeliverySummary(),
    reports: newsletterDeliveryReports,
    events: newsletterDeliveryEvents,
  });
}
