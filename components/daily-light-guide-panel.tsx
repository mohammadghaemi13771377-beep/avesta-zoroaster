"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, BookOpen, CheckCircle2, Circle, Flame, RefreshCw, Route, Scale, Sparkles } from "lucide-react";
import type { DailyLightGuideStep } from "@/lib/daily-light-guide";
import { getDailyLightGuide } from "@/lib/daily-light-guide";

const storageKey = "avesta-daily-light-guide-v1";

const intentIcon: Record<DailyLightGuideStep["intent"], LucideIcon> = {
  read: BookOpen,
  reflect: Flame,
  practice: Sparkles,
  quest: Route,
  balance: Scale,
};

function readCompleted(date: string) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "{}") as Record<string, string[]>;
    const completed = parsed[date];
    return Array.isArray(completed) ? completed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeCompleted(date: string, ids: string[]) {
  let parsed: Record<string, string[]> = {};

  try {
    parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "{}") as Record<string, string[]>;
  } catch {
    parsed = {};
  }

  parsed[date] = ids;
  window.localStorage.setItem(storageKey, JSON.stringify(parsed));
}

export function DailyLightGuidePanel() {
  const guide = useMemo(() => getDailyLightGuide(), []);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [status, setStatus] = useState("مسیر امروز آماده شروع است.");

  useEffect(() => {
    setCompletedIds(readCompleted(guide.date));
  }, [guide.date]);

  const progress = Math.round((completedIds.length / guide.steps.length) * 100);
  const nextStep = guide.steps.find((step) => !completedIds.includes(step.id)) ?? guide.steps[0];

  function toggleStep(id: string) {
    const exists = completedIds.includes(id);
    const next = exists ? completedIds.filter((item) => item !== id) : [id, ...completedIds];
    setCompletedIds(next);
    writeCompleted(guide.date, next);
    setStatus(exists ? "این قدم دوباره باز شد." : "یک قدم روشن کامل شد.");
  }

  function resetToday() {
    setCompletedIds([]);
    writeCompleted(guide.date, []);
    setStatus("مسیر امروز بازنشانی شد.");
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr]">
      <aside className="space-y-5">
        <div className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Flame size={24} />
            <h2 className="text-2xl font-black text-warm">راهنمای امروز</h2>
          </div>
          <p className="mt-4 text-sm leading-8 text-muted">{guide.headline}</p>
          <p className="mt-5 text-sm font-bold text-gold-light">{guide.date}</p>
          <p className="mt-2 text-6xl font-black text-warm">{progress}%</p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-warm/10">
            <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-5 grid gap-3">
            <Metric icon={CheckCircle2} label="قدم کامل" value={`${completedIds.length}/${guide.steps.length}`} />
            <Metric icon={Scale} label="تعادل اشا" value={`${guide.score}%`} />
            <Metric icon={Route} label="زمان مسیر" value={guide.totalDuration} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={nextStep.href} className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
              قدم بعدی
              <ArrowLeft size={16} />
            </Link>
            <Link
              href="/wisdom-capsule"
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              کپسول خرد
              <Sparkles size={16} />
            </Link>
            <button
              type="button"
              onClick={resetToday}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              <RefreshCw size={16} />
              بازنشانی امروز
            </button>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">{status}</p>
        </div>

        <div className="lux-frame p-6">
          <p className="text-xs font-bold text-gold-light">پیام امروز</p>
          <h3 className="mt-3 text-2xl font-black leading-10 text-warm">«{guide.quote}»</h3>
          <p className="mt-3 text-sm leading-8 text-muted">{guide.ethicalMessage}</p>
        </div>
      </aside>

      <div className="grid gap-5">
        {guide.steps.map((step) => {
          const completed = completedIds.includes(step.id);
          const Icon = intentIcon[step.intent];

          return (
            <article key={step.id} className="lux-frame p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-gold/20 bg-gold/10 text-gold-light">
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                        {step.label}
                      </span>
                      <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-black text-warm">{step.title}</h3>
                    <p className="mt-2 text-sm leading-8 text-muted">{step.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleStep(step.id)}
                  className={
                    completed
                      ? "inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-black text-emerald-100"
                      : "inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light"
                  }
                >
                  {completed ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                  {completed ? "کامل شد" : "کامل کردم"}
                </button>
              </div>
              <Link href={step.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">
                ورود به قدم
                <ArrowLeft size={15} />
              </Link>
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
