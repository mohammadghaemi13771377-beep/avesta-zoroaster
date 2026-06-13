import { NextResponse } from "next/server";
import { buildDefaultConsent, consentPolicy, getConsentSummary, normalizeConsentSnapshot } from "@/lib/privacy-consent";

export async function POST(request: Request) {
  let body: unknown = null;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const consent = normalizeConsentSnapshot(body);

  return NextResponse.json({
    ok: true,
    consent,
    summary: getConsentSummary(consent),
    nextSource: "User consent table, signed consent history and consent-aware analytics routing",
  });
}

export function GET() {
  const consent = buildDefaultConsent();

  return NextResponse.json({
    source: "local-consent-policy",
    policy: consentPolicy,
    defaultConsent: consent,
    summary: getConsentSummary(consent),
  });
}
