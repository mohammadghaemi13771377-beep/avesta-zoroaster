export type ConsentCategory = "essential" | "analytics" | "personalization" | "newsletter" | "commerce";

export type ConsentPreference = {
  enabled: boolean;
  updatedAt: string | null;
};

export type ConsentSnapshot = Record<ConsentCategory, ConsentPreference>;

export type ConsentPolicyItem = {
  id: ConsentCategory;
  title: string;
  description: string;
  required: boolean;
  examples: string[];
};

export const consentStorageKey = "avesta-privacy-consent-v1";

export const consentPolicy: ConsentPolicyItem[] = [
  {
    id: "essential",
    title: "ضروری",
    description: "برای کارکرد پایه سایت، امنیت، session و ذخیره تنظیمات اصلی لازم است.",
    required: true,
    examples: ["session", "زبان", "حالت مطالعه", "حفاظت فرم‌ها"],
  },
  {
    id: "analytics",
    title: "آنالیتیکس",
    description: "برای فهم مسیرهای مهم، کلیک CTAها، ورود به اوستا و بهبود تجربه کاربر استفاده می‌شود.",
    required: false,
    examples: ["hero_cta_click", "avesta_section_opened", "search_submitted"],
  },
  {
    id: "personalization",
    title: "شخصی‌سازی",
    description: "برای نورخانه، قطب‌نمای خرد، ادامه مطالعه، پیشنهاد مسیر و حافظه محلی کاربر استفاده می‌شود.",
    required: false,
    examples: ["ادامه مطالعه", "پیشنهاد مسیر", "زنجیره روشنایی"],
  },
  {
    id: "newsletter",
    title: "نورنامه",
    description: "برای ذخیره ترجیحات خبرنامه، موضوعات مورد علاقه و ارسال‌های آینده استفاده می‌شود.",
    required: false,
    examples: ["topics", "preferences", "double opt-in"],
  },
  {
    id: "commerce",
    title: "فروشگاه",
    description: "برای سبد خرید، checkout، سفارش، پرداخت و پیگیری محصولات فرهنگی آینده استفاده می‌شود.",
    required: false,
    examples: ["cart", "checkout", "payment_result"],
  },
];

export function buildDefaultConsent(now = new Date().toISOString()): ConsentSnapshot {
  return {
    essential: { enabled: true, updatedAt: now },
    analytics: { enabled: false, updatedAt: null },
    personalization: { enabled: false, updatedAt: null },
    newsletter: { enabled: false, updatedAt: null },
    commerce: { enabled: false, updatedAt: null },
  };
}

export function normalizeConsentSnapshot(input: unknown, now = new Date().toISOString()): ConsentSnapshot {
  const defaults = buildDefaultConsent(now);
  const raw = input && typeof input === "object" && !Array.isArray(input) ? (input as Partial<ConsentSnapshot>) : {};

  return consentPolicy.reduce((snapshot, item) => {
    const current = raw[item.id];
    snapshot[item.id] = {
      enabled: item.required ? true : Boolean(current?.enabled),
      updatedAt: current?.updatedAt && typeof current.updatedAt === "string" ? current.updatedAt : item.required ? now : null,
    };
    return snapshot;
  }, defaults);
}

export function getConsentSummary(snapshot: ConsentSnapshot = buildDefaultConsent()) {
  const optional = consentPolicy.filter((item) => !item.required);
  const enabledOptional = optional.filter((item) => snapshot[item.id].enabled).length;

  return {
    total: consentPolicy.length,
    required: consentPolicy.filter((item) => item.required).length,
    optional: optional.length,
    enabledOptional,
    privacyReadiness: Math.round(((enabledOptional + 1) / consentPolicy.length) * 100),
  };
}

export function canTrackAnalytics(snapshot: ConsentSnapshot) {
  return snapshot.analytics.enabled;
}

export function hasConsentDecision(snapshot: ConsentSnapshot) {
  return consentPolicy.some((item) => !item.required && Boolean(snapshot[item.id].updatedAt));
}
