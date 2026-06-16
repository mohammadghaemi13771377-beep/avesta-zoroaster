import { NextResponse } from "next/server";
import { getDailyLightGuide } from "@/lib/daily-light-guide";

export function GET() {
  return NextResponse.json({
    source: "local-daily-light-guide",
    guide: getDailyLightGuide(),
    nextSource: "Personalized daily route from profile memory, Asha balance, practice history and event stream",
  });
}
