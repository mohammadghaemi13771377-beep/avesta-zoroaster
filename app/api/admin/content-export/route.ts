import { NextResponse } from "next/server";
import { getContentExportBundle } from "@/lib/content-export";

export function GET(request: Request) {
  const url = new URL(request.url);
  const bundle = getContentExportBundle();
  const headers = new Headers({
    "cache-control": "no-store"
  });

  if (url.searchParams.get("download") === "1") {
    headers.set("content-disposition", `attachment; filename="avesta-zoroaster-content-export-${bundle.generatedAt.slice(0, 10)}.json"`);
  }

  return NextResponse.json(bundle, { headers });
}
