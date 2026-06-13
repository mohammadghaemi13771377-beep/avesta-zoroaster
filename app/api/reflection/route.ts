import { NextResponse } from "next/server";
import { getDailyReflectionSeed, getReflectionStats } from "@/lib/daily-reflection";

export function GET() {
  return NextResponse.json({
    source: "local-daily-reflection-rules",
    stats: getReflectionStats(),
    seed: getDailyReflectionSeed(),
    nextSource: "User daily journal, private notes, streaks and encrypted profile sync",
  });
}
