import { buildAshaBalanceSnapshot } from "@/lib/asha-balance";
import { getDailyAvesta } from "@/lib/daily-avesta";
import { learningQuests } from "@/lib/learning-quests";
import { getPracticeStudioPlan } from "@/lib/practice-studio";

export type DailyLightGuideStep = {
  id: string;
  title: string;
  label: string;
  description: string;
  href: string;
  duration: string;
  intent: "read" | "reflect" | "practice" | "quest" | "balance";
};

export type DailyLightGuide = {
  date: string;
  title: string;
  headline: string;
  score: number;
  quote: string;
  ethicalMessage: string;
  totalDuration: string;
  steps: DailyLightGuideStep[];
};

export function getDailyLightGuide(): DailyLightGuide {
  const daily = getDailyAvesta();
  const asha = buildAshaBalanceSnapshot();
  const practice = getPracticeStudioPlan()[0];
  const quest = learningQuests[0];

  return {
    date: daily.date,
    title: "راهنمای روزانه روشنایی",
    headline: "یک مسیر کوتاه برای خواندن، تأمل، تمرین و سنجش اشا در همین امروز.",
    score: asha.score,
    quote: daily.quote,
    ethicalMessage: daily.ethicalMessage,
    totalDuration: "۱۵ دقیقه",
    steps: [
      {
        id: "daily-verse",
        title: "خواندن بند امروز",
        label: "مطالعه",
        description: daily.reflectionPrompt,
        href: daily.href,
        duration: "۴ دقیقه",
        intent: "read",
      },
      {
        id: "daily-reflection",
        title: "ثبت یک جمله در دفتر",
        label: "تأمل",
        description: "یک پندار روشن، یک گفتار نیک یا یک کردار کوچک را برای امروز ثبت کن.",
        href: "/reflection",
        duration: "۳ دقیقه",
        intent: "reflect",
      },
      {
        id: "daily-practice",
        title: practice?.title ?? "تمرین اخلاقی امروز",
        label: "تمرین",
        description: practice?.action ?? "یک تمرین کوچک را از برنامه هفت‌روزه کامل کن.",
        href: "/practice",
        duration: "۵ دقیقه",
        intent: "practice",
      },
      {
        id: "daily-quest",
        title: quest?.title ?? "مأموریت خرد",
        label: "مأموریت",
        description: quest?.description ?? "یک مأموریت کوتاه را برای رشد مسیر کامل کن.",
        href: quest?.href ?? "/quests",
        duration: "۲ دقیقه",
        intent: "quest",
      },
      {
        id: "daily-balance",
        title: "سنجش تعادل اشا",
        label: "نورسنج",
        description: asha.headline,
        href: "/asha-balance",
        duration: "۱ دقیقه",
        intent: "balance",
      },
    ],
  };
}

export function getDailyLightStats() {
  const guide = getDailyLightGuide();

  return [
    { value: guide.totalDuration, label: "مسیر کوتاه روزانه" },
    { value: String(guide.steps.length), label: "قدم روشن" },
    { value: `${guide.score}%`, label: "تعادل اشا" },
  ];
}
