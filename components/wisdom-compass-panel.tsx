"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Brain, Compass, Flame, Gauge, RefreshCw, Search, Sparkles, StickyNote } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { buildWisdomCompassSnapshot, type WisdomCompassSnapshot } from "@/lib/wisdom-compass";

const keys = {
  bookmarks: "avesta-reader-bookmarks-v1",
  notes: "avesta-reader-notes-v1",
  completed: "avesta-reader-completed-v1",
  quests: "avesta-learning-quests-v1",
  reflections: "avesta-daily-reflection-v1",
  savedSearches: "avesta-saved-searches-v1",
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

function readSnapshot() {
  const notes = readRecord(keys.notes);
  const reflections = readRecord(keys.reflections) as Record<string, { date?: string; completed?: boolean }>;
  const completedReflectionDates = Object.values(reflections)
    .filter((entry) => entry.completed && entry.date)
    .map((entry) => entry.date as string);

  return buildWisdomCompassSnapshot({
    bookmarks: readArray(keys.bookmarks).length,
    notes: Object.keys(notes).length,
    completedVerses: readArray(keys.completed).length,
    completedQuestIds: readArray(keys.quests),
    completedReflectionDates,
    savedSearches: readArray(keys.savedSearches).length,
  });
}

const modeLabels: Record<WisdomCompassSnapshot["mode"], string> = {
  activation: "فعال‌سازی",
  retention: "حفظ ریتم",
  deepening: "تعمیق",
  mastery: "راهنمایی",
};

const stateClass: Record<WisdomCompassSnapshot["signals"][number]["state"], string> = {
  strong: "border-gold/40 bg-gold/15",
  growing: "border-sky-300/20 bg-sky-300/10",
  empty: "border-warm/10 bg-night/55",
};

export function WisdomCompassPanel() {
  const fallback = useMemo(() => buildWisdomCompassSnapshot(), []);
  const [snapshot, setSnapshot] = useState<WisdomCompassSnapshot>(fallback);

  useEffect(() => {
    setSnapshot(readSnapshot());
  }, []);

  return (
    <section className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
      <aside className="space-y-5">
        <div className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Compass size={24} />
            <h2 className="text-2xl font-black text-warm">قطب‌نمای خرد</h2>
          </div>
          <p className="mt-4 text-sm leading-8 text-muted">
            پیشنهاد زنده بر اساس مطالعه، تأمل، مأموریت و جستجوی کاربر؛ آماده برای اتصال به event stream و AI/RAG.
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
            تازه‌سازی سیگنال‌ها
          </button>
        </div>

        <div className="lux-frame p-6">
          <p className="text-xs font-bold text-gold-light">نقل‌قول راهنما</p>
          <h3 className="mt-3 text-2xl font-black leading-10 text-warm">«{snapshot.dailyQuote}»</h3>
        </div>
      </aside>

      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {snapshot.signals.map((signal) => (
            <div key={signal.id} className={`rounded-3xl border p-4 ${stateClass[signal.state]}`}>
              <SignalIcon id={signal.id} />
              <p className="mt-3 text-xs font-bold text-muted">{signal.label}</p>
              <p className="mt-1 text-lg font-black text-warm">{signal.value}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-night/70">
                <div className="h-full rounded-full bg-gold" style={{ width: `${signal.weight}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="lux-frame p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="gold-text text-xs font-semibold tracking-[0.24em]">SMART NEXT BEST ACTION</p>
              <h2 className="mt-3 text-4xl font-black text-warm">پیشنهادهای همین لحظه</h2>
            </div>
            <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
              {snapshot.recommendations.length} مسیر
            </span>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {snapshot.recommendations.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:-translate-y-1 hover:border-gold/40 hover:bg-gold/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                    اولویت {item.priority}
                  </span>
                  <ArrowLeft className="text-gold-light" size={16} />
                </div>
                <h3 className="mt-4 text-2xl font-black text-warm">{item.title}</h3>
                <p className="mt-3 min-h-28 text-sm leading-8 text-muted">{item.reason}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">
                  {item.cta}
                  <ArrowLeft size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <p className="lux-frame p-5 text-sm leading-8 text-muted">{snapshot.engineNote}</p>
      </div>
    </section>
  );
}

function SignalIcon({ id }: { id: string }) {
  const icons: Record<string, LucideIcon> = {
    reading: Brain,
    reflection: Flame,
    quest: Sparkles,
    research: Search,
  };
  const Icon = icons[id] ?? StickyNote;
  return <Icon className="text-gold-light" size={20} />;
}
