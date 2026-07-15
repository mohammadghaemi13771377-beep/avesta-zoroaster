"use client";

import Link from "next/link";
import { Check, Heart, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ShopProduct } from "@/lib/shop";

type CartItem = {
  slug: string;
  title: string;
  price: number;
  quantity: number;
};

const cartStorageKey = "avesta-shop-cart-v1";
const wishlistStorageKey = "avesta-shop-wishlist-v1";

function readCart(): CartItem[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(cartStorageKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item.slug === "string") : [];
  } catch {
    return [];
  }
}

export function ProductPurchaseActions({ product }: { product: ShopProduct }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const current = readCart();
    setCart(current);
    setAdded(current.some((item) => item.slug === product.slug));
    try {
      const saved = JSON.parse(window.localStorage.getItem(wishlistStorageKey) ?? "[]");
      setWishlisted(Array.isArray(saved) && saved.includes(product.slug));
    } catch {
      setWishlisted(false);
    }
  }, [product.slug]);

  const checkoutHref = useMemo(() => {
    const items = cart.length ? cart : [{ slug: product.slug, title: product.title, price: product.price, quantity: 1 }];
    return `/shop/checkout?items=${encodeURIComponent(items.map((item) => `${item.slug}:${item.quantity}`).join(","))}`;
  }, [cart, product.price, product.slug, product.title]);

  function addToCart() {
    const current = readCart();
    const exists = current.find((item) => item.slug === product.slug);
    const next = exists
      ? current.map((item) => item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item)
      : [...current, { slug: product.slug, title: product.title, price: product.price, quantity: 1 }];

    window.localStorage.setItem(cartStorageKey, JSON.stringify(next.slice(0, 20)));
    setCart(next);
    setAdded(true);
  }

  function toggleWishlist() {
    let current: string[] = [];
    try {
      const saved = JSON.parse(window.localStorage.getItem(wishlistStorageKey) ?? "[]");
      current = Array.isArray(saved) ? saved.filter((item): item is string => typeof item === "string") : [];
    } catch {
      current = [];
    }
    const next = current.includes(product.slug) ? current.filter((item) => item !== product.slug) : [...current, product.slug];
    window.localStorage.setItem(wishlistStorageKey, JSON.stringify(next.slice(0, 30)));
    setWishlisted(next.includes(product.slug));
  }

  return (
    <div className="product-purchase-panel mt-7 grid gap-3 sm:grid-cols-3">
      <button
        type="button"
        onClick={addToCart}
        className="product-purchase-primary inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-7 py-4 font-black text-night transition hover:bg-gold-light"
      >
        {added ? <Check size={19} /> : <ShoppingBag size={19} />}
        {added ? "به سبد اضافه شد" : "افزودن به سبد"}
      </button>
      <Link href={checkoutHref} className="product-purchase-secondary inline-flex w-full items-center justify-center gap-3 rounded-full border border-gold/30 px-7 py-4 font-black text-gold-light transition hover:bg-gold/10">
        مشاهده سبد و سفارش
        <ShoppingBag size={19} />
      </Link>
      <button type="button" onClick={toggleWishlist} aria-pressed={wishlisted} className={`product-purchase-wishlist inline-flex w-full items-center justify-center gap-3 rounded-full border px-7 py-4 font-black transition ${wishlisted ? "border-gold bg-gold/12 text-gold-light" : "border-gold/30 text-gold-light hover:bg-gold/10"}`}>
        <Heart size={19} fill={wishlisted ? "currentColor" : "none"} />
        {wishlisted ? "در علاقه‌مندی‌ها" : "ذخیره برای بعد"}
      </button>
    </div>
  );
}
