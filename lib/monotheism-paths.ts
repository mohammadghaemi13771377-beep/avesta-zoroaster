import { articleItems, glossaryTerms, sampleVerses } from "@/lib/sample-content";

export type MonotheismPathTone = "radiant" | "truth" | "choice" | "practice";

export type MonotheismPath = {
  id: string;
  title: string;
  subtitle: string;
  tone: MonotheismPathTone;
  scene: string;
  audience: string;
  promise: string;
  ethicalPractice: string;
  verse: {
    title: string;
    href: string;
    quote: string;
  };
  terms: Array<{
    title: string;
    href: string;
    description: string;
  }>;
  articles: Array<{
    title: string;
    href: string;
    description: string;
  }>;
  steps: string[];
};

const pathBlueprints = [
  {
    id: "ahura-mazda",
    title: "مسیر اهورامزدا",
    subtitle: "دانایی، روشنایی و سرچشمه اخلاق",
    tone: "radiant" as const,
    scene: "scene-cosmic",
    audience: "برای کاربری که می‌خواهد قلب یکتاپرستی زرتشتی را بفهمد.",
    promise: "از مفهوم خداوند دانا به تجربه خرد، روشنایی و مسئولیت اخلاقی می‌رسی.",
    ethicalPractice: "امروز یک تصمیم را با پرسش ساده بسنج: آیا این انتخاب روشن‌تر، خردمندانه‌تر و راست‌تر است؟",
    verseIndex: 1,
    termSlugs: ["ahura-mazda", "asha", "vohuman"],
    articleSlugs: ["what-are-gathas", "asha-truth-order"],
    steps: ["اهورامزدا را در واژه‌نامه بخوان", "یک بند از گات‌ها را آهسته مطالعه کن", "پیام اخلاقی بند را به یک تصمیم روزانه وصل کن"],
  },
  {
    id: "asha",
    title: "مسیر اشا",
    subtitle: "راستی، نظم و هماهنگی جهان",
    tone: "truth" as const,
    scene: "scene-sunrise",
    audience: "برای کسی که دنبال معنای راستی، صداقت و نظم اخلاقی است.",
    promise: "اشا را از یک واژه تاریخی به قطب‌نمای عملی زندگی امروز تبدیل می‌کنی.",
    ethicalPractice: "امروز یک گفتار را اصلاح کن: کوتاه‌تر، راست‌تر، مهربان‌تر.",
    verseIndex: 1,
    termSlugs: ["asha", "gatha", "vohuman"],
    articleSlugs: ["asha-truth-order", "what-are-gathas"],
    steps: ["مقاله اشا را بخوان", "نمونه گات‌ها را با ترجمه ساده مرور کن", "یک مورد ناهماهنگی در روزت را با راستی تنظیم کن"],
  },
  {
    id: "free-will",
    title: "مسیر اختیار انسان",
    subtitle: "انتخاب آگاهانه میان روشنایی و تاریکی",
    tone: "choice" as const,
    scene: "scene-mountain",
    audience: "برای کاربری که می‌خواهد بداند جایگاه انسان در این جهان‌بینی چیست.",
    promise: "می‌بینی انسان تماشاگر نیست؛ با پندار، گفتار و کردار در جهان اخلاقی سهم دارد.",
    ethicalPractice: "پیش از واکنش، سه نفس مکث کن و انتخاب کن پاسخ تو از کدام سمت می‌آید: روشنایی یا تاریکی.",
    verseIndex: 1,
    termSlugs: ["vohuman", "asha", "faravahar"],
    articleSlugs: ["what-are-gathas", "faravahar-symbol"],
    steps: ["وهومن را به عنوان اندیشه نیک بشناس", "یک تصمیم روزانه را ثبت کن", "پیام تصمیم را در دفتر تأمل بنویس"],
  },
  {
    id: "good-thought-words-deeds",
    title: "مسیر سه‌گانه نیک",
    subtitle: "پندار نیک، گفتار نیک، کردار نیک",
    tone: "practice" as const,
    scene: "scene-fire",
    audience: "برای کسی که می‌خواهد آموزه‌ها را وارد زندگی روزمره کند.",
    promise: "شعار برند از یک جمله زیبا به تمرین روزانه و قابل اندازه‌گیری تبدیل می‌شود.",
    ethicalPractice: "برای امروز یک تمرین سه‌گانه بنویس: یک فکر روشن، یک جمله نیک، یک عمل کوچک.",
    verseIndex: 0,
    termSlugs: ["gatha", "asha", "faravahar"],
    articleSlugs: ["faravahar-symbol", "asha-truth-order"],
    steps: ["یک بند کوتاه بخوان", "یک کارت طلایی بساز", "تمرین سه‌گانه را در پایان روز مرور کن"],
  },
];

export function getMonotheismPaths(): MonotheismPath[] {
  return pathBlueprints.map((blueprint) => {
    const verse = sampleVerses[blueprint.verseIndex] ?? sampleVerses[0];

    return {
      id: blueprint.id,
      title: blueprint.title,
      subtitle: blueprint.subtitle,
      tone: blueprint.tone,
      scene: blueprint.scene,
      audience: blueprint.audience,
      promise: blueprint.promise,
      ethicalPractice: blueprint.ethicalPractice,
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
      steps: blueprint.steps,
    };
  });
}

export function getMonotheismPathSummary(paths: MonotheismPath[] = getMonotheismPaths()) {
  return {
    paths: paths.length,
    terms: new Set(paths.flatMap((path) => path.terms.map((term) => term.href))).size,
    articles: new Set(paths.flatMap((path) => path.articles.map((article) => article.href))).size,
    practices: paths.length,
  };
}
