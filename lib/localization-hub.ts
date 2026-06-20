import { localizedRoutes, locales, type Locale } from "@/lib/i18n";
import { articleItems, glossaryTerms, sampleChapters, sampleVerses } from "@/lib/sample-content";

export type LocalizationStatus = "ready" | "needs_editorial" | "needs_translation" | "blocked";

export type LocalizationArea = "gateway" | "avesta" | "article" | "glossary" | "media" | "commerce" | "admin";

export type LocalizationItem = {
  id: string;
  route: string;
  title: string;
  area: LocalizationArea;
  status: LocalizationStatus;
  completion: number;
  owner: string;
  sourceLocale: Locale;
  targetLocales: Locale[];
  evidence: string;
  nextAction: string;
  checks: Array<{
    label: string;
    passed: boolean;
    note: string;
  }>;
};

export const localizationStatusLabels: Record<LocalizationStatus, string> = {
  ready: "آماده انتشار",
  needs_editorial: "نیازمند بازبینی",
  needs_translation: "نیازمند ترجمه",
  blocked: "مسدود"
};

export const localizationAreaLabels: Record<LocalizationArea, string> = {
  gateway: "دروازه‌های اصلی",
  avesta: "اوستا",
  article: "مقاله‌ها",
  glossary: "واژه‌نامه",
  media: "رسانه",
  commerce: "فروشگاه",
  admin: "ادمین"
};

const routeLabels: Record<string, string> = {
  "/": "Homepage",
  "/avesta": "Avesta Portal",
  "/gathas": "Gathas Hub",
  "/zoroaster": "Zoroaster",
  "/zoroastrianism": "Zoroastrianism",
  "/monotheism": "Monotheism",
  "/dictionary": "Dictionary",
  "/library": "Library",
  "/media": "Media",
  "/articles": "Articles",
  "/timeline": "Timeline",
  "/search": "Search"
};

