import { NextResponse } from "next/server";
import { getMuseumTour } from "@/lib/museum-tour";

export function GET() {
  return NextResponse.json({
    source: "local-guided-museum-tour",
    tour: getMuseumTour(),
    nextSource: "360° scenes, audio narration, image hotspots and CMS-curated exhibition tours",
  });
}
