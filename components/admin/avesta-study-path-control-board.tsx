import Link from "next/link";
import { ArrowLeft, CheckCircle2, Compass, ListChecks, ShieldAlert, Timer, UserRound } from "lucide-react";
import {
  getAvestaStudyPathControlSummary,
  studyPathStatusLabels,
  type AvestaStudyPathControlItem
} from "@/lib/avesta-study-path-control";

type AvestaStudyPathControlBoardProps = {
  items: AvestaStudyPathControlItem[];
};

const statusClass: Record<AvestaStudyPathControlItem["status"], string> = {
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  "needs-content": "border-gold/25 bg-gold/10 text-gold-light",
  "needs-media": "border-sky-300/25 bg-sky-300/10 text-sky-100",
  "needs-review": "border-red-300/25 bg-red-300/10 text-red-100"
};

export function AvestaStudyPathControlBoard({ items }: AvestaStudyPathControlBoardProps) {
  const summary = getAvestaStudyPathControlSummary(items);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">STUDY PATH CONTROL</p>
          <h1 className="mt-3 text-4xl font-black text-warm">کنترل مسیرهای شروع اوستا</h1>
          <p className="mt-4 max-w-3xl leading-8 text-muted">
            این بورد مسیرهای شروع مطالعه را برای تیم محصول، محتوا و رسانه قابل مدیریت می‌کند: آمادگی، مالک،
            کمبودها، چک‌لیست و اقدام بعدی هر مسیر.
          </p>
        </div>
        <Link
          href="/avesta"
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
        >
          مشاهده پورتال
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <Metric label="مسیرها" value={String(summary.total)} />
        <Metric label="آماده" value={String(summary.ready)} />
        <Metric label="بازبینی" value={String(summary.needsReview)} />
        <Metric label="میانگین آمادگی" value={`${summary.averageReadiness}%`} />
      </div>

      <div className="mt-6 rounded-3xl border border-gold/10 bg-royal/45 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-muted">اقدام بعدی پیشنهادی</p>
            <h2 className="mt-2 text-2xl font-black text-warm">{summary.nextItem.title}</h2>
            <p className="mt-2 leading-7 text-gold-light">{summary.nextItem.nextAction}</p>
          </div>
          <Link
            href={summary.nextItem.href}
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10"
          >
            باز کردن مسیر
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {items.map((item) => (
          <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass[item.status]}`}>
                    {studyPathStatusLabels[item.status]}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                    <UserRound size={13} />
                    {item.audience}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                    <Timer size={13} />
                    {item.duration}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.nextAction}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-5 py-4 text-center">
                <Compass className="mx-auto text-gold-light" size={22} />
                <p className="mt-2 text-xl font-black text-warm">{item.readiness}%</p>
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${item.readiness}%` }} />
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-2xl border border-gold/10 bg-royal/35 p-4">
                <div className="flex items-center gap-2 text-gold-light">
                  <ShieldAlert size={18} />
                  <h4 className="font-black text-warm">کمبودهای مسیر</h4>
                </div>
                <ul className="mt-3 grid gap-2 text-sm leading-7 text-muted">
                  {item.missing.map((missing) => (
                    <li key={missing}>- {missing}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-gold/10 bg-royal/35 p-4">
                <div className="flex items-center gap-2 text-gold-light">
                  <ListChecks size={18} />
                  <h4 className="font-black text-warm">چک‌لیست انتشار</h4>
                </div>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {item.checklist.map((check) => (
                    <div key={check.label} className="flex items-start gap-2 rounded-xl border border-gold/10 bg-night/42 p-3">
                      <CheckCircle2 className={check.done ? "mt-0.5 h-4 w-4 text-gold-light" : "mt-0.5 h-4 w-4 text-muted"} />
                      <span className="text-sm leading-6 text-muted">{check.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={item.href} className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night">
                مشاهده مسیر
                <ArrowLeft size={16} />
              </Link>
              <Link href="/admin/avesta" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-black text-gold-light">
                ویرایش محتوا
                <ArrowLeft size={16} />
              </Link>
            </div>
          </article>
        ))}
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
