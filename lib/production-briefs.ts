import { inventoryAssetLabels, type InventoryAssetType } from "@/lib/content-inventory";
import { aiPromptTemplates } from "@/lib/ai-prompts";
import { getProductionQueueItems, type ProductionQueueItem } from "@/lib/production-queue";

export type ProductionBrief = {
  id: string;
  queueItemId: string;
  title: string;
  assetType: InventoryAssetType;
  realmTitle: string;
  objective: string;
  outputFormat: string;
  styleGuide: string;
  acceptanceCriteria: string[];
  prompt?: string;
  negativePrompt?: string;
  recommendedPath?: string;
};

const outputFormatByAsset: Record<InventoryAssetType, string> = {
  text: "Markdown/HTML آماده ورود به CMS با تیتر، خلاصه، بدنه، SEO title و description",
  image: "JPG یا WEBP با نسبت 16:9 و نسخه thumbnail، آماده بارگذاری در Media",
  audio: "MP3 با کیفیت وب، metadata، مدت زمان و transcript کوتاه",
  source: "Citation record شامل عنوان منبع، نویسنده، زبان، نوع، لینک/فایل و وضعیت اعتماد",
  admin: "Issue فنی یا تسک engineering با scope، API/مدل/فرم، ریسک و معیار پذیرش",
};

const styleGuideByAsset: Record<InventoryAssetType, string> = {
  text: "فارسی روان، پژوهشی اما قابل فهم، بدون لحن خشک مذهبی، همراه با پیام اخلاقی امروز.",
  image: "Dark Luxury Persian Mythology؛ مشکی عمیق، سرمه‌ای سلطنتی، طلایی گرم، سینمایی و غیرشلوغ.",
  audio: "آرام، محترمانه، واضح، بدون موسیقی غالب؛ مناسب مطالعه شب و نیایش روزانه.",
  source: "دقیق، قابل ردیابی، با سطح اعتماد و یادداشت تحریریه برای شفافیت پژوهشی.",
  admin: "ساده، قابل تست، سازگار با App Router، TypeScript و مدل‌های موجود پروژه.",
};

export function getProductionBriefs(items: ProductionQueueItem[] = getProductionQueueItems()): ProductionBrief[] {
  return items.slice(0, 18).map((item, index) => {
    const template = getPromptForItem(item, index);

    return {
      id: `brief-${item.id}`,
      queueItemId: item.id,
      title: `Brief ${inventoryAssetLabels[item.assetType]}: ${item.realmTitle}`,
      assetType: item.assetType,
      realmTitle: item.realmTitle,
      objective: buildObjective(item),
      outputFormat: outputFormatByAsset[item.assetType],
      styleGuide: styleGuideByAsset[item.assetType],
      acceptanceCriteria: buildAcceptanceCriteria(item),
      prompt: item.assetType === "image" ? template?.prompt : undefined,
      negativePrompt: item.assetType === "image" ? template?.negativePrompt : undefined,
      recommendedPath: item.assetType === "image" ? template?.recommendedPath : undefined,
    };
  });
}

export function getProductionBriefSummary(briefs: ProductionBrief[] = getProductionBriefs()) {
  return {
    total: briefs.length,
    image: briefs.filter((brief) => brief.assetType === "image").length,
    audio: briefs.filter((brief) => brief.assetType === "audio").length,
    text: briefs.filter((brief) => brief.assetType === "text").length,
    source: briefs.filter((brief) => brief.assetType === "source").length,
    admin: briefs.filter((brief) => brief.assetType === "admin").length,
    withPrompt: briefs.filter((brief) => Boolean(brief.prompt)).length,
  };
}

