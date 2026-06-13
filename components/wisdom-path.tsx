"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, Compass, Sparkles, Tags } from "lucide-react";
import { useEffect, useState } from "react";

type WisdomTerm = {
  term: string;
  slug: string;
  meaning: string;
};

type WisdomPathProps = {
  sectionTitle: string;
  chapterTitle: string;
  verseNumber: string;
  terms: WisdomTerm[];
  nextHref?: string;
  nextTitle?: string;
};

const completedKey = "avesta-reader-completed-v1";

function readCompleted(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(completedKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function WisdomPath({ sectionTitle, chapterTitle, verseNumber, terms, nextHref, nextTitle }: WisdomPathProps) {
  const [completed, setCompleted] = useState(false);
  const [status, setStatus] = useState("مسیر مطالعه این بند");

  useEffect(() => {
    const href = window.location.pathname;
    setCompleted(readCompleted().includes(href));
  }, []);

  function toggleCompleted() {
    const href = window.location.pathname;
    const completedItems = readCompleted();
    const exists = completedItems.includes(href);
    const nextItems = exists ? completedItems.filter((item) => item !== href) : [href, ...completedItems];

    window.localStorage.setItem(completedKey, JSON.stringify(nextItems.slice(0, 400)));
    setCompleted(!exists);
    setStatus(exists ? "از فهرست تکمیل‌شده‌ها حذف شد." : "این بند به‌عنوان خوانده‌شده ثبت شد.");
  }

  return (
    <section className="lux-frame p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-gold-light">
            <Compass size={22} />
            <p className="text-sm font-black">مسیر خرد</p>
          </div>
          <h2 className="mt-3 text-3xl font-black text-warm">بعد از خواندن این بند</h2>
          <p className="mt-3 text-sm leading-8 text-muted">
            {sectionTitle}، {chapterTitle}، {verseNumber}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleCompleted}
          className={
            completed
              ? "inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-5 py-3 text-sm font-black text-emerald-100 transition hover:bg-emerald-300/15"
              : "inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/15"
          }
        >
          {completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
          {completed ? "خوانده شد" : "ثبت به‌عنوان خوانده‌شده"}
        </button>
      </div>

      <p className="mt-4 text-xs font-bold text-muted">{status}</p>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_0.72fr]">
        <div className="rounded-3xl border border-gold/10 bg-night/55 p-5">
          <div className="flex items-center gap-2 text-gold-light">
            <Tags size={18} />
            <h3 className="font-black">واژه‌های مرتبط با این بند</h3>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {terms.length ? (
              terms.map((term) => (
                <Link
                  key={term.slug}
                  href={`/dictionary/${term.slug}`}
                  className="rounded-2xl border border-gold/10 bg-royal/50 p-4 transition hover:border-gold/40 hover:bg-gold/10"
                >
                  <p className="text-lg font-black text-warm">{term.term}</p>
                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted">{term.meaning}</p>
                </Link>
              ))
            ) : (
              <p className="rounded-2xl border border-gold/10 bg-royal/50 p-4 text-sm leading-7 text-muted">
                بعد از ورود متن کامل اوستا، واژه‌های مرتبط به شکل دقیق‌تر و خودکار نمایش داده می‌شوند.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-gold/10 bg-gold/10 p-5">
          <div className="flex items-center gap-2 text-gold-light">
            <Sparkles size={18} />
            <h3 className="font-black">قدم بعدی پیشنهادی</h3>
          </div>
          <p className="mt-4 text-sm leading-8 text-muted">
            برای نگه‌داشتن حس سفر، بعد از هر بند یک مسیر بعدی پیشنهاد می‌شود: بند بعدی، واژه‌نامه، مقاله یا رسانه مرتبط.
          </p>
          {nextHref ? (
            <Link
              href={nextHref}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              {nextTitle ?? "ادامه مسیر"}
              <ArrowLeft size={17} />
            </Link>
          ) : (
            <Link
              href="/dictionary"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              رفتن به واژه‌نامه
              <ArrowLeft size={17} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
