import { articleItems, glossaryTerms, libraryItems, sampleVerses } from "@/lib/sample-content";

export type CitationType = "primary-text" | "translation" | "commentary" | "library" | "editorial-note";
export type CitationStatus = "verified" | "needs-review" | "planned";

export type CitationRecord = {
  id: string;
  targetTitle: string;
  targetHref: string;
  targetType: "verse" | "article" | "glossary" | "library";
  citationType: CitationType;
  status: CitationStatus;
  sourceTitle: string;
  sourceAuthor: string;
  sourceLanguage: string;
  sourceHref: string;
  note: string;
  pageHint?: string;
};

export const citationTypeLabels: Record<CitationType, string> = {
  "primary-text": "متن اصلی",
  translation: "ترجمه",
  commentary: "شرح و تحلیل",
  library: "کتابخانه",
  "editorial-note": "یادداشت تحریریه",
};

export const citationStatusLabels: Record<CitationStatus, string> = {
  verified: "تایید شده",
  "needs-review": "نیازمند بازبینی",
  planned: "برنامه‌ریزی شده",
};

export function getCitationRecords(): CitationRecord[] {
  const librarySource = libraryItems[0];
  const glossarySource = libraryItems.find((item) => item.type === "Glossary") ?? libraryItems[2];

  const verseCitations: CitationRecord[] = sampleVerses.flatMap((verse) => [
    {
      id: `citation-primary-${verse.sectionSlug}-${verse.chapterSlug}`,
      targetTitle: `${verse.chapterTitle} / ${verse.verseNumber}`,
      targetHref: `/avesta/${verse.sectionSlug}/${verse.chapterSlug ?? "chapter"}/${verse.verseSlug ?? "verse"}`,
      targetType: "verse",
      citationType: "primary-text",
      status: "planned",
      sourceTitle: "متن اوستایی نهایی",
      sourceAuthor: "تیم پژوهش AVESTA-ZOROASTER",
      sourceLanguage: "Avestan / FA",
      sourceHref: "/admin/import",
      note: "پس از ورود متن اصلی، این citation به نسخه دقیق و قابل ارجاع وصل می‌شود.",
      pageHint: "در انتظار نسخه نهایی",
    },
    {
      id: `citation-guide-${verse.sectionSlug}-${verse.chapterSlug}`,
      targetTitle: `${verse.chapterTitle} / ${verse.verseNumber}`,
      targetHref: `/avesta/${verse.sectionSlug}/${verse.chapterSlug ?? "chapter"}/${verse.verseSlug ?? "verse"}`,
      targetType: "verse",
      citationType: "commentary",
      status: "needs-review",
      sourceTitle: librarySource.title,
      sourceAuthor: librarySource.author,
      sourceLanguage: librarySource.language,
      sourceHref: librarySource.href,
      note: "فعلا برای ساختار مطالعه و مسیر آموزشی استفاده می‌شود و باید با منبع پژوهشی نهایی تکمیل شود.",
      pageHint: "بخش راهنمای مطالعه",
    },
  ]);

  const articleCitations: CitationRecord[] = articleItems.map((article) => ({
    id: `citation-article-${article.slug}`,
    targetTitle: article.title,
    targetHref: `/articles/${article.slug}`,
    targetType: "article",
    citationType: "editorial-note",
    status: "needs-review",
    sourceTitle: "یادداشت تحریریه مقاله",
    sourceAuthor: "تحریریه AVESTA-ZOROASTER",
    sourceLanguage: "فارسی",
    sourceHref: `/articles/${article.slug}`,
    note: "مقاله نمونه دارای ساختار SEO و پیوندهای مرتبط است و باید با پانویس و منابع کتابخانه‌ای نهایی شود.",
    pageHint: article.publishedAt,
  }));

  const glossaryCitations: CitationRecord[] = glossaryTerms.map((term) => ({
    id: `citation-glossary-${term.slug}`,
    targetTitle: term.term,
    targetHref: `/dictionary/${term.slug}`,
    targetType: "glossary",
    citationType: "library",
    status: "needs-review",
    sourceTitle: glossarySource.title,
    sourceAuthor: glossarySource.author,
    sourceLanguage: glossarySource.language,
    sourceHref: glossarySource.href,
    note: `ریشه و معنی ${term.term} باید با نمونه کاربرد در متن اوستا و منابع زبان‌شناسی تکمیل شود.`,
    pageHint: term.root,
  }));

  const libraryCitations: CitationRecord[] = libraryItems.map((item, index) => ({
    id: `citation-library-${index}`,
    targetTitle: item.title,
    targetHref: item.href,
    targetType: "library",
    citationType: "library",
    status: item.type === "PDF" ? "verified" : "planned",
    sourceTitle: item.title,
    sourceAuthor: item.author,
    sourceLanguage: item.language,
    sourceHref: item.href,
    note: "این رکورد برای ساخت metadata کتابخانه‌ای، نسخه، ناشر و فایل نهایی آماده است.",
    pageHint: item.type,
  }));

  return [...libraryCitations, ...glossaryCitations, ...articleCitations, ...verseCitations];
}

export function getCitationSummary(records: CitationRecord[] = getCitationRecords()) {
  return {
    total: records.length,
    verified: records.filter((record) => record.status === "verified").length,
    needsReview: records.filter((record) => record.status === "needs-review").length,
    planned: records.filter((record) => record.status === "planned").length,
  };
}

export function getCitationsForTarget(targetHref: string) {
  return getCitationRecords().filter((record) => record.targetHref === targetHref);
}
