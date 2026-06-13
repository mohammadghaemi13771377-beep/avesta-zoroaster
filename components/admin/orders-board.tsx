import type { LucideIcon } from "lucide-react";
import { Clock, CreditCard, PackageCheck, Truck } from "lucide-react";

import type { CommerceOrder } from "@/lib/admin-shop";
import { formatPrice } from "@/lib/shop";

export function OrdersBoard({ orders }: { orders: CommerceOrder[] }) {
  return (
    <section className="mt-8 lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-light">
            <PackageCheck size={22} />
            <h2 className="text-2xl font-black">سفارش‌های فروشگاه</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">
            این بخش برای مرور سفارش‌ها، وضعیت پرداخت، ارسال و اتصال آینده به درگاه آماده شده است.
          </p>
        </div>
        <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-bold text-gold-light">
          {orders.length} سفارش
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        {orders.map((order) => (
          <article key={order.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-gold-light" dir="ltr">
                  {order.id}
                </p>
                <h3 className="mt-2 text-xl font-black text-warm">{order.displayName ?? order.email}</h3>
                <p className="mt-2 text-sm text-muted">{order.email}</p>
              </div>
              <div className="text-left">
                <p className="text-2xl font-black text-gold-light">{formatPrice(order.total)}</p>
                <p className="mt-2 text-xs text-muted" dir="ltr">
                  {new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(
                    new Date(order.createdAt)
                  )}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Status icon={Clock} label="وضعیت سفارش" value={order.status} />
              <Status icon={CreditCard} label="پرداخت" value={order.paymentStatus} />
              <Status icon={Truck} label="ارسال" value={order.shipment?.status ?? "WAITING_ADDRESS"} />
            </div>

            <div className="mt-5 rounded-2xl border border-gold/10 bg-royal/45 p-4">
              <p className="text-xs font-bold text-muted">جزئیات ارسال</p>
              <p className="mt-2 text-sm leading-7 text-warm">
                {order.shipment?.method ?? "روش ارسال ثبت نشده"} / هزینه ارسال: {formatPrice(order.shippingCost)}
              </p>
              <p className="mt-1 text-xs text-gold-light" dir="ltr">
                tracking: {order.shipment?.trackingCode ?? "WAITING"}
              </p>
            </div>

            <div className="mt-5 grid gap-2">
              {order.items.map((item) => (
                <div key={`${order.id}-${item.slug}`} className="rounded-2xl border border-gold/10 bg-royal/45 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-bold text-warm">{item.title}</p>
                    <p className="text-sm text-gold-light">
                      {item.quantity} عدد / {formatPrice(item.total)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Status({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
      <Icon className="text-gold-light" size={19} />
      <p className="mt-2 text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-black text-warm">{value}</p>
    </div>
  );
}
