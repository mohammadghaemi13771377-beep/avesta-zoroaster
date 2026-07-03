import Image from "next/image";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, BookOpen, Flame, Sparkles } from "lucide-react";
import { AvestaSectionExplorer } from "@/components/avesta-section-explorer";
import { AvestaStudyPathsPanel } from "@/components/avesta-study-paths-panel";
import { TrackedLink } from "@/components/tracked-link";
import { getAvestaSections, getLocaleFromSearchParams } from "@/lib/avesta-repository";
import { getAvestaStudyPaths } from "@/lib/avesta-study-paths";
import { routeHeroByPath } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "جهان اوستا | AVESTA-ZOROASTER",
  description: "دروازه مطالعه بخش های اوستا؛ یسنا، گات ها، ویسپرد، وندیداد، یشت ها، خرده اوستا و هات ها.",
};

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function AvestaPortalPage({ searchParams }: PageProps) {
  const locale = getLocaleFromSearchParams(searchParams);
  const sections = await getAvestaSections(locale);
  const studyPaths = getAvestaStudyPaths();
  const portalStats = [
    { label: "بخش اصلی", value: `${sections.length}` },
    { label: "مسیر مطالعه", value: `${studyPaths.length}` },
    { label: "جستجوی درون اوستا", value: "فعال" },
    { label: "رسانه و منابع", value: "در حال گسترش" },
  ];

  return (
    <main className="overflow-hidden pt-24" dir={locale === "en" ? "ltr" : "rtl"}>
      <section className="hero-cosmos relative min-h-[700px]">
        <Image
          src={routeHeroByPath["/avesta"]}
          alt="تالار نورانی اوستا با دروازه های مستقل"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-78"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#fff1c2]/10 via-[#071521]/36 to-[#05080d]/72" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(242,213,138,0.28),transparent_36%),radial-gradient(circle_at_72%_38%,rgba(91,173,255,0.16),transparent_32%)]" />
        <div className="hero-horizon" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:pl-8 lg:pr-[48%] lg:py-32">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/24 bg-black/22 px-4 py-2 text-sm font-black text-gold-light">
            <Sparkles size={16} />
            دروازه اوستا
          </p>
          <h1 className="gold-text mt-6 max-w-3xl text-5xl font-black leading-[1.12] sm:text-7xl">
            جهان اوستا
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-semibold leading-10 text-warm/88">
            اینجا پورتال اصلی اوستاست؛ یک تالار روشن برای انتخاب مسیر. از این صفحه وارد بخش مستقل خودت شو:
            یسنا، گات ها، وندیداد، یشت ها، خرده اوستا یا نقشه هات ها.
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
              href="/avesta/vendidad"
              event="hero_cta_click"
              payload={{ cta_id: "avesta-hero-vendidad", label: "ورود به وندیداد", locale, source_route: "/avesta" }}
              className="inline-flex items-center gap-2 rounded-xl border border-gold/28 bg-night/18 px-6 py-3 font-bold text-gold-light backdrop-blur-sm"
            >
              ورود به وندیداد
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {portalStats.map((stat) => (
            <PortalStat key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <AvestaSectionExplorer sections={sections} />
      </section>

      <AvestaStudyPathsPanel paths={studyPaths} locale={locale} />

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        {([
          ["متن اصلی", "هر بند با متن اصلی، آوانویسی، ترجمه و مسیر مطالعه آماده می شود.", BookOpen],
          ["تصویر اختصاصی", "برای هر بخش مسیر تولید تصویر و فضای هنری جداگانه تعریف شده است.", Flame],
          ["پیام امروز", "بازنویسی ساده، تحلیل مفهومی و پیام اخلاقی برای مخاطب امروز.", Sparkles],
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
