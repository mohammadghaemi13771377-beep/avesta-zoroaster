"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Activity, ArrowLeft, BarChart3, Filter, MousePointerClick, Search, TrendingUp, UsersRound } from "lucide-react";
import { normalizeSearchText } from "@/lib/search";
import type { ProductEventSpec, ProductFunnelStage } from "@/lib/product-analytics";
import { dropoffRiskLabels, dropoffRiskTone, getProductAnalyticsSummary } from "@/lib/product-analytics";

type ProductAnalyticsBoardProps = {
  stages: ProductFunnelStage[];
  events: ProductEventSpec[];
};

const allLabel = "همه";

export function ProductAnalyticsBoard({ stages, events }: ProductAnalyticsBoardProps) {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState(allLabel);
  const summary = getProductAnalyticsSummary(stages);

  const filteredStages = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return stages.filter((stage) => {
      const matchesRisk = risk === allLabel || stage.dropoffRisk === risk;
      const haystack = normalizeSearchText(`${stage.label} ${stage.route} ${stage.owner} ${stage.insight} ${stage.nextAction}`);
      return matchesRisk && (!normalized || haystack.includes(normalized));
    });
  }, [query, risk, stages]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">PRODUCT ANALYTICS</p>
          <h2 className="mt-3 text-3xl font-black text-warm">مرکز رصد تجربه و قیف محصول</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این پنل نقشه اولیه analytics کل سایت است: قیف ورود، کاوش، عضویت، فروشگاه و eventهایی که باید در production
            به ابزار analytics وصل شوند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="بازدید نمونه" value={formatNumber(summary.visitors)} />
          <Metric label="تبدیل" value={`${summary.averageConversion}٪`} />
          <Metric label="Stage" value={String(summary.trackedStages)} />
          <Metric label="Event" value={String(summary.eventSpecs)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در قیف، route، مالک یا اقدام بعدی"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <label className="relative block">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
          <select
            value={risk}
            onChange={(event) => setRisk(event.target.value)}
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
          >
            {[allLabel, "high", "medium", "low"].map((item) => (
              <option key={item} value={item}>
                {item === allLabel ? item : dropoffRiskLabels[item as ProductFunnelStage["dropoffRisk"]]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredStages.map((stage) => (
          <article key={stage.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${dropoffRiskTone[stage.dropoffRisk]}`}>
                  <TrendingUp size={14} />
                  {dropoffRiskLabels[stage.dropoffRisk]}
                </span>
                <h3 className="mt-3 text-2xl font-black text-warm">{stage.label}</h3>
                <p className="mt-2 text-sm font-bold text-gold-light" dir="ltr">{stage.route}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <BarChart3 className="mx-auto text-gold-light" size={20} />
                <p className="mt-2 text-xl font-black text-gold-light">{stage.conversionRate}٪</p>
                <p className="text-xs font-bold text-muted">Conversion</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Info icon={UsersRound} label="بازدید" value={formatNumber(stage.visitors)} />
              <Info icon={Activity} label="مالک" value={stage.owner} />
              <Info icon={MousePointerClick} label="ریسک" value={dropoffRiskLabels[stage.dropoffRisk]} />
            </div>

            <div className="mt-5 rounded-2xl border border-gold/10 bg-black/25 p-4">
              <p className="text-xs font-black text-gold-light">Insight</p>
              <p className="mt-2 text-sm leading-7 text-muted">{stage.insight}</p>
              <p className="mt-3 text-sm font-black leading-7 text-warm">{stage.nextAction}</p>
            </div>

            <Link href={stage.route} className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
              مشاهده مسیر
              <ArrowLeft size={16} />
            </Link>
          </article>
        ))}
      </div>

      <section className="mt-8 rounded-3xl border border-gold/10 bg-royal/35 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="gold-text text-xs font-semibold tracking-[0.24em]">EVENT SPEC</p>
            <h3 className="mt-2 text-2xl font-black text-warm">رویدادهای پیشنهادی production</h3>
          </div>
          <Link href="/api/admin/product-analytics" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light transition hover:bg-gold/10">
            API
            <ArrowLeft size={15} />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {events.map((event) => (
            <article key={event.event} className="rounded-2xl border border-gold/10 bg-night/55 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="font-black text-warm">{event.label}</h4>
                <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                  {event.priority}
                </span>
              </div>
              <p className="mt-2 text-xs font-bold text-gold-light" dir="ltr">{event.event}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{event.reason}</p>
              <p className="mt-3 text-xs font-bold leading-6 text-muted" dir="ltr">
                {event.payload.join(", ")}
              </p>
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

function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
