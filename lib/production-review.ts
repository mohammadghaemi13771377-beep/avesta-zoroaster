import { inventoryAssetLabels, type InventoryAssetType } from "@/lib/content-inventory";
import { getProductionBriefs, type ProductionBrief } from "@/lib/production-briefs";

export type ProductionReviewStatus = "approved" | "changes_requested" | "blocked";

export type ProductionReviewItem = {
  id: string;
  briefId: string;
  title: string;
  assetType: InventoryAssetType;
  realmTitle: string;
  reviewer: string;
  status: ProductionReviewStatus;
  qualityScore: number;
  publishDecision: string;
  issues: string[];
  requiredFix: string;
};

export const productionReviewStatusLabels: Record<ProductionReviewStatus, string> = {
  approved: "تایید شده",
  changes_requested: "نیازمند اصلاح",
  blocked: "مسدود",
};

export function getProductionReviewItems(briefs: ProductionBrief[] = getProductionBriefs()): ProductionReviewItem[] {
  return briefs.map((brief, index) => ({
    id: `review-${brief.id}`,
    briefId: brief.id,
    title: `Review: ${brief.title}`,
    assetType: brief.assetType,
    realmTitle: brief.realmTitle,
    reviewer: getReviewer(brief.assetType),
    status: getStatus(brief, index),
    qualityScore: getQualityScore(brief, index),
    publishDecision: getPublishDecision(brief, index),
    issues: getIssues(brief, index),
    requiredFix: getRequiredFix(brief),
  }));
}

export function getProductionReviewSummary(items: ProductionReviewItem[] = getProductionReviewItems()) {
  const averageScore = Math.round(items.reduce((sum, item) => sum + item.qualityScore, 0) / Math.max(items.length, 1));

  return {
    total: items.length,
    approved: items.filter((item) => item.status === "approved").length,
    changesRequested: items.filter((item) => item.status === "changes_requested").length,
    blocked: items.filter((item) => item.status === "blocked").length,
    averageScore,
    nextReview: [...items].sort((a, b) => a.qualityScore - b.qualityScore)[0],
  };
}

function getReviewer(assetType: InventoryAssetType) {
  if (assetType === "image" || assetType === "audio") {
    return "Creative Lead";
  }

  if (assetType === "source") {
    return "Research Lead";
  }

  if (assetType === "admin") {
    return "Engineering Lead";
  }

  return "Editorial Lead";
}

function getStatus(brief: ProductionBrief, index: number): ProductionReviewStatus {
  if (brief.assetType === "image" && !brief.prompt) {
    return "blocked";
  }

  if (index % 5 === 0) {
    return "approved";
  }

  if (brief.assetType === "source" || brief.assetType === "audio") {
    return "changes_requested";
  }

  return index % 4 === 0 ? "blocked" : "changes_requested";
}

function getQualityScore(brief: ProductionBrief, index: number) {
  const baseByAsset: Record<InventoryAssetType, number> = {
    text: 72,
    image: brief.prompt ? 78 : 45,
    audio: 66,
    source: 68,
    admin: 74,
  };

  return Math.max(38, Math.min(94, baseByAsset[brief.assetType] + ((index % 4) - 1) * 5));
}

function getPublishDecision(brief: ProductionBrief, index: number) {
  const status = getStatus(brief, index);

  if (status === "approved") {
    return "قابل ورود به CMS یا Media پس از ثبت نسخه نهایی.";
  }

  if (status === "blocked") {
    return "فعلاً وارد سایت نشود؛ blocker باید قبل از انتشار رفع شود.";
  }

  return "بعد از اصلاح و بازبینی دوم قابل ورود به صف انتشار است.";
}

function getIssues(brief: ProductionBrief, index: number) {
  const common = ["ثبت نسخه نهایی و نام فایل/مسیر مقصد هنوز قطعی نیست."];

  if (brief.assetType === "image") {
    return brief.prompt
      ? ["thumbnail موبایل و desktop باید جداگانه کنترل شود.", ...common]
      : ["prompt تصویری ناقص است و باید brief دقیق‌تری تولید شود.", ...common];
  }

  if (brief.assetType === "audio") {
    return ["کیفیت صدا، transcript و مدت زمان باید قبل از upload تایید شود.", ...common];
  }

  if (brief.assetType === "source") {
    return ["سطح اعتماد، صفحه/نسخه منبع و وضعیت حق نشر باید کامل شود.", ...common];
  }

  if (brief.assetType === "admin") {
    return ["سناریوی تست و permission دقیق مسیر ادمین باید ثبت شود.", ...common];
  }

  return ["SEO title، description و citation باید قبل از انتشار تکمیل شود.", ...common];
}

function getRequiredFix(brief: ProductionBrief) {
  return `${inventoryAssetLabels[brief.assetType]} ${brief.realmTitle} را با معیار پذیرش brief تطبیق دهید و نسخه نهایی را برای بازبینی دوم ثبت کنید.`;
}
