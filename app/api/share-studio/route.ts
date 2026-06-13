import { NextResponse } from "next/server";
import { getShareStudioState } from "@/lib/share-studio";

export function GET() {
  return NextResponse.json({
    source: "local-share-studio",
    nextSource: "Server-side PNG rendering, brand templates, social scheduler and campaign analytics",
    ...getShareStudioState(),
  });
}
