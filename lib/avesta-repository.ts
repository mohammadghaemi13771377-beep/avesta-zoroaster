import { avestaSections } from "@/lib/content";
import { sampleChapters, sampleVerses } from "@/lib/sample-content";
import { isLocale, type Locale } from "@/lib/i18n";

type SearchParams = Record<string, string | string[] | undefined> | undefined;
type PrismaLocale = "FA" | "EN";

export type AvestaSectionView = {
  title: string;
  slug: string;
  href: string;
  description: string;
  atmosphere: string;
  roman?: string;
  coverImage?: string | null;
  themeColor?: string | null;
  order?: number;
};

export type AvestaChapterView = {
  sectionSlug: string;
  title: string;
  slug: string;
  description?: string | null;
  verses: {
    title: string;
    slug: string;
    excerpt: string;
  }[];
};

export type AvestaVerseBlock = {
  label: string;
  title: string;
  body: string;
};

export type AvestaVerseView = {
  sectionSlug: string;
  chapterSlug?: string;
  verseSlug?: string;
  chapterTitle: string;
  verseNumber: string;
  quote: string;
  progress: number;
  ethicalMessage: string;
  audioUrl?: string | null;
  blocks: AvestaVerseBlock[];
};

const atmosphereBySlug = new Map(avestaSections.map((section) => [section.slug, section.atmosphere]));

function toPrismaLocale(locale: Locale): PrismaLocale {
  return locale === "en" ? "EN" : "FA";
}

export function getLocaleFromSearchParams(searchParams: SearchParams): Locale {
  const rawLocale = searchParams?.lang;
  const locale = Array.isArray(rawLocale) ? rawLocale[0] : rawLocale;

  return locale && isLocale(locale) ? locale : "fa";
}

export async function getAvestaSections(locale: Locale = "fa"): Promise<AvestaSectionView[]> {
  const databaseSections = await readSectionsFromDatabase(locale);

  if (databaseSections.length) {
    return databaseSections;
  }

  return avestaSections.map((section, index) => ({
    ...section,
    coverImage: null,
    themeColor: null,
    order: index + 1
  }));
}

export async function getAvestaSection(slug: string, locale: Locale = "fa") {
  const sections = await getAvestaSections(locale);
  return sections.find((section) => section.slug === slug);
}

export async function getSectionChapters(sectionSlug: string, locale: Locale = "fa"): Promise<AvestaChapterView[]> {
  const databaseChapters = await readChaptersFromDatabase(sectionSlug, locale);

  if (databaseChapters.length) {
    return databaseChapters;
  }

  return sampleChapters.filter((chapter) => chapter.sectionSlug === sectionSlug);
}

export async function getSectionSampleVerse(sectionSlug: string, locale: Locale = "fa"): Promise<AvestaVerseView> {
  const databaseVerse = await readFirstVerseFromDatabase(sectionSlug, locale);

  if (databaseVerse) {
    return databaseVerse;
  }

  return sampleVerses.find((verse) => verse.sectionSlug === sectionSlug) ?? sampleVerses[0];
}

