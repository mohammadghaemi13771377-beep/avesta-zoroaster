import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  Headphones,
  Image as ImageIcon,
  Music2,
  Quote,
  Share2,
  Sparkles,
} from "lucide-react";
import { AvestaReadingTrail } from "@/components/avesta-reading-trail";
import { AvestaVerseFocus } from "@/components/avesta-verse-focus";
import { InlineGlossaryText } from "@/components/inline-glossary-text";
import { QuoteShareCard } from "@/components/quote-share-card";
import { ReadingControls } from "@/components/reading-controls";
import { RitualAudioPlayer } from "@/components/ritual-audio-player";
import { SourceTrustPanel } from "@/components/source-trust-panel";
import { VerseQuickActions } from "@/components/verse-quick-actions";
import { WisdomPath } from "@/components/wisdom-path";
import {
  getAvestaSection,
  getLocaleFromSearchParams,
  getSectionChapters,
  getVerseBySlugs,
  type AvestaVerseBlock,
  type AvestaVerseView,
} from "@/lib/avesta-repository";
import { getAvestaChapterGuide } from "@/lib/avesta-chapter-guides";
import { getMediaAssetsForVerse } from "@/lib/media-repository";
import { glossaryTerms, sampleVerses } from "@/lib/sample-content";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/seo";
import { getVerseTrustProfile } from "@/lib/source-trust";

type PageProps = {
  params: {
    section: string;
    chapter: string;
    verse: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

const readerFeatures: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: BookMarked,
    title: "ذخیره مطالعه",
    description: "این بند را به مسیر شخصی خود اضافه کن و بعداً دقیقاً از همین نقطه ادامه بده.",
  },
  {
    icon: Headphones,
    title: "روایت صوتی",
    description: "جایگاه پخش صوت آماده است تا نسخه آوایی، پادکست یا توضیح موبد به آن وصل شود.",
  },
  {
    icon: Share2,
    title: "کارت نقل قول",
    description: "پیام طلایی بند را برای شبکه‌های اجتماعی یا یادداشت شخصی آماده کن.",
  },
];

