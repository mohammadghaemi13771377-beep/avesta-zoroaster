import type { BulkImportPayload } from "@/lib/bulk-import-types";

export const bulkImportExample: BulkImportPayload = {
  dryRun: true,
  name: "Yasna starter content",
  content: [
    {
      resource: "avestaVerse",
      locale: "FA",
      sectionSlug: "yasna",
      chapterSlug: "ha-1",
      order: 1,
      coverImage: "/images/ai/yasna-cover.png",
      audioUrl: "/audio/yasna-verse-1.mp3",
      fields: {
        originalText: "متن اصلی اوستایی",
        transliteration: "Sample transliteration",
        classicalTranslation: "ترجمه کلاسیک",
        simpleRewrite: "بازنویسی ساده",
        modernInterpretation: "تحلیل مفهومی",
        ethicalMessage: "پیام اخلاقی",
      },
    },
  ],
  media: [
    {
      title: "آتش مقدس یسنا",
      slug: "yasna-ha-1-verse-1",
      type: "AI Image",
      category: "یسنا",
      description: "تصویر مرتبط با بند نمونه یسنا.",
      url: "/images/ai/yasna-cover.png",
      thumbnail: "/images/ai/yasna-cover.png",
      prompt: "Ancient Persian fire temple, sacred flame, golden ritual light",
      mood: "طلایی، آیینی، سینمایی",
      accent: "#D6A84F",
      sectionSlug: "yasna",
      chapterSlug: "ha-1",
      verseOrder: 1,
      status: "DRAFT",
    },
  ],
};
