import { mediaItems } from "@/lib/sample-content";

export type MediaAssetView = {
  title: string;
  slug: string;
  type: string;
  category: string;
  description: string;
  accent: string;
  href?: string;
  url?: string | null;
  thumbnail?: string | null;
  prompt?: string | null;
  mood?: string | null;
  sectionSlug?: string | null;
  chapterSlug?: string | null;
  verseOrder?: number | null;
  status?: string;
};

export type MediaAssetPayload = {
  title?: string;
  slug?: string;
  type?: string;
  category?: string;
  description?: string;
  url?: string;
  thumbnail?: string;
  prompt?: string;
  mood?: string;
  accent?: string;
  sectionSlug?: string;
  chapterSlug?: string;
  verseOrder?: number;
  credit?: string;
  status?: string;
};

export const mediaAssetSchema = {
  types: ["AI Image", "Audio", "Video", "Podcast", "Document"],
  statuses: ["DRAFT", "READY", "PUBLISHED", "ARCHIVED"],
  required: ["title", "slug", "type", "category", "description"],
};

export async function getMediaAssets(): Promise<MediaAssetView[]> {
  const databaseAssets = await readMediaAssetsFromDatabase();
  return databaseAssets.length ? databaseAssets : sampleMediaAssets();
}

export async function getMediaAssetBySlug(slug: string) {
  const assets = await getMediaAssets();
  return assets.find((asset) => asset.slug === decodeURIComponent(slug));
}

export async function getMediaAssetsForVerse(sectionSlug: string, chapterSlug: string, verseOrder: number) {
  const databaseAssets = await readMediaAssetsFromDatabase({
    sectionSlug,
    chapterSlug,
    verseOrder,
  });

  if (databaseAssets.length) {
    return databaseAssets;
  }

  const sampleBySection = sampleMediaAssets().filter((asset) => asset.sectionSlug === sectionSlug);
  return sampleBySection.length ? sampleBySection : sampleMediaAssets().slice(0, 1);
}

export async function saveMediaAsset(payload: MediaAssetPayload) {
  const validation = validateMediaAsset(payload);

  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      message: "اطلاعات رسانه کامل نیست.",
      errors: validation.errors,
    };
  }

  const normalized = normalizeMediaAsset(payload);
  const prisma = await getPrisma();

  if (!prisma) {
    return {
      ok: true,
      status: 202,
      mode: "dry-run",
      message: "رسانه معتبر است. بعد از تنظیم DATABASE_URL در مدل MediaAsset ذخیره می‌شود.",
      received: normalized,
    };
  }

  try {
    const saved = await prisma.mediaAsset.upsert({
      where: { slug: normalized.slug },
      update: normalized,
      create: normalized,
    });

    return {
      ok: true,
      status: 200,
      mode: "database",
      message: "رسانه با موفقیت ذخیره شد.",
      saved,
    };
  } catch (error) {
    return {
      ok: true,
      status: 202,
      mode: "validated",
      message: "Payload رسانه معتبر است، اما دیتابیس هنوز آماده ذخیره‌سازی نیست.",
      detail: error instanceof Error ? error.message : "Unknown database error",
      received: normalized,
    };
  }
}

function validateMediaAsset(payload: MediaAssetPayload) {
  const errors: string[] = [];

  for (const field of mediaAssetSchema.required) {
    const value = payload[field as keyof MediaAssetPayload];

    if (value === undefined || value === null || value === "") {
      errors.push(`${field} is required.`);
    }
  }

  return { ok: errors.length === 0, errors };
}

function normalizeMediaAsset(payload: MediaAssetPayload) {
  return {
    title: payload.title as string,
    slug: payload.slug as string,
    type: payload.type as string,
    category: payload.category as string,
    description: payload.description as string,
    url: payload.url,
    thumbnail: payload.thumbnail,
    prompt: payload.prompt,
    mood: payload.mood,
    accent: payload.accent ?? "#D6A84F",
    sectionSlug: payload.sectionSlug,
    chapterSlug: payload.chapterSlug,
    verseOrder: payload.verseOrder ? Number(payload.verseOrder) : undefined,
    credit: payload.credit,
    status: payload.status ?? "DRAFT",
  };
}

function sampleMediaAssets(): MediaAssetView[] {
  return mediaItems.map((item, index) => {
    const slug = slugify(item.title) || `media-${index + 1}`;
    const sectionSlug = sectionSlugFromCategory(item.category);

    return {
      ...item,
      slug,
      href: `/media/${slug}`,
      url: null,
      thumbnail: null,
      sectionSlug,
      chapterSlug: sectionSlug === "yasna" ? "ha-1" : sectionSlug === "gathas" ? "ahunavaiti" : null,
      verseOrder: sectionSlug === "yasna" || sectionSlug === "gathas" ? 1 : null,
      status: "sample",
    };
  });
}

async function readMediaAssetsFromDatabase(filter?: {
  sectionSlug: string;
  chapterSlug: string;
  verseOrder: number;
}): Promise<MediaAssetView[]> {
  const prisma = await getPrisma();

  if (!prisma) {
    return [];
  }

  try {
    const assets = await prisma.mediaAsset.findMany({
      where: filter
        ? {
            sectionSlug: filter.sectionSlug,
            chapterSlug: filter.chapterSlug,
            verseOrder: filter.verseOrder,
          }
        : undefined,
      orderBy: { updatedAt: "desc" },
    });

    return assets.map((asset) => ({
      title: asset.title,
      slug: asset.slug,
      type: asset.type,
      category: asset.category,
      description: asset.description,
      accent: asset.accent ?? "#D6A84F",
      href: `/media/${asset.slug}`,
      url: asset.url,
      thumbnail: asset.thumbnail,
      prompt: asset.prompt,
      mood: asset.mood,
      sectionSlug: asset.sectionSlug,
      chapterSlug: asset.chapterSlug,
      verseOrder: asset.verseOrder,
      status: asset.status,
    }));
  } catch {
    return [];
  }
}

async function getPrisma() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return prisma;
  } catch {
    return null;
  }
}

function sectionSlugFromCategory(category: string) {
  const normalized = category.trim().toLowerCase();

  if (normalized.includes("یسنا") || normalized.includes("yasna")) {
    return "yasna";
  }

  if (normalized.includes("گات") || normalized.includes("gath")) {
    return "gathas";
  }

  if (normalized.includes("وندیداد") || normalized.includes("vendidad")) {
    return "vendidad";
  }

  if (normalized.includes("یشت") || normalized.includes("yasht")) {
    return "yashts";
  }

  return null;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
