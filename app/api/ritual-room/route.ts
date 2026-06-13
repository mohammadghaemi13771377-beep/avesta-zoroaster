import { NextResponse } from "next/server";
import { buildRitualRoomSession } from "@/lib/ritual-room";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  return NextResponse.json({
    source: "local-ritual-room",
    nextSource: "User streak, guided audio, haptics/mobile app reminders and personalized ritual history",
    session: buildRitualRoomSession(searchParams.get("mode"), searchParams.get("duration")),
  });
}
