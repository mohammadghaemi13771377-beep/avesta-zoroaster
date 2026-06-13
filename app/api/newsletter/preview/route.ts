import { NextResponse } from "next/server";
import { getNewsletterEmailPreviews, getNewsletterHtmlExports, getNewsletterTemplateSummary } from "@/lib/newsletter-templates";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeHtml = searchParams.get("format") === "html";

  return NextResponse.json({
    source: "local-newsletter-email-preview",
    nextSource: "Email provider HTML templates, test sends, rendering QA and analytics tags",
    summary: getNewsletterTemplateSummary(),
    previews: getNewsletterEmailPreviews(),
    htmlExports: includeHtml ? getNewsletterHtmlExports() : undefined,
  });
}
