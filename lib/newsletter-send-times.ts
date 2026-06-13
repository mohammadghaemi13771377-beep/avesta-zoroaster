import { newsletterEditions } from "@/lib/newsletter-editions";

export type SendTimeRisk = "low" | "medium" | "high";

export type NewsletterSendTimeSlot = {
  id: string;
  editionId: string;
  dayLabel: string;
  timeLabel: string;
  timezone: string;
  predictedOpenRate: number;
  predictedClickRate: number;
  risk: SendTimeRisk;
  reason: string;
};

export const sendTimeRiskLabels: Record<SendTimeRisk, string> = {
  low: "ریسک پایین",
  medium: "ریسک متوسط",
  high: "ریسک بالا",
};

export const newsletterSendTimeSlots: NewsletterSendTimeSlot[] = [
  {
    id: "nowruz-morning",
    editionId: "light-digest-nowruz",
    dayLabel: "سه‌شنبه پیش از نوروز",
    timeLabel: "۰۸:۳۰",
    timezone: "Asia/Tehran",
    predictedOpenRate: 64.5,
    predictedClickRate: 24.8,
    risk: "low",
    reason: "مخاطب در شروع روز آمادگی بیشتری برای نیت سال و دفتر روزانه دارد.",
  },
  {
    id: "nowruz-evening",
    editionId: "light-digest-nowruz",
    dayLabel: "شب پیش از نوروز",
    timeLabel: "۲۰:۱۵",
    timezone: "Asia/Tehran",
    predictedOpenRate: 58.2,
    predictedClickRate: 21.1,
    risk: "medium",
    reason: "برای پیام‌های آیینی خوب است اما احتمال شلوغی پیام‌های مناسبتی بالاتر است.",
  },
  {
    id: "mehregan-noon",
    editionId: "light-digest-mehregan",
    dayLabel: "روز مهرگان",
    timeLabel: "۱۲:۰۰",
    timezone: "Asia/Tehran",
    predictedOpenRate: 54.8,
    predictedClickRate: 19.7,
    risk: "medium",
    reason: "CTA کمپین در میانه روز دیده می‌شود و برای مرور کوتاه مناسب است.",
  },
  {
    id: "mehregan-morning",
    editionId: "light-digest-mehregan",
    dayLabel: "صبح روز مهرگان",
    timeLabel: "۰۹:۰۰",
    timezone: "Asia/Tehran",
    predictedOpenRate: 57.4,
    predictedClickRate: 20.9,
    risk: "low",
    reason: "پیام مهر و پیمان در شروع روز شانس توجه بیشتری دارد.",
  },
  {
    id: "sadeh-evening",
    editionId: "light-digest-sadeh",
    dayLabel: "شب سده",
    timeLabel: "۱۹:۳۰",
    timezone: "Asia/Tehran",
    predictedOpenRate: 49.6,
    predictedClickRate: 15.8,
    risk: "low",
    reason: "تم آتش و زمستان با زمان شب هماهنگ است و برای رسانه و تصویرسازی مناسب‌تر دیده می‌شود.",
  },
  {
    id: "sadeh-afternoon",
    editionId: "light-digest-sadeh",
    dayLabel: "بعدازظهر پیش از سده",
    timeLabel: "۱۶:۰۰",
    timezone: "Asia/Tehran",
    predictedOpenRate: 42.3,
    predictedClickRate: 12.4,
    risk: "high",
    reason: "برای شماره رسانه‌ای قابل استفاده است اما احتمال فراموش شدن CTA شبانه بیشتر است.",
  },
];

export function getBestSendTimeForEdition(editionId: string, slots: NewsletterSendTimeSlot[] = newsletterSendTimeSlots) {
  return [...slots]
    .filter((slot) => slot.editionId === editionId)
    .sort((a, b) => getSendTimeScore(b) - getSendTimeScore(a))[0];
}

export function getSendTimeScore(slot: NewsletterSendTimeSlot) {
  const riskPenalty = slot.risk === "high" ? 10 : slot.risk === "medium" ? 4 : 0;
  return Math.round((slot.predictedOpenRate * 0.58 + slot.predictedClickRate * 0.42 - riskPenalty) * 10) / 10;
}

export function getSendTimeSummary(slots: NewsletterSendTimeSlot[] = newsletterSendTimeSlots) {
  const bestSlots = newsletterEditions
    .map((edition) => getBestSendTimeForEdition(edition.id, slots))
    .filter(Boolean) as NewsletterSendTimeSlot[];
  if (bestSlots.length === 0) {
    return {
      totalSlots: slots.length,
      bestSlots: 0,
      averageOpen: 0,
      averageClick: 0,
      lowestRisk: 0,
      nextSlot: undefined,
    };
  }

  const averageOpen = Math.round((bestSlots.reduce((sum, slot) => sum + slot.predictedOpenRate, 0) / bestSlots.length) * 10) / 10;
  const averageClick = Math.round((bestSlots.reduce((sum, slot) => sum + slot.predictedClickRate, 0) / bestSlots.length) * 10) / 10;

  return {
    totalSlots: slots.length,
    bestSlots: bestSlots.length,
    averageOpen,
    averageClick,
    lowestRisk: bestSlots.filter((slot) => slot.risk === "low").length,
    nextSlot: bestSlots[0],
  };
}

export function getSendTimeEditionTitle(editionId: string) {
  return newsletterEditions.find((edition) => edition.id === editionId)?.title ?? editionId;
}
