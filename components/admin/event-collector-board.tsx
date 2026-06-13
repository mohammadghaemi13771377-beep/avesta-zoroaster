import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Database, Radio, ShieldCheck, TestTube2 } from "lucide-react";
import type { StoredClientEvent } from "@/lib/event-collector";
import { getEventCollectorSummary } from "@/lib/event-collector";

type EventCollectorBoardProps = {
  events: StoredClientEvent[];
};

export function EventCollectorBoard({ events }: EventCollectorBoardProps) {
  const summary = getEventCollectorSummary();

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">FIRST-PARTY EVENT COLLECTOR</p>
          <h2 className="mt-3 text-3xl font-black text-warm">کلکتور رویدادهای داخلی</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بخش نسخه dev/preview کلکتور رویدادهاست. در production همین قرارداد به جدول دیتابیس، warehouse و
            fan-out به PostHog/GA4 وصل می‌شود.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="Registered" value={String(summary.registeredEvents)} />
          <Metric label="Stored" value={String(summary.storedEvents)} />
          <Metric label="Unique" value={String(summary.uniqueReceivedEvents)} />
          <Metric label="Mode" value={summary.mode} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Info icon={Database} title="Endpoint" text="POST /api/events برای ثبت event و GET /api/events برای مشاهده ۵۰ event آخر." />
        <Info icon={ShieldCheck} title="Validation" text="event باید در ماتریس ثبت شده باشد؛ payloadهای ناشناخته sanitize می‌شوند." />
        <Info icon={TestTube2} title="QA" text="برای تست، از helper `trackEvent` یا ارسال مستقیم JSON به endpoint استفاده کنید." />
      </div>

      <div className="mt-6 rounded-3xl border border-gold/10 bg-night/55 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gold-light">
            <Radio size={20} />
            <h3 className="text-xl font-black text-warm">آخرین رویدادهای local</h3>
          </div>
          <Link href="/api/events" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light transition hover:bg-gold/10">
            API
            <ArrowLeft size={15} />
          </Link>
        </div>

        <div className="mt-5 grid gap-3">
          {events.length ? (
            events.map((event) => (
              <article key={event.id} className="rounded-2xl border border-gold/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-black text-warm" dir="ltr">{event.event}</p>
                  <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                    {event.route}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-6 text-muted" dir="ltr">
                  {JSON.stringify(event.payload)}
                </p>
                {event.warnings.length ? (
                  <p className="mt-2 text-xs leading-6 text-orange-100">{event.warnings.join(" / ")}</p>
                ) : null}
              </article>
            ))
          ) : (
            <p className="rounded-2xl border border-gold/10 bg-black/20 p-4 text-sm leading-7 text-muted">
              هنوز event محلی ثبت نشده است. بعد از اتصال `trackEvent` به CTAها، رویدادها اینجا دیده می‌شوند.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-black text-gold-light">{value}</p>
    </div>
  );
}

function Info({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-night/55 p-5">
      <Icon className="text-gold-light" size={22} />
      <h3 className="mt-3 text-lg font-black text-warm">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{text}</p>
    </div>
  );
}
