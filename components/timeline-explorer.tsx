"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, CalendarDays, Library, MapPin, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

type TimelineEvent = {
  era: string;
  title: string;
  date: string;
  description: string;
  accent: string;
};

const eraFilters = ["همه", "آغاز پیام", "سروده‌ها", "ایران شاهنشاهی", "حفظ متن", "امروز"];

const eventDetails = [
  {
    href: "/zoroaster",
    scene: "scene-prophet",
    imageSrc: "/images/ai/zoroaster-hero.jpg",
    cta: "مطالعه زرتشت",
    keywords: ["اشا", "انتخاب اخلاقی", "پیام خرد"],
  },
  {
    href: "/gathas",
    scene: "scene-sunrise",
    imageSrc: "/images/ai/gathas-hero.jpg",
    cta: "ورود به گات‌ها",
    keywords: ["گات‌ها", "سروده‌ها", "روشنایی"],
  },
  {
    href: "/cyrus",
    scene: "scene-stone",
    imageSrc: "/images/ai/exhibitions-hero.jpg",
    cta: "دیدن ایران باستان",
    keywords: ["هخامنشیان", "کتیبه", "معماری"],
  },
  {
    href: "/library",
    scene: "scene-tablets",
    imageSrc: "/images/ai/library-hero.jpg",
    cta: "منابع کتابخانه",
    keywords: ["ساسانیان", "گردآوری", "نسخه‌ها"],
  },
  {
    href: "/media",
    scene: "scene-cosmic",
    imageSrc: "/images/ai/media-hero.jpg",
    cta: "رسانه و روایت",
    keywords: ["میراث زنده", "پادکست", "تصویر AI"],
  },
];

export function TimelineExplorer({ events }: { events: TimelineEvent[] }) {
  const [activeEra, setActiveEra] = useState("همه");
  const [activeIndex, setActiveIndex] = useState(0);

  const enrichedEvents = useMemo(
    () =>
      events.map((event, index) => ({
        ...event,
        ...(eventDetails[index] ?? eventDetails[0]),
      })),
    [events]
  );

  const visibleEvents = activeEra === "همه" ? enrichedEvents : enrichedEvents.filter((event) => event.era === activeEra);
  const selected = visibleEvents[activeIndex] ?? visibleEvents[0] ?? enrichedEvents[0];
  const selectedGlobalIndex = enrichedEvents.findIndex((event) => event.title === selected?.title);

  function chooseEra(era: string) {
    setActiveEra(era);
    setActiveIndex(0);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
      <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <div className="lux-frame p-5">
          <div className="flex items-center gap-2 text-gold-light">
            <Search size={18} />
            <h2 className="font-black">فیلتر دوره‌ها</h2>
          </div>
          <div className="mt-4 grid gap-2">
            {eraFilters.map((era) => (
              <button
                key={era}
                type="button"
                onClick={() => chooseEra(era)}
                className={`rounded-2xl border px-4 py-3 text-right text-sm font-bold transition ${
                  activeEra === era
                    ? "border-gold/50 bg-gold/15 text-gold-light"
                    : "border-gold/10 bg-night/45 text-muted hover:border-gold/30 hover:text-gold-light"
                }`}
              >
                {era}
              </button>
            ))}
          </div>
        </div>

        <div className="lux-frame p-5">
          <div className="flex items-center gap-2 text-gold-light">
            <Sparkles size={18} />
            <h2 className="font-black">رویداد فعال</h2>
          </div>
          <div className={`image-scene ${selected?.scene ?? "scene-stone"} relative mt-4 h-48 overflow-hidden rounded-2xl border border-gold/15`}>
            {selected?.imageSrc ? <Image src={selected.imageSrc} alt={`تصویر ${selected.title}`} fill sizes="360px" className="object-cover opacity-80" /> : null}
            <div className="absolute inset-0 bg-gradient-to-t from-night/72 via-transparent to-transparent" />
          </div>
          <p className="mt-4 text-sm font-bold" style={{ color: selected?.accent }}>
            {selected?.era}
          </p>
          <h3 className="mt-2 text-2xl font-black text-warm">{selected?.title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{selected?.description}</p>
          {selected?.href ? (
            <Link
              href={selected.href}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              {selected.cta}
              <ArrowLeft size={16} />
            </Link>
          ) : null}
        </div>
      </aside>

      <section id="timeline-events" className="relative">
        <div className="absolute right-6 top-0 hidden h-full w-px bg-gradient-to-b from-gold via-gold/35 to-transparent md:block" />
        <div className="grid gap-5">
          {visibleEvents.map((event, index) => {
            const isActive = event.title === selected?.title;
            const globalIndex = enrichedEvents.findIndex((item) => item.title === event.title);

            return (
              <article
                key={event.title}
                className={`lux-frame relative cursor-pointer p-6 transition md:mr-16 ${
                  isActive ? "border-gold/45 bg-gold/10" : "hover:border-gold/35"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <button
                  type="button"
                  className="absolute -right-[4.15rem] top-8 hidden h-12 w-12 place-items-center rounded-full border border-gold/30 bg-night text-gold-light transition md:grid"
                  style={{ boxShadow: `0 0 28px ${event.accent}33` }}
                  aria-label={`انتخاب ${event.title}`}
                >
                  <MapPin size={18} />
                </button>

                <div className="grid gap-5 xl:grid-cols-[190px_minmax(0,1fr)]">
                  <div className={`image-scene ${event.scene} relative min-h-44 overflow-hidden rounded-2xl border border-gold/15`}>
                    {event.imageSrc ? <Image src={event.imageSrc} alt={`تصویر ${event.title}`} fill sizes="190px" className="object-cover opacity-82" /> : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-night/72 via-transparent to-transparent" />
                  </div>
                  <div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-bold" style={{ color: event.accent }}>
                          {event.era}
                        </p>
                        <h2 className="mt-2 text-3xl font-black text-warm">{event.title}</h2>
                      </div>
                      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/15 bg-night/65 px-4 py-2 text-sm text-muted">
                        <CalendarDays size={15} />
                        {globalIndex + 1}. {event.date}
                      </span>
                    </div>
                    <p className="mt-5 max-w-3xl leading-9 text-muted">{event.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {event.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={event.href}
                        className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light transition hover:border-gold/45 hover:bg-gold/10"
                        onClick={(clickEvent) => clickEvent.stopPropagation()}
                      >
                        <BookOpen size={15} />
                        {event.cta}
                      </Link>
                      <Link
                        href="/library"
                        className="inline-flex items-center gap-2 rounded-full border border-warm/10 px-4 py-2 text-sm font-bold text-muted transition hover:border-gold/30 hover:text-gold-light"
                        onClick={(clickEvent) => clickEvent.stopPropagation()}
                      >
                        <Library size={15} />
                        منبع مرتبط
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {enrichedEvents.map((event, index) => (
            <button
              key={event.title}
              type="button"
              onClick={() => {
                chooseEra("همه");
                setActiveIndex(index);
              }}
              className={`h-2 rounded-full transition ${
                selectedGlobalIndex === index ? "bg-gold" : "bg-gold/20 hover:bg-gold/45"
              }`}
              aria-label={`رفتن به رویداد ${event.title}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
