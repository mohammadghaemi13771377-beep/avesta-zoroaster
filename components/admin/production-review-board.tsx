"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, ArrowLeft, CheckCircle2, FileText, ImagePlus, Mic2, ShieldCheck, Wrench } from "lucide-react";
import type { InventoryAssetType } from "@/lib/content-inventory";
import { inventoryAssetLabels } from "@/lib/content-inventory";
import type { ProductionReviewItem, ProductionReviewStatus } from "@/lib/production-review";
import { getProductionReviewSummary, productionReviewStatusLabels } from "@/lib/production-review";

type ProductionReviewBoardProps = {
  items: ProductionReviewItem[];
};

const assetIcons: Record<InventoryAssetType, LucideIcon> = {
  text: FileText,
  image: ImagePlus,
  audio: Mic2,
  source: ShieldCheck,
  admin: Wrench,
};

const statusClass: Record<ProductionReviewStatus, string> = {
  approved: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  changes_requested: "border-gold/20 bg-gold/10 text-gold-light",
  blocked: "border-red-300/25 bg-red-300/10 text-red-100",
};

export function ProductionReviewBoard({ items }: ProductionReviewBoardProps) {
  const summary = getProductionReviewSummary(items);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">REVIEW GATE</p>
          <h2 className="mt-3 text-3xl font-black text-warm">دروازه تایید تولید</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد کیفیت خروجی‌های تولید را قبل از ورود به سایت کنترل می‌کند: تایید، اصلاح، blocker و تصمیم انتشار.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <Metric label="Review" value={String(summary.total)} />
          <Metric label="تایید" value={String(summary.approved)} />
          <Metric label="اصلاح" value={String(summary.changesRequested)} />
          <Metric label="مسدود" value={String(summary.blocked)} />
          <Metric label="کیفیت" value={`${summary.averageScore}%`} />
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-gold/10 bg-royal/45 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-muted">مهم‌ترین بازبینی بعدی</p>
            <h3 className="mt-1 text-xl font-black text-warm">{summary.nextReview?.title ?? "بازبینی باقی نمانده"}</h3>
          </div>
          <Link
            href="/admin/production/briefs"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
          >
            دیدن Briefها
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {items.map((item) => {
          const Icon = assetIcons[item.assetType];

          return (
            <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                      <Icon size={13} />
                      {inventoryAssetLabels[item.assetType]}
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClass[item.status]}`}>
                      {productionReviewStatusLabels[item.status]}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-warm">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.publishDecision}</p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                  {item.status === "approved" ? (
                    <CheckCircle2 className="mx-auto text-emerald-100" size={20} />
                  ) : (
                    <AlertTriangle className="mx-auto text-gold-light" size={20} />
                  )}
                  <p className="mt-2 text-sm font-black text-warm">{item.qualityScore}%</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <Info label="قلمرو" value={item.realmTitle} />
                <Info label="بازبین" value={item.reviewer} />
                <Info label="اصلاح ضروری" value={item.requiredFix} />
              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {item.issues.map((issue) => (
                  <p key={issue} className="rounded-2xl border border-gold/10 bg-royal/45 p-3 text-sm font-bold leading-7 text-warm">
                    {issue}
                  </p>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link href="/admin/production" className="rounded-3xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40">
          <Wrench className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">صف تولید</h3>
          <p className="mt-2 text-sm leading-7 text-muted">تسک‌های تولید و deadline را قبل از بازبینی ببینید.</p>
        </Link>
        <Link href="/admin/media" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <ImagePlus className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">رسانه</h3>
          <p className="mt-2 text-sm leading-7 text-muted">فایل‌های تاییدشده را وارد Media Asset کنید.</p>
        </Link>
        <Link href="/api/admin/production/review" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <ArrowLeft className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">API Review</h3>
          <p className="mt-2 text-sm leading-7 text-muted">خروجی قابل اتصال به CMS، DAM و workflow تایید.</p>
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
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-black leading-6 text-warm">{value}</p>
    </div>
  );
}
