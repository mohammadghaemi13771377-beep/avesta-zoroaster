import { NextResponse } from "next/server";
import { libraryItems } from "@/lib/sample-content";

export async function GET() {
  return NextResponse.json({
    source: "local-sample-library",
    nextSource: "PostgreSQL LibraryItem model",
    items: libraryItems
  });
}
