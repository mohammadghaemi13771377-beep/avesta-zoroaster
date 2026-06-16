"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ClipboardCheck, Eye, Filter, GalleryHorizontalEnd, ImagePlus, ShieldCheck } from "lucide-react";
import type { ExhibitionControlItem, ExhibitionReadinessStatus } from "@/lib/exhibition-control";
import {
  exhibitionReadinessLabels,
  exhibitionReadinessTone,
  getExhibitionControlSummary,
} from "@/lib/exhibition-control";

type ExhibitionControlBoardProps = {
  items: ExhibitionControlItem[];
};

const filters: Array<["all" | ExhibitionReadinessStatus, string]> = [
  ["all", "همه"],
  ["ready", "آماده"],
  ["needs-media", "رسانه"],
  ["needs-curation", "کیوریشن"],
  ["needs-review", "بازبینی"],
];

export function ExhibitionControlBoard({ items }: ExhibitionControlBoardProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | ExhibitionReadinessStatus>("all");
  const summary = getExhibitionControlSummary(items);
  const filteredItems = useMemo(
    () => (activeFilter === "all" ? items : items.filter((item) => item.status === activeFilter)),
    [activeFilter, items],
  );

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">EXHIBITION CONTROL</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-warm">کنسول مدیریت نمایشگاه‌ها</h1>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد برای تیم محصول، محتوا، پژوهش و رسانه است تا هر نمایشگاه موضوعی از نظر روایت، تصویر،
            مسیرهای مرتبط، ریسک و آماده‌بودن برای انتشار کنترل شود.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="نمایشگاه" value={String(summary.total)} />
          <Metric label="آماده" value={String(summary.ready)} />
          <Metric label="رسانه" value={String(summary.needsMedia)} />
          <Metric label="میانگین" value={`${summary.averageCompletion}%`} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setActiveFilter(value)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition ${
              activeFilter === value
                ? "border-gold/45 bg-gold/15 text-gold-light"
                : "border-gold/10 bg-night/45 text-muted hover:border-gold/30 hover:text-warm"
            }`}
          >
            <Filter size={14} />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {filteredItems.map((item) => (
          <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${exhibitionReadinessTone[item.status]}`}>
                  <GalleryHorizontalEnd size={14} />
                  {exhibitionReadinessLabels[item.status]}
                </span>
                <h2 className="mt-3 text-2xl font-black text-warm">{item.title}</h2>
                <p className="mt-2 text-sm font-bold text-gold-light">{item.owner}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-5 py-4 text-center">
                <p className="text-3xl font-black text-gold-light">{item.completion}%</p>
                <p className="mt-1 text-xs font-bold text-muted">آمادگی</p>
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${item.completion}%` }} />
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <Need icon={<ImagePlus size={17} />} label="رسانه" value={item.mediaNeed} />
              <Need icon={<ClipboardCheck size={17} />} label="محتوا" value={item.contentNeed} />
              <Need icon={<ShieldCheck size={17} />} label="محصول" value={item.productNeed} />
            </div>

            <div className="mt-4 rounded-2xl border border-gold/10 bg-black/25 p-4">
              <p className="text-xs font-bold text-muted">ریسک انتشار</p>
              <p className="mt-2 text-sm font-bold leading-7 text-warm">{item.risk}</p>
              <p className="mt-3 text-xs font-bold text-gold-light">اقدام بعدی: {item.nextAction}</p>
            </div>

            <div className="mt-4 grid gap-2">
              {item.checklist.map((check) => (
                <p key={check} className="rounded-xl border border-gold/10 bg-royal/45 px-3 py-2 text-sm font-bold leading-7 text-muted">
                  {check}
                </p>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={item.publicHref} className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-black text-night transition hover:bg-gold-light">
                <Eye size={14} />
                دیدن نمایشگاه
              </Link>
              <Link href="/admin/visual-assets" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-xs font-black text-gold-light transition hover:border-gold/45">
                دارایی‌های تصویری
                <ArrowLeft size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link href="/exhibitions" className="rounded-3xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40">
          <GalleryHorizontalEnd className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">صفحه عمومی</h3>
          <p className="mt-2 text-sm leading-7 text-muted">نمایشگاه‌ها را از نگاه کاربر نهایی بررسی کنید.</p>
        </Link>
        <Link href="/admin/visual-assets" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <ImagePlus className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">اتاق تصویر</h3>
          <p className="mt-2 text-sm leading-7 text-muted">Hero و thumbnail آثار را به چرخه تولید رسانه وصل کنید.</p>
        </Link>
        <Link href="/api/admin/exhibitions" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <ArrowLeft className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">API ادمین</h3>
          <p className="mt-2 text-sm leading-7 text-muted">خروجی آماده برای داشبوردهای محصول و CMS آینده.</p>
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

function Need({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
      <div className="flex items-center gap-2 text-gold-light">
        {icon}
        <p className="text-xs font-black">{label}</p>
      </div>
      <p className="mt-3 text-xs font-bold leading-6 text-muted">{value}</p>
    </div>
  );
}
