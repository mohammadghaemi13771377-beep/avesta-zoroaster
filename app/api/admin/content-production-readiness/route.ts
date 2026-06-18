import { NextResponse } from "next/server";
import { contentProductionItems, getContentProductionSummary } from "@/lib/content-production-readiness";

export function GET() {
  return NextResponse.json({
    summary: getContentProductionSummary(contentProductionItems),
    items: contentProductionItems
  });
}
