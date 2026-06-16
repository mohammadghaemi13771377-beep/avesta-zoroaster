import { getDailyAvesta } from "@/lib/daily-avesta";
import { getQuestSummary, learningQuests } from "@/lib/learning-quests";
import { getPracticeStudioPlan, practicePillarLabels, type PracticePillar } from "@/lib/practice-studio";

export type AshaBalanceInput = {
  completedPracticeIds?: string[];
  completedQuestIds?: string[];
  completedReflectionDates?: string[];
};

export type AshaPillarScore = {
  pillar: PracticePillar;
  label: string;
  score: number;
  completed: number;
  total: number;
  guidance: string;
  href: string;
};

export type AshaBalanceSnapshot = {
  score: number;
  mode: "start" | "warming" | "balanced" | "radiant";
  headline: string;
  pillars: AshaPillarScore[];
  streakDays: number;
  questProgress: number;
  nextPractice: {
    title: string;
    href: string;
    prompt: string;
  };
  quote: string;
  ethicalMessage: string;
};

const pillarGuidance: Record<PracticePillar, { low: string; high: string; href: string }> = {
  thought: {
    low: "امروز با یک نیت روشن شروع کن؛ پندار، ریشه دو ستون دیگر است.",
    high: "پندار روشن فعال است؛ حالا آن را به گفتار و کردار منتقل کن.",
    href: "/practice",
  },
  word: {
    low: "یک گفت‌وگوی امروز را راست‌تر، کوتاه‌تر و مهربان‌تر کن.",
    high: "گفتار نیک در حال رشد است؛ یک جمله الهام‌بخش را ثبت یا share کن.",
    href: "/share-studio",
  },
  deed: {
    low: "یک کردار کوچک اما واقعی انتخاب کن؛ روشنایی باید از صفحه بیرون برود.",
    high: "کردار نیک فعال است؛ زنجیره روشنایی را نگه دار.",
    href: "/streak",
  },
};

export function buildAshaBalanceSnapshot(input: AshaBalanceInput = {}): AshaBalanceSnapshot {
  const plan = getPracticeStudioPlan();
  const completedPracticeIds = input.completedPracticeIds ?? [];
  const questSummary = getQuestSummary(input.completedQuestIds ?? [], learningQuests);
  const daily = getDailyAvesta();
  const pillars = (["thought", "word", "deed"] as PracticePillar[]).map((pillar) => {
    const pillarDays = plan.filter((day) => day.pillar === pillar);
    const completed = pillarDays.filter((day) => completedPracticeIds.includes(day.id)).length;
    const reflectionBoost = pillar === "deed" ? Math.min(input.completedReflectionDates?.length ?? 0, 3) : 0;
    const score = Math.min(100, Math.round(((completed + reflectionBoost * 0.35) / pillarDays.length) * 100));

    return {
      pillar,
      label: practicePillarLabels[pillar],
      score,
      completed,
      total: pillarDays.length,
      guidance: score >= 70 ? pillarGuidance[pillar].high : pillarGuidance[pillar].low,
      href: pillarGuidance[pillar].href,
    };
  });
  const score = Math.round(
    pillars.reduce((sum, pillar) => sum + pillar.score, 0) / pillars.length * 0.72 + questSummary.progress * 0.28,
  );
  const nextPractice = plan.find((day) => !completedPracticeIds.includes(day.id)) ?? plan[0];

  return {
    score,
    mode: getAshaMode(score),
    headline: getAshaHeadline(score),
    pillars,
    streakDays: input.completedReflectionDates?.length ?? 0,
    questProgress: questSummary.progress,
    nextPractice: {
      title: nextPractice.title,
      href: nextPractice.href,
      prompt: nextPractice.prompt,
    },
    quote: daily.quote,
    ethicalMessage: daily.ethicalMessage,
  };
}

function getAshaMode(score: number): AshaBalanceSnapshot["mode"] {
  if (score >= 85) return "radiant";
  if (score >= 62) return "balanced";
  if (score >= 32) return "warming";
  return "start";
}

function getAshaHeadline(score: number) {
  if (score >= 85) return "تعادل اشا روشن و پایدار است.";
  if (score >= 62) return "سه ستون نیک در حال هماهنگی‌اند.";
  if (score >= 32) return "روشنایی شروع شده؛ یک ستون نیاز به توجه دارد.";
  return "امروز با یک تمرین کوچک، شعله را روشن کن.";
}

export function getAshaBalanceStats() {
  const snapshot = buildAshaBalanceSnapshot({
    completedPracticeIds: ["day-1-ahura-mazda", "day-2-asha"],
    completedQuestIds: ["first-light"],
    completedReflectionDates: [new Date().toISOString().slice(0, 10)],
  });

  return [
    { value: `${snapshot.score}%`, label: "امتیاز نمونه اشا" },
    { value: "۳", label: "پندار، گفتار، کردار" },
    { value: String(snapshot.pillars.length), label: "ستون سنجش" },
  ];
}
