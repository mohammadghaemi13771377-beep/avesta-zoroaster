import {
  avestaCompletionFieldLabels,
  getAvestaCompletionSections,
  type AvestaCompletionField,
  type AvestaCompletionSection,
} from "@/lib/avesta-completion";

export type AvestaProductionBatchStage = "brief" | "produce" | "research-review" | "media-review" | "seo-pass";

export type AvestaProductionBatch = {
  id: string;
  sectionSlug: string;
  sectionTitle: string;
  field: AvestaCompletionField;
  fieldLabel: string;
  title: string;
  owner: string;
  stage: AvestaProductionBatchStage;
  priority: "critical" | "high" | "medium";
  missingCount: number;
  dueDate: string;
  href: string;
  objective: string;
  acceptanceCriteria: string[];
};

export const avestaProductionStageLabels: Record<AvestaProductionBatchStage, string> = {
  brief: "Brief",
  produce: "تولید",
  "research-review": "بازبینی پژوهش",
  "media-review": "بازبینی رسانه",
  "seo-pass": "SEO Pass",
};

const dueDateByField: Record<AvestaCompletionField, string> = {
  originalText: "2026-06-18",
  transliteration: "2026-06-19",
  classicalTranslation: "2026-06-20",
  simpleRewrite: "2026-06-21",
  modernInterpretation: "2026-06-22",
  ethicalMessage: "2026-06-22",
  aiImage: "2026-06-24",
  audio: "2026-06-26",
  citation: "2026-06-23",
  seo: "2026-06-25",
  chapterGuide: "2026-06-24",
  chapterProfile: "2026-06-24",
  imageAlt: "2026-06-25",
};

const ownerByField: Record<AvestaCompletionField, string> = {
  originalText: "Content",
  transliteration: "Research",
  classicalTranslation: "Research",
  simpleRewrite: "Editorial",
  modernInterpretation: "Editorial + Research",
  ethicalMessage: "Product Content",
  aiImage: "Media AI",
  audio: "Audio",
  citation: "Research",
  seo: "SEO",
  chapterGuide: "Product + Design",
  chapterProfile: "Editorial + Research",
  imageAlt: "SEO + Accessibility",
};

const stageByField: Record<AvestaCompletionField, AvestaProductionBatchStage> = {
  originalText: "brief",
  transliteration: "research-review",
  classicalTranslation: "research-review",
  simpleRewrite: "produce",
  modernInterpretation: "research-review",
  ethicalMessage: "produce",
  aiImage: "media-review",
  audio: "media-review",
  citation: "research-review",
  seo: "seo-pass",
  chapterGuide: "media-review",
  chapterProfile: "research-review",
  imageAlt: "seo-pass",
};

export function getAvestaProductionBatches(sections: AvestaCompletionSection[] = getAvestaCompletionSections()): AvestaProductionBatch[] {
  return sections
    .flatMap((section) =>
      (Object.keys(avestaCompletionFieldLabels) as AvestaCompletionField[]).map((field) => {
        const missingCount = Math.max(section.target[field] - section.ready[field], 0);

        return {
          id: `${section.slug}-${field}`,
          sectionSlug: section.slug,
          sectionTitle: section.title,
          field,
          fieldLabel: avestaCompletionFieldLabels[field],
          title: `${avestaCompletionFieldLabels[field]} برای ${section.title}`,
          owner: ownerByField[field],
          stage: stageByField[field],
          priority: getPriority(section, field, missingCount),
          missingCount,
          dueDate: dueDateByField[field],
          href: getHref(section, field),
          objective: buildObjective(section, field, missingCount),
          acceptanceCriteria: buildAcceptanceCriteria(field),
        } satisfies AvestaProductionBatch;
      })
    )
    .filter((batch) => batch.missingCount > 0)
    .sort((a, b) => priorityWeight(b.priority) - priorityWeight(a.priority) || b.missingCount - a.missingCount);
}

export function getAvestaProductionBatchSummary(batches: AvestaProductionBatch[] = getAvestaProductionBatches()) {
  const byStage = Object.keys(avestaProductionStageLabels).map((stage) => ({
    stage: stage as AvestaProductionBatchStage,
    label: avestaProductionStageLabels[stage as AvestaProductionBatchStage],
    count: batches.filter((batch) => batch.stage === stage).length,
  }));

  return {
    total: batches.length,
    critical: batches.filter((batch) => batch.priority === "critical").length,
    high: batches.filter((batch) => batch.priority === "high").length,
    totalMissing: batches.reduce((sum, batch) => sum + batch.missingCount, 0),
    nextBatch: batches[0],
    byStage,
  };
}

