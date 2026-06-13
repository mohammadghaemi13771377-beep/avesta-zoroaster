import { getRouteVisibilityAuditItems } from "@/lib/route-visibility-audit";
import type { DemoSession } from "@/lib/auth";
import type { AvestaVisibilityMode } from "@/lib/avesta-feature-flags";

export type AccessRole = DemoSession["role"];

export type AvestaAccessDecision = {
  allowed: boolean;
  route: string;
  visibility: AvestaVisibilityMode | "system";
  reason: string;
  requiredRole: "PUBLIC" | "READER" | "EDITOR" | "ADMIN";
  action: "allow" | "login" | "deny";
};

const roleRank: Record<AccessRole, number> = {
  READER: 1,
  EDITOR: 2,
  ADMIN: 3,
};

export function getAvestaAccessDecision(route: string, role?: AccessRole | null): AvestaAccessDecision {
  const visibility = getRouteVisibilityAuditItems([route])[0]?.visibility ?? "public";
  const requiredRole = getRequiredRole(visibility);
  const allowed = hasRequiredRole(role, requiredRole);

  return {
    allowed,
    route,
    visibility,
    reason: buildReason(visibility, requiredRole, role),
    requiredRole,
    action: allowed ? "allow" : role ? "deny" : "login",
  };
}

export function getAvestaAccessPolicy(routes: string[]) {
  return routes
    .filter((route) => route === "/avesta" || route.startsWith("/avesta/"))
    .map((route) => ({
      route,
      anonymous: getAvestaAccessDecision(route, null),
      reader: getAvestaAccessDecision(route, "READER"),
      editor: getAvestaAccessDecision(route, "EDITOR"),
      admin: getAvestaAccessDecision(route, "ADMIN"),
    }));
}

function getRequiredRole(visibility: AvestaVisibilityMode | "system"): AvestaAccessDecision["requiredRole"] {
  if (visibility === "public" || visibility === "system") {
    return "PUBLIC";
  }

  if (visibility === "beta") {
    return "READER";
  }

  if (visibility === "internal") {
    return "EDITOR";
  }

  return "ADMIN";
}

function buildReason(visibility: AvestaVisibilityMode | "system", requiredRole: AvestaAccessDecision["requiredRole"], role?: AccessRole | null) {
  if (requiredRole === "PUBLIC") {
    return "مسیر برای دسترسی عمومی مجاز است.";
  }

  if (!role) {
    return `مسیر در وضعیت ${visibility} است و نیاز به ورود با نقش ${requiredRole} دارد.`;
  }

  if (roleRank[role] >= requiredRoleRank(requiredRole)) {
    return `نقش ${role} برای وضعیت ${visibility} کافی است.`;
  }

  return `نقش ${role} برای وضعیت ${visibility} کافی نیست؛ نقش ${requiredRole} لازم است.`;
}

function hasRequiredRole(role: AccessRole | null | undefined, requiredRole: AvestaAccessDecision["requiredRole"]) {
  if (requiredRole === "PUBLIC") {
    return true;
  }

  return Boolean(role && roleRank[role] >= requiredRoleRank(requiredRole));
}

function requiredRoleRank(role: Exclude<AvestaAccessDecision["requiredRole"], "PUBLIC">) {
  return roleRank[role];
}
