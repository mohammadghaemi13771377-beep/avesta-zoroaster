import { routeMap } from "@/lib/content";
import { getSourceReviewItems } from "@/lib/source-review";
import { getVisualAssetItems } from "@/lib/visual-asset-control";
import { sitemapPriority } from "@/lib/seo";

export type PageQualityRisk = "low" | "medium" | "high";

export type PageQualityItem = {
  id: string;
  route: string;
  title: string;
  area: string;
  score: number;
  risk: PageQualityRisk;
  priority: number;
  seoReady: boolean;
  contentReady: boolean;
  mediaReady: boolean;
  sourceReady: boolean;
  mobileReady: boolean;
  owner: string;
  nextAction: string;
  checklist: string[];
};

export const pageQualityRiskLabels: Record<PageQualityRisk, string> = {
  low: "آماده لانچ",
  medium: "نیازمند تکمیل",
  high: "ریسک بالا",
};

export const pageQualityRiskTone: Record<PageQualityRisk, string> = {
  low: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  medium: "border-gold/25 bg-gold/10 text-gold-light",
  high: "border-orange-300/25 bg-orange-300/10 text-orange-100",
};

const titleByRoute: Record<string, string> = {
  "/": "خانه",
  "/avesta": "پورتال اوستا",
  "/world": "نقشه جهان دیجیتال",
  "/zoroaster": "زرتشت",
  "/gathas": "گات‌ها",
  "/zoroastrianism": "دین زرتشتی",
  "/monotheism": "یکتاپرستی",
  "/dictionary": "واژه‌نامه",
  "/library": "کتابخانه",
  "/media": "رسانه",
  "/articles": "مقاله‌ها",
  "/search": "جستجو",
  "/timeline": "تایم‌لاین",
  "/shop": "فروشگاه",
  "/trust-center": "مرکز اعتماد",
  "/citations": "مرکز ارجاع",
};

export function getPageQualityItems(routes: string[] = routeMap): PageQualityItem[] {
  const sourceReviews = getSourceReviewItems();
  const visualAssets = getVisualAssetItems();

  return routes
    .filter((route) => !route.startsWith("/api") && !route.startsWith("/admin#"))
    .map((route) => {
      const quality = calculateQuality(route, sourceReviews, visualAssets);
      const score = quality.score;
      const risk: PageQualityRisk = score >= 82 ? "low" : score >= 64 ? "medium" : "high";

      return {
        id: `page-quality-${route.replaceAll("/", "-") || "home"}`,
        route,
        title: titleByRoute[route] ?? inferTitle(route),
        area: inferArea(route),
        score,
        risk,
        priority: sitemapPriority(route),
        seoReady: quality.seoReady,
        contentReady: quality.contentReady,
        mediaReady: quality.mediaReady,
        sourceReady: quality.sourceReady,
        mobileReady: quality.mobileReady,
        owner: inferOwner(route),
        nextAction: buildNextAction(route, quality),
        checklist: buildChecklist(route, quality),
      };
    })
    .sort((a, b) => b.priority - a.priority || a.score - b.score);
}

export function getPageQualitySummary(items: PageQualityItem[] = getPageQualityItems()) {
  const averageScore = Math.round(items.reduce((sum, item) => sum + item.score, 0) / items.length);

  return {
    total: items.length,
    averageScore,
    ready: items.filter((item) => item.risk === "low").length,
    needsWork: items.filter((item) => item.risk === "medium").length,
    highRisk: items.filter((item) => item.risk === "high").length,
    publicRoutes: items.filter((item) => !item.route.startsWith("/admin")).length,
  };
}

