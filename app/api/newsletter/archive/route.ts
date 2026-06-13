import { NextResponse } from "next/server";
import { getNewsletterEditionSummary, newsletterEditions } from "@/lib/newsletter-editions";

export function GET() {
  return NextResponse.json({
    source: "local-newsletter-editions",
    nextSource: "CMS newsletter editions, email provider templates, scheduled sending and analytics",
    summary: getNewsletterEditionSummary(),
    editions: newsletterEditions,
  });
}
