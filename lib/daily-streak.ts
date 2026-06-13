import { getDailyAvesta } from "@/lib/daily-avesta";
import { getQuestSummary, learningQuests } from "@/lib/learning-quests";

export type StreakDay = {
  date: string;
  label: string;
  completed: boolean;
  source: "reflection" | "quest" | "empty";
};

export type DailyStreakInput = {
  completedDates?: string[];
  completedQuestIds?: string[];
};

export type DailyStreakSnapshot = {
  today: string;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  weeklyCompleted: number;
  totalDays: number;
  lightLevel: string;
  todayQuote: string;
  ethicalMessage: string;
  days: StreakDay[];
  questSummary: ReturnType<typeof getQuestSummary>;
  nextActions: Array<{
    title: string;
    description: string;
    href: string;
  }>;
};

const dayFormatter = new Intl.DateTimeFormat("fa-IR", {
  weekday: "short",
  day: "numeric",
});

export function getDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function shiftDate(date: Date, offset: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + offset);
  return next;
}

function buildRecentDays(completedDates: Set<string>, today = new Date()): StreakDay[] {
  return Array.from({ length: 14 }, (_, index) => {
    const date = shiftDate(today, index - 13);
    const key = getDateKey(date);
    const completed = completedDates.has(key);

    return {
      date: key,
      label: dayFormatter.format(date),
      completed,
      source: completed ? "reflection" : "empty",
    };
  });
}

function countCurrentStreak(days: StreakDay[]) {
  let streak = 0;

  for (let index = days.length - 1; index >= 0; index -= 1) {
    if (!days[index].completed) {
      break;
    }

    streak += 1;
  }

  return streak;
}

function countLongestStreak(days: StreakDay[]) {
  return days.reduce(
    (state, day) => {
      const current = day.completed ? state.current + 1 : 0;
      return {
        current,
        longest: Math.max(state.longest, current),
      };
    },
    { current: 0, longest: 0 }
  ).longest;
}

function getLightLevel(currentStreak: number, completionRate: number) {
  if (currentStreak >= 10) return "نگهبان روشنایی";
  if (currentStreak >= 5) return "همراه آتش روزانه";
  if (completionRate >= 50) return "رهرو پندار نیک";
  return "آغازگر مسیر نور";
}

export function buildDailyStreakSnapshot(input: DailyStreakInput = {}, today = new Date()): DailyStreakSnapshot {
  const completedDates = new Set(input.completedDates ?? [getDateKey(today)]);
  const days = buildRecentDays(completedDates, today);
  const currentStreak = countCurrentStreak(days);
  const longestStreak = countLongestStreak(days);
  const weeklyCompleted = days.slice(-7).filter((day) => day.completed).length;
  const completionRate = Math.round((days.filter((day) => day.completed).length / days.length) * 100);
  const daily = getDailyAvesta(today);
  const questSummary = getQuestSummary(input.completedQuestIds ?? [], learningQuests);

  return {
    today: getDateKey(today),
    currentStreak,
    longestStreak,
    completionRate,
    weeklyCompleted,
    totalDays: days.length,
    lightLevel: getLightLevel(currentStreak, completionRate),
    todayQuote: daily.quote,
    ethicalMessage: daily.ethicalMessage,
    days,
    questSummary,
    nextActions: [
      {
        title: "ثبت دفتر امروز",
        description: "سه جمله کوتاه برای پندار، گفتار و کردار امروز بنویس.",
        href: "/reflection",
      },
      {
        title: "تکمیل یک مأموریت خرد",
        description: "یک کار کوچک انتخاب کن تا XP و نشان‌های مسیر فعال‌تر شوند.",
        href: "/quests",
      },
      {
        title: "مکث در تالار آیینی",
        description: "یک جلسه کوتاه نور، نیت و سکوت برای حفظ ریتم روزانه بساز.",
        href: "/ritual-room",
      },
    ],
  };
}

export function getDailyStreakStats() {
  const snapshot = buildDailyStreakSnapshot();

  return [
    { label: "استمرار نمونه", value: `${snapshot.currentStreak} روز` },
    { label: "پنجره پیگیری", value: `${snapshot.totalDays} روز` },
    { label: "اتصال محصولی", value: "Profile" },
  ];
}
