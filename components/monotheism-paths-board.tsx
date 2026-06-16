"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, BookOpen, Compass, Flame, Quote, Sparkles } from "lucide-react";
import type { MonotheismPath, MonotheismPathTone } from "@/lib/monotheism-paths";
import { getMonotheismPathSummary } from "@/lib/monotheism-paths";

type MonotheismPathsBoardProps = {
  paths: MonotheismPath[];
};

const toneLabels: Record<MonotheismPathTone, string> = {
  radiant: "روشنایی",
  truth: "اشا",
  choice: "اختیار",
  practice: "تمرین",
};

const toneClass: Record<MonotheismPathTone, string> = {
  radiant: "border-gold/25 bg-gold/10 text-gold-light",
  truth: "border-sky-200/20 bg-sky-200/10 text-sky-100",
  choice: "border-orange-200/20 bg-orange-200/10 text-orange-100",
  practice: "border-emerald-200/20 bg-emerald-200/10 text-emerald-100",
};

export function MonotheismPathsBoard({ paths }: MonotheismPathsBoardProps) {
  const [activeId, setActiveId] = useState(paths[0]?.id ?? "");
  const summary = useMemo(() => getMonotheismPathSummary(paths), [paths]);
  const activePath = paths.find((path) => path.id === activeId) ?? paths[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
      <aside className="lux-frame h-fit p-5 lg:sticky lg:top-28">
        <div className="flex items-center gap-3 text-gold-light">
          <Compass size={24} />
          <h2 className="text-xl font-black text-warm">مسیرهای یکتاپرستی</h2>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Metric label="مسیر" value={String(summary.paths)} />
          <Metric label="واژه" value={String(summary.terms)} />
          <Metric label="مقاله" value={String(summary.articles)} />
          <Metric label="تمرین" value={String(summary.practices)} />
        </div>

        <div className="mt-5 grid gap-3">
          {paths.map((path) => {
            const selected = path.id === activePath.id;

            return (
              <button
                key={path.id}
                type="button"
                onClick={() => setActiveId(path.id)}
                className={
                  selected
                    ? "rounded-2xl border border-gold/50 bg-gold/15 p-4 text-right shadow-gold"
                    : "rounded-2xl border border-gold/12 bg-night/55 p-4 text-right transition hover:border-gold/35 hover:bg-gold/10"
                }
              >
                <span className="text-base font-black text-warm">{path.title}</span>
                <span className="mt-2 block text-xs leading-6 text-muted">{path.subtitle}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {activePath ? (
        <section className="lux-frame overflow-hidden p-5 sm:p-7">
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className={`inline-flex rounded-full border px-4 py-2 text-xs font-black ${toneClass[activePath.tone]}`}>
                {toneLabels[activePath.tone]}
              </span>
              <h2 className="gold-text mt-5 text-5xl font-black leading-tight">{activePath.title}</h2>
              <p className="mt-4 text-xl font-bold leading-9 text-warm">{activePath.subtitle}</p>
              <p className="mt-5 leading-9 text-muted">{activePath.audience}</p>
              <p className="mt-4 rounded-3xl border border-gold/10 bg-royal/45 p-5 text-base font-bold leading-8 text-gold-light">
                وعده مسیر: {activePath.promise}
              </p>
            </div>

            <div className={`image-scene ${activePath.scene} min-h-[420px] rounded-[1.4rem] border border-gold/15`}>
              <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-gold/16 bg-black/45 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-gold-light">
                  <Flame size={18} />
                  <p className="text-sm font-black">تمرین امروز</p>
                </div>
                <p className="mt-3 text-sm font-bold leading-8 text-warm">{activePath.ethicalPractice}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex items-center gap-2 text-gold-light">
              <Quote size={20} />
              <p className="text-sm font-black">بند پیشنهادی</p>
            </div>
            <blockquote className="mt-4 text-2xl font-black leading-10 text-warm">«{activePath.verse.quote}»</blockquote>
            <Link href={activePath.verse.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">
              {activePath.verse.title}
              <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-3">
            <Column title="قدم‌های مسیر" icon={Sparkles}>
              {activePath.steps.map((step, index) => (
                <p key={step} className="rounded-2xl border border-gold/10 bg-black/20 p-4 text-sm font-bold leading-7 text-warm">
                  {index + 1}. {step}
                </p>
              ))}
            </Column>
            <Column title="واژه‌های کلیدی" icon={BookOpen}>
              {activePath.terms.map((term) => (
                <Link key={term.href} href={term.href} className="rounded-2xl border border-gold/10 bg-black/20 p-4 transition hover:border-gold/35">
                  <p className="font-black text-warm">{term.title}</p>
                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted">{term.description}</p>
                </Link>
              ))}
            </Column>
            <Column title="مقاله‌های مرتبط" icon={Compass}>
              {activePath.articles.map((article) => (
                <Link key={article.href} href={article.href} className="rounded-2xl border border-gold/10 bg-black/20 p-4 transition hover:border-gold/35">
                  <p className="font-black text-warm">{article.title}</p>
                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted">{article.description}</p>
                </Link>
              ))}
            </Column>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-gold-light">{value}</p>
    </div>
  );
}

function Column({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-gold/10 bg-royal/40 p-4">
      <div className="flex items-center gap-2 text-gold-light">
        <Icon size={18} />
        <h3 className="font-black text-warm">{title}</h3>
      </div>
      <div className="mt-4 grid gap-3">{children}</div>
    </div>
  );
}
