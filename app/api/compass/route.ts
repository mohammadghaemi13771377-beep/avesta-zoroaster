import { NextResponse } from "next/server";
import { buildWisdomCompassSnapshot } from "@/lib/wisdom-compass";

export function GET() {
  return NextResponse.json({
    source: "local-wisdom-compass",
    nextSource: "Event stream, recommendation engine, Meilisearch signals and RAG-backed editorial guardrails",
    snapshot: buildWisdomCompassSnapshot({
      completedQuestIds: ["first-light"],
      completedReflectionDates: [new Date().toISOString().slice(0, 10)],
      bookmarks: 1,
      notes: 1,
      completedVerses: 1,
      savedSearches: 1,
    }),
  });
}
