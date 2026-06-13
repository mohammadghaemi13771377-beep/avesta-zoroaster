import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getVisualAssetItems, getVisualAssetSummary } from "@/lib/visual-asset-control";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const assets = getVisualAssetItems();

  return NextResponse.json({
    source: "local-ai-visual-asset-control",
    nextSource: "Production DAM, object storage, CMS media records and AI generation provider status",
    summary: getVisualAssetSummary(assets),
    assets,
  });
}
