import { NextResponse } from "next/server";
import { validateNewsletterTopics } from "@/lib/newsletter";

function normalizePayload(body: any) {
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const topics = validateNewsletterTopics(body?.topics);
  return { email, topics };
}

export function GET() {
  return NextResponse.json({
    source: "local-newsletter-preferences",
    nextSource: "User account preferences, email provider profile, unsubscribe token and audit trail",
    supportedMethods: ["GET", "PUT", "DELETE"],
  });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const { email, topics } = normalizePayload(body);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  if (!topics.length) {
    return NextResponse.json({ error: "At least one topic is required" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    mode: "local-preview",
    status: "subscribed",
    email,
    topics,
    nextSource: "Persist preferences and sync with email provider",
  });
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null);
  const { email, topics } = normalizePayload(body);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    mode: "local-preview",
    status: "unsubscribed",
    email,
    topics,
    nextSource: "Persist unsubscribe event and suppress future sends",
  });
}
