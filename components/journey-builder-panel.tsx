"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Compass, Flame, Route, Save, Sparkles } from "lucide-react";
import { activeJourneyStorageKey, buildActiveJourneySnapshot } from "@/lib/active-journey";
import { trackEvent } from "@/lib/client-events";
import {
  buildJourneyPlan,
  journeyLevelLabels,
  journeyModeLabels,
  journeyPaceLabels,
  type JourneyBuilderInput,
  type JourneyLevel,
  type JourneyMode,
  type JourneyPace,
} from "@/lib/journey-builder";
import { wisdomGuidePrompts } from "@/lib/wisdom-guide";

const paceOptions = Object.entries(journeyPaceLabels) as Array<[JourneyPace, string]>;
const levelOptions = Object.entries(journeyLevelLabels) as Array<[JourneyLevel, string]>;
const modeOptions = Object.entries(journeyModeLabels) as Array<[JourneyMode, string]>;

export function JourneyBuilderPanel({ initialInput }: { initialInput: JourneyBuilderInput }) {
  const [input, setInput] = useState<JourneyBuilderInput>(initialInput);
  const [saveState, setSaveState] = useState("این مسیر هنوز به نورخانه وصل نشده است.");
  const plan = useMemo(() => buildJourneyPlan(input), [input]);

  function updateInput(next: Partial<JourneyBuilderInput>) {
    setInput((current) => ({ ...current, ...next }));
  }

  function saveActiveJourney() {
    const snapshot = buildActiveJourneySnapshot(input, plan);
    window.localStorage.setItem(activeJourneyStorageKey, JSON.stringify(snapshot));
    setSaveState(`ذخیره شد: ${snapshot.title}`);
    void trackEvent({
      event: "journey_plan_saved",
      payload: {
        intent: input.intent,
        pace: input.pace,
        level: input.level,
        mode: input.mode,
        step_count: plan.steps.length,
      },
    });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="lux-frame h-fit p-5 lg:sticky lg:top-28">
          <div className="flex items-center gap-3 text-gold-light">
            <Route size={24} />
            <h2 className="text-xl font-black text-warm">سازنده مسیر</h2>
          </div>

          <ControlGroup title="نیت امروز">
            {wisdomGuidePrompts.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => updateInput({ intent: prompt.id })}
                className={buttonClass(input.intent === prompt.id)}
              >
                <span>{prompt.label}</span>
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: prompt.accent }} />
              </button>
            ))}
          </ControlGroup>

          <ControlGroup title="ریتم">
            {paceOptions.map(([value, label]) => (
              <button key={value} type="button" onClick={() => updateInput({ pace: value })} className={buttonClass(input.pace === value)}>
                {label}
              </button>
            ))}
          </ControlGroup>

          <ControlGroup title="سطح">
            {levelOptions.map(([value, label]) => (
              <button key={value} type="button" onClick={() => updateInput({ level: value })} className={buttonClass(input.level === value)}>
                {label}
              </button>
            ))}
          </ControlGroup>

          <ControlGroup title="سبک تجربه">
            {modeOptions.map(([value, label]) => (
              <button key={value} type="button" onClick={() => updateInput({ mode: value })} className={buttonClass(input.mode === value)}>
                {label}
              </button>
            ))}
          </ControlGroup>
        </aside>

        <section className="lux-frame overflow-hidden p-5 sm:p-7">
          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
                <Sparkles size={16} />
                مسیر ساخته‌شده برای امروز
              </div>
              <h2 className="gold-text mt-5 text-4xl font-black leading-tight">{plan.title}</h2>
              <p className="mt-5 text-base leading-9 text-warm/78">{plan.subtitle}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <MiniStat label="زمان" value={plan.totalDuration} />
                <MiniStat label="حالت" value={journeyModeLabels[plan.mode]} />
                <MiniStat label="واژه‌ها" value={plan.focusWords.join("، ") || "اوستا"} />
              </div>
              <Link
                href={plan.heroAction.href}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
              >
                {plan.heroAction.label}
                <ArrowLeft size={17} />
              </Link>
              <button
                type="button"
                onClick={saveActiveJourney}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/22 bg-gold/10 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/15 sm:mr-3"
              >
                <Save size={17} />
                ذخیره در نورخانه
              </button>
              <p className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-muted">
                <Check size={14} className="text-gold-light" />
                {saveState}
              </p>
            </div>

            <div className="image-scene scene-sunrise min-h-[360px] rounded-[18px] border border-gold/16">
              <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-gold/16 bg-black/42 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-gold-light">
                  <Flame size={18} />
                  <p className="text-sm font-black">پیام مسیر</p>
                </div>
                <p className="mt-3 text-sm leading-8 text-warm/82">{plan.ethicalMessage}</p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-4">
            {plan.steps.map((step) => (
              <article key={`${step.id}-${step.href}`} className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/35">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-gold/20 px-3 py-1 text-xs font-black text-gold-light">{step.day}</span>
                      <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">{step.theme}</span>
                      <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">{step.duration}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-black text-warm">{step.title}</h3>
                    <p className="mt-2 text-sm leading-8 text-muted">{step.description}</p>
                    <p className="mt-3 rounded-2xl border border-gold/10 bg-black/25 px-4 py-3 text-sm font-bold leading-7 text-warm">{step.task}</p>
                  </div>
                  <Link href={step.href} className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-xs font-black text-gold-light transition hover:bg-gold/10">
                    ورود
                    <ArrowLeft size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-7 rounded-3xl border border-gold/10 bg-royal/35 p-5">
            <div className="flex items-center gap-2 text-gold-light">
              <Compass size={18} />
              <h3 className="font-black text-warm">قفل‌های بعدی</h3>
            </div>
            <div className="mt-4 grid gap-2 md:grid-cols-3">
              {plan.nextUnlocks.map((unlock) => (
                <p key={unlock} className="rounded-2xl border border-gold/10 bg-night/55 p-4 text-sm font-bold leading-7 text-muted">
                  {unlock}
                </p>
              ))}
            </div>
            <p className="mt-4 text-xs leading-7 text-muted">{plan.sourceNote}</p>
          </div>
        </section>
      </div>
    </section>
  );
}

function ControlGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <p className="text-xs font-black text-gold-light">{title}</p>
      <div className="mt-3 grid gap-2">{children}</div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-2 text-sm font-black leading-7 text-gold-light">{value}</p>
    </div>
  );
}

function buttonClass(active: boolean) {
  return active
    ? "flex items-center justify-between gap-3 rounded-2xl border border-gold/50 bg-gold/15 px-4 py-3 text-right text-sm font-black text-warm"
    : "flex items-center justify-between gap-3 rounded-2xl border border-gold/10 bg-night/55 px-4 py-3 text-right text-sm font-bold text-muted transition hover:border-gold/35 hover:text-warm";
}
