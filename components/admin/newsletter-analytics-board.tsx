"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, BarChart3, MailOpen, MousePointerClick, TrendingDown, TrendingUp, UsersRound } from "lucide-react";
import { useMemo } from "react";
import type { NewsletterEdition } from "@/lib/newsletter-editions";
import type { NewsletterEditionAnalytics, NewsletterMetricTrend } from "@/lib/newsletter-analytics";
import { getNewsletterAnalyticsSummary, getRate } from "@/lib/newsletter-analytics";

type NewsletterAnalyticsBoardProps = {
  editions: NewsletterEdition[];
  metrics: NewsletterEditionAnalytics[];
};

const trendLabel: Record<NewsletterMetricTrend, string> = {
  up: "رو به رشد",
  down: "نیازمند بهینه‌سازی",
  flat: "پایدار",
};

const trendClass: Record<NewsletterMetricTrend, string> = {
  up: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  down: "border-orange-300/25 bg-orange-300/10 text-orange-100",
  flat: "border-gold/20 bg-gold/10 text-gold-light",
};

export function NewsletterAnalyticsBoard({ editions, metrics }: NewsletterAnalyticsBoardProps) {
  const summary = useMemo(() => getNewsletterAnalyticsSummary(metrics), [metrics]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">NEWSLETTER ANALYTICS</p>
          <h2 className="mt-3 text-3xl font-black text-warm">آنالیتیکس خبرنامه روشنایی</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد نرخ باز شدن، کلیک، تبدیل و لغو عضویت شماره‌های نورنامه را برای تصمیم‌گیری محصول و محتوا نشان می‌دهد.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="ارسال" value={formatNumber(summary.sent)} />
          <Metric label="Open" value={`${summary.openRate}%`} />
          <Metric label="Click" value={`${summary.clickRate}%`} />
          <Metric label="لغو" value={`${summary.unsubscribeRate}%`} />
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {metrics.map((metric) => {
          const edition = editions.find((item) => item.id === metric.editionId);

          return (
            <article key={metric.editionId} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${trendClass[metric.trend]}`}>
                    {trendLabel[metric.trend]}
                  </span>
                  <h3 className="mt-4 text-2xl font-black text-warm">{edition?.title ?? metric.editionId}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{edition?.subtitle}</p>
                </div>
                {metric.trend === "down" ? (
                  <TrendingDown className="text-orange-100" size={24} />
                ) : (
                  <TrendingUp className="text-gold-light" size={24} />
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <MiniMetric icon={UsersRound} label="ارسال" value={formatNumber(metric.sent)} />
                <MiniMetric icon={MailOpen} label="باز شدن" value={`${getRate(metric.opens, metric.sent)}%`} />
                <MiniMetric icon={MousePointerClick} label="کلیک" value={`${getRate(metric.clicks, metric.sent)}%`} />
                <MiniMetric icon={BarChart3} label="تبدیل" value={`${getRate(metric.conversions, metric.sent)}%`} />
              </div>

              <div className="mt-4 rounded-2xl border border-gold/10 bg-royal/45 p-4">
                <p className="text-xs font-bold text-muted">Top Link</p>
                <p className="mt-1 text-sm font-black text-gold-light">{metric.topLink}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-warm/10">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${Math.min(getRate(metric.clicks, metric.sent), 100)}%` }} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Link href="/admin/newsletter" className="rounded-3xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40">
          <MailOpen className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">بازگشت به پنل خبرنامه</h3>
          <p className="mt-2 text-sm leading-7 text-muted">مدیریت شماره‌ها، CTA، لینک‌ها و وضعیت آماده‌سازی نورنامه.</p>
        </Link>
        <Link href="/api/admin/newsletter/analytics" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <BarChart3 className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">API آنالیتیکس</h3>
          <p className="mt-2 text-sm leading-7 text-muted">خروجی آماده اتصال به provider ایمیل، analytics و داشبورد محصول.</p>
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
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
      <Icon className="text-gold-light" size={18} />
      <p className="mt-2 text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-lg font-black text-warm">{value}</p>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
