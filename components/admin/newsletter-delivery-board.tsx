"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  MailCheck,
  MailWarning,
  MousePointerClick,
  RotateCw,
  ShieldCheck,
} from "lucide-react";
import type {
  NewsletterDeliveryEvent,
  NewsletterDeliveryEventType,
  NewsletterDeliveryHealth,
  NewsletterDeliveryReport,
} from "@/lib/newsletter-delivery";
import {
  getNewsletterDeliveryEditionTitle,
  getNewsletterDeliverySummary,
  newsletterDeliveryEventLabels,
  newsletterDeliveryHealthLabels,
} from "@/lib/newsletter-delivery";
import { newsletterAnalytics, getRate } from "@/lib/newsletter-analytics";

type NewsletterDeliveryBoardProps = {
  reports: NewsletterDeliveryReport[];
  events: NewsletterDeliveryEvent[];
};

const healthClass: Record<NewsletterDeliveryHealth, string> = {
  healthy: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  watch: "border-gold/20 bg-gold/10 text-gold-light",
  at_risk: "border-red-300/25 bg-red-300/10 text-red-100",
};

const eventClass: Record<NewsletterDeliveryEventType, string> = {
  sent: "border-sky-300/20 bg-sky-300/10 text-sky-100",
  delivered: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  opened: "border-gold/20 bg-gold/10 text-gold-light",
  clicked: "border-gold/25 bg-gold/15 text-gold-light",
  bounced: "border-orange-300/25 bg-orange-300/10 text-orange-100",
  unsubscribed: "border-red-300/25 bg-red-300/10 text-red-100",
};

export function NewsletterDeliveryBoard({ reports, events }: NewsletterDeliveryBoardProps) {
  const summary = getNewsletterDeliverySummary(reports);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">DELIVERY MONITOR</p>
          <h2 className="mt-3 text-3xl font-black text-warm">پایش تحویل نورنامه</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد بعد از ارسال، سلامت تحویل، bounce، complaint، retry و eventهای مهم نورنامه را برای تیم رشد و
            محتوا قابل پیگیری می‌کند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <Metric label="Delivery" value={`${summary.deliveryRate}%`} />
          <Metric label="Bounce" value={`${summary.bounceRate}%`} />
          <Metric label="Complaint" value={`${summary.complaintRate}%`} />
          <Metric label="Retry" value={formatNumber(summary.retries)} />
          <Metric label="پرریسک" value={String(summary.atRisk)} />
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {reports.map((report) => {
          const metric = newsletterAnalytics.find((item) => item.editionId === report.editionId);

          return (
            <article key={report.editionId} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${healthClass[report.health]}`}>
                    {newsletterDeliveryHealthLabels[report.health]}
                  </span>
                  <h3 className="mt-4 text-2xl font-black text-warm">
                    {getNewsletterDeliveryEditionTitle(report.editionId)}
                  </h3>
                  <p className="mt-2 text-xs font-bold text-gold-light">{report.provider}</p>
                </div>
                {report.health === "at_risk" ? (
                  <AlertTriangle className="text-red-100" size={24} />
                ) : (
                  <ShieldCheck className="text-gold-light" size={24} />
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <MiniMetric icon={MailCheck} label="تحویل" value={`${getRate(report.delivered, metric?.sent ?? 0)}%`} />
                <MiniMetric icon={MailWarning} label="Bounce" value={`${getRate(report.bounced, metric?.sent ?? 0)}%`} />
                <MiniMetric icon={RotateCw} label="Retry" value={formatNumber(report.retries)} />
                <MiniMetric icon={MousePointerClick} label="Click" value={`${getRate(metric?.clicks ?? 0, metric?.sent ?? 0)}%`} />
              </div>

              <div className="mt-4 rounded-2xl border border-gold/10 bg-royal/45 p-4">
                <p className="text-xs font-bold text-muted">اقدام پیشنهادی</p>
                <p className="mt-2 text-sm font-bold leading-7 text-warm">{report.action}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 rounded-3xl border border-gold/10 bg-royal/45 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="gold-text text-xs font-semibold tracking-[0.2em]">EVENT STREAM</p>
            <h3 className="mt-2 text-2xl font-black text-warm">رویدادهای آخر ارسال</h3>
          </div>
          <Link
            href="/api/admin/newsletter/delivery"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
          >
            API مانیتور
            <ArrowLeft size={16} />
          </Link>
        </div>

        <div className="mt-5 grid gap-3">
          {events.map((event) => (
            <div key={event.id} className="grid gap-3 rounded-2xl border border-gold/10 bg-night/45 p-4 md:grid-cols-[160px_1fr_110px]">
              <span className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${eventClass[event.type]}`}>
                {newsletterDeliveryEventLabels[event.type]}
              </span>
              <div>
                <p className="text-sm font-black text-warm">{getNewsletterDeliveryEditionTitle(event.editionId)}</p>
                <p className="mt-1 text-xs font-bold leading-6 text-muted">
                  {event.contact} | {event.detail}
                </p>
              </div>
              <p className="text-sm font-black text-gold-light md:text-left">{event.timeLabel}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link href="/admin/newsletter/schedule" className="rounded-3xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40">
          <CheckCircle2 className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">بازگشت به صف ارسال</h3>
          <p className="mt-2 text-sm leading-7 text-muted">قبل از ارسال بعدی، چک‌لیست و وضعیت زمان‌بندی را بررسی کنید.</p>
        </Link>
        <Link href="/admin/newsletter/analytics" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <MousePointerClick className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">آنالیتیکس رفتار</h3>
          <p className="mt-2 text-sm leading-7 text-muted">Open، click، conversion و top link را کنار delivery ببینید.</p>
        </Link>
        <Link href="/newsletter/preferences" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <MailWarning className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">تنظیمات مخاطب</h3>
          <p className="mt-2 text-sm leading-7 text-muted">لغو عضویت و انتخاب موضوع برای کاهش complaint و bounce.</p>
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
