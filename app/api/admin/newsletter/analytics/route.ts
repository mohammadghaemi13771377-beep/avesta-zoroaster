import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getNewsletterAnalyticsSummary, newsletterAnalytics } from "@/lib/newsletter-analytics";
import { newsletterEditions } from "@/lib/newsletter-editions";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_articles");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    source: "local-admin-newsletter-analytics",
    nextSource: "Email provider events, UTM analytics, conversion tracking and unsubscribe audit",
    summary: getNewsletterAnalyticsSummary(),
    editions: newsletterEditions,
    metrics: newsletterAnalytics,
  });
}
