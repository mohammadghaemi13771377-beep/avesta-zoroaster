import { NextResponse } from "next/server";
import { getPublishPipelineSnapshot } from "@/lib/publish-pipeline";

export function GET() {
  return NextResponse.json(getPublishPipelineSnapshot(), {
    headers: {
      "cache-control": "no-store"
    }
  });
}
