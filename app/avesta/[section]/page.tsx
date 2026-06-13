import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookMarked, Headphones, Quote, Share2, Sparkles } from "lucide-react";
import { ReadingControls } from "@/components/reading-controls";
import { avestaSections } from "@/lib/content";
import {
  getAvestaSection,
  getLocaleFromSearchParams,
  getSectionChapters,
  getSectionSampleVerse
} from "@/lib/avesta-repository";

type PageProps = {
  params: {
    section: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

export function generateStaticParams() {
  return avestaSections.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const locale = getLocaleFromSearchParams(searchParams);
  const section = await getAvestaSection(params.section, locale);

  if (!section) {
    return {};
  }

  return {
    title: section.title,
    description: section.description
  };
}

export default async function AvestaSectionPage({ params, searchParams }: PageProps) {
  const locale = getLocaleFromSearchParams(searchParams);
  const section = await getAvestaSection(params.section, locale);

  if (!section) {
    notFound();
  }

  const sampleVerse = await getSectionSampleVerse(params.section, locale);
  const chapters = await getSectionChapters(params.section, locale);
  const langQuery = locale === "en" ? "?lang=en" : "";

  return (
    <main className="overflow-hidden pt-24" dir={locale === "en" ? "ltr" : "rtl"}>
      <section className="hero-cosmos relative min-h-[720px]">
        <div className="hero-horizon" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night to-transparent" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/24 bg-black/22 px-4 py-2 text-sm font-bold text-gold-light">
              اوستا / {section.title}
            </p>
            <h1 className="gold-text mt-6 text-6xl font-black leading-[1.12] sm:text-7xl">{section.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-10 text-warm/82">{section.description}</p>

            <div className="mt-8 h-2 max-w-lg overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gradient-to-l from-gold-light to-gold" style={{ width: `${sampleVerse.progress}%` }} />
            </div>
            <p className="mt-3 text-xs text-muted">پیشرفت نمونه مطالعه: {sampleVerse.progress}%</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-3 font-bold text-night">
                <BookMarked size={18} />
                ذخیره مطالعه
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-gold/25 px-5 py-3 font-bold text-gold-light">
                <Share2 size={18} />
                اشتراک‌گذاری
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-gold/25 px-5 py-3 font-bold text-gold-light">
                <Headphones size={18} />
                پخش صوت
              </button>
            </div>
          </div>

          <div className={`image-scene ${section.atmosphere} min-h-[470px] rounded-[22px] border border-gold/20 shadow-2xl shadow-black/50`}>
            <div className="absolute inset-x-10 bottom-10 z-10 h-px bg-gradient-to-l from-transparent via-gold/60 to-transparent" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <ReadingControls />

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="lux-frame rounded-[18px] p-7">
            <h2 className="text-3xl font-black text-warm">{section.title} چیست؟</h2>
            <p className="reader-text mt-5 text-muted">
              این صفحه مسیر مطالعه بخش را مثل یک اتاق موزه نشان می‌دهد: معرفی، فصل‌ها، بندهای نمونه، لایه‌های
              ترجمه و پیام اخلاقی برای امروز.
            </p>
          </article>

          <article className="lux-frame rounded-[18px] p-7">
            <p className="text-sm font-bold text-gold-light">{sampleVerse.chapterTitle}</p>
            <h2 className="mt-3 text-3xl font-black text-warm">{sampleVerse.verseNumber}</h2>
            <p className="reader-text mt-4 text-muted">{sampleVerse.quote}</p>
          </article>
        </div>

        <section className="mt-8 lux-frame rounded-[18px] p-7">
          <p className="text-sm font-bold text-gold-light">فصل‌ها و بندهای نمونه</p>
          <h2 className="mt-3 text-3xl font-black text-warm">مسیر مطالعه</h2>
          <div className="mt-6 grid gap-4">
            {chapters.length ? (
              chapters.map((chapter) => (
                <div key={chapter.slug} className="rounded-2xl border border-gold/10 bg-black/24 p-5">
                  <h3 className="text-2xl font-black text-warm">{chapter.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{chapter.description}</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {chapter.verses.map((verse) => (
                      <Link
                        key={verse.slug}
                        href={`/avesta/${section.slug}/${chapter.slug}/${verse.slug}${langQuery}`}
                        className="inline-flex items-center justify-between gap-4 rounded-2xl border border-gold/10 bg-night/55 p-4 text-gold-light transition hover:border-gold/40 hover:bg-gold/10"
                      >
                        <span className="font-bold">{verse.title}</span>
                        <ArrowLeft size={18} />
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="reader-text text-muted">فصل‌های این بخش بعد از ورود محتوای کامل از پنل مدیریت اضافه می‌شوند.</p>
            )}
          </div>
        </section>

        <div className="mt-8 grid gap-5">
          {sampleVerse.blocks.map((block) => (
            <section key={block.label} className="lux-frame rounded-[18px] p-6">
              <p className="text-sm font-bold text-gold-light">{block.label}</p>
              <h3 className="mt-3 text-2xl font-black text-warm">{block.title}</h3>
              <p className="reader-text mt-3 text-muted">{block.body}</p>
            </section>
          ))}
        </div>

        <blockquote className="mt-8 rounded-[18px] border border-gold/20 bg-gold/10 p-7">
          <Quote className="text-gold-light" />
          <p className="mt-4 text-2xl font-black leading-10 text-warm">پندار نیک، گفتار نیک، کردار نیک</p>
          <p className="reader-text mt-4 text-muted">{sampleVerse.ethicalMessage}</p>
        </blockquote>

        <div className="mt-8 rounded-[18px] border border-gold/15 bg-gold/10 p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Sparkles size={19} />
            <h3 className="text-xl font-black">پیام اخلاقی</h3>
          </div>
          <p className="reader-text mt-4 text-warm">{sampleVerse.ethicalMessage}</p>
        </div>
      </section>
    </main>
  );
}
