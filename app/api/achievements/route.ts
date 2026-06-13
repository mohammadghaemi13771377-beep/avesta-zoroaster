import { NextResponse } from "next/server";
import { getAchievementHallSnapshot } from "@/lib/achievement-hall";

export function GET() {
  return NextResponse.json({
    source: "local-achievement-hall",
    nextSource: "User profile database, quest completion events, streaks and cross-device synced achievements",
    snapshot: getAchievementHallSnapshot(),
  });
}
