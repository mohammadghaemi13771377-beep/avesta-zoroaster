"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, BookOpen, CalendarClock, FileText, Filter, ImagePlus, Mic2, Search, SearchCheck, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { AvestaCompletionField } from "@/lib/avesta-completion";
import { avestaCompletionFieldLabels } from "@/lib/avesta-completion";
import {
  avestaProductionStageLabels,
  getAvestaProductionBatchSummary,
  type AvestaProductionBatch,
  type AvestaProductionBatchStage,
} from "@/lib/avesta-production-batches";
import { normalizeSearchText } from "@/lib/search";

type AvestaProductionBatchBoardProps = {
  batches: AvestaProductionBatch[];
};

const allLabel = "همه";

const fieldIcons: Record<AvestaCompletionField, LucideIcon> = {
  originalText: BookOpen,
  transliteration: FileText,
  classicalTranslation: BookOpen,
  simpleRewrite: Sparkles,
  modernInterpretation: SearchCheck,
  ethicalMessage: Sparkles,
  aiImage: ImagePlus,
  audio: Mic2,
  citation: ShieldCheck,
  seo: SearchCheck,
};

const priorityClass: Record<AvestaProductionBatch["priority"], string> = {
  critical: "border-red-300/25 bg-red-300/10 text-red-100",
  high: "border-gold/20 bg-gold/10 text-gold-light",
  medium: "border-warm/10 bg-warm/5 text-muted",
};

export function AvestaProductionBatchBoard({ batches }: AvestaProductionBatchBoardProps) {
  const [query, setQuery] = useState("");
  const [field, setField] = useState<typeof allLabel | AvestaCompletionField>(allLabel);
  const [stage, setStage] = useState<typeof allLabel | AvestaProductionBatchStage>(allLabel);
  const summary = useMemo(() => getAvestaProductionBatchSummary(batches), [batches]);

  const filteredBatches = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return batches.filter((batch) => {
      const matchesField = field === allLabel || batch.field === field;
      const matchesStage = stage === allLabel || batch.stage === stage;
      const haystack = normalizeSearchText(`${batch.title} ${batch.sectionTitle} ${batch.owner} ${batch.objective}`);
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesField && matchesStage && matchesQuery;
    });
  }, [batches, field, query, stage]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">AVESTA PRODUCTION BATCHES</p>
          <h2 className="mt-3 text-3xl font-black text-warm">بچ‌های تولید محتوای اوستا</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد کمبودهای ماتریس تکمیل اوستا را به تسک‌های اجرایی تبدیل می‌کند تا تیم محتوا، رسانه، پژوهش و SEO
            بدانند دقیقاً چه چیزی را باید تولید کنند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="Batch" value={String(summary.total)} />
          <Metric label="بحرانی" value={String(summary.critical)} />
          <Metric label="بالا" value={String(summary.high)} />
          <Metric label="باقی" value={formatNumber(summary.totalMissing)} />
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-gold/10 bg-royal/45 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-muted">Batch بعدی پیشنهادی</p>
            <h3 className="mt-1 text-xl font-black text-warm">{summary.nextBatch?.title ?? "Batch آماده‌ای باقی نمانده"}</h3>
            {summary.nextBatch ? <p className="mt-2 text-sm leading-7 text-gold-light">{summary.nextBatch.objective}</p> : null}
          </div>
          {summary.nextBatch ? (
            <Link href={summary.nextBatch.href} className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
              شروع اقدام
              <ArrowLeft size={16} />
            </Link>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px_220px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در batch، بخش، مالک یا هدف تولید"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <select
          value={field}
          onChange={(event) => setField(event.target.value as typeof allLabel | AvestaCompletionField)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          <option>{allLabel}</option>
          {(Object.keys(avestaCompletionFieldLabels) as AvestaCompletionField[]).map((item) => (
            <option key={item} value={item}>
              {avestaCompletionFieldLabels[item]}
            </option>
          ))}
        </select>
        <select
          value={stage}
          onChange={(event) => setStage(event.target.value as typeof allLabel | AvestaProductionBatchStage)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          <option>{allLabel}</option>
          {Object.entries(avestaProductionStageLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-5">
        {filteredBatches.map((batch) => {
          const Icon = fieldIcons[batch.field];

          return (
            <article key={batch.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                      <Icon size={13} />
                      {batch.fieldLabel}
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${priorityClass[batch.priority]}`}>
                      {batch.priority === "critical" ? "بحرانی" : batch.priority === "high" ? "اولویت بالا" : "اولویت متوسط"}
                    </span>
                    <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                      {avestaProductionStageLabels[batch.stage]}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-warm">{batch.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{batch.objective}</p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                  <CalendarClock className="mx-auto text-gold-light" size={20} />
                  <p className="mt-2 text-sm font-black text-warm">{batch.dueDate}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <Info label="بخش" value={batch.sectionTitle} />
                <Info label="مالک" value={batch.owner} />
                <Info label="آیتم باقی‌مانده" value={formatNumber(batch.missingCount)} />
              </div>

              <div className="mt-5 rounded-2xl border border-gold/10 bg-royal/35 p-4">
                <p className="text-xs font-black text-gold-light">معیار پذیرش</p>
                <ul className="mt-3 grid gap-2 text-sm leading-7 text-muted">
                  {batch.acceptanceCriteria.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>

              <Link href={batch.href} className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10">
                باز کردن محل اقدام
                <ArrowLeft size={16} />
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        {summary.byStage.map((item) => (
          <div key={item.stage} className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
            <Filter className="text-gold-light" size={17} />
            <p className="mt-2 text-xs font-bold text-muted">{item.label}</p>
            <p className="mt-1 text-xl font-black text-warm">{item.count}</p>
          </div>
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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-black text-warm">{value}</p>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