function getPriority(section: AvestaCompletionSection, field: AvestaCompletionField, missingCount: number): AvestaProductionBatch["priority"] {
  if (section.priority === "critical" && (field === "originalText" || field === "classicalTranslation" || field === "simpleRewrite")) {
    return "critical";
  }

  if (field === "audio" && missingCount >= 15) {
    return "high";
  }

  if (section.priority === "high" || missingCount >= 20) {
    return "high";
  }

  return "medium";
}

function getHref(section: AvestaCompletionSection, field: AvestaCompletionField) {
  if (field === "aiImage" || field === "audio" || field === "chapterGuide") return "/admin/media";
  if (field === "chapterProfile") return "/admin/avesta";
  if (field === "imageAlt") return "/admin/visual-assets";
  if (field === "citation") return "/admin/source-review";
  if (field === "seo") return "/admin/seo";
  return section.href;
}

function buildObjective(section: AvestaCompletionSection, field: AvestaCompletionField, missingCount: number) {
  if (field === "aiImage") {
    return `تولید ${missingCount} تصویر اختصاصی برای ${section.title} با سبک Dark Luxury Persian Mythology.`;
  }

  if (field === "audio") {
    return `آماده‌سازی ${missingCount} فایل صوتی/نیایش برای تجربه شنیداری ${section.title}.`;
  }

  if (field === "citation") {
    return `ثبت و بازبینی ${missingCount} منبع قابل ردیابی برای ${section.title}.`;
  }

  if (field === "seo") {
    return `تکمیل metadata، internal links و schema برای ${section.title}.`;
  }

  if (field === "chapterGuide") {
    return `تکمیل راهنمای تصویری فصل‌های ${section.title}: پرسش محوری، قاب‌های روایی، CTA، تمرین روزانه و mood ثابت.`;
  }

  if (field === "chapterProfile") {
    return `تکمیل پروفایل آموزشی فصل‌های ${section.title}: زمینه تاریخی، زمینه آیینی، کلیدواژه‌ها و مسیرهای مرتبط.`;
  }

  if (field === "imageAlt") {
    return `نوشتن alt فارسی/انگلیسی و توضیح SEO برای تصویرهای فصل‌های ${section.title}.`;
  }

  return `تکمیل ${missingCount} آیتم ${avestaCompletionFieldLabels[field]} برای ${section.title} طبق سیستم محتوای طلایی.`;
}

function buildAcceptanceCriteria(field: AvestaCompletionField) {
  const shared = [
    "با لحن خردمندانه، مدرن و غیرخشک AVESTA-ZOROASTER سازگار باشد.",
    "برای موبایل، SEO و مسیر مطالعه قابل استفاده باشد.",
    "مالک بازبینی و وضعیت منبع/رسانه مشخص باشد.",
  ];

  if (field === "aiImage") {
    return [
      "تصویر فاقد watermark، متن تصادفی و عناصر مدرن نامرتبط باشد.",
      "نسخه hero و thumbnail قابل تحویل باشد.",
      ...shared,
    ];
  }

  if (field === "audio") {
    return [
      "فایل صوتی MP3، transcript کوتاه و metadata داشته باشد.",
      "کیفیت صدا برای حالت مطالعه شب مناسب باشد.",
      ...shared,
    ];
  }

  if (field === "citation") {
    return [
      "عنوان، نویسنده، زبان، نوع منبع و سطح اعتماد ثبت شود.",
      "هر منبع به بخش/بند مرتبط وصل شود.",
      ...shared,
    ];
  }

  if (field === "chapterGuide") {
    return [
      "هر فصل پرسش محوری، subtitle، leadQuote، sidePanels، storyPanels و todayPractice داشته باشد.",
      "تصویر و tone با mood همان بخش هماهنگ باشد.",
      ...shared,
    ];
  }

  if (field === "chapterProfile") {
    return [
      "هر فصل زمینه تاریخی، زمینه آیینی، keyThemes و relatedChapters داشته باشد.",
      "متن‌ها پژوهشی، قابل فهم و بدون placeholder باشند.",
      ...shared,
    ];
  }

  if (field === "imageAlt") {
    return [
      "برای هر تصویر alt فارسی و انگلیسی دقیق و غیرتزئینی ثبت شود.",
      "متن جایگزین با SEO، accessibility و موضوع صفحه هماهنگ باشد.",
      ...shared,
    ];
  }

  return [
    "خروجی با ساختار طلایی متن، ترجمه، بازنویسی، تحلیل و پیام اخلاقی سازگار باشد.",
    "برای ورود دسته‌ای به CMS آینده آماده باشد.",
    ...shared,
  ];
}

function priorityWeight(priority: AvestaProductionBatch["priority"]) {
  return priority === "critical" ? 3 : priority === "high" ? 2 : 1;
}
