"use client";

import Link from "next/link";
import { CreditCard, Loader2, PackageCheck, Send } from "lucide-react";
import { useMemo, useState } from "react";

import { formatPrice, type ShopProduct } from "@/lib/shop";
import { adminShopSchema, getShippingMethod, type ShippingMethodId } from "@/lib/admin-shop";

type CheckoutCartItem = {
  slug: string;
  quantity: number;
};

export function CheckoutForm({ products, initialItems }: { products: ShopProduct[]; initialItems: CheckoutCartItem[] }) {
  const [email, setEmail] = useState("buyer@example.com");
  const [displayName, setDisplayName] = useState("خریدار نمونه");
  const [phone, setPhone] = useState("09120000000");
  const [shippingAddress, setShippingAddress] = useState("تهران، آدرس نمونه برای تست سفارش");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodId>("standard");
  const [couponCode, setCouponCode] = useState("ASHA10");
  const [notes, setNotes] = useState("پرداخت واقعی در فاز بعد به این سفارش وصل می‌شود.");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("checkout نمایشی آماده ثبت سفارش است.");
  const [paymentUrl, setPaymentUrl] = useState("");
  const cartItems = useMemo(
    () =>
      initialItems
        .map((item) => {
          const product = products.find((entry) => entry.slug === item.slug);
          return product ? { ...item, product, total: product.price * item.quantity } : null;
        })
        .filter(Boolean) as Array<CheckoutCartItem & { product: ShopProduct; total: number }>,
    [initialItems, products]
  );
  const total = cartItems.reduce((sum, item) => sum + item.total, 0);
  const selectedShipping = getShippingMethod(shippingMethod);
  const payableTotal = total + selectedShipping.cost;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("در حال ثبت سفارش demo...");

    try {
      const response = await fetch("/api/shop/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          displayName,
          phone,
          shippingAddress,
          shippingMethod,
          couponCode,
          notes,
          items: cartItems.map((item) => ({ slug: item.slug, quantity: item.quantity })),
        }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        message: string;
        mode?: string;
        errors?: string[];
        order?: { id: string; total: number; email: string };
      };

      if (!data.ok) {
        setStatus(`${data.message} ${data.errors?.join(" | ") ?? ""}`);
        return;
      }

      setStatus(`${data.message}${data.mode ? ` (${data.mode})` : ""} در حال آماده‌سازی پرداخت demo...`);

      const paymentResponse = await fetch("/api/shop/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: data.order?.id ?? `checkout-${Date.now()}`,
          amount: data.order?.total ?? total,
          email,
          provider: "demo",
        }),
      });
      const paymentData = (await paymentResponse.json()) as { ok: boolean; redirectUrl?: string; message?: string };

      if (paymentData.ok && paymentData.redirectUrl) {
        setPaymentUrl(paymentData.redirectUrl);
        setStatus(paymentData.message ?? "درگاه demo آماده است.");
      }
    } catch {
      setStatus("ارتباط با API سفارش برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <section className="lux-frame p-6">
        <div className="flex items-center gap-2 text-gold-light">
          <CreditCard size={22} />
          <h1 className="text-3xl font-black">Checkout فروشگاه</h1>
        </div>
        <p className="mt-3 leading-8 text-muted">
          این checkout فعلاً سفارش demo می‌سازد و برای اتصال آینده به پرداخت، انبار و ارسال آماده است.
        </p>
        <div className="mt-6 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="نام" value={displayName} onChange={setDisplayName} />
            <Field label="ایمیل" value={email} onChange={setEmail} ltr />
          </div>
          <Field label="شماره تماس" value={phone} onChange={setPhone} ltr />
          <label className="grid gap-2">
            <span className="text-sm font-bold text-warm">روش ارسال</span>
            <select
              value={shippingMethod}
              onChange={(event) => setShippingMethod(event.target.value as ShippingMethodId)}
              className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
            >
              {adminShopSchema.shippingMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.label} / {formatPrice(method.cost)}
                </option>
              ))}
            </select>
          </label>
          <TextArea label="آدرس ارسال" value={shippingAddress} onChange={setShippingAddress} rows={4} />
          <Field label="کد تخفیف" value={couponCode} onChange={setCouponCode} ltr />
          <TextArea label="یادداشت سفارش" value={notes} onChange={setNotes} rows={3} />
          <button
            type="submit"
            disabled={loading || cartItems.length === 0}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-4 font-black text-night transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            ثبت سفارش demo
          </button>
          {paymentUrl ? (
            <Link
              href={paymentUrl}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 px-6 py-4 font-black text-gold-light transition hover:bg-gold/10"
            >
              ورود به درگاه demo
              <CreditCard size={18} />
            </Link>
          ) : null}
          <p className="text-sm leading-7 text-muted">{status}</p>
        </div>
      </section>

      <aside className="lux-frame h-fit p-5">
        <div className="flex items-center gap-2 text-gold-light">
          <PackageCheck size={21} />
          <h2 className="text-2xl font-black">خلاصه سفارش</h2>
        </div>
        <div className="mt-5 grid gap-3">
          {cartItems.length ? (
            cartItems.map((item) => (
              <div key={item.slug} className="rounded-2xl border border-gold/10 bg-night/55 p-4">
                <p className="font-black text-warm">{item.product.title}</p>
                <p className="mt-2 text-sm text-muted">
                  {item.quantity} عدد / {formatPrice(item.total)}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-gold/10 bg-night/55 p-4 text-sm leading-7 text-muted">
              محصولی در query checkout نیست. از فروشگاه یک محصول اضافه کن.
            </div>
          )}
        </div>
        <div className="mt-5 rounded-3xl border border-gold/20 bg-gold/10 p-5">
          <p className="text-xs font-bold text-muted">مبلغ قابل پرداخت آینده</p>
          <p className="mt-1 text-2xl font-black text-gold-light">{formatPrice(payableTotal)}</p>
          <p className="mt-2 text-xs leading-6 text-muted">
            شامل {formatPrice(selectedShipping.cost)} هزینه ارسال / {selectedShipping.eta}
          </p>
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  ltr = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  ltr?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-warm">{label}</span>
      <input
        dir={ltr ? "ltr" : "rtl"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold ${
          ltr ? "text-left" : ""
        }`}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-warm">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="rounded-2xl border border-gold/20 bg-royal p-4 text-warm outline-none focus:border-gold"
      />
    </label>
  );
}
