import { articleItems, glossaryTerms, sampleVerses } from "@/lib/sample-content";

export type WisdomGuideIntent = "study" | "clarity" | "calm" | "truth" | "courage";

export type WisdomGuidePrompt = {
  id: WisdomGuideIntent;
  label: string;
  description: string;
  accent: string;
};

export type WisdomGuideLink = {
  title: string;
  href: string;
  description: string;
};

export type WisdomGuideRecommendation = {
  intent: WisdomGuideIntent;
  title: string;
  summary: string;
  ethicalMessage: string;
  verse: {
    title: string;
    href: string;
    quote: string;
  };
  terms: WisdomGuideLink[];
  articles: WisdomGuideLink[];
  nextActions: WisdomGuideLink[];
  sourceNote: string;
};

export const wisdomGuidePrompts: WisdomGuidePrompt[] = [
  {
    id: "study",
    label: "شروع مطالعه",
    description: "برای کسی که تازه می‌خواهد وارد جهان اوستا، گات‌ها و واژه‌های بنیادین شود.",
    accent: "#D6A84F",
  },
  {
    id: "clarity",
    label: "روشنایی و تصمیم",
    description: "برای وقتی که کاربر دنبال تمرکز، تشخیص راه درست و تصمیم آگاهانه است.",
    accent: "#F2D58A",
  },
  {
    id: "calm",
    label: "آرامش و نیایش",
    description: "برای تجربه‌ای آرام‌تر، مراقبه‌محور و نزدیک به نیایش روزانه.",
    accent: "#FFF8EA",
  },
  {
    id: "truth",
    label: "راستی و اشا",
    description: "برای فهم نظم اخلاقی، صداقت، اشا و پیوند کردار با روشنایی.",
    accent: "#7EA4C8",
  },
  {
    id: "courage",
    label: "مسئولیت و کردار",
    description: "برای تبدیل دانایی به عمل، انتخاب اخلاقی و ایستادن در مسیر نیکی.",
    accent: "#E68A3A",
  },
];

const intentBlueprints: Record<
  WisdomGuideIntent,
  {
    title: string;
    summary: string;
    ethicalMessage: string;
    verseIndex: number;
    termSlugs: string[];
    articleSlugs: string[];
    actions: WisdomGuideLink[];
  }
