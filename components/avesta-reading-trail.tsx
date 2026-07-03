import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, BookOpen, Compass, Headphones, Library, Search, Sparkles } from "lucide-react";
import type { AvestaChapterView, AvestaSectionView, AvestaVerseView } from "@/lib/avesta-repository";

type AvestaReadingTrailProps = {
  section: AvestaSectionView;
  chapter?: AvestaChapterView;
  verse?: AvestaVerseView;
  totalChapters?: number;
  totalVerses?: number;
  activeChapterIndex?: number;
  activeVerseIndex?: number;
  langQuery?: string;
};

export function AvestaReadingTrail({
  section,
  chapter,
  verse,
  totalChapters = 0,
  totalVerses = 0,
  activeChapterIndex = -1,
  activeVerseIndex = -1,
  langQuery = "",
}: AvestaReadingTrailProps) {
  const hasChapter = Boolean(chapter);
  const hasVerse = Boolean(verse);
  const progress = hasVerse && totalVerses
    ? Math.round(((activeVerseIndex + 1) / totalVerses) * 100)
    : hasChapter && totalChapters
      ? Math.round(((activeChapterIndex + 1) / totalChapters) * 100)
      : 18;
  const contextLabel = hasVerse ? "اتاق بند" : hasChapter ? "اتاق فصل" : "دروازه بخش";
  const primaryHref = hasChapter
    ? `/avesta/${section.slug}/${chapter!.slug}${langQuery}`
    : `/avesta/${section.slug}${langQuery}`;

  return (
    <section className="relative z-20 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="مسیر مطالعه اوستا">
      <div className="qerti-premium-shell qerti-soft-panel relative overflow-hidden rounded-[24px] border border-gold/22 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />
        <div className="relative z-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black text-gold-light">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/20 px-3 py-1.5">
                <Compass className="h-4 w-4" />
                {contextLabel}
              </span>
              <TrailCrumb href="/avesta" label="اوستا" />
              <TrailCrumb href={`/avesta/${section.slug}${langQuery}`} label={section.title} active={!hasChapter} />
              {chapter ? <TrailCrumb href={`/avesta/${section.slug}/${chapter.slug}${langQuery}`} label={chapter.title} active={!hasVerse} /> : null}
              {verse ? <span className="rounded-full border border-gold/22 bg-gold/12 px-3 py-1.5 text-warm">{verse.verseNumber}</span> : null}
            </div>

            <div className="mt-4 h-2 max-w-2xl overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gradient-to-l from-gold-light via-gold to-[#7ed9e6]" style={{ width: `${Math.max(12, Math.min(progress, 100))}%` }} />
            </div>
            <p className="mt-2 text-xs font-bold text-muted">
              {hasVerse
                ? `پیشرفت در این فصل: ${Math.max(activeVerseIndex + 1, 1)} از ${totalVerses || 1} بند`
                : hasChapter
                  ? `پیشرفت در این بخش: ${Math.max(activeChapterIndex + 1, 1)} از ${totalChapters || 1} فصل`
                  : "شروع مسیر اختصاصی این بخش از اوستا"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
            <TrailAction href={primaryHref} icon={BookOpen} label={hasVerse ? "فصل" : "مطالعه"} />
            <TrailAction href={`/search?type=verse&section=${section.slug}${chapter ? `&chapter=${chapter.slug}` : ""}`} icon={Search} label="جستجو" />
            <TrailAction href={`/media?section=${section.slug}${chapter ? `&chapter=${chapter.slug}` : ""}`} icon={Headphones} label="رسانه" />
            <TrailAction href="/library" icon={Library} label="منابع" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrailCrumb({ href, label, active = false }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition ${
        active
          ? "border-gold/30 bg-gold/12 text-warm"
          : "border-gold/14 bg-black/14 text-gold-light hover:border-gold/38 hover:bg-gold/10"
      }`}
    >
      <Sparkles className="h-3.5 w-3.5" />
      <span className="max-w-[12rem] truncate">{label}</span>
    </Link>
  );
}

function TrailAction({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string }) {
  return (
    <Link
      href={href}
      className="qerti-subtle-lift inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/16 bg-black/18 px-4 py-3 text-sm font-black text-gold-light transition hover:border-gold/42 hover:bg-gold/10"
    >
      <Icon className="h-4 w-4" />
      {label}
      <ArrowLeft className="hidden h-4 w-4 sm:block" />
    </Link>
  );
}
