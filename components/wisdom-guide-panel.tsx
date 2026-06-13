"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Brain, Compass, Quote, Sparkles, Tags } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { WisdomGuideIntent, WisdomGuidePrompt, WisdomGuideRecommendation } from "@/lib/wisdom-guide";
import { getWisdomGuideRecommendation } from "@/lib/wisdom-guide";

type WisdomGuidePanelProps = {
  prompts: WisdomGuidePrompt[];
  initialRecommendation: WisdomGuideRecommendation;
};

const storageKey = "avesta-wisdom-guide-intent-v1";

export function WisdomGuidePanel({ prompts, initialRecommendation }: WisdomGuidePanelProps) {
  const [intent, setIntent] = useState<WisdomGuideIntent>(initialRecommendation.intent);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey) as WisdomGuideIntent | null;
    if (saved && prompts.some((prompt) => prompt.id === saved)) {
      setIntent(saved);
    }
  }, [prompts]);

  const recommendation = useMemo(() => getWisdomGuideRecommendation(intent), [intent]);

  function chooseIntent(nextIntent: WisdomGuideIntent) {
    setIntent(nextIntent);
    window.localStorage.setItem(storageKey, nextIntent);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
      <aside className="lux-frame p-5">
        <div className="flex items-center gap-3 text-gold-light">
          <Brain size={24} />
          <h2 className="text-xl font-black text-warm">حال‌وهوای امروز</h2>
        </div>
        <div className="mt-5 grid gap-3">
          {prompts.map((prompt) => {
            const selected = prompt.id === intent;

            return (
              <button
                key={prompt.id}
                type="button"
                onClick={() => chooseIntent(prompt.id)}
                className={
                  selected
                    ? "rounded-2xl border border-gold/55 bg-gold/15 p-4 text-right shadow-gold transition"
                    : "rounded-2xl border border-gold/12 bg-night/55 p-4 text-right transition hover:border-gold/35 hover:bg-gold/10"
                }
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-base font-black text-warm">{prompt.label}</span>
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: prompt.accent }} />
                </span>
                <span className="mt-2 block text-xs leading-6 text-muted">{prompt.description}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="lux-frame overflow-hidden p-5 sm:p-7">
        <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
              <Sparkles size={16} />
              پیشنهاد زنده برای مسیر مطالعه
            </div>
            <h2 className="gold-text mt-5 text-4xl font-black leading-tight">{recommendation.title}</h2>
            <p className="mt-5 text-base leading-9 text-warm/78">{recommendation.summary}</p>
            <div className="mt-6 rounded-3xl border border-gold/14 bg-black/24 p-5">
              <div className="flex items-center gap-2 text-gold-light">
                <Quote size={20} />
                <p className="text-sm font-black">بند پیشنهادی</p>
              </div>
              <blockquote className="mt-4 text-xl font-black leading-10 text-warm">
                «{recommendation.verse.quote}»
              </blockquote>
              <Link
                href={recommendation.verse.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light"
              >
                {recommendation.verse.title}
                <ArrowLeft size={16} />
              </Link>
            </div>
          </div>

          <div className="image-scene scene-cosmic min-h-[360px] rounded-[18px] border border-gold/16">
            <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-gold/16 bg-black/42 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-gold-light">
                <Compass size={18} />
                <p className="text-sm font-black">پیام اخلاقی امروز</p>
              </div>
              <p className="mt-3 text-sm leading-8 text-warm/82">{recommendation.ethicalMessage}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <RecommendationColumn
            icon={Tags}
            title="واژه‌های کلیدی"
            items={recommendation.terms}
            emptyText="بعد از ورود متن کامل، واژه‌ها دقیق‌تر به بندها وصل می‌شوند."
          />
          <RecommendationColumn
            icon={BookOpen}
            title="مقاله‌های مرتبط"
            items={recommendation.articles}
            emptyText="مقاله مرتبطی برای این مسیر ثبت نشده است."
          />
          <RecommendationColumn
            icon={Compass}
            title="قدم بعدی"
            items={recommendation.nextActions}
            emptyText="مسیر بعدی به‌زودی اضافه می‌شود."
          />
        </div>

        <p className="mt-6 rounded-2xl border border-gold/10 bg-royal/35 p-4 text-xs leading-7 text-muted">
          {recommendation.sourceNote}
        </p>
      </section>
    </div>
  );
}

type RecommendationColumnProps = {
  icon: typeof Tags;
  title: string;
  items: WisdomGuideRecommendation["terms"];
  emptyText: string;
};

function RecommendationColumn({ icon: Icon, title, items, emptyText }: RecommendationColumnProps) {
  return (
    <div className="rounded-3xl border border-gold/10 bg-night/50 p-4">
      <div className="flex items-center gap-2 text-gold-light">
        <Icon size={18} />
        <h3 className="font-black text-warm">{title}</h3>
      </div>
      <div className="mt-4 grid gap-3">
        {items.length ? (
          items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-gold/10 bg-black/20 p-4 transition hover:border-gold/35 hover:bg-gold/10"
            >
              <p className="font-black text-warm">{item.title}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted">{item.description}</p>
            </Link>
          ))
        ) : (
          <p className="rounded-2xl border border-gold/10 bg-black/20 p-4 text-xs leading-6 text-muted">{emptyText}</p>
        )}
      </div>
    </div>
  );
}
