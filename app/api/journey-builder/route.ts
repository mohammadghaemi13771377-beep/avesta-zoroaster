import { NextResponse } from "next/server";
import { buildJourneyPlan, normalizeJourneyInput } from "@/lib/journey-builder";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = normalizeJourneyInput({
    intent: searchParams.get("intent") as never,
    pace: searchParams.get("pace") as never,
    level: searchParams.get("level") as never,
    mode: searchParams.get("mode") as never,
  });

  return NextResponse.json({
    source: "local-journey-builder",
    nextSource: "User profile, reading history, bookmarks, RAG recommendations and analytics-based personalization",
    input,
    plan: buildJourneyPlan(input),
  });
}
