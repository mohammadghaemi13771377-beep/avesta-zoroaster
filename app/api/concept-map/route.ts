import { NextResponse } from "next/server";
import { getConceptMap } from "@/lib/concept-map";

export function GET() {
  return NextResponse.json({
    source: "local-concept-map-rules",
    ...getConceptMap(),
    nextSource: "CMS semantic relations, Meilisearch facets, AI-generated concept suggestions and editorial approval",
  });
}
