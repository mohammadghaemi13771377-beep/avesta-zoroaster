import { NextResponse } from "next/server";
import { articleItems } from "@/lib/sample-content";

export async function GET() {
  return NextResponse.json({
    source: "local-sample-articles",
    nextSource: "PostgreSQL Article model or CMS",
    items: articleItems
  });
}
