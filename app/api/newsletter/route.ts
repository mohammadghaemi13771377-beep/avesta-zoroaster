import { NextResponse } from "next/server";
import { getNewsletterSummary, newsletterTopics, type NewsletterTopic } from "@/lib/newsletter";

const topicIds = new Set(newsletterTopics.map((topic) => topic.id));

export function GET() {
  return NextResponse.json({
    source: "local-newsletter-digest",
    nextSource: "Email provider, double opt-in, CRM segmentation and campaign automation",
    summary: getNewsletterSummary(),
    topics: newsletterTopics,
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const topics = Array.isArray(body?.topics) ? (body.topics as NewsletterTopic[]) : [];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const validTopics = topics.filter((topic) => topicIds.has(topic));

  if (!validTopics.length) {
    return NextResponse.json({ error: "At least one valid topic is required" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    mode: "local-preview",
    email,
    topics: validTopics,
    nextSource: "Persist subscription, double opt-in and email provider sync",
  });
}