export function generateStaticParams() {
  return sampleVerses
    .filter((verse) => verse.chapterSlug && verse.verseSlug)
    .map((verse) => ({
      section: verse.sectionSlug,
      chapter: verse.chapterSlug as string,
      verse: verse.verseSlug as string,
    }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const locale = getLocaleFromSearchParams(searchParams);
  const section = await getAvestaSection(params.section, locale);
  const chapters = await getSectionChapters(params.section, locale);
  const chapter = chapters.find((item) => item.slug === params.chapter);
  const verse = await getVerseBySlugs(params.section, params.chapter, params.verse, locale);
  const guide = getAvestaChapterGuide(params.section, params.chapter);

  if (!section || !chapter || !verse) {
    return {
      title: "بند اوستا | AVESTA-ZOROASTER",
    };
  }

  const title = `${verse.verseNumber} | ${chapter.title} | ${section.title}`;
  const description = verse.quote || verse.ethicalMessage || chapter.description || section.description;
  const image = guide?.coverImage ?? section.coverImage ?? "/images/ai/avesta-portal.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function AvestaVersePage({ params, searchParams }: PageProps) {
  const locale = getLocaleFromSearchParams(searchParams);
  const section = await getAvestaSection(params.section, locale);
  const chapters = await getSectionChapters(params.section, locale);
  const chapter = chapters.find((item) => item.slug === params.chapter);
  const verse = await getVerseBySlugs(params.section, params.chapter, params.verse, locale);

  if (!section || !chapter || !verse) {
    notFound();
  }

  const langQuery = locale === "en" ? "?lang=en" : "";
  const guide = getAvestaChapterGuide(section.slug, chapter.slug);
  const heroImage = guide?.coverImage ?? section.coverImage ?? "/images/ai/avesta-portal.jpg";
  const activeChapterIndex = chapters.findIndex((item) => item.slug === chapter.slug);
  const activeVerseIndex = chapter.verses.findIndex((item) => item.slug === params.verse);
  const verseOrder = activeVerseIndex >= 0 ? activeVerseIndex + 1 : Number(params.verse.replace("verse-", "")) || 1;
  const nextVerse = activeVerseIndex >= 0 ? chapter.verses[activeVerseIndex + 1] : undefined;
  const relatedTerms = getRelatedTermsForVerse(verse);
  const relatedMedia = await getMediaAssetsForVerse(section.slug, chapter.slug, verseOrder);
  const trustProfile = getVerseTrustProfile(section.title, chapter.title);
  const chapterHref = `/avesta/${section.slug}/${chapter.slug}${langQuery}`;
  const pageHref = `/avesta/${section.slug}/${chapter.slug}/${params.verse}`;
  const nextHref = nextVerse ? `/avesta/${section.slug}/${chapter.slug}/${nextVerse.slug}${langQuery}` : `/avesta/${section.slug}${langQuery}`;
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "خانه", href: "/" },
      { name: "اوستا", href: "/avesta" },
      { name: section.title, href: `/avesta/${section.slug}` },
      { name: chapter.title, href: `/avesta/${section.slug}/${chapter.slug}` },
      { name: verse.verseNumber, href: pageHref },
    ]),
    creativeWorkJsonLd({
      name: `${verse.verseNumber} | ${chapter.title}`,
      description: verse.quote,
      url: pageHref,
      image: heroImage,
    }),
  ];

  return (
    <main className="overflow-hidden pt-24" dir={locale === "en" ? "ltr" : "rtl"}>
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      <section className="hero-cosmos relative isolate min-h-[720px] overflow-hidden">
        <Image src={heroImage} alt={guide?.title ?? chapter.title} fill priority sizes="100vw" className="object-cover object-center opacity-82" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#fff2c5]/10 via-[#071521]/42 to-[#05080d]/86" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(242,213,138,0.26),transparent_32%),radial-gradient(circle_at_78%_48%,rgba(126,217,230,0.13),transparent_34%)]" />
        <div className="hero-horizon" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-night via-night/62 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:pl-[44%] lg:pr-8 lg:py-28">
          <Link
            href={chapterHref}
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-black/24 px-4 py-2 text-sm font-bold text-gold-light transition hover:border-gold/55"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به {chapter.title}
          </Link>

          <div className="hub-hero-copy mt-10 max-w-3xl">
            <p className="hub-hero-eyebrow text-sm font-black text-gold-light">
              {section.title} / {chapter.title}
            </p>
            <h1 className="hub-hero-title gold-text mt-4 text-5xl font-black leading-tight sm:text-7xl">
              {verse.verseNumber}
            </h1>
            <p className="hub-hero-lead mt-6 max-w-3xl text-lg font-semibold leading-10 text-warm/90">
              {verse.quote}
            </p>
            <VerseQuickActions />

            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {readerFeatures.map((feature) => (
                <FeatureBadge key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <AvestaReadingTrail
        section={section}
        chapter={chapter}
        verse={verse}
        totalChapters={chapters.length}
        totalVerses={chapter.verses.length}
        activeChapterIndex={activeChapterIndex}
        activeVerseIndex={activeVerseIndex}
        langQuery={langQuery}
      />

      <AvestaVerseFocus
        section={section}
        chapter={chapter}
        verse={verse}
        activeVerseSlug={params.verse}
        relatedTerms={relatedTerms}
        langQuery={langQuery}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <ReadingControls />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="space-y-6">
            <SourceTrustPanel profile={trustProfile} />

            {guide ? (
              <section className="lux-frame p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/25 bg-gold/12 text-gold-light">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-black text-gold-light">CURATOR NOTE</p>
                    <h2 className="text-3xl font-black text-warm">جایگاه این بند در مسیر فصل</h2>
                  </div>
                </div>
                <p className="reader-text mt-5 text-muted">{guide.curatorNote ?? guide.chapterIntro}</p>
              </section>
            ) : null}

            <RitualAudioPlayer
              title={`روایت صوتی ${verse.verseNumber}`}
              subtitle={`${section.title} / ${chapter.title}`}
              audioUrl={verse.audioUrl}
              quote={verse.quote}
            />

            <section className="lux-frame overflow-hidden p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-gold/25 bg-gold/12 text-gold-light">
                  <Quote className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-black text-gold-light">GOLDEN QUOTE</p>
                  <blockquote className="mt-3 text-2xl font-black leading-[2] text-warm">«{verse.quote}»</blockquote>
                </div>
              </div>
            </section>

            <QuoteShareCard
              quote={verse.quote}
              sectionTitle={section.title}
              chapterTitle={chapter.title}
              verseNumber={verse.verseNumber}
            />

            <section className="lux-frame p-6 sm:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black text-gold-light">READING LAYERS</p>
                  <h2 className="mt-2 text-3xl font-black text-warm">لایه‌های مطالعه این بند</h2>
                </div>
                <Link href={chapterHref} className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-black text-gold-light hover:bg-gold/15">
                  فهرست بندها
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {verse.blocks.map((block) => (
                  <VerseBlock key={`${block.label}-${block.title}`} block={block} relatedTerms={relatedTerms} />
                ))}
              </div>
            </section>

            <section className="lux-frame bg-gold/10 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-gold/25 bg-night/35 text-gold-light">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-black text-gold-light">پیام امروزی</p>
                  <p className="reader-text mt-3 font-bold text-warm">{verse.ethicalMessage}</p>
                </div>
              </div>
            </section>

            <WisdomPath
              sectionTitle={section.title}
              chapterTitle={chapter.title}
              verseNumber={verse.verseNumber}
              terms={relatedTerms}
              nextHref={nextHref}
              nextTitle={nextVerse ? nextVerse.title : `بازگشت به ${section.title}`}
            />
          </article>

          <aside className="space-y-5">
            <section className="lux-frame p-5">
              <div className="flex items-center gap-2 text-gold-light">
                <BookOpen className="h-5 w-5" />
                <h2 className="font-black text-warm">همین فصل</h2>
              </div>
              <div className="mt-4 space-y-2">
                {chapter.verses.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={`/avesta/${section.slug}/${chapter.slug}/${item.slug}${langQuery}`}
                    className={`block rounded-2xl border p-4 transition ${
                      item.slug === params.verse
                        ? "border-gold/44 bg-gold/12 text-warm"
                        : "border-gold/10 bg-night/45 text-muted hover:border-gold/35 hover:bg-gold/10"
                    }`}
                  >
                    <span className="text-xs font-black text-gold-light">بند {index + 1}</span>
                    <span className="mt-1 block font-black">{item.title}</span>
                    <span className="mt-2 line-clamp-2 text-xs leading-6">{item.excerpt}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="lux-frame p-5">
              <div className="flex items-center gap-2 text-gold-light">
                <Music2 className="h-5 w-5" />
                <h2 className="font-black text-warm">رسانه‌های مرتبط</h2>
              </div>
              <div className="mt-4 space-y-3">
                {relatedMedia.slice(0, 3).map((asset) => (
                  <Link key={asset.slug} href={asset.href ?? `/media/${asset.slug}`} className="group block overflow-hidden rounded-2xl border border-gold/10 bg-night/45 transition hover:border-gold/35 hover:bg-gold/10">
                    <div className="relative aspect-video overflow-hidden bg-gold/10">
                      {asset.thumbnail ? (
                        <Image src={asset.thumbnail} alt={asset.title} fill sizes="320px" className="object-cover transition duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="grid h-full place-items-center text-gold-light">
                          <ImageIcon className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-black text-gold-light">{asset.type}</p>
                      <h3 className="mt-1 font-black text-warm">{asset.title}</h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted">{asset.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="lux-frame p-5">
              <div className="flex items-center gap-2 text-gold-light">
                <BookMarked className="h-5 w-5" />
                <h2 className="font-black text-warm">ورود محتوا از ادمین</h2>
              </div>
              <p className="mt-3 text-sm leading-8 text-muted">
                برای همین بند می‌توانی بعداً از پنل ادمین متن اوستایی، ترجمه، بازنویسی، تحلیل، تصویر و فایل صوتی واقعی وارد کنی.
              </p>
              <Link href="/admin" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
                رفتن به پنل ادمین
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

function getRelatedTermsForVerse(verse: AvestaVerseView) {
  const text = [verse.quote, verse.ethicalMessage, ...verse.blocks.map((block) => `${block.title} ${block.body}`)].join(" ");
  const matched = glossaryTerms.filter((term) => text.includes(term.term) || text.includes(term.meaning));

  return (matched.length ? matched : glossaryTerms.slice(0, 4)).slice(0, 6).map((term) => ({
    term: term.term,
    slug: term.slug,
    meaning: term.meaning,
  }));
}

function FeatureBadge({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="avesta-reader-feature-badge rounded-2xl border border-gold/16 bg-black/24 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.26)] backdrop-blur-md">
      <Icon className="h-5 w-5 text-gold-light" />
      <h3 className="mt-3 text-sm font-black text-warm">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-warm/70">{description}</p>
    </div>
  );
}

function VerseBlock({ block, relatedTerms }: { block: AvestaVerseBlock; relatedTerms: Array<{ term: string; slug: string; meaning: string }> }) {
  return (
    <section className="avesta-reading-layer-card rounded-[22px] border border-gold/12 bg-night/50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-xs font-black text-gold-light">
          {block.label}
        </span>
        <span className="h-px min-w-20 flex-1 bg-gradient-to-l from-gold/28 to-transparent" />
      </div>
      <h3 className="mt-4 text-2xl font-black text-warm">{block.title}</h3>
      <InlineGlossaryText text={block.body} terms={relatedTerms} className="reader-text mt-4 text-muted" />
    </section>
  );
}
