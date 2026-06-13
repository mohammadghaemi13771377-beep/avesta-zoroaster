import { NextResponse } from "next/server";
import { getReaderMemoryApiSummary, readerMemoryKeys } from "@/lib/reader-memory";

export function GET() {
  return NextResponse.json({
    source: "local-reader-memory-manifest",
    summary: getReaderMemoryApiSummary(),
    keys: readerMemoryKeys,
  });
}
