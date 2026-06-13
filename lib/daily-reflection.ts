import { getDailyAvesta } from "@/lib/daily-avesta";

export type ReflectionPillar = "thought" | "word" | "deed";

export type ReflectionPrompt = {
  pillar: ReflectionPillar;
  label: string;
  title: string;
  question: string;
  placeholder: string;
};

export const reflectionPillarLabels: Record<ReflectionPillar, string> = {
  thought: "پندار نیک",
  word: "گفتار نیک",
  deed: "کردار نیک",
};

export function getDailyReflectionPrompts(date = new Date()): ReflectionPrompt[] {
  const daily = getDailyAvesta(date);

  return [
    {
      pillar: "thought",
      label: "پندار نیک",
      title: "نیت روشن امروز",
      question: daily.reflectionPrompt,
      placeholder: "امروز می‌خواهم در اندیشه‌ام روشن‌تر، آرام‌تر یا راست‌تر باشم...",
    },
    {
      pillar: "word",
      label: "گفتار نیک",
      title: "گفتار آگاهانه",
      question: "امروز کدام جمله یا گفتار را می‌توانی نیک‌تر و دقیق‌تر بگویی؟",
      placeholder: "در گفتار امروز مراقب این جمله، لحن یا سکوت خواهم بود...",
    },
    {
      pillar: "deed",
      label: "کردار نیک",
      title: "کردار کوچک اما واقعی",
      question: "یک عمل کوچک که امروز روشنایی را بیشتر می‌کند چیست؟",
      placeholder: "امروز این کردار کوچک را انجام می‌دهم...",
    },
  ];
}

export function getDailyReflectionSeed(date = new Date()) {
  const daily = getDailyAvesta(date);

  return {
    date: daily.date,
    quote: daily.quote,
    ethicalMessage: daily.ethicalMessage,
    term: daily.term,
    prompts: getDailyReflectionPrompts(date),
    nextActions: [
      { title: "مطالعه بند امروز", href: daily.href },
      { title: "ثبت در حافظه مطالعه", href: "/memory" },
      { title: "شروع مأموریت‌های خرد", href: "/quests" },
    ],
  };
}

export function getReflectionStats() {
  return [
    { value: "3", label: "ستون اخلاقی" },
    { value: "Daily", label: "ثبت روزانه" },
    { value: "Local", label: "حافظه روی دستگاه" },
  ];
}
