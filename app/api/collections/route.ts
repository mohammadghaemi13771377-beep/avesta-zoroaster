import { NextResponse } from "next/server";
import { contentCollections } from "@/lib/content-collections";

export async function GET() {
  return NextResponse.json({
    source: "local-content-collections",
    nextSource: "CMS-managed curated collections with personalized ordering",
    count: contentCollections.length,
    collections: contentCollections
  });
}
