import { NextResponse } from "next/server";
import { buildDailyStreakSnapshot } from "@/lib/daily-streak";

export function GET() {
  return NextResponse.json({
    source: "local-daily-streak",
    nextSource: "User profile database, streak events, reminders, push notifications and mobile app sync",
    snapshot: buildDailyStreakSnapshot(),
  });
}