export async function getVerseBySlugs(
  sectionSlug: string,
  chapterSlug: string,
  verseSlug: string,
  locale: Locale = "fa"
): Promise<AvestaVerseView | undefined> {
  const databaseVerse = await readVerseFromDatabase(sectionSlug, chapterSlug, verseSlug, locale);

  if (databaseVerse) {
    return databaseVerse;
  }

  return sampleVerses.find(
    (verse) =>
      verse.sectionSlug === sectionSlug && verse.chapterSlug === chapterSlug && verse.verseSlug === verseSlug
  );
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

async function readSectionsFromDatabase(locale: Locale): Promise<AvestaSectionView[]> {
  const prisma = await getPrisma();
  const prismaLocale = toPrismaLocale(locale);

  if (!prisma) {
    return [];
  }

  try {
    const sections = await prisma.avestaSection.findMany({
      orderBy: { order: "asc" },
      include: { translations: true }
    });

    return sections.map((section) => {
      const translation = section.translations.find((item) => item.locale === prismaLocale);

      return {
        title: translation?.title ?? section.title,
        slug: section.slug,
        href: `/avesta/${section.slug}${locale === "en" ? "?lang=en" : ""}`,
        description: translation?.description ?? section.description,
        atmosphere: atmosphereBySlug.get(section.slug) ?? "scene-cosmic",
        coverImage: section.coverImage,
        themeColor: section.themeColor,
        order: section.order
      };
    });
  } catch {
    return [];
  }
}

async function readChaptersFromDatabase(sectionSlug: string, locale: Locale): Promise<AvestaChapterView[]> {
  const prisma = await getPrisma();
  const prismaLocale = toPrismaLocale(locale);

  if (!prisma) {
    return [];
  }

  try {
    const chapters = await prisma.avestaChapter.findMany({
      where: { section: { slug: sectionSlug } },
      orderBy: { order: "asc" },
      include: {
        translations: true,
        verses: {
          orderBy: { order: "asc" },
          include: { translations: true }
        }
      }
    });

    return chapters.map((chapter) => {
      const chapterTranslation = chapter.translations.find((item) => item.locale === prismaLocale);

      return {
        sectionSlug,
        title: chapterTranslation?.title ?? chapter.title,
        slug: chapter.slug,
        description: chapterTranslation?.description ?? chapter.description,
        verses: chapter.verses.map((verse) => {
          const verseTranslation = verse.translations.find((item) => item.locale === prismaLocale);

          return {
            title: `${locale === "en" ? "Verse" : "بند"} ${verse.order}`,
            slug: `verse-${verse.order}`,
            excerpt:
              verseTranslation?.simpleRewrite ??
              verse.simpleRewrite ??
              verseTranslation?.ethicalMessage ??
              verse.ethicalMessage ??
              ""
          };
        })
      };
    });
  } catch {
    return [];
  }
}

async function readFirstVerseFromDatabase(sectionSlug: string, locale: Locale): Promise<AvestaVerseView | undefined> {
  const chapters = await getSectionChapters(sectionSlug, locale);
  const firstChapter = chapters[0];
  const firstVerse = firstChapter?.verses[0];

  if (!firstChapter || !firstVerse) {
    return undefined;
  }

  return readVerseFromDatabase(sectionSlug, firstChapter.slug, firstVerse.slug, locale);
}

async function readVerseFromDatabase(
  sectionSlug: string,
  chapterSlug: string,
  verseSlug: string,
  locale: Locale
): Promise<AvestaVerseView | undefined> {
  const prisma = await getPrisma();
  const order = Number(verseSlug.replace("verse-", ""));
  const prismaLocale = toPrismaLocale(locale);

  if (!prisma || Number.isNaN(order)) {
    return undefined;
  }

  try {
    const verse = await prisma.avestaVerse.findFirst({
      where: {
        order,
        chapter: {
          slug: chapterSlug,
          section: { slug: sectionSlug }
        }
      },
      include: {
        translations: true,
        chapter: {
          include: {
            translations: true
          }
        }
      }
    });

    if (!verse) {
      return undefined;
    }

    const verseTranslation = verse.translations.find((item) => item.locale === prismaLocale);
    const chapterTranslation = verse.chapter.translations.find((item) => item.locale === prismaLocale);

    return {
      sectionSlug,
      chapterSlug,
      verseSlug,
      chapterTitle: chapterTranslation?.title ?? verse.chapter.title,
      verseNumber: `${locale === "en" ? "Verse" : "بند"} ${verse.order}`,
      quote: verseTranslation?.simpleRewrite ?? verse.simpleRewrite ?? verse.originalText,
      progress: 12,
      ethicalMessage: verseTranslation?.ethicalMessage ?? verse.ethicalMessage ?? "",
      audioUrl: verse.audioUrl,
      blocks: [
        {
          label: locale === "en" ? "Original Text" : "متن اصلی",
          title: locale === "en" ? "Avestan Layer" : "لایه اوستایی",
          body: verseTranslation?.originalText ?? verse.originalText
        },
        {
          label: locale === "en" ? "Classical Translation" : "ترجمه کلاسیک",
          title: locale === "en" ? "Scholarly Reading" : "خوانش پژوهشی",
          body: verseTranslation?.classicalTranslation ?? verse.classicalTranslation ?? ""
        },
        {
          label: locale === "en" ? "Simple Rewrite" : "بازنویسی ساده",
          title: locale === "en" ? "Plain Language" : "زبان روشن",
          body: verseTranslation?.simpleRewrite ?? verse.simpleRewrite ?? ""
        },
        {
          label: locale === "en" ? "Modern Interpretation" : "تحلیل مفهومی",
          title: locale === "en" ? "Meaning for Today" : "پیام برای اکنون",
          body: verseTranslation?.modernInterpretation ?? verse.modernInterpretation ?? ""
        }
      ].filter((block) => block.body)
    };
  } catch {
    return undefined;
  }
}
