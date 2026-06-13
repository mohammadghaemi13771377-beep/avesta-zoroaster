"use client";

import { AlertTriangle, CircleAlert, FileClock, Info, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import type { AuditLogEntry, AuditSeverity } from "@/lib/audit-log";
import { getAuditSummary } from "@/lib/audit-log";

type AuditLogBoardProps = {
  entries: AuditLogEntry[];
};

const severityLabels: Record<AuditSeverity, string> = {
  info: "اطلاع",
  warning: "هشدار",
  critical: "حساس",
};

const severityClass: Record<AuditSeverity, string> = {
  info: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  warning: "border-gold/20 bg-gold/10 text-gold-light",
  critical: "border-red-300/25 bg-red-300/10 text-red-100",
};

const severityIcon: Record<AuditSeverity, typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  critical: ShieldAlert,
};

export function AuditLogBoard({ entries }: AuditLogBoardProps) {
  const [severity, setSeverity] = useState<"all" | AuditSeverity>("all");
  const filteredEntries = useMemo(
    () => (severity === "all" ? entries : entries.filter((entry) => entry.severity === severity)),
    [entries, severity]
  );
  const summary = useMemo(() => getAuditSummary(entries), [entries]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-gold-light">
            <FileClock size={21} />
            <h2 className="text-2xl font-black">گزارش فعالیت ادمین</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">
            این بخش برای ردیابی تغییرات مهم محتوا، رسانه، نقش‌ها، import و بازبینی منابع آماده شده است.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Metric label="کل رخدادها" value={`${summary.total}`} />
          <Metric label="حساس" value={`${summary.critical}`} />
          <Metric label="هشدار" value={`${summary.warning}`} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", "info", "warning", "critical"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSeverity(item)}
            className={
              severity === item
                ? "inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-black text-night"
                : "inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-xs font-bold text-gold-light transition hover:bg-gold/10"
            }
          >
            <CircleAlert size={13} />
            {item === "all" ? "همه" : severityLabels[item]}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3">
        {filteredEntries.map((entry) => {
          const Icon = severityIcon[entry.severity];
          const createdAt = new Intl.DateTimeFormat("fa-IR", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(entry.createdAt));

          return (
            <article key={entry.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${severityClass[entry.severity]}`}>
                      <Icon size={14} />
                      {severityLabels[entry.severity]}
                    </span>
                    <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                      {entry.area}
                    </span>
                    <span className="rounded-full border border-gold/10 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                      {entry.role}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-black text-warm">{entry.action}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{entry.detail}</p>
                </div>
                <div className="text-left text-xs text-muted" dir="ltr">
                  <p>{createdAt}</p>
                  <p className="mt-2">{entry.actor}</p>
                </div>
              </div>
              <p className="mt-4 rounded-2xl border border-gold/10 bg-royal/45 p-3 text-sm font-bold text-gold-light">
                Target: {entry.target}
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
    <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-gold-light">{value}</p>
    </div>
  );
}
