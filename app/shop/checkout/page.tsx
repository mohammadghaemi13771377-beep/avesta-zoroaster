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
    <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/shop" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-gold-light">
          <ArrowLeft size={16} />
          بازگشت به فروشگاه
        </Link>
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
