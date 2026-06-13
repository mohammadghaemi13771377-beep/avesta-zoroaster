"use client";

import Link from "next/link";
import { ArrowLeft, Bookmark, Check, Copy, Flame, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import type { DailyAvesta } from "@/lib/daily-avesta";

type DailyAvestaCardProps = {
  item: DailyAvesta;
};

const savedDailyKey = "avesta-reader-daily-saved-v1";

function readSavedDaily(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(savedDailyKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : [];
  } catch {
    return [];
  }
}

export function DailyAvestaCard({ item }: DailyAvestaCardProps) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("پیام روزانه برای آغاز مطالعه");

  useEffect(() => {
    setSaved(readSavedDaily().includes(item.date));
  }, [item.date]);

  function toggleSave() {
    const savedItems = readSavedDaily();
    const exists = savedItems.includes(item.date);
    const nextItems = exists ? savedItems.filter((date) => date !== item.date) : [item.date, ...savedItems];

    window.localStorage.setItem(savedDailyKey, JSON.stringify(nextItems.slice(0, 120)));
    setSaved(!exists);
    setStatus(exists ? "پیام امروز از ذخیره‌ها حذف شد." : "پیام امروز ذخیره شد.");
  }

  async function copyDailyMessage() {
    await navigator.clipboard.writeText(
      `${item.quote}\n\n${item.reflectionPrompt}\n${item.term.label}: ${item.term.meaning}\nAVESTA-ZOROASTER`
    );
    setCopied(true);
    setStatus("متن پیام امروز کپی شد.");
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="lux-frame overflow-hidden rounded-[22px]">
        <div className="grid gap-0 lg:grid-cols-[0.72fr_1fr]">
          <div className="relative min-h-[330px] overflow-hidden bg-night p-7">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 34%, rgba(242, 213, 138, 0.28), transparent 12rem), radial-gradient(circle at 24% 70%, rgba(214, 168, 79, 0.22), transparent 10rem), linear-gradient(145deg, #071521, #05080D)"
              }}
            />
            <div className="relative z-10 flex h-full min-h-[276px] flex-col justify-between rounded-[1.35rem] border border-gold/20 bg-black/24 p-6 shadow-gold">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                  <Flame size={14} />
                  {item.date}
                </span>
                <Sparkles className="h-6 w-6 text-gold-light" />
              </div>
              <blockquote className="text-2xl font-black leading-[2] text-warm sm:text-3xl">«{item.quote}»</blockquote>
              <p className="text-sm font-bold text-gold-light">{item.section}</p>
            </div>
          </div>

          <div className="border-t border-gold/15 bg-royal/45 p-7 lg:border-r lg:border-t-0">
            <p className="gold-text text-sm font-semibold tracking-[0.24em]">DAILY AVESTA</p>
            <h2 className="mt-3 text-4xl font-black text-warm">{item.title}</h2>
            <p className="mt-4 text-lg leading-9 text-muted">{item.ethicalMessage}</p>

            <div className="mt-6 rounded-3xl border border-gold/15 bg-night/55 p-5">
              <p className="text-xs font-black text-gold-light">پرسش تأمل امروز</p>
              <p className="mt-2 text-xl font-black leading-9 text-warm">{item.reflectionPrompt}</p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href={item.term.href}
                className="rounded-2xl border border-gold/10 bg-night/55 p-4 transition hover:border-gold/40 hover:bg-gold/10"
              >
                <p className="text-xs font-bold text-gold-light">واژه امروز</p>
                <h3 className="mt-2 text-2xl font-black text-warm">{item.term.label}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted">{item.term.meaning}</p>
              </Link>
              <div className="rounded-2xl border border-gold/10 bg-night/55 p-4">
                <p className="text-xs font-bold text-gold-light">وضعیت</p>
                <p className="mt-2 text-sm leading-7 text-muted">{status}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
              >
                مطالعه بند امروز
                <ArrowLeft size={17} />
              </Link>
              <button
                type="button"
                onClick={toggleSave}
                className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10"
              >
                {saved ? <Check size={17} /> : <Bookmark size={17} />}
                {saved ? "ذخیره شد" : "ذخیره امروز"}
              </button>
              <button
                type="button"
                onClick={copyDailyMessage}
                className="inline-flex items-center gap-2 rounded-full border border-warm/10 bg-warm/5 px-5 py-3 text-sm font-black text-warm transition hover:border-gold/30"
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
                {copied ? "کپی شد" : "کپی پیام"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
