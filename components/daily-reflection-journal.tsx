"use client";

import Link from "next/link";
import { ArrowLeft, Check, Flame, Save, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ReflectionPillar } from "@/lib/daily-reflection";
import { getDailyReflectionSeed } from "@/lib/daily-reflection";

type JournalEntry = {
  date: string;
  thought: string;
  word: string;
  deed: string;
  completed: boolean;
  updatedAt: string;
};

const journalKey = "avesta-daily-reflection-v1";

function readJournal(): Record<string, JournalEntry> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(journalKey) ?? "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function DailyReflectionJournal() {
  const seed = useMemo(() => getDailyReflectionSeed(), []);
  const [values, setValues] = useState<Record<ReflectionPillar, string>>({
    thought: "",
    word: "",
    deed: "",
  });
  const [completed, setCompleted] = useState(false);
  const [status, setStatus] = useState("دفتر امروز آماده ثبت است.");
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    const journal = readJournal();
    const today = journal[seed.date];

    if (today) {
      setValues({
        thought: today.thought,
        word: today.word,
        deed: today.deed,
      });
      setCompleted(today.completed);
    }

    setHistoryCount(Object.keys(journal).length);
  }, [seed.date]);

  function saveEntry(nextCompleted = completed) {
    const journal = readJournal();
    const entry: JournalEntry = {
      date: seed.date,
      thought: values.thought.trim(),
      word: values.word.trim(),
      deed: values.deed.trim(),
      completed: nextCompleted,
      updatedAt: new Date().toISOString(),
    };

    journal[seed.date] = entry;
    window.localStorage.setItem(journalKey, JSON.stringify(journal));
    setCompleted(nextCompleted);
    setHistoryCount(Object.keys(journal).length);
    setStatus(nextCompleted ? "ثبت امروز کامل شد." : "یادداشت امروز ذخیره شد.");
  }

  function clearEntry() {
    const journal = readJournal();
    delete journal[seed.date];
    window.localStorage.setItem(journalKey, JSON.stringify(journal));
    setValues({ thought: "", word: "", deed: "" });
    setCompleted(false);
    setHistoryCount(Object.keys(journal).length);
    setStatus("ثبت امروز پاک شد.");
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
      <aside className="space-y-5">
        <div className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Flame size={22} />
            <h2 className="text-2xl font-black text-warm">اوستای امروز</h2>
          </div>
          <p className="mt-4 text-lg font-black leading-9 text-warm">«{seed.quote}»</p>
          <p className="mt-4 text-sm leading-8 text-muted">{seed.ethicalMessage}</p>
          <Link
            href={seed.term.href}
            className="mt-5 block rounded-2xl border border-gold/10 bg-gold/10 p-4 transition hover:border-gold/35"
          >
            <p className="text-xs font-bold text-gold-light">واژه امروز</p>
            <h3 className="mt-2 text-2xl font-black text-warm">{seed.term.label}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{seed.term.meaning}</p>
          </Link>
        </div>

        <div className="lux-frame p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-gold-light">
              <Sparkles size={18} />
              <h3 className="font-black text-warm">وضعیت دفتر</h3>
            </div>
            <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
              {seed.date}
            </span>
          </div>
          <div className="mt-4 grid gap-3">
            <Metric label="روزهای ثبت‌شده" value={String(historyCount)} />
            <Metric label="وضعیت امروز" value={completed ? "کامل" : "در حال نوشتن"} />
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">{status}</p>
        </div>
      </aside>

      <div className="lux-frame p-5 sm:p-7">
        <p className="gold-text text-xs font-semibold tracking-[0.24em]">GOOD THOUGHTS, WORDS, DEEDS</p>
        <h2 className="mt-3 text-4xl font-black text-warm">دفتر پندار، گفتار، کردار</h2>
        <p className="mt-4 leading-8 text-muted">
          هر روز فقط سه جمله کافی است: یک نیت روشن، یک گفتار آگاهانه و یک کردار کوچک.
        </p>

        <div className="mt-6 grid gap-4">
          {seed.prompts.map((prompt) => (
            <label key={prompt.pillar} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <span className="text-xs font-bold text-gold-light">{prompt.label}</span>
              <span className="mt-2 block text-2xl font-black text-warm">{prompt.title}</span>
              <span className="mt-2 block text-sm leading-7 text-muted">{prompt.question}</span>
              <textarea
                value={values[prompt.pillar]}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [prompt.pillar]: event.target.value,
                  }))
                }
                rows={3}
                placeholder={prompt.placeholder}
                className="mt-4 w-full resize-none rounded-2xl border border-gold/15 bg-black/20 p-4 text-sm leading-7 text-warm outline-none placeholder:text-muted focus:border-gold/45"
              />
            </label>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => saveEntry(false)}
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
          >
            <Save size={17} />
            ذخیره
          </button>
          <button
            type="button"
            onClick={() => saveEntry(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
          >
            <Check size={17} />
            تکمیل امروز
          </button>
          <button
            type="button"
            onClick={clearEntry}
            className="inline-flex items-center gap-2 rounded-full border border-warm/10 bg-warm/5 px-5 py-3 text-sm font-bold text-warm transition hover:border-gold/30"
          >
            <Trash2 size={17} />
            پاک کردن امروز
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {seed.nextActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center justify-between gap-3 rounded-2xl border border-gold/10 bg-gold/10 p-4 text-sm font-black text-gold-light transition hover:border-gold/35"
            >
              {action.title}
              <ArrowLeft size={15} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-night/55 p-4">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-gold-light">{value}</p>
    </div>
  );
}
