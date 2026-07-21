import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Boxes, CheckCircle2, Gauge, Rocket, UsersRound } from "lucide-react";
import type { ContentOperationsPlan, ContentOperationWave } from "@/lib/content-operations";
import { inventoryAssetLabels } from "@/lib/content-inventory";
import { productionStageLabels } from "@/lib/production-queue";

type ContentOperationsBoardProps = {
  plan: ContentOperationsPlan;
};

const priorityClass: Record<ContentOperationWave["priority"], string> = {
  high: "border-red-300/25 bg-red-300/10 text-red-100",
  medium: "border-gold/20 bg-gold/10 text-gold-light",
  low: "border-warm/10 bg-warm/5 text-muted",
};

export function ContentOperationsBoard({ plan }: ContentOperationsBoardProps) {
  return (
    <section className="grid gap-6">
      <div className="lux-frame p-6">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="gold-text text-xs font-semibold tracking-[0.24em]">CONTENT OPERATIONS</p>
            <h1 className="mt-3 text-4xl font-black leading-[1.3] text-warm">اتاق عملیات محتوا و تولید</h1>
            <p className="mt-3 max-w-3xl leading-8 text-muted">
              این مرکز، inventory و صف تولید را به موج‌های اجرایی تبدیل می‌کند تا تیم محتوا، پژوهش، رسانه و مهندسی بدانند از کجا شروع کنند.
            </p>
          </div>
          <Link
            href="/api/admin/content-operations"
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10"
          >
            API عملیات
            <ArrowLeft size={16} />
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-5">
          <Metric icon={Boxes} label="قلمروها" value={formatNumber(plan.summary.realms)} />
          <Metric icon={Gauge} label="تکمیل inventory" value={`${plan.summary.inventoryCompletion}%`} />
          <Metric icon={Rocket} label="تسک فعال" value={formatNumber(plan.summary.activeTasks)} />
          <Metric icon={CheckCircle2} label="اولویت بالا" value={formatNumber(plan.summary.highPriorityTasks)} />
          <Metric icon={UsersRound} label="کمبود کل" value={formatNumber(plan.summary.totalMissingAssets)} />
        </div>

        <div className="mt-6 rounded-3xl border border-gold/10 bg-royal/45 p-5">
          <p className="text-xs font-bold text-muted">پرریسک‌ترین قلمرو فعلی</p>
          <h2 className="mt-2 text-2xl font-black text-warm">{plan.summary.topRiskRealm.title}</h2>
          <p className="mt-2 text-sm leading-7 text-gold-light">{plan.summary.topRiskRealm.nextAction}</p>
        </div>
      </div>

      <div className="grid gap-5">
        {plan.waves.map((wave) => (
          <article key={wave.id} className="lux-frame p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${priorityClass[wave.priority]}`}>
                    اولویت {wave.priority === "high" ? "بالا" : wave.priority === "medium" ? "متوسط" : "پایین"}
                  </span>
                  <span className="rounded-full border border-gold/10 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">{wave.owner}</span>
                </div>
                <h2 className="mt-3 text-3xl font-black text-warm">{wave.title}</h2>
                <p className="mt-2 max-w-4xl text-sm leading-8 text-muted">{wave.focus}</p>
                <p className="mt-2 text-sm font-bold leading-7 text-gold-light">{wave.target}</p>
              </div>
              <Link
                href={wave.href}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
              >
                باز کردن موج
                <ArrowLeft size={16} />
              </Link>
            </div>

            <div className="mt-5 grid gap-3">
              {wave.tasks.length ? (
                wave.tasks.map((task) => (
                  <div key={task.id} className="rounded-2xl border border-gold/10 bg-night/55 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-black text-warm">{task.title}</h3>
                      <span className="rounded-full border border-gold/10 bg-royal/55 px-3 py-1 text-xs font-bold text-muted">
                        {productionStageLabels[task.stage]}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2 md:grid-cols-4">
                      <Info label="نوع" value={inventoryAssetLabels[task.assetType]} />
                      <Info label="قلمرو" value={task.realmTitle} />
                      <Info label="باقی‌مانده" value={formatNumber(task.missingCount)} />
                      <Info label="موعد" value={task.dueDate} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm font-bold text-emerald-100">
                  در این موج فعلاً تسک باز مهمی باقی نمانده است.
                </p>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="lux-frame p-6">
          <h2 className="text-2xl font-black text-warm">بار کاری تیم‌ها</h2>
          <div className="mt-5 grid gap-3">
            {plan.ownerLoad.map((owner) => (
              <div key={owner.owner} className="rounded-2xl border border-gold/10 bg-night/55 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black text-warm">{owner.owner}</p>
                  <p className="text-sm font-bold text-gold-light">{formatNumber(owner.tasks)} تسک</p>
                </div>
                <p className="mt-2 text-sm text-muted">
                  {formatNumber(owner.missingAssets)} مورد باقی‌مانده / {formatNumber(owner.highPriority)} اولویت بالا
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="lux-frame p-6">
          <h2 className="text-2xl font-black text-warm">پیشنهادهای اجرایی بعدی</h2>
          <div className="mt-5 grid gap-3">
            {plan.recommendations.map((item) => (
              <p key={item} className="rounded-2xl border border-gold/10 bg-royal/45 p-4 text-sm font-bold leading-8 text-muted">
                {item}
              </p>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
      <Icon className="text-gold-light" size={18} />
      <p className="mt-2 text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-2xl font-black text-warm">{value}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gold/10 bg-royal/35 px-3 py-2">
      <p className="text-[11px] font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-black text-warm">{value}</p>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