export function getLocalizationItems(): LocalizationItem[] {
  const routeItems: LocalizationItem[] = localizedRoutes.map((route): LocalizationItem => {
    const isGateway = route === "/" || route === "/avesta" || route === "/gathas" || route === "/zoroaster";
    const isContent = route === "/articles" || route === "/dictionary" || route === "/library";
    const status: LocalizationStatus = isGateway ? "needs_editorial" : isContent ? "needs_translation" : "needs_editorial";
    const area = inferArea(route);
    const completion = isGateway ? 78 : isContent ? 58 : 66;

    return {
      id: `localization-${route.replaceAll("/", "-") || "home"}`,
      route,
      title: routeLabels[route] ?? route,
      area,
      status,
      completion,
      owner: isContent ? "Editorial + Research" : "Product + Localization",
      sourceLocale: "fa",
      targetLocales: ["en"],
      evidence: isGateway
        ? "پوسته فارسی و انگلیسی آماده است، اما متن انگلیسی باید به‌صورت انسانی و علمی بازبینی شود."
        : "route چندزبانه شناخته شده است، اما محتوای انگلیسی عمیق و قابل استناد هنوز باید کامل شود.",
      nextAction: isContent
        ? "برای این مسیر نسخه انگلیسی طبیعی، citation-friendly و قابل اعتماد تولید و توسط editor انسانی بازبینی شود."
        : "کپی انگلیسی صفحه با لحن museum/encyclopedia بازنویسی و از نظر اصطلاحات زرتشتی کنترل شود.",
      checks: [
        { label: "fa route", passed: true, note: "نسخه فارسی پایه در معماری سایت وجود دارد." },
        { label: "en route", passed: true, note: "مسیر یا query زبان انگلیسی در لایه i18n آماده است." },
        { label: "human editorial pass", passed: false, note: "بازبینی انسانی ترجمه باید قبل از رشد جهانی انجام شود." }
      ]
    };
  });

  const specializedItems = [
    {
      id: "localization-avesta-chapters",
      route: "/avesta/[section]/[chapter]",
      title: "Avesta chapter guides",
      area: "avesta",
      status: "needs_translation",
      completion: Math.min(82, 42 + sampleChapters.length * 3),
      owner: "Research + Localization",
      sourceLocale: "fa",
      targetLocales: ["en"],
      evidence: `${sampleChapters.length} chapter guide و ${sampleVerses.length} verse نمونه آماده ساختاردهی هستند.`,
      nextAction: "برای هر فصل، summary، historicalContext، ritualContext، keyThemes و relatedChapters انگلیسی پژوهشی وارد شود.",
      checks: [
        { label: "chapter structure", passed: sampleChapters.length > 0, note: "مدل فصل‌ها آماده اتصال به CMS است." },
        { label: "verse layer", passed: sampleVerses.length > 0, note: "لایه بند/آیه برای متن و ترجمه آماده است." },
        { label: "full English corpus", passed: false, note: "ترجمه کامل انگلیسی اوستا هنوز production task است." }
      ]
    },
    {
      id: "localization-pillar-articles",
      route: "/articles/[slug]",
      title: "Pillar articles",
      area: "article",
      status: articleItems.length >= 8 ? "needs_editorial" : "needs_translation",
      completion: Math.min(84, 38 + articleItems.length * 5),
      owner: "Editorial + SEO",
      sourceLocale: "fa",
      targetLocales: ["en"],
      evidence: `${articleItems.length} مقاله pillar برای رشد SEO و internal linking آماده شده است.`,
      nextAction: "برای هر مقاله، نسخه انگلیسی طبیعی، عنوان SEO، description، canonical/hreflang و منابع مرتبط ثبت شود.",
      checks: [
        { label: "pillar inventory", passed: articleItems.length >= 6, note: "موجودی مقاله‌های پایه مناسب شروع است." },
        { label: "SEO fields", passed: true, note: "ساختار title و description آماده است." },
        { label: "native English review", passed: false, note: "متن انگلیسی باید از حالت نمونه به نسخه نهایی برسد." }
      ]
    },
    {
      id: "localization-glossary-terms",
      route: "/dictionary/[slug]",
      title: "Glossary terms",
      area: "glossary",
      status: "needs_editorial",
      completion: Math.min(80, 44 + glossaryTerms.length * 6),
      owner: "Research + Language",
      sourceLocale: "fa",
      targetLocales: ["en"],
      evidence: `${glossaryTerms.length} واژه کلیدی برای اصطلاحات اوستایی و زرتشتی در fallback وجود دارد.`,
      nextAction: "برای هر واژه، transliteration، ریشه، equivalent انگلیسی، کاربرد در متن و لینک مقاله مرتبط اضافه شود.",
      checks: [
        { label: "term inventory", passed: glossaryTerms.length > 0, note: "واژه‌های پایه آماده‌اند." },
        { label: "root field", passed: true, note: "ریشه واژه در مدل نمونه دیده شده است." },
        { label: "bilingual terminology QA", passed: false, note: "معادل‌های انگلیسی باید پژوهشی و یکدست شوند." }
      ]
    }
  ] satisfies LocalizationItem[];

  return [...routeItems, ...specializedItems].sort((a, b) => a.completion - b.completion);
}

export function getLocalizationSummary(items: LocalizationItem[] = getLocalizationItems()) {
  const averageCompletion = Math.round(items.reduce((sum, item) => sum + item.completion, 0) / Math.max(items.length, 1));
  const ready = items.filter((item) => item.status === "ready").length;
  const needsEditorial = items.filter((item) => item.status === "needs_editorial").length;
  const needsTranslation = items.filter((item) => item.status === "needs_translation").length;
  const blocked = items.filter((item) => item.status === "blocked").length;
  const targetLocales = locales.filter((locale) => locale !== "fa");
  const nextItem = [...items].sort((a, b) => a.completion - b.completion)[0];

  return {
    total: items.length,
    locales: locales.length,
    targetLocales,
    averageCompletion,
    ready,
    needsEditorial,
    needsTranslation,
    blocked,
    nextItem
  };
}

export function getLocalizationHubSnapshot() {
  const items = getLocalizationItems();

  return {
    generatedAt: new Date().toISOString(),
    summary: getLocalizationSummary(items),
    items
  };
}

function inferArea(route: string): LocalizationArea {
  if (route === "/" || route === "/gathas" || route === "/zoroaster" || route === "/zoroastrianism" || route === "/monotheism") {
    return "gateway";
  }
  if (route.startsWith("/avesta")) return "avesta";
  if (route.startsWith("/articles")) return "article";
  if (route.startsWith("/dictionary")) return "glossary";
  if (route.startsWith("/media") || route.startsWith("/library")) return "media";
  return "gateway";
}
