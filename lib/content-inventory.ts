import { worldRealms, type WorldRealmStatus } from "@/lib/world-map";

export type InventoryAssetType = "text" | "image" | "audio" | "source" | "admin";

export type ContentInventoryItem = {
  realmId: string;
  required: Record<InventoryAssetType, number>;
  ready: Record<InventoryAssetType, number>;
  owner: string;
  priority: "high" | "medium" | "low";
  nextAction: string;
};

export type ContentInventoryRealm = ContentInventoryItem & {
  title: string;
  href: string;
  status: WorldRealmStatus;
  completion: number;
};

export const inventoryAssetLabels: Record<InventoryAssetType, string> = {
  text: "متن",
  image: "تصویر",
  audio: "صوت",
  source: "منبع",
  admin: "ادمین",
};

export const contentInventoryItems: ContentInventoryItem[] = [
  {
    realmId: "avesta-core",
    required: { text: 120, image: 80, audio: 60, source: 45, admin: 18 },
    ready: { text: 18, image: 12, audio: 4, source: 10, admin: 12 },
    owner: "Content + Research",
    priority: "high",
    nextAction: "ورود batch اول متن اوستا، ترجمه، منبع و تصویر اختصاصی برای یسنا/گات‌ها.",
  },
  {
    realmId: "wisdom-experience",
    required: { text: 28, image: 12, audio: 10, source: 8, admin: 14 },
    ready: { text: 22, image: 8, audio: 3, source: 5, admin: 12 },
    owner: "Product Experience",
    priority: "medium",
    nextAction: "اتصال حافظه مطالعه، مأموریت‌ها و دفتر روزانه به پروفایل واقعی کاربر.",
  },
  {
    realmId: "knowledge-graph",
    required: { text: 70, image: 18, audio: 0, source: 55, admin: 16 },
    ready: { text: 24, image: 6, audio: 0, source: 16, admin: 10 },
    owner: "Research + Editorial",
    priority: "high",
    nextAction: "تکمیل واژه‌نامه، citationها، نسخه منابع و پیوندهای مفهومی تاییدشده.",
  },
  {
    realmId: "media-museum",
    required: { text: 22, image: 90, audio: 34, source: 10, admin: 12 },
    ready: { text: 14, image: 18, audio: 2, source: 4, admin: 8 },
    owner: "Media",
    priority: "high",
    nextAction: "تولید و بارگذاری تصویرهای AI نهایی، thumbnailها و فایل‌های صوتی.",
  },
  {
    realmId: "seasonal-growth",
    required: { text: 32, image: 24, audio: 4, source: 12, admin: 18 },
    ready: { text: 24, image: 12, audio: 0, source: 7, admin: 14 },
    owner: "Growth",
    priority: "medium",
    nextAction: "اتصال کمپین‌ها به provider ایمیل، بنرهای زمان‌بندی‌شده و کالکشن فروشگاه.",
  },
  {
    realmId: "commerce-future",
    required: { text: 42, image: 64, audio: 0, source: 8, admin: 26 },
    ready: { text: 12, image: 8, audio: 0, source: 2, admin: 16 },
    owner: "Commerce",
    priority: "high",
    nextAction: "تعریف محصولات واقعی، عکس محصول، درگاه پرداخت، انبار و ارسال.",
  },
  {
    realmId: "admin-ops",
    required: { text: 18, image: 4, audio: 0, source: 8, admin: 44 },
    ready: { text: 12, image: 2, audio: 0, source: 5, admin: 30 },
    owner: "Engineering",
    priority: "high",
    nextAction: "auth امن production، نقش‌های دیتابیسی، audit کامل و migration production.",
  },
];

export function getContentInventoryRealms(items: ContentInventoryItem[] = contentInventoryItems): ContentInventoryRealm[] {
  return items.map((item) => {
    const realm = worldRealms.find((entry) => entry.id === item.realmId);

    return {
      ...item,
      title: realm?.title ?? item.realmId,
      href: realm?.href ?? "/world",
      status: realm?.status ?? "foundation",
      completion: getInventoryCompletion(item),
    };
  });
}

export function getInventoryCompletion(item: ContentInventoryItem) {
  const required = sumAssets(item.required);
  const ready = sumAssets(item.ready);
  return Math.round((ready / Math.max(required, 1)) * 100);
}

export function getContentInventorySummary(realms: ContentInventoryRealm[] = getContentInventoryRealms()) {
  const required = realms.reduce((sum, realm) => sum + sumAssets(realm.required), 0);
  const ready = realms.reduce((sum, realm) => sum + sumAssets(realm.ready), 0);
  const highPriority = realms.filter((realm) => realm.priority === "high").length;

  return {
    realms: realms.length,
    required,
    ready,
    remaining: Math.max(required - ready, 0),
    completion: Math.round((ready / Math.max(required, 1)) * 100),
    highPriority,
    nextRealm: [...realms].sort((a, b) => a.completion - b.completion)[0],
  };
}

function sumAssets(value: Record<InventoryAssetType, number>) {
  return Object.values(value).reduce((sum, count) => sum + count, 0);
}
