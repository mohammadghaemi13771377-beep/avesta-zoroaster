import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Globe2, Search, ShieldCheck, Sparkles } from "lucide-react";
import { DailyAvestaCard } from "@/components/daily-avesta-card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { SectionCard } from "@/components/section-card";
import { TrackedLink } from "@/components/tracked-link";
import { avestaSections, featuredArticles } from "@/lib/content";
import { getDailyAvesta } from "@/lib/daily-avesta";
import { routeHeroByPath } from "@/lib/visual-assets";

const featureBadges = [
  ["مطالعه آرام", "متن، ترجمه و معنا", BookOpen],
  ["جستجوی هوشمند", "اوستا و واژه‌نامه", Search],
  ["تجربه تصویری", "روایت و رسانه", Globe2],
  ["منابع روشن", "خوانش پژوهشی", ShieldCheck],
];

const portalCards = [
  { title: "زرتشت", text: "آغاز آشنایی با زندگی، اندیشه و میراث پیام‌آور خرد.", href: "/zoroaster", image: "/images/ai/zoroaster-cover.png", footer: "شناخت زرتشت" },
  { title: "گات‌ها", text: "ورود به کهن‌ترین سروده‌ها؛ با ترجمه، توضیح و مسیر مطالعه.", href: "/gathas", image: "/images/ai/gathas-cover.png", footer: "مطالعه گات‌ها" },
  { title: "مقاله‌ها", text: "خوانش‌های پژوهشی و قابل‌فهم از مفاهیم، تاریخ و فرهنگ ایران باستان.", href: "/articles", image: "/images/ai/articles-cover.png", footer: "ورود به مقاله‌ها" },
  { title: "کتابخانه", text: "منابع، نسخه‌ها و راهنمای اعتماد برای یک مطالعه عمیق‌تر.", href: "/library", image: "/images/ai/library-cover.png", footer: "مشاهده کتابخانه" },
];

const studyShelves = [
  { title: "تالار مطالعه", text: "فضایی آرام برای ادامه دادن متن، نشان‌گذاری و خوانش شخصی.", href: "/reading-room", icon: BookOpen },
  { title: "نقشه تاریخ", text: "رویدادها و دوره‌های مهم ایران باستان را در یک مسیر پیوسته ببینید.", href: "/timeline", icon: Globe2 },
  { title: "رسانه و نمایشگاه", text: "تصویر، صدا و آثار دیجیتال را جدا از متن، با تمرکز تماشا کنید.", href: "/media", icon: Sparkles },
];

