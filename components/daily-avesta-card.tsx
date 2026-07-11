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
  if (typeof window === "undefined") return [];

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
  const [status, setStatus] = useState("آماده برای ذخیره، کپی یا ادامه مطالعه");

  useEffect(() => {
    setSaved(readSavedDaily().includes(item.date));
  }, [item.date]);

  function toggleSave() {
    const savedItems = readSavedDaily();
    const exists = savedItems.includes(item.date);
    const nextItems = exists ? savedItems.filter((date) => date !== item.date) : [item.date, ...savedItems];

    window.localStorage.setItem(savedDailyKey, JSON.stringify(nextItems.slice(0, 120)));
    setSaved(!exists);
    setStatus(exists ? "پیام امروز از ذخیره‌ها حذف شد." : "پیام امروز در حافظه مطالعه ذخیره شد.");
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
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="daily-avesta-title">
      <div className="relative overflow-hidden rounded-[26px] border border-gold/20 bg-[linear-gradient(135deg,rgba(255,248,234,0.09),rgba(7,21,33,0.70)_46%,rgba(5,8,13,0.86))] shadow-[0_28px_88px_rgba(0,0,0,0.28)] bright:bg-[linear-gradient(135deg,rgba(255,253,247,0.92),rgba(242,213,138,0.24),rgba(255,255,255,0.82))]">
        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold-light/16 blur-3xl" />
        <div className="absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-sky-300/10 blur-3xl" />
        <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[310px] overflow-hidden p-5 sm:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(242,213,138,0.32),transparent_13rem),linear-gradient(145deg,rgba(7,21,33,0.94),rgba(5,8,13,0.72))] bright:bg-[radial-gradient(circle_at_50%_35%,rgba(214,168,79,0.24),transparent_13rem),linear-gradient(145deg,rgba(255,253,247,0.88),rgba(242,213,138,0.18))]" />
            <div className="relative z-10 flex h-full min-h-[266px] flex-col justify-between rounded-[22px] border border-gold/22 bg-black/20 p-6 shadow-gold backdrop-blur-md bright:bg-white/52">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light bright:text-amber-800">
                  <Flame size={14} />
                  {item.date}
                </span>
                <Sparkles className="h-6 w-6 text-gold-light bright:text-amber-800" />
              </div>
              <blockquote className="mt-7 text-2xl font-black leading-[2] text-warm bright:text-stone-950 sm:text-3xl">
                «{item.quote}»
              </blockquote>
              <p className="mt-5 text-sm font-bold text-gold-light bright:text-amber-800">{item.section}</p>
            </div>
          </div>

          <div className="relative z-10 border-t border-gold/14 p-6 lg:border-r lg:border-t-0 lg:p-8">
            <p className="text-xs font-black tracking-[0.18em] text-gold-light bright:text-amber-800">DAILY AVESTA</p>
            <h2 id="daily-avesta-title" className="mt-3 text-3xl font-black text-warm bright:text-stone-950 sm:text-4xl">
              {item.title}
            </h2>
            <p className="mt-4 text-base font-semibold leading-9 text-muted bright:text-stone-700 sm:text-lg">
              {item.ethicalMessage}
            </p>

            <div className="mt-6 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-gold/15 bg-night/42 p-5 bright:bg-white/50">
                <p className="text-xs font-black text-gold-light bright:text-amber-800">پرسش تأمل امروز</p>
                <p className="mt-2 text-xl font-black leading-9 text-warm bright:text-stone-950">{item.reflectionPrompt}</p>
              </div>
              <Link
                href={item.term.href}
                className="rounded-2xl border border-gold/15 bg-night/42 p-5 transition hover:border-gold/40 hover:bg-gold/10 bright:bg-white/50"
              >
                <p className="text-xs font-black text-gold-light bright:text-amber-800">واژه امروز</p>
                <h3 className="mt-2 text-2xl font-black text-warm bright:text-stone-950">{item.term.label}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted bright:text-stone-700">{item.term.meaning}</p>
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
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
                className="inline-flex items-center gap-2 rounded-full border border-gold/22 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10 bright:text-amber-900"
              >
                {saved ? <Check size={17} /> : <Bookmark size={17} />}
                {saved ? "ذخیره شد" : "ذخیره امروز"}
              </button>
              <button
                type="button"
                onClick={copyDailyMessage}
                className="inline-flex items-center gap-2 rounded-full border border-warm/12 bg-warm/5 px-5 py-3 text-sm font-black text-warm transition hover:border-gold/30 bright:border-amber-900/15 bright:text-stone-800"
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
                {copied ? "کپی شد" : "کپی پیام"}
              </button>
              <span className="text-xs font-bold text-muted bright:text-stone-600">{status}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
