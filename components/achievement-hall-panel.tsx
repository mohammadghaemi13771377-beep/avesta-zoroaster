"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Award, BookMarked, CheckCircle2, Flame, RotateCcw, Sparkles } from "lucide-react";
import type { AchievementInput } from "@/lib/achievements";
import { defaultAchievementInput, getAchievementHallSnapshot } from "@/lib/achievement-hall";

const storageKey = "avesta-achievement-hall-v1";

function readInput(): AchievementInput {
  if (typeof window === "undefined") {
    return defaultAchievementInput;
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "null");
    return parsed && typeof parsed === "object" ? { ...defaultAchievementInput, ...parsed } : defaultAchievementInput;
  } catch {
    return defaultAchievementInput;
  }
}

export function AchievementHallPanel() {
  const [input, setInput] = useState<AchievementInput>(defaultAchievementInput);
  const snapshot = useMemo(() => getAchievementHallSnapshot(input), [input]);

  useEffect(() => {
    setInput(readInput());
  }, []);

  function updateInput(key: keyof AchievementInput, delta: number) {
    setInput((current) => {
      const next = { ...current, [key]: Math.max(0, current[key] + delta) };
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  function resetHall() {
    setInput(defaultAchievementInput);
    window.localStorage.removeItem(storageKey);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="space-y-5">
          <div className="lux-frame p-6">
            <div className="flex items-center gap-2 text-gold-light">
              <Award size={23} />
              <h2 className="text-2xl font-black text-warm">تالار نشان‌ها</h2>
            </div>
            <p className="mt-4 text-sm leading-8 text-muted">
              پیشرفت فعلاً روی همین دستگاه ذخیره می‌شود و برای اتصال به حساب کاربری آماده است.
            </p>
            <p className="mt-5 text-sm font-bold text-gold-light">{snapshot.level}</p>
            <p className="mt-2 text-6xl font-black text-warm">{snapshot.completion}٪</p>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${snapshot.completion}%` }} />
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">
              {snapshot.unlocked} نشان از {snapshot.total} نشان فعال شده است.
            </p>
            <Link
              href="/quests"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              ادامه مأموریت‌ها
              <ArrowLeft size={16} />
            </Link>
            <button
              type="button"
              onClick={resetHall}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              <RotateCcw size={16} />
              بازنشانی نمونه
            </button>
          </div>

          <div className="lux-frame p-6">
            <div className="flex items-center gap-2 text-gold-light">
              <Sparkles size={18} />
              <h3 className="font-black text-warm">افزایش نمونه پیشرفت</h3>
            </div>
            <div className="mt-4 grid gap-2">
              <ProgressButton label="مطالعه کامل" onClick={() => updateInput("completedVerses", 1)} />
              <ProgressButton label="یادداشت" onClick={() => updateInput("notes", 1)} />
              <ProgressButton label="بوکمارک" onClick={() => updateInput("bookmarks", 1)} />
              <ProgressButton label="اوستای امروز" onClick={() => updateInput("savedDaily", 1)} />
              <ProgressButton label="قدم برنامه مطالعه" onClick={() => updateInput("studyPlanSteps", 1)} />
              <ProgressButton label="کلکسیون" onClick={() => updateInput("collections", 1)} />
            </div>
          </div>
        </aside>

        <section className="lux-frame p-5 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-3">
            <MiniMetric icon={Flame} label="نشان بعدی" value={snapshot.nextAchievement.title} />
            <MiniMetric icon={CheckCircle2} label="نیاز" value={snapshot.nextAchievement.requirement} />
            <MiniMetric icon={BookMarked} label="Badge" value={snapshot.featuredBadges.join("، ") || "شروع کن"} />
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {snapshot.achievements.map((achievement) => (
              <article
                key={achievement.id}
                className={`rounded-3xl border p-5 ${
                  achievement.unlocked
                    ? "border-gold/30 bg-gold/10 shadow-gold"
                    : "border-gold/10 bg-night/55"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-black/25"
                      style={{ color: achievement.accent }}
                    >
                      <Award size={21} />
                    </span>
                    <h3 className="mt-4 text-2xl font-black text-warm">{achievement.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">{achievement.description}</p>
                  </div>
                  {achievement.unlocked ? (
                    <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-100">
                      آزاد شد
                    </span>
                  ) : (
                    <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                      در مسیر
                    </span>
                  )}
                </div>
                <p className="mt-4 text-xs font-bold text-gold-light">{achievement.requirement}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-warm/10">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${achievement.progress}%` }} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function ProgressButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-gold/10 bg-night/55 px-4 py-3 text-right text-sm font-bold text-muted transition hover:border-gold/35 hover:text-warm"
    >
      + {label}
    </button>
  );
}

function MiniMetric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
      <div className="flex items-center gap-2 text-gold-light">
        <Icon size={16} />
        <p className="text-xs font-black">{label}</p>
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-black leading-7 text-warm">{value}</p>
    </div>
  );
}
