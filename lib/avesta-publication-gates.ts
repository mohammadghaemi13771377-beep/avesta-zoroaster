import { getAvestaCompletionSections } from "@/lib/avesta-completion";
import { getCitationCoverageItems } from "@/lib/citation-coverage";
import { getPageQualityItems } from "@/lib/page-quality";

export type AvestaPublicationGateStatus = "publish" | "hold" | "block";

export type AvestaPublicationGate = {
  id: string;
  title: string;
  slug: string;
  href: string;
  status: AvestaPublicationGateStatus;
  score: number;
  owner: string;
  blockers: string[];
  warnings: string[];
  evidence: {
    contentCompletion: number;
    citationCoverage: number;
    pageQuality: number;
    verifiedCitations: number;
    pendingCitations: number;
  };
  checklist: string[];
  nextAction: string;
};

export const avestaPublicationGateStatusLabels: Record<AvestaPublicationGateStatus, string> = {
  publish: "قابل انتشار",
  hold: "نگه‌دار برای تکمیل",
  block: "مانع انتشار",
};

export const avestaPublicationGateStatusTone: Record<AvestaPublicationGateStatus, string> = {
  publish: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  hold: "border-gold/25 bg-gold/10 text-gold-light",
  block: "border-orange-300/25 bg-orange-300/10 text-orange-100",
};

export function getAvestaPublicationGates(): AvestaPublicationGate[] {
  const completionSections = getAvestaCompletionSections();
  const citationItems = getCitationCoverageItems();
  const pageQualityItems = getPageQualityItems();

  return completionSections
    .map((section) => {
      const citation = citationItems.find((item) => item.slug === section.slug);
      const pageQuality = pageQualityItems.find((item) => item.route === section.href);
      const contentCompletion = section.completion;
      const citationCoverage = citation?.coverageScore ?? 0;
      const pageQualityScore = pageQuality?.score ?? 50;
      const verifiedCitations = citation?.verified ?? 0;
      const pendingCitations = (citation?.needsReview ?? 0) + (citation?.planned ?? 0);
      const score = Math.round(contentCompletion * 0.44 + citationCoverage * 0.34 + pageQualityScore * 0.22);
      const blockers = buildBlockers(contentCompletion, citationCoverage, pageQualityScore, verifiedCitations);
      const warnings = buildWarnings(section.slug, pendingCitations, citation?.missingSourceKinds ?? [], pageQualityScore);
      const status = resolveStatus(score, blockers.length, warnings.length);

      return {
        id: `avesta-publication-gate-${section.slug}`,
        title: section.title,
        slug: section.slug,
        href: section.href,
        status,
        score,
        owner: section.owner,
        blockers,
        warnings,
        evidence: {
          contentCompletion,
          citationCoverage,
          pageQuality: pageQualityScore,
          verifiedCitations,
          pendingCitations,
        },
        checklist: buildChecklist(section.slug, contentCompletion, citationCoverage, pageQualityScore),
        nextAction: buildNextAction(status, blockers, warnings, section.nextAction),
      };
    })
    .sort((a, b) => statusWeight(b.status) - statusWeight(a.status) || a.score - b.score);
}

export function getAvestaPublicationGateSummary(gates: AvestaPublicationGate[] = getAvestaPublicationGates()) {
  const averageScore = Math.round(gates.reduce((sum, gate) => sum + gate.score, 0) / gates.length);

  return {
    total: gates.length,
    averageScore,
    publish: gates.filter((gate) => gate.status === "publish").length,
    hold: gates.filter((gate) => gate.status === "hold").length,
    block: gates.filter((gate) => gate.status === "block").length,
    nextBlocker: gates.find((gate) => gate.status === "block") ?? gates.find((gate) => gate.status === "hold") ?? gates[0],
  };
}

