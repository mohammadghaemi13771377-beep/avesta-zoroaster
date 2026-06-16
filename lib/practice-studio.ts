import { getDailyReflectionSeed } from "@/lib/daily-reflection";
import { learningQuests } from "@/lib/learning-quests";
import { getMonotheismPaths } from "@/lib/monotheism-paths";

export type PracticePillar = "thought" | "word" | "deed";

export type PracticeDay = {
  id: string;
  day: string;
  title: string;
  pillar: PracticePillar;
  pathTitle: string;
  focus: string;
  prompt: string;
  action: string;
  href: string;
  xp: number;
};

export const practicePillarLabels: Record<PracticePillar, string> = {
  thought: "پندار نیک",
  word: "گفتار نیک",
  deed: "کردار نیک",
};

export function getPracticeStudioPlan(): PracticeDay[] {
  const reflection = getDailyReflectionSeed();
  const paths = getMonotheismPaths();
  const questById = Object.fromEntries(learningQuests.map((quest) => [quest.id, quest]));

  return [
    {
      id: "day-1-ahura-mazda",
      day: "روز ۱",
      title: "نیت روشن",
      pillar: "thought",
      pathTitle: paths[0]?.title ?? "مسیر اهورامزدا",
      focus: "خرد و روشنایی",
      prompt: reflection.prompts.find((prompt) => prompt.pillar === "thought")?.question ?? "امروز نیت روشن تو چیست؟",
      action: "یک تصمیم کوچک را با معیار روشنایی و خرد بسنج.",
      href: "/monotheism/paths",
      xp: 80,
    },
    {
      id: "day-2-asha",
      day: "روز ۲",
      title: "گفتار راست",
      pillar: "word",
      pathTitle: paths[1]?.title ?? "مسیر اشا",
      focus: "راستی و هماهنگی",
      prompt: "کدام گفتار امروز می‌تواند راست‌تر، آرام‌تر یا مهربان‌تر شود؟",
      action: "قبل از یک گفت‌وگوی مهم، جمله‌ات را کوتاه و شفاف بنویس.",
      href: "/dictionary/asha",
      xp: 90,
    },
    {
      id: "day-3-free-will",
      day: "روز ۳",
      title: "مکث پیش از انتخاب",
      pillar: "thought",
      pathTitle: paths[2]?.title ?? "مسیر اختیار انسان",
      focus: "اختیار و مسئولیت",
      prompt: "کدام انتخاب امروز نیاز به مکث و اندیشه نیک دارد؟",
      action: "سه نفس مکث کن، بعد پاسخ یا تصمیم را انتخاب کن.",
      href: "/reflection",
      xp: 95,
    },
    {
      id: "day-4-good-deed",
      day: "روز ۴",
      title: "کردار کوچک",
      pillar: "deed",
      pathTitle: paths[3]?.title ?? "مسیر سه‌گانه نیک",
      focus: "کردار نیک",
      prompt: "یک عمل کوچک که روشنایی را بیشتر می‌کند چیست؟",
      action: "یک کمک، نظم، بخشش یا کار ناتمام را امروز انجام بده.",
      href: "/quests",
      xp: 110,
    },
    {
      id: "day-5-study",
      day: "روز ۵",
      title: "خواندن آهسته",
      pillar: "thought",
      pathTitle: "گات‌ها و مطالعه",
      focus: "مطالعه با حضور",
      prompt: "از بند امروز چه جمله‌ای می‌تواند در ذهن تو بماند؟",
      action: "یک بند کوتاه بخوان و فقط یک جمله طلایی انتخاب کن.",
      href: "/reading-room",
      xp: 120,
    },
    {
      id: "day-6-share",
      day: "روز ۶",
      title: "انتشار نور",
      pillar: "word",
      pathTitle: "کارت طلایی",
      focus: "گفتار الهام‌بخش",
      prompt: "کدام جمله می‌تواند برای دیگری روشن‌کننده باشد؟",
      action: "یک کارت نقل‌قول بساز یا یک پیام نیک برای کسی بفرست.",
      href: "/share-studio",
      xp: 100,
    },
    {
      id: "day-7-streak",
      day: "روز ۷",
      title: "بستن حلقه روشنایی",
      pillar: "deed",
      pathTitle: questById["seven-day-path"]?.title ?? "سفر هفت‌روزه",
      focus: "استمرار",
      prompt: "این هفته کدام تمرین واقعاً روی رفتار تو اثر گذاشت؟",
      action: "دفتر هفته را مرور کن و یک تمرین را برای هفته بعد نگه دار.",
      href: "/streak",
      xp: 150,
    },
  ];
}

export function getPracticeStudioSummary(completedIds: string[] = [], plan: PracticeDay[] = getPracticeStudioPlan()) {
  const completed = plan.filter((day) => completedIds.includes(day.id));
  const totalXp = plan.reduce((sum, day) => sum + day.xp, 0);
  const earnedXp = completed.reduce((sum, day) => sum + day.xp, 0);

  return {
    days: plan.length,
    completed: completed.length,
    progress: Math.round((completed.length / plan.length) * 100),
    earnedXp,
    totalXp,
    nextDay: plan.find((day) => !completedIds.includes(day.id)) ?? plan[0],
    dominantPillar: getDominantPillar(completed),
  };
}

function getDominantPillar(completed: PracticeDay[]) {
  if (!completed.length) {
    return "در انتظار شروع";
  }

  const counts = completed.reduce<Record<PracticePillar, number>>(
    (acc, day) => ({ ...acc, [day.pillar]: acc[day.pillar] + 1 }),
    { thought: 0, word: 0, deed: 0 },
  );
  const pillar = (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "thought") as PracticePillar;

  return practicePillarLabels[pillar];
}
