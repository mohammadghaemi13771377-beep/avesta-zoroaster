import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Brain, Flame, Globe2, Play, Search, ShieldCheck, ShoppingBag, Smartphone, Sparkles } from "lucide-react";
import { DailyAvestaCard } from "@/components/daily-avesta-card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { SectionCard } from "@/components/section-card";
import { TrackedLink } from "@/components/tracked-link";
import { avestaSections, featuredArticles } from "@/lib/content";
import { getDailyAvesta } from "@/lib/daily-avesta";

const featureBadges = [
  ["همیشه در دسترس", "وب و موبایل", Smartphone],
  ["جستجوی هوشمند", "چندمنبعی", Search],
  ["تجربه سینمایی", "طراحی هنری", Globe2],
  ["معتبر و مستند", "منابع اصیل", ShieldCheck]
];

const portalCards = [
  {
    title: "آیین ورود",
    text: "انتخاب مسیر شروع برای کاربر تازه‌وارد بر اساس نیت، زمان و حال‌وهوا",
    href: "/onboarding",
    scene: "scene-sunrise",
    footer: "شروع مسیر"
  },
  {
    title: "نقشه جهان",
    text: "دیدن قلمروهای اصلی سایت، قفل‌های تکامل و مسیرهای ورود به تجربه",
    href: "/world",
    scene: "scene-cosmic",
    footer: "کاوش جهان"
  },
  {
    title: "نورخانه شخصی",
    text: "مرکز روزانه کاربر برای ادامه مطالعه، استمرار، XP و قدم بعدی",
    href: "/dashboard",
    scene: "scene-cosmic",
    footer: "ورود به نورخانه"
  },
  {
    title: "قطب‌نمای خرد",
    text: "پیشنهاد هوشمند قدم بعدی بر اساس رفتار و حافظه مطالعه",
    href: "/compass",
    scene: "scene-sunrise",
    footer: "دیدن پیشنهادها"
  },
  {
    title: "تایم‌لاین تاریخ",
    text: "سفر در رویدادهای مهم ایران باستان",
    href: "/timeline",
    scene: "scene-stone",
    footer: "مشاهده تایم‌لاین"
  },
  {
    title: "گاه‌شمار آیینی",
    text: "نوروز، مهرگان، سده و مناسبت‌های فرهنگی زنده",
    href: "/calendar",
    scene: "scene-sunrise",
    footer: "دیدن گاه‌شمار"
  },
  {
    title: "کمپین‌های فصلی",
    text: "تبدیل مناسبت‌ها به مقاله، رسانه، خبرنامه و کالکشن فروشگاه",
    href: "/campaigns",
    scene: "scene-cosmic",
    footer: "طراحی کمپین"
  },
  {
    title: "خبرنامه روشنایی",
    text: "عضویت برای اوستای امروز، مناسبت‌ها، مقاله‌ها و تازه‌های فرهنگی",
    href: "/newsletter",
    scene: "scene-fire",
    footer: "عضویت"
  },
  {
    title: "نقشه مفهومی",
    text: "پیوند اشا، وهومن، گات‌ها، مقاله‌ها و متن اوستا",
    href: "/concept-map",
    scene: "scene-cosmic",
    footer: "کاوش مفاهیم"
  },
  {
    title: "مأموریت‌های خرد",
    text: "XP، نشان مطالعه و مسیرهای مرحله‌ای در جهان اوستا",
    href: "/quests",
    scene: "scene-sunrise",
    footer: "شروع مأموریت"
  },
  {
    title: "دفتر روزانه",
    text: "ثبت پندار نیک، گفتار نیک و کردار نیک امروز",
    href: "/reflection",
    scene: "scene-fire",
    footer: "ثبت امروز"
  },
  {
    title: "زنجیره روشنایی",
    text: "استمرار روزانه، تقویم نور، XP و عادت بازگشت کاربر",
    href: "/streak",
    scene: "scene-sunrise",
    footer: "دیدن استمرار"
  },
  {
    title: "حافظه مطالعه",
    text: "ادامه خواندن، یادداشت‌ها، XP و مسیر شخصی شما",
    href: "/memory",
    scene: "scene-scroll",
    footer: "دیدن حافظه"
  },
  {
    title: "کتابخانه",
    text: "منابع، نسخه‌ها و مرکز اعتماد پژوهشی",
    href: "/trust-center",
    scene: "scene-scroll",
    footer: "مرکز اعتماد"
  },
  {
    title: "رسانه",
    text: "تصاویر AI، ویدیوها، پادکست‌ها و استودیوی تولید تصویر",
    href: "/ai-studio",
    scene: "scene-mountain",
    footer: "ورود به استودیوی AI",
    play: true
  },
  {
    title: "مقالات",
    text: "مقالات پژوهشی و تحلیلی",
    href: "/articles",
    scene: "scene-tablets",
    footer: "مطالعه مقالات"
  },
  {
    title: "فروشگاه",
    text: "کتاب، ماگ، پوشاک و محصولات فرهنگی آینده",
    href: "/shop",
    scene: "scene-cosmic",
    footer: "مشاهده فروشگاه"
  },
  {
    title: "راهنمای خرد",
    text: "تالار مطالعه، حالت خواندن و مسیر پیشنهادی خرد",
    href: "/reading-room",
    scene: "scene-sunrise",
    footer: "ورود به تالار مطالعه"
  }
];

