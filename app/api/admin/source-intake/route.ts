import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getSourceIntakeSnapshot } from "@/lib/source-intake-hub";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) return access.response;

  return NextResponse.json(getSourceIntakeSnapshot(), { headers: { "Cache-Control": "no-store" } });
}
