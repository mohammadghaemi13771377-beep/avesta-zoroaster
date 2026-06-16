import { NextResponse } from "next/server";
import { buildAshaBalanceSnapshot } from "@/lib/asha-balance";

export function GET() {
  return NextResponse.json({
    source: "local-asha-balance",
    snapshot: buildAshaBalanceSnapshot({
      completedPracticeIds: ["day-1-ahura-mazda", "day-2-asha"],
      completedQuestIds: ["first-light"],
      completedReflectionDates: [new Date().toISOString().slice(0, 10)],
    }),
    nextSource: "User practice history, profile sync, streak analytics and personalized Asha coaching",
  });
}
