"use client";

import Link from "next/link";
import { ArrowLeft, Award, CheckCircle2, Circle, Filter, Flame, RotateCcw, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { LearningQuest, QuestDifficulty, QuestTrack } from "@/lib/learning-quests";
import { getQuestSummary, questDifficultyLabels, questTrackLabels } from "@/lib/learning-quests";
import { normalizeSearchText } from "@/lib/search";

type LearningQuestBoardProps = {
  quests: LearningQuest[];
};

const storageKey = "avesta-learning-quests-v1";
const allLabel = "همه";

const difficultyClass: Record<QuestDifficulty, string> = {
  easy: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  medium: "border-gold/25 bg-gold/10 text-gold-light",
  deep: "border-sky-300/20 bg-sky-300/10 text-sky-100",
};

function readCompletedQuests() {
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

export function LearningQuestBoard({ quests }: LearningQuestBoardProps) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState(allLabel);
  const summary = useMemo(() => getQuestSummary(completedIds, quests), [completedIds, quests]);

  useEffect(() => {
    setCompletedIds(readCompletedQuests());
  }, []);

  const filteredQuests = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return quests.filter((quest) => {
      const matchesTrack = track === allLabel || quest.track === track;
      const haystack = normalizeSearchText(
        `${quest.title} ${quest.description} ${quest.badge} ${quest.tasks.join(" ")} ${questTrackLabels[quest.track]}`
      );
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesTrack && matchesQuery;
    });
  }, [query, quests, track]);

  function toggleQuest(id: string) {
    const exists = completedIds.includes(id);
    const nextIds = exists ? completedIds.filter((item) => item !== id) : [id, ...completedIds];
    setCompletedIds(nextIds);
    window.localStorage.setItem(storageKey, JSON.stringify(nextIds));
  }

  function resetQuests() {
    setCompletedIds([]);
    window.localStorage.removeItem(storageKey);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <aside className="space-y-5">
        <div className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Award size={22} />
            <h2 className="text-2xl font-black text-warm">پروفایل مأموریت</h2>
          </div>
          <p className="mt-4 text-sm leading-8 text-muted">پیشرفت این بخش روی همین دستگاه ذخیره می‌شود و برای اتصال به حساب کاربری آماده است.</p>
          <p className="mt-5 text-sm font-bold text-gold-light">{summary.level}</p>
          <p className="mt-2 text-6xl font-black text-warm">{summary.earnedXp}</p>
          <p className="text-sm text-muted">XP از {summary.totalXp}</p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-warm/10">
            <div className="h-full rounded-full bg-gold" style={{ width: `${summary.progress}%` }} />
          </div>
          <Link
            href={summary.nextQuest.href}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
          >
            مأموریت بعدی: {summary.nextQuest.title}
            <ArrowLeft size={16} />
          </Link>
          <button
            type="button"
            onClick={resetQuests}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
          >
            <RotateCcw size={16} />
            شروع دوباره
          </button>
        </div>

        <div className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Sparkles size={18} />
            <h3 className="font-black text-warm">نشان‌های کسب‌شده</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {summary.badges.length ? (
              summary.badges.map((badge) => (
                <span key={badge} className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                  {badge}
                </span>
              ))
            ) : (
              <p className="text-sm leading-7 text-muted">اولین مأموریت را کامل کن تا نشان روشنایی فعال شود.</p>
            )}
          </div>
        </div>
      </aside>

      <div>
        <div className="lux-frame mb-5 p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <label className="relative block">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="جستجو در مأموریت، badge، واژه، متن یا مسیر"
                className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
              />
            </label>
            <label className="relative block">
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
              <select
                value={track}
                onChange={(event) => setTrack(event.target.value)}
                className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none focus:border-gold"
              >
                <option>{allLabel}</option>
                {Object.entries(questTrackLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="grid gap-5">
          {filteredQuests.map((quest) => {
            const completed = completedIds.includes(quest.id);

            return (
              <article key={quest.id} className="lux-frame p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <Badge>{questTrackLabels[quest.track]}</Badge>
                      <span className={`rounded-full border px-3 py-1 text-xs font-black ${difficultyClass[quest.difficulty]}`}>
                        {questDifficultyLabels[quest.difficulty]}
                      </span>
                      <Badge>{quest.duration}</Badge>
                    </div>
                    <h3 className="mt-3 text-2xl font-black text-warm">{quest.title}</h3>
                    <p className="mt-2 text-sm leading-8 text-muted">{quest.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleQuest(quest.id)}
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

                <div className="mt-5 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
                  <div className="rounded-2xl border border-gold/10 bg-gold/10 p-4">
                    <div className="flex items-center gap-2 text-gold-light">
                      <Flame size={17} />
                      <p className="text-sm font-black">{quest.badge}</p>
                    </div>
                    <p className="mt-2 text-3xl font-black text-warm">{quest.xp} XP</p>
                    <Link
                      href={quest.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light"
                    >
                      ورود به مسیر
                      <ArrowLeft size={15} />
                    </Link>
                  </div>
                  <div className="grid gap-2">
                    {quest.tasks.map((task) => (
                      <p key={task} className="rounded-2xl border border-gold/10 bg-night/50 p-3 text-sm leading-7 text-muted">
                        {task}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
      {children}
    </span>
  );
}
