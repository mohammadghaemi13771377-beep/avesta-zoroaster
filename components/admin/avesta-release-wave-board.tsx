"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Download, Filter, Gauge, Search, Waves } from "lucide-react";
import type { AvestaReleaseWave, AvestaReleaseWaveStatus } from "@/lib/avesta-release-waves";
import { avestaReleaseWaveStatusLabels, avestaReleaseWaveStatusTone, getAvestaReleaseWaveSummary } from "@/lib/avesta-release-waves";
import { avestaPublicationGateStatusLabels, avestaPublicationGateStatusTone } from "@/lib/avesta-publication-gates";
import { normalizeSearchText } from "@/lib/search";

type AvestaReleaseWaveBoardProps = {
  waves: AvestaReleaseWave[];
};

const allLabel = "همه";
const statuses: Array<typeof allLabel | AvestaReleaseWaveStatus> = [allLabel, "internal", "beta", "public"];

export function AvestaReleaseWaveBoard({ waves }: AvestaReleaseWaveBoardProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<typeof allLabel | AvestaReleaseWaveStatus>(allLabel);
  const summary = getAvestaReleaseWaveSummary(waves);

  const filteredWaves = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return waves.filter((wave) => {
      const matchesStatus = status === allLabel || wave.status === status;
      const haystack = normalizeSearchText(
        `${wave.title} ${wave.owner} ${wave.objective} ${wave.nextAction} ${wave.gates.map((gate) => `${gate.title} ${gate.slug}`).join(" ")}`,
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesStatus && matchesQuery;
    });
  }, [query, status, waves]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">AVESTA RELEASE WAVES</p>
          <h2 className="mt-3 text-3xl font-black text-warm">موج‌های انتشار اوستا</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد انتشار اوستا را از یک لانچ بزرگ و پرریسک به موج‌های قابل کنترل تبدیل می‌کند: داخلی، بتا و عمومی؛
            هر موج با تاریخ هدف، شرط ورود، شرط خروج و blockerهای واقعی.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="موج" value={String(summary.total)} />
          <Metric label="امتیاز" value={`${summary.averageScore}٪`} />
          <Metric label="Blocker" value={String(summary.totalBlockers)} />
          <Metric label="آماده" value={String(summary.readyWaves)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در موج، مالک، هدف، بخش‌ها یا اقدام بعدی"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <label className="relative block">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as typeof allLabel | AvestaReleaseWaveStatus)}
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item === allLabel ? item : avestaReleaseWaveStatusLabels[item]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a href="/api/admin/avesta-release-waves?format=csv" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
          CSV
          <Download size={16} />
        </a>
        <Link href="/admin/avesta-publication-gates" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          دروازه انتشار
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-5">
        {filteredWaves.map((wave) => (
          <article key={wave.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${avestaReleaseWaveStatusTone[wave.status]}`}>
                  <Waves size={14} />
                  {avestaReleaseWaveStatusLabels[wave.status]}
                </span>
                <h3 className="mt-3 text-2xl font-black text-warm">{wave.title}</h3>
                <p className="mt-2 max-w-4xl text-sm leading-7 text-muted">{wave.objective}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <CalendarDays className="mx-auto text-gold-light" size={20} />
                <p className="mt-1 text-sm font-black text-warm">{wave.targetDate}</p>
                <p className="text-xs font-bold text-muted">{wave.owner}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-4">
              <Metric label="امتیاز موج" value={`${wave.averageScore}٪`} />
              <Metric label="Block" value={String(wave.blockers)} />
              <Metric label="Hold" value={String(wave.hold)} />
              <Metric label="Publish" value={String(wave.publish)} />
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <ListBlock title="شرط ورود" items={wave.entryCriteria} />
              <ListBlock title="شرط خروج" items={wave.exitCriteria} />
              <ListBlock title="خروجی‌ها" items={wave.deliverables} />
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {wave.gates.map((gate) => (
                <Link key={gate.id} href={gate.href} className="rounded-2xl border border-gold/10 bg-royal/35 p-4 transition hover:border-gold/40 hover:bg-gold/10">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${avestaPublicationGateStatusTone[gate.status]}`}>
                    {avestaPublicationGateStatusLabels[gate.status]}
                  </span>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="font-black text-warm">{gate.title}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-black text-gold-light">
                      <Gauge size={16} />
                      {gate.score}٪
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-gold/10 bg-black/25 p-4">
              <p className="text-xs font-black text-gold-light">اقدام بعدی موج</p>
              <p className="mt-2 text-sm font-bold leading-7 text-warm">{wave.nextAction}</p>
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

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-black/25 p-4">
      <p className="text-xs font-black text-gold-light">{title}</p>
      <ul className="mt-3 grid gap-2 text-sm leading-7 text-warm">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}
