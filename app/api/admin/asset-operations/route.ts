import { NextResponse } from "next/server";
import { getAssetOperationsSnapshot } from "@/lib/asset-operations";

export function GET() {
  return NextResponse.json(getAssetOperationsSnapshot(), {
    headers: {
      "cache-control": "no-store"
    }
  });
}
