import { getAvestaStudyPaths } from "@/lib/avesta-study-paths";

export type AvestaStudyPathControlItem = {
  id: string;
  title: string;
  href: string;
  owner: string;
  status: "ready" | "needs-content" | "needs-media" | "needs-review";
  readiness: number;
  audience: string;
  duration: string;
  missing: string[];
  nextAction: string;
  checklist: Array<{
    label: string;
    done: boolean;
  }>;
};

const controlOverrides: Record<
  string,
  Pick<AvestaStudyPathControlItem, "owner" | "status" | "readiness" | "missing" | "nextAction">
> = {
  "first-light": {
    owner: "Product + Editorial",
    status: "ready",
    readiness: 86,
    missing: ["اتصال progress واقعی کاربر"],
    nextAction: "اتصال این مسیر به onboarding و نورخانه برای ذخیره مسیر شروع کاربر."
  },
  "gathic-wisdom": {
    owner: "Research + Editorial",
    status: "needs-review",
    readiness: 78,
    missing: ["citation دقیق‌تر برای گات‌ها", "یک صوت کوتاه راهنما"],
    nextAction: "بازبینی پژوهشی متن‌های گاتایی و اضافه کردن منبع معتبر به بندهای شاخص."
  },
  "daily-prayer": {
    owner: "Ritual + Audio",
    status: "needs-media",
    readiness: 68,
    missing: ["فایل صوتی نیایش", "حالت reminder روزانه"],
    nextAction: "تولید صوت کوتاه برای آتش نیایش و اتصال به reminder/newsletter آینده."
  },
  "mythic-yashts": {
    owner: "Mythology + Media",
    status: "needs-content",
    readiness: 72,
    missing: ["دو thumbnail اختصاصی", "تکمیل خلاصه آبان/مهر یشت"],
    nextAction: "تکمیل introهای آبان یشت و مهر یشت با لحن اسطوره‌ای و تصویر روشن‌تر."
  },
  "vendidad-light-dark": {
    owner: "Research + Sensitivity Review",
    status: "needs-review",
    readiness: 64,
    missing: ["بازبینی حساسیت محتوایی", "منبع‌گذاری فرگردها", "هشدار contextual"],
    nextAction: "بررسی لحن وندیداد برای جلوگیری از برداشت غلط و تکمیل citationهای فرگرد اول و دوم."
  }
};

export const studyPathStatusLabels: Record<AvestaStudyPathControlItem["status"], string> = {
  ready: "آماده نمایش",
  "needs-content": "نیازمند محتوا",
  "needs-media": "نیازمند رسانه",
  "needs-review": "نیازمند بازبینی"
};

export function getAvestaStudyPathControlItems(): AvestaStudyPathControlItem[] {
  return getAvestaStudyPaths().map((path) => {
    const override = controlOverrides[path.id];
    const readiness = override.readiness;

    return {
      id: path.id,
      title: path.title,
      href: path.href,
      owner: override.owner,
      status: override.status,
      readiness,
      audience: path.audience,
      duration: path.duration,
      missing: override.missing,
      nextAction: override.nextAction,
      checklist: [
        { label: "مسیر عمومی در پورتال فعال است", done: true },
        { label: "سه قدم مطالعه تعریف شده", done: path.steps.length >= 3 },
        { label: "تصویر و mood اختصاصی دارد", done: Boolean(path.image && path.mood) },
        { label: "آمادگی بالای ۸۰٪", done: readiness >= 80 },
        { label: "محتوای نهایی و منبع‌گذاری کامل", done: readiness >= 90 }
      ]
    };
  });
}

export function getAvestaStudyPathControlSummary(items: AvestaStudyPathControlItem[] = getAvestaStudyPathControlItems()) {
  const averageReadiness = Math.round(items.reduce((sum, item) => sum + item.readiness, 0) / Math.max(items.length, 1));
  const ready = items.filter((item) => item.status === "ready").length;
  const needsReview = items.filter((item) => item.status === "needs-review").length;
  const nextItem = [...items].sort((a, b) => a.readiness - b.readiness)[0];

  return {
    total: items.length,
    ready,
    needsReview,
    averageReadiness,
    nextItem
  };
}
