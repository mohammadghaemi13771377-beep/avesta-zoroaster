"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Eye, Filter, Search, ShieldCheck, ToggleRight } from "lucide-react";
import type { AvestaFeatureFlag, AvestaVisibilityMode } from "@/lib/avesta-feature-flags";
import { avestaVisibilityLabels, avestaVisibilityTone, getAvestaFeatureFlagSummary } from "@/lib/avesta-feature-flags";
import { avestaPublicationGateStatusLabels, avestaPublicationGateStatusTone } from "@/lib/avesta-publication-gates";
import { normalizeSearchText } from "@/lib/search";

type AvestaFeatureFlagBoardProps = {
  flags: AvestaFeatureFlag[];
};

const allLabel = "همه";
const visibilities: Array<typeof allLabel | AvestaVisibilityMode> = [allLabel, "hidden", "internal", "beta", "public"];

export function AvestaFeatureFlagBoard({ flags }: AvestaFeatureFlagBoardProps) {
  const [query, setQuery] = useState("");
  const [visibility, setVisibility] = useState<typeof allLabel | AvestaVisibilityMode>(allLabel);
  const summary = getAvestaFeatureFlagSummary(flags);

  const filteredFlags = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return flags.filter((flag) => {
      const matchesVisibility = visibility === allLabel || flag.visibility === visibility;
      const haystack = normalizeSearchText(
        `${flag.sectionTitle} ${flag.sectionSlug} ${flag.waveTitle} ${flag.audience} ${flag.reason} ${flag.safeguards.join(" ")}`,
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesVisibility && matchesQuery;
    });
  }, [flags, query, visibility]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">AVESTA FEATURE FLAGS</p>
          <h2 className="mt-3 text-3xl font-black text-warm">کنترل نمایش و Feature Flag اوستا</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد مشخص می‌کند هر بخش اوستا در چه سطحی دیده شود: پنهان، داخلی، بتا یا عمومی. تصمیم بر اساس موج
            انتشار و دروازه انتشار گرفته می‌شود تا لانچ مرحله‌ای امن بماند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="Flag" value={String(summary.total)} />
          <Metric label="فعال" value={String(summary.enabled)} />
          <Metric label="بتا" value={String(summary.beta)} />
          <Metric label="عمومی" value={String(summary.public)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در بخش، موج، مخاطب، دلیل یا safeguard"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <label className="relative block">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
          <select
            value={visibility}
            onChange={(event) => setVisibility(event.target.value as typeof allLabel | AvestaVisibilityMode)}
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
          >
            {visibilities.map((item) => (
              <option key={item} value={item}>
                {item === allLabel ? item : avestaVisibilityLabels[item]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a href="/api/admin/avesta-feature-flags?format=csv" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
          CSV
          <Download size={16} />
        </a>
        <Link href="/admin/avesta-release-waves" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          موج‌های انتشار
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredFlags.map((flag) => (
          <article key={flag.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${avestaVisibilityTone[flag.visibility]}`}>
                    <Eye size={14} />
                    {avestaVisibilityLabels[flag.visibility]}
                  </span>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${avestaPublicationGateStatusTone[flag.gateStatus]}`}>
                    {avestaPublicationGateStatusLabels[flag.gateStatus]}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{flag.sectionTitle}</h3>
                <p className="mt-2 text-sm font-bold text-muted">{flag.waveTitle}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <ToggleRight className="mx-auto text-gold-light" size={20} />
                <p className="mt-1 text-xl font-black text-gold-light">{flag.enabled ? "ON" : "OFF"}</p>
                <p className="text-xs font-bold text-muted">{flag.score}٪</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-gold/10 bg-black/25 p-4">
              <p className="text-xs font-black text-gold-light">مخاطب</p>
              <p className="mt-2 text-sm font-bold leading-7 text-warm">{flag.audience}</p>
            </div>

            <div className="mt-3 rounded-2xl border border-gold/10 bg-black/25 p-4">
              <p className="text-xs font-black text-gold-light">دلیل وضعیت</p>
              <p className="mt-2 text-sm leading-7 text-muted">{flag.reason}</p>
            </div>

            <ListBlock title="Safeguard" items={flag.safeguards} />
            <ListBlock title="Rollout Checklist" items={flag.rolloutChecklist} />

            <Link href={flag.href} className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
              مشاهده بخش
              <ShieldCheck size={16} />
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

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5 rounded-2xl border border-gold/10 bg-black/25 p-4">
      <p className="text-xs font-black text-gold-light">{title}</p>
      <ul className="mt-3 grid gap-2 text-sm leading-7 text-warm">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}
