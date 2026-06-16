"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, CheckCircle2, Circle, Flame, RotateCcw, Sparkles, Trophy } from "lucide-react";
import type { PracticeDay, PracticePillar } from "@/lib/practice-studio";
import { getPracticeStudioSummary, practicePillarLabels } from "@/lib/practice-studio";

type PracticeStudioBoardProps = {
  plan: PracticeDay[];
};

const storageKey = "avesta-practice-studio-v1";

const pillarClass: Record<PracticePillar, string> = {
  thought: "border-sky-200/20 bg-sky-200/10 text-sky-100",
  word: "border-gold/25 bg-gold/10 text-gold-light",
  deed: "border-emerald-200/20 bg-emerald-200/10 text-emerald-100",
};

function readCompletedIds() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function PracticeStudioBoard({ plan }: PracticeStudioBoardProps) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [status, setStatus] = useState("برنامه هفت‌روزه آماده شروع است.");
  const summary = useMemo(() => getPracticeStudioSummary(completedIds, plan), [completedIds, plan]);

  useEffect(() => {
    setCompletedIds(readCompletedIds());
  }, []);

  function toggleDay(id: string) {
    const exists = completedIds.includes(id);
    const nextIds = exists ? completedIds.filter((item) => item !== id) : [id, ...completedIds];
    setCompletedIds(nextIds);
    window.localStorage.setItem(storageKey, JSON.stringify(nextIds));
    setStatus(exists ? "این تمرین دوباره باز شد." : "تمرین کامل شد و به مسیر روشنایی اضافه شد.");
  }

  function resetPlan() {
    setCompletedIds([]);
    window.localStorage.removeItem(storageKey);
    setStatus("برنامه تمرین بازنشانی شد.");
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
      <aside className="space-y-5">
        <div className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Flame size={24} />
            <h2 className="text-2xl font-black text-warm">استاد تمرین اخلاقی</h2>
          </div>
          <p className="mt-4 text-sm leading-8 text-muted">
            این برنامه، هاب یکتاپرستی، دفتر روزانه، مأموریت‌ها و زنجیره روشنایی را به یک مسیر هفت‌روزه قابل اجرا وصل می‌کند.
          </p>

          <p className="mt-6 text-sm font-bold text-gold-light">پیشرفت برنامه</p>
          <p className="mt-2 text-6xl font-black text-warm">{summary.progress}%</p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-warm/10">
            <div className="h-full rounded-full bg-gold" style={{ width: `${summary.progress}%` }} />
          </div>

          <div className="mt-5 grid gap-3">
            <Metric icon={CheckCircle2} label="روزهای کامل" value={`${summary.completed}/${summary.days}`} />
            <Metric icon={Trophy} label="XP تمرین" value={`${summary.earnedXp}/${summary.totalXp}`} />
            <Metric icon={Sparkles} label="ستون غالب" value={summary.dominantPillar} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={summary.nextDay.href}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              قدم بعدی
              <ArrowLeft size={16} />
            </Link>
            <Link
              href="/asha-balance"
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              نورسنج اشا
              <Sparkles size={16} />
            </Link>
            <button
              type="button"
              onClick={resetPlan}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              <RotateCcw size={16} />
              شروع دوباره
            </button>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">{status}</p>
        </div>

        <div className="lux-frame p-6">
          <p className="text-xs font-bold text-gold-light">تمرین بعدی</p>
          <h3 className="mt-3 text-2xl font-black text-warm">{summary.nextDay.title}</h3>
          <p className="mt-3 text-sm leading-8 text-muted">{summary.nextDay.prompt}</p>
        </div>
      </aside>

      <div className="grid gap-5">
        {plan.map((day) => {
          const completed = completedIds.includes(day.id);

          return (
            <article key={day.id} className="lux-frame p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                      {day.day}
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${pillarClass[day.pillar]}`}>
                      {practicePillarLabels[day.pillar]}
                    </span>
                    <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                      {day.xp} XP
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-warm">{day.title}</h3>
                  <p className="mt-2 text-sm font-bold text-gold-light">{day.pathTitle} / {day.focus}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleDay(day.id)}
                  className={
                    completed
                      ? "inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-black text-emerald-100"
                      : "inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light"
                  }
                >
                  {completed ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                  {completed ? "کامل شد" : "ثبت انجام"}
                </button>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_0.95fr]">
                <div className="rounded-3xl border border-gold/10 bg-night/55 p-5">
                  <p className="text-xs font-bold text-gold-light">پرسش روز</p>
                  <p className="mt-3 text-lg font-black leading-9 text-warm">{day.prompt}</p>
                </div>
                <div className="rounded-3xl border border-gold/10 bg-royal/45 p-5">
                  <p className="text-xs font-bold text-gold-light">عمل قابل اجرا</p>
                  <p className="mt-3 text-sm font-bold leading-8 text-muted">{day.action}</p>
                  <Link href={day.href} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">
                    ورود به منبع
                    <ArrowLeft size={15} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-night/55 p-4">
      <Icon className="text-gold-light" size={18} />
      <p className="mt-3 text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-lg font-black text-gold-light">{value}</p>
    </div>
  );
}
