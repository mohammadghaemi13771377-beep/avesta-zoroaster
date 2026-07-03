import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, AudioLines, BookOpen, Compass, Library, Search, Sparkles } from "lucide-react";
import type { AvestaChapterView, AvestaSectionView, AvestaVerseView } from "@/lib/avesta-repository";
import { sectionCoverBySlug } from "@/lib/visual-assets";

type SectionFocusConfig = {
  mood: string;
  promise: string;
  primaryTool: string;
  focus: string[];
  related: { label: string; href: string }[];
};

const focusConfigBySlug: Record<string, SectionFocusConfig> = {
  yasna: {
    mood: "نیایش، آتش، هات ها و ساختار آیینی",
    promise: "این صفحه فقط برای ورود به یسنا ساخته شده است؛ مسیرها، فصل ها و بندها از همین بخش آغاز می شوند.",
    primaryTool: "شروع هات اول",
    focus: ["آتش و نیایش", "ساختار هات ها", "ترجمه و پیام اخلاقی"],
    related: [
      { label: "نیایش روزانه", href: "/avesta/khordeh-avesta" },
      { label: "رسانه های آیینی", href: "/media" },
    ],
  },
  gathas: {
    mood: "خرد، انتخاب آگاهانه و پیام روشن زرتشت",
    promise: "در این مسیر فقط گات ها را می بینی؛ از سروده ها به بندها و سپس تحلیل مفهومی می روی.",
    primaryTool: "ورود به اهنود",
    focus: ["اشا", "وهومن", "مسئولیت انسان"],
    related: [
      { label: "مقاله گات ها", href: "/articles/what-are-gathas" },
      { label: "واژه نامه اشا", href: "/dictionary/asha" },
    ],
  },
  visperad: {
    mood: "آیین جمعی، گسترش یسنا و ستایش همگانی",
    promise: "ویسپرد با صفحه مستقل خود پیش می رود و کاربر را به فضای آیینی همان متن می برد.",
    primaryTool: "شروع ویسپرد",
    focus: ["آیین جمعی", "پیوند با یسنا", "نیایش گسترده"],
    related: [
      { label: "یسنا", href: "/avesta/yasna" },
      { label: "کتابخانه", href: "/library" },
    ],
  },
  vendidad: {
    mood: "پاکی، قانون، مرز روشنایی و تاریکی",
    promise: "اینجا کاربر فقط وندیداد را دنبال می کند؛ فرگردها، پیام امروز و جستجوی محدود به همین بخش.",
    primaryTool: "شروع فرگرد اول",
    focus: ["پاکی", "قانون و نظم", "روایت های رازآلود"],
    related: [
      { label: "واژه نامه اشا", href: "/dictionary/asha" },
      { label: "مرکز اعتماد پژوهشی", href: "/trust-center" },
    ],
  },
  yashts: {
    mood: "ستایش های اسطوره ای، طبیعت، آب، مهر و آسمان",
    promise: "یشت ها مثل یک مسیر حماسی دیده می شوند؛ هر یشت صفحه و روایت مستقل خودش را دارد.",
    primaryTool: "شروع آبان یشت",
    focus: ["طبیعت و آب", "مهر و پیمان", "حماسه و ستایش"],
    related: [
      { label: "نمایشگاه ها", href: "/exhibitions" },
      { label: "رسانه", href: "/media" },
    ],
  },
  "khordeh-avesta": {
    mood: "نیایش روزانه، خانه آرام و همراه شخصی",
    promise: "خرده اوستا برای تجربه روزانه طراحی شده؛ کوتاه، خوانا، آرام و قابل ادامه.",
    primaryTool: "شروع نیایش",
    focus: ["نیایش کوتاه", "آرامش روزانه", "ادامه مطالعه"],
    related: [
      { label: "اتاق آیین", href: "/ritual-room" },
      { label: "یادداشت روزانه", href: "/reflection" },
    ],
  },
  hats: {
    mood: "نقشه مطالعه، ساختار هات ها و راهنمای فصل ها",
    promise: "هات ها به کاربر کمک می کنند ساختار متن را مثل نقشه کتاب دنبال کند.",
    primaryTool: "دیدن نقشه هات ها",
    focus: ["ساختار", "نقشه مطالعه", "ادامه فصل ها"],
    related: [
      { label: "تالار مطالعه", href: "/reading-room" },
      { label: "مسیرهای اوستا", href: "/avesta/paths" },
    ],
  },
};

type AvestaSectionFocusProps = {
  section: AvestaSectionView;
  chapters: AvestaChapterView[];
  sampleVerse: AvestaVerseView;
  langQuery?: string;
};

