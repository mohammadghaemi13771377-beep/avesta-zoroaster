import {
  getContentInventoryRealms,
  inventoryAssetLabels,
  type ContentInventoryRealm,
  type InventoryAssetType,
} from "@/lib/content-inventory";

export type ProductionQueueStage = "brief" | "production" | "review" | "upload" | "done";

export type ProductionQueueItem = {
  id: string;
  realmId: string;
  realmTitle: string;
  assetType: InventoryAssetType;
  title: string;
  owner: string;
  stage: ProductionQueueStage;
  priority: "high" | "medium" | "low";
  missingCount: number;
  dueDate: string;
  href: string;
  action: string;
};

export const productionStageLabels: Record<ProductionQueueStage, string> = {
  brief: "Brief",
  production: "تولید",
  review: "بازبینی",
  upload: "بارگذاری",
  done: "انجام‌شده",
};

const dueDateByAsset: Record<InventoryAssetType, string> = {
  text: "2026-06-18",
  image: "2026-06-20",
  audio: "2026-06-24",
  source: "2026-06-22",
  admin: "2026-06-28",
};

const actionByAsset: Record<InventoryAssetType, string> = {
  text: "متن نهایی، ترجمه، بازنویسی ساده و پیام اخلاقی را وارد کنید.",
  image: "brief تصویر AI، نسبت تصویر و فایل نهایی را آماده و بارگذاری کنید.",
  audio: "فایل روایت صوتی، metadata و اتصال به صفحه مقصد را آماده کنید.",
  source: "منبع، citation، نسخه و وضعیت تایید پژوهشی را ثبت کنید.",
  admin: "مدل، فرم، API یا تنظیمات ادمین باقی‌مانده را تکمیل کنید.",
};

const hrefByAsset: Record<InventoryAssetType, string> = {
  text: "/admin/avesta",
  image: "/admin/media",
  audio: "/admin/media",
  source: "/admin/library",
  admin: "/admin",
};

export function getProductionQueueItems(realms: ContentInventoryRealm[] = getContentInventoryRealms()): ProductionQueueItem[] {
  return realms
    .flatMap((realm) =>
      (Object.keys(inventoryAssetLabels) as InventoryAssetType[]).map((assetType) => {
        const missingCount = Math.max(realm.required[assetType] - realm.ready[assetType], 0);

        return {
          id: `${realm.realmId}-${assetType}`,
          realmId: realm.realmId,
          realmTitle: realm.title,
          assetType,
          title: `${inventoryAssetLabels[assetType]} برای ${realm.title}`,
          owner: getOwner(realm, assetType),
          stage: getStage(assetType, missingCount, realm.completion),
          priority: getPriority(realm, assetType, missingCount),
          missingCount,
          dueDate: dueDateByAsset[assetType],
          href: assetType === "admin" ? realm.href : hrefByAsset[assetType],
          action: actionByAsset[assetType],
        } satisfies ProductionQueueItem;
      })
    )
    .filter((item) => item.missingCount > 0)
    .sort((a, b) => priorityWeight(b.priority) - priorityWeight(a.priority) || b.missingCount - a.missingCount);
}

export function getProductionQueueSummary(items: ProductionQueueItem[] = getProductionQueueItems()) {
  const highPriority = items.filter((item) => item.priority === "high").length;
  const totalMissing = items.reduce((sum, item) => sum + item.missingCount, 0);
  const byStage = Object.keys(productionStageLabels).map((stage) => ({
    stage: stage as ProductionQueueStage,
    label: productionStageLabels[stage as ProductionQueueStage],
    count: items.filter((item) => item.stage === stage).length,
  }));

  return {
    total: items.length,
    highPriority,
    totalMissing,
    byStage,
    nextItem: items[0],
  };
}

function getOwner(realm: ContentInventoryRealm, assetType: InventoryAssetType) {
  if (assetType === "image" || assetType === "audio") {
    return "Media";
  }

  if (assetType === "source") {
    return "Research";
  }

  if (assetType === "admin") {
    return "Engineering";
  }

  return realm.owner;
}

function getStage(assetType: InventoryAssetType, missingCount: number, realmCompletion: number): ProductionQueueStage {
  if (missingCount === 0) {
    return "done";
  }

  if (assetType === "image" || assetType === "audio") {
    return realmCompletion > 70 ? "review" : "production";
  }

  if (assetType === "source") {
    return "review";
  }

  if (assetType === "admin") {
    return realmCompletion > 70 ? "upload" : "production";
  }

  return "brief";
}

function getPriority(realm: ContentInventoryRealm, assetType: InventoryAssetType, missingCount: number): ProductionQueueItem["priority"] {
  if (realm.priority === "high" && missingCount >= 20) {
    return "high";
  }

  if (assetType === "audio" && missingCount >= 10) {
    return "high";
  }

  if (missingCount >= 8) {
    return "medium";
  }

  return "low";
}

function priorityWeight(priority: ProductionQueueItem["priority"]) {
  return priority === "high" ? 3 : priority === "medium" ? 2 : 1;
}
