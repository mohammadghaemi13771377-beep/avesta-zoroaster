import { NextResponse } from "next/server";
import { getExhibitionControlItems, getExhibitionControlSummary } from "@/lib/exhibition-control";

export async function GET() {
  const items = getExhibitionControlItems();

  return NextResponse.json({
    source: "local-exhibition-control",
    summary: getExhibitionControlSummary(items),
    items,
    nextSource: "CMS-managed exhibition records with asset workflow, curator approval and analytics signals",
  });
}
