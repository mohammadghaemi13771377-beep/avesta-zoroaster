import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Compass, GalleryVerticalEnd, Globe2, Search, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { DailyAvestaCard } from "@/components/daily-avesta-card";
import { FaqSection } from "@/components/faq-section";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { MobedHomeCallout } from "@/components/mobed-home-callout";
import { HomeWorldMap } from "@/components/home-world-map";
import { PathFinderGateway } from "@/components/path-finder-gateway";
import { ReaderMemoryShelf } from "@/components/reader-memory-shelf";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionCard } from "@/components/section-card";
import { TrackedLink } from "@/components/tracked-link";
import { avestaSections, featuredArticles } from "@/lib/content";
import { getDailyAvesta } from "@/lib/daily-avesta";
import { routeHeroByPath } from "@/lib/visual-assets";
import { faqPageJsonLd } from "@/lib/seo";

const featureBadges = [
  ["مطالعه آرام", "متن، ترجمه و معنا", BookOpen],
  ["جستجوی هوشمند", "اوستا و واژه‌نامه", Search],
  ["تجربه تصویری", "روایت و رسانه", Globe2],
  ["منابع روشن", "خوانش پژوهشی", ShieldCheck],
];

const portalCards = [
  { title: "زرتشت", text: "آغاز آشنایی با زندگی، اندیشه و میراث پیام‌آور خرد.", href: "/zoroaster", image: "/images/ai/zoroaster-hero.jpg", footer: "شناخت زرتشت" },
  { title: "گات‌ها", text: "ورود به کهن‌ترین سروده‌ها؛ با ترجمه، توضیح و مسیر مطالعه.", href: "/gathas", image: "/images/ai/gathas-hero.jpg", footer: "مطالعه گات‌ها" },
  { title: "مقاله‌ها", text: "خوانش‌های پژوهشی و قابل‌فهم از مفاهیم، تاریخ و فرهنگ ایران باستان.", href: "/articles", image: "/images/ai/articles-hero.jpg", footer: "ورود به مقاله‌ها" },
  { title: "کتابخانه", text: "منابع، نسخه‌ها و راهنمای اعتماد برای یک مطالعه عمیق‌تر.", href: "/library", image: "/images/ai/library-hero.jpg", footer: "مشاهده کتابخانه" },
];

const entryPaths = [
  {
    title: "تازه‌وارد هستم",
    text: "با راهنمای ورود، مسیر مطالعه و پیشنهادهای آرام شروع کن.",
    href: "/onboarding",
    icon: Compass,
    tone: "from-gold/22 to-gold/5"
  },
  {
    title: "می‌خواهم اوستا را بخوانم",
    text: "مستقیم وارد پورتال اوستا و بخش‌های اصلی شو.",
    href: "/avesta",
    icon: BookOpen,
    tone: "from-cyan-300/18 to-gold/5"
  },
  {
    title: "تصویر و رسانه می‌خواهم",
    text: "نمایشگاه‌ها، ویدئوها، پادکست‌ها و تصویرهای AI را ببین.",
    href: "/exhibitions",
    icon: GalleryVerticalEnd,
    tone: "from-blue-300/18 to-gold/5"
  },
  {
    title: "فروشگاه فرهنگی",
    text: "کتاب، هدیه، پوشیدنی و محصولات مرتبط با جهان اوستا.",
    href: "/shop",
    icon: ShoppingBag,
    tone: "from-amber-300/20 to-gold/5"
  }
];

const studyShelves = [
  { title: "تالار مطالعه", text: "فضایی آرام برای ادامه دادن متن، نشان‌گذاری و خوانش شخصی.", href: "/reading-room", icon: BookOpen },
  { title: "نقشه تاریخ", text: "رویدادها و دوره‌های مهم ایران باستان را در یک مسیر پیوسته ببینید.", href: "/timeline", icon: Globe2 },
  { title: "رسانه و نمایشگاه", text: "تصویر، صدا و آثار دیجیتال را جدا از متن، با تمرکز تماشا کنید.", href: "/media", icon: Sparkles },
];

const homeFaqs = [
  { question: "اوستا چیست؟", answer: "اوستا نام مجموعه‌ای از متن‌های دینی و آیینی زرتشتی است. در این سایت، بخش‌های آن با معرفی، مسیر مطالعه، واژه‌نامه، ترجمه و پیوندهای پژوهشی عرضه می‌شوند." },
  { question: "گات‌ها چه جایگاهی دارند؟", answer: "گات‌ها سرودهایی هستند که در سنت زرتشتی به زرتشت نسبت داده می‌شوند و برای فهم خرد، راستی، اختیار و مسئولیت انسان اهمیت ویژه دارند." },
  { question: "از کجا مطالعه را شروع کنم؟", answer: "اگر تازه‌وارد هستی از پورتال اوستا یا آیین ورود شروع کن. آنجا می‌توانی بر اساس زمان، علاقه و حال‌وهوای خود یک مسیر مطالعه انتخاب کنی." },
  { question: "آیا مطالب سایت منبع دارند؟", answer: "سایت برای هر لایه محتوا مسیر منبع، بازبینی و روش پژوهش در نظر می‌گیرد. برای مطالعه تخصصی، صفحه منابع و یادداشت‌های هر محتوا را هم بررسی کن." },
  { question: "موبد هوشمند چه کاری انجام می‌دهد؟", answer: "موبد هوشمند پاسخ‌های آموزشی و محتاطانه درباره واژه‌ها و بخش‌های اوستا ارائه می‌دهد، منبع سایت را نشان می‌دهد و مسیر مطالعه بعدی پیشنهاد می‌کند." },
];

