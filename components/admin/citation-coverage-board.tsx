"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Download, Filter, Gauge, Search, ShieldAlert } from "lucide-react";
import type { CitationCoverageItem, CitationCoverageRisk } from "@/lib/citation-coverage";
import { citationCoverageRiskLabels, citationCoverageRiskTone, getCitationCoverageSummary } from "@/lib/citation-coverage";
import { normalizeSearchText } from "@/lib/search";

type CitationCoverageBoardProps = {
  items: CitationCoverageItem[];
};

const allLabel = "همه";
const risks: Array<typeof allLabel | CitationCoverageRisk> = [allLabel, "high", "medium", "low"];

export function CitationCoverageBoard({ items }: CitationCoverageBoardProps) {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState<typeof allLabel | CitationCoverageRisk>(allLabel);
  const summary = getCitationCoverageSummary(items);

  const filteredItems = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return items.filter((item) => {
      const matchesRisk = risk === allLabel || item.risk === risk;
      const haystack = normalizeSearchText(
        `${item.title} ${item.slug} ${item.missingSourceKinds.join(" ")} ${item.nextAction} ${item.records.map((record) => record.sourceTitle).join(" ")}`,
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesRisk && matchesQuery;
    });
  }, [items, query, risk]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">CITATION COVERAGE</p>
          <h2 className="mt-3 text-3xl font-black text-warm">نقشه پوشش ارجاع اوستا</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد نشان می‌دهد هر بخش اوستا از نظر citation چه‌قدر آماده است: ارجاع تاییدشده، ارجاع معلق، منبع
            برنامه‌ریزی‌شده، اتصال به رجیستری منابع و اقدام بعدی برای انتشار امن.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="بخش" value={String(summary.totalSections)} />
          <Metric label="امتیاز" value={`${summary.averageScore}٪`} />
          <Metric label="ریسک بالا" value={String(summary.highRisk)} />
          <Metric label="ارجاع معلق" value={String(summary.pending)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در بخش، نوع منبع کم‌شده، عنوان منبع یا اقدام بعدی"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <label className="relative block">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
          <select
            value={risk}
            onChange={(event) => setRisk(event.target.value as typeof allLabel | CitationCoverageRisk)}
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
          >
            {risks.map((item) => (
              <option key={item} value={item}>
                {item === allLabel ? item : citationCoverageRiskLabels[item]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a href="/api/admin/citation-coverage?format=csv" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
          CSV
          <Download size={16} />
        </a>
        <Link href="/admin/source-registry" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          رجیستری منابع
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredItems.map((item) => (
          <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${citationCoverageRiskTone[item.risk]}`}>
                  <ShieldAlert size={14} />
                  {citationCoverageRiskLabels[item.risk]}
                </span>
                <h3 className="mt-3 text-2xl font-black text-warm">{item.title}</h3>
                <p className="mt-2 text-sm font-bold text-muted">{item.slug}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <Gauge className="mx-auto text-gold-light" size={20} />
                <p className="mt-1 text-2xl font-black text-gold-light">{item.coverageScore}٪</p>
                <p className="text-xs font-bold text-muted">پوشش</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-4">
              <Metric label="کل" value={String(item.total)} />
              <Metric label="تایید" value={String(item.verified)} />
              <Metric label="بازبینی" value={String(item.needsReview)} />
              <Metric label="برنامه" value={String(item.planned)} />
            </div>

            <div className="mt-5 rounded-2xl border border-gold/10 bg-black/25 p-4">
              <p className="text-xs font-black text-gold-light">کمبود نوع منبع</p>
              <p className="mt-2 text-sm leading-7 text-warm">
                {item.missingSourceKinds.length ? item.missingSourceKinds.join("، ") : "کمبود حیاتی ثبت نشده"}
              </p>
            </div>

            <div className="mt-3 rounded-2xl border border-gold/10 bg-black/25 p-4">
              <p className="text-xs font-black text-gold-light">اقدام بعدی</p>
              <p className="mt-2 text-sm font-bold leading-7 text-warm">{item.nextAction}</p>
            </div>

            <div className="mt-5 grid gap-2">
              {item.records.slice(0, 4).map((record) => (
                <div key={record.id} className="rounded-2xl border border-gold/10 bg-royal/35 p-3">
                  <p className="text-sm font-black text-warm">{record.sourceTitle}</p>
                  <p className="mt-1 text-xs leading-6 text-muted">{record.citationType} / {record.status}</p>
                </div>
              ))}
            </div>

            <Link href={item.href} className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
              مشاهده بخش
              <BookOpenCheck size={16} />
            </Link>
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
