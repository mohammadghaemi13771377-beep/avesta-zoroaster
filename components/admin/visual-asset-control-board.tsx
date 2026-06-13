"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clipboard, Eye, Filter, ImagePlus, Palette, Sparkles, UploadCloud } from "lucide-react";
import type { VisualAssetItem, VisualAssetStatus } from "@/lib/visual-asset-control";
import { getVisualAssetSummary, visualAssetStatusLabels, visualAssetStatusTone } from "@/lib/visual-asset-control";

type VisualAssetControlBoardProps = {
  items: VisualAssetItem[];
};

const filters: Array<["all" | VisualAssetStatus, string]> = [
  ["all", "همه"],
  ["needs-generation", "تولید"],
  ["needs-upload", "آپلود"],
  ["prompt-ready", "Prompt"],
  ["review-ready", "Review"],
];

export function VisualAssetControlBoard({ items }: VisualAssetControlBoardProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | VisualAssetStatus>("all");
  const summary = getVisualAssetSummary(items);
  const filteredItems = useMemo(
    () => (activeFilter === "all" ? items : items.filter((item) => item.status === activeFilter)),
    [activeFilter, items],
  );

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">AI ASSET CONTROL</p>
          <h2 className="mt-3 text-3xl font-black text-warm">اتاق کنترل تصویرهای AI</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این صفحه برای تیم رسانه و دیزاین ساخته شده تا تصویرهای سینمایی هر بخش، prompt، نسبت تصویر، مسیر فایل،
            وضعیت تولید و اقدام بعدی یکجا دیده شود.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="Asset" value={String(summary.total)} />
          <Metric label="تولید" value={String(summary.needsGeneration)} />
          <Metric label="آپلود" value={String(summary.needsUpload)} />
          <Metric label="Review" value={String(summary.reviewReady)} />
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
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${
                    visualAssetStatusTone[item.status]
                  }`}
                >
                  <Sparkles size={14} />
                  {visualAssetStatusLabels[item.status]}
                </span>
                <h3 className="mt-3 text-2xl font-black text-warm">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.usage}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <Palette className="mx-auto text-gold-light" size={20} />
                <p className="mt-2 text-sm font-black text-warm">{item.ratio}</p>
                <p className="text-xs font-bold text-muted">{item.category}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                <Info label="مقصد" value={item.destination} />
                <Info label="مالک" value={item.owner} />
                <Info label="حال‌وهوا" value={item.mood} />
                <Info label="مسیر پیشنهادی" value={item.recommendedPath} />
              </div>

              <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                <p className="text-xs font-bold text-muted">چک‌لیست خروجی</p>
                <div className="mt-3 grid gap-2">
                  {item.checklist.map((check) => (
                    <p key={check} className="rounded-xl border border-gold/10 bg-night/45 px-3 py-2 text-sm font-bold leading-7 text-warm">
                      {check}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-gold/10 bg-black/25 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-gold-light">
                  <ImagePlus size={17} />
                  <p className="text-sm font-black">Prompt تولید تصویر</p>
                </div>
                <button
                  type="button"
                  onClick={() => void navigator.clipboard?.writeText(item.prompt)}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-xs font-black text-gold-light transition hover:border-gold/45"
                >
                  <Clipboard size={14} />
                  کپی Prompt
                </button>
              </div>
              <p className="mt-3 text-sm leading-7 text-warm">{item.prompt}</p>
              <p className="mt-3 text-xs font-bold leading-6 text-muted">Negative: {item.negativePrompt}</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/10 bg-gold/5 px-4 py-3">
              <p className="text-sm font-bold leading-7 text-warm">{item.nextAction}</p>
              <div className="flex flex-wrap gap-2">
                <Link href={item.pageHref} className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-3 py-2 text-xs font-black text-gold-light transition hover:border-gold/45">
                  <Eye size={14} />
                  صفحه مقصد
                </Link>
                <Link href="/admin/media" className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-3 py-2 text-xs font-black text-gold-light transition hover:border-gold/45">
                  <UploadCloud size={14} />
                  Media
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link href="/admin/production/briefs" className="rounded-3xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40">
          <Sparkles className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">Brief تولید</h3>
          <p className="mt-2 text-sm leading-7 text-muted">پرامپت‌ها و معیار پذیرش را از Brief Studio ادامه دهید.</p>
        </Link>
        <Link href="/admin/production/review" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <Eye className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">Review Gate</h3>
          <p className="mt-2 text-sm leading-7 text-muted">خروجی نهایی را قبل از انتشار کنترل کیفیت کنید.</p>
        </Link>
        <Link href="/api/admin/visual-assets" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <ArrowLeft className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">API دارایی‌ها</h3>
          <p className="mt-2 text-sm leading-7 text-muted">خروجی آماده اتصال به DAM، CMS یا ابزار مدیریت تولید.</p>
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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 rounded-xl border border-gold/10 bg-night/45 px-3 py-2">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-bold leading-6 text-gold-light">{value}</p>
    </div>
  );
}
