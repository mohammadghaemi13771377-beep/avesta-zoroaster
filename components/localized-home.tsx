import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Globe2, ShieldCheck, Sparkles } from "lucide-react";

import { SectionCard } from "@/components/section-card";
import { introCards } from "@/lib/content";
import { getDictionary, type Locale, withLocale } from "@/lib/i18n";

const featureBadges = [
  { title: "Cinematic", subtitle: "Digital museum", icon: Sparkles },
  { title: "Search", subtitle: "Multi-source", icon: Globe2 },
  { title: "Study", subtitle: "Reading mode", icon: BookOpen },
  { title: "Trusted", subtitle: "Structured sources", icon: ShieldCheck },
];

export function LocalizedHome({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const isEnglish = locale === "en";

  return (
    <main dir={isEnglish ? "ltr" : "rtl"} className="overflow-hidden">
      <section className="hero-cosmos relative min-h-screen pt-24">
        <div className="hero-horizon" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div>
            <p className="text-xl font-bold text-gold-light">{t.heroKicker}</p>
            <h1 className="gold-text mt-4 max-w-4xl text-6xl font-black leading-tight sm:text-7xl lg:text-8xl">
              {t.heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-10 text-warm/82">{t.heroLead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={withLocale("/avesta", locale)}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-gold-light to-gold px-7 py-4 font-black text-night shadow-gold transition hover:scale-[1.01]"
              >
                {t.primaryCta}
                <ArrowLeft size={19} />
              </Link>
              <Link
                href={withLocale("/monotheism", locale)}
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-gold/28 bg-black/18 px-7 py-4 font-bold text-gold-light transition hover:bg-gold/10"
              >
                {t.monotheismCta}
              </Link>
              <Link
                href={withLocale("/profile", locale)}
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-warm/15 bg-black/12 px-7 py-4 font-bold text-warm/86 transition hover:bg-warm/8"
              >
                {t.studyCta}
              </Link>
            </div>

            <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-4">
              {featureBadges.map(({ title, subtitle, icon: Icon }) => (
                <article key={title} className="rounded-2xl border border-gold/14 bg-black/20 p-4">
                  <Icon className="text-gold-light" size={26} />
                  <p className="mt-3 text-sm font-black text-warm">{title}</p>
                  <p className="mt-1 text-xs leading-6 text-muted">{subtitle}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative mx-auto grid min-h-[520px] w-full max-w-2xl place-items-center">
            <div className="absolute h-[460px] w-[460px] rounded-full border border-gold/20 bg-black/20 shadow-2xl shadow-black/60" />
            <Image
              src="/images/avesta-zoroaster-logo.png"
              alt="AVESTA-ZOROASTER"
              width={760}
              height={760}
              className="relative z-10 w-full max-w-[720px] object-contain drop-shadow-[0_35px_70px_rgba(0,0,0,0.75)]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-bold text-gold-light">{t.gateway}</p>
        <h2 className="mt-3 text-3xl font-black text-warm sm:text-4xl">{t.gatewayTitle}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {introCards.map((card) => (
            <SectionCard key={card.title} {...card} href={withLocale(card.href, locale)} kicker={t.introKicker} />
          ))}
        </div>
      </section>
    </main>
  );
}
