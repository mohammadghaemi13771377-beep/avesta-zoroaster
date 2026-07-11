"use client";

import Link from "next/link";
import { ArrowLeft, Bookmark, BookOpen, Compass, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type LastRead = {
  href?: string;
  title?: string;
  progress?: number;
  updatedAt?: string;
};

type BookmarkItem = {
  href?: string;
  title?: string;
};

const lastReadKey = "avesta-reader-last-read-v1";
const bookmarksKey = "avesta-reader-bookmarks-v1";

function isInternalHref(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//");
}

export function ReaderMemoryShelf() {
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    try {
      const storedLastRead = JSON.parse(window.localStorage.getItem(lastReadKey) ?? "null") as LastRead | null;
      if (storedLastRead && isInternalHref(storedLastRead.href)) setLastRead(storedLastRead);

      const storedBookmarks = JSON.parse(window.localStorage.getItem(bookmarksKey) ?? "[]") as BookmarkItem[];
      if (Array.isArray(storedBookmarks)) {
        setBookmarks(storedBookmarks.filter((item) => isInternalHref(item?.href)).slice(0, 3));
      }
    } catch {
      // Reader memory is optional; a malformed local value should not affect the homepage.
    }
  }, []);

  const progress = Math.max(0, Math.min(100, Number(lastRead?.progress ?? 0)));
  const hasMemory = Boolean(lastRead || bookmarks.length);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="reader-memory-title">
      <div className="relative overflow-hidden rounded-[26px] border border-gold/18 bg-night/52 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] bright:bg-white/58 sm:p-7">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold-light/12 blur-3xl" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
          <div className="flex flex-col justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-black/18 px-4 py-2 text-xs font-black text-gold-light bright:bg-white/50 bright:text-amber-800">
                <Compass size={16} />
                مسیر شخصی شما
              </p>
              <h2 id="reader-memory-title" className="mt-4 text-3xl font-black text-warm bright:text-stone-950 sm:text-4xl">
                {hasMemory ? "از همان‌جا ادامه بده" : "مسیر مطالعه‌ات را بساز"}
              </h2>
              <p className="mt-4 max-w-xl text-base font-semibold leading-8 text-muted bright:text-stone-700">
                {hasMemory
                  ? "آخرین صفحه‌ها و بندهای ذخیره‌شده روی همین دستگاه آماده‌اند تا بدون گم شدن مسیر، مطالعه را ادامه بدهی."
                  : "با انتخاب یک مسیر، مطالعه‌ها و بوکمارک‌های آینده‌ات اینجا جمع می‌شوند و صفحه اول برای تو شخصی‌تر می‌شود."}
              </p>
            </div>
            <Link
              href={hasMemory ? "/dashboard" : "/onboarding"}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold/25 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10 bright:text-amber-900"
            >
              {hasMemory ? "نورخانه من" : "انتخاب مسیر"}
              <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {lastRead ? (
              <Link
                href={lastRead.href ?? "/avesta"}
                className="group rounded-[20px] border border-gold/16 bg-gold/10 p-5 transition hover:-translate-y-1 hover:border-gold/45 bright:bg-white/52"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/25 bg-night/45 text-gold-light bright:bg-white/50 bright:text-amber-800">
                    <BookOpen size={20} />
                  </span>
                  <span className="text-xs font-black text-gold-light bright:text-amber-800">{progress}% خوانده شده</span>
                </div>
                <p className="mt-5 text-xs font-bold text-muted bright:text-stone-600">ادامه مطالعه</p>
                <h3 className="mt-2 text-2xl font-black leading-9 text-warm bright:text-stone-950">
                  {lastRead.title || "آخرین صفحه مطالعه‌شده"}
                </h3>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10 bright:bg-stone-900/10">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light bright:text-amber-900">
                  باز کردن مسیر
                  <ArrowLeft size={15} className="transition group-hover:-translate-x-1" />
                </span>
              </Link>
            ) : (
              <Link
                href="/avesta/paths"
                className="group rounded-[20px] border border-gold/16 bg-gold/10 p-5 transition hover:-translate-y-1 hover:border-gold/45 bright:bg-white/52"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/25 bg-night/45 text-gold-light bright:bg-white/50 bright:text-amber-800">
                  <Sparkles size={20} />
                </span>
                <p className="mt-5 text-xs font-bold text-muted bright:text-stone-600">شروع پیشنهادی</p>
                <h3 className="mt-2 text-2xl font-black leading-9 text-warm bright:text-stone-950">مسیرهای شروع اوستا</h3>
                <p className="mt-3 leading-8 text-muted bright:text-stone-700">
                  یک مسیر کوتاه یا عمیق انتخاب کن و مطالعه را از صفحه‌ای مشخص شروع کن.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light bright:text-amber-900">
                  دیدن مسیرها
                  <ArrowLeft size={15} className="transition group-hover:-translate-x-1" />
                </span>
              </Link>
            )}

            <div className="rounded-[20px] border border-gold/14 bg-black/18 p-5 bright:bg-white/44">
              <div className="flex items-center gap-2 text-gold-light bright:text-amber-800">
                <Bookmark size={18} />
                <h3 className="font-black">نشان‌شده‌ها</h3>
              </div>
              {bookmarks.length ? (
                <div className="mt-4 grid gap-2">
                  {bookmarks.map((bookmark) => (
                    <Link
                      key={bookmark.href}
                      href={bookmark.href ?? "/avesta"}
                      className="flex items-center justify-between gap-3 rounded-xl border border-gold/10 bg-royal/35 px-4 py-3 text-sm font-bold text-warm transition hover:border-gold/35 hover:text-gold-light bright:bg-white/46 bright:text-stone-800"
                    >
                      <span className="line-clamp-1">{bookmark.title || "بند ذخیره‌شده"}</span>
                      <ArrowLeft size={15} className="shrink-0 text-gold-light bright:text-amber-800" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-8 text-muted bright:text-stone-700">
                  هنوز بندی ذخیره نکرده‌ای. هنگام خواندن، دکمه «ذخیره بند» را بزن تا اینجا ظاهر شود.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
