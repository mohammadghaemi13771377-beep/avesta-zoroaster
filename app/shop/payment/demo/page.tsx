import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "درگاه پرداخت نمایشی",
  description: "صفحه نمایشی پرداخت برای تست مسیر فروشگاه AVESTA-ZOROASTER.",
};

type DemoPaymentPageProps = {
  searchParams: {
    authority?: string;
    order?: string;
  };
};

export default function DemoPaymentPage({ searchParams }: DemoPaymentPageProps) {
  return (
    <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl lux-frame p-8 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/30 text-gold-light">
          <CreditCard size={34} />
        </div>
        <p className="gold-text mt-6 text-sm font-semibold tracking-[0.28em]">DEMO PAYMENT</p>
        <h1 className="mt-4 text-4xl font-black text-warm">درگاه پرداخت نمایشی</h1>
        <p className="mt-5 leading-8 text-muted">
          این صفحه برای تست مسیر پرداخت است و هیچ تراکنش واقعی انجام نمی‌دهد.
        </p>
        <div className="mt-7 rounded-3xl border border-gold/10 bg-night/55 p-5 text-left" dir="ltr">
          <p className="text-gold-light">authority: {searchParams.authority ?? "missing"}</p>
          <p className="mt-2 text-muted">order: {searchParams.order ?? "missing"}</p>
        </div>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/api/shop/payments/callback?authority=${encodeURIComponent(searchParams.authority ?? "demo")}&status=paid`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 font-black text-night"
          >
            تایید پرداخت demo
            <ShieldCheck size={18} />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 px-6 py-4 font-bold text-gold-light"
          >
            بازگشت به فروشگاه
            <ArrowLeft size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
