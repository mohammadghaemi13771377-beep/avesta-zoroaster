import { NextResponse } from "next/server";

import { decodeSession, type DemoSession } from "@/lib/auth";
import { adminRoleProfiles } from "@/lib/admin-roles";
import { AUTH_COOKIE } from "@/lib/auth-constants";

export type AdminAccessResult =
  | {
      ok: true;
      session: DemoSession;
    }
  | {
      ok: false;
      response: NextResponse;
    };

export function getSessionFromRequest(request: Request) {
  return decodeSession(getCookieValue(request.headers.get("cookie"), AUTH_COOKIE));
}

export function hasAdminPermission(session: DemoSession | null, permissionId: string) {
  if (!session) {
    return false;
  }

  const role = adminRoleProfiles.find((item) => item.id === session.role);
  return Boolean(role?.permissions.includes(permissionId));
}

export function requireAdminPermission(request: Request, permissionId: string): AdminAccessResult {
  const session = getSessionFromRequest(request);

  if (!session) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          ok: false,
          message: "برای دسترسی به API ادمین باید وارد شوید.",
        },
        { status: 401 }
      ),
    };
  }

  if (!hasAdminPermission(session, permissionId)) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          ok: false,
          message: "نقش فعلی شما به این عملیات ادمین دسترسی ندارد.",
          requiredPermission: permissionId,
          role: session.role,
        },
        { status: 403 }
      ),
    };
  }

  return { ok: true, session };
}

function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) {
    return undefined;
  }

  const cookies = cookieHeader.split(";").map((item) => item.trim());
  const match = cookies.find((item) => item.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}
