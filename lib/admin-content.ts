export type ContentResource =
  | "avestaSection"
  | "avestaChapter"
  | "avestaChapterGuide"
  | "avestaVerse"
  | "article"
  | "glossaryTerm"
  | "libraryItem";

type AdminContentFields = {
  title?: string;
  originalText?: string;
  transliteration?: string;
  classicalTranslation?: string;
  simpleRewrite?: string;
  modernInterpretation?: string;
  ethicalMessage?: string;
  quote?: string;
  citationTitle?: string;
  citationNote?: string;
  seoTitle?: string;
  seoDescription?: string;
  meaning?: string;
  root?: string;
  description?: string;
  content?: string;
  question?: string;
  subtitle?: string;
  leadQuote?: string;
  curatorNote?: string;
  todayPractice?: string;
  sidePanels?: string;
  storyPanels?: string;
  historicalContext?: string;
  ritualContext?: string;
  keyThemes?: string;
  imageAlt?: string;
  relatedChapters?: string;
  verses?: string;
};

export type AdminContentPayload = {
  resource?: ContentResource;
  locale?: "FA" | "EN";
  title?: string;
  slug?: string;
  summary?: string;
  seoTitle?: string;
  seoDescription?: string;
  sectionSlug?: string;
  chapterSlug?: string;
  order?: number;
  themeColor?: string;
  accent?: string;
  tone?: string;
  coverImage?: string;
  audioUrl?: string;
  fileUrl?: string;
  type?: string;
  language?: string;
  author?: string;
  source?: string;
  category?: string;
  tags?: string[];
  fields?: AdminContentFields;
};

type NormalizedAdminContentPayload = Omit<AdminContentPayload, "locale" | "order" | "tags" | "fields"> & {
  locale: "FA" | "EN";
  order: number;
  tags: string[];
  fields: AdminContentFields;
};

export const adminContentSchema = {
  resources: [
    "avestaSection",
    "avestaChapter",
    "avestaChapterGuide",
    "avestaVerse",
    "article",
    "glossaryTerm",
    "libraryItem"
  ] satisfies ContentResource[],
  locales: ["FA", "EN"],
  requiredByResource: {
    avestaSection: ["title", "slug", "summary"],
    avestaChapter: ["title", "slug", "sectionSlug", "order"],
    avestaChapterGuide: [
      "title",
      "slug",
      "sectionSlug",
      "chapterSlug",
      "coverImage",
      "fields.question",
      "fields.subtitle",
      "fields.historicalContext",
      "fields.ritualContext"
    ],
    avestaVerse: ["sectionSlug", "chapterSlug", "order", "fields.originalText"],
    article: ["title", "slug", "summary", "fields.content"],
    glossaryTerm: ["title", "slug", "fields.meaning"],
    libraryItem: ["title", "fileUrl", "language", "type"]
  }
};

export async function saveAdminContent(payload: AdminContentPayload) {
  const validation = validateAdminContent(payload);

  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      message: "Payload محتوا کامل نیست.",
      errors: validation.errors
    };
  }

  const prisma = await getPrisma();

  if (!prisma) {
    return {
      ok: true,
      status: 202,
      mode: "dry-run",
      message: "Payload معتبر است. بعد از تنظیم DATABASE_URL همین قرارداد با Prisma ذخیره می‌شود.",
      received: normalizePayload(payload)
    };
  }

  try {
    const saved = await persistWithPrisma(prisma, normalizePayload(payload));

    return {
      ok: true,
      status: 200,
      mode: "database",
      message: "محتوا با موفقیت در دیتابیس ذخیره شد.",
      saved
    };
  } catch (error) {
    return {
      ok: true,
      status: 202,
      mode: "validated",
      message: "Payload معتبر است، اما دیتابیس هنوز آماده ذخیره‌سازی نیست.",
      detail: error instanceof Error ? error.message : "Unknown database error",
      received: normalizePayload(payload)
    };
  }
}

function normalizePayload(payload: AdminContentPayload): NormalizedAdminContentPayload {
  return {
    ...payload,
    locale: payload.locale ?? "FA",
    order: Number(payload.order ?? 1),
    tags: payload.tags ?? [],
    fields: payload.fields ?? {}
  };
}

function validateAdminContent(payload: AdminContentPayload) {
  const errors: string[] = [];

  if (!payload.resource || !adminContentSchema.resources.includes(payload.resource)) {
    errors.push("resource must be one of the supported content resources.");
  }

  if (payload.locale && !adminContentSchema.locales.includes(payload.locale)) {
    errors.push("locale must be FA or EN.");
  }

  if (!payload.resource) {
    return { ok: false, errors };
  }

  const required = adminContentSchema.requiredByResource[payload.resource] ?? [];

  for (const field of required) {
    const value = getNestedValue(payload, field);

    if (value === undefined || value === null || value === "") {
      errors.push(`${field} is required for ${payload.resource}.`);
    }
  }

  return { ok: errors.length === 0, errors };
}

function getNestedValue(value: Record<string, unknown>, path: string) {
  return path.split(".").reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, value);
}

