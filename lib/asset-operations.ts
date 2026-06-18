import { getVisualAssetItems } from "@/lib/visual-asset-control";
import { mediaItems } from "@/lib/sample-content";
import { routeHeroByPath, sectionCoverBySlug, visualAssets } from "@/lib/visual-assets";
import { uploadKinds, type UploadKind } from "@/lib/upload-storage";

export type AssetOperationStatus = "ready-local" | "needs-storage" | "needs-backup" | "needs-review";

export type AssetOperationChannel = {
  kind: UploadKind;
  label: string;
  localDirectory: string;
  publicPath: string;
  allowedExtensions: string[];
  maxSizeLabel: string;
  productionTarget: string;
  status: AssetOperationStatus;
  nextAction: string;
};

export type AssetOperationSummary = {
  channels: number;
  visualAssets: number;
  routeHeroes: number;
  sectionCovers: number;
  mediaItems: number;
  localReady: number;
  needsProductionStorage: number;
  backupCoverage: number;
};

const channelConfig: Record<UploadKind, Omit<AssetOperationChannel, "kind">> = {
  image: {
    label: "تصویر و کاور",
    localDirectory: "public/images/ai",
    publicPath: "/images/ai",
    allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
    maxSizeLabel: "12MB",
    productionTarget: "Cloudflare R2 / S3 / Cloudinary",
    status: "needs-storage",
    nextAction: "adapter آپلود production را به storage انتخاب‌شده وصل کنید و URL دائمی را در Media Asset ذخیره کنید."
  },
  audio: {
    label: "صوت و نیایش",
    localDirectory: "public/audio",
    publicPath: "/audio",
    allowedExtensions: [".mp3", ".wav", ".m4a", ".ogg"],
    maxSizeLabel: "50MB",
    productionTarget: "Object Storage + CDN",
    status: "needs-storage",
    nextAction: "برای هر فایل صوتی transcript، مدت زمان، کیفیت و فصل/بند مرتبط ثبت شود."
  },
  pdf: {
    label: "PDF و کتابخانه",
    localDirectory: "public/library",
    publicPath: "/library",
    allowedExtensions: [".pdf"],
    maxSizeLabel: "40MB",
    productionTarget: "Object Storage + signed source metadata",
    status: "needs-backup",
    nextAction: "برای هر فایل PDF منبع، زبان، نسخه، حقوق نشر و citation کامل ثبت شود."
  },
  video: {
    label: "ویدئو و نمایشگاه",
    localDirectory: "public/video",
    publicPath: "/video",
    allowedExtensions: [".mp4", ".webm", ".mov"],
    maxSizeLabel: "200MB",
    productionTarget: "Video storage / CDN / streaming provider",
    status: "needs-storage",
    nextAction: "برای ویدئوها thumbnail، زیرنویس، poster image و نسخه mobile-friendly آماده شود."
  }
};

export const assetOperationStatusLabels: Record<AssetOperationStatus, string> = {
  "ready-local": "آماده محلی",
  "needs-storage": "نیازمند Storage",
  "needs-backup": "نیازمند بکاپ",
  "needs-review": "نیازمند بازبینی"
};

export const assetOperationStatusTone: Record<AssetOperationStatus, string> = {
  "ready-local": "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  "needs-storage": "border-sky-300/25 bg-sky-300/10 text-sky-100",
  "needs-backup": "border-gold/25 bg-gold/10 text-gold-light",
  "needs-review": "border-amber-300/25 bg-amber-300/10 text-amber-100"
};

export function getAssetOperationChannels(): AssetOperationChannel[] {
  return uploadKinds.map((kind) => ({ kind, ...channelConfig[kind] }));
}

export function getAssetOperationSummary(channels: AssetOperationChannel[] = getAssetOperationChannels()): AssetOperationSummary {
  const visualAssetItems = getVisualAssetItems();
  const localReady = channels.filter((channel) => channel.status === "ready-local").length;
  const needsProductionStorage = channels.filter((channel) => channel.status === "needs-storage").length;
  const backupWeighted = channels.reduce((sum, channel) => {
    if (channel.status === "ready-local") return sum + 100;
    if (channel.status === "needs-backup") return sum + 55;
    if (channel.status === "needs-review") return sum + 45;
    return sum + 30;
  }, 0);

  return {
    channels: channels.length,
    visualAssets: visualAssetItems.length,
    routeHeroes: Object.keys(routeHeroByPath).length,
    sectionCovers: Object.keys(sectionCoverBySlug).length,
    mediaItems: mediaItems.length,
    localReady,
    needsProductionStorage,
    backupCoverage: Math.round(backupWeighted / Math.max(channels.length, 1))
  };
}

export function getAssetOperationsSnapshot() {
  const channels = getAssetOperationChannels();

  return {
    generatedAt: new Date().toISOString(),
    summary: getAssetOperationSummary(channels),
    channels,
    manifests: {
      visualAssets,
      routeHeroByPath,
      sectionCoverBySlug,
      mediaItems
    },
    productionChecklist: [
      "storage provider برای تصویر، صوت، PDF و ویدئو انتخاب شود.",
      "URLهای public local به URLهای دائمی CDN یا signed storage تبدیل شوند.",
      "هر asset به محتوا، فصل، بند، مقاله یا نمایشگاه مرتبط وصل شود.",
      "بکاپ دوره‌ای دیتابیس و media bucket قبل از ورود محتوای سنگین فعال شود.",
      "alt text، caption، source، rights و review status برای هر فایل ثبت شود."
    ]
  };
}
