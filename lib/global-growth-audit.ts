import { getAssetOperationChannels, getAssetOperationSummary } from "@/lib/asset-operations";
import { contentProductionItems, getContentProductionSummary } from "@/lib/content-production-readiness";
import { routeMap } from "@/lib/content";
import { deploymentReadinessItems, getDeploymentReadinessSummary } from "@/lib/deployment-readiness";
import { getPageQualityItems, getPageQualitySummary } from "@/lib/page-quality";
import { getLocalizationSummary } from "@/lib/localization-hub";
import { getSourceIntakeSummary } from "@/lib/source-intake-hub";
import { articleItems, glossaryTerms, libraryItems, sampleChapters, sampleVerses } from "@/lib/sample-content";
import { getTrustCenterSummary, getTrustRecords } from "@/lib/trust-center";

export type GlobalGrowthArea =
  | "seo"
  | "multilingual"
  | "schema"
  | "trust"
  | "performance"
  | "content"
  | "assets"
  | "admin";

export type GlobalGrowthStatus = "strong" | "ready" | "needs_work" | "blocked";

export type GlobalGrowthCheck = {
  label: string;
  passed: boolean;
  note: string;
};

export type GlobalGrowthAuditItem = {
  id: string;
  title: string;
  area: GlobalGrowthArea;
  status: GlobalGrowthStatus;
  score: number;
  owner: string;
  evidence: string;
  nextAction: string;
  routes: string[];
  checks: GlobalGrowthCheck[];
};

export const globalGrowthAreaLabels: Record<GlobalGrowthArea, string> = {
  seo: "SEO فنی",
  multilingual: "چندزبانه",
  schema: "Structured Data",
  trust: "اعتماد پژوهشی",
  performance: "Performance",
  content: "معماری محتوا",
  assets: "تصویر و رسانه",
  admin: "ادمین و CMS"
};

export const globalGrowthStatusLabels: Record<GlobalGrowthStatus, string> = {
  strong: "قوی",
  ready: "آماده",
  needs_work: "نیازمند تکمیل",
  blocked: "مسدود"
};

