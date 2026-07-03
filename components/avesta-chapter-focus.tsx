import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ArrowRight, BookOpen, Headphones, NotebookPen, Search, Sparkles } from "lucide-react";
import type { AvestaChapterProfile } from "@/lib/avesta-chapter-profiles";
import type { AvestaChapterView, AvestaSectionView } from "@/lib/avesta-repository";

type AvestaChapterFocusProps = {
  section: AvestaSectionView;
  chapter: AvestaChapterView;
  chapters: AvestaChapterView[];
  profile?: AvestaChapterProfile;
  langQuery?: string;
};

export function AvestaChapterFocus({ section, chapter, chapters, profile, langQuery = "" }: AvestaChapterFocusProps) {
  const activeIndex = chapters.findIndex((item) => item.slug === chapter.slug);
  const previousChapter = activeIndex > 0 ? chapters[activeIndex - 1] : undefined;
  const nextChapter = activeIndex >= 0 ? chapters[activeIndex + 1] : undefined;
  const firstVerse = chapter.verses[0];
  const firstVerseHref = firstVerse ? `/avesta/${section.slug}/${chapter.slug}/${firstVerse.slug}${langQuery}` : `/avesta/${section.slug}/${chapter.slug}${langQuery}`;
  const progressWidth = chapters.length && activeIndex >= 0 ? Math.round(((activeIndex + 1) / chapters.length) * 100) : 18;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-6 pt-8 sm:px-6 lg:px-8" aria-labelledby={`${chapter.slug}-focus-title`}>
      <div className="qerti-premium-shell qerti-soft-panel relative overflow-hidden rounded-[26px] border border-gold/22 p-5 shadow-[0_24px_86px_rgba(0,0,0,0.30)]">
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />
        <div className="absolute -bottom-24 left-16 h-64 w-64 rounded-full bg-gold/12 blur-3xl" />

        <div className="relative z-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/22 bg-black/22 px-4 py-2 text-xs font-black text-gold-light">
              <BookOpen className="h-4 w-4" />
              داشبورد اختصاصی فصل
            </p>
            <h2 id={`${chapter.slug}-focus-title`} className="mt-5 text-4xl font-black leading-tight text-warm sm:text-5xl">
              فقط {chapter.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-warm/78">
              این صفحه برای تمرکز روی همین فصل ساخته شده است: بندها، فصل قبل و بعد، رسانه، جستجو و مسیرهای مرتبط فقط در همین زمینه دیده می شوند.
            </p>

            <div className="mt-6 h-2 max-w-xl overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gradient-to-l from-gold-light to-gold" style={{ width: `${progressWidth}%` }} />
            </div>
            <p className="mt-3 text-xs font-bold text-muted">
              جایگاه این فصل در {section.title}: {activeIndex >= 0 ? activeIndex + 1 : 1} از {chapters.length || 1}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <FocusCard
              href={firstVerseHref}
              icon={Sparkles}
              title="شروع از بند اول"
              description={firstVerse?.excerpt ?? "ورود به نخستین بند آماده این فصل."}
              action="خواندن بند"
              highlight
            />
            <FocusCard
              href={`/search?type=verse&section=${section.slug}&chapter=${chapter.slug}`}
              icon={Search}
              title="جستجو در همین فصل"
              description="برای پیدا کردن واژه، بند، ترجمه یا مفهوم فقط داخل همین مسیر."
              action="جستجو"
            />
            <FocusCard
              href={`/media?section=${section.slug}&chapter=${chapter.slug}`}
              icon={Headphones}
              title="رسانه و صدا"
              description="جای اتصال پادکست، خوانش صوتی و ویدیوهای همین فصل."
              action="دیدن رسانه"
            />
            <FocusCard
              href="/reflection"
              icon={NotebookPen}
              title="یادداشت و برداشت"
              description="بعدا این بخش به حساب کاربری و یادداشت های ذخیره شده وصل می شود."
              action="ثبت برداشت"
            />
          </div>
        </div>

        <div className="relative z-10 mt-5 grid gap-3 lg:grid-cols-3">
          <ChapterMove
            label="فصل قبلی"
            title={previousChapter?.title ?? "آغاز همین بخش"}
            href={previousChapter ? `/avesta/${section.slug}/${previousChapter.slug}${langQuery}` : `/avesta/${section.slug}${langQuery}`}
            reverse
          />
          <ChapterMove label="بازگشت به بخش" title={section.title} href={`/avesta/${section.slug}${langQuery}`} />
          <ChapterMove
            label="فصل بعدی"
            title={nextChapter?.title ?? "مسیرهای اوستا"}
            href={nextChapter ? `/avesta/${section.slug}/${nextChapter.slug}${langQuery}` : "/avesta/paths"}
          />
        </div>

        {profile?.relatedChapters.length ? (
          <div className="qerti-feature-card relative z-10 mt-5 rounded-[20px] border border-gold/16 bg-night/42 p-5">
            <p className="text-sm font-black text-gold-light">مطالعه مرتبط، بدون خروج بی دلیل از مسیر</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {profile.relatedChapters.map((item) => (
                <Link key={item.href} href={item.href} className="qerti-subtle-lift group rounded-2xl border border-gold/12 bg-black/16 p-4 transition hover:border-gold/38 hover:bg-gold/10">
                  <span className="flex items-center justify-between gap-3">
                    <strong className="text-warm">{item.title}</strong>
                    <ArrowLeft className="h-4 w-4 text-gold-light transition group-hover:-translate-x-1" />
                  </span>
                  <span className="mt-2 block text-sm leading-7 text-muted">{item.reason}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FocusCard({
  href,
  icon: Icon,
  title,
  description,
  action,
  highlight = false,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  action: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`qerti-feature-card qerti-subtle-lift group rounded-[20px] border p-5 transition ${
        highlight
          ? "border-gold/16 bg-gold/10 hover:border-gold/48 hover:bg-gold/16"
          : "border-gold/16 bg-black/18 hover:border-gold/48 hover:bg-gold/10"
      }`}
    >
      <Icon className="h-6 w-6 text-gold-light" />
      <h3 className="mt-4 text-xl font-black text-warm">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">
        {action}
        <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
      </span>
    </Link>
  );
}

function ChapterMove({ label, title, href, reverse = false }: { label: string; title: string; href: string; reverse?: boolean }) {
  return (
    <Link href={href} className="qerti-subtle-lift group flex items-center justify-between gap-4 rounded-[18px] border border-gold/14 bg-black/18 p-4 transition hover:border-gold/42 hover:bg-gold/10">
      {reverse ? <ArrowRight className="h-5 w-5 shrink-0 text-gold-light transition group-hover:translate-x-1" /> : null}
      <span className="min-w-0">
        <span className="block text-xs font-black text-gold-light">{label}</span>
        <span className="mt-1 block truncate text-base font-black text-warm">{title}</span>
      </span>
      {!reverse ? <ArrowLeft className="h-5 w-5 shrink-0 text-gold-light transition group-hover:-translate-x-1" /> : null}
    </Link>
  );
}
