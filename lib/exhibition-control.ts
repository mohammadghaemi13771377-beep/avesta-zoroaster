import { exhibitions } from "@/lib/exhibitions";

export type ExhibitionReadinessStatus = "ready" | "needs-media" | "needs-curation" | "needs-review";

export type ExhibitionControlItem = {
  id: string;
  title: string;
  publicHref: string;
  status: ExhibitionReadinessStatus;
  completion: number;
  owner: string;
  mediaNeed: string;
  contentNeed: string;
  productNeed: string;
  risk: string;
  nextAction: string;
  checklist: string[];
};

export const exhibitionReadinessLabels: Record<ExhibitionReadinessStatus, string> = {
  ready: "آماده انتشار",
  "needs-media": "نیازمند رسانه",
  "needs-curation": "نیازمند کیوریشن",
  "needs-review": "نیازمند بازبینی",
};

export const exhibitionReadinessTone: Record<ExhibitionReadinessStatus, string> = {
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  "needs-media": "border-sky-300/25 bg-sky-300/10 text-sky-100",
  "needs-curation": "border-gold/25 bg-gold/10 text-gold-light",
  "needs-review": "border-amber-300/25 bg-amber-300/10 text-amber-100",
};

const statusById: Record<string, ExhibitionReadinessStatus> = {
  "light-and-asha": "ready",
  "fire-ritual-and-prayer": "needs-review",
  "ancient-persia-memory": "needs-curation",
  "mythic-media-vault": "needs-media",
};

const ownerById: Record<string, string> = {
  "light-and-asha": "Product + Content",
  "fire-ritual-and-prayer": "Content + Audio",
  "ancient-persia-memory": "Research + History",
  "mythic-media-vault": "Media + Design",
};

export function getExhibitionControlItems(): ExhibitionControlItem[] {
  return exhibitions.map((exhibition) => {
    const status = statusById[exhibition.id] ?? "needs-review";
    const artifactCoverage = Math.round((exhibition.artifacts.length / 3) * 35);
    const relatedRouteCoverage = Math.min(exhibition.relatedRoutes.length * 8, 24);
    const noteCoverage = exhibition.curatorNote.length > 80 ? 21 : 12;
    const mediaCoverage = status === "needs-media" ? 8 : 20;
    const completion = Math.min(100, artifactCoverage + relatedRouteCoverage + noteCoverage + mediaCoverage);

    return {
      id: exhibition.id,
      title: exhibition.title,
      publicHref: `/exhibitions#${exhibition.slug}`,
      status,
      completion,
      owner: ownerById[exhibition.id] ?? "Editorial",
      mediaNeed: buildMediaNeed(exhibition.id),
      contentNeed: buildContentNeed(exhibition.id),
      productNeed: "ثبت هدف نمایشگاه، مسیر ورود، CTA اصلی و رویدادهای analytics برای سنجش engagement.",
      risk: buildRisk(status),
      nextAction: buildNextAction(status),
      checklist: [
        "Hero image desktop/mobile آماده و بدون متن تصادفی باشد.",
        "هر اثر حداقل یک لینک مقصد، توضیح کوتاه و نقش در روایت نمایشگاه داشته باشد.",
        "یادداشت کیوریتور با زبان ساده و غیرتبلیغاتی بازبینی شود.",
        "مسیرهای مرتبط با sitemap، navigation و SEO هماهنگ شوند.",
      ],
    };
  });
}

export function getExhibitionControlSummary(items: ExhibitionControlItem[] = getExhibitionControlItems()) {
  return {
    total: items.length,
    ready: items.filter((item) => item.status === "ready").length,
    needsMedia: items.filter((item) => item.status === "needs-media").length,
    needsCuration: items.filter((item) => item.status === "needs-curation").length,
    averageCompletion: Math.round(items.reduce((sum, item) => sum + item.completion, 0) / items.length),
  };
}

function buildMediaNeed(id: string) {
  if (id === "mythic-media-vault") {
    return "Hero سینمایی، thumbnail برای آثار، نسخه شبکه اجتماعی و تصویر share-card لازم است.";
  }
  if (id === "fire-ritual-and-prayer") {
    return "صدای محیطی آرام، تصویر آتش آیینی و thumbnail تالار نیایش باید نهایی شود.";
  }
  return "Hero اختصاصی و thumbnail آثار برای نسخه desktop/mobile بررسی شود.";
}

function buildContentNeed(id: string) {
  if (id === "ancient-persia-memory") {
    return "تیم پژوهش باید بازه‌های تاریخی، منابع و عبارت‌های حساس تاریخی را تایید کند.";
  }
  if (id === "light-and-asha") {
    return "متن آماده است؛ citation و پیوند به مسیرهای یکتاپرستی در مرحله نهایی کنترل شود.";
  }
  return "روایت کیوریتوری، عنوان آثار و توضیح کوتاه هر artifact باید یک‌دست شود.";
}

function buildRisk(status: ExhibitionReadinessStatus) {
  if (status === "ready") return "ریسک پایین؛ فقط کنترل نهایی SEO و تصویر.";
  if (status === "needs-media") return "ریسک تجربه بصری؛ بدون تصویر نهایی، نمایشگاه حس موزه‌ای کامل نمی‌گیرد.";
  if (status === "needs-curation") return "ریسک روایت؛ بدون کیوریشن دقیق، نمایشگاه به فهرست لینک تبدیل می‌شود.";
  return "ریسک کیفیت؛ قبل از انتشار عمومی باید محتوا، رسانه و لینک‌ها بازبینی شوند.";
}

function buildNextAction(status: ExhibitionReadinessStatus) {
  if (status === "ready") return "انتشار بتا و اندازه‌گیری نرخ ورود به آثار.";
  if (status === "needs-media") return "ساخت brief تصویری در `/admin/visual-assets` و تولید hero/thumbnail.";
  if (status === "needs-curation") return "تکمیل یادداشت کیوریتور، ترتیب آثار و مسیرهای مرتبط.";
  return "بازبینی QA با محصول، محتوا و رسانه قبل از موج عمومی.";
}
