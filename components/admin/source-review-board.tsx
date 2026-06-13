"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, CalendarClock, Filter, Library, Search, ShieldAlert, ShieldCheck, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { normalizeSearchText } from "@/lib/search";
import type { SourceReviewItem, SourceReviewRisk } from "@/lib/source-review";
import { getSourceReviewSummary, sourceReviewRiskLabels, sourceReviewRiskTone } from "@/lib/source-review";

type SourceReviewBoardProps = {
  items: SourceReviewItem[];
};

const allLabel = "همه";
const risks: Array<typeof allLabel | SourceReviewRisk> = [allLabel, "high", "medium", "low"];

export function SourceReviewBoard({ items }: SourceReviewBoardProps) {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState<typeof allLabel | SourceReviewRisk>(allLabel);
  const [owner, setOwner] = useState(allLabel);
  const summary = getSourceReviewSummary(items);

  const owners = useMemo(() => [allLabel, ...Array.from(new Set(items.map((item) => item.owner)))], [items]);
  const filteredItems = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return items.filter((item) => {
      const matchesRisk = risk === allLabel || item.risk === risk;
      const matchesOwner = owner === allLabel || item.owner === owner;
      const haystack = normalizeSearchText(
        `${item.title} ${item.owner} ${item.type} ${item.sourceStatus} ${item.reviewStatus} ${item.nextAction} ${item.references.join(" ")}`,
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesRisk && matchesOwner && matchesQuery;
    });
  }, [items, owner, query, risk]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">SOURCE REVIEW</p>
          <h2 className="mt-3 text-3xl font-black text-warm">مرکز بازبینی منابع</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد Trust Center و Citationها را به زبان اجرایی تبدیل می‌کند: ریسک، مالک، موعد، citationهای تاییدشده
            و قدم بعدی برای تبدیل سایت به یک مرجع قابل اتکا.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="رکورد" value={String(summary.total)} />
          <Metric label="اعتماد" value={`${summary.averageConfidence}٪`} />
          <Metric label="ریسک بالا" value={String(summary.highRisk)} />
          <Metric label="Citation معلق" value={String(summary.pendingCitations)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_190px_220px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در عنوان، مالک، منبع، اقدام بعدی یا reference"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <label className="relative block">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
          <select
            value={risk}
            onChange={(event) => setRisk(event.target.value as typeof allLabel | SourceReviewRisk)}
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
          >
            {risks.map((item) => (
              <option key={item} value={item}>
                {item === allLabel ? item : sourceReviewRiskLabels[item]}
              </option>
            ))}
          </select>
        </label>
        <select
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          {owners.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredItems.map((item) => (
          <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${sourceReviewRiskTone[item.risk]}`}>
                  <ShieldAlert size={14} />
                  {sourceReviewRiskLabels[item.risk]}
                </span>
                <h3 className="mt-3 text-2xl font-black leading-9 text-warm">{item.title}</h3>
                <p className="mt-2 text-sm font-bold text-muted">{item.type}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <ShieldCheck className="mx-auto text-gold-light" size={20} />
                <p className="mt-2 text-xl font-black text-gold-light">{item.confidence}٪</p>
                <p className="text-xs font-bold text-muted">اعتماد</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <Info icon={UserRound} label="مالک" value={item.owner} />
              <Info icon={CalendarClock} label="موعد" value={item.dueDate} />
              <Info icon={BookOpenCheck} label="Citationها" value={`${item.verifiedCitationCount} تایید / ${item.pendingCitationCount} معلق`} />
              <Info icon={Library} label="Reference" value={item.references.join("، ") || "نیازمند ثبت"} />
            </div>

            <div className="mt-5 grid gap-3">
              <ReviewRow label="وضعیت منبع" value={item.sourceStatus} />
              <ReviewRow label="وضعیت بازبینی" value={item.reviewStatus} />
              <ReviewRow label="اقدام بعدی" value={item.nextAction} strong />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={item.href} className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
                مشاهده محتوا
                <ArrowLeft size={16} />
              </Link>
              <Link href="/citations" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
                مرکز ارجاع
                <BookOpenCheck size={16} />
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

function ReviewRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-black/25 p-4">
      <p className="text-xs font-black text-gold-light">{label}</p>
      <p className={`mt-2 text-sm leading-7 ${strong ? "font-black text-warm" : "text-muted"}`}>{value}</p>
    </div>
  );
}
