import { NextResponse } from "next/server";
import { buildOnboardingRecommendation, normalizeOnboardingInput } from "@/lib/onboarding";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = normalizeOnboardingInput({
    goal: searchParams.get("goal") as never,
    time: searchParams.get("time") as never,
    tone: searchParams.get("tone") as never,
  });

  return NextResponse.json({
    source: "local-onboarding-engine",
    nextSource: "User profile, consent-aware personalization, saved journey and product analytics",
    input,
    recommendation: buildOnboardingRecommendation(input),
  });
}
