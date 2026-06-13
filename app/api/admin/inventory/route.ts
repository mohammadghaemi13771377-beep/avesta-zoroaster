import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getContentInventoryRealms, getContentInventorySummary } from "@/lib/content-inventory";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const realms = getContentInventoryRealms();

  return NextResponse.json({
    source: "local-content-inventory",
    nextSource: "CMS content counts, media storage, audio inventory, citation database and production readiness signals",
    summary: getContentInventorySummary(realms),
    realms,
  });
}
