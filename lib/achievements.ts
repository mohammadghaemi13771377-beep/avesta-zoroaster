export type AchievementInput = {
  bookmarks: number;
  notes: number;
  completedVerses: number;
  savedDaily: number;
  studyPlanSteps: number;
  collections: number;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  requirement: string;
  unlocked: boolean;
  progress: number;
  accent: string;
};

export function buildAchievements(input: AchievementInput): Achievement[] {
  return [
    {
      id: "first-light",
      title: "نخستین روشنایی",
      description: "اولین بند یا صفحه را در مسیر مطالعه ثبت کردی.",
      requirement: "۱ مطالعه کامل",
      unlocked: input.completedVerses >= 1,
      progress: ratio(input.completedVerses, 1),
      accent: "#F2D58A"
    },
    {
      id: "keeper-of-notes",
      title: "نگهبان یادداشت‌ها",
      description: "برداشت شخصی خودت را کنار متن نگه داشتی.",
      requirement: "۳ یادداشت",
      unlocked: input.notes >= 3,
      progress: ratio(input.notes, 3),
      accent: "#D6A84F"
    },
    {
      id: "daily-flame",
      title: "آتش روزانه",
      description: "پیام‌های روزانه اوستا را ذخیره کردی.",
      requirement: "۳ اوستای امروز",
      unlocked: input.savedDaily >= 3,
      progress: ratio(input.savedDaily, 3),
      accent: "#FFB45C"
    },
    {
      id: "journey-starter",
      title: "آغازگر سفر",
      description: "چند قدم از برنامه مطالعه ۷ روزه را کامل کردی.",
      requirement: "۳ قدم برنامه مطالعه",
      unlocked: input.studyPlanSteps >= 3,
      progress: ratio(input.studyPlanSteps, 3),
      accent: "#FFF8EA"
    },
    {
      id: "curator",
      title: "کیوریتور خرد",
      description: "کلکسیون‌های مطالعاتی را برای مسیر شخصی‌ات ذخیره کردی.",
      requirement: "۲ کلکسیون",
      unlocked: input.collections >= 2,
      progress: ratio(input.collections, 2),
      accent: "#B9B9B9"
    },
    {
      id: "library-mark",
      title: "نشان کتابخانه",
      description: "منابع مهم را برای بازگشت بعدی نشانه‌گذاری کردی.",
      requirement: "۵ بوکمارک",
      unlocked: input.bookmarks >= 5,
      progress: ratio(input.bookmarks, 5),
      accent: "#7EA4C8"
    }
  ];
}

function ratio(value: number, target: number) {
  return Math.min(100, Math.round((value / target) * 100));
}