export default function HomePage() {
  const dailyAvesta = getDailyAvesta();

  return (
    <main className="overflow-hidden">
      <section className="hero-cosmos relative min-h-screen pt-24">
        <div className="hero-horizon" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div>
            <p className="text-xl font-bold text-gold-light">به جهان دیجیتال</p>
            <h1 className="gold-text mt-4 max-w-3xl text-6xl font-black leading-[1.12] sm:text-7xl lg:text-8xl">
              اوستا و زرتشت
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-10 text-warm/82">
              کاوش در کهن‌ترین تعالیم یکتاپرستی، خرد و فرهنگ ایران باستان.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/avesta"
                event="hero_cta_click"
                payload={{ cta_id: "home-hero-avesta", label: "ورود به پورتال اوستا", locale: "fa", source_route: "/" }}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-gold-light to-gold px-7 py-4 font-black text-night shadow-gold transition hover:scale-[1.01]"
              >
                ورود به پورتال اوستا
                <ArrowLeft size={18} />
              </TrackedLink>
              <TrackedLink
                href="/about"
                event="hero_cta_click"
                payload={{ cta_id: "home-hero-about", label: "درباره پروژه", locale: "fa", source_route: "/" }}
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-gold/28 bg-black/18 px-7 py-4 font-bold text-gold-light transition hover:bg-gold/10"
              >
                درباره پروژه
              </TrackedLink>
            </div>

            <div className="mt-14 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
              {featureBadges.map(([title, subtitle, Icon]) => (
                <div key={title} className="border-r border-gold/16 px-4 first:border-r-0 md:first:border-r">
                  <Icon className="text-gold-light" size={29} />
                  <p className="mt-4 text-sm font-black text-warm">{title}</p>
                  <p className="mt-1 text-xs leading-6 text-muted">{subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[560px]">
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/18 bg-black/20 shadow-2xl shadow-black/60" />
            <Image
              src="/images/avesta-zoroaster-logo.png"
              alt="AVESTA-ZOROASTER"
              width={760}
              height={760}
              priority
              className="relative z-10 mx-auto h-auto w-full max-w-[720px] object-contain drop-shadow-[0_28px_72px_rgba(0,0,0,0.65)]"
            />
          </div>
        </div>
      </section>

      <DailyAvestaCard item={dailyAvesta} />

      <section className="relative mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="lux-frame rounded-[22px] p-5 sm:p-7">
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold/70" />
            <h2 className="gold-text text-center text-3xl font-black">بخش‌های اوستا</h2>
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold/70" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {avestaSections.map((section) => (
              <SectionCard
                key={section.slug}
                title={section.title}
                description={section.description}
                href={section.href}
                atmosphere={section.atmosphere}
                roman={section.roman}
                tracking={{
                  event: "avesta_section_opened",
                  payload: {
                    section_slug: section.slug,
                    card_position: section.roman,
                    source_route: "/",
                  },
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 lg:px-8">
        {portalCards.map((card) => (
          <TrackedLink
            key={card.title}
            href={card.href}
            event="hero_cta_click"
            payload={{ cta_id: `home-portal-${card.href.replaceAll("/", "-")}`, label: card.title, locale: "fa", source_route: "/" }}
            className="lux-frame group block overflow-hidden rounded-[18px] p-4 transition hover:-translate-y-1 hover:border-gold/55"
          >
            <h3 className="text-2xl font-black text-warm">{card.title}</h3>
            <p className="mt-2 text-sm text-muted">{card.text}</p>
            <div className={`image-scene ${card.scene} mt-5 h-44 rounded-[14px] border border-gold/14`}>
              {card.play ? (
                <div className="absolute left-1/2 top-1/2 z-10 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-warm/60 bg-black/35 text-warm backdrop-blur">
                  <Play size={26} fill="currentColor" />
                </div>
              ) : null}
            </div>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">
              {card.footer}
              <ArrowLeft size={15} className="transition group-hover:-translate-x-1" />
            </span>
          </TrackedLink>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-10 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <NewsletterSignup compact />
        <div className="lux-frame relative overflow-hidden rounded-[18px] p-7">
          <div className="absolute -bottom-20 right-8 h-44 w-44 rounded-full bg-gold/12 blur-3xl" />
          <h2 className="text-3xl font-black text-warm">در جریان بمانید</h2>
          <p className="mt-3 leading-8 text-muted">برای دریافت تازه‌ها، مقاله‌ها و رویدادها ایمیل خود را وارد کنید.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="lux-frame mb-5 flex flex-col gap-5 rounded-[18px] p-6 transition hover:-translate-y-1 hover:border-gold/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light">
              <Sparkles size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gold-light">مرکز تجربه شخصی</p>
              <h2 className="mt-1 text-2xl font-black text-warm">نورخانه شخصی برای مسیر امروز، ادامه مطالعه، استمرار و نشان‌ها</h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-gold-light">
            ورود به نورخانه
            <ArrowLeft size={15} />
          </span>
        </Link>
        <Link href="/compass" className="lux-frame mb-5 flex flex-col gap-5 rounded-[18px] p-6 transition hover:-translate-y-1 hover:border-gold/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light">
              <Brain size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gold-light">موتور پیشنهاد مسیر</p>
              <h2 className="mt-1 text-2xl font-black text-warm">قطب‌نمای خرد برای انتخاب قدم بعدی بر اساس رفتار کاربر</h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-gold-light">
            دیدن پیشنهادها
            <ArrowLeft size={15} />
          </span>
        </Link>
        <Link href="/wisdom-guide" className="lux-frame mb-5 flex flex-col gap-5 rounded-[18px] p-6 transition hover:-translate-y-1 hover:border-gold/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light">
              <Brain size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gold-light">فیچر تجربه شخصی</p>
              <h2 className="mt-1 text-2xl font-black text-warm">راهنمای خرد برای پیشنهاد مسیر مطالعه، واژه‌نامه و پیام اخلاقی</h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-gold-light">
            شروع راهنمای خرد
            <ArrowLeft size={15} />
          </span>
        </Link>
        <Link href="/reading-room" className="lux-frame mb-5 flex flex-col gap-5 rounded-[18px] p-6 transition hover:-translate-y-1 hover:border-gold/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gold-light">فیچر تجربه مطالعه</p>
              <h2 className="mt-1 text-2xl font-black text-warm">تالار مطالعه زنده برای خواندن سینمایی اوستا</h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-gold-light">
            ورود به تالار مطالعه
            <ArrowLeft size={15} />
          </span>
        </Link>
        <Link href="/concept-map" className="lux-frame mb-5 flex flex-col gap-5 rounded-[18px] p-6 transition hover:-translate-y-1 hover:border-gold/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light">
              <Globe2 size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gold-light">فیچر کشف مفاهیم</p>
              <h2 className="mt-1 text-2xl font-black text-warm">نقشه مفهومی برای کاوش جهان اوستا</h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-gold-light">
            کاوش نقشه
            <ArrowLeft size={15} />
          </span>
        </Link>
        <Link href="/quests" className="lux-frame mb-5 flex flex-col gap-5 rounded-[18px] p-6 transition hover:-translate-y-1 hover:border-gold/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light">
              <Flame size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gold-light">فیچر پیشرفت کاربر</p>
              <h2 className="mt-1 text-2xl font-black text-warm">مأموریت‌های خرد با XP و badge مطالعه</h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-gold-light">
            شروع مأموریت‌ها
            <ArrowLeft size={15} />
          </span>
        </Link>
        <Link href="/reflection" className="lux-frame mb-5 flex flex-col gap-5 rounded-[18px] p-6 transition hover:-translate-y-1 hover:border-gold/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light">
              <Flame size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gold-light">فیچر عادت روزانه</p>
              <h2 className="mt-1 text-2xl font-black text-warm">دفتر پندار، گفتار، کردار برای ثبت نیت و کردار امروز</h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-gold-light">
            ثبت امروز
            <ArrowLeft size={15} />
          </span>
        </Link>
        <Link href="/streak" className="lux-frame mb-5 flex flex-col gap-5 rounded-[18px] p-6 transition hover:-translate-y-1 hover:border-gold/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light">
              <Flame size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gold-light">فیچر استمرار کاربر</p>
              <h2 className="mt-1 text-2xl font-black text-warm">زنجیره روشنایی برای تقویم عادت روزانه و برگشت کاربر</h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-gold-light">
            دیدن استمرار
            <ArrowLeft size={15} />
          </span>
        </Link>
        <Link href="/memory" className="lux-frame mb-5 flex flex-col gap-5 rounded-[18px] p-6 transition hover:-translate-y-1 hover:border-gold/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light">
              <Brain size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gold-light">فیچر حفظ کاربر</p>
              <h2 className="mt-1 text-2xl font-black text-warm">حافظه مطالعه برای ادامه مسیر شخصی</h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-gold-light">
            دیدن حافظه
            <ArrowLeft size={15} />
          </span>
        </Link>
        <Link href="/shop" className="lux-frame mb-5 flex flex-col gap-5 rounded-[18px] p-6 transition hover:-translate-y-1 hover:border-gold/55 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold-light">
              <ShoppingBag size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gold-light">بخش آینده</p>
              <h2 className="mt-1 text-2xl font-black text-warm">فروشگاه محصولات فرهنگی AVESTA-ZOROASTER</h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-black text-gold-light">
            ورود به فروشگاه
            <ArrowLeft size={15} />
          </span>
        </Link>
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredArticles.map((title) => (
            <article key={title} className="lux-frame rounded-[18px] p-6">
              <BookOpen className="text-gold-light" size={24} />
              <p className="mt-5 text-xs font-bold text-gold-light">مقاله پیشنهادی</p>
              <h3 className="mt-3 text-2xl font-black leading-9 text-warm">{title}</h3>
              <p className="mt-4 leading-8 text-muted">جایگاه مقاله برای سئو، لینک داخلی و مسیرهای محتوایی آینده.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
