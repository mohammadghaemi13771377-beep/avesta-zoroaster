import { NextResponse } from "next/server";
import { buildPersonalDashboardSnapshot } from "@/lib/personal-dashboard";

export function GET() {
  return NextResponse.json({
    source: "local-personal-dashboard",
    nextSource: "User profile database, event stream, recommendations engine and cross-device sync",
    snapshot: buildPersonalDashboardSnapshot({
      completedQuestIds: ["first-light"],
      completedReflectionDates: [new Date().toISOString().slice(0, 10)],
    }),
  });
}
