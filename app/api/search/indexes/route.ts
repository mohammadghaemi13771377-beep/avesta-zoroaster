import { NextResponse } from "next/server";
import { searchIndexes } from "@/lib/search";

export async function GET() {
  return NextResponse.json({
    source: "local-search-config",
    nextSource: "Meilisearch index settings API",
    indexes: searchIndexes
  });
}
