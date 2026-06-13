"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, DatabaseZap, Download, Filter, LibraryBig, Search, ShieldCheck, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { normalizeSearchText } from "@/lib/search";
import type { SourceRegistryKind, SourceRegistryRecord, SourceRegistryStatus } from "@/lib/source-registry";
import {
  getSourceRegistrySummary,
  sourceRegistryKindLabels,
  sourceRegistryStatusLabels,
  sourceRegistryStatusTone,
} from "@/lib/source-registry";

type SourceRegistryBoardProps = {
  records: SourceRegistryRecord[];
};

const allLabel = "همه";
const statuses: Array<typeof allLabel | SourceRegistryStatus> = [allLabel, "approved", "needs-review", "planned"];
const kinds: Array<typeof allLabel | SourceRegistryKind> = [allLabel, "primary-text", "translation", "commentary", "glossary", "archive", "editorial"];

export function SourceRegistryBoard({ records }: SourceRegistryBoardProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<typeof allLabel | SourceRegistryStatus>(allLabel);
  const [kind, setKind] = useState<typeof allLabel | SourceRegistryKind>(allLabel);
  const summary = getSourceRegistrySummary(records);

  const filteredRecords = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return records.filter((record) => {
      const matchesStatus = status === allLabel || record.status === status;
      const matchesKind = kind === allLabel || record.kind === kind;
      const haystack = normalizeSearchText(
        `${record.title} ${record.author} ${record.language} ${record.owner} ${record.coverage.join(" ")} ${record.citationPolicy} ${record.usageNote}`,
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesStatus && matchesKind && matchesQuery;
    });
  }, [kind, query, records, status]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">SOURCE REGISTRY</p>
          <h2 className="mt-3 text-3xl font-black text-warm">رجیستری رسمی منابع پژوهشی</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این رجیستری فهرست رسمی منابع پروژه است: متن اصلی، ترجمه، شرح، واژه‌نامه، آرشیو و یادداشت تحریریه. هر
            citation آینده باید به یکی از این رکوردها وصل شود تا اعتبار سایت قابل کنترل بماند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="منبع" value={String(summary.total)} />
          <Metric label="اعتماد" value={`${summary.averageConfidence}٪`} />
          <Metric label="تایید شده" value={String(summary.approved)} />
          <Metric label="بازبینی" value={String(summary.needsReview)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_190px_190px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در منبع، نویسنده، زبان، پوشش، policy یا توضیح استفاده"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <label className="relative block">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as typeof allLabel | SourceRegistryStatus)}
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item === allLabel ? item : sourceRegistryStatusLabels[item]}
              </option>
            ))}
          </select>
        </label>
        <select
          value={kind}
          onChange={(event) => setKind(event.target.value as typeof allLabel | SourceRegistryKind)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          {kinds.map((item) => (
            <option key={item} value={item}>
              {item === allLabel ? item : sourceRegistryKindLabels[item]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a href="/api/admin/source-registry?format=csv" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
          CSV
          <Download size={16} />
        </a>
        <a href="/api/admin/source-registry?format=bib" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
          BibTeX
          <DatabaseZap size={16} />
        </a>
        <Link href="/admin/source-review" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          بازبینی منابع
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredRecords.map((record) => (
          <article key={record.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${sourceRegistryStatusTone[record.status]}`}>
                  <ShieldCheck size={14} />
                  {sourceRegistryStatusLabels[record.status]}
                </span>
                <h3 className="mt-3 text-2xl font-black leading-9 text-warm">{record.title}</h3>
                <p className="mt-2 text-sm font-bold text-gold-light">{sourceRegistryKindLabels[record.kind]}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <p className="text-xs font-bold text-muted">اعتماد</p>
                <p className="mt-1 text-2xl font-black text-gold-light">{record.confidence}٪</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Info icon={UserRound} label="مالک" value={record.owner} />
              <Info icon={BookOpenCheck} label="نویسنده" value={record.author} />
              <Info icon={LibraryBig} label="پوشش" value={record.coverage.join("، ")} />
            </div>

            <div className="mt-5 grid gap-3">
              <ReviewRow label="Citation Policy" value={record.citationPolicy} />
              <ReviewRow label="یادداشت استفاده" value={record.usageNote} />
            </div>

            <Link href={record.href} className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
              مشاهده مسیر منبع
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

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-black/25 p-4">
      <p className="text-xs font-black text-gold-light">{label}</p>
      <p className="mt-2 text-sm leading-7 text-muted">{value}</p>
    </div>
  );
}
