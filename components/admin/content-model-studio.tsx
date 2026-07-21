"use client";

import Link from "next/link";
import { Braces, CheckCircle2, DatabaseZap, FileJson2, Layers3, Lock, Route, ShieldCheck } from "lucide-react";

import type { AdminContentModel } from "@/lib/admin-content-models";
import { getAdminContentModelSummary } from "@/lib/admin-content-models";

type ContentModelStudioProps = {
  models: AdminContentModel[];
};

const statusLabels: Record<AdminContentModel["cmsStatus"], string> = {
  ready: "آماده",
  partial: "نیمه‌آماده",
  planned: "در برنامه",
};

const statusClasses: Record<AdminContentModel["cmsStatus"], string> = {
  ready: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  partial: "border-gold/30 bg-gold/10 text-gold-light",
  planned: "border-sky-300/30 bg-sky-300/10 text-sky-100",
};

const ownerLabels: Record<AdminContentModel["ownerTeam"], string> = {
  content: "محتوا",
  research: "پژوهش",
  media: "رسانه",
  commerce: "فروشگاه",
  engineering: "فنی",
};

export function ContentModelStudio({ models }: ContentModelStudioProps) {
  const summary = getAdminContentModelSummary(models);

  return (
    <section className="grid gap-6">
      <div className="lux-frame overflow-hidden p-6">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="gold-text text-xs font-semibold tracking-[0.24em]">CONTENT MODEL STUDIO</p>
            <h1 className="mt-3 text-4xl font-black leading-[1.35] text-warm">اتاق مدل‌های محتوایی سایت</h1>
            <p className="mt-3 max-w-3xl text-base leading-8 text-muted">
              اینجا قرارداد محتوایی AVESTA-ZOROASTER دیده می‌شود: مقاله، بخش اوستا، فصل، بند، واژه‌نامه، رسانه،
              نمایشگاه و محصول. این لایه کمک می‌کند پنل ادمین آینده بدون آشفتگی به دیتابیس، CMS و storage وصل شود.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <Metric label="مدل" value={String(summary.total)} />
            <Metric label="نیمه‌آماده" value={String(summary.partial)} />
            <Metric label="آماده" value={String(summary.ready)} />
            <Metric label="در برنامه" value={String(summary.planned)} />
            <Metric label="فیلد ضروری" value={String(summary.requiredFields)} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 rounded-3xl border border-gold/10 bg-royal/35 p-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-xl font-black text-warm">خروجی قابل اتصال به CMS</h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              این قرارداد هم برای ساخت فرم‌های ادمین استفاده می‌شود، هم برای مهاجرت آینده به Prisma، Strapi،
              Directus یا هر CMS اختصاصی.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/api/admin/content-models"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-4 py-3 text-sm font-black text-black transition hover:bg-gold-light"
            >
              <FileJson2 size={16} />
              JSON API
            </Link>
            <Link
              href="/admin/content-operations"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/20 px-4 py-3 text-sm font-black text-gold-light transition hover:border-gold/50"
            >
              <Layers3 size={16} />
              عملیات محتوا
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        {models.map((model) => (
          <article key={model.id} className="lux-frame p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusClasses[model.cmsStatus]}`}>
                    {statusLabels[model.cmsStatus]}
                  </span>
                  <span className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                    تیم {ownerLabels[model.ownerTeam]}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-black text-warm">{model.title}</h2>
                <p className="mt-2 max-w-4xl text-sm leading-7 text-muted">{model.description}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4 text-center">
                <DatabaseZap className="mx-auto text-gold-light" size={22} />
                <p className="mt-2 text-sm font-black text-warm">{model.fields.length} فیلد</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="grid gap-3">
                <Info icon={Route} label="مسیر ادمین" value={model.adminRoute} href={model.adminRoute} />
                <Info icon={Braces} label="API" value={model.apiRoute} href={model.apiRoute.startsWith("/api/") ? model.apiRoute : undefined} />
                <Info icon={ShieldCheck} label="استراتژی ذخیره‌سازی" value={model.storageStrategy} />
              </div>

              <div className="rounded-3xl border border-gold/10 bg-royal/45 p-4">
                <p className="text-sm font-black text-gold-light">فیلدهای مدل</p>
                <div className="mt-3 grid gap-2">
                  {model.fields.map((field) => (
                    <div key={field.name} className="rounded-2xl border border-gold/10 bg-night/45 p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-black text-warm">{field.label}</p>
                          <p className="mt-1 text-xs font-bold text-muted">{field.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full border border-gold/10 px-2 py-1 text-xs font-black text-gold-light">{field.type}</span>
                          {field.required ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2 py-1 text-xs font-black text-emerald-100">
                              <CheckCircle2 size={12} />
                              ضروری
                            </span>
                          ) : (
                            <span className="rounded-full border border-white/10 px-2 py-1 text-xs font-black text-muted">اختیاری</span>
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-xs font-bold leading-6 text-muted">{field.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-3xl border border-gold/10 bg-night/55 p-5">
        <div className="flex items-start gap-3">
          <Lock className="mt-1 text-gold-light" size={22} />
          <div>
            <h2 className="text-xl font-black text-warm">گام بعدی برای واقعی‌تر شدن پنل</h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              بعد از این قرارداد، مرحله‌ی بعد ساخت فرم داینامیک است: ادمین نوع محتوا را انتخاب کند، فرم همان مدل ساخته شود،
              وضعیت draft/review/published تنظیم شود و ذخیره‌سازی فعلاً local fallback و بعداً database باشد.
            </p>
          </div>
        </div>
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

function Info({ icon: Icon, label, value, href }: { icon: typeof Route; label: string; value: string; href?: string }) {
  const content = (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4 transition hover:border-gold/35">
      <div className="flex items-center gap-2 text-gold-light">
        <Icon size={17} />
        <p className="text-xs font-black">{label}</p>
      </div>
      <p className="mt-2 text-sm font-bold leading-7 text-warm">{value}</p>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
