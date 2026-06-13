"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, CalendarDays, Check, Flame, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { buildDailyStreakSnapshot, getDateKey, type DailyStreakSnapshot } from "@/lib/daily-streak";

type JournalEntry = {
  date: string;
  completed?: boolean;
};

const reflectionKey = "avesta-daily-reflection-v1";
const questsKey = "avesta-learning-quests-v1";

function readReflectionDates() {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(reflectionKey) ?? "{}") as Record<string, JournalEntry>;
    return Object.values(parsed)
      .filter((entry) => entry?.completed)
      .map((entry) => entry.date)
      .filter(Boolean);
  } catch {
    return [];
  }
}

function readCompletedQuestIds() {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(questsKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function saveTodayComplete() {
  const today = getDateKey();
  let parsed: Record<string, JournalEntry> = {};

  try {
    parsed = JSON.parse(window.localStorage.getItem(reflectionKey) ?? "{}") as Record<string, JournalEntry>;
  } catch {
    parsed = {};
  }

  parsed[today] = {
    ...(parsed[today] ?? {}),
    date: today,
    completed: true,
  };
  window.localStorage.setItem(reflectionKey, JSON.stringify(parsed));
}

export function DailyStreakPanel() {
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);
  const [status, setStatus] = useState("استمرار امروز آماده ثبت است.");

  useEffect(() => {
    setCompletedDates(readReflectionDates());
    setCompletedQuestIds(readCompletedQuestIds());
  }, []);

  const snapshot: DailyStreakSnapshot = useMemo(
    () => buildDailyStreakSnapshot({ completedDates, completedQuestIds }),
    [completedDates, completedQuestIds]
  );

  function completeToday() {
    saveTodayComplete();
    setCompletedDates(readReflectionDates());
    setStatus("امروز به زنجیره روشنایی اضافه شد.");
  }

  function resetStreak() {
    window.localStorage.removeItem(reflectionKey);
    setCompletedDates([]);
    setStatus("نمونه استمرار پاک شد.");
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
      <aside className="space-y-5">
        <div className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Flame size={24} />
            <h2 className="text-2xl font-black text-warm">زنجیره روشنایی</h2>
          </div>
          <p className="mt-4 text-sm leading-8 text-muted">
            این داشبورد عادت روزانه کاربر را از دفتر پندار، گفتار، کردار و مأموریت‌ها می‌خواند و بعداً به پروفایل واقعی وصل می‌شود.
          </p>
          <p className="mt-5 text-sm font-bold text-gold-light">{snapshot.lightLevel}</p>
          <p className="mt-2 text-6xl font-black text-warm">{snapshot.currentStreak}</p>
          <p className="text-sm text-muted">روز استمرار فعلی</p>

          <div className="mt-5 grid gap-3">
            <Metric icon={Trophy} label="بیشترین استمرار" value={`${snapshot.longestStreak} روز`} />
            <Metric icon={CalendarDays} label="هفته اخیر" value={`${snapshot.weeklyCompleted}/7`} />
            <Metric icon={Sparkles} label="نرخ تکمیل" value={`${snapshot.completionRate}%`} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={completeToday}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              <Check size={17} />
              ثبت امروز
            </button>
            <button
              type="button"
              onClick={resetStreak}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              <RotateCcw size={17} />
              بازنشانی
            </button>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">{status}</p>
        </div>

        <div className="lux-frame p-6">
          <p className="text-xs font-bold text-gold-light">پیام امروز</p>
          <h3 className="mt-3 text-2xl font-black leading-10 text-warm">«{snapshot.todayQuote}»</h3>
          <p className="mt-3 text-sm leading-8 text-muted">{snapshot.ethicalMessage}</p>
        </div>
      </aside>

      <div className="space-y-5">
        <div className="lux-frame p-5 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="gold-text text-xs font-semibold tracking-[0.24em]">DAILY RETENTION LOOP</p>
              <h2 className="mt-3 text-4xl font-black text-warm">تقویم نور ۱۴ روزه</h2>
              <p className="mt-3 max-w-2xl leading-8 text-muted">
                هر خانه نماینده یک روز است؛ تکمیل دفتر روزانه یا ثبت یک عمل اخلاقی، زنجیره روشنایی را فعال می‌کند.
              </p>
            </div>
            <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
              امروز: {snapshot.today}
            </span>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-7">
            {snapshot.days.map((day) => (
              <div
                key={day.date}
                className={
                  day.completed
                    ? "rounded-3xl border border-gold/35 bg-gold/20 p-4 shadow-gold"
                    : "rounded-3xl border border-gold/10 bg-night/55 p-4"
                }
              >
                <p className="text-xs font-bold text-muted">{day.label}</p>
                <p className="mt-2 text-sm font-black text-warm">{day.date.slice(5)}</p>
                <div className={day.completed ? "mt-4 h-2 rounded-full bg-gold" : "mt-4 h-2 rounded-full bg-warm/10"} />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {snapshot.nextActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="lux-frame group block p-5 transition hover:-translate-y-1 hover:border-gold/45"
            >
              <p className="text-xs font-bold text-gold-light">قدم بعدی</p>
              <h3 className="mt-3 text-2xl font-black text-warm">{action.title}</h3>
              <p className="mt-3 min-h-20 text-sm leading-7 text-muted">{action.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">
                ورود
                <ArrowLeft size={15} className="transition group-hover:-translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="lux-frame p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Metric icon={Flame} label="XP مأموریت‌ها" value={`${snapshot.questSummary.earnedXp}/${snapshot.questSummary.totalXp}`} />
            <Metric icon={Trophy} label="نشان‌های فعال" value={String(snapshot.questSummary.badges.length)} />
            <Metric icon={ArrowLeft} label="مأموریت بعدی" value={snapshot.questSummary.nextQuest.title} />
          </div>
        </div>
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
