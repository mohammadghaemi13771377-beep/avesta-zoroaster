import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Headphones, Layers3, Search, Tags } from "lucide-react";
import type { AvestaChapterView, AvestaSectionView, AvestaVerseView } from "@/lib/avesta-repository";

type RelatedTerm = {
  term: string;
  slug: string;
  meaning: string;
};

type AvestaVerseFocusProps = {
  section: AvestaSectionView;
  chapter: AvestaChapterView;
  verse: AvestaVerseView;
  activeVerseSlug: string;
  relatedTerms: RelatedTerm[];
  langQuery?: string;
};

export function AvestaVerseFocus({
  section,
  chapter,
  verse,
  activeVerseSlug,
  relatedTerms,
  langQuery = "",
}: AvestaVerseFocusProps) {
  const activeIndex = chapter.verses.findIndex((item) => item.slug === activeVerseSlug);
  const previousVerse = activeIndex > 0 ? chapter.verses[activeIndex - 1] : undefined;
  const nextVerse = activeIndex >= 0 ? chapter.verses[activeIndex + 1] : undefined;
  const chapterHref = `/avesta/${section.slug}/${chapter.slug}${langQuery}`;
  const sectionHref = `/avesta/${section.slug}${langQuery}`;
  const progress = chapter.verses.length && activeIndex >= 0 ? Math.round(((activeIndex + 1) / chapter.verses.length) * 100) : 25;

  return (
    <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8" aria-label="کنترل مطالعه بند">
      <div className="qerti-premium-shell qerti-soft-panel relative overflow-hidden rounded-[26px] border border-gold/22 p-4 shadow-[0_28px_86px_rgba(0,0,0,0.34)] backdrop-blur-xl">
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />
        <div className="absolute -bottom-24 right-16 h-64 w-64 rounded-full bg-gold/12 blur-3xl" />

        <div className="relative z-10 grid gap-4 lg:grid-cols-[1fr_0.92fr]">
          <div className="qerti-feature-card rounded-[22px] border border-gold/14 bg-black/18 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-xs font-black text-gold-light">
                  <BookOpen className="h-4 w-4" />
                  اتاق مطالعه بند
                </p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-warm sm:text-4xl">{verse.verseNumber}</h2>
                <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-warm/76">
                  {section.title} / {chapter.title} / بند {activeIndex >= 0 ? activeIndex + 1 : 1}
                </p>
              </div>
              <span className="rounded-full border border-gold/18 bg-black/24 px-3 py-1.5 text-xs font-black text-gold-light">
                {progress}% پیشرفت فصل
              </span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gradient-to-l from-gold-light to-gold" style={{ width: `${progress}%` }} />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MoveLink
                href={previousVerse ? `/avesta/${section.slug}/${chapter.slug}/${previousVerse.slug}${langQuery}` : chapterHref}
                label="بند قبلی"
                title={previousVerse?.title ?? "بازگشت به فصل"}
                reverse
              />
              <MoveLink href={chapterHref} label="فصل" title={chapter.title} />
              <MoveLink
                href={nextVerse ? `/avesta/${section.slug}/${chapter.slug}/${nextVerse.slug}${langQuery}` : sectionHref}
                label="بند بعدی"
                title={nextVerse?.title ?? "بازگشت به بخش"}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link href={`/search?type=verse&section=${section.slug}&chapter=${chapter.slug}`} className="qerti-feature-card qerti-subtle-lift group rounded-[20px] border border-gold/14 bg-night/48 p-5 hover:border-gold/42 hover:bg-gold/10">
              <Search className="h-6 w-6 text-gold-light" />
              <h3 className="mt-4 text-lg font-black text-warm">جستجو در همین فصل</h3>
              <p className="mt-2 text-sm leading-7 text-muted">واژه، ترجمه یا مفهوم را فقط در مسیر همین فصل پیدا کن.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">
                جستجو
                <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
              </span>
            </Link>

            <a href="#ritual-audio" className="qerti-feature-card qerti-subtle-lift group rounded-[20px] border border-gold/14 bg-night/48 p-5 hover:border-gold/42 hover:bg-gold/10">
              <Headphones className="h-6 w-6 text-gold-light" />
              <h3 className="mt-4 text-lg font-black text-warm">شنیدن روایت</h3>
              <p className="mt-2 text-sm leading-7 text-muted">مستقیم برو به پخش صوتی و فضای شنیداری این بند.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">
                رفتن به صوت
                <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
              </span>
            </a>

            <div className="qerti-feature-card rounded-[20px] border border-gold/14 bg-night/48 p-5 sm:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-gold-light">
                  <Tags className="h-5 w-5" />
                  <h3 className="font-black text-warm">واژه های نزدیک به این بند</h3>
                </div>
                <Link href="/dictionary" className="text-sm font-black text-gold-light hover:text-warm">
                  واژه نامه کامل
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {relatedTerms.length ? (
                  relatedTerms.slice(0, 5).map((term) => (
                    <Link key={term.slug} href={`/dictionary/${term.slug}`} className="rounded-full border border-gold/16 bg-black/18 px-3 py-1.5 text-xs font-bold text-warm/82 transition hover:border-gold/42 hover:bg-gold/10">
                      {term.term}
                    </Link>
                  ))
                ) : (
                  <span className="rounded-full border border-gold/16 bg-black/18 px-3 py-1.5 text-xs font-bold text-muted">
                    بعد از ورود محتوای کامل، واژه ها خودکار دقیق تر می شوند.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="qerti-feature-card relative z-10 mt-4 rounded-[20px] border border-gold/14 bg-gold/10 p-5">
          <div className="flex items-start gap-3">
            <Layers3 className="mt-1 h-5 w-5 shrink-0 text-gold-light" />
            <p className="text-sm font-semibold leading-8 text-warm/82">{verse.ethicalMessage}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MoveLink({ href, label, title, reverse = false }: { href: string; label: string; title: string; reverse?: boolean }) {
  return (
    <Link href={href} className="qerti-subtle-lift group flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-gold/12 bg-black/18 p-3 transition hover:border-gold/42 hover:bg-gold/10">
      {reverse ? <ArrowRight className="h-4 w-4 shrink-0 text-gold-light transition group-hover:translate-x-1" /> : null}
      <span className="min-w-0">
        <span className="block text-[11px] font-black text-gold-light">{label}</span>
        <span className="mt-1 block truncate text-sm font-black text-warm">{title}</span>
      </span>
      {!reverse ? <ArrowLeft className="h-4 w-4 shrink-0 text-gold-light transition group-hover:-translate-x-1" /> : null}
    </Link>
  );
}
