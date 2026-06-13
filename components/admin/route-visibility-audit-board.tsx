"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Eye, Filter, Search, ShieldAlert } from "lucide-react";
import type { RouteVisibilityAuditItem, RouteVisibilityRisk } from "@/lib/route-visibility-audit";
import { getRouteVisibilitySummary, routeVisibilityRiskLabels, routeVisibilityRiskTone } from "@/lib/route-visibility-audit";
import { avestaVisibilityLabels, avestaVisibilityTone, type AvestaVisibilityMode } from "@/lib/avesta-feature-flags";
import { normalizeSearchText } from "@/lib/search";

type RouteVisibilityAuditBoardProps = {
  items: RouteVisibilityAuditItem[];
};

const allLabel = "همه";
const risks: Array<typeof allLabel | RouteVisibilityRisk> = [allLabel, "high", "medium", "low"];
const visibilityOptions: Array<typeof allLabel | AvestaVisibilityMode | "system"> = [allLabel, "hidden", "internal", "beta", "public", "system"];

export function RouteVisibilityAuditBoard({ items }: RouteVisibilityAuditBoardProps) {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState<typeof allLabel | RouteVisibilityRisk>(allLabel);
  const [visibility, setVisibility] = useState<typeof allLabel | AvestaVisibilityMode | "system">(allLabel);
  const summary = getRouteVisibilitySummary(items);

  const filteredItems = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return items.filter((item) => {
      const matchesRisk = risk === allLabel || item.risk === risk;
      const matchesVisibility = visibility === allLabel || item.visibility === visibility;
      const haystack = normalizeSearchText(`${item.route} ${item.title} ${item.scope} ${item.reason} ${item.action}`);
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesRisk && matchesVisibility && matchesQuery;
    });
  }, [items, query, risk, visibility]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">ROUTE VISIBILITY AUDIT</p>
          <h2 className="mt-3 text-3xl font-black text-warm">Audit نمایش مسیر و Sitemap</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد Feature Flag اوستا را به SEO وصل می‌کند: هر route مشخص می‌شود که در sitemap، navigation و index
            عمومی مجاز هست یا باید پنهان بماند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="Route" value={String(summary.total)} />
          <Metric label="Sitemap" value={String(summary.sitemapAllowed)} />
          <Metric label="Index" value={String(summary.indexAllowed)} />
          <Metric label="ریسک" value={String(summary.highRisk)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_180px_200px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در route، عنوان، دلیل یا اقدام"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <select
          value={risk}
          onChange={(event) => setRisk(event.target.value as typeof allLabel | RouteVisibilityRisk)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          {risks.map((item) => (
            <option key={item} value={item}>
              {item === allLabel ? item : routeVisibilityRiskLabels[item]}
            </option>
          ))}
        </select>
        <label className="relative block">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
          <select
            value={visibility}
            onChange={(event) => setVisibility(event.target.value as typeof allLabel | AvestaVisibilityMode | "system")}
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
          >
            {visibilityOptions.map((item) => (
              <option key={item} value={item}>
                {item === allLabel ? item : item === "system" ? "System" : avestaVisibilityLabels[item]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a href="/api/admin/route-visibility?format=csv" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
          CSV
          <Download size={16} />
        </a>
        <Link href="/admin/avesta-feature-flags" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          Feature Flags
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredItems.map((item) => (
          <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${routeVisibilityRiskTone[item.risk]}`}>
                    <ShieldAlert size={14} />
                    {routeVisibilityRiskLabels[item.risk]}
                  </span>
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${item.visibility === "system" ? "border-warm/10 bg-warm/5 text-muted" : avestaVisibilityTone[item.visibility]}`}>
                    <Eye size={14} />
                    {item.visibility === "system" ? "System" : avestaVisibilityLabels[item.visibility]}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{item.title}</h3>
                <p className="mt-2 text-sm font-bold text-gold-light" dir="ltr">{item.route}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Metric label="Sitemap" value={item.sitemapAllowed ? "YES" : "NO"} />
              <Metric label="Index" value={item.indexAllowed ? "YES" : "NO"} />
              <Metric label="Nav" value={item.navigationAllowed ? "YES" : "NO"} />
            </div>

            <div className="mt-5 rounded-2xl border border-gold/10 bg-black/25 p-4">
              <p className="text-xs font-black text-gold-light">دلیل</p>
              <p className="mt-2 text-sm leading-7 text-muted">{item.reason}</p>
            </div>
            <div className="mt-3 rounded-2xl border border-gold/10 bg-black/25 p-4">
              <p className="text-xs font-black text-gold-light">اقدام</p>
              <p className="mt-2 text-sm font-bold leading-7 text-warm">{item.action}</p>
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