export function buildAvestaPublicationGateCsv(gates: AvestaPublicationGate[] = getAvestaPublicationGates()) {
  const headers = [
    "slug",
    "title",
    "status",
    "score",
    "owner",
    "contentCompletion",
    "citationCoverage",
    "pageQuality",
    "verifiedCitations",
    "pendingCitations",
    "blockers",
    "warnings",
    "nextAction",
  ];

  return [
    headers.join(","),
    ...gates.map((gate) =>
      [
        gate.slug,
        gate.title,
        gate.status,
        gate.score,
        gate.owner,
        gate.evidence.contentCompletion,
        gate.evidence.citationCoverage,
        gate.evidence.pageQuality,
        gate.evidence.verifiedCitations,
        gate.evidence.pendingCitations,
        gate.blockers.join(" | "),
        gate.warnings.join(" | "),
        gate.nextAction,
      ].map((value) => escapeCsvCell(String(value))).join(","),
    ),
  ].join("\n");
}

function buildBlockers(contentCompletion: number, citationCoverage: number, pageQualityScore: number, verifiedCitations: number) {
  const blockers: string[] = [];

  if (contentCompletion < 35) {
    blockers.push("سیستم محتوای طلایی هنوز کمتر از حد انتشار است.");
  }

  if (citationCoverage < 45 || verifiedCitations === 0) {
    blockers.push("حداقل یک citation تاییدشده و پوشش منبع قابل قبول لازم است.");
  }

  if (pageQualityScore < 58) {
    blockers.push("کیفیت صفحه برای انتشار عمومی پایین است.");
  }

  return blockers;
}

function buildWarnings(sectionSlug: string, pendingCitations: number, missingSourceKinds: string[], pageQualityScore: number) {
  const warnings: string[] = [];

  if (pendingCitations > 0) {
    warnings.push(`${pendingCitations} citation هنوز نهایی نشده است.`);
  }

  if (missingSourceKinds.length > 0) {
    warnings.push(`نوع منبع کم است: ${missingSourceKinds.join("، ")}`);
  }

  if (pageQualityScore < 75) {
    warnings.push("SEO، رسانه یا موبایل باید قبل از لانچ نهایی بازبینی شود.");
  }

  if (sectionSlug === "vendidad") {
    warnings.push("وندیداد نیازمند یادداشت زمینه تاریخی و حساسیت تفسیری است.");
  }

  return warnings;
}

function buildChecklist(sectionSlug: string, contentCompletion: number, citationCoverage: number, pageQualityScore: number) {
  return [
    contentCompletion >= 60 ? "متن، ترجمه، بازنویسی و تحلیل برای انتشار اولیه کافی است." : "متن، ترجمه، بازنویسی و تحلیل باید تکمیل شود.",
    citationCoverage >= 70 ? "پوشش citation قابل قبول است." : "citationهای اصلی باید به رجیستری منابع وصل شوند.",
    pageQualityScore >= 75 ? "کیفیت صفحه برای QA نهایی آماده است." : "کیفیت صفحه، رسانه یا SEO نیازمند کار است.",
    sectionSlug === "gathas" ? "برای گات‌ها اختلاف ترجمه و یادداشت مفهومی ثبت شود." : "یادداشت تحریریه و مسیر مطالعه ثبت شود.",
  ];
}

function resolveStatus(score: number, blockerCount: number, warningCount: number): AvestaPublicationGateStatus {
  if (blockerCount > 0 || score < 52) {
    return "block";
  }

  if (warningCount > 0 || score < 78) {
    return "hold";
  }

  return "publish";
}

function buildNextAction(status: AvestaPublicationGateStatus, blockers: string[], warnings: string[], fallback: string) {
  if (status === "block") {
    return blockers[0] ?? fallback;
  }

  if (status === "hold") {
    return warnings[0] ?? fallback;
  }

  return "برای انتشار مرحله‌ای آماده است؛ فقط تایید نهایی سردبیر و QA موبایل انجام شود.";
}

function statusWeight(status: AvestaPublicationGateStatus) {
  return status === "block" ? 3 : status === "hold" ? 2 : 1;
}

function escapeCsvCell(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}
