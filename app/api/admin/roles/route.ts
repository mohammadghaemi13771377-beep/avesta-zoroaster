import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { adminPermissions, adminRoleProfiles, getRoleMatrix } from "@/lib/admin-roles";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "system_admin");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    source: "local-admin-role-matrix",
    nextSource: "Prisma UserRole policies and route-level middleware checks",
    roles: adminRoleProfiles,
    permissions: adminPermissions,
    matrix: getRoleMatrix()
  });
}
