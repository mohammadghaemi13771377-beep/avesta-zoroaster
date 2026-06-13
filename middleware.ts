import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth-constants";
import { getAvestaAccessDecision } from "@/lib/avesta-access-control";

type SessionRole = "READER" | "EDITOR" | "ADMIN";

type MiddlewareSession = {
  role: SessionRole;
};

const protectedRoutes = ["/profile", "/admin", "/api/admin"];
const rolePermissions: Record<SessionRole, string[]> = {
  READER: ["read_content"],
  EDITOR: [
    "read_content",
    "manage_avesta",
    "manage_articles",
    "manage_glossary",
    "manage_media",
    "manage_shop",
    "bulk_import",
  ],
  ADMIN: [
    "read_content",
    "manage_avesta",
    "manage_articles",
    "manage_glossary",
    "manage_media",
    "manage_shop",
    "bulk_import",
    "seo_admin",
    "system_admin",
  ],
};

const adminRoutePermissions: Array<[string, string]> = [
  ["/api/admin/content", "manage_avesta"],
  ["/api/admin/upload", "manage_media"],
  ["/api/admin/shop", "manage_shop"],
  ["/api/admin/import", "bulk_import"],
  ["/api/admin/health", "system_admin"],
  ["/api/admin/stats", "system_admin"],
  ["/api/admin/roles", "system_admin"],
  ["/api/admin/audit", "system_admin"],
  ["/api/admin/launch-readiness", "system_admin"],
  ["/admin/seo", "seo_admin"],
  ["/admin/import", "bulk_import"],
  ["/admin/media", "manage_media"],
  ["/admin/shop", "manage_shop"],
  ["/admin/library", "manage_media"],
  ["/admin/articles", "manage_articles"],
  ["/admin/glossary", "manage_glossary"],
  ["/admin/avesta", "manage_avesta"],
  ["/admin", "manage_avesta"],
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const needsAuth = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  const session = decodeMiddlewareSession(request.cookies.get(AUTH_COOKIE)?.value);

  if (pathname === "/avesta" || pathname.startsWith("/avesta/")) {
    const access = getAvestaAccessDecision(pathname, session?.role ?? null);

    if (!access.allowed) {
      if (access.action === "login") {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/login";
        loginUrl.searchParams.set("next", pathname);
        loginUrl.searchParams.set("visibility", access.visibility);
        return NextResponse.redirect(loginUrl);
      }

      const deniedUrl = request.nextUrl.clone();
      deniedUrl.pathname = "/avesta";
      deniedUrl.searchParams.set("access", "restricted");
      deniedUrl.searchParams.set("visibility", access.visibility);
      deniedUrl.searchParams.set("required", access.requiredRole);
      return NextResponse.redirect(deniedUrl);
    }
  }

  if (!needsAuth) {
    return NextResponse.next();
  }

  if (!session) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ ok: false, message: "برای دسترسی به API ادمین باید وارد شوید." }, { status: 401 });
    }

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }

  const requiredPermission = getRequiredPermission(pathname);

  if (requiredPermission && !rolePermissions[session.role]?.includes(requiredPermission)) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        {
          ok: false,
          message: "نقش فعلی شما به این عملیات ادمین دسترسی ندارد.",
          role: session.role,
          requiredPermission,
        },
        { status: 403 }
      );
    }

    const profileUrl = request.nextUrl.clone();
    profileUrl.pathname = "/profile";
    profileUrl.searchParams.set("access", "denied");
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*", "/api/admin/:path*", "/avesta", "/avesta/:path*"]
};

function getRequiredPermission(pathname: string) {
  return adminRoutePermissions.find(([route]) => pathname === route || pathname.startsWith(`${route}/`))?.[1];
}

function decodeMiddlewareSession(value?: string): MiddlewareSession | null {
  if (!value) {
    return null;
  }

  try {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as Partial<MiddlewareSession>;

    if (parsed.role === "READER" || parsed.role === "EDITOR" || parsed.role === "ADMIN") {
      return { role: parsed.role };
    }
  } catch {
    return null;
  }

  return null;
}
