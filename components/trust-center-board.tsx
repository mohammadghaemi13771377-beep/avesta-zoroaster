"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, CheckCircle2, ClipboardCheck, Filter, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { normalizeSearchText } from "@/lib/search";
import type { TrustLevel, TrustRecord } from "@/lib/trust-center";
import { trustLevelLabels } from "@/lib/trust-center";

type TrustCenterBoardProps = {
  records: TrustRecord[];
};

const allLabel = "همه";

const levelStyle: Record<TrustLevel, string> = {
  verified: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  editorial: "border-gold/25 bg-gold/10 text-gold-light",
  draft: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  "needs-source": "border-orange-300/25 bg-orange-300/10 text-orange-100",
};

export function TrustCenterBoard({ records }: TrustCenterBoardProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState(allLabel);
  const [level, setLevel] = useState(allLabel);

  const types = useMemo(() => [allLabel, ...Array.from(new Set(records.map((record) => record.type)))], [records]);
  const levels = useMemo(() => [allLabel, ...Array.from(new Set(records.map((record) => record.trustLevel)))], [records]);

  const filteredRecords = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return records.filter((record) => {
      const matchesType = type === allLabel || record.type === type;
      const matchesLevel = level === allLabel || record.trustLevel === level;
      const haystack = normalizeSearchText(
        `${record.title} ${record.type} ${record.sourceStatus} ${record.reviewStatus} ${record.nextAction} ${record.references.join(" ")}`
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesType && matchesLevel && matchesQuery;
    });
  }, [level, query, records, type]);

  return (
    <section className="mt-10">
      <div className="lux-frame p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_180px_220px]">
          <label className="relative block">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جستجو در اعتبار، منبع، مقاله، واژه و مسیر پژوهشی"
              className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
            />
          </label>
          <label className="relative block">
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
            >
              {types.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
          >
            {levels.map((item) => (
              <option key={item} value={item}>
                {item === allLabel ? item : trustLevelLabels[item as TrustLevel]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredRecords.map((record) => (
          <article key={record.id} className="lux-frame p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-gold-light">
                  <ShieldCheck size={18} />
                  <p className="text-xs font-black uppercase tracking-[0.22em]">{record.type}</p>
                </div>
                <h2 className="mt-3 text-2xl font-black leading-9 text-warm">{record.title}</h2>
              </div>
              <span className={`rounded-full border px-4 py-2 text-xs font-black ${levelStyle[record.trustLevel]}`}>
                {trustLevelLabels[record.trustLevel]}
              </span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-night/70">
              <div className="h-full rounded-full bg-gold" style={{ width: `${record.confidence}%` }} />
            </div>
            <p className="mt-2 text-xs font-bold text-gold-light">اعتماد فعلی: {record.confidence}٪</p>

            <div className="mt-5 grid gap-3">
              <TrustRow icon={CheckCircle2} label="وضعیت منبع" value={record.sourceStatus} />
              <TrustRow icon={ClipboardCheck} label="بازبینی" value={record.reviewStatus} />
              <TrustRow icon={ArrowLeft} label="قدم بعدی" value={record.nextAction} />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {record.references.map((reference) => (
                <span key={reference} className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs text-muted">
                  {reference}
                </span>
              ))}
            </div>

            <Link
              href={record.href}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              مشاهده محتوا
              <ArrowLeft size={16} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrustRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-night/50 p-4">
      <div className="flex items-center gap-2 text-gold-light">
        <Icon size={16} />
        <p className="text-xs font-black">{label}</p>
      </div>
      <p className="mt-2 text-sm leading-7 text-muted">{value}</p>
    </div>
  );
}
