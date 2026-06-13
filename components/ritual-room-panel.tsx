"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Flame, Pause, Play, RotateCcw, Timer } from "lucide-react";
import {
  buildRitualRoomSession,
  ritualRoomDurationLabels,
  ritualRoomModeLabels,
  type RitualRoomDuration,
  type RitualRoomMode,
} from "@/lib/ritual-room";

const modeOptions = Object.entries(ritualRoomModeLabels) as Array<[RitualRoomMode, string]>;
const durationOptions = Object.entries(ritualRoomDurationLabels) as Array<[RitualRoomDuration, string]>;

export function RitualRoomPanel() {
  const [mode, setMode] = useState<RitualRoomMode>("flame");
  const [duration, setDuration] = useState<RitualRoomDuration>("seven");
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const session = useMemo(() => buildRitualRoomSession(mode, duration), [duration, mode]);
  const totalSeconds = session.durationMinutes * 60;
  const progress = Math.min(100, Math.round((elapsed / totalSeconds) * 100));
  const remaining = Math.max(0, totalSeconds - elapsed);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setElapsed((value) => {
        if (value + 1 >= totalSeconds) {
          window.clearInterval(timer);
          setPlaying(false);
          return totalSeconds;
        }
        return value + 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [playing, totalSeconds]);

  function resetSession() {
    setPlaying(false);
    setElapsed(0);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="lux-frame h-fit p-5 lg:sticky lg:top-28">
          <div className="flex items-center gap-3 text-gold-light">
            <Flame size={24} />
            <h2 className="text-xl font-black text-warm">تنظیم تالار</h2>
          </div>

          <ControlGroup title="حالت">
            {modeOptions.map(([value, label]) => (
              <button key={value} type="button" onClick={() => setMode(value)} className={buttonClass(mode === value)}>
                {label}
              </button>
            ))}
          </ControlGroup>

          <ControlGroup title="مدت">
            {durationOptions.map(([value, label]) => (
              <button key={value} type="button" onClick={() => setDuration(value)} className={buttonClass(duration === value)}>
                {label}
              </button>
            ))}
          </ControlGroup>

          <div className="mt-6 rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex items-center justify-between gap-3">
              <Timer className="text-gold-light" size={20} />
              <span className="text-3xl font-black text-warm" dir="ltr">{formatTime(remaining)}</span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setPlaying((value) => !value)} className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-black text-night">
                {playing ? <Pause size={16} /> : <Play size={16} />}
                {playing ? "توقف" : "شروع"}
              </button>
              <button type="button" onClick={resetSession} className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/20 px-4 py-3 text-sm font-black text-gold-light">
                <RotateCcw size={16} />
                ریست
              </button>
            </div>
          </div>
        </aside>

        <section className="lux-frame overflow-hidden p-5 sm:p-7">
          <div className={`image-scene ${session.scene} min-h-[480px] rounded-[24px] border border-gold/16 p-6`}>
            <div className="relative z-10 flex min-h-[420px] flex-col justify-between rounded-[28px] border border-gold/20 bg-black/42 p-7 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
                  {ritualRoomModeLabels[session.mode]}
                </span>
                <span className="font-display text-lg tracking-[0.22em] text-gold-light">RITUAL ROOM</span>
              </div>
              <div>
                <h2 className="gold-text text-5xl font-black leading-tight">{session.title}</h2>
                <p className="mt-5 max-w-3xl text-lg leading-9 text-warm/82">{session.subtitle}</p>
                <blockquote className="mt-7 rounded-3xl border border-gold/15 bg-black/30 p-5 text-2xl font-black leading-[2] text-warm">
                  «{session.quote}»
                </blockquote>
              </div>
              <p className="rounded-2xl border border-gold/10 bg-gold/10 p-4 text-sm font-black leading-7 text-gold-light">
                {session.intention}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {session.steps.map((step, index) => (
              <div key={step} className="flex gap-3 rounded-3xl border border-gold/10 bg-night/55 p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/25 bg-gold/10 text-sm font-black text-gold-light">
                  {index + 1}
                </span>
                <p className="text-sm font-bold leading-8 text-warm">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {session.nextActions.map((action) => (
              <Link key={action.href} href={action.href} className="flex items-center justify-between gap-3 rounded-2xl border border-gold/10 bg-gold/10 p-4 text-sm font-black text-gold-light transition hover:border-gold/35">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  {action.title}
                </span>
                <ArrowLeft size={15} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function ControlGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <p className="text-xs font-black text-gold-light">{title}</p>
      <div className="mt-3 grid gap-2">{children}</div>
    </div>
  );
}

function buttonClass(active: boolean) {
  return active
    ? "rounded-2xl border border-gold/50 bg-gold/15 px-4 py-3 text-right text-sm font-black text-warm"
    : "rounded-2xl border border-gold/10 bg-night/55 px-4 py-3 text-right text-sm font-bold text-muted transition hover:border-gold/35 hover:text-warm";
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
