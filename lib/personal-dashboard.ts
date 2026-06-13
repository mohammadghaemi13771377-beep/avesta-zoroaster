import { buildAchievements, type Achievement } from "@/lib/achievements";
import { getDailyAvesta } from "@/lib/daily-avesta";
import { buildDailyStreakSnapshot, type DailyStreakSnapshot } from "@/lib/daily-streak";
import { getQuestSummary, learningQuests } from "@/lib/learning-quests";

export type PersonalDashboardCounts = {
  bookmarks: number;
  notes: number;
  completedVerses: number;
  savedDaily: number;
  studyPlanSteps: number;
  collections: number;
  savedSearches: number;
  reflectionDays: number;
};

export type PersonalDashboardInput = Partial<PersonalDashboardCounts> & {
  completedQuestIds?: string[];
  completedReflectionDates?: string[];
  lastRead?: {
    title: string;
    href: string;
    progress: number;
  } | null;
};

export type DashboardRecommendation = {
  title: string;
  description: string;
  href: string;
  intent: "read" | "reflect" | "quest" | "save";
};

export type PersonalDashboardSnapshot = {
  counts: PersonalDashboardCounts;
  daily: ReturnType<typeof getDailyAvesta>;
  streak: DailyStreakSnapshot;
  questSummary: ReturnType<typeof getQuestSummary>;
  achievements: Achievement[];
  nextAchievement: Achievement;
  lastRead: PersonalDashboardInput["lastRead"];
  readinessScore: number;
  recommendations: DashboardRecommendation[];
  stats: Array<{ label: string; value: string }>;
};

const emptyCounts: PersonalDashboardCounts = {
  bookmarks: 0,
  notes: 0,
  completedVerses: 0,
  savedDaily: 0,
  studyPlanSteps: 0,
  collections: 0,
  savedSearches: 0,
  reflectionDays: 0,
};

export function buildPersonalDashboardSnapshot(input: PersonalDashboardInput = {}): PersonalDashboardSnapshot {
  const counts: PersonalDashboardCounts = {
    ...emptyCounts,
    bookmarks: input.bookmarks ?? 0,
    notes: input.notes ?? 0,
    completedVerses: input.completedVerses ?? 0,
    savedDaily: input.savedDaily ?? 0,
    studyPlanSteps: input.studyPlanSteps ?? 0,
    collections: input.collections ?? 0,
    savedSearches: input.savedSearches ?? 0,
    reflectionDays: input.reflectionDays ?? 0,
  };
  const daily = getDailyAvesta();
  const questSummary = getQuestSummary(input.completedQuestIds ?? [], learningQuests);
  const streak = buildDailyStreakSnapshot({
    completedDates: input.completedReflectionDates,
    completedQuestIds: input.completedQuestIds,
  });
  const achievements = buildAchievements({
    bookmarks: counts.bookmarks,
    notes: counts.notes,
    completedVerses: counts.completedVerses,
    savedDaily: counts.savedDaily,
    studyPlanSteps: counts.studyPlanSteps,
    collections: counts.collections,
  });
  const nextAchievement = achievements.find((achievement) => !achievement.unlocked) ?? achievements[0];
  const unlocked = achievements.filter((achievement) => achievement.unlocked).length;
  const readinessScore = Math.min(
    100,
    Math.round(
      counts.completedVerses * 6 +
        counts.bookmarks * 5 +
        counts.notes * 4 +
        counts.studyPlanSteps * 8 +
        questSummary.completed * 7 +
        streak.currentStreak * 5 +
        unlocked * 6
    )
  );

  return {
    counts,
    daily,
    streak,
    questSummary,
    achievements,
    nextAchievement,
    lastRead: input.lastRead ?? null,
    readinessScore,
    recommendations: buildDashboardRecommendations(input.lastRead ?? null, questSummary.nextQuest.href, daily.href),
    stats: [
      { label: "آمادگی مسیر", value: `${readinessScore}%` },
      { label: "استمرار", value: `${streak.currentStreak} روز` },
      { label: "XP", value: String(questSummary.earnedXp) },
    ],
  };
}

function buildDashboardRecommendations(
  lastRead: PersonalDashboardInput["lastRead"],
  nextQuestHref: string,
  dailyHref: string
): DashboardRecommendation[] {
  return [
    {
      title: lastRead ? "ادامه مطالعه قبلی" : "شروع مطالعه امروز",
      description: lastRead
        ? `${lastRead.title} را از همان جایی که رها شده ادامه بده.`
        : "یک بند کوتاه از اوستای امروز بخوان و مسیرت را شروع کن.",
      href: lastRead?.href ?? dailyHref,
      intent: "read",
    },
    {
      title: "ثبت پندار، گفتار، کردار",
      description: "سه جمله کوتاه برای تبدیل خواندن به عمل اخلاقی بنویس.",
      href: "/reflection",
      intent: "reflect",
    },
    {
      title: "تکمیل مأموریت بعدی",
      description: "یک مأموریت خرد انجام بده تا XP و نشان‌ها فعال‌تر شوند.",
      href: nextQuestHref,
      intent: "quest",
    },
    {
      title: "ساخت کارت طلایی",
      description: "یک جمله الهام‌بخش را به کارت تصویری قابل اشتراک تبدیل کن.",
      href: "/share-studio",
      intent: "save",
    },
  ];
}

export function getPersonalDashboardStats() {
  return buildPersonalDashboardSnapshot({
    completedQuestIds: ["first-light"],
    completedReflectionDates: [new Date().toISOString().slice(0, 10)],
  }).stats;
}
