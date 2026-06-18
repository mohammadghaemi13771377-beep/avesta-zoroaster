"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/client-events";
import type { AvestaStudyPath } from "@/lib/avesta-study-paths";

type StudyPathProgressPanelProps = {
  path: AvestaStudyPath;
};

const storagePrefix = "avesta-study-path-progress-v1";

function readCompleted(pathId: string) {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(`${storagePrefix}:${pathId}`) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeCompleted(pathId: string, completed: string[]) {
  window.localStorage.setItem(`${storagePrefix}:${pathId}`, JSON.stringify(completed.slice(0, 20)));
}

export function StudyPathProgressPanel({ path }: StudyPathProgressPanelProps) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [status, setStatus] = useState("مسیر آماده شروع است.");

  useEffect(() => {
    const saved = readCompleted(path.id);
    setCompleted(saved);
    setStatus(saved.length ? `${saved.length} قدم از این مسیر انجام شده است.` : "مسیر آماده شروع است.");
  }, [path.id]);

  const progress = useMemo(() => Math.round((completed.length / Math.max(path.steps.length, 1)) * 100), [completed.length, path.steps.length]);
  const nextStep = path.steps.find((step) => !completed.includes(step.href)) ?? path.steps[path.steps.length - 1];

  function toggleStep(stepHref: string) {
    const exists = completed.includes(stepHref);
    const next = exists ? completed.filter((item) => item !== stepHref) : [...completed, stepHref];
    setCompleted(next);
    writeCompleted(path.id, next);
    setStatus(exists ? "این قدم از حالت انجام‌شده خارج شد." : "یک قدم به مسیرت اضافه شد.");
    void trackEvent({
      event: exists ? "avesta_study_path_step_uncompleted" : "avesta_study_path_step_completed",
      route: path.detailHref,
      payload: {
        path_id: path.id,
        step_href: stepHref,
        progress
      }
    });
  }

  function resetPath() {
    window.localStorage.removeItem(`${storagePrefix}:${path.id}`);
    setCompleted([]);
    setStatus("پیشرفت این مسیر بازنشانی شد.");
    void trackEvent({
      event: "avesta_study_path_progress_reset",
      route: path.detailHref,
      payload: {
        path_id: path.id
      }
    });
  }

  return (
    <aside className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-gold-light">نقشه این مسیر</p>
          <h2 className="mt-2 text-2xl font-black text-warm">پیشرفت مطالعه</h2>
        </div>
        <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-black text-gold-light">
          {progress}%
        </span>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
        <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-5 grid gap-4">
        {path.steps.map((step, index) => {
          const done = completed.includes(step.href);

          return (
            <div
              key={step.href}
              className={done ? "rounded-2xl border border-gold/35 bg-gold/12 p-5" : "rounded-2xl border border-gold/12 bg-night/58 p-5"}
            >
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  onClick={() => toggleStep(step.href)}
                  aria-label={done ? `برداشتن تیک ${step.title}` : `تکمیل ${step.title}`}
                  className={
                    done
                      ? "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-black text-night"
                      : "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-night/65 font-black text-gold-light"
                  }
                >
                  {done ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                </button>
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-black text-warm">{step.title}</span>
                  <span className="mt-2 block leading-7 text-muted">{step.note}</span>
                  <Link href={step.href} className="mt-3 inline-flex items-center gap-2 text-sm font-black text-gold-light">
                    ورود به قدم
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-gold/10 bg-royal/35 p-4">
        <div className="flex items-center gap-2 text-gold-light">
          <Sparkles className="h-5 w-5" />
          <p className="font-black text-warm">قدم بعدی پیشنهادی</p>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted">{nextStep?.title ?? path.title}</p>
        <p className="mt-2 text-sm leading-7 text-muted">{status}</p>
      </div>

      <button
        type="button"
        onClick={resetPath}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10"
      >
        <RotateCcw className="h-4 w-4" />
        بازنشانی پیشرفت
      </button>
    </aside>
  );
}
