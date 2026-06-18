import { NextResponse } from "next/server";
import { getAvestaStudyPaths } from "@/lib/avesta-study-paths";

export function GET() {
  return NextResponse.json({
    paths: getAvestaStudyPaths()
  });
}
