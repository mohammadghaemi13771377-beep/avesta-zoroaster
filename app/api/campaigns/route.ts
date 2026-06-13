import { NextResponse } from "next/server";
import { getSeasonalCampaignSummary, seasonalCampaigns } from "@/lib/seasonal-campaigns";

export function GET() {
  return NextResponse.json({
    source: "local-seasonal-campaigns",
    nextSource: "CMS campaign planner, scheduled homepage banners, email provider and shop collection automation",
    summary: getSeasonalCampaignSummary(),
    campaigns: seasonalCampaigns,
  });
}
