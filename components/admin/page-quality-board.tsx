"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, CheckCircle2, Filter, Gauge, Search, ShieldAlert, Smartphone, UserRound } from "lucide-react";
import { normalizeSearchText } from "@/lib/search";
import type { PageQualityItem, PageQualityRisk } from "@/lib/page-quality";
import { getPageQualitySummary, pageQualityRiskLabels, pageQualityRiskTone } from "@/lib/page-quality";

type PageQualityBoardProps = {
  items: PageQualityItem[];
};

const allLabel = "همه";
const risks: Array<typeof allLabel | PageQualityRisk> = [allLabel, "high", "medium", "low"];

export function PageQualityBoard({ items }: PageQualityBoardProps) {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState<typeof allLabel | PageQualityRisk>(allLabel);
  const [area, setArea] = useState(allLabel);
  const summary = getPageQualitySummary(items);

  const areas = useMemo(() => [allLabel, ...Array.from(new Set(items.map((item) => item.area)))], [items]);
  const filteredItems = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return items.filter((item) => {
      const matchesRisk = risk === allLabel || item.risk === risk;
      const matchesArea = area === allLabel || item.area === area;
      const haystack = normalizeSearchText(`${item.title} ${item.route} ${item.area} ${item.owner} ${item.nextAction}`);

      return matchesRisk && matchesArea && (!normalized || haystack.includes(normalized));
    });
  }, [area, items, query, risk]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">PAGE QUALITY MATRIX</p>
          <h2 className="mt-3 text-3xl font-black text-warm">مرکز کنترل کیفیت صفحات</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این ماتریس برای QA قبل از لانچ ساخته شده: هر صفحه از نظر SEO، محتوا، رسانه، منبع، موبایل، مالک و اقدام
            بعدی امتیاز می‌گیرد.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="Route" value={String(summary.total)} />
          <Metric label="میانگین" value={`${summary.averageScore}٪`} />
          <Metric label="آماده" value={String(summary.ready)} />
          <Metric label="ریسک بالا" value={String(summary.highRisk)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_190px_220px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در route، عنوان، مالک یا اقدام بعدی"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <label className="relative block">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
          <select
            value={risk}
            onChange={(event) => setRisk(event.target.value as typeof allLabel | PageQualityRisk)}
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
          >
            {risks.map((item) => (
              <option key={item} value={item}>
                {item === allLabel ? item : pageQualityRiskLabels[item]}
              </option>
            ))}
          </select>
        </label>
        <select
          value={area}
          onChange={(event) => setArea(event.target.value)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          {areas.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredItems.map((item) => (
          <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${pageQualityRiskTone[item.risk]}`}>
                  <ShieldAlert size={14} />
                  {pageQualityRiskLabels[item.risk]}
                </span>
                <h3 className="mt-3 text-2xl font-black leading-9 text-warm">{item.title}</h3>
                <p className="mt-2 text-sm font-bold text-gold-light" dir="ltr">
                  {item.route}
                </p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <Gauge className="mx-auto text-gold-light" size={20} />
                <p className="mt-2 text-xl font-black text-gold-light">{item.score}٪</p>
                <p className="text-xs font-bold text-muted">Quality</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <Info icon={UserRound} label="مالک" value={item.owner} />
              <Info icon={Smartphone} label="قلمرو" value={item.area} />
              <Info icon={CheckCircle2} label="Priority" value={String(item.priority)} />
              <Info icon={Gauge} label="وضعیت" value={item.nextAction} />
            </div>

            <div className="mt-5 grid gap-2">
              {item.checklist.map((check) => (
                <p key={check} className="rounded-xl border border-gold/10 bg-black/25 px-3 py-2 text-sm font-bold leading-7 text-warm">
                  {check}
                </p>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={item.route} className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
                مشاهده صفحه
                <ArrowLeft size={16} />
              </Link>
              <Link href="/admin/go-live" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
                Go-Live
                <Gauge size={16} />
              </Link>
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
