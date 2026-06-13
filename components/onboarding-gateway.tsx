"use client";

import Link from "next/link";
import { ArrowLeft, Check, Clock3, Compass, Flame, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  buildOnboardingRecommendation,
  onboardingGoalLabels,
  onboardingTimeLabels,
  onboardingToneLabels,
  type OnboardingGoal,
  type OnboardingInput,
  type OnboardingTime,
  type OnboardingTone,
} from "@/lib/onboarding";
import { trackEvent } from "@/lib/client-events";

const storageKey = "avesta-onboarding-profile-v1";
const goalOptions = Object.entries(onboardingGoalLabels) as Array<[OnboardingGoal, string]>;
const timeOptions = Object.entries(onboardingTimeLabels) as Array<[OnboardingTime, string]>;
const toneOptions = Object.entries(onboardingToneLabels) as Array<[OnboardingTone, string]>;

export function OnboardingGateway({ initialInput }: { initialInput: OnboardingInput }) {
  const [input, setInput] = useState(initialInput);
  const [saveState, setSaveState] = useState("مسیرت هنوز ذخیره نشده است.");
  const recommendation = useMemo(() => buildOnboardingRecommendation(input), [input]);

  function updateInput(next: Partial<OnboardingInput>) {
    setInput((current) => ({ ...current, ...next }));
  }

  function saveProfile() {
    window.localStorage.setItem(storageKey, JSON.stringify(recommendation.savedProfile));
    setSaveState(`ذخیره شد: ${recommendation.savedProfile.summary}`);
    void trackEvent({
      event: "onboarding_profile_saved",
      payload: {
        goal: input.goal,
        time: input.time,
        tone: input.tone,
      },
    });
  }

  function trackStart(label: string, href: string) {
    void trackEvent({
      event: "onboarding_path_started",
      payload: {
        goal: input.goal,
        time: input.time,
        tone: input.tone,
        label,
        href,
      },
    });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="lux-frame h-fit p-5 lg:sticky lg:top-28">
          <div className="flex items-center gap-3 text-gold-light">
            <Compass size={24} />
            <h2 className="text-xl font-black text-warm">آیین ورود</h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            سه انتخاب کافی است تا مسیر شروع کاربر از میان جهان بزرگ اوستا روشن شود.
          </p>

          <ControlGroup title="برای چه وارد می‌شوی؟">
            {goalOptions.map(([value, label]) => (
              <button key={value} type="button" onClick={() => updateInput({ goal: value })} className={buttonClass(input.goal === value)}>
                {label}
              </button>
            ))}
          </ControlGroup>

          <ControlGroup title="چقدر زمان داری؟">
            {timeOptions.map(([value, label]) => (
              <button key={value} type="button" onClick={() => updateInput({ time: value })} className={buttonClass(input.time === value)}>
                <Clock3 size={15} />
                {label}
              </button>
            ))}
          </ControlGroup>

          <ControlGroup title="چه حال‌وهوایی می‌خواهی؟">
            {toneOptions.map(([value, label]) => (
              <button key={value} type="button" onClick={() => updateInput({ tone: value })} className={buttonClass(input.tone === value)}>
                <Sparkles size={15} />
                {label}
              </button>
            ))}
          </ControlGroup>

          <button
            type="button"
            onClick={saveProfile}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
          >
            <Check size={17} />
            ذخیره مسیر شروع
          </button>
          <p className="mt-3 text-xs leading-6 text-muted">{saveState}</p>
        </aside>

        <section className="lux-frame overflow-hidden p-5 sm:p-7">
          <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
                <Flame size={16} />
                مسیر شروع پیشنهادی
              </div>
              <h2 className="gold-text mt-5 text-4xl font-black leading-tight">{recommendation.title}</h2>
              <p className="mt-5 text-base leading-9 text-warm/78">{recommendation.subtitle}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={recommendation.startHref}
                  onClick={() => trackStart(recommendation.startLabel, recommendation.startHref)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
                >
                  {recommendation.startLabel}
                  <ArrowLeft size={17} />
                </Link>
                <Link
                  href={recommendation.secondaryHref}
                  onClick={() => trackStart(recommendation.secondaryLabel, recommendation.secondaryHref)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10"
                >
                  {recommendation.secondaryLabel}
                </Link>
              </div>
            </div>

            <div className="image-scene scene-cosmic min-h-[340px] rounded-[18px] border border-gold/16">
              <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-gold/16 bg-black/42 p-5 backdrop-blur">
                <p className="text-sm font-black text-gold-light">پروفایل شروع</p>
                <p className="mt-3 text-lg font-black leading-8 text-warm">{recommendation.savedProfile.summary}</p>
                <p className="mt-2 text-xs leading-6 text-muted">این داده فعلاً در مرورگر ذخیره می‌شود و بعداً به پروفایل واقعی وصل می‌شود.</p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {recommendation.pillars.map((pillar) => (
              <Link key={pillar.title} href={pillar.href} className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/35 hover:bg-gold/10">
                <p className="text-xs font-black text-gold-light">{pillar.href}</p>
                <h3 className="mt-3 text-xl font-black text-warm">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{pillar.text}</p>
              </Link>
            ))}
          </div>

          <div className="mt-7 rounded-3xl border border-gold/10 bg-royal/35 p-5">
            <div className="flex items-center gap-2 text-gold-light">
              <Sparkles size={18} />
              <h3 className="font-black text-warm">برنامه شروع چندروزه</h3>
            </div>
            <div className="mt-4 grid gap-3">
              {recommendation.nextSevenDays.map((step) => (
                <Link
                  key={`${step.day}-${step.href}`}
                  href={step.href}
                  className="group rounded-2xl border border-gold/10 bg-night/55 p-4 transition hover:border-gold/35"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-black text-gold-light">{step.day}</p>
                      <h4 className="mt-1 text-lg font-black text-warm">{step.title}</h4>
                      <p className="mt-2 text-sm leading-7 text-muted">{step.task}</p>
                    </div>
                    <ArrowLeft className="text-gold-light transition group-hover:-translate-x-1" size={18} />
                  </div>
                </Link>
              ))}
            </div>
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

function buttonClass(active: boolean) {
  return active
    ? "inline-flex items-center gap-2 rounded-2xl border border-gold/50 bg-gold/15 px-4 py-3 text-right text-sm font-black text-warm"
    : "inline-flex items-center gap-2 rounded-2xl border border-gold/10 bg-night/55 px-4 py-3 text-right text-sm font-bold text-muted transition hover:border-gold/35 hover:text-warm";
}
