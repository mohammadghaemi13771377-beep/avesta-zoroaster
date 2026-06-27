"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Headphones, Moon, ScrollText, Sparkles, Tags } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReadingRoomMode, ReadingRoomPreset } from "@/lib/reading-room";
import { getReadingRoomRecommendation, readingDepthLabels } from "@/lib/reading-room";
import { visualAssets } from "@/lib/visual-assets";

type ReadingRoomLabProps = {
  presets: ReadingRoomPreset[];
};

const presetIcons: Record<ReadingRoomMode, typeof BookOpen> = {
  devotional: Sparkles,
  scholar: ScrollText,
  daily: Moon,
  audio: Headphones,
};

const presetImages: Record<ReadingRoomMode, string> = {
  devotional: visualAssets.yasna,
  scholar: visualAssets.gathas,
  daily: visualAssets.khordehAvesta,
  audio: visualAssets.media,
};

export function ReadingRoomLab({ presets }: ReadingRoomLabProps) {
  const [mode, setMode] = useState<ReadingRoomMode>(presets[0]?.id ?? "devotional");
  const recommendation = useMemo(() => getReadingRoomRecommendation(mode), [mode]);
  const active = recommendation.preset;

  return (
    <section className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
      <aside className="lux-frame p-5">
        <div className="flex items-center gap-2 text-gold-light">
          <BookOpen size={22} />
          <h2 className="text-xl font-black text-warm">انتخاب تجربه مطالعه</h2>
        </div>
        <div className="mt-5 grid gap-3">
          {presets.map((preset) => {
            const Icon = presetIcons[preset.id];
            const selected = preset.id === mode;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setMode(preset.id)}
                className={
                  selected
                    ? "rounded-2xl border border-gold/55 bg-gold/15 p-4 text-right shadow-gold transition"
                    : "rounded-2xl border border-gold/12 bg-night/55 p-4 text-right transition hover:border-gold/35 hover:bg-gold/10"
                }
              >
                <span className="flex items-center gap-2 text-gold-light">
                  <Icon size={18} />
                  <span className="font-black text-warm">{preset.title}</span>
                </span>
                <span className="mt-2 block text-xs leading-6 text-muted">{preset.subtitle}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="lux-frame overflow-hidden p-5 sm:p-7">
        <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="gold-text text-xs font-semibold tracking-[0.25em]">LIVE READING ROOM</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-warm">{active.title}</h2>
            <p className="mt-4 leading-8 text-muted">{active.subtitle}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>{readingDepthLabels[active.depth]}</Tag>
              {active.focus.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-gold/10 bg-night/55 p-5">
              <p className="text-sm font-black text-gold-light">پیام این حالت</p>
              <p className="mt-3 text-lg font-bold leading-9 text-warm">«{active.ethicalMessage}»</p>
              <Link
                href={active.recommendedVerseHref}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
              >
                {active.recommendedVerseTitle}
                <ArrowLeft size={16} />
              </Link>
            </div>
          </div>

          <div className={`image-scene ${active.scene} min-h-[360px] rounded-[18px] border border-gold/16`}>
            <Image
              src={presetImages[active.id]}
              alt={active.title}
              fill
              sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 44vw, 92vw"
              className="object-cover transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/22 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-gold/16 bg-black/45 p-5 backdrop-blur">
              <p className="text-xs font-bold text-gold-light">Reader controls</p>
              <div className="mt-3 grid gap-2">
                {recommendation.controls.slice(0, 4).map((control) => (
                  <p key={control} className="rounded-xl border border-gold/10 bg-black/20 px-3 py-2 text-xs text-warm/78">
                    {control}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-gold/10 bg-night/50 p-5">
            <div className="flex items-center gap-2 text-gold-light">
              <Tags size={18} />
              <h3 className="font-black text-warm">واژه‌های پیشنهادی</h3>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {recommendation.terms.map((term) => (
                <Link
                  key={term.href}
                  href={term.href}
                  className="rounded-2xl border border-gold/10 bg-black/18 p-4 transition hover:border-gold/35 hover:bg-gold/10"
                >
                  <p className="font-black text-warm">{term.title}</p>
                  <p className="mt-2 text-xs leading-6 text-muted">{term.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gold/10 bg-gold/10 p-5">
            <h3 className="font-black text-warm">قدم‌های بعدی</h3>
            <div className="mt-4 grid gap-3">
              {recommendation.nextActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-gold/10 bg-black/18 p-4 text-sm font-black text-gold-light transition hover:border-gold/35 hover:bg-gold/10"
                >
                  {action.title}
                  <ArrowLeft size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
      {children}
    </span>
  );
}
