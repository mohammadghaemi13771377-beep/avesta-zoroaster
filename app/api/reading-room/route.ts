import { NextResponse } from "next/server";
import { getReadingRoomPresets, getReadingRoomRecommendation, getReadingRoomStats } from "@/lib/reading-room";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode");

  return NextResponse.json({
    source: "local-reading-room-rules",
    stats: getReadingRoomStats(),
    presets: getReadingRoomPresets(),
    recommendation: getReadingRoomRecommendation(mode),
    nextSource: "User profile reading history, saved notes, audio progress and AI reading recommendations",
  });
}
