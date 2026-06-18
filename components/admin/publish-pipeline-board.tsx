"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, CircleDashed, Filter, Rocket, Search, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { normalizeSearchText } from "@/lib/search";
import {
  getPublishPipelineSummary,
  publishDecisionLabels,
  publishDecisionTone,
  type PublishDecision,
  type PublishPipelineItem
} from "@/lib/publish-pipeline";
import { channelLabels, publishingStatusLabels } from "@/lib/publishing-calendar";

type PublishPipelineBoardProps = {
  items: PublishPipelineItem[];
};

const allLabel = "همه";
const decisions: Array<typeof allLabel | PublishDecision> = [allLabel, "block", "hold", "schedule", "publish"];

export function PublishPipelineBoard({ items }: PublishPipelineBoardProps) {
  const [query, setQuery] = useState("");
  const [decision, setDecision] = useState<typeof allLabel | PublishDecision>(allLabel);
  const summary = useMemo(() => getPublishPipelineSummary(items), [items]);

  const filteredItems = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return items.filter((item) => {
      const matchesDecision = decision === allLabel || item.decision === decision;
      const haystack = normalizeSearchText(
        `${item.title} ${item.campaign} ${item.owner} ${item.reviewer} ${item.blocker} ${item.nextAction} ${item.deliverables.join(" ")} ${item.gates
          .map((gate) => `${gate.label} ${gate.note}`)
          .join(" ")}`
      );

      return matchesDecision && (!normalized || haystack.includes(normalized));
    });
  }, [decision, items, query]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">PUBLISH PIPELINE</p>
          <h1 className="mt-3 text-4xl font-black text-warm">اتاق تصمیم انتشار</h1>
          <p className="mt-4 max-w-3xl leading-8 text-muted">
            این بورد بین تقویم انتشار، وظایف تحریریه، رسانه، منابع و SEO می‌ایستد و مشخص می‌کند هر آیتم واقعاً قابل انتشار
            است یا باید نگه داشته شود.
          </p>
        </div>
        <Link href="/api/admin/publish-pipeline" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          خروجی JSON
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <Metric label="کل آیتم‌ها" value={String(summary.total)} />
        <Metric label="Publish" value={String(summary.publish)} />
        <Metric label="Schedule" value={String(summary.schedule)} />
        <Metric label="Hold" value={String(summary.hold)} />
        <Metric label="Block" value={String(summary.block)} />
        <Metric label="Gate" value={`${summary.averageGateScore}%`} />
      </div>

      {summary.nextBlocked ? (
        <div className="mt-6 rounded-3xl border border-red-300/20 bg-red-300/10 p-5">
          <div className="flex items-center gap-2 text-red-100">
            <ShieldAlert size={18} />
            <p className="text-xs font-black">اولویت قبل از انتشار</p>
          </div>
          <h2 className="mt-2 text-2xl font-black text-warm">{summary.nextBlocked.title}</h2>
          <p className="mt-2 text-sm leading-7 text-muted">{summary.nextBlocked.nextAction}</p>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_260px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در آیتم، کمپین، مالک، blocker، deliverable و gate"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <select
          value={decision}
          onChange={(event) => setDecision(event.target.value as typeof allLabel | PublishDecision)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          {decisions.map((item) => (
            <option key={item} value={item}>
              {item === allLabel ? item : publishDecisionLabels[item]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-5">
        {filteredItems.map((item) => (
          <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${publishDecisionTone[item.decision]}`}>
                    {publishDecisionLabels[item.decision]}
                  </span>
                  <Badge>{channelLabels[item.channel]}</Badge>
                  <Badge>{publishingStatusLabels[item.status]}</Badge>
                </div>
                <h2 className="mt-3 text-2xl font-black text-warm">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{item.nextAction}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-5 py-4 text-center">
                <Rocket className="mx-auto text-gold-light" size={22} />
                <p className="mt-2 text-sm font-black text-warm">{item.date}</p>
                <p className="text-xs font-bold text-muted">{item.campaign}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
              <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                <Info label="مالک" value={item.owner} />
                <Info label="بازبین" value={item.reviewer} />
                <Info label="آمادگی" value={`${item.readiness}%`} />
                <Info label="امتیاز Gate" value={`${item.gateScore}%`} />
                <p className="mt-4 rounded-2xl border border-orange-300/20 bg-orange-300/10 p-3 text-sm leading-7 text-muted">
                  {item.blocker}
                </p>
                <Link href={item.href} className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
                  باز کردن مسیر
                  <ArrowLeft size={16} />
                </Link>
              </div>

              <div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {item.gates.map((gate) => (
                    <div key={gate.label} className="rounded-2xl border border-gold/10 bg-black/18 p-4">
                      <div className="flex items-center gap-2">
                        {gate.passed ? <CheckCircle2 className="h-4 w-4 text-emerald-200" /> : <CircleDashed className="h-4 w-4 text-muted" />}
                        <p className={gate.passed ? "text-sm font-black text-emerald-100" : "text-sm font-black text-muted"}>{gate.label}</p>
                      </div>
                      <p className="mt-2 text-xs font-bold leading-6 text-muted">{gate.note}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.deliverables.map((deliverable) => (
                    <span key={deliverable} className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                      {deliverable}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4 text-center">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-2xl font-black text-gold-light">{value}</p>
    </div>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
      <Filter size={12} />
      {children}
    </span>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2 rounded-xl border border-gold/10 bg-night/45 px-3 py-2">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-black leading-6 text-gold-light">{value}</p>
    </div>
  );
}
