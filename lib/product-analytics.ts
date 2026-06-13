import { getPageQualityItems } from "@/lib/page-quality";
import { getNewsletterAnalyticsSummary } from "@/lib/newsletter-analytics";
import { getCommerceDashboard } from "@/lib/admin-shop";
import { getWorldMapSummary } from "@/lib/world-map";

export type ProductFunnelStage = {
  id: string;
  label: string;
  route: string;
  visitors: number;
  conversionRate: number;
  dropoffRisk: "low" | "medium" | "high";
  owner: string;
  insight: string;
  nextAction: string;
};

export type ProductEventSpec = {
  event: string;
  label: string;
  category: "reader" | "search" | "commerce" | "newsletter" | "admin" | "media";
  route: string;
  priority: "must-have" | "should-have" | "nice-to-have";
  payload: string[];
  reason: string;
};

export const dropoffRiskLabels: Record<ProductFunnelStage["dropoffRisk"], string> = {
  low: "پایدار",
  medium: "نیازمند رصد",
  high: "ریسک ریزش",
};

export const dropoffRiskTone: Record<ProductFunnelStage["dropoffRisk"], string> = {
  low: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  medium: "border-gold/25 bg-gold/10 text-gold-light",
  high: "border-orange-300/25 bg-orange-300/10 text-orange-100",
};

export function getProductFunnelStages(): ProductFunnelStage[] {
  const pageQuality = getPageQualityItems();
  const homeQuality = pageQuality.find((item) => item.route === "/")?.score ?? 88;
  const avestaQuality = pageQuality.find((item) => item.route === "/avesta")?.score ?? 86;
  const searchQuality = pageQuality.find((item) => item.route === "/search")?.score ?? 82;
  const shopQuality = pageQuality.find((item) => item.route === "/shop")?.score ?? 76;

  return [
    {
      id: "entry-home",
      label: "ورود به جهان",
      route: "/",
      visitors: 12500,
      conversionRate: normalizeRate(homeQuality - 28),
      dropoffRisk: "low",
      owner: "تیم محصول",
      insight: "Hero، پورتال اوستا و CTA اصلی باید کاربر را سریع به مسیر تجربه ببرد.",
      nextAction: "eventهای hero_cta_click روی CTAها و کارت‌های پورتال خانه ثبت شوند.",
    },
    {
      id: "avesta-portal",
      label: "ورود به پورتال اوستا",
      route: "/avesta",
      visitors: 7100,
      conversionRate: normalizeRate(avestaQuality - 34),
      dropoffRisk: "medium",
      owner: "تیم محتوا",
      insight: "کارت‌های یسنا، گات‌ها و یشت‌ها باید بیشترین کلیک و عمق مطالعه را بسازند.",
      nextAction: "کلیک هر کارت بخش اوستا با section_slug و source_route ثبت شود.",
    },
    {
      id: "search-discovery",
      label: "کاوش و جستجو",
      route: "/search",
      visitors: 3900,
      conversionRate: normalizeRate(searchQuality - 36),
      dropoffRisk: "medium",
      owner: "تیم فنی و محتوا",
      insight: "جستجو باید مشخص کند کاربر دنبال واژه، مقاله، بند اوستا یا رسانه است.",
      nextAction: "search_submitted، search_result_clicked و zero_result ثبت شوند.",
    },
    {
      id: "newsletter-retention",
      label: "عضویت نورنامه",
      route: "/newsletter",
      visitors: 2200,
      conversionRate: getNewsletterAnalyticsSummary().conversionRate,
      dropoffRisk: "low",
      owner: "تیم رشد",
      insight: "نورنامه کانال تبدیل خواننده گذری به مخاطب وفادار است.",
      nextAction: "newsletter_signup، preference_saved و unsubscribe_reason ثبت شوند.",
    },
    {
      id: "commerce-path",
      label: "مسیر فروشگاه فرهنگی",
      route: "/shop",
      visitors: 1800,
      conversionRate: normalizeRate(shopQuality - 48),
      dropoffRisk: "high",
      owner: "تیم تجارت",
      insight: `فروشگاه ${getCommerceDashboard().productCount} محصول نمونه دارد و تا پرداخت واقعی باید دقیق رصد شود.`,
      nextAction: "product_viewed، add_to_cart، checkout_started و payment_result ثبت شوند.",
    },
  ];
}

