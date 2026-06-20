import { getAvestaSourcePacks, type AvestaSourcePack } from "@/lib/avesta-source-packs";
import { getCitationCoverageItems } from "@/lib/citation-coverage";
import { getSourceRegistryRecords } from "@/lib/source-registry";
import { getSourceReviewItems } from "@/lib/source-review";

export type SourceIntakeStatus = "ready" | "review" | "blocked";

export type SourceIntakeItem = {
  id: string;
  title: string;
  sectionSlug: string;
  href: string;
  status: SourceIntakeStatus;
  readiness: number;
  owner: string;
  verifiedCitations: number;
  pendingCitations: number;
  requiredSources: string[];
  requiredAssets: string[];
  blockers: string[];
  nextAction: string;
};

export const sourceIntakeStatusLabels: Record<SourceIntakeStatus, string> = {
  ready: "آماده ورود",
  review: "نیازمند بازبینی",
  blocked: "مسدود پژوهشی",
};

export function getSourceIntakeItems(packs: AvestaSourcePack[] = getAvestaSourcePacks()): SourceIntakeItem[] {
  const citationCoverage = getCitationCoverageItems();
  const registry = getSourceRegistryRecords();
  const reviewItems = getSourceReviewItems();

  return packs
    .map((pack) => {
      const coverage = citationCoverage.find((item) => item.slug === pack.sectionSlug);
      const relatedRegistry = registry.filter(
        (source) => source.coverage.includes(pack.sectionSlug) || source.coverage.includes("avesta"),
      );
      const sectionReviews = reviewItems.filter((item) => item.href.includes(`/avesta/${pack.sectionSlug}`));
      const blockers = resolveBlockers(pack, coverage?.missingSourceKinds ?? [], relatedRegistry.length, sectionReviews.length);
      const readiness = Math.max(
        0,
        Math.min(100, Math.round((pack.confidence + (coverage?.coverageScore ?? 0)) / 2 - blockers.length * 8)),
      );
      const status: SourceIntakeStatus = blockers.some((blocker) => blocker.includes("متن اصلی") || blocker.includes("Citation تاییدشده"))
        ? "blocked"
        : blockers.length > 0
          ? "review"
          : "ready";

      return {
        id: `source-intake-${pack.sectionSlug}`,
        title: pack.sectionTitle,
        sectionSlug: pack.sectionSlug,
        href: pack.href,
        status,
        readiness,
        owner: pack.owner,
        verifiedCitations: pack.verifiedCitations,
        pendingCitations: pack.pendingCitations,
        requiredSources: pack.requiredSources,
        requiredAssets: pack.requiredAssets,
        blockers,
        nextAction: blockers[0] ?? "بسته پژوهشی آماده ورود به CMS است؛ نسخه منبع و تاریخ بازبینی را در رکورد نهایی ثبت کنید.",
      };
    })
    .sort((a, b) => a.readiness - b.readiness);
}

export function getSourceIntakeSummary(items: SourceIntakeItem[] = getSourceIntakeItems()) {
  const nextItem = items[0];

  return {
    total: items.length,
    averageReadiness: Math.round(items.reduce((sum, item) => sum + item.readiness, 0) / Math.max(items.length, 1)),
    ready: items.filter((item) => item.status === "ready").length,
    review: items.filter((item) => item.status === "review").length,
    blocked: items.filter((item) => item.status === "blocked").length,
    pendingCitations: items.reduce((sum, item) => sum + item.pendingCitations, 0),
    nextItem,
  };
}

export function getSourceIntakeSnapshot() {
  const items = getSourceIntakeItems();

  return {
    generatedAt: new Date().toISOString(),
    source: "local-source-intake-hub",
    nextSource: "CMS-backed research sources, approvals, rights, source versions and asset storage",
    summary: getSourceIntakeSummary(items),
    items,
  };
}

function resolveBlockers(
  pack: AvestaSourcePack,
  missingSourceKinds: string[],
  registryCount: number,
  reviewCount: number,
) {
  const blockers: string[] = [];

  if (pack.verifiedCitations === 0) {
    blockers.push("حداقل یک Citation تاییدشده برای متن اصلی باید ثبت شود.");
  }

  if (missingSourceKinds.includes("primary-text")) {
    blockers.push("منبع متن اصلی و شماره دقیق فصل/بند هنوز کامل نیست.");
  }

  if (missingSourceKinds.length > 0) {
    blockers.push(`انواع منبع ناقص است: ${missingSourceKinds.join("، ")}.`);
  }

  if (registryCount === 0) {
    blockers.push("این بخش باید به یک رکورد رسمی در رجیستری منابع وصل شود.");
  }

  if (reviewCount === 0) {
    blockers.push("رکورد بازبینی پژوهشی برای این بخش هنوز ساخته نشده است.");
  }

  if (pack.pendingCitations > 0) {
    blockers.push(`${pack.pendingCitations} Citation هنوز در صف بازبینی یا تکمیل است.`);
  }

  return blockers;
}
