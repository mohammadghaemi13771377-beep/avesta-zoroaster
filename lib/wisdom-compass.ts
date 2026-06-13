import { getDailyAvesta } from "@/lib/daily-avesta";
import { buildDailyStreakSnapshot } from "@/lib/daily-streak";
import { getQuestSummary, learningQuests } from "@/lib/learning-quests";
import { getWisdomGuideRecommendation, type WisdomGuideIntent } from "@/lib/wisdom-guide";

export type WisdomCompassInput = {
  bookmarks?: number;
  notes?: number;
  completedVerses?: number;
  completedQuestIds?: string[];
  completedReflectionDates?: string[];
  savedSearches?: number;
};

export type CompassSignal = {
  id: string;
  label: string;
  value: string;
  weight: number;
  state: "strong" | "growing" | "empty";
};

export type CompassRecommendation = {
  priority: number;
  title: string;
  reason: string;
  href: string;
  cta: string;
  intent: WisdomGuideIntent;
};

export type WisdomCompassSnapshot = {
  score: number;
  mode: "activation" | "retention" | "deepening" | "mastery";
  headline: string;
  signals: CompassSignal[];
  recommendations: CompassRecommendation[];
  dailyQuote: string;
  engineNote: string;
};

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getMode(score: number): WisdomCompassSnapshot["mode"] {
  if (score >= 82) return "mastery";
  if (score >= 58) return "deepening";
  if (score >= 30) return "retention";
  return "activation";
}

function getHeadline(mode: WisdomCompassSnapshot["mode"]) {
  const labels: Record<WisdomCompassSnapshot["mode"], string> = {
    activation: "امروز بهترین کار، شروع آرام و روشن است.",
    retention: "مسیر فعال شده؛ حالا استمرار را نگه دار.",
    deepening: "زمان تعمیق مطالعه و اتصال مفاهیم رسیده است.",
    mastery: "تو وارد مسیر راهنمایی و مطالعه عمیق شده‌ای.",
  };

  return labels[mode];
}

function signalState(weight: number): CompassSignal["state"] {
  if (weight >= 70) return "strong";
  if (weight > 0) return "growing";
  return "empty";
}

export function buildWisdomCompassSnapshot(input: WisdomCompassInput = {}): WisdomCompassSnapshot {
  const questSummary = getQuestSummary(input.completedQuestIds ?? [], learningQuests);
  const streak = buildDailyStreakSnapshot({
    completedDates: input.completedReflectionDates,
    completedQuestIds: input.completedQuestIds,
  });
  const daily = getDailyAvesta();
  const readingWeight = clampScore((input.completedVerses ?? 0) * 18 + (input.bookmarks ?? 0) * 10);
  const reflectionWeight = clampScore(streak.currentStreak * 18 + (input.notes ?? 0) * 9);
  const questWeight = clampScore(questSummary.progress);
  const researchWeight = clampScore((input.savedSearches ?? 0) * 22 + (input.notes ?? 0) * 5);
  const score = clampScore(readingWeight * 0.28 + reflectionWeight * 0.28 + questWeight * 0.26 + researchWeight * 0.18);
  const mode = getMode(score);

  return {
    score,
    mode,
    headline: getHeadline(mode),
    dailyQuote: daily.quote,
    signals: [
      {
        id: "reading",
        label: "مطالعه",
        value: `${input.completedVerses ?? 0} بند / ${input.bookmarks ?? 0} ذخیره`,
        weight: readingWeight,
        state: signalState(readingWeight),
      },
      {
        id: "reflection",
        label: "تأمل",
        value: `${streak.currentStreak} روز استمرار / ${input.notes ?? 0} یادداشت`,
        weight: reflectionWeight,
        state: signalState(reflectionWeight),
      },
      {
        id: "quest",
        label: "مأموریت",
        value: `${questSummary.completed}/${questSummary.total} مأموریت`,
        weight: questWeight,
        state: signalState(questWeight),
      },
      {
        id: "research",
        label: "پژوهش",
        value: `${input.savedSearches ?? 0} جستجو / ${input.notes ?? 0} یادداشت`,
        weight: researchWeight,
        state: signalState(researchWeight),
      },
    ],
    recommendations: buildCompassRecommendations(mode, questSummary.nextQuest.href, daily.href),
    engineNote:
      "این نسخه rule-based است و از حافظه محلی، مأموریت‌ها، استمرار و اوستای امروز استفاده می‌کند؛ در production به event stream، Meilisearch و RAG وصل می‌شود.",
  };
}

