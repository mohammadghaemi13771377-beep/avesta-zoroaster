import { NextResponse } from "next/server";
import { getExhibitions, getExhibitionStats } from "@/lib/exhibitions";

export async function GET() {
  return NextResponse.json({
    exhibitions: getExhibitions(),
    stats: getExhibitionStats(),
  });
}
