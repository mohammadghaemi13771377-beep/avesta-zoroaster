import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CheckoutForm } from "@/components/checkout-form";
import { shopProducts } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Checkout فروشگاه",
  description: "ثبت سفارش نمایشی فروشگاه AVESTA-ZOROASTER و آماده‌سازی اتصال آینده به پرداخت.",
};

type CheckoutPageProps = {
  searchParams: {
    items?: string;
  };
};

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const initialItems = parseItems(searchParams.items);

  return (
    <main className="checkout-page px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/shop" className="checkout-back-link mb-6 inline-flex items-center gap-2 text-sm font-bold text-gold-light">
          <ArrowLeft size={16} />
          بازگشت به فروشگاه
        </Link>
        <section className="checkout-hero lux-frame mb-6 p-6 sm:p-8">
          <p className="gold-text text-xs font-black uppercase tracking-[0.25em]">Secure demo checkout</p>
          <h1 className="mt-3 text-3xl font-black text-warm sm:text-5xl">ثبت سفارش فروشگاه اوستا</h1>
          <p className="mt-4 max-w-3xl leading-8 text-muted">
            این صفحه مسیر خرید آینده را شبیه سازی می کند؛ سفارش ثبت می شود، پرداخت نمایشی ساخته می شود و بعدا به درگاه واقعی، انبار، ارسال و پنل ادمین فروشگاه وصل خواهد شد.
          </p>
          <div className="checkout-hero-steps mt-6 grid gap-3 text-sm font-bold text-warm sm:grid-cols-3">
            <span>پیش نمایش سفارش</span>
            <span>آماده اتصال پرداخت</span>
            <span>قابل مدیریت از ادمین</span>
          </div>
        </section>
        <CheckoutForm products={shopProducts} initialItems={initialItems} />
      </div>
    </main>
  );
}

function parseItems(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((entry) => {
      const [slug, quantity] = entry.split(":");
      return {
        slug,
        quantity: Math.max(1, Number(quantity ?? 1)),
      };
    })
    .filter((item) => item.slug);
}
