import { sacredCalendarEvents } from "@/lib/sacred-calendar";

export type CampaignChannel = "homepage" | "article" | "media" | "email" | "shop";

export type SeasonalCampaign = {
  id: string;
  eventId: string;
  title: string;
  subtitle: string;
  heroMessage: string;
  primaryCta: {
    label: string;
    href: string;
  };
  channels: Array<{
    type: CampaignChannel;
    label: string;
    deliverable: string;
    href: string;
  }>;
  assets: string[];
  checklist: string[];
};

export const channelLabels: Record<CampaignChannel, string> = {
  homepage: "خانه",
  article: "مقاله",
  media: "رسانه",
  email: "ایمیل",
  shop: "فروشگاه",
};

export const seasonalCampaigns: SeasonalCampaign[] = sacredCalendarEvents.map((event) => ({
  id: `${event.id}-campaign`,
  eventId: event.id,
  title: `کمپین ${event.title}`,
  subtitle: event.subtitle,
  heroMessage: `${event.title} را به تجربه‌ای از ${event.spiritualTheme} تبدیل کن: مطالعه، تصویر، یادداشت و محصول فرهنگی.`,
  primaryCta: {
    label: `صفحه ${event.title}`,
    href: `/calendar/${event.id}`,
  },
  channels: [
    {
      type: "homepage",
      label: "بنر صفحه خانه",
      deliverable: `کارت سینمایی ${event.title} با پیام «${event.subtitle}»`,
      href: "/",
    },
    {
      type: "article",
      label: "مقاله فصلی",
      deliverable: `مقاله کوتاه درباره ${event.spiritualTheme}`,
      href: "/articles",
    },
    {
      type: "media",
      label: "پک تصویر و ویدیو",
      deliverable: `۳ تصویر AI و یک ویدیوی کوتاه برای ${event.title}`,
      href: "/ai-studio",
    },
    {
      type: "email",
      label: "خبرنامه",
      deliverable: `ایمیل الهام‌بخش با مسیر مطالعه و دعوت به دفتر روزانه`,
      href: "/reflection",
    },
    {
      type: "shop",
      label: "کالکشن فروشگاه",
      deliverable: event.productIdeas.join("، "),
      href: "/shop",
    },
  ],
  assets: [
    `Hero artwork برای ${event.title}`,
    `کاور مقاله با تم ${event.scene}`,
    `سه استوری یا پست کوتاه با شعار ${event.spiritualTheme}`,
    "CTA طلایی برای ورود به مسیر مطالعه",
  ],
  checklist: [
    "بازبینی متن فرهنگی و لحن غیرتبلیغاتی",
    "ساخت تصویر AI و ثبت منبع/پرامپت در پنل رسانه",
    "لینک دادن به صفحه مناسبت، دفتر روزانه و مسیر مطالعه",
    "آماده‌سازی محصول یا placeholder کالکشن فروشگاه",
  ],
}));

export function getSeasonalCampaignSummary(campaigns: SeasonalCampaign[] = seasonalCampaigns) {
  const channels = new Set(campaigns.flatMap((campaign) => campaign.channels.map((channel) => channel.type)));
  const assets = campaigns.reduce((sum, campaign) => sum + campaign.assets.length, 0);
  const checklistItems = campaigns.reduce((sum, campaign) => sum + campaign.checklist.length, 0);

  return {
    total: campaigns.length,
    channels: channels.size,
    assets,
    checklistItems,
    nextCampaign: campaigns[0],
  };
}
