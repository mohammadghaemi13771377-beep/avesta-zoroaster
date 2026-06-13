"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Activity, ArrowLeft, CheckCircle2, Database, Filter, MousePointerClick, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { normalizeSearchText } from "@/lib/search";
import type { TrackingEventMatrixItem, TrackingStatus } from "@/lib/event-tracking";
import {
  destinationLabels,
  getTrackingImplementationChecklist,
  getTrackingSummary,
  trackingStatusLabels,
  trackingStatusTone,
} from "@/lib/event-tracking";

type EventTrackingBoardProps = {
  events: TrackingEventMatrixItem[];
};

const allLabel = "همه";

export function EventTrackingBoard({ events }: EventTrackingBoardProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(allLabel);
  const summary = getTrackingSummary(events);
  const checklist = getTrackingImplementationChecklist();

  const filteredEvents = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return events.filter((event) => {
      const matchesStatus = status === allLabel || event.status === status;
      const haystack = normalizeSearchText(
        `${event.event} ${event.label} ${event.route} ${event.owner} ${event.trigger} ${event.reason} ${event.payload.join(" ")}`
      );
      return matchesStatus && (!normalized || haystack.includes(normalized));
    });
  }, [events, query, status]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">EVENT TRACKING MATRIX</p>
          <h2 className="mt-3 text-3xl font-black text-warm">ماتریس رویدادها و ابزارهای رشد</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بخش قرارداد اجرایی event tracking است: چه رویدادی کجا ثبت می‌شود، چه payloadی دارد، مالک آن کیست،
            مقصدش چیست و QA چگونه باید آن را کنترل کند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Metric label="Event" value={String(summary.total)} />
          <Metric label="Must" value={String(summary.mustHave)} />
          <Metric label="Ready" value={`${summary.implementationReadiness}٪`} />
          <Metric label="Dev" value={String(summary.needsDev)} />
          <Metric label="Blocked" value={String(summary.blocked)} />
          <Metric label="Destination" value={String(summary.destinationCount)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_240px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در event، route، مالک، payload یا QA"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <label className="relative block">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
          >
            {[allLabel, "instrumented", "needs-dev", "planned", "blocked"].map((item) => (
              <option key={item} value={item}>
                {item === allLabel ? item : trackingStatusLabels[item as TrackingStatus]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredEvents.map((event) => (
          <article key={event.event} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${trackingStatusTone[event.status]}`}>
                  <Activity size={14} />
                  {trackingStatusLabels[event.status]}
                </span>
                <h3 className="mt-3 text-2xl font-black text-warm">{event.label}</h3>
                <p className="mt-2 text-xs font-bold text-gold-light" dir="ltr">{event.event}</p>
              </div>
              <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                {event.priority}
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Info icon={MousePointerClick} label="Trigger" value={event.trigger} />
              <Info icon={Database} label="Route" value={event.route} />
              <Info icon={ShieldCheck} label="Owner" value={event.owner} />
            </div>

            <div className="mt-5 rounded-2xl border border-gold/10 bg-black/25 p-4">
              <p className="text-xs font-black text-gold-light">Payload</p>
              <p className="mt-2 text-xs font-bold leading-6 text-muted" dir="ltr">
                {event.payload.join(", ")}
              </p>
              <p className="mt-4 text-xs font-black text-gold-light">QA Rule</p>
              <p className="mt-2 text-sm leading-7 text-muted">{event.qaRule}</p>
              <p className="mt-4 text-xs font-black text-gold-light">Privacy</p>
              <p className="mt-2 text-sm leading-7 text-muted">{event.privacyNote}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {event.destination.map((destination) => (
                <span key={destination} className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                  {destinationLabels[destination]}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="mt-8 rounded-3xl border border-gold/10 bg-royal/35 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="gold-text text-xs font-semibold tracking-[0.24em]">IMPLEMENTATION CHECKLIST</p>
            <h3 className="mt-2 text-2xl font-black text-warm">چک‌لیست اتصال production</h3>
          </div>
          <Link href="/api/admin/event-tracking" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light transition hover:bg-gold/10">
            API
            <ArrowLeft size={15} />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {checklist.map((item) => (
            <article key={item.title} className="rounded-2xl border border-gold/10 bg-night/55 p-4">
              <div className="flex items-center gap-2 text-gold-light">
                <CheckCircle2 size={18} />
                <p className="text-sm font-black">{item.owner}</p>
              </div>
              <h4 className="mt-3 text-xl font-black text-warm">{item.title}</h4>
              <p className="mt-2 text-sm leading-7 text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
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

function Info({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
      <div className="flex items-center gap-2 text-gold-light">
        <Icon size={16} />
        <p className="text-xs font-black">{label}</p>
      </div>
      <p className="mt-2 text-sm font-bold leading-7 text-warm">{value}</p>
    </div>
  );
}
