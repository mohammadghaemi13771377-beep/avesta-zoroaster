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
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="lux-frame overflow-hidden rounded-[22px] p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black tracking-[0.18em] text-gold-light"><Compass size={16} />مسیر شخصی شما</p>
            <h2 className="mt-3 text-3xl font-black text-warm">{hasMemory ? "از همان‌جا ادامه بده" : "سفر خودت را آغاز کن"}</h2>
            <p className="mt-3 max-w-2xl leading-8 text-muted">
              {hasMemory ? "آخرین مسیرها و بندهای ذخیره‌شده روی همین دستگاه آماده‌اند." : "با انتخاب یک مسیر، مطالعه‌ها و بوکمارک‌های آینده‌ات اینجا جمع می‌شوند."}
            </p>
          </div>
          <Link href={hasMemory ? "/dashboard" : "/onboarding"} className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10">
            {hasMemory ? "نورخانه من" : "انتخاب مسیر"}
            <ArrowLeft size={16} />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          {lastRead ? (
            <Link href={lastRead.href ?? "/avesta"} className="group rounded-2xl border border-gold/16 bg-gold/10 p-5 transition hover:-translate-y-1 hover:border-gold/45">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/25 bg-night/45 text-gold-light"><BookOpen size={20} /></span>
                <span className="text-xs font-black text-gold-light">{progress}% خوانده شده</span>
              </div>
              <p className="mt-5 text-xs font-bold text-muted">ادامه مطالعه</p>
              <h3 className="mt-2 text-2xl font-black leading-9 text-warm">{lastRead.title || "آخرین صفحه مطالعه‌شده"}</h3>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10"><div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} /></div>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">باز کردن مسیر <ArrowLeft size={15} className="transition group-hover:-translate-x-1" /></span>
            </Link>
          ) : (
            <Link href="/avesta" className="group rounded-2xl border border-gold/16 bg-gold/10 p-5 transition hover:-translate-y-1 hover:border-gold/45">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/25 bg-night/45 text-gold-light"><Sparkles size={20} /></span>
              <p className="mt-5 text-xs font-bold text-muted">شروع پیشنهادی</p>
              <h3 className="mt-2 text-2xl font-black leading-9 text-warm">ورود به پورتال اوستا</h3>
              <p className="mt-3 leading-8 text-muted">یک بخش، یک فصل یا یکی از مسیرهای شروع را انتخاب کن و نخستین صفحه را باز کن.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">شروع سفر <ArrowLeft size={15} className="transition group-hover:-translate-x-1" /></span>
            </Link>
          )}

          <div className="rounded-2xl border border-gold/12 bg-night/45 p-5">
            <div className="flex items-center gap-2 text-gold-light"><Bookmark size={18} /><h3 className="font-black">نشان‌شده‌ها</h3></div>
            {bookmarks.length ? (
              <div className="mt-4 grid gap-2">
                {bookmarks.map((bookmark) => (
                  <Link key={bookmark.href} href={bookmark.href ?? "/avesta"} className="flex items-center justify-between gap-3 rounded-xl border border-gold/10 bg-royal/35 px-4 py-3 text-sm font-bold text-warm transition hover:border-gold/35 hover:text-gold-light">
                    <span className="line-clamp-1">{bookmark.title || "بند ذخیره‌شده"}</span>
                    <ArrowLeft size={15} className="shrink-0 text-gold-light" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-8 text-muted">هنوز بندی ذخیره نکرده‌ای. هنگام خواندن، دکمه «ذخیره بند» را بزن تا اینجا ظاهر شود.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
