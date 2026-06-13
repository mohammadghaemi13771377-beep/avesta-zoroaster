import { CreditCard, KeyRound, PlugZap } from "lucide-react";

import { getPaymentReadiness } from "@/lib/payment";

const statusLabels = {
  ready: "آماده تست",
  needs_config: "نیازمند تنظیم",
  future: "فاز آینده",
} as const;

export function PaymentReadinessBoard() {
  const readiness = getPaymentReadiness();

  return (
    <section className="mt-8 lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-light">
            <CreditCard size={22} />
            <h2 className="text-2xl font-black">آمادگی پرداخت</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">
            این بخش مسیر اتصال آینده به درگاه پرداخت، callback و webhook را برای فروشگاه مشخص می‌کند.
          </p>
        </div>
        <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-bold text-gold-light">
          {readiness.ready}/{readiness.total} آماده
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {readiness.providers.map((provider) => (
          <article key={provider.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex items-center justify-between gap-3">
              <PlugZap className="text-gold-light" size={22} />
              <span className="rounded-full border border-gold/20 px-3 py-1 text-xs font-black text-gold-light">
                {statusLabels[provider.status]}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-black text-warm">{provider.label}</h3>
            <p className="mt-3 min-h-[84px] text-sm leading-7 text-muted">{provider.description}</p>
            <div className="mt-4 rounded-2xl border border-gold/10 bg-royal/45 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-muted">
                <KeyRound size={14} />
                ENV
              </div>
              <p className="mt-2 text-xs leading-6 text-gold-light" dir="ltr">
                {provider.requiredEnv.length ? provider.requiredEnv.join(" / ") : "No env needed"}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
