"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, CalendarClock, Clock3, MousePointerClick, ShieldCheck, Sparkles } from "lucide-react";
import type { NewsletterSendTimeSlot, SendTimeRisk } from "@/lib/newsletter-send-times";
import {
  getBestSendTimeForEdition,
  getSendTimeEditionTitle,
  getSendTimeScore,
  getSendTimeSummary,
  sendTimeRiskLabels,
} from "@/lib/newsletter-send-times";

type NewsletterSendTimeBoardProps = {
  slots: NewsletterSendTimeSlot[];
};

const riskClass: Record<SendTimeRisk, string> = {
  low: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  medium: "border-gold/20 bg-gold/10 text-gold-light",
  high: "border-orange-300/25 bg-orange-300/10 text-orange-100",
};

export function NewsletterSendTimeBoard({ slots }: NewsletterSendTimeBoardProps) {
  const summary = getSendTimeSummary(slots);
  const editionIds = Array.from(new Set(slots.map((slot) => slot.editionId)));

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">SEND-TIME OPTIMIZER</p>
          <h2 className="mt-3 text-3xl font-black text-warm">بهینه‌ساز زمان ارسال خبرنامه</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد زمان‌های پیشنهادی ارسال نورنامه را بر اساس نرخ باز شدن، کلیک، ریسک و مناسبت مقایسه می‌کند.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="Slot" value={String(summary.totalSlots)} />
          <Metric label="بهترین‌ها" value={String(summary.bestSlots)} />
          <Metric label="Open میانگین" value={`${summary.averageOpen}%`} />
          <Metric label="Click میانگین" value={`${summary.averageClick}%`} />
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {editionIds.map((editionId) => {
          const editionSlots = slots.filter((slot) => slot.editionId === editionId);
          const best = getBestSendTimeForEdition(editionId, slots);

          return (
            <article key={editionId} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                    {getSendTimeEditionTitle(editionId)}
                  </span>
                  <h3 className="mt-3 text-2xl font-black text-warm">پیشنهاد زمان ارسال</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    بهترین گزینه فعلی: {best?.dayLabel} ساعت {best?.timeLabel}
                  </p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                  <Sparkles className="mx-auto text-gold-light" size={20} />
                  <p className="mt-2 text-sm font-black text-warm">Score {best ? getSendTimeScore(best) : 0}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {editionSlots.map((slot) => {
                  const isBest = best?.id === slot.id;

                  return (
                    <div
                      key={slot.id}
                      className={
                        isBest
                          ? "rounded-3xl border border-gold/35 bg-gold/10 p-5"
                          : "rounded-3xl border border-gold/10 bg-royal/45 p-5"
                      }
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className={`rounded-full border px-3 py-1 text-xs font-black ${riskClass[slot.risk]}`}>
                          {sendTimeRiskLabels[slot.risk]}
                        </span>
                        {isBest ? (
                          <span className="rounded-full bg-gold px-3 py-1 text-xs font-black text-night">پیشنهاد برتر</span>
                        ) : null}
                      </div>
                      <h4 className="mt-4 text-xl font-black text-warm">
                        {slot.dayLabel} / {slot.timeLabel}
                      </h4>
                      <p className="mt-2 text-xs font-bold text-gold-light">{slot.timezone}</p>
                      <p className="mt-3 text-sm leading-7 text-muted">{slot.reason}</p>

                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <MiniMetric icon={Clock3} label="Score" value={`${getSendTimeScore(slot)}%`} />
                        <MiniMetric icon={CalendarClock} label="Open" value={`${slot.predictedOpenRate}%`} />
                        <MiniMetric icon={MousePointerClick} label="Click" value={`${slot.predictedClickRate}%`} />
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
        <Link href="/admin/newsletter/experiments" className="rounded-3xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40">
          <ShieldCheck className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">هماهنگ با A/B Lab</h3>
          <p className="mt-2 text-sm leading-7 text-muted">ابتدا variant برنده را انتخاب کنید، بعد بهترین زمان ارسال را اعمال کنید.</p>
        </Link>
        <Link href="/api/admin/newsletter/send-times" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <CalendarClock className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">API زمان ارسال</h3>
          <p className="mt-2 text-sm leading-7 text-muted">خروجی آماده اتصال به scheduled send و provider ایمیل.</p>
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
