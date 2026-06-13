"use client";

import { Download, Pause, Play, Rewind, Timer, Volume2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type RitualAudioPlayerProps = {
  title: string;
  subtitle: string;
  audioUrl?: string | null;
  quote: string;
};

const speeds = [0.75, 1, 1.25, 1.5];
const demoDuration = 92;

export function RitualAudioPlayer({ title, subtitle, audioUrl, quote }: RitualAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(audioUrl ? 0 : demoDuration);
  const [speed, setSpeed] = useState(1);
  const [status, setStatus] = useState(audioUrl ? "آماده پخش روایت صوتی" : "دموی روایت صوتی تا زمان بارگذاری فایل");

  const currentTime = useMemo(() => Math.round((duration * progress) / 100), [duration, progress]);

  useEffect(() => {
    if (!audioUrl || !playing) {
      return;
    }

    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.playbackRate = speed;
    const playPromise = audio.play();
    if (playPromise) {
      playPromise.catch(() => {
        setPlaying(false);
        setStatus("مرورگر اجازه پخش خودکار نداد. دوباره دکمه پخش را بزن.");
      });
    }
  }, [audioUrl, playing, speed]);

  useEffect(() => {
    if (audioUrl || !playing) {
      return;
    }

    const startedAt = Date.now() - (progress / 100) * demoDuration * 1000;
    const timer = window.setInterval(() => {
      const elapsed = ((Date.now() - startedAt) / 1000) * speed;
      const nextProgress = Math.min(100, Math.round((elapsed / demoDuration) * 100));
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        setPlaying(false);
        setStatus("دموی روایت به پایان رسید.");
      }
    }, 400);

    return () => window.clearInterval(timer);
  }, [audioUrl, playing, progress, speed]);

  function togglePlay() {
    if (audioUrl) {
      const audio = audioRef.current;
      if (!audio) {
        return;
      }

      if (playing) {
        audio.pause();
        setPlaying(false);
        setStatus("پخش متوقف شد.");
      } else {
        setPlaying(true);
        setStatus("در حال پخش روایت صوتی...");
      }
      return;
    }

    setPlaying((value) => !value);
    setStatus(playing ? "دموی روایت متوقف شد." : "دموی روایت در حال پخش است.");
  }

  function rewind() {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
    setProgress((value) => Math.max(0, value - 12));
  }

  function changeSpeed() {
    const currentIndex = speeds.indexOf(speed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length] ?? 1;
    setSpeed(nextSpeed);

    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  }

  function handleScrub(value: number) {
    setProgress(value);
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = (duration * value) / 100;
    }
  }

  return (
    <section className="lux-frame overflow-hidden">
      {audioUrl ? (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onLoadedMetadata={(event) => setDuration(Math.round(event.currentTarget.duration || demoDuration))}
          onTimeUpdate={(event) => {
            const audio = event.currentTarget;
            setProgress(audio.duration ? Math.round((audio.currentTime / audio.duration) * 100) : 0);
          }}
          onEnded={() => {
            setPlaying(false);
            setStatus("روایت صوتی به پایان رسید.");
          }}
        />
      ) : null}

      <div className="grid gap-0 lg:grid-cols-[0.74fr_1fr]">
        <div className="relative min-h-[280px] overflow-hidden bg-night p-7">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 35%, rgba(214, 168, 79, 0.34), transparent 11rem), linear-gradient(145deg, #071521, #05080D)"
            }}
          />
          <div className="relative z-10 flex h-full min-h-[226px] flex-col justify-between rounded-[1.35rem] border border-gold/20 bg-black/25 p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold-light">
                <Volume2 size={25} />
              </div>
              <span className="rounded-full border border-gold/20 px-3 py-1 text-xs font-black text-gold-light">
                {audioUrl ? "AUDIO READY" : "DEMO"}
              </span>
            </div>
            <blockquote className="line-clamp-3 text-lg font-black leading-9 text-warm">«{quote}»</blockquote>
          </div>
        </div>

        <div className="border-t border-gold/15 bg-royal/45 p-7 lg:border-r lg:border-t-0">
          <p className="gold-text text-sm font-semibold tracking-[0.24em]">RITUAL AUDIO</p>
          <h2 className="mt-3 text-3xl font-black text-warm">{title}</h2>
          <p className="mt-3 text-sm leading-8 text-muted">{subtitle}</p>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-3 text-xs font-bold text-muted">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(event) => handleScrub(Number(event.target.value))}
              className="mt-2 w-full accent-[#D6A84F]"
              aria-label="پیشرفت روایت صوتی"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              {playing ? <Pause size={17} /> : <Play size={17} />}
              {playing ? "توقف" : "پخش"}
            </button>
            <button
              type="button"
              onClick={rewind}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              <Rewind size={16} />
              ۱۰ ثانیه
            </button>
            <button
              type="button"
              onClick={changeSpeed}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              <Timer size={16} />
              {speed}x
            </button>
            {audioUrl ? (
              <a
                href={audioUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border border-warm/10 bg-warm/5 px-4 py-3 text-sm font-bold text-warm transition hover:border-gold/30"
              >
                <Download size={16} />
                دانلود صوت
              </a>
            ) : null}
          </div>

          <p className="mt-4 rounded-2xl border border-gold/10 bg-night/45 p-4 text-sm leading-7 text-muted">
            {status}
          </p>
        </div>
      </div>
    </section>
  );
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.max(0, totalSeconds % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
