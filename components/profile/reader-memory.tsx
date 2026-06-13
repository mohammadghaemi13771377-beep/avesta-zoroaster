"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Award, Bookmark, CheckCircle2, Clock3, Flame, Layers3, Lock, Moon, RefreshCw, Search, Settings2, Sparkles, StickyNote } from "lucide-react";
import { useEffect, useState } from "react";
import { buildAchievements, type Achievement } from "@/lib/achievements";
import { getQuestSummary, learningQuests } from "@/lib/learning-quests";

type SavedBookmark = {
  href: string;
  title: string;
  savedAt: string;
};

type SavedSettings = {
  mode?: string;
  size?: number;
  lineHeight?: number;
};

type LastRead = {
  href: string;
  title: string;
  progress: number;
  updatedAt: string;
};

const settingsKey = "avesta-reader-settings-v1";
const bookmarksKey = "avesta-reader-bookmarks-v1";
const lastReadKey = "avesta-reader-last-read-v1";
const notesKey = "avesta-reader-notes-v1";
const completedKey = "avesta-reader-completed-v1";
const savedDailyKey = "avesta-reader-daily-saved-v1";
const studyPlanKey = "avesta-study-plan-completed-v1";
const savedCollectionsKey = "avesta-reader-collections-v1";
const savedSearchKey = "avesta-saved-searches-v1";
const learningQuestsKey = "avesta-learning-quests-v1";
const dailyReflectionKey = "avesta-daily-reflection-v1";

