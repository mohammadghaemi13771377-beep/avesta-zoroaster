import Link from "next/link";
import { ArrowLeft, BookOpen, Brain, Flame, GalleryVerticalEnd, Library, ShoppingBag, Sparkles, UserRoundSearch } from "lucide-react";

const worldNodes = [
  {
    title: "اوستا",
    label: "قلب جهان",
    text: "ورود به بخش‌های اصلی، فصل‌ها، بندها و مسیرهای مطالعه.",
    href: "/avesta",
    icon: BookOpen,
    tone: "from-gold/28 via-gold/10 to-transparent",
  },
  {
    title: "گات‌ها",
    label: "خرد روشن",
    text: "سروده‌ها، اشا، انتخاب آگاهانه و پیام اخلاقی امروز.",
    href: "/gathas",
    icon: Sparkles,
    tone: "from-warm/22 via-gold/10 to-transparent",
  },
  {
    title: "زرتشت",
    label: "راهنمای اندیشه",
    text: "زندگی، پیام، زمینه تاریخی و مسیرهای شناخت.",
    href: "/zoroaster",
    icon: UserRoundSearch,
    tone: "from-sky-200/18 via-gold/10 to-transparent",
  },
  {
    title: "واژه‌نامه",
    label: "کلید مفاهیم",
    text: "اشا، وهومن، اهورامزدا، فروهر و ریشه واژه‌ها.",
    href: "/dictionary",
    icon: Brain,
    tone: "from-cyan-200/16 via-gold/10 to-transparent",
  },
  {
    title: "کتابخانه",
    label: "منابع معتبر",
    text: "کتاب‌ها، نسخه‌ها، PDFها و مسیر پژوهش.",
    href: "/library",
    icon: Library,
    tone: "from-amber-200/16 via-gold/10 to-transparent",
  },
  {
    title: "رسانه",
    label: "دیدن و شنیدن",
    text: "پادکست، ویدیو، تصویر و روایت‌های شنیداری.",
    href: "/media",
    icon: GalleryVerticalEnd,
    tone: "from-blue-300/18 via-gold/10 to-transparent",
  },
  {
    title: "آیین روزانه",
    label: "تمرین و مکث",
    text: "خرده اوستا، نیایش کوتاه و اتاق آیین.",
    href: "/ritual-room",
    icon: Flame,
    tone: "from-orange-300/20 via-gold/10 to-transparent",
  },
  {
    title: "فروشگاه",
    label: "یادگار فرهنگی",
    text: "کتاب، هدیه، پوشیدنی، اکسسوری و محصولات آینده.",
    href: "/shop",
    icon: ShoppingBag,
    tone: "from-amber-400/18 via-gold/10 to-transparent",
  },
];

export function HomeWorldMap() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="home-world-map-title">
      <div className="qerti-premium-shell qerti-soft-panel relative overflow-hidden rounded-[28px] border border-gold/22 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.30)]">
        <div className="absolute left-1/2 top-8 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-gold/10" />
        <div className="absolute left-1/2 top-24 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full border border-sky-200/10" />
        <div className="absolute -right-20 top-12 h-72 w-72 rounded-full bg-gold-light/12 blur-3xl" />
        <div className="absolute -bottom-24 left-8 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/22 bg-black/18 px-4 py-2 text-xs font-black text-gold-light">
              <Sparkles className="h-4 w-4" />
              نقشه سریع جهان
            </p>
            <h2 id="home-world-map-title" className="gold-text mt-5 text-4xl font-black leading-tight sm:text-5xl">
              از یک صفحه، وارد هر قلمرو شو
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-muted">
              صفحه اول شلوغ نمی‌شود؛ فقط مسیرهای اصلی را مثل ایستگاه‌های یک موزه دیجیتال نشان می‌دهد و هر کلیک، صفحه مخصوص همان بخش را باز می‌کند.
            </p>
          </div>
          <Link href="/world" className="qerti-cta inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light">
            دیدن نقشه کامل
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative z-10 mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {worldNodes.map((node, index) => {
            const Icon = node.icon;

            return (
              <Link
                key={node.href}
                href={node.href}
                className="qerti-feature-card qerti-subtle-lift group relative min-h-[210px] overflow-hidden rounded-[22px] border border-gold/16 bg-night/48 p-5 hover:border-gold/45"
              >
                <span className={`absolute inset-0 bg-gradient-to-br ${node.tone} opacity-80 transition group-hover:opacity-100`} />
                <span className="absolute left-4 top-4 font-serif text-5xl text-gold-light/10">{String(index + 1).padStart(2, "0")}</span>
                <span className="relative z-10 flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/22 bg-black/24 text-gold-light">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-gold/16 bg-black/20 px-3 py-1 text-[11px] font-black text-gold-light">
                    {node.label}
                  </span>
                </span>
                <span className="relative z-10 mt-5 block text-2xl font-black text-warm">{node.title}</span>
                <span className="relative z-10 mt-3 block text-sm leading-7 text-muted">{node.text}</span>
                <span className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">
                  ورود
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