function buildCompassRecommendations(
  mode: WisdomCompassSnapshot["mode"],
  nextQuestHref: string,
  dailyHref: string
): CompassRecommendation[] {
  const byMode: Record<WisdomCompassSnapshot["mode"], CompassRecommendation[]> = {
    activation: [
      {
        priority: 1,
        title: "یک بند کوتاه بخوان",
        reason: "برای شروع مسیر، کمترین اصطکاک را از اوستای امروز بگیر.",
        href: dailyHref,
        cta: "خواندن امروز",
        intent: "study",
      },
      {
        priority: 2,
        title: "دفتر روزانه را کامل کن",
        reason: "اولین ثبت روزانه، زنجیره روشنایی را فعال می‌کند.",
        href: "/reflection",
        cta: "ثبت پندار",
        intent: "calm",
      },
    ],
    retention: [
      {
        priority: 1,
        title: "استمرار امروز را حفظ کن",
        reason: "وقتی کاربر چند سیگنال دارد، بهترین حرکت حفظ ریتم روزانه است.",
        href: "/streak",
        cta: "دیدن زنجیره",
        intent: "calm",
      },
      {
        priority: 2,
        title: "مأموریت بعدی را تمام کن",
        reason: "XP و نشان‌ها باعث برگشت کاربر به جهان سایت می‌شوند.",
        href: nextQuestHref,
        cta: "شروع مأموریت",
        intent: "courage",
      },
    ],
    deepening: [
      {
        priority: 1,
        title: "یک مفهوم را عمیق‌تر دنبال کن",
        reason: "کاربر آماده پیوند میان واژه‌نامه، مقاله و بندهای اوستا است.",
        href: "/concept-map",
        cta: "کاوش مفاهیم",
        intent: "truth",
      },
      {
        priority: 2,
        title: "راهنمای خرد را شخصی کن",
        reason: "حال‌وهوای امروز می‌تواند مسیر مطالعه را دقیق‌تر کند.",
        href: "/wisdom-guide",
        cta: "انتخاب مسیر",
        intent: "clarity",
      },
    ],
    mastery: [
      {
        priority: 1,
        title: "یک کارت طلایی بساز",
        reason: "کاربر عمیق می‌تواند پیام را به رسانه قابل اشتراک تبدیل کند.",
        href: "/share-studio",
        cta: "ساخت کارت",
        intent: "courage",
      },
      {
        priority: 2,
        title: "مسیر پژوهشی بساز",
        reason: "سطح پیشرفته باید به منابع، citation و مطالعه بلندمدت هدایت شود.",
        href: "/trust-center",
        cta: "مرکز اعتماد",
        intent: "truth",
      },
    ],
  };

  return byMode[mode].map((recommendation) => ({
    ...recommendation,
    reason: `${recommendation.reason} ${getWisdomGuideRecommendation(recommendation.intent).ethicalMessage}`,
  }));
}

export function getWisdomCompassStats() {
  const snapshot = buildWisdomCompassSnapshot({
    completedQuestIds: ["first-light"],
    completedReflectionDates: [new Date().toISOString().slice(0, 10)],
    bookmarks: 1,
    notes: 1,
    completedVerses: 1,
    savedSearches: 1,
  });

  return [
    { label: "امتیاز نمونه", value: `${snapshot.score}%` },
    { label: "سیگنال رفتاری", value: String(snapshot.signals.length) },
    { label: "پیشنهاد زنده", value: String(snapshot.recommendations.length) },
  ];
}
