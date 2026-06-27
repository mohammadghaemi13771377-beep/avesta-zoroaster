import { aiPromptTemplates, type AiPromptTemplate } from "@/lib/ai-prompts";
import { getProductionBriefs } from "@/lib/production-briefs";
import { routeHeroByPath } from "@/lib/visual-assets";

export type VisualAssetStatus = "prompt-ready" | "needs-generation" | "needs-upload" | "review-ready";

export type VisualAssetRatio = "21:9" | "16:9" | "4:5" | "1:1";

export type VisualAssetItem = {
  id: string;
  title: string;
  sectionSlug: string;
  category: string;
  mood: string;
  accent: string;
  recommendedPath: string;
  ratio: VisualAssetRatio;
  status: VisualAssetStatus;
  owner: string;
  destination: string;
  pageHref: string;
  prompt: string;
  negativePrompt: string;
  usage: string;
  checklist: string[];
  nextAction: string;
};

export type LiveHeroAsset = {
  route: string;
  src: string;
  title: string;
  format: string;
};

export const visualAssetStatusLabels: Record<VisualAssetStatus, string> = {
  "prompt-ready": "Prompt آماده",
  "needs-generation": "نیازمند تولید",
  "needs-upload": "نیازمند آپلود",
  "review-ready": "آماده بازبینی",
};

export const visualAssetStatusTone: Record<VisualAssetStatus, string> = {
  "prompt-ready": "border-gold/25 bg-gold/10 text-gold-light",
  "needs-generation": "border-amber-400/25 bg-amber-400/10 text-amber-100",
  "needs-upload": "border-sky-300/25 bg-sky-300/10 text-sky-100",
  "review-ready": "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
};

const ownerByCategory: Record<string, string> = {
  Hero: "تیم دیزاین و AI",
  "Avesta Section": "تیم رسانه و AI",
  "Study Path": "تیم محتوا و دیزاین",
};

const ratioByCategory: Record<string, VisualAssetRatio> = {
  Hero: "21:9",
  "Avesta Section": "16:9",
  "Study Path": "4:5",
};

const hrefBySection: Record<string, string> = {
  home: "/",
  yasna: "/avesta/yasna",
  gathas: "/avesta/gathas",
  vendidad: "/avesta/vendidad",
  yashts: "/avesta/yashts",
  "khordeh-avesta": "/avesta/khordeh-avesta",
  hats: "/avesta/hats",
};

export function getVisualAssetItems(templates: AiPromptTemplate[] = aiPromptTemplates): VisualAssetItem[] {
  const imageBriefPaths = new Set(
    getProductionBriefs()
      .filter((brief) => brief.assetType === "image" && brief.recommendedPath)
      .map((brief) => brief.recommendedPath),
  );

  return templates.map((template, index) => {
    const status = getStatus(template, imageBriefPaths, index);

    return {
      id: `visual-${template.id}`,
      title: template.title,
      sectionSlug: template.sectionSlug,
      category: template.category,
      mood: template.mood,
      accent: template.accent,
      recommendedPath: template.recommendedPath,
      ratio: ratioByCategory[template.category] ?? "16:9",
      status,
      owner: ownerByCategory[template.category] ?? "تیم رسانه",
      destination: buildDestination(template),
      pageHref: hrefBySection[template.sectionSlug] ?? "/media",
      prompt: template.prompt,
      negativePrompt: template.negativePrompt,
      usage: template.usage,
      checklist: buildChecklist(template),
      nextAction: buildNextAction(status, template),
    };
  });
}

export function getVisualAssetSummary(items: VisualAssetItem[] = getVisualAssetItems()) {
  return {
    total: items.length,
    promptReady: items.filter((item) => item.status === "prompt-ready").length,
    needsGeneration: items.filter((item) => item.status === "needs-generation").length,
    needsUpload: items.filter((item) => item.status === "needs-upload").length,
    reviewReady: items.filter((item) => item.status === "review-ready").length,
    ratios: Array.from(new Set(items.map((item) => item.ratio))),
  };
}

export function getLiveHeroAssets(): LiveHeroAsset[] {
  return Object.entries(routeHeroByPath).map(([route, src]) => ({
    route,
    src,
    title: route === "/" ? "Hero صفحه خانه" : `Hero ${route}`,
    format: src.split(".").at(-1)?.toUpperCase() ?? "ASSET",
  }));
}

function getStatus(template: AiPromptTemplate, imageBriefPaths: Set<string | undefined>, index: number): VisualAssetStatus {
  if (imageBriefPaths.has(template.recommendedPath)) {
    return "review-ready";
  }

  if (index % 3 === 0) {
    return "needs-upload";
  }

  if (index % 2 === 0) {
    return "needs-generation";
  }

  return "prompt-ready";
}

function buildDestination(template: AiPromptTemplate) {
  if (template.sectionSlug === "home") {
    return "Hero صفحه خانه";
  }

  if (template.category === "Study Path") {
    return "مسیر مطالعه و کارت‌های هات‌ها";
  }

  return `کاور و فضای بصری ${template.sectionSlug}`;
}

function buildChecklist(template: AiPromptTemplate) {
  return [
    `نسبت تصویر ${ratioByCategory[template.category] ?? "16:9"} رعایت شود.`,
    "در پس‌زمینه تیره، سوژه و نور طلایی واضح باشد.",
    "هیچ متن تصادفی، watermark یا عنصر مدرن داخل تصویر نباشد.",
    `فایل نهایی در ${template.recommendedPath} یا storage production ثبت شود.`,
  ];
}

function buildNextAction(status: VisualAssetStatus, template: AiPromptTemplate) {
  if (status === "review-ready") {
    return "خروجی را با معیارهای هویت بصری و mobile crop بازبینی کنید.";
  }

  if (status === "needs-upload") {
    return `فایل نهایی را با نام پیشنهادی ${template.recommendedPath} آپلود و به Media Asset وصل کنید.`;
  }

  if (status === "needs-generation") {
    return "با prompt آماده، خروجی اصلی و thumbnail را تولید کنید.";
  }

  return "Prompt را به ابزار تصویرسازی بدهید و نسخه اول خروجی را برای Review Gate ثبت کنید.";
}
