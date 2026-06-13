import { NextResponse } from "next/server";
import { getSacredCalendarSummary, sacredCalendarEvents } from "@/lib/sacred-calendar";

export function GET() {
  return NextResponse.json({
    source: "local-sacred-calendar",
    nextSource: "CMS event model, notifications, article campaigns and shop collections",
    summary: getSacredCalendarSummary(),
    events: sacredCalendarEvents,
  });
}