export function getGlobalGrowthAuditItems(): GlobalGrowthAuditItem[] {
  const publicRoutes = routeMap.filter((route) => !route.startsWith("/admin") && !route.startsWith("/api"));
  const pageQuality = getPageQualityItems();
  const pageQualitySummary = getPageQualitySummary(pageQuality);
  const deploymentSummary = getDeploymentReadinessSummary(deploymentReadinessItems);
  const contentSummary = getContentProductionSummary(contentProductionItems);
  const assetSummary = getAssetOperationSummary();
  const trustSummary = getTrustCenterSummary(getTrustRecords());
  const localizationSummary = getLocalizationSummary();
  const sourceIntakeSummary = getSourceIntakeSummary();
  const assetChannels = getAssetOperationChannels();
  const canonicalRoutes = publicRoutes.filter((route) => route === "/" || route.startsWith("/avesta") || route.startsWith("/articles"));
  const multilingualRoutes = publicRoutes.filter((route) => route === "/fa" || route === "/en");
  const blockedDeployment = deploymentSummary.blocked;

  const items: GlobalGrowthAuditItem[] = [
    {
      id: "technical-seo",
      title: "Technical SEO foundation",
      area: "seo",
      status: pageQualitySummary.averageScore >= 82 ? "strong" : "ready",
      score: Math.min(94, Math.max(72, pageQualitySummary.averageScore + 6)),
      owner: "SEO + Frontend",
      evidence: `${publicRoutes.length} مسیر عمومی، sitemap و robots فعال، canonical و metadata اختصاصی برای صفحات کلیدی آماده شده است.`,
      nextAction: "بعد از ورود محتوای واقعی، title و description هر مقاله، فصل و بند را از CMS نهایی تغذیه کنید.",
      routes: ["/", "/sitemap.xml", "/robots.txt", "/articles", "/avesta"],
      checks: [
        { label: "Sitemap route coverage", passed: true, note: `${publicRoutes.length} مسیر عمومی در معماری سایت شناخته شده است.` },
        { label: "Admin noindex policy", passed: true, note: "ادمین و APIها از ایندکس عمومی جدا شده‌اند." },
        { label: "Canonical strategy", passed: canonicalRoutes.length > 0, note: "مسیرهای محتوایی برای canonical و metadata آماده‌اند." }
      ]
    },
    {
      id: "multilingual-readiness",
      title: "Persian / English growth layer",
      area: "multilingual",
      status: localizationSummary.averageCompletion >= 78 ? "ready" : "needs_work",
      score: localizationSummary.averageCompletion,
      owner: "Localization + Editorial",
      evidence: `مسیرهای /fa و /en، hreflang پایه، تغییر lang/dir و ${localizationSummary.total} آیتم ترجمه در Localization Hub آماده پایش است.`,
      nextAction: "از /admin/localization، نسخه انگلیسی طبیعی و پژوهشی برای مقاله‌های pillar، صفحه‌های اوستا و واژه‌نامه را اولویت‌بندی کنید.",
      routes: ["/fa", "/en", "/admin/localization", "/articles", "/dictionary"],
      checks: [
        { label: "fa/en shell", passed: multilingualRoutes.length >= 2, note: "مسیرهای پایه زبان وجود دارد." },
        { label: "RTL/LTR handling", passed: true, note: "جهت فارسی و انگلیسی در لایه layout کنترل می‌شود." },
        { label: "Deep translated routes", passed: localizationSummary.ready > 0, note: "نسخه کامل انگلیسی برای همه فصل‌ها هنوز باید از CMS تکمیل شود." }
      ]
    },
    {
      id: "structured-data",
      title: "Schema and rich-result readiness",
      area: "schema",
      status: "ready",
      score: 86,
      owner: "SEO + Engineering",
      evidence: "WebSite، Organization، Article، Breadcrumb، CollectionPage و CreativeWork در صفحات مناسب آماده شده‌اند.",
      nextAction: "برای محتوای نهایی فقط schemaهایی را نگه دارید که متن و تصویرشان واقعاً روی صفحه دیده می‌شود.",
      routes: ["/", "/articles/[slug]", "/avesta/[section]", "/avesta/[section]/[chapter]"],
      checks: [
        { label: "Global JSON-LD", passed: true, note: "WebSite و Organization در layout اصلی قرار دارد." },
        { label: "Article JSON-LD", passed: articleItems.length > 0, note: `${articleItems.length} مقاله نمونه schema-ready هستند.` },
        { label: "Avesta CreativeWork", passed: sampleChapters.length > 0, note: `${sampleChapters.length} فصل نمونه برای CreativeWork آماده است.` }
      ]
    },
    {
      id: "research-trust",
      title: "Research trust and citation confidence",
      area: "trust",
      status: trustSummary.average >= 82 ? "strong" : trustSummary.average >= 68 ? "ready" : "needs_work",
      score: Math.round((trustSummary.average + sourceIntakeSummary.averageReadiness) / 2),
      owner: "Research + Editorial",
      evidence: `${trustSummary.total} رکورد اعتماد، ${trustSummary.verified} مورد مستند و ${sourceIntakeSummary.blocked} بسته منبع مسدود در Source Intake ثبت شده است.`,
      nextAction: "از /admin/source-intake برای متن کامل اوستا، منبع، نسخه، مترجم، یادداشت روش پژوهش و تاریخ بازبینی را اجباری کنید.",
      routes: ["/trust-center", "/research-methodology", "/citations", "/library", "/admin/source-intake"],
      checks: [
        { label: "Research methodology", passed: true, note: "صفحه روش پژوهش و مسیر منابع وجود دارد." },
        { label: "Citation records", passed: trustSummary.total > 0, note: `${trustSummary.total} رکورد اعتماد در fallback آماده است.` },
        { label: "Primary-source lock", passed: sourceIntakeSummary.blocked === 0, note: `${sourceIntakeSummary.blocked} بخش هنوز برای ورود پژوهشی مسدود است.` }
      ]
    },
    {
      id: "content-architecture",
      title: "Pillar content and Avesta depth",
      area: "content",
      status: articleItems.length >= 6 && sampleChapters.length >= 8 ? "ready" : "needs_work",
      score: Math.min(88, 54 + articleItems.length * 3 + sampleChapters.length * 2 + Math.min(sampleVerses.length, 8)),
      owner: "Product + Content",
      evidence: `${articleItems.length} مقاله، ${sampleChapters.length} فصل نمونه، ${sampleVerses.length} بند نمونه، ${glossaryTerms.length} واژه و ${libraryItems.length} آیتم کتابخانه آماده است.`,
      nextAction: "ورود محتوای واقعی اوستا را موجی انجام دهید: اول گات‌ها و یسنا، بعد یشت‌ها، وندیداد و خرده‌اوستا.",
      routes: ["/avesta", "/gathas", "/articles", "/dictionary", "/library"],
      checks: [
        { label: "Pillar articles", passed: articleItems.length >= 6, note: "مقاله‌های پایه برای رشد ارگانیک شروع شده‌اند." },
        { label: "Chapter guides", passed: sampleChapters.length >= 8, note: "ساختار فصل‌ها برای اتصال به CMS آماده است." },
        { label: "Glossary graph", passed: glossaryTerms.length > 0, note: "واژه‌نامه به مسیرهای مقاله و بند قابل اتصال است." }
      ]
    },
    {
      id: "asset-pipeline",
      title: "Image and media operations",
      area: "assets",
      status: assetSummary.backupCoverage >= 70 ? "ready" : "needs_work",
      score: assetSummary.backupCoverage,
      owner: "Media + DevOps",
      evidence: `${assetSummary.visualAssets} asset بصری، ${assetSummary.routeHeroes} hero، ${assetSummary.sectionCovers} cover و ${assetChannels.length} کانال آپلود تعریف شده است.`,
      nextAction: "برای production، فایل‌های تصویری، صوتی، PDF و ویدیو را به R2/S3/Cloudinary یا storage انتخابی منتقل کنید.",
      routes: ["/admin/asset-operations", "/admin/visual-assets", "/media", "/exhibitions"],
      checks: [
        { label: "Local asset manifest", passed: assetSummary.visualAssets > 0, note: "manifest تصویرها و heroها آماده است." },
        { label: "Upload channels", passed: assetChannels.length >= 4, note: "image، audio، PDF و video مدل‌سازی شده‌اند." },
        { label: "Production storage", passed: assetSummary.needsProductionStorage === 0, note: "اتصال storage دائمی هنوز کار production است." }
      ]
    },
    {
      id: "performance-cwv",
      title: "Core Web Vitals and build health",
      area: "performance",
      status: blockedDeployment > 0 ? "needs_work" : "ready",
      score: blockedDeployment > 0 ? 78 : 88,
      owner: "Frontend + QA",
      evidence: "Next.js static generation، priority hero images، lazy media و مسیرهای smoke test آماده‌اند؛ Lighthouse واقعی باید روی deploy اجرا شود.",
      nextAction: "بعد از deploy جدید، Lighthouse موبایل را روی /، /avesta، /articles و /shop اجرا و LCP/CLS/INP را ثبت کنید.",
      routes: ["/", "/avesta", "/articles", "/shop"],
      checks: [
        { label: "Static build compatible", passed: true, note: "صفحات عمومی بدون وابستگی اجباری به دیتابیس build می‌شوند." },
        { label: "Image loading policy", passed: true, note: "hero و thumbnailها مسیر بهینه‌سازی Next Image دارند." },
        { label: "Lab Lighthouse", passed: false, note: "امتیاز Lighthouse باید روی Vercel production اندازه‌گیری شود." }
      ]
    },
    {
      id: "admin-cms-readiness",
      title: "Admin CMS and publishing pipeline",
      area: "admin",
      status: contentSummary.blocked > 0 ? "needs_work" : "ready",
      score: contentSummary.averageReadiness,
      owner: "Product + Backend",
      evidence: `${contentSummary.total} محور تولید محتوا در ادمین تعریف شده و readiness میانگین ${contentSummary.averageReadiness}% است.`,
      nextAction: "DATABASE_URL، auth production، storage و draft/review/published را قبل از ورود محتوای سنگین نهایی کنید.",
      routes: ["/admin", "/admin/content-production-readiness", "/admin/publish-pipeline", "/admin/team-handoff"],
      checks: [
        { label: "Content models", passed: true, note: "قرارداد مدل‌های مقاله، واژه‌نامه، رسانه، فصل و بند آماده است." },
        { label: "Production database", passed: false, note: "اتصال دیتابیس واقعی باید در Vercel تنظیم شود." },
        { label: "Publish workflow", passed: true, note: "draft/review/published در مسیر ادمین مستند شده است." }
      ]
    }
  ];

  return items.sort((a, b) => a.score - b.score);
}

export function getGlobalGrowthAuditSummary(items: GlobalGrowthAuditItem[] = getGlobalGrowthAuditItems()) {
  const averageScore = Math.round(items.reduce((sum, item) => sum + item.score, 0) / Math.max(items.length, 1));
  const strong = items.filter((item) => item.status === "strong").length;
  const ready = items.filter((item) => item.status === "ready").length;
  const needsWork = items.filter((item) => item.status === "needs_work").length;
  const blocked = items.filter((item) => item.status === "blocked").length;
  const lowestScore = [...items].sort((a, b) => a.score - b.score)[0];
  const launchMode = blocked > 0 ? "GLOBAL HOLD" : averageScore >= 86 && needsWork === 0 ? "GLOBAL READY" : "GLOBAL SOFT-GO";

  return {
    total: items.length,
    averageScore,
    strong,
    ready,
    needsWork,
    blocked,
    launchMode,
    nextItem: lowestScore
  };
}

export function getGlobalGrowthAuditSnapshot() {
  const items = getGlobalGrowthAuditItems();

  return {
    generatedAt: new Date().toISOString(),
    summary: getGlobalGrowthAuditSummary(items),
    items
  };
}
