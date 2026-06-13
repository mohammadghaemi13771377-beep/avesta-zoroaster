"use client";

import { AlertTriangle, CheckCircle2, Filter, Rocket, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import type { LaunchReadinessItem, LaunchReadinessStatus } from "@/lib/launch-readiness";
import { getLaunchReadinessSummary } from "@/lib/launch-readiness";

type LaunchReadinessBoardProps = {
  items: LaunchReadinessItem[];
};

const statusLabels: Record<LaunchReadinessStatus, string> = {
  ready: "آماده",
  warning: "نیازمند تکمیل",
  blocked: "مانع لانچ",
};

const statusClass: Record<LaunchReadinessStatus, string> = {
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  warning: "border-gold/20 bg-gold/10 text-gold-light",
  blocked: "border-red-300/25 bg-red-300/10 text-red-100",
};

const statusIcon: Record<LaunchReadinessStatus, typeof CheckCircle2> = {
  ready: CheckCircle2,
  warning: AlertTriangle,
  blocked: ShieldAlert,
};

export function LaunchReadinessBoard({ items }: LaunchReadinessBoardProps) {
  const [status, setStatus] = useState<"all" | LaunchReadinessStatus>("all");
  const filteredItems = useMemo(
    () => (status === "all" ? items : items.filter((item) => item.status === status)),
    [items, status]
  );
  const summary = useMemo(() => getLaunchReadinessSummary(items), [items]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-gold-light">
            <Rocket size={22} />
            <h2 className="text-2xl font-black">آمادگی لانچ</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">
            این preflight نشان می‌دهد پروژه برای بالا آمدن روی دامنه چه میزان آماده است و کدام کارها قبل از لانچ
            عمومی باید بسته شوند.
          </p>
        </div>
        <div className="rounded-3xl border border-gold/20 bg-gold/10 p-5 text-center">
          <p className="text-xs font-bold text-muted">امتیاز کلی</p>
          <p className="mt-1 text-5xl font-black text-gold-light">{summary.averageScore}%</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <Metric label="آماده" value={`${summary.ready}`} />
        <Metric label="نیازمند تکمیل" value={`${summary.warning}`} />
        <Metric label="مانع لانچ" value={`${summary.blocked}`} />
        <Metric label="کل موارد" value={`${summary.total}`} />
      </div>

      <div className="mt-6 rounded-3xl border border-red-300/20 bg-red-300/10 p-5">
        <p className="text-xs font-black text-red-100">مهم‌ترین مانع فعلی</p>
        <h3 className="mt-2 text-2xl font-black text-warm">{summary.nextBlocker.label}</h3>
        <p className="mt-2 text-sm leading-7 text-muted">{summary.nextBlocker.nextAction}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", "ready", "warning", "blocked"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setStatus(item)}
            className={
              status === item
                ? "inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-black text-night"
                : "inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-xs font-bold text-gold-light transition hover:bg-gold/10"
            }
          >
            <Filter size={13} />
            {item === "all" ? "همه" : statusLabels[item]}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        {filteredItems.map((item) => {
          const Icon = statusIcon[item.status];

          return (
            <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${statusClass[item.status]}`}>
                      <Icon size={14} />
                      {statusLabels[item.status]}
                    </span>
                    <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                      {item.area}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-warm">{item.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.evidence}</p>
                </div>
                <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-black text-gold-light">
                  {item.score}%
                </span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
                <div className="h-full rounded-full bg-gold" style={{ width: `${item.score}%` }} />
              </div>
              <p className="mt-4 rounded-2xl border border-gold/10 bg-royal/45 p-4 text-sm font-bold leading-7 text-gold-light">
                قدم بعدی: {item.nextAction}
              </p>
            </article>
          );
        })}
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
