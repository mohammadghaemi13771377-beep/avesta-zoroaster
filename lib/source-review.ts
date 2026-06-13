import { getCitationRecords, type CitationRecord } from "@/lib/citations";
import { getTrustRecords, type TrustRecord } from "@/lib/trust-center";

export type SourceReviewRisk = "low" | "medium" | "high";

export type SourceReviewItem = {
  id: string;
  title: string;
  href: string;
  type: TrustRecord["type"];
  confidence: number;
  risk: SourceReviewRisk;
  owner: string;
  dueDate: string;
  citationCount: number;
  verifiedCitationCount: number;
  pendingCitationCount: number;
  sourceStatus: string;
  reviewStatus: string;
  nextAction: string;
  references: string[];
};

export const sourceReviewRiskLabels: Record<SourceReviewRisk, string> = {
  low: "ریسک پایین",
  medium: "ریسک متوسط",
  high: "ریسک بالا",
};

export const sourceReviewRiskTone: Record<SourceReviewRisk, string> = {
  low: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  medium: "border-gold/25 bg-gold/10 text-gold-light",
  high: "border-orange-300/25 bg-orange-300/10 text-orange-100",
};

const ownerByType: Record<TrustRecord["type"], string> = {
  verse: "تیم پژوهش اوستا",
  article: "تیم تحریریه",
  glossary: "تیم واژه‌نامه",
  library: "تیم کتابخانه",
  media: "تیم رسانه",
};

const dueDateByRisk: Record<SourceReviewRisk, string> = {
  high: "2026-06-18",
  medium: "2026-06-25",
  low: "2026-07-05",
};

export function getSourceReviewItems(
  trustRecords: TrustRecord[] = getTrustRecords(),
  citations: CitationRecord[] = getCitationRecords(),
): SourceReviewItem[] {
  return trustRecords
    .map((record) => {
      const relatedCitations = citations.filter((citation) => citation.targetHref === record.href);
      const verifiedCitationCount = relatedCitations.filter((citation) => citation.status === "verified").length;
      const pendingCitationCount = relatedCitations.filter((citation) => citation.status !== "verified").length;
      const risk = calculateRisk(record, relatedCitations);

      return {
        id: `source-review-${record.id}`,
        title: record.title,
        href: record.href,
        type: record.type,
        confidence: record.confidence,
        risk,
        owner: ownerByType[record.type],
        dueDate: dueDateByRisk[risk],
        citationCount: relatedCitations.length,
        verifiedCitationCount,
        pendingCitationCount,
        sourceStatus: record.sourceStatus,
        reviewStatus: record.reviewStatus,
        nextAction: buildNextAction(record, relatedCitations),
        references: record.references,
      };
    })
    .sort((a, b) => riskWeight(b.risk) - riskWeight(a.risk) || a.confidence - b.confidence);
}

export function getSourceReviewSummary(items: SourceReviewItem[] = getSourceReviewItems()) {
  const averageConfidence = Math.round(items.reduce((sum, item) => sum + item.confidence, 0) / items.length);

  return {
    total: items.length,
    averageConfidence,
    highRisk: items.filter((item) => item.risk === "high").length,
    mediumRisk: items.filter((item) => item.risk === "medium").length,
    lowRisk: items.filter((item) => item.risk === "low").length,
    pendingCitations: items.reduce((sum, item) => sum + item.pendingCitationCount, 0),
    verifiedCitations: items.reduce((sum, item) => sum + item.verifiedCitationCount, 0),
  };
}

function calculateRisk(record: TrustRecord, citations: CitationRecord[]): SourceReviewRisk {
  const hasVerifiedCitation = citations.some((citation) => citation.status === "verified");

  if (record.confidence < 76 || record.trustLevel === "draft" || citations.length === 0) {
    return "high";
  }

  if (record.confidence < 84 || !hasVerifiedCitation || record.trustLevel === "editorial") {
    return "medium";
  }

  return "low";
}

function buildNextAction(record: TrustRecord, citations: CitationRecord[]) {
  if (citations.length === 0) {
    return "حداقل یک citation کتابخانه‌ای یا یادداشت تحریریه برای این محتوا ثبت شود.";
  }

  if (!citations.some((citation) => citation.status === "verified")) {
    return "یکی از citationهای موجود باید با منبع نهایی تایید و از حالت planned/needs-review خارج شود.";
  }

  if (record.confidence < 84) {
    return "پس از تایید منبع، متن توضیحی و یادداشت اعتماد را با جزئیات دقیق‌تر تکمیل کنید.";
  }

  return "برای انتشار آماده است؛ فقط تاریخچه ویرایش و نسخه منبع در production ثبت شود.";
}

function riskWeight(risk: SourceReviewRisk) {
  return risk === "high" ? 3 : risk === "medium" ? 2 : 1;
}