export default function HomePage() {
  const dailyAvesta = getDailyAvesta();

  return (
    <main className="overflow-hidden">
      <section className="hero-cosmos relative min-h-screen pt-24">
        <Image src={routeHeroByPath["/"]} alt="طلوع سینمایی جهان اوستا و زرتشت" fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#06131c]/18 via-[#071521]/52 to-[#05080d]/80" />
        <div className="hero-horizon" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div>
            <p className="text-xl font-bold text-gold-light">به جهان دیجیتال</p>
            <h1 className="gold-text mt-4 max-w-3xl text-6xl font-black leading-[1.12] sm:text-7xl lg:text-8xl">اوستا و زرتشت</h1>
            <p className="mt-7 max-w-2xl text-xl leading-10 text-warm/82">کاوش در کهن‌ترین تعالیم یکتاپرستی، خرد و فرهنگ ایران باستان.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <TrackedLink href="/avesta" event="hero_cta_click" payload={{ cta_id: "home-hero-avesta", label: "ورود به پورتال اوستا", locale: "fa", source_route: "/" }} className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-gold-light to-gold px-7 py-4 font-black text-night shadow-gold transition hover:scale-[1.01]">ورود به پورتال اوستا <ArrowLeft size={18} /></TrackedLink>
              <TrackedLink href="/onboarding" event="hero_cta_click" payload={{ cta_id: "home-hero-onboarding", label: "آغاز مسیر مطالعه", locale: "fa", source_route: "/" }} className="inline-flex items-center justify-center gap-3 rounded-xl border border-gold/28 bg-black/18 px-7 py-4 font-bold text-gold-light transition hover:bg-gold/10">آغاز مسیر مطالعه</TrackedLink>
            </div>
            <div className="mt-14 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
              {featureBadges.map(([title, subtitle, Icon]) => <div key={title} className="border-r border-gold/16 px-4 first:border-r-0 md:first:border-r"><Icon className="text-gold-light" size={27} /><p className="mt-4 text-sm font-black text-warm">{title}</p><p className="mt-1 text-xs leading-6 text-muted">{subtitle}</p></div>)}
            </div>
          </div>
          <div className="relative min-h-[440px] sm:min-h-[560px]">
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-[min(74vw,520px)] w-[min(74vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/18 bg-black/20 shadow-2xl shadow-black/60" />
            <Image src="/images/avesta-zoroaster-logo.png" alt="AVESTA-ZOROASTER" width={760} height={760} priority className="relative z-10 mx-auto h-auto w-full max-w-[720px] object-contain drop-shadow-[0_28px_72px_rgba(0,0,0,0.65)]" />
          </div>
        </div>
      </section>

      <DailyAvestaCard item={dailyAvesta} />

      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center justify-center gap-4"><span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/70" /><h2 className="gold-text text-center text-3xl font-black">پرتال اوستا</h2><span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/70" /></div>
        <p className="mx-auto mb-7 max-w-2xl text-center leading-8 text-muted">برای ورود عمیق‌تر، یک بخش را انتخاب کنید. هر مسیر صفحه و روایت مستقل خود را دارد.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {avestaSections.map((section) => <SectionCard key={section.slug} title={section.title} description={section.description} href={section.href} atmosphere={section.atmosphere} imageSrc={section.coverImage} roman={section.roman} tracking={{ event: "avesta_section_opened", payload: { section_slug: section.slug, card_position: section.roman, source_route: "/" } }} />)}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {portalCards.map((card) => <TrackedLink key={card.title} href={card.href} event="hero_cta_click" payload={{ cta_id: `home-portal-${card.href.replaceAll("/", "-")}`, label: card.title, locale: "fa", source_route: "/" }} className="lux-frame group block overflow-hidden rounded-[18px] p-4 transition hover:-translate-y-1 hover:border-gold/55"><h3 className="text-2xl font-black text-warm">{card.title}</h3><p className="mt-2 text-sm leading-7 text-muted">{card.text}</p><div className="image-scene relative mt-5 h-44 overflow-hidden rounded-[14px] border border-gold/14"><Image src={card.image} alt={`کاور ${card.title}`} fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent" /></div><span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">{card.footer}<ArrowLeft size={15} className="transition group-hover:-translate-x-1" /></span></TrackedLink>)}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><div className="grid gap-5 lg:grid-cols-3">{studyShelves.map((shelf) => { const Icon = shelf.icon; return <Link key={shelf.href} href={shelf.href} className="lux-frame group p-6 transition hover:-translate-y-1 hover:border-gold/55"><Icon className="text-gold-light" size={24} /><h2 className="mt-5 text-2xl font-black text-warm">{shelf.title}</h2><p className="mt-3 leading-8 text-muted">{shelf.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">ورود <ArrowLeft size={15} /></span></Link>; })}</div></section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8"><NewsletterSignup compact /><div className="lux-frame relative overflow-hidden rounded-[18px] p-7"><div className="absolute -bottom-20 right-8 h-44 w-44 rounded-full bg-gold/12 blur-3xl" /><h2 className="text-3xl font-black text-warm">در جریان بمانید</h2><p className="mt-3 leading-8 text-muted">برای دریافت تازه‌ها، مقاله‌ها و رویدادها ایمیل خود را وارد کنید.</p></div></section>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8"><div className="mb-6 flex items-center justify-between gap-4"><div><p className="text-xs font-bold text-gold-light">برای ادامه مطالعه</p><h2 className="mt-2 text-3xl font-black text-warm">مقاله‌های منتخب</h2></div><Link href="/articles" className="inline-flex items-center gap-2 text-sm font-black text-gold-light">همه مقاله‌ها <ArrowLeft size={15} /></Link></div><div className="grid gap-5 lg:grid-cols-3">{featuredArticles.map((title) => <Link href="/articles" key={title} className="lux-frame group rounded-[18px] p-6 transition hover:-translate-y-1 hover:border-gold/55"><BookOpen className="text-gold-light" size={24} /><p className="mt-5 text-xs font-bold text-gold-light">مقاله پیشنهادی</p><h3 className="mt-3 text-2xl font-black leading-9 text-warm">{title}</h3><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">مطالعه <ArrowLeft size={15} /></span></Link>)}</div></section>
    </main>
  );
}
