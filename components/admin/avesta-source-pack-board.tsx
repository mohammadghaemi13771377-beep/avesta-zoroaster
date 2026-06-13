"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, CalendarClock, Download, FileText, Filter, PackageCheck, Search, ShieldAlert, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AvestaSourcePack, AvestaSourcePackStatus } from "@/lib/avesta-source-packs";
import { avestaSourcePackStatusLabels, avestaSourcePackStatusTone, getAvestaSourcePackSummary } from "@/lib/avesta-source-packs";
import { sourceReviewRiskLabels, sourceReviewRiskTone, type SourceReviewRisk } from "@/lib/source-review";
import { normalizeSearchText } from "@/lib/search";

type AvestaSourcePackBoardProps = {
  packs: AvestaSourcePack[];
};

const allLabel = "همه";
const statuses: Array<typeof allLabel | AvestaSourcePackStatus> = [allLabel, "draft", "needs-review", "ready"];
const risks: Array<typeof allLabel | SourceReviewRisk> = [allLabel, "high", "medium", "low"];

export function AvestaSourcePackBoard({ packs }: AvestaSourcePackBoardProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<typeof allLabel | AvestaSourcePackStatus>(allLabel);
  const [risk, setRisk] = useState<typeof allLabel | SourceReviewRisk>(allLabel);
  const summary = getAvestaSourcePackSummary(packs);

  const filteredPacks = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return packs.filter((pack) => {
      const matchesStatus = status === allLabel || pack.status === status;
      const matchesRisk = risk === allLabel || pack.risk === risk;
      const haystack = normalizeSearchText(
        `${pack.sectionTitle} ${pack.sectionSlug} ${pack.owner} ${pack.requiredSources.join(" ")} ${pack.requiredAssets.join(" ")} ${pack.editorialNotes.join(" ")}`,
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesStatus && matchesRisk && matchesQuery;
    });
  }, [packs, query, risk, status]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">AVESTA SOURCE PACKS</p>
          <h2 className="mt-3 text-3xl font-black text-warm">پک منابع و معیار انتشار اوستا</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این صفحه برای تحویل مستقیم به تیم پژوهش و محتواست: هر بخش اوستا با منابع لازم، دارایی‌های رسانه‌ای، معیار
            پذیرش، ریسک، مالک و خروجی قابل دانلود آماده شده است.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="پک" value={String(summary.total)} />
          <Metric label="اعتماد" value={`${summary.averageConfidence}٪`} />
          <Metric label="نیازمند بازبینی" value={String(summary.needsReview)} />
          <Metric label="Citation معلق" value={String(summary.pendingCitations)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_190px_190px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در بخش، مالک، منبع، دارایی یا یادداشت"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <label className="relative block">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as typeof allLabel | AvestaSourcePackStatus)}
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item === allLabel ? item : avestaSourcePackStatusLabels[item]}
              </option>
            ))}
          </select>
        </label>
        <select
          value={risk}
          onChange={(event) => setRisk(event.target.value as typeof allLabel | SourceReviewRisk)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          {risks.map((item) => (
            <option key={item} value={item}>
              {item === allLabel ? item : sourceReviewRiskLabels[item]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a href="/api/admin/avesta-source-packs?format=csv" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
          CSV
          <Download size={16} />
        </a>
        <a href="/api/admin/avesta-source-packs?format=md" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
          Markdown
          <FileText size={16} />
        </a>
        <Link href="/admin/source-review" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          مرکز بازبینی منابع
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredPacks.map((pack) => (
          <article key={pack.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${avestaSourcePackStatusTone[pack.status]}`}>
                    <PackageCheck size={14} />
                    {avestaSourcePackStatusLabels[pack.status]}
                  </span>
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${sourceReviewRiskTone[pack.risk]}`}>
                    <ShieldAlert size={14} />
                    {sourceReviewRiskLabels[pack.risk]}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{pack.sectionTitle}</h3>
                <p className="mt-2 text-sm font-bold text-muted">{pack.sectionSlug}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <p className="text-xs font-bold text-muted">اعتماد</p>
                <p className="mt-1 text-2xl font-black text-gold-light">{pack.confidence}٪</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Info icon={UserRound} label="مالک" value={pack.owner} />
              <Info icon={CalendarClock} label="موعد" value={pack.dueDate} />
              <Info icon={BookOpenCheck} label="Citation" value={`${pack.verifiedCitations} تایید / ${pack.pendingCitations} معلق`} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Checklist title="منابع لازم" items={pack.requiredSources} />
              <Checklist title="دارایی‌های لازم" items={pack.requiredAssets} />
            </div>

            <Checklist title="معیار پذیرش" items={pack.acceptanceCriteria} compact />
            <Checklist title="یادداشت تحریریه" items={pack.editorialNotes} compact muted />

            <Link href={pack.href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
              مشاهده صفحه
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

function Checklist({ title, items, compact = false, muted = false }: { title: string; items: string[]; compact?: boolean; muted?: boolean }) {
  return (
    <div className={`mt-5 rounded-2xl border border-gold/10 bg-black/25 ${compact ? "p-4" : "p-5"}`}>
      <p className="text-xs font-black text-gold-light">{title}</p>
      <ul className={`mt-3 grid gap-2 text-sm leading-7 ${muted ? "text-muted" : "text-warm"}`}>
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}
