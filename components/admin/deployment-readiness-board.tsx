"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, CheckCircle2, Cloud, Filter, GitBranch, ShieldAlert } from "lucide-react";
import type { DeploymentReadinessItem, DeploymentReadinessStatus } from "@/lib/deployment-readiness";
import { deploymentReadinessStatusLabels, getDeploymentReadinessSummary } from "@/lib/deployment-readiness";

type DeploymentReadinessBoardProps = {
  items: DeploymentReadinessItem[];
};

const allLabel = "همه";

const statusClass: Record<DeploymentReadinessStatus, string> = {
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  needs_setup: "border-gold/20 bg-gold/10 text-gold-light",
  blocked: "border-red-300/25 bg-red-300/10 text-red-100",
};

const statusIcon: Record<DeploymentReadinessStatus, typeof CheckCircle2> = {
  ready: CheckCircle2,
  needs_setup: AlertTriangle,
  blocked: ShieldAlert,
};

export function DeploymentReadinessBoard({ items }: DeploymentReadinessBoardProps) {
  const [status, setStatus] = useState<typeof allLabel | DeploymentReadinessStatus>(allLabel);
  const summary = useMemo(() => getDeploymentReadinessSummary(items), [items]);
  const visibleItems = useMemo(() => (status === allLabel ? items : items.filter((item) => item.status === status)), [items, status]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">DEPLOYMENT READINESS</p>
          <h2 className="mt-3 text-3xl font-black text-warm">کنسول تحویل GitHub و Vercel</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد وضعیت تحویل فنی را برای GitHub، Vercel، envها، دیتابیس، دامنه، storage، search و smoke test نشان می‌دهد.
          </p>
        </div>
        <div className="rounded-3xl border border-gold/20 bg-gold/10 p-5 text-center">
          <Cloud className="mx-auto text-gold-light" size={24} />
          <p className="mt-2 text-xs font-bold text-muted">Deploy Mode</p>
          <p className="mt-1 text-4xl font-black text-gold-light">{summary.launchMode}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <Metric label="امتیاز" value={`${summary.averageScore}%`} />
        <Metric label="کل" value={String(summary.total)} />
        <Metric label="آماده" value={String(summary.ready)} />
        <Metric label="Setup" value={String(summary.needsSetup)} />
        <Metric label="Blocked" value={String(summary.blocked)} />
      </div>

      <div className="mt-6 rounded-3xl border border-red-300/20 bg-red-300/10 p-5">
        <p className="text-xs font-black text-red-100">ریسک اصلی deploy</p>
        <h3 className="mt-2 text-2xl font-black text-warm">{summary.highestRisk.title}</h3>
        <p className="mt-2 text-sm leading-7 text-muted">{summary.highestRisk.nextAction}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {([allLabel, "ready", "needs_setup", "blocked"] as const).map((item) => (
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
            {item === allLabel ? allLabel : deploymentReadinessStatusLabels[item]}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5">
        {visibleItems.map((item) => {
          const Icon = statusIcon[item.status];

          return (
            <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${statusClass[item.status]}`}>
                      <Icon size={14} />
                      {deploymentReadinessStatusLabels[item.status]}
                    </span>
                    <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                      {item.owner}
                    </span>
                    <span className="rounded-full border border-gold/10 bg-royal/50 px-3 py-1 text-xs font-bold text-gold-light">
                      Risk: {item.risk}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-warm">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.evidence}</p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                  <p className="text-xs font-bold text-muted">Score</p>
                  <p className="mt-1 text-2xl font-black text-gold-light">{item.score}%</p>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
                <div className="h-full rounded-full bg-gold" style={{ width: `${item.score}%` }} />
              </div>

              <p className="mt-4 rounded-2xl border border-gold/10 bg-royal/45 p-4 text-sm font-bold leading-7 text-gold-light">
                اقدام بعدی: {item.nextAction}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.references.map((reference) => (
                  <span key={reference} className="rounded-full border border-gold/10 bg-black/20 px-3 py-2 text-xs font-bold text-warm" dir="ltr">
                    {reference}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link href="/admin/go-live" className="rounded-3xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40">
          <Cloud className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">Go-Live</h3>
          <p className="mt-2 text-sm leading-7 text-muted">وضعیت کلی لانچ و مانع‌های عمومی را ببینید.</p>
        </Link>
        <Link href="/admin/team-handoff" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <GitBranch className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">تحویل تیم‌ها</h3>
          <p className="mt-2 text-sm leading-7 text-muted">مسئولیت هر تیم را کنار deploy دنبال کنید.</p>
        </Link>
        <Link href="/api/admin/deployment-readiness" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <ArrowLeft className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">API Deploy</h3>
          <p className="mt-2 text-sm leading-7 text-muted">خروجی JSON برای CI یا dashboard مدیریت پروژه.</p>
        </Link>
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
