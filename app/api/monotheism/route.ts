import { NextResponse } from "next/server";
import { monotheismJourney, monotheismPillars } from "@/lib/sample-content";

export async function GET() {
  return NextResponse.json({
    source: "local-sample-monotheism",
    nextSource: "CMS educational hub content",
    pillars: monotheismPillars,
    journey: monotheismJourney
  });
}