export function getProductEventSpecs(): ProductEventSpec[] {
  return [
    {
      event: "hero_cta_click",
      label: "کلیک CTA خانه",
      category: "reader",
      route: "/",
      priority: "must-have",
      payload: ["cta_id", "label", "locale", "source_route"],
      reason: "برای سنجش قدرت دروازه ورود و مسیر ورود به اوستا.",
    },
    {
      event: "avesta_section_opened",
      label: "ورود به بخش اوستا",
      category: "reader",
      route: "/avesta",
      priority: "must-have",
      payload: ["section_slug", "card_position", "source_route"],
      reason: "برای فهم اینکه کدام بخش‌های اوستا کشش بیشتری دارند.",
    },
    {
      event: "verse_reading_progress",
      label: "پیشرفت مطالعه بند",
      category: "reader",
      route: "/avesta/[section]/[chapter]/[verse]",
      priority: "must-have",
      payload: ["section_slug", "chapter_slug", "verse_slug", "progress_percent", "reading_mode"],
      reason: "برای ادامه مطالعه، پیشنهاد هوشمند و retention.",
    },
    {
      event: "search_submitted",
      label: "جستجوی کاربر",
      category: "search",
      route: "/search",
      priority: "must-have",
      payload: ["query", "type", "result_count", "locale"],
      reason: "برای بهبود Meilisearch، واژه‌نامه و محتوای کمبوددار.",
    },
    {
      event: "command_center_opened",
      label: "باز شدن فرمان‌خانه سریع",
      category: "reader",
      route: "global",
      priority: "should-have",
      payload: ["source", "surface"],
      reason: "برای فهم اینکه کاربر چقدر از ناوبری سریع و میانبرها استفاده می‌کند.",
    },
    {
      event: "command_center_action_clicked",
      label: "انتخاب مسیر از فرمان‌خانه",
      category: "reader",
      route: "global",
      priority: "should-have",
      payload: ["title", "href", "surface"],
      reason: "برای پیدا کردن مسیرهای پرتقاضا و بهینه‌سازی navigation اصلی.",
    },
    {
      event: "onboarding_profile_saved",
      label: "ذخیره پروفایل شروع",
      category: "reader",
      route: "/onboarding",
      priority: "should-have",
      payload: ["goal", "time", "tone"],
      reason: "برای فهم نیت ورود کاربران تازه و ساخت personalization بعدی.",
    },
    {
      event: "onboarding_path_started",
      label: "شروع مسیر از آیین ورود",
      category: "reader",
      route: "/onboarding",
      priority: "must-have",
      payload: ["goal", "time", "tone", "label", "href"],
      reason: "برای سنجش تبدیل onboarding به مطالعه واقعی یا ساخت مسیر کامل.",
    },
    {
      event: "dashboard_onboarding_resume_clicked",
      label: "ادامه مسیر شروع از نورخانه",
      category: "reader",
      route: "/dashboard",
      priority: "should-have",
      payload: ["state", "goal", "href"],
      reason: "برای سنجش اینکه مسیر ذخیره‌شده onboarding باعث بازگشت کاربر به تجربه می‌شود یا نه.",
    },
    {
      event: "journey_plan_saved",
      label: "ذخیره مسیر شخصی",
      category: "reader",
      route: "/journey-builder",
      priority: "must-have",
      payload: ["intent", "pace", "level", "mode", "step_count"],
      reason: "برای سنجش اینکه کاربر مسیر ساخته‌شده را واقعاً برای بازگشت روزانه ذخیره می‌کند یا نه.",
    },
    {
      event: "dashboard_active_journey_clicked",
      label: "ادامه مسیر فعال از نورخانه",
      category: "reader",
      route: "/dashboard",
      priority: "should-have",
      payload: ["state", "href", "step_count"],
      reason: "برای سنجش تبدیل مسیر ذخیره‌شده به مطالعه و اقدام بعدی.",
    },
    {
      event: "active_journey_step_completed",
      label: "تکمیل قدم مسیر فعال",
      category: "reader",
      route: "/dashboard",
      priority: "must-have",
      payload: ["step_id", "href", "completed_count", "step_count"],
      reason: "برای سنجش پیشرفت واقعی کاربر در مسیر شخصی و فعال‌سازی retention.",
    },
    {
      event: "newsletter_signup",
      label: "عضویت خبرنامه",
      category: "newsletter",
      route: "/newsletter",
      priority: "should-have",
      payload: ["topics", "source_route", "variant"],
      reason: "برای رشد مخاطب وفادار و سنجش کمپین‌ها.",
    },
    {
      event: "product_added_to_cart",
      label: "افزودن محصول به سبد",
      category: "commerce",
      route: "/shop/[slug]",
      priority: "should-have",
      payload: ["product_slug", "category", "price", "inventory_status"],
      reason: "برای تبدیل فروشگاه فرهنگی از demo به فروش واقعی.",
    },
  ];
}

export function getProductAnalyticsSummary(stages: ProductFunnelStage[] = getProductFunnelStages()) {
  const visitors = stages.reduce((sum, stage) => sum + stage.visitors, 0);
  const averageConversion = Math.round(stages.reduce((sum, stage) => sum + stage.conversionRate, 0) / stages.length);
  const worldSummary = getWorldMapSummary();

  return {
    visitors,
    averageConversion,
    trackedStages: stages.length,
    highRiskStages: stages.filter((stage) => stage.dropoffRisk === "high").length,
    eventSpecs: getProductEventSpecs().length,
    worldCompletion: worldSummary.averageCompletion,
  };
}

function normalizeRate(value: number) {
  return Math.max(8, Math.min(72, Math.round(value)));
}
