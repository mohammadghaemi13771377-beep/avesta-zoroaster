import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getNewsletterEditionSummary, newsletterEditions } from "@/lib/newsletter-editions";
import { getNewsletterSummary, newsletterTopics } from "@/lib/newsletter";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_articles");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    source: "local-admin-newsletter-command",
    nextSource: "CMS newsletter editor, email provider sync, scheduled sends, delivery analytics and unsubscribe management",
    subscriptionSummary: getNewsletterSummary(),
    editionSummary: getNewsletterEditionSummary(),
    topics: newsletterTopics,
    editions: newsletterEditions,
  });
}
