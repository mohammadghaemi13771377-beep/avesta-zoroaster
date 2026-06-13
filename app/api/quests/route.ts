import { NextResponse } from "next/server";
import { getQuestSummary, learningQuests } from "@/lib/learning-quests";

export function GET() {
  return NextResponse.json({
    source: "local-learning-quest-rules",
    summary: getQuestSummary([], learningQuests),
    quests: learningQuests,
    nextSource: "User profile progress, account achievements, streaks and personalized quest generation",
  });
}