export function ReaderMemory() {
  const [settings, setSettings] = useState<SavedSettings>({});
  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>([]);
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const [notes, setNotes] = useState<Array<[string, string]>>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [savedDailyCount, setSavedDailyCount] = useState(0);
  const [studyPlanCount, setStudyPlanCount] = useState(0);
  const [collectionsCount, setCollectionsCount] = useState(0);
  const [savedSearchCount, setSavedSearchCount] = useState(0);
  const [questCount, setQuestCount] = useState(0);
  const [questXp, setQuestXp] = useState(0);
  const [questLevel, setQuestLevel] = useState("جوینده روشنایی");
  const [reflectionCount, setReflectionCount] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  function loadMemory() {
    try {
      const savedSettings = JSON.parse(window.localStorage.getItem(settingsKey) ?? "{}");
      const savedBookmarks = JSON.parse(window.localStorage.getItem(bookmarksKey) ?? "[]");
      const savedLastRead = JSON.parse(window.localStorage.getItem(lastReadKey) ?? "null");
      const savedNotes = JSON.parse(window.localStorage.getItem(notesKey) ?? "{}");
      const savedCompleted = JSON.parse(window.localStorage.getItem(completedKey) ?? "[]");
      const savedDaily = JSON.parse(window.localStorage.getItem(savedDailyKey) ?? "[]");
      const savedStudyPlan = JSON.parse(window.localStorage.getItem(studyPlanKey) ?? "[]");
      const savedCollections = JSON.parse(window.localStorage.getItem(savedCollectionsKey) ?? "[]");
      const savedSearches = JSON.parse(window.localStorage.getItem(savedSearchKey) ?? "[]");
      const savedQuests = JSON.parse(window.localStorage.getItem(learningQuestsKey) ?? "[]");
      const savedReflections = JSON.parse(window.localStorage.getItem(dailyReflectionKey) ?? "{}");
      const questSummary = getQuestSummary(Array.isArray(savedQuests) ? savedQuests : [], learningQuests);
      setSettings(savedSettings);
      setBookmarks(Array.isArray(savedBookmarks) ? savedBookmarks : []);
      setLastRead(savedLastRead?.href ? savedLastRead : null);
      setNotes(
        savedNotes && typeof savedNotes === "object" && !Array.isArray(savedNotes)
          ? Object.entries(savedNotes)
              .filter((entry): entry is [string, string] => typeof entry[0] === "string" && typeof entry[1] === "string")
              .slice(0, 20)
          : []
      );
      setCompletedCount(Array.isArray(savedCompleted) ? savedCompleted.length : 0);
      setSavedDailyCount(Array.isArray(savedDaily) ? savedDaily.length : 0);
      setStudyPlanCount(Array.isArray(savedStudyPlan) ? savedStudyPlan.length : 0);
      setCollectionsCount(Array.isArray(savedCollections) ? savedCollections.length : 0);
      setSavedSearchCount(Array.isArray(savedSearches) ? savedSearches.length : 0);
      setQuestCount(Array.isArray(savedQuests) ? savedQuests.length : 0);
      setQuestXp(questSummary.earnedXp);
      setQuestLevel(questSummary.level);
      setReflectionCount(
        savedReflections && typeof savedReflections === "object" && !Array.isArray(savedReflections)
          ? Object.keys(savedReflections).length
          : 0
      );
      setAchievements(
        buildAchievements({
          bookmarks: Array.isArray(savedBookmarks) ? savedBookmarks.length : 0,
          notes:
            savedNotes && typeof savedNotes === "object" && !Array.isArray(savedNotes)
              ? Object.keys(savedNotes).length
              : 0,
          completedVerses: Array.isArray(savedCompleted) ? savedCompleted.length : 0,
          savedDaily: Array.isArray(savedDaily) ? savedDaily.length : 0,
          studyPlanSteps: Array.isArray(savedStudyPlan) ? savedStudyPlan.length : 0,
          collections: Array.isArray(savedCollections) ? savedCollections.length : 0
        })
      );
    } catch {
      setSettings({});
      setBookmarks([]);
      setLastRead(null);
      setNotes([]);
      setCompletedCount(0);
      setSavedDailyCount(0);
      setStudyPlanCount(0);
      setCollectionsCount(0);
      setSavedSearchCount(0);
      setQuestCount(0);
      setQuestXp(0);
      setQuestLevel("جوینده روشنایی");
      setReflectionCount(0);
      setAchievements(buildAchievements({ bookmarks: 0, notes: 0, completedVerses: 0, savedDaily: 0, studyPlanSteps: 0, collections: 0 }));
    }
  }

  useEffect(() => {
    loadMemory();
  }, []);

  const modeLabel =
    settings.mode === "sepia" ? "سپیا" : settings.mode === "light" ? "روشن" : settings.mode === "dark" ? "شب" : "پیش‌فرض";

  return (
    <section className="lux-frame p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-gold-light">
          <Sparkles size={20} />
          <div>
            <p className="text-sm font-bold">حافظه مطالعه همین دستگاه</p>
            <p className="mt-1 text-xs text-muted">بعداً به حساب کاربری و دیتابیس متصل می‌شود.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={loadMemory}
          className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light transition hover:border-gold/40"
        >
          <RefreshCw size={13} />
          تازه‌سازی
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MemoryMetric icon={Moon} label="حالت" value={modeLabel} />
        <MemoryMetric icon={Settings2} label="فونت" value={`${settings.size ?? 18}px`} />
        <MemoryMetric icon={Bookmark} label="بوکمارک" value={`${bookmarks.length}`} />
        <MemoryMetric icon={StickyNote} label="یادداشت" value={`${notes.length}`} />
        <MemoryMetric icon={CheckCircle2} label="خوانده‌شده" value={`${completedCount}`} />
        <MemoryMetric icon={Flame} label="اوستای امروز" value={`${savedDailyCount}`} />
        <MemoryMetric icon={Sparkles} label="برنامه مطالعه" value={`${studyPlanCount}/7`} />
        <MemoryMetric icon={Award} label="مأموریت" value={`${questCount}`} />
        <MemoryMetric icon={Flame} label="XP" value={`${questXp}`} />
        <MemoryMetric icon={StickyNote} label="دفتر روزانه" value={`${reflectionCount}`} />
        <MemoryMetric icon={Layers3} label="کلکسیون" value={`${collectionsCount}`} />
        <MemoryMetric icon={Search} label="جستجو" value={`${savedSearchCount}`} />
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        <Link
          href="/study-plan"
          className="block rounded-2xl border border-gold/20 bg-gold/10 p-5 transition hover:border-gold/50"
        >
          <p className="text-sm font-black text-gold-light">مسیر آموزشی فعال</p>
          <h3 className="mt-2 text-xl font-black text-warm">ادامه برنامه ۷ روزه اوستا</h3>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-night/60">
            <div className="h-full rounded-full bg-gold" style={{ width: `${Math.round((studyPlanCount / 7) * 100)}%` }} />
          </div>
        </Link>
        <Link
          href="/quests"
          className="block rounded-2xl border border-gold/20 bg-night/55 p-5 transition hover:border-gold/50 hover:bg-gold/10"
        >
          <p className="text-sm font-black text-gold-light">مأموریت‌های خرد</p>
          <h3 className="mt-2 text-xl font-black text-warm">{questLevel}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{questXp} XP و {questCount} مأموریت کامل‌شده</p>
        </Link>
        <Link
          href="/collections"
          className="block rounded-2xl border border-gold/20 bg-night/55 p-5 transition hover:border-gold/50 hover:bg-gold/10"
        >
          <p className="text-sm font-black text-gold-light">کلکسیون‌های ذخیره‌شده</p>
          <h3 className="mt-2 text-xl font-black text-warm">ادامه مسیرهای موضوعی</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{collectionsCount} مجموعه در حافظه همین دستگاه</p>
        </Link>
        <Link
          href="/reflection"
          className="block rounded-2xl border border-gold/20 bg-night/55 p-5 transition hover:border-gold/50 hover:bg-gold/10"
        >
          <p className="text-sm font-black text-gold-light">دفتر پندار، گفتار، کردار</p>
          <h3 className="mt-2 text-xl font-black text-warm">ثبت روزانه روشنایی</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{reflectionCount} روز در حافظه همین دستگاه</p>
        </Link>
        <Link
          href="/search"
          className="block rounded-2xl border border-gold/20 bg-night/55 p-5 transition hover:border-gold/50 hover:bg-gold/10"
        >
          <p className="text-sm font-black text-gold-light">حافظه جستجو</p>
          <h3 className="mt-2 text-xl font-black text-warm">بازگشت به جستجوی پیشرفته</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{savedSearchCount} عبارت پژوهشی ذخیره‌شده</p>
        </Link>
      </div>

      <div className="mt-5 rounded-2xl border border-gold/10 bg-night/55 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gold-light">
            <Award size={18} />
            <p className="text-sm font-black">نشان‌های مطالعه</p>
          </div>
          <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
            {achievements.filter((achievement) => achievement.unlocked).length}/{achievements.length}
          </span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={
                achievement.unlocked
                  ? "rounded-2xl border border-gold/20 bg-gold/10 p-4"
                  : "rounded-2xl border border-warm/10 bg-royal/35 p-4"
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold" style={{ color: achievement.accent }}>
                    {achievement.requirement}
                  </p>
                  <h3 className="mt-2 font-black text-warm">{achievement.title}</h3>
                </div>
                {achievement.unlocked ? (
                  <Award className="shrink-0 text-gold-light" size={20} />
                ) : (
                  <Lock className="shrink-0 text-muted" size={18} />
                )}
              </div>
              <p className="mt-2 text-xs leading-6 text-muted">{achievement.description}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-night/70">
                <div className="h-full rounded-full bg-gold" style={{ width: `${achievement.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {lastRead ? (
        <Link
          href={lastRead.href}
          className="mt-5 block rounded-2xl border border-gold/20 bg-gold/10 p-5 transition hover:border-gold/50"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-gold-light">
              <Clock3 size={18} />
              <p className="text-sm font-black">آخرین مطالعه</p>
            </div>
            <span className="rounded-full border border-gold/20 px-3 py-1 text-xs font-bold text-gold-light">
              {lastRead.progress}٪
            </span>
          </div>
          <h3 className="mt-3 text-xl font-black leading-8 text-warm">{lastRead.title || lastRead.href}</h3>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-night/60">
            <div className="h-full rounded-full bg-gold" style={{ width: `${lastRead.progress}%` }} />
          </div>
        </Link>
      ) : null}

      <div className="mt-5 grid gap-3">
        {notes.length ? (
          <div className="rounded-2xl border border-gold/10 bg-night/55 p-5">
            <div className="flex items-center gap-2 text-gold-light">
              <StickyNote size={17} />
              <p className="text-sm font-black">آخرین یادداشت‌های شخصی</p>
            </div>
            <div className="mt-4 grid gap-3">
              {notes.slice(0, 3).map(([href, body]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-2xl border border-gold/10 bg-royal/45 p-4 transition hover:border-gold/40"
                >
                  <p className="line-clamp-2 text-sm leading-7 text-warm">{body}</p>
                  <p className="mt-2 text-xs text-muted" dir="ltr">
                    {href}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {bookmarks.length ? (
          bookmarks.slice(0, 4).map((bookmark) => (
            <Link
              key={bookmark.href}
              href={bookmark.href}
              className="rounded-2xl border border-gold/10 bg-night/55 p-4 transition hover:border-gold/40 hover:bg-gold/10"
            >
              <p className="text-xs font-bold text-gold-light">ذخیره‌شده</p>
              <h3 className="mt-2 font-black leading-7 text-warm">{bookmark.title || bookmark.href}</h3>
              <p className="mt-1 text-xs text-muted" dir="ltr">
                {bookmark.href}
              </p>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl border border-gold/10 bg-night/55 p-5">
            <p className="font-bold text-warm">هنوز بوکمارک محلی ثبت نشده است.</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              از صفحه بندهای اوستا یا مقاله‌ها دکمه بوکمارک را بزنید تا اینجا نمایش داده شود.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function MemoryMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-night/55 p-4">
      <Icon className="text-gold-light" size={20} />
      <p className="mt-3 text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-warm">{value}</p>
    </div>
  );
}
