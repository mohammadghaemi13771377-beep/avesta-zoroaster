import { AlertTriangle, Boxes, CircleCheck, PackageSearch } from "lucide-react";

import type { InventoryItem } from "@/lib/admin-shop";

const alertLabels: Record<InventoryItem["alert"], string> = {
  ok: "موجودی سالم",
  low: "کمبود نزدیک",
  empty: "تمام‌شده",
  preorder: "پیش‌فروش",
};

const alertClass: Record<InventoryItem["alert"], string> = {
  ok: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  low: "border-gold/20 bg-gold/10 text-gold-light",
  empty: "border-red-300/25 bg-red-300/10 text-red-100",
  preorder: "border-sky-300/20 bg-sky-300/10 text-sky-100",
};

export function InventoryBoard({ items }: { items: InventoryItem[] }) {
  const lowStockCount = items.filter((item) => item.alert === "low" || item.alert === "empty").length;

  return (
    <section className="mt-8 lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-light">
            <Boxes size={22} />
            <h2 className="text-2xl font-black">موجودی و انبار</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">
            نمای عملیاتی برای کنترل موجودی، رزرو سفارش‌ها، کمبود کالا و محصولات پیش‌فروش.
          </p>
        </div>
        <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-bold text-gold-light">
          {lowStockCount} هشدار موجودی
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.slug} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-gold-light">{item.categoryLabel}</p>
                <h3 className="mt-2 text-xl font-black leading-8 text-warm">{item.title}</h3>
              </div>
              <StatusBadge alert={item.alert} />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <InventoryMetric label="کل" value={item.stock} />
              <InventoryMetric label="رزرو" value={item.reserved} />
              <InventoryMetric label="آزاد" value={item.available} />
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
              <div
                className="h-full rounded-full bg-gold"
                style={{ width: `${item.stock > 0 ? Math.min(100, (item.available / item.stock) * 100) : 0}%` }}
              />
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs font-bold text-muted" dir="ltr">
              <PackageSearch size={14} />
              {item.slug}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatusBadge({ alert }: { alert: InventoryItem["alert"] }) {
  const Icon = alert === "ok" ? CircleCheck : AlertTriangle;

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${alertClass[alert]}`}>
      <Icon size={14} />
      {alertLabels[alert]}
    </span>
  );
}

function InventoryMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-3 text-center">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-lg font-black text-gold-light">{new Intl.NumberFormat("fa-IR").format(value)}</p>
    </div>
  );
}