export default function HomePage() {
  const dailyAvesta = getDailyAvesta();

  return (
    <main className="overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(homeFaqs)) }} />
      <section className="hero-cosmos home-hero relative min-h-screen pt-24">
        <Image src={routeHeroByPath["/"]} alt="طلوع سینمایی جهان اوستا و زرتشت" fill priority sizes="100vw" className="hidden object-cover object-center md:block" />
        <Image src="/images/ai/home-hero-mobile.jpg" alt="طلوع سینمایی جهان اوستا و زرتشت" fill priority sizes="100vw" className="object-cover object-[58%_center] md:hidden" />
        <div className="home-hero-light absolute inset-0" />
        <div className="home-hero-text-shade absolute inset-0" />
        <div className="hero-horizon" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-night via-night/62 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col justify-center px-4 pb-28 pt-20 sm:px-6 lg:pl-[52%] lg:pr-8 lg:pt-24">
          <div className="home-hero-copy max-w-2xl">
            <p className="home-hero-eyebrow inline-flex items-center gap-2 rounded-full border border-gold/24 bg-night/18 px-4 py-2 text-sm font-black text-gold-light backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              به جهان دیجیتال اوستا
            </p>
            <h1 className="home-hero-title gold-text mt-5 max-w-3xl text-5xl font-black leading-[1.08] sm:text-6xl lg:text-7xl">
              اوستا و زرتشت
            </h1>
            <p className="home-hero-lead mt-6 max-w-xl text-lg font-bold leading-9 text-[#fff8ea] sm:text-xl">
              مرجع سینمایی و آموزشی خرد ایران باستان؛ مطالعه اوستا، گات‌ها، زرتشت و پیام یکتاپرستی در یک جهان دیجیتال.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink href="/avesta" event="hero_cta_click" payload={{ cta_id: "home-hero-avesta", label: "ورود به جهان اوستا", locale: "fa", source_route: "/" }} className="qerti-cta inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-gold-light to-gold px-7 py-4 font-black text-night shadow-gold transition hover:-translate-y-0.5">
                ورود به جهان اوستا
                <ArrowLeft size={18} />
              </TrackedLink>
              <TrackedLink href="/onboarding" event="hero_cta_click" payload={{ cta_id: "home-hero-onboarding", label: "آغاز سفر", locale: "fa", source_route: "/" }} className="qerti-subtle-lift inline-flex items-center justify-center gap-3 rounded-2xl border border-warm/36 bg-night/18 px-7 py-4 font-black text-warm backdrop-blur-md transition hover:border-gold/55 hover:bg-gold/10">
                آغاز سفر
              </TrackedLink>
            </div>
            <div className="home-hero-feature-strip mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-gold/20 bg-gold/16 shadow-[0_22px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl md:grid-cols-4">
              {featureBadges.map(([title, subtitle, Icon]) => (
                <div key={title} className="home-feature-badge bg-night/42 px-4 py-4">
                  <Icon className="text-gold-light" size={24} />
                  <p className="mt-3 text-sm font-black text-warm">{title}</p>
                  <p className="mt-1 text-xs font-bold leading-6 text-warm/70">{subtitle}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden min-h-[440px] sm:min-h-[560px]">
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-[min(74vw,520px)] w-[min(74vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/18 bg-black/20 shadow-2xl shadow-black/60" />
            <Image src="/images/avesta-zoroaster-logo.png" alt="AVESTA-ZOROASTER" width={760} height={760} priority className="relative z-10 mx-auto h-auto w-full max-w-[720px] object-contain drop-shadow-[0_28px_72px_rgba(0,0,0,0.65)]" />
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="relative z-20 mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="home-entry-panel qerti-premium-shell qerti-soft-panel grid gap-3 rounded-[22px] border border-gold/22 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:grid-cols-2 xl:grid-cols-4">
            {entryPaths.map((path) => {
              const Icon = path.icon;

              return (
                <TrackedLink
                  key={path.href}
                  href={path.href}
                  event="home_entry_path_click"
                  payload={{ cta_id: `entry-${path.href.replaceAll("/", "-")}`, label: path.title, locale: "fa", source_route: "/" }}
                  className="qerti-feature-card qerti-subtle-lift group relative overflow-hidden rounded-[18px] border border-gold/14 bg-night/44 p-5 hover:border-gold/42"
                >
                  <span className={`absolute inset-0 bg-gradient-to-br ${path.tone} opacity-75 transition group-hover:opacity-100`} />
                  <span className="relative z-10 flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-gold/22 bg-black/24 text-gold-light">
                      <Icon size={22} />
                    </span>
                    <ArrowLeft size={18} className="mt-2 text-gold-light transition group-hover:-translate-x-1" />
                  </span>
                  <span className="relative z-10 mt-5 block text-xl font-black text-warm">{path.title}</span>
                  <span className="relative z-10 mt-3 block text-sm leading-7 text-muted">{path.text}</span>
                </TrackedLink>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={40}><PathFinderGateway /></ScrollReveal>

      <ScrollReveal delay={50}><HomeWorldMap /></ScrollReveal>

      <ScrollReveal><DailyAvestaCard item={dailyAvesta} /></ScrollReveal>

      <ScrollReveal delay={60}><ReaderMemoryShelf /></ScrollReveal>

      <ScrollReveal delay={80}><MobedHomeCallout /></ScrollReveal>

      <ScrollReveal delay={90}><section className="portal-museum relative mx-auto max-w-7xl overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <Image src="/images/ai/avesta-portal.jpg" alt="تالار هفت دروازه جهان اوستا" fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/58 via-night/72 to-night/94" />
        <div className="relative z-10">
        <div className="mb-7 flex items-center justify-center gap-4"><span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/70" /><h2 className="gold-text text-center text-3xl font-black">پرتال اوستا</h2><span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/70" /></div>
        <p className="mx-auto mb-7 max-w-2xl text-center leading-8 text-muted">برای ورود عمیق‌تر، یک بخش را انتخاب کنید. هر مسیر صفحه و روایت مستقل خود را دارد.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {avestaSections.map((section, index) => <SectionCard key={section.slug} title={section.title} description={section.description} href={section.href} atmosphere={section.atmosphere} imageSrc={section.coverImage} tracking={{ event: "avesta_section_opened", payload: { section_slug: section.slug, card_position: index + 1, source_route: "/" } }} />)}
        </div>
        </div>
      </section></ScrollReveal>

      <ScrollReveal delay={90}><section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {portalCards.map((card) => <TrackedLink key={card.title} href={card.href} event="hero_cta_click" payload={{ cta_id: `home-portal-${card.href.replaceAll("/", "-")}`, label: card.title, locale: "fa", source_route: "/" }} className="lux-frame qerti-feature-card qerti-subtle-lift group block overflow-hidden rounded-[18px] p-4 hover:border-gold/55"><h3 className="text-2xl font-black text-warm">{card.title}</h3><p className="mt-2 text-sm leading-7 text-muted">{card.text}</p><div className="image-scene relative mt-5 h-44 overflow-hidden rounded-[14px] border border-gold/14"><Image src={card.image} alt={`کاور ${card.title}`} fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent" /></div><span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">{card.footer}<ArrowLeft size={15} className="transition group-hover:-translate-x-1" /></span></TrackedLink>)}
      </section></ScrollReveal>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><div className="grid gap-5 lg:grid-cols-3">{studyShelves.map((shelf) => { const Icon = shelf.icon; return <Link key={shelf.href} href={shelf.href} className="lux-frame qerti-feature-card qerti-subtle-lift group p-6 hover:border-gold/55"><Icon className="text-gold-light" size={24} /><h2 className="mt-5 text-2xl font-black text-warm">{shelf.title}</h2><p className="mt-3 leading-8 text-muted">{shelf.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">ورود <ArrowLeft size={15} /></span></Link>; })}</div></section>

      <ScrollReveal delay={80}><FaqSection items={homeFaqs} /></ScrollReveal>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8"><NewsletterSignup compact /><div className="lux-frame qerti-premium-shell qerti-soft-panel relative overflow-hidden rounded-[18px] p-7"><h2 className="text-3xl font-black text-warm">در جریان بمانید</h2><p className="mt-3 leading-8 text-muted">برای دریافت تازه‌ها، مقاله‌ها و رویدادها ایمیل خود را وارد کنید.</p></div></section>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8"><div className="mb-6 flex items-center justify-between gap-4"><div><p className="text-xs font-bold text-gold-light">برای ادامه مطالعه</p><h2 className="mt-2 text-3xl font-black text-warm">مقاله‌های منتخب</h2></div><Link href="/articles" className="inline-flex items-center gap-2 text-sm font-black text-gold-light">همه مقاله‌ها <ArrowLeft size={15} /></Link></div><div className="grid gap-5 lg:grid-cols-3">{featuredArticles.map((title) => <Link href="/articles" key={title} className="lux-frame qerti-feature-card qerti-subtle-lift group rounded-[18px] p-6 hover:border-gold/55"><BookOpen className="text-gold-light" size={24} /><p className="mt-5 text-xs font-bold text-gold-light">مقاله پیشنهادی</p><h3 className="mt-3 text-2xl font-black leading-9 text-warm">{title}</h3><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">مطالعه <ArrowLeft size={15} /></span></Link>)}</div></section>
    </main>
  );
}

