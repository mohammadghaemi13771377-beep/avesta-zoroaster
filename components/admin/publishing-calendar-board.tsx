"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { normalizeSearchText } from "@/lib/search";
import type { PublishingChannel, PublishingEvent, PublishingStatus } from "@/lib/publishing-calendar";
import { channelLabels, getPublishingCalendarSummary, publishingStatusLabels } from "@/lib/publishing-calendar";

type PublishingCalendarEvent = PublishingEvent & {
  readiness: number;
  blocker: string;
  reviewer: string;
};

type PublishingCalendarBoardProps = {
  events: PublishingCalendarEvent[];
};

const allLabel = "همه";

const statusClass: Record<PublishingStatus, string> = {
  planned: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  "in-progress": "border-gold/20 bg-gold/10 text-gold-light",
  review: "border-orange-300/25 bg-orange-300/10 text-orange-100",
  scheduled: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
};

export function PublishingCalendarBoard({ events }: PublishingCalendarBoardProps) {
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState(allLabel);
  const [status, setStatus] = useState(allLabel);
  const summary = useMemo(() => getPublishingCalendarSummary(events), [events]);

  const filteredEvents = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return events.filter((event) => {
      const matchesChannel = channel === allLabel || event.channel === channel;
      const matchesStatus = status === allLabel || event.status === status;
      const haystack = normalizeSearchText(
        `${event.title} ${event.campaign} ${event.owner} ${event.goal} ${event.deliverables.join(" ")} ${event.blocker}`
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesChannel && matchesStatus && matchesQuery;
    });
  }, [channel, events, query, status]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">PUBLISHING CALENDAR</p>
          <h2 className="mt-3 text-3xl font-black text-warm">تقویم انتشار و کمپین محتوا</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد زمان‌بندی انتشار مقاله، رسانه، منابع، SEO و فروشگاه را به وظایف تحریریه وصل می‌کند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="انتشارها" value={String(summary.total)} />
          <Metric label="کمپین‌ها" value={String(summary.campaigns)} />
          <Metric label="فعال" value={String(summary.inProgress)} />
          <Metric label="متصل به تسک" value={String(summary.taskLinked)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_190px_220px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در کمپین، هدف، مالک، deliverable یا blocker"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <select
          value={channel}
          onChange={(event) => setChannel(event.target.value)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          <option>{allLabel}</option>
          {Object.entries(channelLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          <option>{allLabel}</option>
          {Object.entries(publishingStatusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-5">
        {filteredEvents.map((event) => (
          <article key={event.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{channelLabels[event.channel]}</Badge>
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass[event.status]}`}>
                    {publishingStatusLabels[event.status]}
                  </span>
                  <Badge>{event.campaign}</Badge>
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{event.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{event.goal}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <CalendarDays className="mx-auto text-gold-light" size={20} />
                <p className="mt-2 text-sm font-black text-warm">{event.date}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                <Info label="مالک" value={event.owner} />
                <Info label="بازبین" value={event.reviewer} />
                <Info label="Blocker" value={event.blocker} />
                <Link
                  href={event.href}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
                >
                  باز کردن مسیر
                  <ArrowLeft size={16} />
                </Link>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3 text-xs font-bold text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock3 size={14} />
                    آمادگی مرتبط
                  </span>
                  <span>{event.readiness}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-warm/10">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${event.readiness}%` }} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {event.deliverables.map((item) => (
                    <span key={item} className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-gold-light">{value}</p>
    </div>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
      <Filter size={12} />
      {children}
    </span>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2 rounded-xl border border-gold/10 bg-night/45 px-3 py-2">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-bold leading-6 text-gold-light">{value}</p>
    </div>
  );
}
