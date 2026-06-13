"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Award, Bookmark, Brain, CheckCircle2, Compass, Flame, Gauge, Route, Search, Sparkles, StickyNote } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  activeJourneyStorageKey,
  completeActiveJourneyStep,
  buildJourneyHrefFromInput,
  getActiveJourneyProgress,
  isActiveJourneySnapshot,
  type ActiveJourneySnapshot,
} from "@/lib/active-journey";
import { trackEvent } from "@/lib/client-events";
import {
  buildJourneyHrefFromOnboarding,
  onboardingGoalLabels,
  onboardingTimeLabels,
  onboardingToneLabels,
  type OnboardingGoal,
  type OnboardingTime,
  type OnboardingTone,
} from "@/lib/onboarding";
import { buildPersonalDashboardSnapshot, type PersonalDashboardSnapshot } from "@/lib/personal-dashboard";

type LastRead = {
  href: string;
  title: string;
  progress: number;
};

const keys = {
  bookmarks: "avesta-reader-bookmarks-v1",
  notes: "avesta-reader-notes-v1",
  completed: "avesta-reader-completed-v1",
  savedDaily: "avesta-reader-daily-saved-v1",
  studyPlan: "avesta-study-plan-completed-v1",
  collections: "avesta-reader-collections-v1",
  savedSearches: "avesta-saved-searches-v1",
  quests: "avesta-learning-quests-v1",
  reflections: "avesta-daily-reflection-v1",
  lastRead: "avesta-reader-last-read-v1",
  onboarding: "avesta-onboarding-profile-v1",
  activeJourney: activeJourneyStorageKey,
};

type OnboardingProfile = {
  goal: OnboardingGoal;
  time: OnboardingTime;
  tone: OnboardingTone;
  createdAt?: string;
  summary?: string;
};

function readArray(key: string) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readRecord(key: string) {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function readLastRead(): LastRead | null {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(keys.lastRead) ?? "null");
    return parsed?.href ? parsed : null;
  } catch {
    return null;
  }
}

