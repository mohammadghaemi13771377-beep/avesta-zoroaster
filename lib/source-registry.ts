import { libraryItems } from "@/lib/sample-content";

export type SourceRegistryKind = "primary-text" | "translation" | "commentary" | "glossary" | "archive" | "editorial";
export type SourceRegistryStatus = "approved" | "needs-review" | "planned";

export type SourceRegistryRecord = {
  id: string;
  title: string;
  kind: SourceRegistryKind;
  status: SourceRegistryStatus;
  author: string;
  language: string;
  coverage: string[];
  priority: number;
  confidence: number;
  citationPolicy: string;
  usageNote: string;
  href: string;
  owner: string;
  updatedAt: string;
};

export const sourceRegistryKindLabels: Record<SourceRegistryKind, string> = {
  "primary-text": "متن اصلی",
  translation: "ترجمه",
  commentary: "شرح و تحلیل",
  glossary: "واژه‌نامه",
  archive: "آرشیو",
  editorial: "تحریریه",
};

export const sourceRegistryStatusLabels: Record<SourceRegistryStatus, string> = {
  approved: "تایید شده",
  "needs-review": "نیازمند بازبینی",
  planned: "برنامه‌ریزی شده",
};

export const sourceRegistryStatusTone: Record<SourceRegistryStatus, string> = {
  approved: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  "needs-review": "border-gold/25 bg-gold/10 text-gold-light",
  planned: "border-orange-300/25 bg-orange-300/10 text-orange-100",
};

const canonicalSources: SourceRegistryRecord[] = [
  {
    id: "source-avesta-primary-text",
    title: "متن اوستایی نهایی پروژه",
    kind: "primary-text",
    status: "planned",
    author: "تیم پژوهش AVESTA-ZOROASTER",
    language: "Avestan / FA",
    coverage: ["yasna", "gathas", "visperad", "vendidad", "yashts", "khordeh-avesta", "hats"],
    priority: 1,
    confidence: 62,
    citationPolicy: "برای هر بند باید شماره بخش، فصل/هات، بند و نسخه منبع ثبت شود.",
    usageNote: "تا قبل از ورود نسخه نهایی، فقط در حالت draft یا dry-run استفاده شود.",
    href: "/admin/import",
    owner: "تیم پژوهش اوستا",
    updatedAt: "2026-06-08",
  },
  {
    id: "source-gathas-translation",
    title: "ترجمه تطبیقی گات‌ها",
    kind: "translation",
    status: "needs-review",
    author: "تیم پژوهش گات‌ها",
    language: "FA / EN",
    coverage: ["gathas"],
    priority: 2,
    confidence: 74,
    citationPolicy: "هر ترجمه باید با متن گاهانی و یادداشت اختلاف ترجمه همراه باشد.",
    usageNote: "برای بازنویسی ساده و پیام اخلاقی گات‌ها استفاده شود، اما قبل از انتشار بازبینی شود.",
    href: "/admin/avesta-source-packs",
    owner: "تیم پژوهش گات‌ها",
    updatedAt: "2026-06-08",
  },
  {
    id: "source-editorial-notes",
    title: "یادداشت‌های تحریریه و زمینه تاریخی",
    kind: "editorial",
    status: "needs-review",
    author: "تحریریه AVESTA-ZOROASTER",
    language: "فارسی",
    coverage: ["vendidad", "yashts", "zoroastrianism", "monotheism"],
    priority: 3,
    confidence: 78,
    citationPolicy: "یادداشت تحریریه باید از citation پژوهشی جدا باشد و در UI به عنوان تحلیل پروژه نمایش داده شود.",
    usageNote: "برای توضیح زمینه حساس، برداشت امروزی و پرهیز از برداشت قطعی بدون منبع استفاده شود.",
    href: "/admin/source-review",
    owner: "تیم تحریریه",
    updatedAt: "2026-06-08",
  },
];

export function getSourceRegistryRecords(): SourceRegistryRecord[] {
  const librarySources: SourceRegistryRecord[] = libraryItems.map((item, index) => ({
    id: `source-library-${index + 1}`,
    title: item.title,
    kind: item.type === "PDF" ? "commentary" : item.type === "Glossary" ? "glossary" : "archive",
    status: item.type === "PDF" ? "approved" : "planned",
    author: item.author,
    language: item.language,
    coverage: resolveCoverage(item.category, item.title),
    priority: index + 4,
    confidence: item.type === "PDF" ? 86 : 68,
    citationPolicy: "برای استفاده در citation باید نسخه، ناشر، سال انتشار و لینک فایل نهایی تکمیل شود.",
    usageNote: item.description,
    href: item.href,
    owner: item.type === "Glossary" ? "تیم واژه‌نامه" : "تیم کتابخانه",
    updatedAt: "2026-06-08",
  }));

  return [...canonicalSources, ...librarySources].sort((a, b) => a.priority - b.priority);
}

export function getSourceRegistrySummary(records: SourceRegistryRecord[] = getSourceRegistryRecords()) {
  const averageConfidence = Math.round(records.reduce((sum, record) => sum + record.confidence, 0) / records.length);

  return {
    total: records.length,
    averageConfidence,
    approved: records.filter((record) => record.status === "approved").length,
    needsReview: records.filter((record) => record.status === "needs-review").length,
    planned: records.filter((record) => record.status === "planned").length,
    primaryText: records.filter((record) => record.kind === "primary-text").length,
  };
}

export function buildSourceRegistryCsv(records: SourceRegistryRecord[] = getSourceRegistryRecords()) {
  const headers: Array<keyof SourceRegistryRecord> = [
    "id",
    "title",
    "kind",
    "status",
    "author",
    "language",
    "priority",
    "confidence",
    "owner",
    "updatedAt",
    "href",
  ];

  return [
    headers.join(","),
    ...records.map((record) => headers.map((header) => escapeCsvCell(String(record[header] ?? ""))).join(",")),
  ].join("\n");
}

export function buildSourceRegistryBib(records: SourceRegistryRecord[] = getSourceRegistryRecords()) {
  return records
    .map((record) => {
      const key = record.id.replace(/^source-/, "");

      return [
        `@misc{${key},`,
        `  title = {${record.title}},`,
        `  author = {${record.author}},`,
        `  language = {${record.language}},`,
        `  note = {${record.usageNote}},`,
        `  url = {${record.href}},`,
        `}`,
      ].join("\n");
    })
    .join("\n\n");
}

function resolveCoverage(category: string, title: string) {
  const value = `${category} ${title}`.toLowerCase();

  if (value.includes("گات") || value.includes("gatha")) {
    return ["gathas"];
  }

  if (value.includes("واژه") || value.includes("glossary")) {
    return ["dictionary", "glossary"];
  }

  if (value.includes("نسخه") || value.includes("archive")) {
    return ["library", "archive"];
  }

  return ["avesta", "library"];
}

function escapeCsvCell(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}
