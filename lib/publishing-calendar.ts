import { editorialCommandTasks } from "@/lib/editorial-workflow";

export type PublishingChannel = "site" | "library" | "media" | "seo" | "shop";
export type PublishingStatus = "planned" | "in-progress" | "review" | "scheduled";

export type PublishingEvent = {
  id: string;
  title: string;
  date: string;
  channel: PublishingChannel;
  status: PublishingStatus;
  owner: string;
  campaign: string;
  goal: string;
  href: string;
  relatedTaskId?: string;
  deliverables: string[];
};

export const channelLabels: Record<PublishingChannel, string> = {
  site: "سایت",
  library: "کتابخانه",
  media: "رسانه",
  seo: "SEO",
  shop: "فروشگاه",
};

export const publishingStatusLabels: Record<PublishingStatus, string> = {
  planned: "برنامه‌ریزی شده",
  "in-progress": "در حال آماده‌سازی",
  review: "بازبینی",
  scheduled: "زمان‌بندی شده",
};

export const publishingEvents: PublishingEvent[] = [
  {
    id: "publish-yasna-ha-1",
    title: "انتشار صفحه کامل یسنا ۱",
    date: "2026-06-16",
    channel: "site",
    status: "in-progress",
    owner: "Content",
    campaign: "ورود به جهان اوستا",
    goal: "ساخت اولین نمونه کامل محتوای طلایی با متن، ترجمه، تحلیل و پیام اخلاقی.",
    href: "/admin/avesta",
    relatedTaskId: "yasna-ha-1",
    deliverables: ["متن اصلی", "ترجمه کلاسیک", "بازنویسی ساده", "پیام اخلاقی", "تصویر AI"],
  },
  {
    id: "publish-gathas-audio",
    title: "رونمایی روایت صوتی گات‌ها",
    date: "2026-06-18",
    channel: "media",
    status: "planned",
    owner: "Media",
    campaign: "شنیدن خرد باستان",
    goal: "شروع تجربه صوتی و آماده‌سازی مسیر پادکست آینده.",
    href: "/admin/media",
    relatedTaskId: "gathas-audio",
    deliverables: ["فایل صوتی", "کاور AI", "متن معرفی", "اتصال به صفحه گات‌ها"],
  },
  {
    id: "publish-asha-source-pack",
    title: "بسته منابع مقاله اشا",
    date: "2026-06-21",
    channel: "library",
    status: "review",
    owner: "Editorial",
    campaign: "اشا؛ راستی و نظم",
    goal: "افزایش اعتبار پژوهشی مقاله اشا با citation و منابع کتابخانه‌ای.",
    href: "/admin/library",
    relatedTaskId: "asha-sources",
    deliverables: ["منابع مقاله", "Citation", "واژه‌نامه اشا", "Trust Center update"],
  },
  {
    id: "publish-seo-schema-pass",
    title: "بازبینی SEO صفحات مرجع",
    date: "2026-06-24",
    channel: "seo",
    status: "scheduled",
    owner: "SEO",
    campaign: "آماده‌سازی ایندکس گوگل",
    goal: "کنترل metadata، schema، sitemap و صفحات هاب قبل از لانچ.",
    href: "/admin/seo",
    relatedTaskId: "seo-schema",
    deliverables: ["Article schema", "DefinedTerm schema", "Sitemap review", "Robots review"],
  },
  {
    id: "publish-shop-soft-launch",
    title: "Soft Launch فروشگاه فرهنگی",
    date: "2026-06-28",
    channel: "shop",
    status: "planned",
    owner: "Commerce",
    campaign: "محصولات فرهنگی اوستا",
    goal: "آماده‌سازی ویترین محصولات برای تست داخلی قبل از فروش واقعی.",
    href: "/admin/shop",
    deliverables: ["محصولات نمونه", "موجودی", "checkout demo", "گزارش فروش"],
  },
];

export function getPublishingCalendarSummary(events: PublishingEvent[] = publishingEvents) {
  const nextEvent = [...events].sort((a, b) => a.date.localeCompare(b.date))[0];
  const campaigns = new Set(events.map((event) => event.campaign));
  const inProgress = events.filter((event) => event.status === "in-progress" || event.status === "review").length;
  const taskLinked = events.filter((event) => event.relatedTaskId).length;

  return {
    total: events.length,
    campaigns: campaigns.size,
    inProgress,
    taskLinked,
    nextEvent,
  };
}

export function getCalendarEventsWithTaskReadiness(events: PublishingEvent[] = publishingEvents) {
  return events.map((event) => {
    const task = event.relatedTaskId
      ? editorialCommandTasks.find((item) => item.id === event.relatedTaskId)
      : undefined;

    return {
      ...event,
      readiness: task?.readiness ?? 50,
      blocker: task?.blocker ?? "نیازمند برنامه عملیاتی",
      reviewer: task?.reviewer ?? "Product Lead",
    };
  });
}
