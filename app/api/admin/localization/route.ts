import { NextResponse } from "next/server";
import { getLocalizationHubSnapshot } from "@/lib/localization-hub";

export async function GET() {
  return NextResponse.json(getLocalizationHubSnapshot(), {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
