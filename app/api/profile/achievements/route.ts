import { NextResponse } from "next/server";
import { buildAchievements } from "@/lib/achievements";

export async function GET() {
  return NextResponse.json({
    source: "local-achievement-rules",
    nextSource: "User activity aggregates from ReadingProgress, Bookmark, Note, StudyPlan and Collection tables",
    achievements: buildAchievements({
      bookmarks: 3,
      notes: 1,
      completedVerses: 1,
      savedDaily: 1,
      studyPlanSteps: 0,
      collections: 0
    })
  });
}
