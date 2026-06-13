import { newsletterEditions, newsletterStatusLabels, type NewsletterEditionStatus } from "@/lib/newsletter-editions";
import { getBestSendTimeForEdition, getSendTimeScore, type NewsletterSendTimeSlot } from "@/lib/newsletter-send-times";

export type NewsletterScheduleStatus = "blocked" | "needs_review" | "scheduled" | "ready_to_send";

export type NewsletterScheduleItem = {
  editionId: string;
  title: string;
  editionStatus: NewsletterEditionStatus;
  scheduleStatus: NewsletterScheduleStatus;
  sendSlot?: NewsletterSendTimeSlot;
  score: number;
  owner: string;
  checklist: Array<{
    label: string;
    done: boolean;
  }>;
  note: string;
};

export const newsletterScheduleStatusLabels: Record<NewsletterScheduleStatus, string> = {
  blocked: "مسدود",
  needs_review: "نیازمند بازبینی",
  scheduled: "زمان‌بندی‌شده",
  ready_to_send: "آماده ارسال",
};

const scheduleMeta: Record<
  string,
  Pick<NewsletterScheduleItem, "scheduleStatus" | "owner" | "checklist" | "note">
> = {
  "light-digest-nowruz": {
    scheduleStatus: "ready_to_send",
    owner: "تیم محتوا و رشد",
    checklist: [
      { label: "قالب HTML تایید شده", done: true },
      { label: "A/B subject انتخاب شده", done: true },
      { label: "زمان ارسال تایید شده", done: true },
      { label: "لینک‌های CTA تست شده", done: true },
    ],
    note: "شماره نوروز آماده اتصال به provider ایمیل و ارسال کنترل‌شده است.",
  },
  "light-digest-mehregan": {
    scheduleStatus: "scheduled",
    owner: "تیم کمپین",
    checklist: [
      { label: "قالب HTML تایید شده", done: true },
      { label: "A/B subject انتخاب شده", done: false },
      { label: "زمان ارسال تایید شده", done: true },
      { label: "لینک‌های CTA تست شده", done: true },
    ],
    note: "قبل از ارسال نهایی، variant برنده کمپین مهرگان باید قطعی شود.",
  },
  "light-digest-sadeh": {
    scheduleStatus: "needs_review",
    owner: "تیم رسانه",
    checklist: [
      { label: "قالب HTML تایید شده", done: false },
      { label: "A/B subject انتخاب شده", done: false },
      { label: "زمان ارسال تایید شده", done: true },
      { label: "لینک‌های CTA تست شده", done: false },
    ],
    note: "شماره سده به تصویر نهایی، نسخه رسانه‌ای و تست CTA نیاز دارد.",
  },
};

export function getNewsletterScheduleItems(): NewsletterScheduleItem[] {
  return newsletterEditions.map((edition) => {
    const sendSlot = getBestSendTimeForEdition(edition.id);
    const meta = scheduleMeta[edition.id] ?? {
      scheduleStatus: edition.status === "ready" ? "ready_to_send" : "needs_review",
      owner: "تیم محتوا",
      checklist: [
        { label: "قالب HTML تایید شده", done: edition.status === "ready" },
        { label: "زمان ارسال تایید شده", done: Boolean(sendSlot) },
      ],
      note: `وضعیت فعلی شماره: ${newsletterStatusLabels[edition.status]}`,
    };

    return {
      editionId: edition.id,
      title: edition.title,
      editionStatus: edition.status,
      sendSlot,
      score: sendSlot ? getSendTimeScore(sendSlot) : 0,
      ...meta,
    };
  });
}

export function getNewsletterScheduleSummary(items: NewsletterScheduleItem[] = getNewsletterScheduleItems()) {
  return {
    total: items.length,
    readyToSend: items.filter((item) => item.scheduleStatus === "ready_to_send").length,
    scheduled: items.filter((item) => item.scheduleStatus === "scheduled").length,
    needsReview: items.filter((item) => item.scheduleStatus === "needs_review").length,
    blocked: items.filter((item) => item.scheduleStatus === "blocked").length,
    completionRate: Math.round(
      (items.reduce((sum, item) => {
        const done = item.checklist.filter((check) => check.done).length;
        return sum + done / item.checklist.length;
      }, 0) /
        Math.max(items.length, 1)) *
        100
    ),
  };
}
