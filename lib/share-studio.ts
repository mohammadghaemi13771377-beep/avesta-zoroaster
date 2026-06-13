import { getDailyAvesta } from "@/lib/daily-avesta";
import { articleItems, sampleVerses } from "@/lib/sample-content";

export type ShareCardTheme = "fire" | "sunrise" | "stone" | "cosmic";
export type ShareCardFormat = "square" | "story" | "wide";

export type ShareCardSeed = {
  id: string;
  quote: string;
  sourceTitle: string;
  sourceHref: string;
  ethicalMessage: string;
  theme: ShareCardTheme;
  tags: string[];
};

export type ShareStudioState = {
  seeds: ShareCardSeed[];
  themes: Array<{ id: ShareCardTheme; label: string; accent: string; scene: string }>;
  formats: Array<{ id: ShareCardFormat; label: string; size: string }>;
  defaultSeed: ShareCardSeed;
};

export const shareCardThemes: ShareStudioState["themes"] = [
  { id: "fire", label: "آتش طلایی", accent: "#D6A84F", scene: "scene-fire" },
  { id: "sunrise", label: "سپیده گات‌ها", accent: "#F2D58A", scene: "scene-sunrise" },
  { id: "stone", label: "سنگ و کتیبه", accent: "#7EA4C8", scene: "scene-stone" },
  { id: "cosmic", label: "آسمان خرد", accent: "#FFF8EA", scene: "scene-cosmic" },
];

export const shareCardFormats: ShareStudioState["formats"] = [
  { id: "square", label: "پست مربعی", size: "1080 × 1080" },
  { id: "story", label: "استوری", size: "1080 × 1920" },
  { id: "wide", label: "بنر عریض", size: "1600 × 900" },
];

export function getShareCardSeeds(): ShareCardSeed[] {
  const daily = getDailyAvesta();
  const verseSeeds: ShareCardSeed[] = sampleVerses.map((verse, index) => ({
    id: `verse-${verse.sectionSlug}-${verse.verseSlug ?? index}`,
    quote: verse.quote,
    sourceTitle: `${verse.chapterTitle} / ${verse.verseNumber}`,
    sourceHref: `/avesta/${verse.sectionSlug}/${verse.chapterSlug ?? "chapter"}/${verse.verseSlug ?? "verse"}`,
    ethicalMessage: verse.ethicalMessage,
    theme: index % 2 === 0 ? "fire" : "sunrise",
    tags: ["اوستا", "خرد", "نقل‌قول"],
  }));

  const articleSeeds: ShareCardSeed[] = articleItems.slice(0, 3).map((article, index) => ({
    id: `article-${article.slug}`,
    quote: article.excerpt,
    sourceTitle: article.title,
    sourceHref: `/articles/${article.slug}`,
    ethicalMessage: article.seoDescription,
    theme: index === 0 ? "cosmic" : "stone",
    tags: article.tags,
  }));

  return [
    {
      id: "daily-avesta",
      quote: daily.quote,
      sourceTitle: daily.section,
      sourceHref: daily.href,
      ethicalMessage: daily.ethicalMessage,
      theme: "fire",
      tags: ["اوستای امروز", daily.term.label],
    },
    ...verseSeeds,
    ...articleSeeds,
  ];
}

export function getShareStudioState(): ShareStudioState {
  const seeds = getShareCardSeeds();

  return {
    seeds,
    themes: shareCardThemes,
    formats: shareCardFormats,
    defaultSeed: seeds[0],
  };
}

export function getShareStudioStats() {
  return [
    { label: "نقل‌قول آماده", value: String(getShareCardSeeds().length) },
    { label: "تم کارت", value: String(shareCardThemes.length) },
    { label: "فرمت خروجی", value: String(shareCardFormats.length) },
  ];
}
