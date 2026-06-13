import { glossaryTerms, sampleVerses } from "@/lib/sample-content";

export type ReadingRoomMode = "devotional" | "scholar" | "daily" | "audio";
export type ReadingDepth = "simple" | "balanced" | "deep";

export type ReadingRoomPreset = {
  id: ReadingRoomMode;
  title: string;
  subtitle: string;
  scene: string;
  depth: ReadingDepth;
  focus: string[];
  recommendedVerseHref: string;
  recommendedVerseTitle: string;
  ethicalMessage: string;
};

export const readingDepthLabels: Record<ReadingDepth, string> = {
  simple: "ساده و روان",
  balanced: "متعادل",
  deep: "پژوهشی و عمیق",
};

export function getReadingRoomPresets(): ReadingRoomPreset[] {
  const yasna = sampleVerses[0];
  const gathas = sampleVerses[1] ?? sampleVerses[0];

  return [
    {
      id: "devotional",
      title: "نیایش و روشنایی",
      subtitle: "برای خواندن آرام، تمرکز روی آتش، حضور و پیام اخلاقی هر بند.",
      scene: "scene-fire",
      depth: "balanced",
      focus: ["پیام اخلاقی", "بازنویسی ساده", "نقل‌قول طلایی"],
      recommendedVerseHref: `/avesta/${yasna.sectionSlug}/${yasna.chapterSlug ?? "chapter"}/${yasna.verseSlug ?? "verse"}`,
      recommendedVerseTitle: `${yasna.chapterTitle} / ${yasna.verseNumber}`,
      ethicalMessage: yasna.ethicalMessage,
    },
    {
      id: "scholar",
      title: "مطالعه پژوهشی",
      subtitle: "برای مقایسه متن، ترجمه، واژه‌نامه، citation و تحلیل مفهومی.",
      scene: "scene-scroll",
      depth: "deep",
      focus: ["متن اصلی", "ترجمه کلاسیک", "منابع و citation"],
      recommendedVerseHref: `/citations`,
      recommendedVerseTitle: "مرکز ارجاع و منابع پژوهشی",
      ethicalMessage: "خوانش پژوهشی یعنی هر برداشت را با منبع، زمینه و دقت تحریریه همراه کنیم.",
    },
    {
      id: "daily",
      title: "پیام امروز",
      subtitle: "برای وقتی که کاربر فقط یک پیام کوتاه، قابل عمل و قابل ذخیره می‌خواهد.",
      scene: "scene-sunrise",
      depth: "simple",
      focus: ["برداشت امروزی", "کردار روزانه", "بوکمارک"],
      recommendedVerseHref: `/wisdom-guide`,
      recommendedVerseTitle: "راهنمای خرد اوستا",
      ethicalMessage: "هر روز یک جمله کافی است اگر همان جمله به یک کردار نیک تبدیل شود.",
    },
    {
      id: "audio",
      title: "شنیدن و مکث",
      subtitle: "برای خوانش صوتی، پادکست، سرعت پخش و تجربه شنیداری گات‌ها.",
      scene: "scene-mountain",
      depth: "balanced",
      focus: ["روایت صوتی", "پادکست", "یادداشت شنیداری"],
      recommendedVerseHref: `/avesta/${gathas.sectionSlug}/${gathas.chapterSlug ?? "chapter"}/${gathas.verseSlug ?? "verse"}`,
      recommendedVerseTitle: `${gathas.chapterTitle} / ${gathas.verseNumber}`,
      ethicalMessage: gathas.ethicalMessage,
    },
  ];
}

export function getReadingRoomRecommendation(mode?: string | null) {
  const presets = getReadingRoomPresets();
  const preset = presets.find((item) => item.id === mode) ?? presets[0];
  const terms = glossaryTerms.slice(0, preset.depth === "deep" ? 5 : 3).map((term) => ({
    title: term.term,
    href: `/dictionary/${term.slug}`,
    description: term.meaning,
  }));

  return {
    preset,
    terms,
    controls: [
      "حالت شب / سپیا / روشن",
      "اندازه فونت و فاصله خطوط",
      "بوکمارک و ادامه مطالعه",
      "یادداشت شخصی",
      "اشتراک‌گذاری نقل‌قول",
    ],
    nextActions: [
      { title: "ورود به بند پیشنهادی", href: preset.recommendedVerseHref },
      { title: "رفتن به برنامه مطالعه", href: "/study-plan" },
      { title: "باز کردن واژه‌نامه", href: "/dictionary" },
    ],
  };
}

export function getReadingRoomStats() {
  const presets = getReadingRoomPresets();

  return [
    { value: String(presets.length), label: "حالت مطالعه" },
    { value: "5", label: "کنترل خواندن" },
    { value: "RTL", label: "آماده فارسی" },
  ];
}