async function getPrisma() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    return prisma;
  } catch {
    return null;
  }
}

async function persistWithPrisma(prisma: NonNullable<Awaited<ReturnType<typeof getPrisma>>>, payload: NormalizedAdminContentPayload) {
  switch (payload.resource) {
    case "avestaSection":
      return prisma.avestaSection.upsert({
        where: { slug: payload.slug as string },
        update: {
          title: payload.title as string,
          description: payload.summary as string,
          coverImage: payload.coverImage,
          themeColor: payload.themeColor
        },
        create: {
          title: payload.title as string,
          slug: payload.slug as string,
          description: payload.summary as string,
          coverImage: payload.coverImage,
          themeColor: payload.themeColor,
          order: payload.order
        }
      });

    case "avestaChapter": {
      const section = await prisma.avestaSection.findUnique({ where: { slug: payload.sectionSlug as string } });

      if (!section) {
        throw new Error("Parent Avesta section was not found.");
      }

      return prisma.avestaChapter.upsert({
        where: { sectionId_slug: { sectionId: section.id, slug: payload.slug as string } },
        update: {
          title: payload.title as string,
          description: payload.summary,
          coverImage: payload.coverImage,
          number: payload.order,
          order: payload.order
        },
        create: {
          sectionId: section.id,
          title: payload.title as string,
          slug: payload.slug as string,
          number: payload.order,
          description: payload.summary,
          coverImage: payload.coverImage,
          order: payload.order
        }
      });
    }

    case "avestaVerse": {
      const chapter = await prisma.avestaChapter.findFirst({
        where: {
          slug: payload.chapterSlug as string,
          section: { slug: payload.sectionSlug as string }
        }
      });

      if (!chapter) {
        throw new Error("Parent Avesta chapter was not found.");
      }

      return prisma.avestaVerse.upsert({
        where: { chapterId_order: { chapterId: chapter.id, order: payload.order } },
        update: {
          originalText: payload.fields.originalText as string,
          transliteration: payload.fields.transliteration,
          classicalTranslation: payload.fields.classicalTranslation,
          simpleRewrite: payload.fields.simpleRewrite,
          modernInterpretation: payload.fields.modernInterpretation,
          ethicalMessage: payload.fields.ethicalMessage,
          imageUrl: payload.coverImage,
          audioUrl: payload.audioUrl
        },
        create: {
          chapterId: chapter.id,
          originalText: payload.fields.originalText as string,
          transliteration: payload.fields.transliteration,
          classicalTranslation: payload.fields.classicalTranslation,
          simpleRewrite: payload.fields.simpleRewrite,
          modernInterpretation: payload.fields.modernInterpretation,
          ethicalMessage: payload.fields.ethicalMessage,
          imageUrl: payload.coverImage,
          audioUrl: payload.audioUrl,
          order: payload.order
        }
      });
    }

    case "avestaChapterGuide":
      return {
        resource: payload.resource,
        sectionSlug: payload.sectionSlug,
        chapterSlug: payload.chapterSlug,
        title: payload.title,
        slug: payload.slug,
        coverImage: payload.coverImage,
        accent: payload.accent,
        tone: payload.tone,
        fields: payload.fields,
        note: "AvestaChapterGuide is validated here and should be persisted after adding a production Prisma model or CMS collection."
      };

    case "article":
      return prisma.article.upsert({
        where: { slug: payload.slug as string },
        update: {
          title: payload.title as string,
          excerpt: payload.summary as string,
          content: payload.fields.content as string,
          category: payload.category,
          tags: payload.tags,
          seoTitle: payload.seoTitle,
          seoDescription: payload.seoDescription
        },
        create: {
          title: payload.title as string,
          slug: payload.slug as string,
          excerpt: payload.summary as string,
          content: payload.fields.content as string,
          category: payload.category,
          tags: payload.tags,
          seoTitle: payload.seoTitle,
          seoDescription: payload.seoDescription,
          publishedAt: new Date()
        }
      });

    case "glossaryTerm":
      return prisma.glossaryTerm.upsert({
        where: { slug: payload.slug as string },
        update: {
          term: payload.title as string,
          meaning: payload.fields.meaning as string,
          root: payload.fields.root,
          description: payload.fields.description ?? payload.summary
        },
        create: {
          term: payload.title as string,
          slug: payload.slug as string,
          meaning: payload.fields.meaning as string,
          root: payload.fields.root,
          description: payload.fields.description ?? payload.summary
        }
      });

    case "libraryItem":
      return prisma.libraryItem.upsert({
        where: { title_language: { title: payload.title as string, language: payload.language as string } },
        update: {
          author: payload.author,
          description: payload.summary,
          fileUrl: payload.fileUrl as string,
          coverImage: payload.coverImage,
          type: payload.type as string,
          source: payload.source
        },
        create: {
          title: payload.title as string,
          author: payload.author,
          description: payload.summary,
          fileUrl: payload.fileUrl as string,
          coverImage: payload.coverImage,
          language: payload.language as string,
          type: payload.type as string,
          source: payload.source
        }
      });

    default:
      throw new Error("Unsupported resource.");
  }
}
