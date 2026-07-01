import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
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

import { ReadingControls } from "@/components/reading-controls";
import { QuoteShareCard } from "@/components/quote-share-card";
import { RitualAudioPlayer } from "@/components/ritual-audio-player";
import { SourceTrustPanel } from "@/components/source-trust-panel";
import { VerseQuickActions } from "@/components/verse-quick-actions";
import { AvestaReadingTrail } from "@/components/avesta-reading-trail";
import { AvestaVerseFocus } from "@/components/avesta-verse-focus";
import { InlineGlossaryText } from "@/components/inline-glossary-text";
import { WisdomPath } from "@/components/wisdom-path";
import {
  getAvestaSection,
  getLocaleFromSearchParams,
  getSectionChapters,
  getVerseBySlugs,
} from "@/lib/avesta-repository";
import { getMediaAssetsForVerse } from "@/lib/media-repository";
import { glossaryTerms, sampleVerses } from "@/lib/sample-content";
import { getVerseTrustProfile } from "@/lib/source-trust";
import { getAvestaChapterGuide } from "@/lib/avesta-chapter-guides";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/seo";

type PageProps = {
  params: {
    section: string;
    chapter: string;
    verse: string;
  };
  searchParams?: {
    lang?: string;
  };
};

export function generateStaticParams() {
  return sampleVerses.map((verse) => ({
    section: verse.sectionSlug,
    chapter: verse.chapterSlug ?? "chapter",
    verse: verse.verseSlug ?? "verse",
  }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const locale = getLocaleFromSearchParams(searchParams);
  const verse = await getVerseBySlugs(params.section, params.chapter, params.verse, locale);

  if (!verse) {
    return {
      title: "بند اوستا | AVESTA-ZOROASTER",
    };
  }

  return {
    title: `${verse.verseNumber} | AVESTA-ZOROASTER`,
    description: verse.ethicalMessage,
    openGraph: {
      title: verse.verseNumber,
      description: verse.ethicalMessage,
      type: "article",
    },
  };
}

const readerFeatures = [
  {
    icon: BookMarked,
    title: "ذخیره مطالعه",
    description: "این بند را برای ادامه مسیر نگه دارید.",
  },
  {
    icon: Headphones,
    title: "روایت صوتی",
    description: "آماده اتصال به فایل صوتی و پادکست.",
  },
  {
    icon: Share2,
    title: "اشتراک‌گذاری",
    description: "نقل‌قول طلایی را با دیگران بفرستید.",
  },
];

export default async function VersePage({ params, searchParams }: PageProps) {
  const locale = getLocaleFromSearchParams(searchParams);
  const section = await getAvestaSection(params.section, locale);
  const chapters = await getSectionChapters(params.section, locale);
  const chapter = chapters.find((item) => item.slug === params.chapter);
  const verse = await getVerseBySlugs(params.section, params.chapter, params.verse, locale);
  const verseOrder = Number(params.verse.replace("verse-", "")) || 1;
  const relatedMedia = await getMediaAssetsForVerse(params.section, params.chapter, verseOrder);
  const langQuery = locale === "en" ? "?lang=en" : "";

  if (!section || !chapter || !verse) {
    notFound();
  }

  const direction = locale === "fa" ? "rtl" : "ltr";
  const orderedVerses = [...chapter.verses];
  const activeVerseIndex = orderedVerses.findIndex((item) => item.slug === params.verse);
  const nextVerse = activeVerseIndex >= 0 ? orderedVerses[activeVerseIndex + 1] : undefined;
  const relatedTerms = getRelatedTermsForVerse(verse);
  const relatedAudio = relatedMedia.find((asset) => asset.type === "Audio" || asset.type === "Podcast");
  const audioUrl = verse.audioUrl ?? relatedAudio?.url ?? null;
  const trustProfile = getVerseTrustProfile(section.title, chapter.title);
  const chapterGuide = getAvestaChapterGuide(section.slug, chapter.slug);
  const chapterHref = `/avesta/${section.slug}/${chapter.slug}${langQuery}`;
  const heroImage = chapterGuide?.coverImage ?? section.coverImage ?? null;
  const pageHref = `/avesta/${section.slug}/${chapter.slug}/${params.verse}`;
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "خانه", href: "/" },
      { name: "اوستا", href: "/avesta" },
      { name: section.title, href: `/avesta/${section.slug}` },
      { name: chapter.title, href: `/avesta/${section.slug}/${chapter.slug}` },
      { name: verse.verseNumber, href: pageHref }
    ]),
    creativeWorkJsonLd({
      name: `${verse.verseNumber} | ${chapter.title}`,
      description: verse.ethicalMessage,
      url: pageHref,
      image: heroImage ?? undefined
    })
  ];

  return (
    <main className="overflow-hidden pt-24" dir={direction}>
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <section className="hero-cosmos relative isolate min-h-[660px] overflow-hidden">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={chapterGuide?.title ?? chapter.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : null}
        <div className="hub-hero-overlay absolute inset-0 bg-gradient-to-l from-[#05080d]/94 via-[#071521]/70 to-[#071521]/18" />
        <div className="hub-hero-side-shade absolute inset-y-0 right-0 w-full bg-[linear-gradient(90deg,rgba(5,8,13,0.03),rgba(5,8,13,0.18)_38%,rgba(5,8,13,0.72)_100%)]" />
        <div className="hero-horizon" />
        <div className="hub-hero-bottom-shade absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-night via-night/55 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:pl-[45%] lg:pr-8 lg:py-28">
          <div>
            <Link
              href={chapterHref}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-obsidian-950/55 px-4 py-2 text-sm text-gold-100 transition hover:border-gold-300/60 hover:text-gold-200"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به {chapter.title}
            </Link>

            <p className="gold-text text-sm font-semibold uppercase tracking-[0.34em]">
              {section.title} / {chapter.title}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-warm-50 sm:text-6xl lg:text-7xl">
              {verse.verseNumber}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-warm-100/82">{verse.ethicalMessage}</p>

            <VerseQuickActions />

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {readerFeatures.map((feature) => (
                <FeatureBadge key={feature.title} {...feature} />
              ))}
            </div>
          </div>

          <div className="hidden lux-frame p-4">
            <div className={`image-scene ${section.atmosphere} min-h-[430px] overflow-hidden rounded-[1.55rem]`}>
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={chapterGuide?.title ?? chapter.title}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover opacity-[0.82]"
                  priority
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/22 to-black/10" />
              <div className="absolute left-8 top-8 text-gold-200/80">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="absolute bottom-8 right-8 max-w-xs">
                <p className="gold-text text-sm font-semibold tracking-[0.25em]">READING ROOM</p>
                <h2 className="mt-3 text-3xl font-black text-warm-50">{chapterGuide?.chapterTitle ?? chapter.title}</h2>
                <p className="mt-3 text-sm leading-7 text-warm-100/72">
                  {chapterGuide?.chapterIntro ?? chapter.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AvestaReadingTrail
        section={section}
        chapter={chapter}
        verse={verse}
        totalChapters={chapters.length}
        totalVerses={orderedVerses.length}
        activeChapterIndex={chapters.findIndex((item) => item.slug === chapter.slug)}
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

      <section className="relative z-10 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="space-y-6">
            <div className="lux-frame p-5 sm:p-7">
              <ReadingControls />
            </div>

            <SourceTrustPanel profile={trustProfile} />

            {chapterGuide ? (
              <section className="poster-panel p-6 sm:p-8" style={{ ["--poster-accent" as string]: chapterGuide.accent }}>
                <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr]">
                  <div className="image-atmosphere relative min-h-[260px] rounded-[20px] border border-gold/15">
                    <Image
                      src={chapterGuide.coverImage}
                      alt={chapterGuide.title}
                      fill
                      sizes="(min-width: 1024px) 360px, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/88 via-night/18 to-transparent" />
                    <div className="absolute bottom-4 right-4 left-4">
                      <p className="text-xs font-black text-gold-light">VISUAL CONTEXT</p>
                      <h2 className="mt-2 text-2xl font-black text-warm">{chapterGuide.chapterTitle}</h2>
                    </div>
                  </div>
                  <div>
                    <p className="gold-text text-sm font-semibold tracking-[0.24em]">CHAPTER GUIDE</p>
                    <h2 className="mt-3 text-3xl font-black text-warm-50">{chapterGuide.title}</h2>
                    <p className="reader-text mt-5 text-warm-100/82">{chapterGuide.subtitle}</p>
                    <blockquote className="mt-5 rounded-2xl border border-gold/18 bg-gold/10 p-5 text-lg font-black leading-9 text-gold-100">
                      «{chapterGuide.leadQuote}»
                    </blockquote>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {chapterGuide.todayPractice.map((practice) => (
                        <span
                          key={practice}
                          className="rounded-full border border-warm-50/10 bg-warm-50/[0.06] px-4 py-2 text-xs font-bold text-warm-100/78"
                        >
                          {practice}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            <div id="ritual-audio" className="scroll-mt-28">
              <RitualAudioPlayer
                title={`روایت صوتی ${verse.verseNumber}`}
                subtitle={`${section.title} / ${chapter.title} - آماده برای خوانش اوستایی، ترجمه و توضیح کوتاه.`}
                audioUrl={audioUrl}
                quote={verse.quote || verse.ethicalMessage}
              />
            </div>

            <div className="lux-frame p-6 sm:p-10">
              <div className="mb-8 flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-200">
                  <Quote className="h-5 w-5" />
                </span>
                <div>
                  <p className="gold-text text-xs font-semibold tracking-[0.24em]">GOLDEN QUOTE</p>
                  <h2 className="text-2xl font-black text-warm-50">نقل‌قول طلایی</h2>
                </div>
              </div>
              <blockquote className="reader-text rounded-[1.5rem] border border-gold-300/20 bg-gold-300/8 p-6 text-2xl font-bold text-gold-100 sm:text-3xl">
                «{verse.quote || verse.ethicalMessage}»
              </blockquote>
            </div>

            <QuoteShareCard
              quote={verse.quote || verse.ethicalMessage}
              sectionTitle={section.title}
              chapterTitle={chapter.title}
              verseNumber={verse.verseNumber}
            />

            {verse.blocks.map((block, index) => (
              <VerseBlock
                key={`${block.label}-${block.title}`}
                eyebrow={block.label}
                title={block.title}
                body={block.body}
                tone={index === 0 ? "gold" : "default"}
                terms={glossaryTerms}
              />
            ))}

            <div className="lux-frame overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div className={`image-scene ${section.atmosphere} min-h-[310px]`}>
                  {heroImage ? (
                    <Image
                      src={heroImage}
                      alt={chapterGuide?.title ?? section.title}
                      fill
                      sizes="(min-width: 1024px) 420px, 100vw"
                      className="object-cover opacity-[0.78]"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/18 to-transparent" />
                </div>
                <div className="p-7 sm:p-10">
                  <p className="gold-text text-sm font-semibold tracking-[0.24em]">TODAY MESSAGE</p>
                  <h2 className="mt-3 text-3xl font-black text-warm-50">پیام امروزی این بند</h2>
                  <p className="reader-text mt-5 text-lg text-warm-100/82">{verse.ethicalMessage}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full border border-gold-400/25 bg-gold-400/10 px-4 py-2 text-sm text-gold-100">
                      اخلاق روزانه
                    </span>
                    <span className="rounded-full border border-warm-50/10 bg-warm-50/5 px-4 py-2 text-sm text-warm-100/75">
                      خرد عملی
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <WisdomPath
              sectionTitle={section.title}
              chapterTitle={chapter.title}
              verseNumber={verse.verseNumber}
              terms={relatedTerms}
              nextHref={
                nextVerse ? `/avesta/${section.slug}/${chapter.slug}/${nextVerse.slug}${langQuery}` : `/dictionary${langQuery}`
              }
              nextTitle={nextVerse ? `بند بعدی: ${nextVerse.title}` : "رفتن به واژه‌نامه"}
            />
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {chapterGuide ? (
              <Link
                href={chapterHref}
                className="poster-parchment block p-5 transition hover:-translate-y-1"
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-night/60">VISUAL CHAPTER</p>
                <h2 className="mt-2 text-2xl font-black text-night">{chapterGuide.chapterTitle}</h2>
                <p className="mt-3 text-sm font-bold leading-7 text-night/78">{chapterGuide.ethicalMessage}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-night">
                  باز کردن صفحه اختصاصی
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ) : null}

            <div className="lux-frame p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/25 bg-gold-400/10 text-gold-200">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <p className="gold-text text-xs font-semibold tracking-[0.22em]">CHAPTER</p>
                  <h2 className="text-xl font-black text-warm-50">{chapter.title}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-warm-100/68">{chapter.description}</p>
              <div className="mt-5 space-y-2">
                {orderedVerses.map((item, index) => {
                  const active = item.slug === params.verse;
                  return (
                    <Link
                      key={item.slug}
                      href={`/avesta/${section.slug}/${chapter.slug}/${item.slug}${langQuery}`}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                        active
                          ? "border-gold-300/50 bg-gold-300/12 text-gold-100"
                          : "border-warm-50/10 bg-warm-50/[0.03] text-warm-100/70 hover:border-gold-300/35 hover:text-gold-100"
                      }`}
                    >
                      <span>{item.title}</span>
                      <span className="font-serif text-gold-200/75">{index + 1}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="lux-frame p-6">
              <p className="gold-text text-xs font-semibold tracking-[0.22em]">RELATED MEDIA</p>
              <h2 className="mt-2 text-xl font-black text-warm-50">رسانه‌های مرتبط</h2>
              <div className="mt-5 space-y-3">
                {relatedMedia.length > 0 ? (
                  relatedMedia.slice(0, 4).map((asset) => {
                    const Icon = asset.type === "Audio" || asset.type === "Podcast" ? Music2 : ImageIcon;
                    return (
                      <Link
                        key={asset.slug}
                        href={`/media/${asset.slug}${langQuery}`}
                        className="group flex gap-3 rounded-2xl border border-warm-50/10 bg-warm-50/[0.03] p-3 transition hover:border-gold-300/35"
                      >
                        <span
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-400/20"
                          style={{ background: `${asset.accent ?? "#D6A84F"}22` }}
                        >
                          <Icon className="h-5 w-5 text-gold-200" />
                        </span>
                        <span>
                          <span className="block font-bold text-warm-50 group-hover:text-gold-100">
                            {asset.title}
                          </span>
                          <span className="mt-1 line-clamp-2 block text-xs leading-6 text-warm-100/58">
                            {asset.description}
                          </span>
                        </span>
                      </Link>
                    );
                  })
                ) : (
                  <p className="rounded-2xl border border-warm-50/10 bg-warm-50/[0.03] p-4 text-sm leading-7 text-warm-100/65">
                    هنوز رسانه اختصاصی برای این بند ثبت نشده است. پنل مدیریت آماده بارگذاری تصویر AI و فایل صوتی است.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function getRelatedTermsForVerse(verse: NonNullable<Awaited<ReturnType<typeof getVerseBySlugs>>>) {
  const searchableText = [
    verse.quote,
    verse.ethicalMessage,
    ...verse.blocks.flatMap((block) => [block.title, block.body])
  ]
    .join(" ")
    .toLowerCase();

  const matchedTerms = glossaryTerms.filter((term) =>
    [term.term, term.slug, term.root, term.meaning]
      .filter(Boolean)
      .some((value) => searchableText.includes(String(value).toLowerCase()))
  );

  return (matchedTerms.length ? matchedTerms : glossaryTerms.slice(0, 3)).slice(0, 4).map((term) => ({
    term: term.term,
    slug: term.slug,
    meaning: term.meaning
  }));
}

function FeatureBadge({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-gold-400/14 bg-black/22 p-4">
      <Icon className="h-5 w-5 text-gold-200" />
      <h3 className="mt-3 text-sm font-black text-warm-50">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-warm-100/62">{description}</p>
    </div>
  );
}

function VerseBlock({
  eyebrow,
  title,
  body,
  tone = "default",
  terms,
}: {
  eyebrow: string;
  title: string;
  body: string;
  tone?: "default" | "gold";
  terms: Array<{ term: string; slug: string; meaning: string }>;
}) {
  return (
    <section className={`reading-paper p-6 sm:p-10 ${tone === "gold" ? "border-gold-300/28 bg-gold-300/[0.045]" : ""}`}>
      <p className="gold-text text-sm font-semibold tracking-[0.24em]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black text-warm-50">{title}</h2>
      <InlineGlossaryText text={body} terms={terms} className="reading-prose mt-6 text-xl text-warm-100/84" />
    </section>
  );
}
