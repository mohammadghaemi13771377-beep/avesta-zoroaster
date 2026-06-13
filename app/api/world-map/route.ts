import { NextResponse } from "next/server";
import { getWorldMapSummary, worldRealms } from "@/lib/world-map";

export function GET() {
  return NextResponse.json({
    source: "local-world-map",
    summary: getWorldMapSummary(),
    realms: worldRealms,
    nextSource: "CMS-managed product roadmap, content inventory, analytics and launch readiness signals",
  });
}
