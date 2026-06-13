"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ArrowLeft, BookOpenCheck, Filter, Library, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { normalizeSearchText } from "@/lib/search";
import type { CitationRecord, CitationStatus, CitationType } from "@/lib/citations";
import { citationStatusLabels, citationTypeLabels } from "@/lib/citations";

type CitationBoardProps = {
  records: CitationRecord[];
  compact?: boolean;
};

const allLabel = "همه";

const statusStyle: Record<CitationStatus, string> = {
  verified: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  "needs-review": "border-gold/25 bg-gold/10 text-gold-light",
  planned: "border-sky-300/20 bg-sky-300/10 text-sky-100",
};

export function CitationBoard({ records, compact = false }: CitationBoardProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState(allLabel);
  const [status, setStatus] = useState(allLabel);

  const citationTypes = useMemo(
    () => [allLabel, ...Array.from(new Set(records.map((record) => record.citationType)))],
    [records]
  );
  const statuses = useMemo(() => [allLabel, ...Array.from(new Set(records.map((record) => record.status)))], [records]);

  const filtered = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return records.filter((record) => {
      const matchesType = type === allLabel || record.citationType === type;
      const matchesStatus = status === allLabel || record.status === status;
      const haystack = normalizeSearchText(
        `${record.targetTitle} ${record.sourceTitle} ${record.sourceAuthor} ${record.note} ${record.pageHint ?? ""}`
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesType && matchesStatus && matchesQuery;
    });
  }, [query, records, status, type]);

  return (
    <section className={compact ? "" : "mt-10"}>
      {!compact ? (
        <div className="lux-frame p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
            <label className="relative block">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="جستجو در منبع، نویسنده، مقاله، واژه یا بند"
                className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
              />
            </label>
            <SelectFilter icon={Filter} value={type} onChange={setType}>
              {citationTypes.map((item) => (
                <option key={item} value={item}>
                  {item === allLabel ? item : citationTypeLabels[item as CitationType]}
                </option>
              ))}
            </SelectFilter>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item === allLabel ? item : citationStatusLabels[item as CitationStatus]}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      <div className={compact ? "grid gap-4" : "mt-6 grid gap-5 xl:grid-cols-2"}>
        {filtered.map((record) => (
          <article key={record.id} className="lux-frame p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-gold-light">
                  <BookOpenCheck size={18} />
                  <p className="text-xs font-black">{citationTypeLabels[record.citationType]}</p>
                </div>
                <h2 className="mt-3 text-2xl font-black leading-9 text-warm">{record.targetTitle}</h2>
              </div>
              <span className={`rounded-full border px-4 py-2 text-xs font-black ${statusStyle[record.status]}`}>
                {citationStatusLabels[record.status]}
              </span>
            </div>

            <div className="mt-5 rounded-3xl border border-gold/10 bg-night/50 p-4">
              <div className="flex items-center gap-2 text-gold-light">
                <Library size={17} />
                <h3 className="font-black text-warm">{record.sourceTitle}</h3>
              </div>
              <p className="mt-2 text-sm leading-7 text-muted">
                {record.sourceAuthor} / {record.sourceLanguage}
              </p>
              {record.pageHint ? <p className="mt-2 text-xs font-bold text-gold-light">{record.pageHint}</p> : null}
              <p className="mt-3 text-sm leading-7 text-muted">{record.note}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={record.targetHref}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
              >
                مشاهده محتوا
                <ArrowLeft size={16} />
              </Link>
              <Link
                href={record.sourceHref}
                className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
              >
                مشاهده منبع
                <ShieldCheck size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SelectFilter({
  icon: Icon,
  value,
  onChange,
  children,
}: {
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="relative block">
      <Icon className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
      >
        {children}
      </select>
    </label>
  );
}
