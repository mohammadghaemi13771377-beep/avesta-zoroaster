"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, Compass, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { StudyPlanStep } from "@/lib/study-plan";
import { getStudyPlanSummary } from "@/lib/study-plan";

type StudyPlanBoardProps = {
  steps: StudyPlanStep[];
};

const studyPlanKey = "avesta-study-plan-completed-v1";

function readCompletedSteps(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(studyPlanKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function StudyPlanBoard({ steps }: StudyPlanBoardProps) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    setCompletedIds(readCompletedSteps());
  }, []);

  const summary = useMemo(() => getStudyPlanSummary(completedIds), [completedIds]);

  function toggleStep(id: string) {
    const exists = completedIds.includes(id);
    const nextIds = exists ? completedIds.filter((item) => item !== id) : [id, ...completedIds];
    setCompletedIds(nextIds);
    window.localStorage.setItem(studyPlanKey, JSON.stringify(nextIds));
  }

  function resetPlan() {
    setCompletedIds([]);
    window.localStorage.removeItem(studyPlanKey);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="study-plan-board lux-frame p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-gold-light">
              <Compass size={22} />
              <p className="text-sm font-black">برنامه مطالعه</p>
            </div>
            <h2 className="mt-3 text-3xl font-black text-warm">سفر ۷ روزه در جهان اوستا</h2>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">
              این مسیر برای کاربری ساخته شده که نمی‌خواهد در همان ابتدا میان یسنا، گات‌ها، واژه‌نامه و منابع گم شود؛
              قدم‌به‌قدم جلو می‌رود و هر روز یک بخش از جهان AVESTA-ZOROASTER را لمس می‌کند.
            </p>
          </div>
          <button
            type="button"
            onClick={resetPlan}
            className="study-plan-reset-button inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light transition hover:bg-gold/10"
          >
            <RotateCcw size={16} />
            شروع دوباره
          </button>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="study-plan-progress-card rounded-3xl border border-gold/15 bg-night/60 p-5">
            <p className="text-sm font-bold text-gold-light">پیشرفت مسیر</p>
            <p className="mt-3 text-6xl font-black text-warm">{summary.progress}٪</p>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${summary.progress}%` }} />
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">
              {summary.completed} قدم از {summary.total} قدم کامل شده است.
            </p>
            <Link
              href={summary.nextStep.href}
              className="study-plan-next-link mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              قدم بعدی: {summary.nextStep.title}
              <ArrowLeft size={17} />
            </Link>
          </div>

          <div className="grid gap-3">
            {steps.map((step) => {
              const completed = completedIds.includes(step.id);

              return (
                <article
                  key={step.id}
                  className="study-plan-step-card rounded-3xl border border-gold/10 bg-royal/45 p-5 transition hover:border-gold/35"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="rounded-full border border-gold/20 px-3 py-1 text-xs font-black"
                          style={{ color: step.accent }}
                        >
                          {step.day}
                        </span>
                        <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                          {step.theme}
                        </span>
                        <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="mt-3 text-2xl font-black text-warm">{step.title}</h3>
                      <p className="mt-2 text-sm leading-8 text-muted">{step.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleStep(step.id)}
                      className={
                        completed
                          ? "study-plan-step-toggle inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-black text-emerald-100"
                          : "study-plan-step-toggle inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light"
                      }
                    >
                      {completed ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                      {completed ? "کامل شد" : "علامت بزن"}
                    </button>
                  </div>
                  <Link
                    href={step.href}
                    className="study-plan-step-link mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light transition hover:text-gold"
                  >
                    ورود به این قدم
                    <ArrowLeft size={15} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
