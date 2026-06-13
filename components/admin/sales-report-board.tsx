import type { LucideIcon } from "lucide-react";
import { BadgePercent, ReceiptText, TrendingUp, WalletCards } from "lucide-react";

import type { CommerceOrder } from "@/lib/admin-shop";
import { getSalesReport, sampleCoupons } from "@/lib/admin-shop";
import { formatPrice } from "@/lib/shop";

export function SalesReportBoard({ orders }: { orders: CommerceOrder[] }) {
  const report = getSalesReport(orders);

  return (
    <section className="mt-8 lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-light">
            <TrendingUp size={22} />
            <h2 className="text-2xl font-black">گزارش فروش و تخفیف</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">
            نمای مالی اولیه برای فروش، تخفیف، مالیات، هزینه ارسال و میانگین ارزش سفارش.
          </p>
        </div>
        <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-bold text-gold-light">
          {sampleCoupons.length} کمپین فعال
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={WalletCards} label="فروش ناخالص" value={formatPrice(report.grossSales)} />
        <Metric icon={BadgePercent} label="تخفیف" value={formatPrice(report.discountTotal)} />
        <Metric icon={ReceiptText} label="مالیات" value={formatPrice(report.taxTotal)} />
        <Metric icon={TrendingUp} label="درآمد نهایی" value={formatPrice(report.netRevenue)} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {sampleCoupons.map((coupon) => (
          <article key={coupon.code} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <p className="text-xs font-black text-gold-light" dir="ltr">
              {coupon.code}
            </p>
            <h3 className="mt-2 text-xl font-black text-warm">{coupon.label}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              {coupon.type === "PERCENT" ? `${coupon.amount}% تخفیف درصدی` : `${formatPrice(coupon.amount)} تخفیف ثابت`}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
      <Icon className="text-gold-light" size={22} />
      <p className="mt-3 text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-warm">{value}</p>
    </div>
  );
}
