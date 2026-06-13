import { aiPromptTemplates } from "@/lib/ai-prompts";

export type AiArtRatio = "16:9" | "4:5" | "1:1" | "9:16";

export type AiArtBrief = {
  id: string;
  title: string;
  sectionSlug: string;
  category: string;
  mood: string;
  palette: string[];
  ratios: AiArtRatio[];
  recommendedPath: string;
  prompt: string;
  negativePrompt: string;
  usage: string;
  productionNotes: string[];
};

const ratioByCategory: Record<string, AiArtRatio[]> = {
  Hero: ["16:9", "9:16"],
  "Avesta Section": ["16:9", "4:5", "1:1"],
  "Study Path": ["4:5", "1:1"],
};

export const aiArtStyleRules = [
  "فضا باید سینمایی، موزه‌ای و ایرانی باشد، نه شبیه وبلاگ یا تصویر استوک.",
  "هیچ متن خوانا، لوگو، واترمارک یا المان مدرن داخل تصویر تولید نشود.",
  "نور طلایی، مشکی عمیق، سرمه‌ای سلطنتی و بافت سنگ/آتش/مه ستون‌های اصلی تصویر هستند.",
  "چهره‌ها و معماری باید محترمانه، تاریخی و بدون اغراق فانتزی ساخته شوند.",
  "هر خروجی قبل از انتشار با عنوان صفحه، مسیر فایل، alt text و منبع تولید ثبت شود.",
];

export function getAiArtBriefs(): AiArtBrief[] {
  return aiPromptTemplates.map((template) => ({
    id: template.id,
    title: template.title,
    sectionSlug: template.sectionSlug,
    category: template.category,
    mood: template.mood,
    palette: [template.accent, "#05080D", "#071521", "#D6A84F", "#FFF8EA"],
    ratios: ratioByCategory[template.category] ?? ["16:9", "1:1"],
    recommendedPath: template.recommendedPath,
    prompt: template.prompt,
    negativePrompt: template.negativePrompt,
    usage: template.usage,
    productionNotes: buildProductionNotes(template.sectionSlug, template.category),
  }));
}

export function getAiArtBrief(id: string) {
  return getAiArtBriefs().find((brief) => brief.id === id);
}

export function getAiArtStudioStats() {
  const briefs = getAiArtBriefs();
  const sections = new Set(briefs.map((brief) => brief.sectionSlug));
  const ratios = new Set(briefs.flatMap((brief) => brief.ratios));

  return [
    { value: String(briefs.length), label: "brief تصویری آماده" },
    { value: String(sections.size), label: "فضای محتوایی پوشش داده‌شده" },
    { value: String(ratios.size), label: "نسبت تصویر برای خروجی" },
  ];
}

function buildProductionNotes(sectionSlug: string, category: string) {
  const notes = [
    "خروجی نهایی باید در مسیر پیشنهادی ذخیره شود و سپس از پنل رسانه به صفحه مرتبط وصل شود.",
    "برای SEO، alt text فارسی و انگلیسی کوتاه ثبت شود.",
  ];

  if (category === "Hero") {
    notes.push("برای موبایل یک نسخه 9:16 با سوژه مرکزی و فضای تنفس بالا تولید شود.");
  }

  if (sectionSlug === "vendidad") {
    notes.push("فضا تاریک و رازآلود باشد، اما خشونت یا تصویر ترسناک مستقیم نداشته باشد.");
  }

  if (sectionSlug === "gathas") {
    notes.push("نور، سکوت و معنویت مهم‌تر از جزئیات شلوغ معماری هستند.");
  }

  return notes;
}
