"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Flame, RefreshCw, Scale, Sparkles } from "lucide-react";
import { buildAshaBalanceSnapshot, type AshaBalanceSnapshot } from "@/lib/asha-balance";

const keys = {
  practice: "avesta-practice-studio-v1",
  quests: "avesta-learning-quests-v1",
  reflections: "avesta-daily-reflection-v1",
};

function readArray(key: string) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function readReflectionDates() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(keys.reflections) ?? "{}") as Record<string, { completed?: boolean; date?: string }>;
    return Object.values(parsed)
      .filter((entry) => entry.completed && entry.date)
      .map((entry) => entry.date as string);
  } catch {
    return [];
  }
}

function readSnapshot() {
  return buildAshaBalanceSnapshot({
    completedPracticeIds: readArray(keys.practice),
    completedQuestIds: readArray(keys.quests),
    completedReflectionDates: readReflectionDates(),
  });
}

const modeLabels: Record<AshaBalanceSnapshot["mode"], string> = {
  start: "شروع",
  warming: "در حال روشن شدن",
  balanced: "متعادل",
  radiant: "درخشان",
};

export function AshaBalancePanel() {
  const fallback = useMemo(() => buildAshaBalanceSnapshot(), []);
  const [snapshot, setSnapshot] = useState<AshaBalanceSnapshot>(fallback);

  useEffect(() => {
    setSnapshot(readSnapshot());
  }, []);

  return (
    <section className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
      <aside className="space-y-5">
        <div className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Scale size={24} />
            <h2 className="text-2xl font-black text-warm">نورسنج اشا</h2>
          </div>
          <p className="mt-4 text-sm leading-8 text-muted">
            این داشبورد تعادل پندار، گفتار و کردار را از تمرین‌های روزانه، مأموریت‌ها و دفتر تأمل می‌خواند و به یک امتیاز زنده تبدیل می‌کند.
          </p>
          <p className="mt-5 text-sm font-bold text-gold-light">{modeLabels[snapshot.mode]}</p>
          <p className="mt-2 text-6xl font-black text-warm">{snapshot.score}%</p>
          <p className="mt-3 text-sm leading-7 text-muted">{snapshot.headline}</p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-warm/10">
            <div className="h-full rounded-full bg-gold" style={{ width: `${snapshot.score}%` }} />
          </div>
          <button
            type="button"
            onClick={() => setSnapshot(readSnapshot())}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-5 py-3 text-sm font-bold text-gold-light transition hover:border-gold/40"
          >
            <RefreshCw size={16} />
            تازه‌سازی نورسنج
          </button>
        </div>

        <div className="lux-frame p-6">
          <p className="text-xs font-bold text-gold-light">نقل‌قول امروز</p>
          <h3 className="mt-3 text-2xl font-black leading-10 text-warm">«{snapshot.quote}»</h3>
          <p className="mt-3 text-sm leading-8 text-muted">{snapshot.ethicalMessage}</p>
        </div>
      </aside>

      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          {snapshot.pillars.map((pillar) => (
            <Link key={pillar.pillar} href={pillar.href} className="lux-frame block p-5 transition hover:-translate-y-1 hover:border-gold/45">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                  {pillar.label}
                </span>
                <CheckCircle2 className="text-gold-light" size={18} />
              </div>
              <p className="mt-5 text-5xl font-black text-warm">{pillar.score}%</p>
              <p className="mt-2 text-xs font-bold text-muted">
                {pillar.completed}/{pillar.total} تمرین
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-warm/10">
                <div className="h-full rounded-full bg-gold" style={{ width: `${pillar.score}%` }} />
              </div>
              <p className="mt-4 min-h-20 text-sm leading-7 text-muted">{pillar.guidance}</p>
            </Link>
          ))}
        </div>

        <div className="lux-frame p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="gold-text text-xs font-semibold tracking-[0.24em]">ASHA NEXT PRACTICE</p>
              <h2 className="mt-3 text-4xl font-black text-warm">تمرین پیشنهادی برای تعادل امروز</h2>
              <p className="mt-4 max-w-2xl leading-8 text-muted">{snapshot.nextPractice.prompt}</p>
            </div>
            <div className="rounded-3xl border border-gold/10 bg-gold/10 p-4 text-center">
              <Flame className="mx-auto text-gold-light" size={22} />
              <p className="mt-2 text-xs font-bold text-muted">Streak</p>
              <p className="mt-1 text-2xl font-black text-gold-light">{snapshot.streakDays}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/practice" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
              ادامه برنامه تمرین
              <ArrowLeft size={16} />
            </Link>
            <Link href={snapshot.nextPractice.href} className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
              منبع تمرین
              <Sparkles size={16} />
            </Link>
          </div>
        </div>

        <div className="lux-frame p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Metric label="پیشرفت مأموریت‌ها" value={`${snapshot.questProgress}%`} />
            <Metric label="حلقه رفتاری" value="Practice + Reflection + Quest" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-night/55 p-4">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-gold-light">{value}</p>
    </div>
  );
}
