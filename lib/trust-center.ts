import { articleItems, glossaryTerms, libraryItems, sampleVerses } from "@/lib/sample-content";

export type TrustLevel = "verified" | "editorial" | "draft" | "needs-source";

export type TrustRecord = {
  id: string;
  title: string;
  type: "verse" | "article" | "glossary" | "library" | "media";
  href: string;
  trustLevel: TrustLevel;
  confidence: number;
  sourceStatus: string;
  reviewStatus: string;
  nextAction: string;
  references: string[];
};

export const trustLevelLabels: Record<TrustLevel, string> = {
  verified: "مستند و آماده انتشار",
  editorial: "بازبینی تحریریه",
  draft: "نمونه / پیش‌نویس",
  "needs-source": "نیازمند منبع",
};

export function getTrustRecords(): TrustRecord[] {
  const verseRecords: TrustRecord[] = sampleVerses.map((verse, index) => ({
    id: `verse-${verse.sectionSlug}-${verse.chapterSlug ?? index}`,
    title: `${verse.chapterTitle} / ${verse.verseNumber}`,
    type: "verse",
    href: `/avesta/${verse.sectionSlug}/${verse.chapterSlug ?? "chapter"}/${verse.verseSlug ?? "verse"}`,
    trustLevel: "draft",
    confidence: 72,
    sourceStatus: "ساختار متن، ترجمه و تحلیل آماده است؛ متن کامل باید از منابع نهایی وارد شود.",
    reviewStatus: "در انتظار ورود متن اصلی و بازبینی پژوهشی.",
    nextAction: "افزودن متن اوستایی، آوانویسی، ترجمه کلاسیک و ارجاع کتابخانه‌ای.",
    references: ["راهنمای مطالعه اوستا", "واژه‌های کلیدی زرتشتی"],
  }));

  const articleRecords: TrustRecord[] = articleItems.map((article) => ({
    id: `article-${article.slug}`,
    title: article.title,
    type: "article",
    href: `/articles/${article.slug}`,
    trustLevel: "editorial",
    confidence: 78,
    sourceStatus: `دارای دسته ${article.category}، برچسب‌ها و schema مقاله.`,
    reviewStatus: "محتوای نمونه آماده است و باید با منابع نهایی غنی شود.",
    nextAction: "افزودن پانویس، منابع کتابخانه و تاریخچه ویرایش.",
    references: article.relatedTerms.map((slug) => glossaryTerms.find((term) => term.slug === slug)?.term ?? slug),
  }));

  const glossaryRecords: TrustRecord[] = glossaryTerms.map((term) => ({
    id: `glossary-${term.slug}`,
    title: term.term,
    type: "glossary",
    href: `/dictionary/${term.slug}`,
    trustLevel: "editorial",
    confidence: 82,
    sourceStatus: `دارای معنی، ریشه ${term.root} و توضیح تحریریه.`,
    reviewStatus: "آماده اتصال به شواهد متنی از اوستا و مقاله‌های مرتبط.",
    nextAction: "افزودن نمونه کاربرد در بندهای اوستا و منابع زبان‌شناسی.",
    references: ["واژه‌های کلیدی زرتشتی"],
  }));

  const libraryRecords: TrustRecord[] = libraryItems.map((item, index) => ({
    id: `library-${index}`,
    title: item.title,
    type: "library",
    href: item.href,
    trustLevel: item.type === "PDF" ? "verified" : "editorial",
    confidence: item.type === "PDF" ? 88 : 76,
    sourceStatus: `${item.type} / ${item.language} / ${item.author}`,
    reviewStatus: "برای اتصال به Citation API آماده است.",
    nextAction: "افزودن نسخه، ناشر، سال انتشار و لینک فایل نهایی.",
    references: [item.category],
  }));

  return [...libraryRecords, ...glossaryRecords, ...articleRecords, ...verseRecords].sort(
    (a, b) => b.confidence - a.confidence
  );
}

export function getTrustCenterSummary(records: TrustRecord[] = getTrustRecords()) {
  const average = Math.round(records.reduce((sum, item) => sum + item.confidence, 0) / records.length);
  const verified = records.filter((item) => item.trustLevel === "verified").length;
  const editorial = records.filter((item) => item.trustLevel === "editorial").length;
  const draft = records.filter((item) => item.trustLevel === "draft").length;
  const needsSource = records.filter((item) => item.trustLevel === "needs-source").length;

  return {
    average,
    total: records.length,
    verified,
    editorial,
    draft,
    needsSource,
  };
}