export function buildProductionBriefMarkdown(briefs: ProductionBrief[] = getProductionBriefs()) {
  const generatedAt = new Date().toISOString();

  return [
    "# AVESTA-ZOROASTER Production Briefs",
    "",
    `Generated: ${generatedAt}`,
    "",
    "این خروجی برای تحویل به تیم محتوا، پژوهش، رسانه، طراحی و مهندسی آماده شده است.",
    "",
    ...briefs.flatMap((brief, index) => [
      `## ${index + 1}. ${brief.title}`,
      "",
      `- ID: ${brief.id}`,
      `- Queue Item: ${brief.queueItemId}`,
      `- Realm: ${brief.realmTitle}`,
      `- Asset Type: ${inventoryAssetLabels[brief.assetType]}`,
      brief.recommendedPath ? `- Recommended Path: ${brief.recommendedPath}` : undefined,
      "",
      "### Objective",
      brief.objective,
      "",
      "### Output Format",
      brief.outputFormat,
      "",
      "### Style Guide",
      brief.styleGuide,
      "",
      "### Acceptance Criteria",
      ...brief.acceptanceCriteria.map((item) => `- ${item}`),
      brief.prompt ? "" : undefined,
      brief.prompt ? "### AI Prompt" : undefined,
      brief.prompt,
      brief.negativePrompt ? "" : undefined,
      brief.negativePrompt ? "### Negative Prompt" : undefined,
      brief.negativePrompt,
      "",
    ].filter((line): line is string => typeof line === "string")),
  ].join("\n");
}

function buildObjective(item: ProductionQueueItem) {
  if (item.assetType === "image") {
    return `تولید تصویر اختصاصی برای ${item.realmTitle} با هدف تقویت حس موزه دیجیتال و هویت سینمایی سایت.`;
  }

  if (item.assetType === "audio") {
    return `تولید روایت صوتی برای ${item.realmTitle} تا تجربه مطالعه از متن صرف فراتر برود.`;
  }

  if (item.assetType === "source") {
    return `تکمیل پشتوانه پژوهشی ${item.realmTitle} با منابع قابل ردیابی و سطح اعتماد مشخص.`;
  }

  if (item.assetType === "admin") {
    return `تکمیل ابزارهای عملیاتی ${item.realmTitle} برای مدیریت پایدار در production.`;
  }

  return `تکمیل محتوای متنی ${item.realmTitle} با ساختار طلایی سایت: متن، ترجمه، بازنویسی، تحلیل و پیام امروز.`;
}

function buildAcceptanceCriteria(item: ProductionQueueItem) {
  const shared = [
    "با هویت AVESTA-ZOROASTER و لحن خردمندانه/مدرن سازگار باشد.",
    "برای صفحه مقصد، SEO و تجربه موبایل قابل استفاده باشد.",
    "نیاز به بازبینی تحریریه یا پژوهشی مشخص شود.",
  ];

  if (item.assetType === "image") {
    return [
      "فاقد متن تصادفی، watermark، لباس/ساختمان مدرن و عناصر نامرتبط باشد.",
      "در پس‌زمینه تیره سایت خوانایی و کنتراست کافی داشته باشد.",
      "فایل نهایی و thumbnail با نام مسیر پیشنهادی تحویل شود.",
      ...shared,
    ];
  }

  if (item.assetType === "audio") {
    return [
      "صدای واضح، بدون نویز و با سرعت خوانش آرام باشد.",
      "transcript کوتاه و مدت زمان فایل همراه asset ثبت شود.",
      "به صفحه مقصد و player موجود قابل اتصال باشد.",
      ...shared,
    ];
  }

  if (item.assetType === "source") {
    return [
      "عنوان، نویسنده، زبان، نوع منبع و وضعیت حق نشر مشخص باشد.",
      "سطح اعتماد و یادداشت تحریریه ثبت شود.",
      "به مقاله، واژه یا بند مرتبط لینک شود.",
      ...shared,
    ];
  }

  return [
    "خروجی با ساختار داده و UI فعلی پروژه سازگار باشد.",
    "برای ورود دسته‌ای یا CMS آینده قابل تبدیل باشد.",
    "مسیر اقدام و مالک کار مشخص باشد.",
    ...shared,
  ];
}

function getPromptForItem(item: ProductionQueueItem, index: number) {
  if (item.assetType !== "image") {
    return undefined;
  }

  const realmHints: Record<string, string> = {
    "avesta-core": "yasna",
    "wisdom-experience": "gathas",
    "knowledge-graph": "hats",
    "media-museum": "yashts",
    "seasonal-growth": "home",
    "commerce-future": "hats",
    "admin-ops": "vendidad",
  };
  const hint = realmHints[item.realmId];

  return aiPromptTemplates.find((template) => template.sectionSlug === hint) ?? aiPromptTemplates[index % aiPromptTemplates.length];
}
