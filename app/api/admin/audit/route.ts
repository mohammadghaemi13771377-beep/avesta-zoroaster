import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getAuditLogEntries, getAuditSummary } from "@/lib/audit-log";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "system_admin");

  if (!access.ok) {
    return access.response;
  }

  const entries = await getAuditLogEntries();

  return NextResponse.json({
    source: "local-audit-log",
    nextSource: "Persistent AuditLog Prisma model written by admin mutations and auth events",
    summary: getAuditSummary(entries),
    entries
  });
}
