"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, CalendarClock, CheckCircle2, Clock3, ListChecks, Send, ShieldAlert } from "lucide-react";
import type { NewsletterScheduleItem, NewsletterScheduleStatus } from "@/lib/newsletter-schedule";
import { getNewsletterScheduleSummary, newsletterScheduleStatusLabels } from "@/lib/newsletter-schedule";
import { newsletterStatusLabels } from "@/lib/newsletter-editions";
import { sendTimeRiskLabels } from "@/lib/newsletter-send-times";

type NewsletterScheduleBoardProps = {
  items: NewsletterScheduleItem[];
};

const statusClass: Record<NewsletterScheduleStatus, string> = {
  blocked: "border-red-300/25 bg-red-300/10 text-red-100",
  needs_review: "border-orange-300/25 bg-orange-300/10 text-orange-100",
  scheduled: "border-sky-300/25 bg-sky-300/10 text-sky-100",
  ready_to_send: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
};

export function NewsletterScheduleBoard({ items }: NewsletterScheduleBoardProps) {
  const summary = getNewsletterScheduleSummary(items);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">SEND QUEUE</p>
          <h2 className="mt-3 text-3xl font-black text-warm">تقویم ارسال و صف انتشار نورنامه</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این اتاق کنترل نشان می‌دهد هر نورنامه چه زمانی ارسال می‌شود، چه کسی مسئول آن است و قبل از ارسال
            کدام چک‌ها باید کامل شوند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <Metric label="شماره‌ها" value={String(summary.total)} />
          <Metric label="آماده" value={String(summary.readyToSend)} />
          <Metric label="زمان‌بندی" value={String(summary.scheduled)} />
          <Metric label="بازبینی" value={String(summary.needsReview)} />
          <Metric label="تکمیل" value={`${summary.completionRate}%`} />
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {items.map((item) => {
          const doneChecks = item.checklist.filter((check) => check.done).length;
          const completion = Math.round((doneChecks / item.checklist.length) * 100);

          return (
            <article key={item.editionId} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass[item.scheduleStatus]}`}>
                      {newsletterScheduleStatusLabels[item.scheduleStatus]}
                    </span>
                    <span className="rounded-full border border-gold/10 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                      {newsletterStatusLabels[item.editionStatus]}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-warm">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.note}</p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                  <Send className="mx-auto text-gold-light" size={20} />
                  <p className="mt-2 text-sm font-black text-warm">{item.owner}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-3xl border border-gold/10 bg-royal/45 p-5">
                  <div className="flex items-center gap-2 text-gold-light">
                    <CalendarClock size={18} />
                    <span className="text-sm font-black">زمان پیشنهادی ارسال</span>
                  </div>
                  <h4 className="mt-3 text-xl font-black text-warm">
                    {item.sendSlot ? `${item.sendSlot.dayLabel} / ${item.sendSlot.timeLabel}` : "نیازمند تنظیم"}
                  </h4>
                  <p className="mt-2 text-xs font-bold text-muted">{item.sendSlot?.timezone ?? "Asia/Tehran"}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <MiniMetric icon={Clock3} label="Score" value={`${item.score}%`} />
                    <MiniMetric icon={CheckCircle2} label="Open" value={`${item.sendSlot?.predictedOpenRate ?? 0}%`} />
                    <MiniMetric icon={ShieldAlert} label="Risk" value={item.sendSlot ? sendTimeRiskLabels[item.sendSlot.risk] : "نامشخص"} />
                  </div>
                </div>

                <div className="rounded-3xl border border-gold/10 bg-royal/45 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-gold-light">
                      <ListChecks size={18} />
                      <span className="text-sm font-black">چک‌لیست قبل ارسال</span>
                    </div>
                    <span className="rounded-full border border-gold/20 bg-night/55 px-3 py-1 text-xs font-black text-warm">
                      {completion}% کامل
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 md:grid-cols-2">
                    {item.checklist.map((check) => (
                      <div key={check.label} className="flex items-center gap-2 rounded-2xl border border-gold/10 bg-night/45 p-3">
                        <span
                          className={
                            check.done
                              ? "grid h-6 w-6 place-items-center rounded-full bg-emerald-300/20 text-emerald-100"
                              : "grid h-6 w-6 place-items-center rounded-full bg-orange-300/15 text-orange-100"
                          }
                        >
                          <CheckCircle2 size={14} />
                        </span>
                        <p className="text-sm font-bold leading-6 text-warm">{check.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link href="/admin/newsletter/send-times" className="rounded-3xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40">
          <CalendarClock className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">بهینه‌سازی زمان</h3>
          <p className="mt-2 text-sm leading-7 text-muted">پیشنهادهای open/click را قبل از ارسال نهایی ببینید.</p>
        </Link>
        <Link href="/newsletter/html-export" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <Send className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">خروجی HTML</h3>
          <p className="mt-2 text-sm leading-7 text-muted">قالب آماده provider ایمیل را برای شماره‌ها بردارید.</p>
        </Link>
        <Link href="/api/admin/newsletter/schedule" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <ArrowLeft className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">API صف ارسال</h3>
          <p className="mt-2 text-sm leading-7 text-muted">خروجی آماده اتصال به worker و job scheduler.</p>
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
