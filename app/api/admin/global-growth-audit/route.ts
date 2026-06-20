import { NextResponse } from "next/server";
import { getGlobalGrowthAuditSnapshot } from "@/lib/global-growth-audit";

export async function GET() {
  return NextResponse.json(getGlobalGrowthAuditSnapshot(), {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
