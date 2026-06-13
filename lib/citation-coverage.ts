import { avestaSections } from "@/lib/content";
import { getCitationRecords, type CitationRecord, type CitationStatus } from "@/lib/citations";
import { getSourceRegistryRecords } from "@/lib/source-registry";

export type CitationCoverageRisk = "low" | "medium" | "high";

export type CitationCoverageItem = {
  id: string;
  title: string;
  slug: string;
  href: string;
  total: number;
  verified: number;
  needsReview: number;
  planned: number;
  coverageScore: number;
  risk: CitationCoverageRisk;
  linkedRegistrySources: number;
  missingSourceKinds: string[];
  nextAction: string;
  records: CitationRecord[];
};

export const citationCoverageRiskLabels: Record<CitationCoverageRisk, string> = {
  low: "پوشش قابل قبول",
  medium: "نیازمند تکمیل",
  high: "ریسک منبع بالا",
};

export const citationCoverageRiskTone: Record<CitationCoverageRisk, string> = {
  low: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  medium: "border-gold/25 bg-gold/10 text-gold-light",
  high: "border-orange-300/25 bg-orange-300/10 text-orange-100",
};

const requiredTypesBySection: Record<string, CitationRecord["citationType"][]> = {
  yasna: ["primary-text", "translation", "commentary"],
  gathas: ["primary-text", "translation", "commentary"],
  visperad: ["primary-text", "translation", "commentary"],
  vendidad: ["primary-text", "commentary", "editorial-note"],
  yashts: ["primary-text", "commentary", "editorial-note"],
  "khordeh-avesta": ["primary-text", "translation", "commentary"],
  hats: ["primary-text", "library", "editorial-note"],
};

export function getCitationCoverageItems(citations: CitationRecord[] = getCitationRecords()): CitationCoverageItem[] {
  const sourceRegistry = getSourceRegistryRecords();

  return avestaSections.map((section) => {
    const records = citations.filter((citation) => citation.targetHref.includes(`/avesta/${section.slug}`));
    const statusCount = countStatuses(records);
    const linkedRegistrySources = sourceRegistry.filter((source) =>
      source.coverage.includes(section.slug) || source.coverage.includes("avesta"),
    ).length;
    const missingSourceKinds = resolveMissingKinds(section.slug, records);
    const coverageScore = calculateCoverageScore(statusCount, linkedRegistrySources, missingSourceKinds.length);
    const risk = resolveRisk(coverageScore, statusCount.verified, missingSourceKinds.length);

    return {
      id: `citation-coverage-${section.slug}`,
      title: section.title,
      slug: section.slug,
      href: section.href,
      total: records.length,
      verified: statusCount.verified,
      needsReview: statusCount["needs-review"],
      planned: statusCount.planned,
      coverageScore,
      risk,
      linkedRegistrySources,
      missingSourceKinds,
      nextAction: buildNextAction(section.slug, statusCount, missingSourceKinds),
      records,
    };
  }).sort((a, b) => a.coverageScore - b.coverageScore);
}

export function getCitationCoverageSummary(items: CitationCoverageItem[] = getCitationCoverageItems()) {
  const averageScore = Math.round(items.reduce((sum, item) => sum + item.coverageScore, 0) / items.length);

  return {
    totalSections: items.length,
    averageScore,
    highRisk: items.filter((item) => item.risk === "high").length,
    mediumRisk: items.filter((item) => item.risk === "medium").length,
    lowRisk: items.filter((item) => item.risk === "low").length,
    verified: items.reduce((sum, item) => sum + item.verified, 0),
    pending: items.reduce((sum, item) => sum + item.needsReview + item.planned, 0),
  };
}

export function buildCitationCoverageCsv(items: CitationCoverageItem[] = getCitationCoverageItems()) {
  const headers = [
    "slug",
    "title",
    "coverageScore",
    "risk",
    "total",
    "verified",
    "needsReview",
    "planned",
    "linkedRegistrySources",
    "missingSourceKinds",
    "nextAction",
  ];

  return [
    headers.join(","),
    ...items.map((item) =>
      [
        item.slug,
        item.title,
        item.coverageScore,
        item.risk,
        item.total,
        item.verified,
        item.needsReview,
        item.planned,
        item.linkedRegistrySources,
        item.missingSourceKinds.join(" | "),
        item.nextAction,
      ].map((value) => escapeCsvCell(String(value))).join(","),
    ),
  ].join("\n");
}

function countStatuses(records: CitationRecord[]): Record<CitationStatus, number> {
  return {
    verified: records.filter((record) => record.status === "verified").length,
    "needs-review": records.filter((record) => record.status === "needs-review").length,
    planned: records.filter((record) => record.status === "planned").length,
  };
}

function resolveMissingKinds(sectionSlug: string, records: CitationRecord[]) {
  const requiredKinds = requiredTypesBySection[sectionSlug] ?? ["primary-text", "translation", "commentary"];
  const existingKinds = new Set(records.map((record) => record.citationType));

  return requiredKinds.filter((kind) => !existingKinds.has(kind));
}

function calculateCoverageScore(statusCount: Record<CitationStatus, number>, linkedRegistrySources: number, missingKindCount: number) {
  const verifiedScore = statusCount.verified * 28;
  const reviewScore = statusCount["needs-review"] * 12;
  const plannedScore = statusCount.planned * 6;
  const registryScore = Math.min(linkedRegistrySources * 6, 24);
  const penalty = missingKindCount * 14;

  return Math.max(0, Math.min(100, verifiedScore + reviewScore + plannedScore + registryScore - penalty));
}

function resolveRisk(score: number, verified: number, missingKindCount: number): CitationCoverageRisk {
  if (score < 45 || verified === 0 || missingKindCount >= 2) {
    return "high";
  }

  if (score < 75 || missingKindCount > 0) {
    return "medium";
  }

  return "low";
}

function buildNextAction(sectionSlug: string, statusCount: Record<CitationStatus, number>, missingKinds: string[]) {
  if (missingKinds.includes("primary-text")) {
    return "اول متن اصلی و شماره دقیق بند را از رجیستری منابع به citation وصل کنید.";
  }

  if (statusCount.verified === 0) {
    return "حداقل یک citation را از planned/needs-review به verified برسانید.";
  }

  if (missingKinds.length > 0) {
    return `نوع منبع کم است: ${missingKinds.join("، ")} باید تکمیل شود.`;
  }

  if (sectionSlug === "vendidad") {
    return "یادداشت حساسیت تفسیری و زمینه تاریخی را کنار citation تاییدشده نمایش دهید.";
  }

  return "پوشش ارجاع قابل قبول است؛ فقط نسخه منبع و تاریخ بازبینی را در CMS ثبت کنید.";
}

function escapeCsvCell(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}
