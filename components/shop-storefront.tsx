"use client";

import { ArrowLeft, ShoppingBag, SlidersHorizontal, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { formatPrice, productCategories, type ProductCategory, type ShopProduct } from "@/lib/shop";

type CartItem = {
  slug: string;
  title: string;
  price: number;
  quantity: number;
};

export function ShopStorefront({ products }: { products: ShopProduct[] }) {
  const [category, setCategory] = useState<"all" | ProductCategory>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const filteredProducts = useMemo(
    () => (category === "all" ? products : products.filter((product) => product.category === category)),
    [category, products]
  );
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const checkoutHref =
    cart.length > 0
      ? `/shop/checkout?items=${encodeURIComponent(cart.map((item) => `${item.slug}:${item.quantity}`).join(","))}`
      : "/shop/checkout";

  function addToCart(product: ShopProduct) {
    setCart((current) => {
      const existing = current.find((item) => item.slug === product.slug);

      if (existing) {
        return current.map((item) =>
          item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...current, { slug: product.slug, title: product.title, price: product.price, quantity: 1 }];
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section className="space-y-6">
        <div className="lux-frame p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gold-light">
              <SlidersHorizontal size={20} />
              <h2 className="text-2xl font-black">دسته‌بندی فروشگاه</h2>
            </div>
            <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-bold text-gold-light">
              {filteredProducts.length} محصول نمایشی
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {productCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={
                  category === item.id
                    ? "rounded-full bg-gold px-4 py-2 text-xs font-black text-night"
                    : "rounded-full border border-gold/20 px-4 py-2 text-xs font-bold text-gold-light transition hover:bg-gold/10"
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filteredProducts.map((product) => (
            <article key={product.slug} className="lux-frame overflow-hidden rounded-[18px] p-4">
              <Link href={`/shop/${product.slug}`} className={`image-scene ${product.imageScene} block h-56 rounded-[14px] border border-gold/14`}>
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  fill
                  sizes="(min-width: 768px) 44vw, 92vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="sr-only">{product.title}</span>
              </Link>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                  {product.categoryLabel}
                </span>
                <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                  {product.badge}
                </span>
              </div>
              <Link href={`/shop/${product.slug}`}>
                <h3 className="mt-4 text-2xl font-black leading-9 text-warm transition hover:text-gold-light">
                  {product.title}
                </h3>
              </Link>
              <p className="mt-3 min-h-[56px] text-sm leading-7 text-muted">{product.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <span className="text-lg font-black text-gold-light">{formatPrice(product.price)}</span>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
                >
                  افزودن
                  <ShoppingBag size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="lux-frame h-fit p-5 xl:sticky xl:top-28">
        <div className="flex items-center gap-2 text-gold-light">
          <ShoppingBag size={21} />
          <h2 className="text-2xl font-black">سبد خرید آینده</h2>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted">
          این سبد فعلاً local است؛ بعداً به سفارش، پرداخت، ارسال و پنل فروش وصل می‌شود.
        </p>
        <div className="mt-5 grid gap-3">
          {cart.length ? (
            cart.map((item) => (
              <div key={item.slug} className="rounded-2xl border border-gold/10 bg-night/55 p-4">
                <p className="font-black text-warm">{item.title}</p>
                <p className="mt-2 text-sm text-muted">
                  {item.quantity} عدد / {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-gold/10 bg-night/55 p-5 text-sm leading-7 text-muted">
              هنوز محصولی اضافه نشده است.
            </div>
          )}
        </div>
        <div className="mt-5 rounded-3xl border border-gold/20 bg-gold/10 p-5">
          <p className="text-xs font-bold text-muted">جمع آزمایشی</p>
          <p className="mt-1 text-2xl font-black text-gold-light">{formatPrice(total)}</p>
        </div>
        <Link
          href={checkoutHref}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light"
        >
          ادامه به checkout
          <ArrowLeft size={17} />
        </Link>
        <div className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 px-5 py-3 text-sm font-bold text-gold-light">
          <Sparkles size={17} />
          پرداخت واقعی در فاز بعد
        </div>
      </aside>
    </div>
  );
}
