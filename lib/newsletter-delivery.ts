import { newsletterEditions } from "@/lib/newsletter-editions";
import { newsletterAnalytics, getRate } from "@/lib/newsletter-analytics";

export type NewsletterDeliveryHealth = "healthy" | "watch" | "at_risk";
export type NewsletterDeliveryEventType = "sent" | "delivered" | "opened" | "clicked" | "bounced" | "unsubscribed";

export type NewsletterDeliveryReport = {
  editionId: string;
  provider: string;
  delivered: number;
  bounced: number;
  complaints: number;
  retries: number;
  health: NewsletterDeliveryHealth;
  action: string;
};

export type NewsletterDeliveryEvent = {
  id: string;
  editionId: string;
  type: NewsletterDeliveryEventType;
  contact: string;
  timeLabel: string;
  detail: string;
};

const deliverySeeds: Record<string, Omit<NewsletterDeliveryReport, "editionId">> = {
  "light-digest-nowruz": {
    provider: "Email Provider Demo",
    delivered: 1764,
    bounced: 22,
    complaints: 2,
    retries: 14,
    health: "healthy",
    action: "ارسال بعدی با همین segment و زمان پیشنهادی قابل انجام است.",
  },
  "light-digest-mehregan": {
    provider: "Email Provider Demo",
    delivered: 1198,
    bounced: 28,
    complaints: 4,
    retries: 21,
    health: "watch",
    action: "قبل از ارسال بعدی، subject برنده و لیست مخاطبان کم‌تعامل بازبینی شود.",
  },
  "light-digest-sadeh": {
    provider: "Email Provider Demo",
    delivered: 676,
    bounced: 31,
    complaints: 5,
    retries: 18,
    health: "at_risk",
    action: "ارسال انبوه متوقف بماند تا پاکسازی لیست و تست CTA رسانه‌ای انجام شود.",
  },
};

export const newsletterDeliveryReports: NewsletterDeliveryReport[] = newsletterEditions.map((edition) => ({
  editionId: edition.id,
  ...(deliverySeeds[edition.id] ?? {
    provider: "Email Provider Demo",
    delivered: 0,
    bounced: 0,
    complaints: 0,
    retries: 0,
    health: "watch" as const,
    action: "نیازمند اتصال به provider و دریافت eventهای واقعی.",
  }),
}));

export const newsletterDeliveryEvents: NewsletterDeliveryEvent[] = [
  {
    id: "evt-nowruz-click",
    editionId: "light-digest-nowruz",
    type: "clicked",
    contact: "reader-1842",
    timeLabel: "۰۹:۱۲",
    detail: "کلیک روی دفتر پندار، گفتار، کردار",
  },
  {
    id: "evt-nowruz-open",
    editionId: "light-digest-nowruz",
    type: "opened",
    contact: "reader-1620",
    timeLabel: "۰۸:۵۱",
    detail: "باز شدن ایمیل در موبایل",
  },
  {
    id: "evt-mehregan-bounce",
    editionId: "light-digest-mehregan",
    type: "bounced",
    contact: "reader-0911",
    timeLabel: "۱۲:۰۴",
    detail: "Hard bounce؛ آدرس باید از لیست حذف شود",
  },
  {
    id: "evt-mehregan-delivered",
    editionId: "light-digest-mehregan",
    type: "delivered",
    contact: "reader-2208",
    timeLabel: "۱۲:۰۲",
    detail: "تحویل موفق به inbox",
  },
  {
    id: "evt-sadeh-unsub",
    editionId: "light-digest-sadeh",
    type: "unsubscribed",
    contact: "reader-0770",
    timeLabel: "۱۹:۴۸",
    detail: "لغو عضویت بعد از CTA رسانه‌ای",
  },
  {
    id: "evt-sadeh-sent",
    editionId: "light-digest-sadeh",
    type: "sent",
    contact: "segment-winter",
    timeLabel: "۱۹:۳۰",
    detail: "ارسال آزمایشی به segment زمستان",
  },
];

export const newsletterDeliveryHealthLabels: Record<NewsletterDeliveryHealth, string> = {
  healthy: "سالم",
  watch: "نیازمند پایش",
  at_risk: "پرریسک",
};

export const newsletterDeliveryEventLabels: Record<NewsletterDeliveryEventType, string> = {
  sent: "ارسال شد",
  delivered: "تحویل شد",
  opened: "باز شد",
  clicked: "کلیک شد",
  bounced: "Bounce",
  unsubscribed: "لغو عضویت",
};

export function getNewsletterDeliverySummary(reports: NewsletterDeliveryReport[] = newsletterDeliveryReports) {
  const sent = newsletterAnalytics.reduce((sum, item) => sum + item.sent, 0);
  const delivered = reports.reduce((sum, item) => sum + item.delivered, 0);
  const bounced = reports.reduce((sum, item) => sum + item.bounced, 0);
  const complaints = reports.reduce((sum, item) => sum + item.complaints, 0);
  const retries = reports.reduce((sum, item) => sum + item.retries, 0);

  return {
    sent,
    delivered,
    bounced,
    complaints,
    retries,
    deliveryRate: getRate(delivered, sent),
    bounceRate: getRate(bounced, sent),
    complaintRate: getRate(complaints, sent),
    atRisk: reports.filter((item) => item.health === "at_risk").length,
  };
}

export function getNewsletterDeliveryEditionTitle(editionId: string) {
  return newsletterEditions.find((edition) => edition.id === editionId)?.title ?? editionId;
}
