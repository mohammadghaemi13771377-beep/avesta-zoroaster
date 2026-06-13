"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, CheckCircle2, Filter, Gauge, Rocket, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import type { GoLiveGate, GoLiveGateStatus } from "@/lib/go-live";
import { getGoLiveSummary, goLiveGateStatusLabels } from "@/lib/go-live";

type GoLiveBoardProps = {
  gates: GoLiveGate[];
};

const allLabel = "همه";

const statusClass: Record<GoLiveGateStatus, string> = {
  pass: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  watch: "border-gold/20 bg-gold/10 text-gold-light",
  stop: "border-red-300/25 bg-red-300/10 text-red-100",
};

const statusIcon: Record<GoLiveGateStatus, typeof CheckCircle2> = {
  pass: CheckCircle2,
  watch: AlertTriangle,
  stop: ShieldAlert,
};

export function GoLiveBoard({ gates }: GoLiveBoardProps) {
  const [status, setStatus] = useState<typeof allLabel | GoLiveGateStatus>(allLabel);
  const summary = useMemo(() => getGoLiveSummary(gates), [gates]);
  const visibleGates = useMemo(() => (status === allLabel ? gates : gates.filter((gate) => gate.status === status)), [gates, status]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">GO-LIVE COMMAND</p>
          <h2 className="mt-3 text-3xl font-black text-warm">اتاق کنترل بالا آوردن سایت</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این صفحه تصمیم نهایی لانچ را واضح می‌کند: کدام gateها قابل عبورند، کدام‌ها مراقبت می‌خواهند و کدام مورد مانع انتشار عمومی است.
          </p>
        </div>
        <div className="rounded-3xl border border-gold/20 bg-gold/10 p-5 text-center">
          <Rocket className="mx-auto text-gold-light" size={24} />
          <p className="mt-2 text-xs font-bold text-muted">Launch Mode</p>
          <p className="mt-1 text-4xl font-black text-gold-light">{summary.launchMode}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <Metric label="امتیاز" value={`${summary.averageScore}%`} />
        <Metric label="Gate" value={String(summary.gates)} />
        <Metric label="Pass" value={String(summary.pass)} />
        <Metric label="Watch" value={String(summary.watch)} />
        <Metric label="Stop" value={String(summary.stop)} />
      </div>

      <div className="mt-6 rounded-3xl border border-red-300/20 bg-red-300/10 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black text-red-100">مهم‌ترین مانع یا ریسک لانچ</p>
            <h3 className="mt-2 text-2xl font-black text-warm">{summary.nextStopper.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{summary.nextStopper.command}</p>
          </div>
          <span className="rounded-full border border-red-300/30 bg-red-300/10 px-4 py-2 text-sm font-black text-red-100">
            {summary.nextStopper.score}%
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {([allLabel, "pass", "watch", "stop"] as const).map((item) => (
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
            {item === allLabel ? allLabel : goLiveGateStatusLabels[item]}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5">
        {visibleGates.map((gate) => {
          const Icon = statusIcon[gate.status];

          return (
            <article key={gate.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${statusClass[gate.status]}`}>
                      <Icon size={14} />
                      {goLiveGateStatusLabels[gate.status]}
                    </span>
                    <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                      {gate.owner}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-warm">{gate.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{gate.evidence}</p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                  <Gauge className="mx-auto text-gold-light" size={20} />
                  <p className="mt-2 text-sm font-black text-warm">{gate.score}%</p>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
                <div className="h-full rounded-full bg-gold" style={{ width: `${gate.score}%` }} />
              </div>

              <p className="mt-4 rounded-2xl border border-gold/10 bg-royal/45 p-4 text-sm font-bold leading-7 text-gold-light">
                دستور اقدام: {gate.command}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {gate.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-xs font-black text-gold-light transition hover:bg-gold/10"
                  >
                    {link.label}
                    <ArrowLeft size={14} />
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link href="/admin/team-handoff" className="rounded-3xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40">
          <Rocket className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">تحویل تیم‌ها</h3>
          <p className="mt-2 text-sm leading-7 text-muted">مسئول هر gate را از کنسول تیم‌ها دنبال کنید.</p>
        </Link>
        <Link href="/admin#launch-readiness" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <CheckCircle2 className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">Readiness کامل</h3>
          <p className="mt-2 text-sm leading-7 text-muted">جزئیات بیشتر هر بخش لانچ را ببینید.</p>
        </Link>
        <Link href="/api/admin/go-live" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <ArrowLeft className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">API Go-Live</h3>
          <p className="mt-2 text-sm leading-7 text-muted">خروجی قابل اتصال به dashboard مدیریت پروژه.</p>
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
