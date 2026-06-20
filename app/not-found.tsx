import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Compass, Home, Search, Sparkles } from "lucide-react";

const destinations = [
  {
    href: "/avesta",
    icon: Compass,
    title: "پورتال اوستا",
    description: "نقشه بخش‌ها، فصل‌ها و مسیرهای مطالعه"
  },
  {
    href: "/search",
    icon: Search,
    title: "جستجو در جهان اوستا",
    description: "واژه، آیه، مقاله یا موضوع موردنظر را پیدا کن"
  },
  {
    href: "/library",
    icon: BookOpen,
    title: "کتابخانه دیجیتال",
    description: "منابع منتخب برای شروع یا ادامه پژوهش"
  }
];

export default function NotFound() {
  return (
    <main className="hero-cosmos relative min-h-[calc(100vh-8rem)] overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="hero-horizon" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(242,213,138,0.38)_1px,transparent_1px)] [background-size:30px_30px]" />

      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="order-2 text-center lg:order-1 lg:text-right">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/30 bg-night/35 px-4 py-2 text-xs font-black text-gold-light shadow-[0_12px_34px_rgba(0,0,0,0.2)] backdrop-blur lg:mx-0">
            <Sparkles size={15} aria-hidden="true" />
            مسیر تازه‌ای برای کشف پیدا کن
          </div>
          <p className="gold-text mt-6 text-sm font-black tracking-[0.3em]">404</p>
          <h1 className="mt-3 text-4xl font-black leading-[1.25] text-warm sm:text-6xl">
            این تالار در نقشه
            <span className="gold-text block">هنوز پیدا نشد</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted sm:text-lg sm:leading-9">
            شاید نشانی جابه‌جا شده، یا این صفحه هنوز برای انتشار آماده نشده باشد. از یکی از مسیرهای انتخاب‌شده وارد جهان اوستا شو.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night shadow-[0_14px_32px_rgba(214,168,79,0.28)] transition hover:-translate-y-0.5 hover:bg-gold-light"
            >
              بازگشت به خانه
              <Home size={17} aria-hidden="true" />
            </Link>
            <Link
              href="/trust-center"
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-night/25 px-5 py-3 text-sm font-black text-gold-light backdrop-blur transition hover:-translate-y-0.5 hover:border-gold/60 hover:bg-gold/10"
            >
              منابع و روش پژوهش
              <ArrowLeft size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <div className="absolute -inset-6 rounded-full bg-gold/15 blur-3xl" />
          <div className="lux-frame relative aspect-[4/3] overflow-hidden rounded-[1.75rem] p-3">
            <Image
              src="/images/ai/avesta-portal.png"
              alt="نمایی نمادین از جهان دیجیتال اوستا"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/15 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-gold/30 bg-night/65 p-4 text-right backdrop-blur">
              <p className="text-xs font-black text-gold-light">AVESTA-ZOROASTER</p>
              <p className="mt-1 text-sm leading-6 text-warm">هر مسیر تازه، فرصتی برای دیدن و آموختن است.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-12 grid max-w-6xl gap-3 sm:grid-cols-3">
        {destinations.map(({ href, icon: Icon, title, description }) => (
          <Link
            key={href}
            href={href}
            className="lux-frame group rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-gold/60"
          >
            <Icon className="text-gold" size={22} aria-hidden="true" />
            <h2 className="mt-4 text-base font-black text-warm">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-gold-light">
              ورود به این مسیر
              <ArrowLeft size={14} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
