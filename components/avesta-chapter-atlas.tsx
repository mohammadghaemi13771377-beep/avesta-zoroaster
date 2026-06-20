"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Filter, Layers3, Search, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { AvestaChapterView } from "@/lib/avesta-repository";
import { getAvestaChapterGuide } from "@/lib/avesta-chapter-guides";
import { getAvestaChapterProfile } from "@/lib/avesta-chapter-profiles";
import { normalizeSearchText } from "@/lib/search";
import { sectionCoverBySlug } from "@/lib/visual-assets";

type AvestaChapterAtlasProps = {
  sectionSlug: string;
  sectionTitle: string;
  chapters: AvestaChapterView[];
  langQuery?: string;
};

export function AvestaChapterAtlas({ sectionSlug, sectionTitle, chapters, langQuery = "" }: AvestaChapterAtlasProps) {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("همه");

  const chapterEntries = useMemo(
    () => chapters.map((chapter, index) => ({
      chapter,
      index,
      guide: getAvestaChapterGuide(sectionSlug, chapter.slug),
      profile: getAvestaChapterProfile(sectionSlug, chapter.slug),
    })),
    [chapters, sectionSlug],
  );
  const themes = useMemo(
    () => ["همه", ...Array.from(new Set(chapterEntries.flatMap((item) => item.profile?.keyThemes ?? []))).slice(0, 8)],
    [chapterEntries],
  );
  const filteredChapters = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return chapterEntries.filter(({ chapter, guide, profile }) => {
      const matchesTheme = theme === "همه" || profile?.keyThemes.includes(theme);
      const haystack = normalizeSearchText(`${chapter.title} ${chapter.description ?? ""} ${guide?.chapterIntro ?? ""} ${(profile?.keyThemes ?? []).join(" ")}`);
      return matchesTheme && (!normalized || haystack.includes(normalized));
    });
  }, [chapterEntries, query, theme]);

  if (!chapters.length) {
    return (
      <section className="mt-8 lux-frame rounded-[18px] p-7">
        <p className="reader-text text-muted">فصل‌های این بخش بعد از ورود محتوای کامل از پنل مدیریت اضافه می‌شوند.</p>
      </section>
    );
  }

  return (
    <section className="mt-8 lux-frame rounded-[22px] p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
            <Layers3 className="h-4 w-4" />
            اطلس تالارهای {sectionTitle}
          </p>
          <h2 className="mt-4 text-3xl font-black text-warm sm:text-4xl">مسیرهای اختصاصی مطالعه</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            هر کارت یک تالار مستقل است: تصویر، روایت، بندهای نمونه، پیام امروز و مسیر توسعه از پنل ادمین.
          </p>
        </div>
        <Link
          href="/avesta"
          className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-black text-gold-light transition hover:border-gold/45 hover:bg-gold/10"
        >
          نقشه همه بخش‌ها
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <div className="grid gap-3 rounded-2xl border border-gold/12 bg-night/45 p-4 md:grid-cols-[minmax(0,1fr)_220px]">
            <label className="relative block">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`جستجو در تالارهای ${sectionTitle}`} className="h-12 w-full rounded-xl border border-gold/18 bg-night/70 pr-11 pl-11 text-sm text-warm outline-none placeholder:text-muted focus:border-gold" />
              {query ? <button type="button" onClick={() => setQuery("")} className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:text-gold-light" aria-label="پاک کردن جستجو"><X size={15} /></button> : null}
            </label>
            <label className="relative block">
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={16} />
              <select value={theme} onChange={(event) => setTheme(event.target.value)} className="h-12 w-full rounded-xl border border-gold/18 bg-night/70 pr-11 pl-4 text-sm text-warm outline-none focus:border-gold" aria-label="فیلتر کلیدهای فهم">
                {themes.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <p className="mt-3 text-sm text-muted">{filteredChapters.length} تالار در این فهرست پیدا شد.</p>
        </div>
        {filteredChapters.length ? filteredChapters.map(({ chapter, index, guide, profile }) => {
          const coverImage = guide?.coverImage ?? sectionCoverBySlug[sectionSlug];
          const accent = guide?.accent ?? "#D6A84F";
          const firstVerse = chapter.verses[0];
          const chapterHref = `/avesta/${sectionSlug}/${chapter.slug}${langQuery}`;

          return (
            <article
              key={chapter.slug}
              className="poster-story-card group overflow-hidden rounded-[22px] border border-gold/16 transition hover:-translate-y-1 hover:border-gold/45"
              style={{ ["--poster-accent" as string]: accent }}
            >
              <div className="grid min-h-full gap-0 md:grid-cols-[240px_minmax(0,1fr)]">
                <Link href={chapterHref} className="image-atmosphere relative min-h-[250px]">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={chapter.title}
                      fill
                      sizes="(min-width: 1024px) 240px, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-night/88 via-night/18 to-transparent" />
                  <div className="absolute right-4 top-4 rounded-full border border-gold/25 bg-night/58 px-3 py-1 font-serif text-lg text-gold-light backdrop-blur">
                    {index + 1}
                  </div>
                  <div className="absolute bottom-4 right-4 left-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-warm/15 bg-warm/10 px-3 py-1 text-xs font-black text-warm">
                      {guide && profile ? "پوستر + پروفایل فعال" : guide ? "پوستر اختصاصی فعال" : "قالب عمومی"}
                    </span>
                  </div>
                </Link>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-gold-light">CHAPTER ATLAS</p>
                      <h3 className="mt-2 text-2xl font-black leading-9 text-warm">{chapter.title}</h3>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/18 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                      <BookOpen className="h-3.5 w-3.5" />
                      {chapter.verses.length} بند
                    </span>
                  </div>

                  <p className="mt-3 min-h-16 leading-8 text-muted">{guide?.chapterIntro ?? chapter.description}</p>

                  {profile?.keyThemes.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {profile.keyThemes.slice(0, 4).map((theme) => (
                        <span
                          key={theme}
                          className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {guide?.leadQuote ? (
                    <blockquote className="mt-4 rounded-2xl border border-gold/15 bg-gold/10 p-4 text-sm font-bold leading-7 text-warm/86">
                      «{guide.leadQuote}»
                    </blockquote>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={chapterHref}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-black text-night transition hover:bg-gold-light"
                    >
                      ورود به صفحه اختصاصی
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                    {firstVerse ? (
                      <Link
                        href={`/avesta/${sectionSlug}/${chapter.slug}/${firstVerse.slug}${langQuery}`}
                        className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/16 px-4 py-2 text-sm font-black text-gold-light transition hover:border-gold/45 hover:bg-gold/10"
                      >
                        شروع از بند اول
                        <Sparkles className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          );
        }) : <div className="lux-frame p-8 text-center lg:col-span-2"><Search className="mx-auto text-gold-light" size={30} /><h3 className="mt-4 text-2xl font-black text-warm">تالاری پیدا نشد</h3><p className="mt-3 text-muted">کلیدواژه یا فیلتر مفهومی را تغییر دهید.</p></div>}
      </div>
    </section>
  );
}
