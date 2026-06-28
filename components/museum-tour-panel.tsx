"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, Headphones, Map, RefreshCw } from "lucide-react";
import type { MuseumTour } from "@/lib/museum-tour";

type MuseumTourPanelProps = {
  tour: MuseumTour;
};

const storageKey = "avesta-museum-tour-v1";

function readCompleted() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function MuseumTourPanel({ tour }: MuseumTourPanelProps) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    setCompletedIds(readCompleted());
  }, []);

  const progress = Math.round((completedIds.length / tour.stops.length) * 100);
  const nextStop = useMemo(() => tour.stops.find((stop) => !completedIds.includes(stop.id)) ?? tour.stops[0], [completedIds, tour.stops]);

  function toggleStop(id: string) {
    const exists = completedIds.includes(id);
    const next = exists ? completedIds.filter((item) => item !== id) : [id, ...completedIds];
    setCompletedIds(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function resetTour() {
    setCompletedIds([]);
    window.localStorage.removeItem(storageKey);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
      <aside className="lux-frame h-fit p-5 lg:sticky lg:top-28">
        <div className="flex items-center gap-3 text-gold-light">
          <Map size={24} />
          <h2 className="text-xl font-black text-warm">نقشه تور</h2>
        </div>
        <p className="mt-4 text-sm leading-8 text-muted">{tour.subtitle}</p>
        <p className="mt-5 text-sm font-bold text-gold-light">{tour.totalDuration}</p>
        <p className="mt-2 text-5xl font-black text-warm">{progress}%</p>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-warm/10">
          <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-5 grid gap-3">
          {tour.stops.map((stop) => {
            const isNext = stop.id === nextStop.id;
            const done = completedIds.includes(stop.id);

            return (
              <Link
                key={stop.id}
                href={stop.href}
                className={
                  isNext
                    ? "block rounded-2xl border border-gold/50 bg-gold/15 p-4 text-right shadow-gold"
                    : "block rounded-2xl border border-gold/12 bg-night/55 p-4 text-right transition hover:border-gold/35 hover:bg-gold/10"
                }
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-sm font-black text-warm">{stop.title}</span>
                  {done ? <CheckCircle2 className="text-emerald-100" size={16} /> : <Circle className="text-gold-light" size={16} />}
                </span>
                <span className="mt-2 block text-xs leading-6 text-muted">{stop.duration} / {stop.subtitle}</span>
                <span className="mt-3 inline-flex items-center gap-2 text-xs font-black text-gold-light">
                  ورود به صفحه
                  <ArrowLeft size={13} />
                </span>
              </Link>
            );
          })}
        </div>
        <button
          type="button"
          onClick={resetTour}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
        >
          <RefreshCw size={16} />
          شروع دوباره تور
        </button>
      </aside>

      {nextStop ? (
        <section className="lux-frame overflow-hidden p-5 sm:p-7">
          <div className={`image-scene ${nextStop.scene} min-h-[440px] rounded-[1.5rem] border border-gold/15`}>
            <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-gold/15 bg-black/45 p-5 backdrop-blur">
              <p className="text-xs font-black text-gold-light">{nextStop.artifact}</p>
              <h2 className="mt-2 text-4xl font-black text-warm">{nextStop.title}</h2>
              <p className="mt-3 text-sm leading-8 text-muted">{nextStop.narration}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_0.82fr]">
            <div className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex items-center gap-2 text-gold-light">
                <Headphones size={20} />
                <p className="text-sm font-black">روایت راهنما</p>
              </div>
              <p className="mt-4 text-xl font-black leading-10 text-warm">{nextStop.narration}</p>
              <p className="mt-4 text-sm leading-8 text-muted">{nextStop.curatorNote}</p>
            </div>
            <div className="rounded-3xl border border-gold/10 bg-royal/45 p-5">
              <p className="text-xs font-bold text-gold-light">ایستگاه بعدی</p>
              <h3 className="mt-3 text-2xl font-black text-warm">{nextStop.title}</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => toggleStop(nextStop.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
                >
                  {completedIds.includes(nextStop.id) ? "باز کردن ایستگاه" : "ایستگاه را دیدم"}
                  <CheckCircle2 size={16} />
                </button>
                <Link href={nextStop.href} className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10">
                  ورود به منبع
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </section>
  );
}
