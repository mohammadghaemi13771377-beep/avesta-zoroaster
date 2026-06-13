"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Filter, Gauge, Rocket, Search, ShieldAlert } from "lucide-react";
import type { AvestaPublicationGate, AvestaPublicationGateStatus } from "@/lib/avesta-publication-gates";
import {
  avestaPublicationGateStatusLabels,
  avestaPublicationGateStatusTone,
  getAvestaPublicationGateSummary,
} from "@/lib/avesta-publication-gates";
import { normalizeSearchText } from "@/lib/search";

type AvestaPublicationGateBoardProps = {
  gates: AvestaPublicationGate[];
};

const allLabel = "همه";
const statuses: Array<typeof allLabel | AvestaPublicationGateStatus> = [allLabel, "block", "hold", "publish"];

export function AvestaPublicationGateBoard({ gates }: AvestaPublicationGateBoardProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<typeof allLabel | AvestaPublicationGateStatus>(allLabel);
  const summary = getAvestaPublicationGateSummary(gates);

  const filteredGates = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return gates.filter((gate) => {
      const matchesStatus = status === allLabel || gate.status === status;
      const haystack = normalizeSearchText(
        `${gate.title} ${gate.slug} ${gate.owner} ${gate.blockers.join(" ")} ${gate.warnings.join(" ")} ${gate.nextAction}`,
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesStatus && matchesQuery;
    });
  }, [gates, query, status]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">AVESTA PUBLICATION GATE</p>
          <h2 className="mt-3 text-3xl font-black text-warm">دروازه انتشار اوستا</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد قبل از انتشار هر بخش اوستا، تکمیل محتوا، پوشش citation و کیفیت صفحه را با هم می‌سنجد و نتیجه
            عملیاتی می‌دهد: قابل انتشار، نگه‌دار برای تکمیل یا مانع انتشار.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="بخش" value={String(summary.total)} />
          <Metric label="امتیاز" value={`${summary.averageScore}٪`} />
          <Metric label="Block" value={String(summary.block)} />
          <Metric label="Hold" value={String(summary.hold)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در بخش، مالک، مانع، هشدار یا اقدام بعدی"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <label className="relative block">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as typeof allLabel | AvestaPublicationGateStatus)}
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item === allLabel ? item : avestaPublicationGateStatusLabels[item]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a href="/api/admin/avesta-publication-gates?format=csv" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
          CSV
          <Download size={16} />
        </a>
        <Link href="/admin/go-live" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          Go-Live
          <Rocket size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredGates.map((gate) => (
          <article key={gate.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${avestaPublicationGateStatusTone[gate.status]}`}>
                  <ShieldAlert size={14} />
                  {avestaPublicationGateStatusLabels[gate.status]}
                </span>
                <h3 className="mt-3 text-2xl font-black text-warm">{gate.title}</h3>
                <p className="mt-2 text-sm font-bold text-muted">{gate.owner}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <Gauge className="mx-auto text-gold-light" size={20} />
                <p className="mt-1 text-2xl font-black text-gold-light">{gate.score}٪</p>
                <p className="text-xs font-bold text-muted">Gate</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Metric label="محتوا" value={`${gate.evidence.contentCompletion}٪`} />
              <Metric label="Citation" value={`${gate.evidence.citationCoverage}٪`} />
              <Metric label="کیفیت صفحه" value={`${gate.evidence.pageQuality}٪`} />
            </div>

            <GateList title="مانع‌ها" items={gate.blockers} empty="مانع قطعی ثبت نشده است." tone="danger" />
            <GateList title="هشدارها" items={gate.warnings} empty="هشدار جدی ثبت نشده است." />
            <GateList title="چک‌لیست انتشار" items={gate.checklist} empty="چک‌لیست آماده است." />

            <div className="mt-5 rounded-2xl border border-gold/10 bg-black/25 p-4">
              <p className="text-xs font-black text-gold-light">اقدام بعدی</p>
              <p className="mt-2 text-sm font-bold leading-7 text-warm">{gate.nextAction}</p>
            </div>

            <Link href={gate.href} className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
              مشاهده بخش
              <ArrowLeft size={16} />
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

function GateList({ title, items, empty, tone = "normal" }: { title: string; items: string[]; empty: string; tone?: "normal" | "danger" }) {
  return (
    <div className="mt-5 rounded-2xl border border-gold/10 bg-black/25 p-4">
      <p className="text-xs font-black text-gold-light">{title}</p>
      <ul className={`mt-3 grid gap-2 text-sm leading-7 ${tone === "danger" ? "text-orange-100" : "text-warm"}`}>
        {(items.length ? items : [empty]).map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}
