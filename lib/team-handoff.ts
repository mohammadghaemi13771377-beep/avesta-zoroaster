export type TeamHandoffStatus = "ready" | "needs_setup" | "needs_content";

export type TeamHandoffItem = {
  id: string;
  team: string;
  status: TeamHandoffStatus;
  owner: string;
  mission: string;
  keyRoutes: Array<{
    label: string;
    href: string;
  }>;
  keyDocs: string[];
  deliverables: string[];
  nextAction: string;
};

export const teamHandoffStatusLabels: Record<TeamHandoffStatus, string> = {
  ready: "آماده تحویل",
  needs_setup: "نیازمند راه‌اندازی",
  needs_content: "نیازمند محتوا/دارایی",
};

export const teamHandoffItems: TeamHandoffItem[] = [
  {
    id: "engineering",
    team: "تیم فنی",
    status: "needs_setup",
    owner: "Tech Lead",
    mission: "اجرای پروژه، اتصال دیتابیس و سرویس‌های production، build و deploy.",
    keyRoutes: [
      { label: "سلامت پروژه", href: "/api/admin/health" },
      { label: "SEO", href: "/admin/seo" },
      { label: "آمادگی لانچ", href: "/admin#launch-readiness" },
    ],
    keyDocs: ["README.md", "docs/technical-handoff.md", "docs/local-preview-and-deploy.md", "prisma/schema.prisma"],
    deliverables: ["npm install/build", "PostgreSQL production", "Prisma migrate/seed", "auth امن", "storage و Meilisearch"],
    nextAction: "روی محیط تیم، dependencyها نصب و `npm run build` اجرا شود.",
  },
  {
    id: "product",
    team: "تیم محصول",
    status: "ready",
    owner: "Product Lead",
    mission: "تعریف MVP لانچ، اولویت‌دهی قلمروها و کنترل مسیر تبدیل سایت به جهان دیجیتال.",
    keyRoutes: [
      { label: "نقشه جهان", href: "/world" },
      { label: "Inventory", href: "/admin/inventory" },
      { label: "صف تولید", href: "/admin/production" },
    ],
    keyDocs: ["docs/team-delivery-master.md", "docs/product-design-handoff.md", "docs/implementation-roadmap.md"],
    deliverables: ["MVP scope", "اولویت قلمروها", "قبولی UX", "برنامه فاز production"],
    nextAction: "قلمروهای `/world` و کمبودهای `/admin/inventory` را برای فاز لانچ اولویت‌بندی کنید.",
  },
  {
    id: "design",
    team: "تیم دیزاین",
    status: "needs_content",
    owner: "Design Lead",
    mission: "نهایی‌سازی سیستم بصری Dark Luxury Persian Mythology و کنترل responsive.",
    keyRoutes: [
      { label: "خانه", href: "/" },
      { label: "نقشه جهان", href: "/world" },
      { label: "پورتال اوستا", href: "/avesta" },
    ],
    keyDocs: ["docs/product-design-handoff.md", "docs/media-asset-plan.md", "docs/ai-prompt-library.md"],
    deliverables: ["UI QA", "mobile states", "asset final", "component polish", "design tokens نهایی"],
    nextAction: "صفحه خانه، `/world` و کارت‌های پورتال اوستا را در موبایل و دسکتاپ بازبینی کنید.",
  },
  {
    id: "content",
    team: "تیم محتوا و پژوهش",
    status: "needs_content",
    owner: "Editorial Lead",
    mission: "ورود متن‌های معتبر اوستا، ترجمه، تحلیل، واژه‌نامه و citation.",
    keyRoutes: [
      { label: "اوستا ادمین", href: "/admin/avesta" },
      { label: "واژه‌نامه", href: "/admin/glossary" },
      { label: "Review Gate", href: "/admin/production/review" },
    ],
    keyDocs: ["docs/content-intake-guide.md", "docs/bulk-import-guide.md", "docs/avesta-data-flow.md", "docs/admin-content-contract.md"],
    deliverables: ["متن اصلی", "ترجمه کلاسیک", "بازنویسی ساده", "تحلیل مفهومی", "منابع و citation"],
    nextAction: "از `/admin/production/briefs` briefها را بردارید و خروجی‌ها را در Review Gate تایید کنید.",
  },
  {
    id: "media",
    team: "تیم رسانه و AI",
    status: "needs_content",
    owner: "Creative Lead",
    mission: "تولید تصاویر AI، صوت، thumbnail و دارایی‌های سینمایی اختصاصی.",
    keyRoutes: [
      { label: "استودیوی AI", href: "/ai-studio" },
      { label: "رسانه ادمین", href: "/admin/media" },
      { label: "Brief تولید", href: "/admin/production/briefs" },
    ],
    keyDocs: ["docs/media-asset-plan.md", "docs/ai-prompt-library.md", "docs/team-delivery-master.md"],
    deliverables: ["تصویر hero", "کاور بخش‌ها", "thumbnail", "فایل صوتی", "prompt و negative prompt"],
    nextAction: "briefهای تصویری را از `/admin/production/briefs` شروع کنید و خروجی را در `/admin/media` ثبت کنید.",
  },
  {
    id: "growth",
    team: "تیم رشد و خبرنامه",
    status: "needs_setup",
    owner: "Growth Lead",
    mission: "راه‌اندازی newsletter، کمپین، analytics، A/B، send-time و delivery tracking.",
    keyRoutes: [
      { label: "خبرنامه", href: "/admin/newsletter" },
      { label: "A/B Lab", href: "/admin/newsletter/experiments" },
      { label: "Delivery", href: "/admin/newsletter/delivery" },
    ],
    keyDocs: ["docs/team-delivery-master.md", "docs/search-meilisearch-plan.md"],
    deliverables: ["email provider", "double opt-in", "segments", "open/click tracking", "unsubscribe واقعی"],
    nextAction: "provider ایمیل و webhookهای analytics/delivery را برای production انتخاب و تنظیم کنید.",
  },
  {
    id: "commerce",
    team: "تیم فروشگاه",
    status: "needs_setup",
    owner: "Commerce Lead",
    mission: "تبدیل فروشگاه demo به فروشگاه واقعی محصولات فرهنگی.",
    keyRoutes: [
      { label: "فروشگاه", href: "/shop" },
      { label: "ادمین فروشگاه", href: "/admin/shop" },
      { label: "Checkout", href: "/shop/checkout" },
    ],
    keyDocs: ["docs/team-delivery-master.md", "prisma/schema.prisma"],
    deliverables: ["محصول واقعی", "عکس محصول", "درگاه پرداخت", "انبار", "ارسال و مالیات"],
    nextAction: "کاتالوگ محصولات واقعی و provider پرداخت/ارسال را مشخص کنید.",
  },
];

export function getTeamHandoffSummary(items: TeamHandoffItem[] = teamHandoffItems) {
  return {
    teams: items.length,
    ready: items.filter((item) => item.status === "ready").length,
    needsSetup: items.filter((item) => item.status === "needs_setup").length,
    needsContent: items.filter((item) => item.status === "needs_content").length,
    docs: Array.from(new Set(items.flatMap((item) => item.keyDocs))).length,
    deliverables: items.reduce((sum, item) => sum + item.deliverables.length, 0),
  };
}
