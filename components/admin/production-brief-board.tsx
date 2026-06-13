"use client";

import Link from "next/link";
import { ArrowLeft, ClipboardList, FileText, ImagePlus, Mic2, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { InventoryAssetType } from "@/lib/content-inventory";
import { inventoryAssetLabels } from "@/lib/content-inventory";
import type { ProductionBrief } from "@/lib/production-briefs";
import { getProductionBriefSummary } from "@/lib/production-briefs";

type ProductionBriefBoardProps = {
  briefs: ProductionBrief[];
};

const assetIcons: Record<InventoryAssetType, LucideIcon> = {
  text: FileText,
  image: ImagePlus,
  audio: Mic2,
  source: ShieldCheck,
  admin: Wrench,
};

export function ProductionBriefBoard({ briefs }: ProductionBriefBoardProps) {
  const summary = getProductionBriefSummary(briefs);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">BRIEF STUDIO</p>
          <h2 className="mt-3 text-3xl font-black text-warm">استودیوی Brief تولید</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد برای تسک‌های صف تولید، brief آماده می‌سازد: هدف، خروجی، استایل، معیار پذیرش و در صورت تصویر،
            prompt آماده تولید AI.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="Brief" value={String(summary.total)} />
          <Metric label="تصویر" value={String(summary.image)} />
          <Metric label="صوت" value={String(summary.audio)} />
          <Metric label="Prompt" value={String(summary.withPrompt)} />
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {briefs.map((brief) => {
          const Icon = assetIcons[brief.assetType];

          return (
            <article key={brief.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                    <Icon size={14} />
                    {inventoryAssetLabels[brief.assetType]}
                  </span>
                  <h3 className="mt-3 text-2xl font-black text-warm">{brief.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{brief.objective}</p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                  <ClipboardList className="mx-auto text-gold-light" size={20} />
                  <p className="mt-2 text-sm font-black text-warm">{brief.realmTitle}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                  <Info label="فرمت خروجی" value={brief.outputFormat} />
                  <Info label="راهنمای سبک" value={brief.styleGuide} />
                  {brief.recommendedPath ? <Info label="مسیر پیشنهادی" value={brief.recommendedPath} /> : null}
                </div>

                <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                  <p className="text-xs font-bold text-muted">معیار پذیرش</p>
                  <div className="mt-3 grid gap-2">
                    {brief.acceptanceCriteria.map((item) => (
                      <p key={item} className="rounded-xl border border-gold/10 bg-night/45 px-3 py-2 text-sm font-bold leading-7 text-warm">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {brief.prompt ? (
                <div className="mt-4 rounded-2xl border border-gold/10 bg-black/25 p-4">
                  <div className="flex items-center gap-2 text-gold-light">
                    <Sparkles size={17} />
                    <p className="text-sm font-black">AI Prompt</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-warm">{brief.prompt}</p>
                  <p className="mt-3 text-xs font-bold leading-6 text-muted">Negative: {brief.negativePrompt}</p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link href="/admin/production" className="rounded-3xl border border-gold/10 bg-gold/10 p-5 transition hover:border-gold/40">
          <ClipboardList className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">بازگشت به صف تولید</h3>
          <p className="mt-2 text-sm leading-7 text-muted">تسک‌ها، deadline و مالک هر دارایی را مدیریت کنید.</p>
        </Link>
        <Link href="/admin/production/review" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <ShieldCheck className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">دروازه تایید</h3>
          <p className="mt-2 text-sm leading-7 text-muted">کیفیت خروجی‌ها را قبل از ورود به سایت کنترل کنید.</p>
        </Link>
        <Link href="/admin/media" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <ImagePlus className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">بارگذاری رسانه</h3>
          <p className="mt-2 text-sm leading-7 text-muted">خروجی تصویر و صوت را به Media Asset وصل کنید.</p>
        </Link>
        <Link href="/api/admin/production/briefs" className="rounded-3xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40">
          <ArrowLeft className="text-gold-light" size={22} />
          <h3 className="mt-3 text-xl font-black text-warm">API Briefها</h3>
          <p className="mt-2 text-sm leading-7 text-muted">خروجی قابل اتصال به CMS، DAM یا ابزار مدیریت تسک.</p>
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