function readOnboardingProfile(): OnboardingProfile | null {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(keys.onboarding) ?? "null");
    if (isOnboardingProfile(parsed)) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function readActiveJourney(): ActiveJourneySnapshot | null {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(keys.activeJourney) ?? "null");
    return isActiveJourneySnapshot(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function isOnboardingProfile(value: unknown): value is OnboardingProfile {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<OnboardingProfile>;
  return (
    typeof candidate.goal === "string" &&
    candidate.goal in onboardingGoalLabels &&
    typeof candidate.time === "string" &&
    candidate.time in onboardingTimeLabels &&
    typeof candidate.tone === "string" &&
    candidate.tone in onboardingToneLabels
  );
}

function readDashboardSnapshot(): PersonalDashboardSnapshot {
  const notes = readRecord(keys.notes);
  const reflections = readRecord(keys.reflections) as Record<string, { date?: string; completed?: boolean }>;
  const completedReflectionDates = Object.values(reflections)
    .filter((entry) => entry.completed && entry.date)
    .map((entry) => entry.date as string);

  return buildPersonalDashboardSnapshot({
    bookmarks: readArray(keys.bookmarks).length,
    notes: Object.keys(notes).length,
    completedVerses: readArray(keys.completed).length,
    savedDaily: readArray(keys.savedDaily).length,
    studyPlanSteps: readArray(keys.studyPlan).length,
    collections: readArray(keys.collections).length,
    savedSearches: readArray(keys.savedSearches).length,
    reflectionDays: Object.keys(reflections).length,
    completedQuestIds: readArray(keys.quests),
    completedReflectionDates,
    lastRead: readLastRead(),
  });
}

export function PersonalDashboardPanel() {
  const [snapshot, setSnapshot] = useState<PersonalDashboardSnapshot | null>(null);
  const [onboardingProfile, setOnboardingProfile] = useState<OnboardingProfile | null>(null);
  const [activeJourney, setActiveJourney] = useState<ActiveJourneySnapshot | null>(null);

  useEffect(() => {
    setSnapshot(readDashboardSnapshot());
    setOnboardingProfile(readOnboardingProfile());
    setActiveJourney(readActiveJourney());
  }, []);

  const fallback = useMemo(() => buildPersonalDashboardSnapshot(), []);
  const data = snapshot ?? fallback;
  const unlockedCount = data.achievements.filter((achievement) => achievement.unlocked).length;
  const onboardingHref = onboardingProfile ? buildJourneyHrefFromOnboarding(onboardingProfile) : "/onboarding";
  const activeJourneyHref = activeJourney ? buildJourneyHrefFromInput(activeJourney.input) : "/journey-builder";
  const activeJourneyProgress = activeJourney ? getActiveJourneyProgress(activeJourney) : null;
  const activeNextStep = activeJourneyProgress?.nextStep ?? null;

  function completeNextJourneyStep() {
    if (!activeJourney || !activeNextStep) return;
    const next = completeActiveJourneyStep(activeJourney, activeNextStep.id);
    window.localStorage.setItem(keys.activeJourney, JSON.stringify(next));
    setActiveJourney(next);
    void trackEvent({
      event: "active_journey_step_completed",
      payload: {
        step_id: activeNextStep.id,
        href: activeNextStep.href,
        completed_count: next.completedStepIds.length,
        step_count: next.stepCount,
      },
    });
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
      <aside className="space-y-5">
        <div className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Sparkles size={24} />
            <h2 className="text-2xl font-black text-warm">نورخانه شخصی</h2>
          </div>
          <p className="mt-4 text-sm leading-8 text-muted">
            این مرکز، حافظه مطالعه، استمرار، مأموریت‌ها و پیشنهادهای امروز را در یک نگاه جمع می‌کند.
          </p>
          <p className="mt-5 text-sm font-bold text-gold-light">آمادگی مسیر امروز</p>
          <p className="mt-2 text-6xl font-black text-warm">{data.readinessScore}%</p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-warm/10">
            <div className="h-full rounded-full bg-gold" style={{ width: `${data.readinessScore}%` }} />
          </div>
          <div className="mt-5 grid gap-3">
            <Metric icon={Flame} label="استمرار" value={`${data.streak.currentStreak} روز`} />
            <Metric icon={Award} label="نشان‌ها" value={`${unlockedCount}/${data.achievements.length}`} />
            <Metric icon={Gauge} label="سطح مأموریت" value={data.questSummary.level} />
          </div>
        </div>

        <div className="lux-frame p-6">
          <p className="text-xs font-bold text-gold-light">اوستای امروز</p>
          <h3 className="mt-3 text-2xl font-black leading-10 text-warm">«{data.daily.quote}»</h3>
          <p className="mt-3 text-sm leading-8 text-muted">{data.daily.ethicalMessage}</p>
          <Link href={data.daily.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">
            خواندن بند امروز
            <ArrowLeft size={15} />
          </Link>
        </div>
      </aside>

      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric icon={Bookmark} label="بوکمارک" value={String(data.counts.bookmarks)} />
          <Metric icon={StickyNote} label="یادداشت" value={String(data.counts.notes)} />
          <Metric icon={CheckCircle2} label="خوانده‌شده" value={String(data.counts.completedVerses)} />
          <Metric icon={Search} label="جستجوی ذخیره" value={String(data.counts.savedSearches)} />
        </div>

        <div className="lux-frame p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-gold/18 text-gold-light">
                <Compass size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-gold-light">مسیر شروع من</p>
                <h3 className="mt-2 text-2xl font-black text-warm">
                  {onboardingProfile ? onboardingProfile.summary : "هنوز آیین ورود را کامل نکرده‌ای"}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {onboardingProfile
                    ? `هدف: ${onboardingGoalLabels[onboardingProfile.goal]}، ریتم: ${onboardingTimeLabels[onboardingProfile.time]}، حال‌وهوا: ${onboardingToneLabels[onboardingProfile.tone]}`
                    : "با سه انتخاب کوتاه، مسیر شروع شخصی‌ات ساخته می‌شود و نورخانه بعداً آن را به پیشنهادهای روزانه وصل می‌کند."}
                </p>
              </div>
            </div>
            <Link
              href={onboardingHref}
              onClick={() => {
                void trackEvent({
                  event: "dashboard_onboarding_resume_clicked",
                  payload: {
                    state: onboardingProfile ? "saved" : "empty",
                    goal: onboardingProfile?.goal ?? null,
                    href: onboardingHref,
                  },
                });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light transition hover:bg-gold/15"
            >
              {onboardingProfile ? "ادامه مسیر" : "ساخت مسیر شروع"}
              <ArrowLeft size={15} />
            </Link>
          </div>
        </div>

        <div className="lux-frame p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-gold/18 text-gold-light">
                <Route size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-gold-light">مسیر فعال من</p>
                <h3 className="mt-2 text-2xl font-black text-warm">
                  {activeJourney ? activeJourney.title : "هنوز مسیر فعالی ذخیره نشده است"}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {activeNextStep
                    ? `قدم بعدی: ${activeNextStep.title} - ${activeNextStep.task}`
                    : activeJourney
                      ? "تمام قدم‌های این مسیر انجام شده‌اند. می‌توانی مسیر تازه‌ای بسازی یا همین مسیر را بازبینی کنی."
                    : "داخل سازنده مسیر، برنامه دلخواهت را ذخیره کن تا نورخانه آن را به تجربه روزانه وصل کند."}
                </p>
                {activeJourney && activeJourneyProgress ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                      {activeJourney.totalDuration}
                    </span>
                    <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                      {activeJourneyProgress.completedCount}/{activeJourneyProgress.totalCount} قدم
                    </span>
                  </div>
                ) : null}
                {activeJourneyProgress ? (
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-warm/10">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${activeJourneyProgress.percent}%` }} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href={activeNextStep?.href ?? activeJourneyHref}
                onClick={() => {
                  void trackEvent({
                    event: "dashboard_active_journey_clicked",
                    payload: {
                      state: activeJourney ? "saved" : "empty",
                      href: activeNextStep?.href ?? activeJourneyHref,
                      step_count: activeJourney?.stepCount ?? 0,
                    },
                  });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light transition hover:bg-gold/15"
              >
                {activeJourney ? "ادامه قدم بعدی" : "ساخت مسیر فعال"}
                <ArrowLeft size={15} />
              </Link>
              {activeNextStep ? (
                <button
                  type="button"
                  onClick={completeNextJourneyStep}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-black text-night transition hover:bg-gold-light"
                >
                  <CheckCircle2 size={15} />
                  انجام شد
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {data.lastRead ? (
          <Link href={data.lastRead.href} className="lux-frame block p-6 transition hover:-translate-y-1 hover:border-gold/45">
            <p className="text-xs font-bold text-gold-light">ادامه مطالعه</p>
            <h3 className="mt-2 text-3xl font-black text-warm">{data.lastRead.title}</h3>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${data.lastRead.progress}%` }} />
            </div>
            <p className="mt-3 text-sm text-muted">{data.lastRead.progress}% پیشرفت</p>
          </Link>
        ) : null}

        <div className="lux-frame p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="gold-text text-xs font-semibold tracking-[0.24em]">TODAY PATH</p>
              <h2 className="mt-3 text-4xl font-black text-warm">چهار قدم پیشنهادی امروز</h2>
            </div>
            <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
              {data.streak.lightLevel}
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {data.recommendations.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40 hover:bg-gold/10"
              >
                <p className="text-xs font-bold text-gold-light">{intentLabels[item.intent]}</p>
                <h3 className="mt-3 text-2xl font-black text-warm">{item.title}</h3>
                <p className="mt-3 min-h-16 text-sm leading-7 text-muted">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">
                  ورود
                  <ArrowLeft size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="lux-frame p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-gold-light">
              <Award size={20} />
              <h2 className="font-black text-warm">نشان بعدی</h2>
            </div>
            <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
              {data.nextAchievement.progress}%
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-black text-warm">{data.nextAchievement.title}</h3>
          <p className="mt-2 text-sm leading-7 text-muted">{data.nextAchievement.description}</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-night/70">
            <div className="h-full rounded-full bg-gold" style={{ width: `${data.nextAchievement.progress}%` }} />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <QuickLink href="/compass" title="قطب‌نمای خرد" icon={Brain} />
          <QuickLink href="/streak" title="زنجیره روشنایی" icon={Flame} />
          <QuickLink href="/achievements" title="تالار نشان‌ها" icon={Award} />
        </div>
      </div>
    </section>
  );
}

const intentLabels: Record<PersonalDashboardSnapshot["recommendations"][number]["intent"], string> = {
  read: "مطالعه",
  reflect: "تأمل",
  quest: "مأموریت",
  save: "اشتراک",
};

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-night/55 p-4">
      <Icon className="text-gold-light" size={20} />
      <p className="mt-3 text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-warm">{value}</p>
    </div>
  );
}

function QuickLink({ href, title, icon: Icon }: { href: string; title: string; icon: LucideIcon }) {
  return (
    <Link href={href} className="lux-frame flex items-center justify-between gap-4 p-5 transition hover:-translate-y-1 hover:border-gold/45">
      <div className="flex items-center gap-3">
        <Icon className="text-gold-light" size={22} />
        <span className="font-black text-warm">{title}</span>
      </div>
      <ArrowLeft className="text-gold-light" size={15} />
    </Link>
  );
}
