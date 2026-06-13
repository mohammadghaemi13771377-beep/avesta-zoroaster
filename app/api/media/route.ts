import { NextResponse } from "next/server";
import { getMediaAssets, mediaAssetSchema, saveMediaAsset } from "@/lib/media-repository";

export async function GET() {
  const items = await getMediaAssets();

  return NextResponse.json({
    source: "Prisma MediaAsset when available, sample media fallback otherwise",
    schema: mediaAssetSchema,
    items
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await saveMediaAsset(body);

  return NextResponse.json(result, { status: result.status });
}
