"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, FlaskConical, MousePointerClick, Trophy, UsersRound } from "lucide-react";
import type { NewsletterExperiment } from "@/lib/newsletter-experiments";
import {
  getExperimentEditionTitle,
  getExperimentWinner,
  getNewsletterExperimentSummary,
  getVariantScore,
} from "@/lib/newsletter-experiments";
import { getRate } from "@/lib/newsletter-analytics";

type NewsletterExperimentBoardProps = {
  experiments: NewsletterExperiment[];
};

const statusLabel: Record<NewsletterExperiment["status"], string> = {
  draft: "پیش‌نویس",
  running: "در حال اجرا",
  winner: "برنده مشخص",
};

const statusClass: Record<NewsletterExperiment["status"], string> = {
  draft: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  running: "border-gold/20 bg-gold/10 text-gold-light",
  winner: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
};

export function NewsletterExperimentBoard({ experiments }: NewsletterExperimentBoardProps) {
  const summary = getNewsletterExperimentSummary(experiments);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">A/B TESTING LAB</p>
          <h2 className="mt-3 text-3xl font-black text-warm">آزمایش A/B خبرنامه</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد نسخه‌های subject، preheader و CTA را مقایسه می‌کند تا قبل از ارسال واقعی، نسخه برنده روشن‌تر شود.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="آزمایش‌ها" value={String(summary.total)} />
          <Metric label="در حال اجرا" value={String(summary.running)} />
          <Metric label="کامل‌شده" value={String(summary.completed)} />
          <Metric label="Variant" value={String(summary.totalVariants)} />
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {experiments.map((experiment) => {
          const winner = getExperimentWinner(experiment);

          return (
            <article key={experiment.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass[experiment.status]}`}>
                      {statusLabel[experiment.status]}
                    </span>
                    <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                      {getExperimentEditionTitle(experiment.editionId)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-warm">{experiment.goal}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{experiment.hypothesis}</p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                  <Trophy className="mx-auto text-gold-light" size={20} />
                  <p className="mt-2 text-sm font-black text-warm">Variant {winner.label}</p>
                  <p className="mt-1 text-xs text-muted">Score {getVariantScore(winner)}%</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {experiment.variants.map((variant) => {
                  const isWinner = variant.id === winner.id;

                  return (
                    <div
                      key={variant.id}
                      className={
                        isWinner
                          ? "rounded-3xl border border-gold/35 bg-gold/10 p-5"
                          : "rounded-3xl border border-gold/10 bg-royal/45 p-5"
                      }
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full border border-gold/20 px-3 py-1 text-xs font-black text-gold-light">
                          Variant {variant.label}
                        </span>
                        {isWinner ? <Trophy className="text-gold-light" size={19} /> : <FlaskConical className="text-muted" size={18} />}
                      </div>
                      <h4 className="mt-4 text-xl font-black text-warm">{variant.subject}</h4>
                      <p className="mt-2 text-sm leading-7 text-muted">{variant.preheader}</p>
                      <p className="mt-3 text-sm font-black text-gold-light">CTA: {variant.ctaLabel}</p>

                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <MiniMetric icon={UsersRound} label="نمونه" value={formatNumber(variant.sampleSize)} />
                        <MiniMetric icon={FlaskConical} label="Open" value={`${getRate(variant.opens, variant.sampleSize)}%`} />
                        <MiniMetric icon={MousePointerClick} label="Click" value={`${getRate(variant.clicks, variant.sampleSize)}%`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Link href="/admin/newsletter/analytics" className="rounded-3xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40">
          <Trophy className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">رفتن به آنالیتیکس</h3>
          <p className="mt-2 text-sm leading-7 text-muted">بعد از انتخاب variant برنده، عملکرد شماره‌ها را در آنالیتیکس دنبال کنید.</p>
        </Link>
        <Link href="/api/admin/newsletter/experiments" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <FlaskConical className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">API آزمایش‌ها</h3>
          <p className="mt-2 text-sm leading-7 text-muted">خروجی آماده اتصال به provider ایمیل و سیستم experiment واقعی.</p>
        </Link>
      </div>
    </section>
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

function MiniMetric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-night/45 p-3">
      <Icon className="text-gold-light" size={16} />
      <p className="mt-2 text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-black text-warm">{value}</p>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
