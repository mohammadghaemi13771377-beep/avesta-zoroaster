import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Flame, Headphones, Library, Route, Search, ShoppingBag, Sparkles } from "lucide-react";

const gatewayOptions = [
  {
    id: "beginner",
    title: "شروع از صفر",
    description: "اگر تازه وارد جهان اوستا شده‌ای، این مسیر آرام‌ترین راه ورود است.",
    eyebrow: "مقدماتی",
    cta: "آیین ورود",
    href: "/onboarding",
    image: "/images/ai/home-hero-desktop.jpg",
    imageAlt: "طلوع روشن در تخت جمشید برای شروع سفر اوستا",
    accent: "#f2d58a",
    icon: Route,
  },
  {
    id: "gathas",
    title: "مسیر گات‌ها",
    description: "سروده‌های کهن، اشا، وهومن و پیام انتخاب آگاهانه را بخوان.",
    eyebrow: "خرد روشن",
    cta: "مطالعه گات‌ها",
    href: "/gathas",
    image: "/images/ai/gathas-hero.jpg",
    imageAlt: "کتاب گشوده در کوهستان روشن برای گات‌ها",
    accent: "#f2d58a",
    icon: BookOpen,
  },
  {
    id: "prayer",
    title: "نیایش روزانه",
    description: "خرده‌اوستا، آتش نیایش و متن‌های کوتاه برای مکث روزانه.",
    eyebrow: "آرامش",
    cta: "ورود به نیایش",
    href: "/avesta/khordeh-avesta",
    image: "/images/ai/khordeh-avesta-hero.jpg",
    imageAlt: "کتاب دعا و آتش کوچک در خانه ایرانی روشن",
    accent: "#d6a84f",
    icon: Flame,
  },
  {
    id: "research",
    title: "پژوهش و منابع",
    description: "کتابخانه، واژه‌نامه، مقاله‌ها و یادداشت‌های معتبر را دنبال کن.",
    eyebrow: "پژوهشی",
    cta: "مشاهده منابع",
    href: "/library",
    image: "/images/ai/library-hero.jpg",
    imageAlt: "کتابخانه باستانی مدرن با نسخه‌های خطی",
    accent: "#f2d58a",
    icon: Library,
  },
  {
    id: "media",
    title: "تماشا و شنیدن",
    description: "ویدئو، پادکست، نمایشگاه و تصویرهای سینمایی سایت را ببین.",
    eyebrow: "چندرسانه‌ای",
    cta: "ورود به رسانه",
    href: "/media",
    image: "/images/ai/media-hero.jpg",
    imageAlt: "استودیوی رسانه با میکروفون، کتاب و آتش آرام",
    accent: "#7dd3fc",
    icon: Headphones,
  },
  {
    id: "shop",
    title: "فروشگاه فرهنگی",
    description: "کتاب، یادگاری، پوشیدنی و محصولات آینده AVESTA-ZOROASTER.",
    eyebrow: "فرهنگی",
    cta: "دیدن فروشگاه",
    href: "/shop",
    image: "/images/ai/shop-hero.jpg",
    imageAlt: "میز نمایش لوکس محصولات فرهنگی اوستا و زرتشت",
    accent: "#d6a84f",
    icon: ShoppingBag,
  },
];

export function PathFinderGateway() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="path-finder-title">
      <div className="path-finder-stage relative overflow-hidden rounded-[26px] border border-gold/22 bg-[linear-gradient(135deg,rgba(255,248,234,0.10),rgba(7,21,33,0.68)_42%,rgba(5,8,13,0.84))] p-5 shadow-[0_30px_95px_rgba(0,0,0,0.32)] bright:bg-[linear-gradient(135deg,rgba(255,248,234,0.90),rgba(242,213,138,0.28),rgba(255,255,255,0.78))] sm:p-7">
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />
        <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-gold-light/18 blur-3xl" />
        <div className="absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-sky-300/10 blur-3xl" />

        <div className="relative z-10 grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/24 bg-black/18 px-4 py-2 text-xs font-black text-gold-light bright:bg-white/46 bright:text-amber-800">
              <Sparkles className="h-4 w-4" />
              مسیرهای ورود
            </p>
            <h2 id="path-finder-title" className="mt-5 max-w-xl text-3xl font-black leading-tight text-warm bright:text-stone-950 sm:text-5xl">
              با یک انتخاب، مستقیم وارد همان جهان شو
            </h2>
            <p className="mt-4 max-w-xl text-base font-semibold leading-8 text-muted bright:text-stone-700">
              صفحه اول فقط راه را نشان می‌دهد. هر کارت تو را به صفحه اختصاصی همان موضوع می‌برد تا بین بخش‌های نامرتبط گم نشوی.
            </p>
            <Link
              href="/search"
              className="path-finder-search-cta mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/25 bg-black/20 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10 bright:bg-white/52 bright:text-amber-900"
            >
              <Search className="h-4 w-4" />
              جستجوی هوشمند
            </Link>
            <div className="mt-5 grid max-w-md grid-cols-3 overflow-hidden rounded-2xl border border-gold/16 bg-black/18 text-center bright:bg-white/45">
              {["۶ مسیر", "صفحه اختصاصی", "بدون اسکرول"].map((item) => (
                <span key={item} className="border-l border-gold/12 px-2 py-3 text-[11px] font-black text-gold-light last:border-l-0 bright:text-amber-900">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="path-finder-grid grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {gatewayOptions.map((option, index) => {
              const Icon = option.icon;

              return (
                <Link
                  key={option.id}
                  href={option.href}
                  className="path-finder-card group relative min-h-[205px] overflow-hidden rounded-[20px] border border-gold/18 bg-night/54 p-5 transition duration-300 hover:-translate-y-1 hover:border-gold/50 bright:bg-white/55"
                >
                  <span className="path-finder-card-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Image
                    src={option.image}
                    alt={option.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 24vw"
                    className="object-cover opacity-38 transition duration-500 group-hover:scale-105 group-hover:opacity-52"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/92 via-night/62 to-night/18 bright:from-white/82 bright:via-white/38 bright:to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at 24% 18%, ${option.accent}3d, transparent 44%)` }}
                  />

                  <div className="relative z-10 flex min-h-[165px] flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-gold/24 bg-black/32 text-gold-light backdrop-blur bright:bg-white/54 bright:text-amber-800">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full border border-gold/20 bg-black/24 px-3 py-1 text-[11px] font-black text-gold-light bright:bg-white/50 bright:text-amber-800">
                        {option.eyebrow}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-black leading-9 text-warm bright:text-stone-950">{option.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm font-medium leading-7 text-muted bright:text-stone-700">{option.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-gold-light bright:text-amber-900">
                      {option.cta}
                      <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
