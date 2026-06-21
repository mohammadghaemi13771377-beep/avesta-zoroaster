"use client";

import Link from "next/link";
import { ArrowLeft, Bookmark, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

type LastRead = { href?: string; title?: string; progress?: number };
type BookmarkItem = { href?: string; title?: string };

const lastReadKey = "avesta-reader-last-read-v1";
const bookmarksKey = "avesta-reader-bookmarks-v1";

function readJson<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "") as T;
  } catch {
    return fallback;
  }
}

export function ProfileReadingSummary({ fallback }: { fallback: { section: string; title: string; excerpt: string; progress: number; href: string } }) {
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    const savedLastRead = readJson<LastRead | null>(lastReadKey, null);
    const savedBookmarks = readJson<BookmarkItem[]>(bookmarksKey, []);
    setLastRead(savedLastRead?.href ? savedLastRead : null);
    setBookmarks(Array.isArray(savedBookmarks) ? savedBookmarks.slice(0, 3) : []);
  }, []);

  const reading = lastRead?.href
    ? { section: "آخرین مطالعهٔ شما", title: lastRead.title || "ادامهٔ مطالعه", excerpt: "از همان جایی که مطالعه را رها کرده‌اید، ادامه دهید.", progress: Math.min(100, Math.max(0, Number(lastRead.progress) || 0)), href: lastRead.href }
    : fallback;

  return (
    <>
      <section className="lux-frame p-7">
        <div className="flex items-center gap-2 text-gold-light"><BookOpen size={20} /><p className="text-sm font-bold">ادامهٔ مطالعه</p></div>
        <p className="mt-4 text-sm font-bold text-gold-light">{reading.section}</p>
        <h2 className="mt-2 text-3xl font-black text-warm">{reading.title}</h2>
        <p className="mt-3 leading-8 text-muted">{reading.excerpt}</p>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-warm/10"><div className="h-full rounded-full bg-gold" style={{ width: `${reading.progress}%` }} /></div>
        <Link href={reading.href} className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-black text-night transition hover:bg-gold-light">ادامهٔ خواندن <ArrowLeft size={18} /></Link>
      </section>
      <section className="lux-frame p-7">
        <div className="flex items-center gap-2 text-gold-light"><Bookmark size={20} /><p className="text-sm font-bold">بوکمارک‌ها</p></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {bookmarks.length ? bookmarks.map((bookmark) => <Link key={bookmark.href} href={bookmark.href || "/avesta"} className="rounded-2xl border border-gold/10 bg-night/55 p-4 transition hover:border-gold/40 hover:bg-gold/10"><p className="text-xs font-bold text-gold-light">ذخیره‌شده</p><h3 className="mt-2 font-black leading-7 text-warm">{bookmark.title || "بند ذخیره‌شده"}</h3></Link>) : <p className="sm:col-span-3 rounded-2xl border border-dashed border-gold/18 px-4 py-6 text-sm leading-7 text-muted">هنوز بندی را ذخیره نکرده‌اید. در صفحهٔ هر بند، دکمهٔ «ذخیره بند» را بزنید تا اینجا ظاهر شود.</p>}
        </div>
      </section>
    </>
  );
}
