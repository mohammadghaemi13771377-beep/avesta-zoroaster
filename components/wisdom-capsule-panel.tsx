"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Check, Copy, Flame, Share2, Sparkles } from "lucide-react";
import type { WisdomCapsule } from "@/lib/wisdom-capsule";

type WisdomCapsulePanelProps = {
  capsule: WisdomCapsule;
};

export function WisdomCapsulePanel({ capsule }: WisdomCapsulePanelProps) {
  const [copied, setCopied] = useState(false);

  async function copyCapsule() {
    await navigator.clipboard.writeText(`${capsule.shareText}\n\nواژه امروز: ${capsule.term.label} - ${capsule.term.meaning}\nتمرین: ${capsule.practice}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function shareCapsule() {
    if (navigator.share) {
      await navigator.share({
        title: capsule.title,
        text: `${capsule.shareText}\n\n${capsule.practice}`,
        url: window.location.href,
      });
      return;
    }

    await copyCapsule();
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr]">
      <aside className="space-y-5">
        <div className="lux-frame p-6">
          <div className="flex items-center gap-2 text-gold-light">
            <Sparkles size={24} />
            <h2 className="text-2xl font-black text-warm">کپسول خرد</h2>
          </div>
          <p className="mt-4 text-sm leading-8 text-muted">
            یک تجربه کوتاه روزانه: یک جمله، یک واژه، یک تمرین و یک کارت قابل اشتراک.
          </p>
          <p className="mt-5 text-sm font-bold text-gold-light">{capsule.date}</p>
          <p className="mt-2 text-6xl font-black text-warm">{capsule.ashaScore}%</p>
          <p className="mt-2 text-sm text-muted">تعادل اشا در نمونه امروز</p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-warm/10">
            <div className="h-full rounded-full bg-gold" style={{ width: `${capsule.ashaScore}%` }} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyCapsule}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "کپی شد" : "کپی کپسول"}
            </button>
            <button
              type="button"
              onClick={shareCapsule}
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              <Share2 size={16} />
              اشتراک
            </button>
          </div>
        </div>

        <Link href={capsule.term.href} className="lux-frame block p-6 transition hover:-translate-y-1 hover:border-gold/45">
          <p className="text-xs font-bold text-gold-light">واژه امروز</p>
          <h3 className="mt-3 text-3xl font-black text-warm">{capsule.term.label}</h3>
          <p className="mt-3 text-sm leading-8 text-muted">{capsule.term.meaning}</p>
        </Link>
      </aside>

      <div className="space-y-5">
        <div className="lux-frame p-5 sm:p-7">
          <div className="flex items-center gap-2 text-gold-light">
            <Flame size={22} />
            <p className="text-sm font-black">پیام امروز</p>
          </div>
          <blockquote className="mt-5 text-4xl font-black leading-[1.9] text-warm">«{capsule.quote}»</blockquote>
          <Link href={capsule.sourceHref} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
            مطالعه منبع
            <ArrowLeft size={16} />
          </Link>
        </div>

        <div className="lux-frame p-6">
          <p className="text-xs font-bold text-gold-light">تمرین سه دقیقه‌ای</p>
          <h3 className="mt-3 text-2xl font-black leading-10 text-warm">{capsule.practice}</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {capsule.steps.map((step) => (
            <Link key={step.label} href={step.href} className="lux-frame block p-5 transition hover:-translate-y-1 hover:border-gold/45">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                  {step.label}
                </span>
                <BookOpen className="text-gold-light" size={18} />
              </div>
              <h3 className="mt-4 text-2xl font-black text-warm">{step.title}</h3>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-gold-light">
                ورود
                <ArrowLeft size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
