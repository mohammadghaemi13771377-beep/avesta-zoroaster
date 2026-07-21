import { getContentInventoryRealms, getContentInventorySummary, type ContentInventoryRealm } from "@/lib/content-inventory";
import { getProductionQueueItems, getProductionQueueSummary, type ProductionQueueItem } from "@/lib/production-queue";

export type ContentOperationWave = {
  id: string;
  title: string;
  focus: string;
  owner: string;
  priority: "high" | "medium" | "low";
  target: string;
  tasks: ProductionQueueItem[];
  href: string;
};

export type ContentOperationsPlan = {
  generatedAt: string;
  summary: {
    realms: number;
    inventoryCompletion: number;
    totalMissingAssets: number;
    activeTasks: number;
    highPriorityTasks: number;
    topRiskRealm: ContentInventoryRealm;
  };
  waves: ContentOperationWave[];
  ownerLoad: Array<{
    owner: string;
    tasks: number;
    missingAssets: number;
    highPriority: number;
  }>;
  recommendations: string[];
};

const waveDefinitions: Array<{
  id: string;
  title: string;
  focus: string;
  owner: string;
  target: string;
  href: string;
  assetTypes: ProductionQueueItem["assetType"][];
}> = [
  {
    id: "wave-avesta-text-source",
    title: "موج متن و منبع اوستا",
    focus: "تکمیل متن، ترجمه، بازنویسی ساده، citation و یادداشت پژوهشی برای هسته اوستا.",
    owner: "Content + Research",
    target: "اولویت با یسنا، گات‌ها، وندیداد و واژه‌نامه پایه.",
    href: "/admin/avesta-production",
    assetTypes: ["text", "source"],
  },
  {
    id: "wave-media-assets",
    title: "موج تصویر و صوت",
    focus: "تولید و بارگذاری hero، thumbnail، تصویر فصل، فایل صوتی و metadata رسانه‌ای.",
    owner: "Media",
    target: "هر صفحه کلیدی باید تصویر واقعی، alt و وضعیت استفاده داشته باشد.",
    href: "/admin/visual-assets",
    assetTypes: ["image", "audio"],
  },
  {
    id: "wave-admin-infra",
    title: "موج زیرساخت ادمین و انتشار",
    focus: "کامل کردن فرم‌ها، APIها، نقش‌ها، audit، import و مسیر publish برای محتوای واقعی.",
    owner: "Engineering",
    target: "هر نوع محتوا باید draft، review و published داشته باشد.",
    href: "/admin/publish-pipeline",
    assetTypes: ["admin"],
  },
];

export function getContentOperationsPlan(): ContentOperationsPlan {
  const realms = getContentInventoryRealms();
  const inventorySummary = getContentInventorySummary(realms);
  const queueItems = getProductionQueueItems(realms);
  const queueSummary = getProductionQueueSummary(queueItems);
  const waves = buildWaves(queueItems);

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      realms: inventorySummary.realms,
      inventoryCompletion: inventorySummary.completion,
      totalMissingAssets: inventorySummary.remaining,
      activeTasks: queueSummary.total,
      highPriorityTasks: queueSummary.highPriority,
      topRiskRealm: inventorySummary.nextRealm,
    },
    waves,
    ownerLoad: buildOwnerLoad(queueItems),
    recommendations: buildRecommendations(inventorySummary.nextRealm, queueSummary.nextItem),
  };
}

function buildWaves(items: ProductionQueueItem[]): ContentOperationWave[] {
  return waveDefinitions.map((wave) => {
    const tasks = items
      .filter((item) => wave.assetTypes.includes(item.assetType))
      .sort((a, b) => priorityWeight(b.priority) - priorityWeight(a.priority) || b.missingCount - a.missingCount)
      .slice(0, 6);

    return {
      ...wave,
      priority: tasks.some((task) => task.priority === "high") ? "high" : tasks.some((task) => task.priority === "medium") ? "medium" : "low",
      tasks,
    };
  });
}

function buildOwnerLoad(items: ProductionQueueItem[]) {
  const owners = new Map<string, { owner: string; tasks: number; missingAssets: number; highPriority: number }>();

  for (const item of items) {
    const current = owners.get(item.owner) ?? { owner: item.owner, tasks: 0, missingAssets: 0, highPriority: 0 };
    current.tasks += 1;
    current.missingAssets += item.missingCount;
    current.highPriority += item.priority === "high" ? 1 : 0;
    owners.set(item.owner, current);
  }

  return Array.from(owners.values()).sort((a, b) => b.highPriority - a.highPriority || b.missingAssets - a.missingAssets);
}

function buildRecommendations(topRiskRealm: ContentInventoryRealm, nextItem?: ProductionQueueItem) {
  return [
    `اولین تمرکز عملیاتی: ${topRiskRealm.title} چون تکمیل آن روی ${topRiskRealm.completion}% است.`,
    nextItem ? `تسک شروع: ${nextItem.title} با ${nextItem.missingCount} مورد باقی‌مانده.` : "صف تولید فعلاً تسک باز ندارد.",
    "برای هر محتوای جدید، همزمان متن، تصویر، alt، منبع، وضعیت انتشار و مالک محتوا ثبت شود.",
    "قبل از ورود انبوه اوستا، یک batch کوچک با ۵ تا ۱۰ بند واقعی وارد و مسیر review تا publish تست شود.",
  ];
}

function priorityWeight(priority: ProductionQueueItem["priority"]) {
  return priority === "high" ? 3 : priority === "medium" ? 2 : 1;
}
