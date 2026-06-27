import { avestaSections } from "@/lib/content";
import type { BulkImportPayload } from "@/lib/bulk-import-types";

export type AvestaImportTemplateRow = {
  sectionSlug: string;
  chapterSlug: string;
  verseOrder: number;
  title: string;
  originalText: string;
  transliteration: string;
  classicalTranslation: string;
  simpleRewrite: string;
  modernInterpretation: string;
  ethicalMessage: string;
  quote: string;
  citationTitle: string;
  citationNote: string;
  coverImage: string;
  audioUrl: string;
  seoTitle: string;
  seoDescription: string;
};

export type AvestaImportTemplate = {
  version: string;
  generatedAt: string;
  rows: AvestaImportTemplateRow[];
  payload: BulkImportPayload;
  checklist: string[];
};

const starterRows: AvestaImportTemplateRow[] = avestaSections.slice(0, 4).map((section, index) => ({
  sectionSlug: section.slug,
  chapterSlug: section.slug === "hats" ? "ha-1" : `${section.slug}-starter`,
  verseOrder: index + 1,
  title: `${section.title} - نمونه ورود محتوا`,
  originalText: "متن اصلی اوستایی یا پهلوی/فارسی منبع‌دار را اینجا وارد کنید.",
  transliteration: "Transliteration goes here",
  classicalTranslation: "ترجمه کلاسیک تاییدشده را اینجا وارد کنید.",
  simpleRewrite: "بازنویسی ساده و قابل فهم برای مخاطب امروز.",
  modernInterpretation: "تحلیل مفهومی کوتاه با زبان پژوهشی اما روان.",
  ethicalMessage: "پیام اخلاقی امروز از این بند.",
  quote: "نقل‌قول طلایی قابل اشتراک.",
  citationTitle: "عنوان منبع / نسخه / پژوهش",
  citationNote: "یادداشت منبع، صفحه، مترجم یا سطح اعتماد.",
  coverImage: coverImageForSection(section.slug),
  audioUrl: `/audio/${section.slug}-starter-1.mp3`,
  seoTitle: `${section.title} | AVESTA-ZOROASTER`,
  seoDescription: `مطالعه ${section.title} با متن، ترجمه، بازنویسی ساده، تحلیل و پیام اخلاقی در جهان دیجیتال اوستا.`,
}));

export function getAvestaImportTemplate(): AvestaImportTemplate {
  const rows = starterRows;

  return {
    version: "avesta-golden-content-v1",
    generatedAt: new Date().toISOString(),
    rows,
    payload: buildBulkImportPayload(rows),
    checklist: [
      "برای هر بند، متن اصلی و منبع باید قبل از import واقعی بازبینی شود.",
      "ترجمه کلاسیک، بازنویسی ساده، تحلیل مفهومی و پیام اخلاقی خالی نماند.",
      "مسیر تصویر و صوت باید با فایل واقعی در storage یا public هم‌خوان باشد.",
      "SEO title و description برای صفحات مهم دستی بازبینی شود.",
      "ابتدا dryRun=true اجرا شود؛ بعد از تایید خروجی، import واقعی انجام شود.",
    ],
  };
}

export function buildAvestaCsvTemplate(rows: AvestaImportTemplateRow[] = starterRows) {
  const headers: Array<keyof AvestaImportTemplateRow> = [
    "sectionSlug",
    "chapterSlug",
    "verseOrder",
    "title",
    "originalText",
    "transliteration",
    "classicalTranslation",
    "simpleRewrite",
    "modernInterpretation",
    "ethicalMessage",
    "quote",
    "citationTitle",
    "citationNote",
    "coverImage",
    "audioUrl",
    "seoTitle",
    "seoDescription",
  ];

  return [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => escapeCsvCell(String(row[header] ?? ""))).join(",")),
  ].join("\n");
}

function buildBulkImportPayload(rows: AvestaImportTemplateRow[]): BulkImportPayload {
  return {
    dryRun: true,
    name: "Avesta golden content import template",
    content: rows.map((row) => ({
      resource: "avestaVerse",
      locale: "FA",
      sectionSlug: row.sectionSlug,
      chapterSlug: row.chapterSlug,
      order: row.verseOrder,
      coverImage: row.coverImage,
      audioUrl: row.audioUrl,
      fields: {
        title: row.title,
        originalText: row.originalText,
        transliteration: row.transliteration,
        classicalTranslation: row.classicalTranslation,
        simpleRewrite: row.simpleRewrite,
        modernInterpretation: row.modernInterpretation,
        ethicalMessage: row.ethicalMessage,
        quote: row.quote,
        citationTitle: row.citationTitle,
        citationNote: row.citationNote,
        seoTitle: row.seoTitle,
        seoDescription: row.seoDescription,
      },
    })),
    media: rows.map((row) => ({
      title: `تصویر ${row.title}`,
      slug: `${row.sectionSlug}-${row.chapterSlug}-${row.verseOrder}`,
      type: "AI Image",
      category: row.sectionSlug,
      description: `تصویر اختصاصی برای ${row.title}`,
      url: row.coverImage,
      thumbnail: row.coverImage,
      prompt: `Dark luxury Persian mythology artwork for ${row.title}, sacred fire, ancient Persian atmosphere, gold and deep navy`,
      mood: "سینمایی، طلایی، رازآلود، ایرانی",
      accent: "#D6A84F",
      sectionSlug: row.sectionSlug,
      chapterSlug: row.chapterSlug,
      verseOrder: row.verseOrder,
      status: "DRAFT",
    })),
  };
}

function escapeCsvCell(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}

function coverImageForSection(slug: string) {
  const covers: Record<string, string> = {
    yasna: "/images/ai/yasna-hero.jpg",
    gathas: "/images/ai/gathas-hero.jpg",
    visperad: "/images/ai/avesta-portal.jpg",
    vendidad: "/images/ai/vendidad-hero.jpg",
    yashts: "/images/ai/yashts-hero.jpg",
    "khordeh-avesta": "/images/ai/khordeh-avesta-hero.jpg",
    hats: "/images/ai/hats-hero.jpg",
  };

  return covers[slug] ?? "/images/ai/avesta-portal.jpg";
}
