import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Gift, Shirt, ShoppingBag } from "lucide-react";

import { CinematicHub } from "@/components/cinematic-hub";
import { ShopStorefront } from "@/components/shop-storefront";
import { shopProducts } from "@/lib/shop";
import { routeHeroByPath } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "فروشگاه",
  description: "فروشگاه آینده AVESTA-ZOROASTER برای کتاب، ماگ، پیراهن، اکسسوری، مجسمه و محصولات فرهنگی.",
};

export default function ShopPage() {
  const stats: Array<[string, string, LucideIcon]> = [
    ["کتاب", "نسخه‌های چاپی و دفترچه مطالعه", BookOpen],
    ["هدیه", "ماگ، بوکمارک و اکسسوری", Gift],
    ["پوشاک", "پیراهن و محصولات فرهنگی", Shirt],
    ["تجارت", "آماده اتصال به پرداخت و انبار", ShoppingBag],
  ];

  return (
    <CinematicHub
      eyebrow="Cultural Store"
      title="فروشگاه اوستا، زرتشت و خرد یکتاپرستی"
      lead="این بخش برای فروش محصولات فرهنگی مرتبط با اوستا، زرتشت، یکتاپرستی و ایران باستان طراحی شده است؛ فعلاً نسخه نمایشی آماده است و بعداً به پرداخت، انبار و سفارش وصل می‌شود."
      scene="scene-cosmic"
      heroImage={routeHeroByPath["/shop"]}
      roman="S"
      actions={[
        { label: "مشاهده محصولات", href: "#shop-products" },
        { label: "آماده اتصال به پرداخت", href: "/admin", variant: "secondary" },
      ]}
      stats={[
        { value: "6", label: "محصول نمونه" },
        { value: "Cart", label: "سبد خرید local" },
        { value: "SEO", label: "صفحه محصول آماده ایندکس" },
      ]}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([title, description, Icon]) => (
          <article key={title} className="lux-frame p-6">
            <Icon className="text-gold-200" size={30} />
            <h2 className="mt-5 text-2xl font-black text-warm-50">{title}</h2>
            <p className="mt-3 leading-8 text-warm-100/68">{description}</p>
          </article>
        ))}
      </div>
      <div id="shop-products">
        <ShopStorefront products={shopProducts} />
      </div>
    </CinematicHub>
  );
}
