import { NextResponse } from "next/server";
import { getPracticeStudioPlan, getPracticeStudioSummary } from "@/lib/practice-studio";

export function GET() {
  const plan = getPracticeStudioPlan();

  return NextResponse.json({
    source: "local-practice-studio",
    summary: getPracticeStudioSummary([], plan),
    plan,
    nextSource: "User profile practice history, reminders, calendar and personalized ethical coaching",
  });
}
