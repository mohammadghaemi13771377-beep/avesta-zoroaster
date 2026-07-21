import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getContentOperationsPlan } from "@/lib/content-operations";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    source: "local-content-operations",
    nextSource: "Production database counts, CMS workflow states, media storage usage and team assignment history",
    plan: getContentOperationsPlan(),
  });
}