export function AvestaSectionFocus({ section, chapters, sampleVerse, langQuery = "" }: AvestaSectionFocusProps) {
  const config = focusConfigBySlug[section.slug] ?? {
    mood: "مطالعه اختصاصی این بخش",
    promise: "این صفحه برای تمرکز روی همین بخش ساخته شده و مسیرهای بعدی را جدا از نقشه کلی نشان می دهد.",
    primaryTool: "شروع مطالعه",
    focus: ["معرفی", "فصل ها", "پیام امروز"],
    related: [
      { label: "تالار مطالعه", href: "/reading-room" },
      { label: "کتابخانه", href: "/library" },
    ],
  };
  const firstChapter = chapters[0];
  const firstVerse = firstChapter?.verses[0];
  const coverImage = section.coverImage ?? sectionCoverBySlug[section.slug];
  const chapterHref = firstChapter ? `/avesta/${section.slug}/${firstChapter.slug}${langQuery}` : "/avesta/paths";
  const verseHref = firstChapter && firstVerse ? `/avesta/${section.slug}/${firstChapter.slug}/${firstVerse.slug}${langQuery}` : chapterHref;
  const nextChapters = chapters.slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 pt-2 sm:px-6 lg:px-8" aria-labelledby={`${section.slug}-focus-title`}>
      <div className="qerti-premium-shell qerti-soft-panel relative overflow-hidden rounded-[28px] border border-gold/22 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-gold-light/12 blur-3xl" />
        <div className="absolute right-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />

        <div className="relative z-10 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative overflow-hidden rounded-[24px] border border-gold/18 bg-black/20">
            <div className="relative min-h-[390px]">
              {coverImage ? (
                <Image src={coverImage} alt={section.title} fill sizes="(max-width: 1024px) 100vw, 44vw" className="object-cover opacity-82" />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-night/88 via-night/28 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="inline-flex items-center gap-2 rounded-full border border-gold/24 bg-black/28 px-4 py-2 text-xs font-black text-gold-light backdrop-blur">
                  <Compass className="h-4 w-4" />
                  کنسول اختصاصی {section.title}
                </p>
                <h2 id={`${section.slug}-focus-title`} className="mt-5 text-4xl font-black leading-tight text-warm sm:text-5xl">
                  فقط مسیر {section.title}
                </h2>
                <p className="mt-4 max-w-xl text-base font-semibold leading-8 text-warm/84">{config.promise}</p>
              </div>
            </div>
          </div>

          <div className="grid content-start gap-4">
            <div className="qerti-feature-card rounded-[24px] border border-gold/18 bg-night/52 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-gold-light">حال و هوای این بخش</p>
                  <h3 className="mt-2 text-2xl font-black leading-9 text-warm">{config.mood}</h3>
                </div>
                <span className="rounded-full border border-gold/18 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                  {chapters.length || "آماده"} فصل
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {config.focus.map((item) => (
                  <span key={item} className="rounded-full border border-gold/16 bg-black/20 px-3 py-1.5 text-xs font-bold text-warm/82">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={chapterHref} className="qerti-cta inline-flex items-center gap-2 rounded-2xl bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light">
                  {config.primaryTool}
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link href={verseHref} className="qerti-subtle-lift inline-flex items-center gap-2 rounded-2xl border border-gold/24 bg-black/18 px-5 py-3 font-black text-gold-light transition hover:bg-gold/10">
                  بند اول
                  <Sparkles className="h-4 w-4" />
                </Link>
                <Link href={`/search?type=verse&section=${section.slug}`} className="qerti-subtle-lift inline-flex items-center gap-2 rounded-2xl border border-gold/24 bg-black/18 px-5 py-3 font-black text-gold-light transition hover:bg-gold/10">
                  جستجو فقط در {section.title}
                  <Search className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="qerti-feature-card rounded-[22px] border border-gold/16 bg-night/46 p-5">
                <div className="mb-4 flex items-center gap-2 text-gold-light">
                  <BookOpen className="h-5 w-5" />
                  <h3 className="font-black">فصل های همین بخش</h3>
                </div>
                <div className="grid gap-2">
                  {nextChapters.length ? nextChapters.map((chapter, index) => (
                    <Link key={chapter.slug} href={`/avesta/${section.slug}/${chapter.slug}${langQuery}`} className="qerti-subtle-lift group flex items-center justify-between gap-3 rounded-2xl border border-gold/12 bg-black/16 px-4 py-3 transition hover:border-gold/36 hover:bg-gold/10">
                      <span>
                        <span className="text-xs font-black text-gold-light">فصل {index + 1}</span>
                        <span className="block text-sm font-black leading-7 text-warm">{chapter.title}</span>
                      </span>
                      <ArrowLeft className="h-4 w-4 text-gold-light transition group-hover:-translate-x-1" />
                    </Link>
                  )) : (
                    <p className="rounded-2xl border border-gold/12 bg-black/16 p-4 text-sm leading-7 text-muted">
                      فصل های این بخش بعدا از پنل ادمین اضافه می شوند.
                    </p>
                  )}
                </div>
              </div>

              <div className="qerti-feature-card rounded-[22px] border border-gold/16 bg-night/46 p-5">
                <div className="mb-4 flex items-center gap-2 text-gold-light">
                  <Library className="h-5 w-5" />
                  <h3 className="font-black">ادامه مرتبط</h3>
                </div>
                <div className="grid gap-2">
                  {config.related.map((item) => (
                    <Link key={item.href} href={item.href} className="qerti-subtle-lift group flex items-center justify-between gap-3 rounded-2xl border border-gold/12 bg-black/16 px-4 py-3 transition hover:border-gold/36 hover:bg-gold/10">
                      <span className="text-sm font-black text-warm">{item.label}</span>
                      <ArrowLeft className="h-4 w-4 text-gold-light transition group-hover:-translate-x-1" />
                    </Link>
                  ))}
                  <Link href="/media" className="qerti-subtle-lift group flex items-center justify-between gap-3 rounded-2xl border border-gold/12 bg-black/16 px-4 py-3 transition hover:border-gold/36 hover:bg-gold/10">
                    <span className="inline-flex items-center gap-2 text-sm font-black text-warm">
                      <AudioLines className="h-4 w-4 text-gold-light" />
                      صدا و رسانه مرتبط
                    </span>
                    <ArrowLeft className="h-4 w-4 text-gold-light transition group-hover:-translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="qerti-feature-card rounded-[22px] border border-gold/16 bg-gold/10 p-5">
              <p className="text-xs font-black text-gold-light">نمونه پیام امروز</p>
              <p className="mt-3 text-base font-semibold leading-8 text-warm/86">{sampleVerse.ethicalMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
