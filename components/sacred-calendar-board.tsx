"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, CalendarDays, Gift, ScrollText, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { SacredCalendarEvent, SacredSeason } from "@/lib/sacred-calendar";
import { seasonLabels } from "@/lib/sacred-calendar";

type SacredCalendarBoardProps = {
  events: SacredCalendarEvent[];
};

const filters: Array<{ label: string; value: SacredSeason | "all" }> = [
  { label: "همه", value: "all" },
  { label: "بهار", value: "spring" },
  { label: "تابستان", value: "summer" },
  { label: "پاییز", value: "autumn" },
  { label: "زمستان", value: "winter" },
  { label: "همیشگی", value: "timeless" },
];

export function SacredCalendarBoard({ events }: SacredCalendarBoardProps) {
  const [season, setSeason] = useState<SacredSeason | "all">("all");
  const filteredEvents = useMemo(
    () => events.filter((event) => season === "all" || event.season === season),
    [events, season]
  );
  const featuredEvent = filteredEvents[0] ?? events[0];

  if (!featuredEvent) {
    return null;
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
      <aside className="lux-frame p-5">
        <div className="flex items-center gap-2 text-gold-light">
          <CalendarDays size={21} />
          <h2 className="text-2xl font-black text-warm">گاه‌شمار</h2>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setSeason(filter.value)}
              className={
                season === filter.value
                  ? "rounded-full bg-gold px-4 py-2 text-xs font-black text-night"
                  : "rounded-full border border-gold/15 bg-night/55 px-4 py-2 text-xs font-bold text-gold-light transition hover:border-gold/40"
              }
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              href={`/calendar/${event.id}`}
              className={
                featuredEvent.id === event.id
                  ? "block rounded-2xl border border-gold/45 bg-gold/12 p-4 text-right"
                  : "block rounded-2xl border border-gold/10 bg-night/55 p-4 text-right transition hover:border-gold/35 hover:bg-gold/10"
              }
            >
              <span className="text-xs font-bold text-gold-light">{event.dateLabel}</span>
              <span className="mt-2 block text-xl font-black text-warm">{event.title}</span>
              <span className="mt-2 block text-sm leading-7 text-muted">{event.subtitle}</span>
              <span className="mt-3 inline-flex items-center gap-2 text-xs font-black text-gold-light">
                صفحه اختصاصی
                <ArrowLeft size={13} />
              </span>
            </Link>
          ))}
        </div>
      </aside>

      <article className="lux-frame overflow-hidden p-5 sm:p-7">
        <div className={`image-scene ${featuredEvent.scene} min-h-[320px] rounded-[22px] border border-gold/15`}>
          <div className="absolute inset-x-6 top-6 flex items-center justify-between text-gold-light">
            <span className="rounded-full border border-gold/25 bg-black/25 px-4 py-2 text-xs font-bold backdrop-blur">
              {seasonLabels[featuredEvent.season]} / {featuredEvent.month}
            </span>
            <Sparkles size={22} />
          </div>
          <div className="absolute bottom-7 right-7 max-w-xl">
            <p className="gold-text text-xs font-semibold tracking-[0.24em]">SACRED CALENDAR</p>
            <h2 className="mt-3 text-5xl font-black text-warm">{featuredEvent.title}</h2>
            <p className="mt-3 text-lg leading-8 text-warm/82">{featuredEvent.subtitle}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-sm font-bold text-gold-light">محور معنایی</p>
            <h3 className="mt-2 text-2xl font-black text-warm">{featuredEvent.spiritualTheme}</h3>
            <p className="mt-4 leading-8 text-muted">{featuredEvent.description}</p>

            <div className="mt-5 grid gap-3">
              {featuredEvent.readingPath.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-gold/10 bg-gold/10 p-4 font-black text-gold-light transition hover:border-gold/35"
                >
                  {item.label}
                  <ArrowLeft size={16} />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <CalendarList icon={ScrollText} title="ایده‌های تجربه کاربر" items={featuredEvent.ritualIdeas} />
            <CalendarList icon={Gift} title="ایده‌های فروشگاه آینده" items={featuredEvent.productIdeas} />
          </div>
        </div>
      </article>
    </section>
  );
}

function CalendarList({
  icon: Icon,
  title,
  items,
}: {
  icon: LucideIcon;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-3xl border border-gold/10 bg-night/55 p-5">
      <div className="flex items-center gap-2 text-gold-light">
        <Icon size={18} />
        <h3 className="font-black text-warm">{title}</h3>
      </div>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-warm/10 bg-black/18 p-3 text-sm leading-7 text-muted">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
