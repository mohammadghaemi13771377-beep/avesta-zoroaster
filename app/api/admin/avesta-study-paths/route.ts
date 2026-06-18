import { NextResponse } from "next/server";
import { getAvestaStudyPathControlItems, getAvestaStudyPathControlSummary } from "@/lib/avesta-study-path-control";

export function GET() {
  const items = getAvestaStudyPathControlItems();

  return NextResponse.json({
    summary: getAvestaStudyPathControlSummary(items),
    items
  });
}