function calculateQuality(
  route: string,
  sourceReviews: ReturnType<typeof getSourceReviewItems>,
  visualAssets: ReturnType<typeof getVisualAssetItems>,
) {
  const isAdmin = route.startsWith("/admin");
  const isCommerce = route.startsWith("/shop");
  const isAuth = route === "/login" || route === "/register" || route === "/profile";
  const isContent = route.startsWith("/avesta") || route.startsWith("/articles") || route.startsWith("/dictionary");
  const hasSourceRisk = sourceReviews.some((item) => route !== "/" && item.href.startsWith(route) && item.risk !== "low");
  const hasVisualAsset = visualAssets.some((item) => item.pageHref === route);
  const mediaReady = !isContent || hasVisualAsset || route.includes("media") || route.includes("library");

  const seoReady = !isAdmin && !isAuth;
  const contentReady = !isContent || route.length > 0;
  const sourceReady = !isContent || !hasSourceRisk;
  const mobileReady = !isAdmin || route === "/admin" || route.includes("go-live") || route.includes("team-handoff");

  let score = 52;
  if (seoReady) score += 12;
  if (contentReady) score += 14;
  if (mediaReady) score += 12;
  if (sourceReady) score += 12;
  if (mobileReady) score += 8;
  if (route === "/" || route === "/avesta" || route === "/world") score += 6;
  if (isCommerce) score -= 5;
  if (isAdmin) score -= 4;

  return {
    score: Math.max(35, Math.min(96, score)),
    seoReady,
    contentReady,
    mediaReady,
    sourceReady,
    mobileReady,
  };
}

function inferTitle(route: string) {
  if (route.startsWith("/avesta/")) {
    return `اوستا ${route.split("/").filter(Boolean).at(-1)}`;
  }

  if (route.startsWith("/admin/")) {
    return `ادمین ${route.split("/").filter(Boolean).slice(1).join(" / ")}`;
  }

  return route === "/" ? "خانه" : route.split("/").filter(Boolean).join(" / ");
}

function inferArea(route: string) {
  if (route.startsWith("/admin")) return "Admin Ops";
  if (route.startsWith("/avesta") || route === "/gathas") return "Avesta";
  if (route.startsWith("/shop")) return "Commerce";
  if (route.startsWith("/newsletter")) return "Growth";
  if (route.startsWith("/articles") || route.startsWith("/dictionary") || route.startsWith("/library")) return "Content";
  if (route.startsWith("/media") || route.startsWith("/ai-studio")) return "Media";
  return "Experience";
}

function inferOwner(route: string) {
  if (route.startsWith("/admin")) return "تیم فنی و محصول";
  if (route.startsWith("/avesta") || route.startsWith("/dictionary") || route.startsWith("/articles")) return "تیم محتوا و پژوهش";
  if (route.startsWith("/media") || route.startsWith("/ai-studio")) return "تیم رسانه و AI";
  if (route.startsWith("/shop")) return "تیم تجارت";
  if (route.startsWith("/newsletter") || route.startsWith("/campaigns")) return "تیم رشد";
  return "تیم محصول";
}

function buildNextAction(route: string, quality: ReturnType<typeof calculateQuality>) {
  if (!quality.sourceReady) {
    return "منابع و citationهای این صفحه را در Source Review تکمیل و تایید کنید.";
  }

  if (!quality.mediaReady) {
    return "تصویر AI، thumbnail یا asset مرتبط را در Visual Assets/Media اضافه کنید.";
  }

  if (!quality.seoReady) {
    return "metadata عمومی و سیاست ایندکس این route را قبل از انتشار عمومی نهایی کنید.";
  }

  if (route.startsWith("/shop")) {
    return "قبل از فروش واقعی، پرداخت، انبار، ارسال و مالیات را با provider production تست کنید.";
  }

  return "صفحه برای QA نهایی، تست موبایل و بازبینی محتوایی آماده است.";
}

function buildChecklist(route: string, quality: ReturnType<typeof calculateQuality>) {
  return [
    quality.seoReady ? "SEO و sitemap آماده است." : "SEO یا index policy باید بازبینی شود.",
    quality.contentReady ? "ساختار محتوا آماده است." : "محتوای اصلی باید تکمیل شود.",
    quality.mediaReady ? "دارایی بصری/رسانه‌ای پوشش داده شده است." : "دارایی تصویری یا رسانه‌ای کم است.",
    quality.sourceReady ? "ریسک منبع جدی دیده نمی‌شود." : "citation یا منبع تاییدشده نیاز دارد.",
    quality.mobileReady ? "برای QA موبایل آماده است." : "تراکم پنل ادمین در موبایل باید بازبینی شود.",
    route.startsWith("/admin") ? "دسترسی ادمین و permission guard کنترل شود." : "CTA و مسیر بعدی کاربر کنترل شود.",
  ];
}