> = {
  study: {
    title: "مسیر آغازین جهان اوستا",
    summary:
      "از گات‌ها و واژه‌های پایه شروع کن، بعد وارد پورتال اوستا شو تا متن، ترجمه و تحلیل را لایه‌به‌لایه ببینی.",
    ethicalMessage: "شروع درست یعنی آهسته خواندن، دقیق فهمیدن و هر روز یک پیام کوچک را به کردار تبدیل کردن.",
    verseIndex: 1,
    termSlugs: ["gatha", "asha", "ahura-mazda"],
    articleSlugs: ["what-are-gathas", "asha-truth-order"],
    actions: [
      {
        title: "ورود به پورتال اوستا",
        href: "/avesta",
        description: "نقشه اصلی بخش‌های اوستا و مسیرهای مطالعه.",
      },
      {
        title: "ساخت برنامه مطالعه",
        href: "/study-plan",
        description: "یک مسیر مرحله‌ای برای خواندن، بوکمارک و ادامه مطالعه.",
      },
    ],
  },
  clarity: {
    title: "راهنمای روشنایی برای تصمیم",
    summary:
      "این مسیر روی خرد، وهومن و خوانش آرام گات‌ها تمرکز دارد؛ جایی که تصمیم خوب از اندیشه روشن شروع می‌شود.",
    ethicalMessage: "پیش از تصمیم، اندیشه را پاک‌تر کن؛ تصمیم روشن از پندار روشن می‌آید.",
    verseIndex: 1,
    termSlugs: ["vohuman", "asha", "gatha"],
    articleSlugs: ["what-are-gathas", "asha-truth-order"],
    actions: [
      {
        title: "خواندن نمونه گات‌ها",
        href: "/avesta/gathas/ahunavaiti/verse-1",
        description: "یک بند نمونه با پیام انتخاب آگاهانه و مسئولیت.",
      },
      {
        title: "جستجوی وهومن",
        href: "/search?q=وهومن",
        description: "یافتن واژه‌ها و مقاله‌های مرتبط با اندیشه نیک.",
      },
    ],
  },
  calm: {
    title: "مسیر آرامش و نیایش روزانه",
    summary:
      "برای آرام شدن، این مسیر از یسنا، آتش آرام و خرده اوستا الهام می‌گیرد و مطالعه را به مکث و نیایش وصل می‌کند.",
    ethicalMessage: "آرامش فقط سکوت نیست؛ تمرین حضور، نظم درونی و مهربانی در گفتار است.",
    verseIndex: 0,
    termSlugs: ["ahura-mazda", "faravahar", "asha"],
    articleSlugs: ["faravahar-symbol", "asha-truth-order"],
    actions: [
      {
        title: "ورود به یسنا",
        href: "/avesta/yasna",
        description: "فضای نیایش، آتش مقدس و ساختار هات‌ها.",
      },
      {
        title: "رسانه‌های آرام",
        href: "/media",
        description: "تصویر، صوت و ویدیو برای تجربه سینمایی آرام‌تر.",
      },
    ],
  },
  truth: {
    title: "مسیر اشا و راستی",
    summary:
      "این پیشنهاد از مفهوم اشا شروع می‌کند و کاربر را از واژه‌نامه به مقاله و سپس خواندن متن اوستا می‌برد.",
    ethicalMessage: "راستی وقتی زنده است که در اندیشه، زبان و عمل یکپارچه بماند.",
    verseIndex: 1,
    termSlugs: ["asha", "vohuman", "ahura-mazda"],
    articleSlugs: ["asha-truth-order", "what-are-gathas"],
    actions: [
      {
        title: "واژه‌نامه اشا",
        href: "/dictionary/asha",
        description: "معنی، ریشه و کاربرد یکی از مفاهیم بنیادین.",
      },
      {
        title: "هاب یکتاپرستی",
        href: "/monotheism",
        description: "اهورامزدا، اشا، اختیار انسان و اخلاق جهانی.",
      },
    ],
  },
  courage: {
    title: "مسیر کردار و مسئولیت",
    summary:
      "این مسیر کاربر را از شعار طلایی سایت به متن، مقاله و برنامه مطالعه می‌برد تا دانایی به عمل تبدیل شود.",
    ethicalMessage: "کردار نیک یعنی روشنایی را از صفحه مطالعه بیرون ببری و در انتخاب‌های روزانه نگه داری.",
    verseIndex: 1,
    termSlugs: ["faravahar", "asha", "vohuman"],
    articleSlugs: ["faravahar-symbol", "asha-truth-order"],
    actions: [
      {
        title: "کلکسیون‌های الهام‌بخش",
        href: "/collections",
        description: "مسیرهای موضوعی برای مطالعه و تجربه عمیق‌تر.",
      },
      {
        title: "فروشگاه فرهنگی",
        href: "/shop",
        description: "جایگاه آینده محصولاتی که پیام را وارد زندگی روزمره می‌کنند.",
      },
    ],
  },
};

export function normalizeWisdomIntent(value?: string | null): WisdomGuideIntent {
  return wisdomGuidePrompts.some((prompt) => prompt.id === value) ? (value as WisdomGuideIntent) : "study";
}

export function getWisdomGuideRecommendation(intentValue?: string | null): WisdomGuideRecommendation {
  const intent = normalizeWisdomIntent(intentValue);
  const blueprint = intentBlueprints[intent];
  const verse = sampleVerses[blueprint.verseIndex] ?? sampleVerses[0];

  return {
    intent,
    title: blueprint.title,
    summary: blueprint.summary,
    ethicalMessage: blueprint.ethicalMessage,
    verse: {
      title: `${verse.chapterTitle} / ${verse.verseNumber}`,
      href: `/avesta/${verse.sectionSlug}/${verse.chapterSlug ?? "chapter"}/${verse.verseSlug ?? "verse"}`,
      quote: verse.quote,
    },
    terms: blueprint.termSlugs
      .map((slug) => glossaryTerms.find((term) => term.slug === slug))
      .filter(Boolean)
      .map((term) => ({
        title: term!.term,
        href: `/dictionary/${term!.slug}`,
        description: term!.meaning,
      })),
    articles: blueprint.articleSlugs
      .map((slug) => articleItems.find((article) => article.slug === slug))
      .filter(Boolean)
      .map((article) => ({
        title: article!.title,
        href: `/articles/${article!.slug}`,
        description: article!.excerpt,
      })),
    nextActions: blueprint.actions,
    sourceNote:
      "این نسخه بر اساس محتوای تحریریه، واژه‌نامه، مقاله‌ها و نمونه بندهای اوستا پیشنهاد می‌دهد و برای اتصال آینده به AI/RAG آماده است.",
  };
}

export function getWisdomGuideStats() {
  return [
    {
      label: "حال‌وهوای مطالعه",
      value: String(wisdomGuidePrompts.length),
    },
    {
      label: "واژه‌های قابل اتصال",
      value: String(glossaryTerms.length),
    },
    {
      label: "مسیرهای پیشنهادی",
      value: "هوشمند",
    },
  ];
}
