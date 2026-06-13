import { routeMap } from "@/lib/content";
import { getAvestaFeatureFlags, type AvestaFeatureFlag, type AvestaVisibilityMode } from "@/lib/avesta-feature-flags";

export type RouteVisibilityRisk = "low" | "medium" | "high";

export type RouteVisibilityAuditItem = {
  id: string;
  route: string;
  title: string;
  scope: "public" | "admin" | "avesta";
  visibility: AvestaVisibilityMode | "system";
  sitemapAllowed: boolean;
  navigationAllowed: boolean;
  indexAllowed: boolean;
  risk: RouteVisibilityRisk;
  reason: string;
  action: string;
};

export const routeVisibilityRiskLabels: Record<RouteVisibilityRisk, string> = {
  low: "هماهنگ",
  medium: "نیازمند مراقبت",
  high: "ریسک ایندکس",
};

export const routeVisibilityRiskTone: Record<RouteVisibilityRisk, string> = {
  low: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  medium: "border-gold/25 bg-gold/10 text-gold-light",
  high: "border-orange-300/25 bg-orange-300/10 text-orange-100",
};

export function getRouteVisibilityAuditItems(routes: string[] = routeMap, flags: AvestaFeatureFlag[] = getAvestaFeatureFlags()): RouteVisibilityAuditItem[] {
  return routes.map((route) => {
    const flag = findFlagForRoute(route, flags);
    const isAdmin = route.startsWith("/admin");
    const isApiLike = route.startsWith("/api");
    const visibility = flag?.visibility ?? (isAdmin || isApiLike ? "system" : "public");
    const scope = isAdmin ? "admin" : route.startsWith("/avesta") ? "avesta" : "public";
    const sitemapAllowed = resolveSitemapAllowed(route, visibility, isAdmin);
    const navigationAllowed = resolveNavigationAllowed(visibility, isAdmin);
    const indexAllowed = sitemapAllowed && !isAdmin;
    const risk = resolveRisk(route, visibility, sitemapAllowed, indexAllowed);

    return {
      id: `route-visibility-${route.replaceAll("/", "-") || "home"}`,
      route,
      title: inferTitle(route, flag),
      scope,
      visibility,
      sitemapAllowed,
      navigationAllowed,
      indexAllowed,
      risk,
      reason: buildReason(route, visibility, sitemapAllowed, flag),
      action: buildAction(visibility, sitemapAllowed, isAdmin),
    };
  });
}

export function getRouteVisibilitySummary(items: RouteVisibilityAuditItem[] = getRouteVisibilityAuditItems()) {
  return {
    total: items.length,
    sitemapAllowed: items.filter((item) => item.sitemapAllowed).length,
    indexAllowed: items.filter((item) => item.indexAllowed).length,
    hiddenOrInternal: items.filter((item) => item.visibility === "hidden" || item.visibility === "internal").length,
    highRisk: items.filter((item) => item.risk === "high").length,
    mediumRisk: items.filter((item) => item.risk === "medium").length,
  };
}

export function getPublicSitemapRoutes(routes: string[] = routeMap) {
  const blockedRoutes = new Set(
    getRouteVisibilityAuditItems(routes)
      .filter((item) => !item.sitemapAllowed)
      .map((item) => item.route),
  );

  return routes.filter((route) => !blockedRoutes.has(route));
}

export function isRoutePubliclyIndexable(route: string) {
  return getRouteVisibilityAuditItems([route])[0]?.indexAllowed ?? false;
}

export function buildRouteVisibilityCsv(items: RouteVisibilityAuditItem[] = getRouteVisibilityAuditItems()) {
  const headers = ["route", "title", "scope", "visibility", "sitemapAllowed", "navigationAllowed", "indexAllowed", "risk", "reason", "action"];

  return [
    headers.join(","),
    ...items.map((item) =>
      [
        item.route,
        item.title,
        item.scope,
        item.visibility,
        item.sitemapAllowed,
        item.navigationAllowed,
        item.indexAllowed,
        item.risk,
        item.reason,
        item.action,
      ].map((value) => escapeCsvCell(String(value))).join(","),
    ),
  ].join("\n");
}

function findFlagForRoute(route: string, flags: AvestaFeatureFlag[]) {
  return flags.find((flag) => route === flag.href || route.startsWith(`${flag.href}/`));
}

function resolveSitemapAllowed(route: string, visibility: RouteVisibilityAuditItem["visibility"], isAdmin: boolean) {
  if (isAdmin || route.startsWith("/login") || route.startsWith("/register") || route.startsWith("/profile")) {
    return false;
  }

  return visibility === "public";
}

function resolveNavigationAllowed(visibility: RouteVisibilityAuditItem["visibility"], isAdmin: boolean) {
  if (isAdmin) {
    return true;
  }

  return visibility === "public" || visibility === "beta";
}

function resolveRisk(route: string, visibility: RouteVisibilityAuditItem["visibility"], sitemapAllowed: boolean, indexAllowed: boolean): RouteVisibilityRisk {
  if ((visibility === "hidden" || visibility === "internal") && (sitemapAllowed || indexAllowed)) {
    return "high";
  }

  if (route.startsWith("/admin") && sitemapAllowed) {
    return "high";
  }

  if (visibility === "beta" && sitemapAllowed) {
    return "medium";
  }

  return "low";
}

function inferTitle(route: string, flag?: AvestaFeatureFlag) {
  if (flag) {
    return flag.sectionTitle;
  }

  if (route === "/") {
    return "خانه";
  }

  if (route.startsWith("/admin/")) {
    return `ادمین ${route.split("/").filter(Boolean).slice(1).join(" / ")}`;
  }

  return route.split("/").filter(Boolean).join(" / ") || "خانه";
}

function buildReason(route: string, visibility: RouteVisibilityAuditItem["visibility"], sitemapAllowed: boolean, flag?: AvestaFeatureFlag) {
  if (flag) {
    return `${flag.sectionTitle} در وضعیت ${visibility} است: ${flag.reason}`;
  }

  if (route.startsWith("/admin")) {
    return "مسیر ادمین نباید در sitemap عمومی یا index موتور جستجو قرار بگیرد.";
  }

  return sitemapAllowed ? "مسیر برای انتشار عمومی و sitemap مجاز است." : "مسیر برای sitemap عمومی مجاز نیست.";
}

function buildAction(visibility: RouteVisibilityAuditItem["visibility"], sitemapAllowed: boolean, isAdmin: boolean) {
  if (isAdmin) {
    return "در robots و sitemap عمومی پنهان بماند و فقط پشت auth ادمین باشد.";
  }

  if (visibility === "hidden" || visibility === "internal") {
    return "CTA عمومی و sitemap را غیرفعال نگه دارید تا Publication Gate عبور کند.";
  }

  if (visibility === "beta") {
    return "برچسب بتا، noindex یا دسترسی کنترل‌شده را قبل از public بررسی کنید.";
  }

  return sitemapAllowed ? "برای index عمومی آماده است." : "سیاست sitemap را بازبینی کنید.";
}

function escapeCsvCell(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}
