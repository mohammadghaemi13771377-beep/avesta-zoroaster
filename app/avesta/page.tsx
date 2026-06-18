import Image from "next/image";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, BookOpen, Flame, Sparkles } from "lucide-react";
import { AvestaStudyPathsPanel } from "@/components/avesta-study-paths-panel";
import { SectionCard } from "@/components/section-card";
import { TrackedLink } from "@/components/tracked-link";
import { getAvestaCompletionSections, getAvestaCompletionSummary } from "@/lib/avesta-completion";
import { getAvestaSections, getLocaleFromSearchParams } from "@/lib/avesta-repository";
import { getAvestaStudyPaths } from "@/lib/avesta-study-paths";
import { routeHeroByPath, sectionCoverBySlug } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "پورتال اوستا",
  description: "نقشه سینمایی جهان اوستا؛ یسنا، گات‌ها، ویسپرد، وندیداد، یشت‌ها، خرده اوستا و هات‌ها."
};

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function AvestaPortalPage({ searchParams }: PageProps) {
  const locale = getLocaleFromSearchParams(searchParams);
  const sections = await getAvestaSections(locale);
  const completionSections = getAvestaCompletionSections();
  const completionSummary = getAvestaCompletionSummary(completionSections);
  const studyPaths = getAvestaStudyPaths();

  return (
    <main className="overflow-hidden pt-24" dir={locale === "en" ? "ltr" : "rtl"}>
      <section className="hero-cosmos relative min-h-[760px]">
        <Image
          src={routeHeroByPath["/avesta"]}
          alt="پورتال سینمایی اوستا"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-68"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-night/25 via-night/72 to-night/96" />
        <div className="hero-horizon" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night to-transparent" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/24 bg-black/22 px-4 py-2 text-sm font-bold text-gold-light">
              <Sparkles size={16} />
              قلب پروژه
            </p>
            <h1 className="gold-text mt-6 max-w-3xl text-6xl font-black leading-[1.12] sm:text-7xl">
              پورتال بزرگ اوستا
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-10 text-warm/82">
              این صفحه مثل یک موزه دیجیتال و نقشه جهان اوستا طراحی شده است؛ هر بخش فضای اختصاصی، تصویرسازی
              هنری و مسیر مطالعه خود را دارد.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <TrackedLink
                href="/avesta/yasna"
                event="avesta_section_opened"
                payload={{ section_slug: "yasna", card_position: "hero-primary", source_route: "/avesta" }}
                className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 font-black text-night"
              >
                شروع با یسنا
                <ArrowLeft size={17} />
              </TrackedLink>
              <TrackedLink
                href="/gathas"
                event="hero_cta_click"
                payload={{ cta_id: "avesta-hero-gathas", label: "مطالعه گات‌ها", locale: locale, source_route: "/avesta" }}
                className="inline-flex items-center gap-2 rounded-xl border border-gold/28 px-6 py-3 font-bold text-gold-light"
              >
                مطالعه گات‌ها
              </TrackedLink>
            </div>
          </div>

          <div className="relative min-h-[470px]">
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl" />
            <Image
              src="/images/avesta-zoroaster-logo.png"
              alt="AVESTA-ZOROASTER"
              width={680}
              height={680}
              className="relative z-10 mx-auto h-auto w-full max-w-[650px] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <PortalStat label="بخش‌های اصلی" value={`${completionSummary.sections}`} />
          <PortalStat label="آیتم‌های آماده" value={`${completionSummary.ready}`} />
          <PortalStat label="تکمیل کل جهان" value={`${completionSummary.completion}%`} />
          <PortalStat label="نیاز فوری" value={completionSummary.weakestField.label} />
        </div>

        <div className="lux-frame rounded-[22px] p-5 sm:p-7">
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/70" />
            <h2 className="gold-text text-center text-3xl font-black">نقشه جهان اوستا</h2>
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/70" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sections.map((section, index) => (
              <SectionCard
                key={section.slug}
                title={section.title}
                description={section.description}
                href={section.href}
                atmosphere={section.atmosphere ?? "scene-cosmic"}
                imageSrc={sectionCoverBySlug[section.slug]}
                roman={"roman" in section && typeof section.roman === "string" ? section.roman : `${index + 1}`}
                kicker="بخش اصلی اوستا"
                tracking={{
                  event: "avesta_section_opened",
                  payload: {
                    section_slug: section.slug,
                    card_position: index + 1,
                    source_route: "/avesta",
                  },
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <AvestaStudyPathsPanel paths={studyPaths} locale={locale} />

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        {([
          ["متن اصلی", "هر بند با متن اصلی، آوانویسی و ترجمه کلاسیک آماده می‌شود.", BookOpen],
          ["تصویر اختصاصی", "برای هر بخش مسیر تولید تصویر AI و فضای هنری تعریف شده است.", Flame],
          ["پیام امروز", "بازنویسی ساده، تحلیل مفهومی و پیام اخلاقی برای مخاطب امروز.", Sparkles]
        ] satisfies Array<[string, string, LucideIcon]>).map(([title, text, Icon]) => (
          <article key={title} className="lux-frame rounded-[18px] p-6">
            <Icon className="text-gold-light" size={28} />
            <h3 className="mt-5 text-2xl font-black text-warm">{title}</h3>
            <p className="mt-3 leading-8 text-muted">{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function PortalStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-gold/15 bg-royal/62 p-5 shadow-xl shadow-black/20">
      <p className="text-xs font-black text-gold-light">{label}</p>
      <p className="mt-2 break-words text-xl font-black leading-8 text-warm sm:text-2xl">{value}</p>
    </div>
  );
}
