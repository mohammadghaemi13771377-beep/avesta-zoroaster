import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Headphones, Landmark, Route, Sparkles, Tags } from "lucide-react";
import { AvestaChapterFocus } from "@/components/avesta-chapter-focus";
import { AvestaPosterExperience } from "@/components/avesta-poster-experience";
import { AvestaReadingTrail } from "@/components/avesta-reading-trail";
import { ReadingControls } from "@/components/reading-controls";
import { avestaSections } from "@/lib/content";
import { sampleChapters } from "@/lib/sample-content";
import {
  getAvestaSection,
  getLocaleFromSearchParams,
  getSectionChapters,
  getVerseBySlugs,
} from "@/lib/avesta-repository";
import { getAvestaChapterGuide } from "@/lib/avesta-chapter-guides";
import { getAvestaChapterProfile } from "@/lib/avesta-chapter-profiles";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/seo";

type PageProps = {
  params: {
    section: string;
    chapter: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

export function generateStaticParams() {
  return sampleChapters.map((chapter) => ({
    section: chapter.sectionSlug,
    chapter: chapter.slug,
  }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const locale = getLocaleFromSearchParams(searchParams);
  const section = await getAvestaSection(params.section, locale);
  const chapters = await getSectionChapters(params.section, locale);
  const chapter = chapters.find((item) => item.slug === params.chapter);
  const profile = getAvestaChapterProfile(params.section, params.chapter);
  const guide = getAvestaChapterGuide(params.section, params.chapter);

  if (!section || !chapter) {
    return {};
  }

  const description = profile?.summary ?? chapter.description ?? section.description;
  const image = guide?.coverImage ?? section.coverImage;

  return {
    title: `${chapter.title} | ${section.title}`,
    description,
    openGraph: {
      title: `${chapter.title} | ${section.title}`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function AvestaChapterPage({ params, searchParams }: PageProps) {
  const locale = getLocaleFromSearchParams(searchParams);
  const section = await getAvestaSection(params.section, locale);
  const chapters = await getSectionChapters(params.section, locale);
  const chapter = chapters.find((item) => item.slug === params.chapter);

  if (!section || !chapter) {
    notFound();
  }

  const langQuery = locale === "en" ? "?lang=en" : "";
  const guide = getAvestaChapterGuide(section.slug, chapter.slug);
  const profile = getAvestaChapterProfile(section.slug, chapter.slug);
  const heroImage = guide?.coverImage ?? section.coverImage;
  const firstVerseSlug = chapter.verses[0]?.slug ?? "verse-1";
  const firstVerse = await getVerseBySlugs(section.slug, chapter.slug, firstVerseSlug, locale);
  const activeChapterIndex = chapters.findIndex((item) => item.slug === chapter.slug);
  const pageHref = `/avesta/${section.slug}/${chapter.slug}`;
  const description = profile?.summary ?? chapter.description ?? section.description;
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "خانه", href: "/" },
      { name: "اوستا", href: "/avesta" },
      { name: section.title, href: `/avesta/${section.slug}` },
      { name: chapter.title, href: pageHref },
    ]),
    creativeWorkJsonLd({
      name: `${chapter.title} | ${section.title}`,
      description,
      url: pageHref,
      image: heroImage,
    }),
  ];

  return (
    <main className="overflow-hidden pt-24" dir={locale === "en" ? "ltr" : "rtl"}>
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      <section className="hero-cosmos relative isolate min-h-[700px] overflow-hidden">
        {heroImage ? (
          <Image src={heroImage} alt={guide?.title ?? chapter.title} fill priority sizes="100vw" className="object-cover object-center opacity-78" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-l from-[#fff2c5]/8 via-[#071521]/46 to-[#05080d]/84" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(242,213,138,0.22),transparent_34%),radial-gradient(circle_at_76%_42%,rgba(92,166,255,0.14),transparent_32%)]" />
        <div className="hero-horizon" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night via-night/55 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:pl-[45%] lg:pr-8 lg:py-28">
          <Link
            href={`/avesta/${section.slug}${langQuery}`}
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-black/24 px-4 py-2 text-sm font-bold text-gold-light transition hover:border-gold/55"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به {section.title}
          </Link>

          <div className="hub-hero-copy mt-10 max-w-3xl">
            <p className="hub-hero-eyebrow text-sm font-black text-gold-light">اوستا / {section.title}</p>
            <h1 className="hub-hero-title gold-text mt-4 text-5xl font-black leading-tight sm:text-7xl">{chapter.title}</h1>
            <p className="hub-hero-lead mt-6 max-w-3xl text-lg font-semibold leading-10 text-warm/88">
              {guide?.chapterIntro ?? description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/avesta/${section.slug}/${chapter.slug}/${firstVerseSlug}${langQuery}`}
                className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light"
              >
                شروع مطالعه بندها
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                href={`/media?section=${section.slug}&chapter=${chapter.slug}`}
                className="inline-flex items-center gap-2 rounded-xl border border-gold/25 bg-black/18 px-5 py-3 font-bold text-gold-light transition hover:bg-gold/10"
              >
                <Headphones className="h-4 w-4" />
                رسانه های مرتبط
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <HeroStat label="بند آماده" value={`${chapter.verses.length}`} />
              <HeroStat label="قالب تصویری" value={guide ? "فعال" : "عمومی"} />
              <HeroStat label="مسیر" value="اختصاصی" />
            </div>
          </div>
        </div>
      </section>

      <AvestaReadingTrail
        section={section}
        chapter={chapter}
        totalChapters={chapters.length}
        activeChapterIndex={activeChapterIndex}
        langQuery={langQuery}
      />

      {guide ? (
        <AvestaPosterExperience
          guide={guide}
          langQuery={langQuery}
          primaryHref={`/avesta/${section.slug}/${chapter.slug}/${firstVerseSlug}${langQuery}`}
          primaryLabel="شروع مطالعه بندها"
        />
      ) : null}

      <AvestaChapterFocus section={section} chapter={chapter} chapters={chapters} profile={profile} langQuery={langQuery} />

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <ReadingControls />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="lux-frame p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/12 text-gold-light">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-black text-gold-light">CHAPTER EXPERIENCE</p>
                <h2 className="text-3xl font-black text-warm">{chapter.title} چیست؟</h2>
              </div>
            </div>
            <p className="reader-text mt-5 text-muted">
              {description}
            </p>
            {guide?.curatorNote ? (
              <div className="mt-6 rounded-2xl border border-gold/18 bg-gold/10 p-5">
                <p className="text-sm font-black text-gold-light">یادداشت طراحی</p>
                <p className="mt-2 leading-8 text-warm/82">{guide.curatorNote}</p>
              </div>
            ) : null}
          </article>

          <aside className="poster-parchment p-6">
            <p className="text-sm font-black text-night/65">پیام محوری</p>
            <h3 className="mt-3 text-2xl font-black text-night">{firstVerse?.quote ?? "پندار نیک، گفتار نیک، کردار نیک"}</h3>
            <p className="mt-4 leading-8 text-night/78">{firstVerse?.ethicalMessage ?? section.description}</p>
          </aside>
        </div>

        {profile ? (
          <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="grid gap-4 md:grid-cols-2">
              <article className="lux-frame p-6">
                <div className="flex items-center gap-3 text-gold-light">
                  <Landmark className="h-5 w-5" />
                  <h3 className="text-xl font-black text-warm">زمینه تاریخی</h3>
                </div>
                <p className="mt-4 leading-8 text-muted">{profile.historicalContext}</p>
              </article>
              <article className="lux-frame p-6">
                <div className="flex items-center gap-3 text-gold-light">
                  <Route className="h-5 w-5" />
                  <h3 className="text-xl font-black text-warm">زمینه آیینی و تجربه کاربر</h3>
                </div>
                <p className="mt-4 leading-8 text-muted">{profile.ritualContext}</p>
              </article>
            </div>

            <aside className="poster-panel p-6">
              <div className="flex items-center gap-3 text-gold-light">
                <Tags className="h-5 w-5" />
                <h3 className="text-xl font-black text-warm">کلیدهای فهم فصل</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.keyThemes.map((theme) => (
                  <span key={theme} className="rounded-full border border-gold/20 bg-gold/10 px-3 py-2 text-sm font-bold text-gold-light">
                    {theme}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-muted">{profile.imageAlt.fa}</p>
            </aside>
          </section>
        ) : null}

        <section className="mt-8 lux-frame p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black text-gold-light">بندها و قطعه های آماده</p>
              <h2 className="mt-2 text-3xl font-black text-warm">مسیر خواندن {chapter.title}</h2>
            </div>
            <Link href={`/media?section=${section.slug}&chapter=${chapter.slug}`} className="text-sm font-bold text-gold-light hover:text-warm">
              رسانه و منابع مرتبط
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {chapter.verses.map((verse, index) => (
              <Link
                key={verse.slug}
                href={`/avesta/${section.slug}/${chapter.slug}/${verse.slug}${langQuery}`}
                className="group rounded-2xl border border-gold/12 bg-night/58 p-5 transition hover:-translate-y-1 hover:border-gold/45 hover:bg-gold/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-serif text-2xl text-gold-light">{index + 1}</p>
                    <h3 className="mt-2 text-2xl font-black text-warm">{verse.title}</h3>
                  </div>
                  <ArrowLeft className="mt-2 h-5 w-5 text-gold-light transition group-hover:-translate-x-1" />
                </div>
                <p className="mt-3 leading-8 text-muted">{verse.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        {guide ? (
          <section className="mt-8 grid gap-4 md:grid-cols-3">
            {guide.todayPractice.map((practice, index) => (
              <article key={practice} className="poster-panel p-5">
                <Sparkles className="h-5 w-5 text-gold-light" />
                <p className="mt-4 font-serif text-3xl text-gold-light">{index + 1}</p>
                <h3 className="mt-2 text-lg font-black text-warm">تمرین کوتاه</h3>
                <p className="mt-2 leading-7 text-muted">{practice}</p>
              </article>
            ))}
          </section>
        ) : null}

        {profile ? (
          <section className="mt-8 lux-frame p-6 sm:p-8">
            <div>
              <p className="text-sm font-black text-gold-light">مسیرهای پیشنهادی</p>
              <h2 className="mt-2 text-3xl font-black text-warm">بعد از {chapter.title} کجا برویم؟</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {profile.relatedChapters.map((item) => (
                <Link
                  key={item.href}
                  href={`${item.href}${langQuery}`}
                  className="group rounded-2xl border border-gold/12 bg-night/58 p-5 transition hover:-translate-y-1 hover:border-gold/45 hover:bg-gold/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-warm">{item.title}</h3>
                      <p className="mt-3 leading-8 text-muted">{item.reason}</p>
                    </div>
                    <ArrowLeft className="mt-2 h-5 w-5 text-gold-light transition group-hover:-translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/16 bg-black/22 p-4 backdrop-blur">
      <p className="text-xs font-black text-gold-light">{label}</p>
      <p className="mt-2 text-lg font-black text-warm">{value}</p>
    </div>
  );
}
