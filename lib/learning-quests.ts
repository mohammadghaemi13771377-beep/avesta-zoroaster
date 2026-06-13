import { studyPlanSteps } from "@/lib/study-plan";

export type QuestTrack = "gateway" | "wisdom" | "ritual" | "research" | "media";
export type QuestDifficulty = "easy" | "medium" | "deep";

export type LearningQuest = {
  id: string;
  title: string;
  description: string;
  track: QuestTrack;
  difficulty: QuestDifficulty;
  href: string;
  xp: number;
  duration: string;
  badge: string;
  tasks: string[];
};

export const questTrackLabels: Record<QuestTrack, string> = {
  gateway: "دروازه ورود",
  wisdom: "خرد و واژه‌ها",
  ritual: "نیایش و متن",
  research: "پژوهش و منابع",
  media: "رسانه و تجربه",
};

export const questDifficultyLabels: Record<QuestDifficulty, string> = {
  easy: "آسان",
  medium: "متوسط",
  deep: "عمیق",
};

export const learningQuests: LearningQuest[] = [
  {
    id: "first-light",
    title: "اولین روشنایی",
    description: "ورود به پورتال اوستا و شناخت معماری اصلی جهان دیجیتال سایت.",
    track: "gateway",
    difficulty: "easy",
    href: "/avesta",
    xp: 120,
    duration: "۱۰ دقیقه",
    badge: "جوینده روشنایی",
    tasks: ["دیدن پورتال اوستا", "انتخاب یک بخش", "ذخیره مسیر مطالعه"],
  },
  {
    id: "asha-wisdom",
    title: "رمز اشا",
    description: "شناخت اشا، پیوند آن با راستی و دیدن جایگاهش در مقاله و واژه‌نامه.",
    track: "wisdom",
    difficulty: "medium",
    href: "/dictionary/asha",
    xp: 180,
    duration: "۱۸ دقیقه",
    badge: "نگهبان راستی",
    tasks: ["خواندن واژه اشا", "دیدن مقاله مرتبط", "باز کردن نقشه مفهومی"],
  },
  {
    id: "yasna-ritual",
    title: "آتش یسنا",
    description: "ورود به یسنا و تجربه یک بند با متن، ترجمه، پیام اخلاقی و صوت.",
    track: "ritual",
    difficulty: "medium",
    href: "/avesta/yasna/ha-1/verse-1",
    xp: 220,
    duration: "۲۲ دقیقه",
    badge: "همراه نیایش",
    tasks: ["خواندن بند نمونه", "فعال کردن حالت مطالعه", "ثبت یادداشت شخصی"],
  },
  {
    id: "gathas-audio",
    title: "شنیدن گات‌ها",
    description: "ورود به تجربه صوتی و خواندن گات‌ها با تمرکز بر خرد و مسئولیت.",
    track: "media",
    difficulty: "medium",
    href: "/reading-room",
    xp: 200,
    duration: "۲۰ دقیقه",
    badge: "شنونده خرد",
    tasks: ["انتخاب حالت صوت", "رفتن به بند پیشنهادی", "اشتراک یک نقل‌قول"],
  },
  {
    id: "source-keeper",
    title: "نگهبان منابع",
    description: "کاوش در مرکز اعتماد و citation برای دیدن پشتوانه پژوهشی محتوا.",
    track: "research",
    difficulty: "deep",
    href: "/trust-center",
    xp: 260,
    duration: "۲۵ دقیقه",
    badge: "نگهبان منبع",
    tasks: ["دیدن Trust Center", "باز کردن Citation Center", "بررسی یک مقاله"],
  },
  {
    id: "seven-day-path",
    title: "سفر هفت‌روزه",
    description: "تکمیل مسیر اصلی برنامه مطالعه و لمس همه تالارهای کلیدی سایت.",
    track: "gateway",
    difficulty: "deep",
    href: "/study-plan",
    xp: 420,
    duration: "۹۵ دقیقه",
    badge: "رهرو اوستا",
    tasks: studyPlanSteps.slice(0, 4).map((step) => step.title),
  },
];

export function getQuestSummary(completedIds: string[] = [], quests: LearningQuest[] = learningQuests) {
  const completed = quests.filter((quest) => completedIds.includes(quest.id));
  const totalXp = quests.reduce((sum, quest) => sum + quest.xp, 0);
  const earnedXp = completed.reduce((sum, quest) => sum + quest.xp, 0);
  const progress = Math.round((completed.length / quests.length) * 100);
  const level = earnedXp >= 800 ? "راهنمای خرد" : earnedXp >= 400 ? "جوینده پیشرفته" : "جوینده روشنایی";
  const nextQuest = quests.find((quest) => !completedIds.includes(quest.id)) ?? quests[0];

  return {
    total: quests.length,
    completed: completed.length,
    progress,
    earnedXp,
    totalXp,
    level,
    nextQuest,
    badges: completed.map((quest) => quest.badge),
  };
}
