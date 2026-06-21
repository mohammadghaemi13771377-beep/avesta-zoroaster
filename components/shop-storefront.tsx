"use client";

import { ArrowLeft, Heart, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { formatPrice, productCategories, type ProductCategory, type ShopProduct } from "@/lib/shop";
import { normalizeSearchText } from "@/lib/search";

type CartItem = {
  slug: string;
  title: string;
  price: number;
  quantity: number;
};

const cartStorageKey = "avesta-shop-cart-v1";
const wishlistStorageKey = "avesta-shop-wishlist-v1";
const inventoryLabels = { available: "موجود", preorder: "پیش‌فروش", limited: "تعداد محدود" } as const;

export function ShopStorefront({ products }: { products: ShopProduct[] }) {
  const [category, setCategory] = useState<"all" | ProductCategory>("all");
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState<"all" | ShopProduct["inventoryStatus"]>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const filteredProducts = useMemo(
    () => products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesAvailability = availability === "all" || product.inventoryStatus === availability;
      const haystack = normalizeSearchText(`${product.title} ${product.excerpt} ${product.categoryLabel} ${product.spiritualTheme} ${product.seoKeywords.join(" ")}`);
      return matchesCategory && matchesAvailability && (!query.trim() || haystack.includes(normalizeSearchText(query)));
    }),
    [availability, category, products, query]
  );
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const checkoutHref =
    cart.length > 0
      ? `/shop/checkout?items=${encodeURIComponent(cart.map((item) => `${item.slug}:${item.quantity}`).join(","))}`
      : "/shop/checkout";

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(cartStorageKey) ?? "[]");
      if (Array.isArray(saved)) setCart(saved.filter((item) => item && typeof item.slug === "string").slice(0, 20));
      const savedWishlist = JSON.parse(window.localStorage.getItem(wishlistStorageKey) ?? "[]");
      if (Array.isArray(savedWishlist)) setWishlist(savedWishlist.filter((item) => typeof item === "string").slice(0, 30));
    } catch {
      window.localStorage.removeItem(cartStorageKey);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

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

  function setQuantity(slug: string, quantity: number) {
    setCart((current) => quantity <= 0 ? current.filter((item) => item.slug !== slug) : current.map((item) => item.slug === slug ? { ...item, quantity } : item));
  }

  function toggleWishlist(slug: string) {
    setWishlist((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  }

  function resetFilters() {
    setCategory("all");
    setAvailability("all");
    setQuery("");
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
          <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
            <label className="relative block">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جستجو در کتاب، هدیه، پوشاک و هنر" className="h-12 w-full rounded-xl border border-gold/20 bg-night/60 pr-11 pl-4 text-sm text-warm outline-none placeholder:text-muted focus:border-gold" />
            </label>
            <select value={availability} onChange={(event) => setAvailability(event.target.value as "all" | ShopProduct["inventoryStatus"])} className="h-12 rounded-xl border border-gold/20 bg-night/60 px-4 text-sm text-warm outline-none focus:border-gold" aria-label="فیلتر وضعیت موجودی">
              <option value="all">همه وضعیت‌ها</option>
              <option value="available">موجود</option>
              <option value="preorder">پیش‌فروش</option>
              <option value="limited">تعداد محدود</option>
            </select>
          </div>
          {(query || category !== "all" || availability !== "all") ? <button type="button" onClick={resetFilters} className="mt-4 rounded-full border border-gold/20 px-4 py-2 text-xs font-bold text-gold-light transition hover:bg-gold/10">پاک‌سازی فیلترها</button> : null}
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
                <span className="rounded-full border border-sky-200/15 bg-sky-200/5 px-3 py-1 text-xs font-bold text-sky-100">
                  {inventoryLabels[product.inventoryStatus]}
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
                <button type="button" onClick={() => toggleWishlist(product.slug)} aria-pressed={wishlist.includes(product.slug)} aria-label={wishlist.includes(product.slug) ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"} className={`mr-auto grid h-11 w-11 place-items-center rounded-full border transition ${wishlist.includes(product.slug) ? "border-gold bg-gold/15 text-gold-light" : "border-gold/20 text-gold-light hover:bg-gold/10"}`}>
                  <Heart size={17} fill={wishlist.includes(product.slug) ? "currentColor" : "none"} />
                </button>
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
          <h2 className="text-2xl font-black">سبد خرید شما</h2>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted">
          انتخاب‌های شما روی همین دستگاه نگه داشته می‌شوند تا هنگام دیدن محصولات، سبدتان از بین نرود.
        </p>
        <div className="mt-5 grid gap-3">
          {cart.length ? (
            cart.map((item) => (
              <div key={item.slug} className="rounded-2xl border border-gold/10 bg-night/55 p-4">
                <div className="flex items-start justify-between gap-3"><p className="font-black leading-7 text-warm">{item.title}</p><button type="button" onClick={() => setQuantity(item.slug, 0)} className="text-muted transition hover:text-gold-light" aria-label={`حذف ${item.title}`}><Trash2 size={16} /></button></div>
                <div className="mt-3 flex items-center justify-between gap-3"><div className="inline-flex items-center rounded-full border border-gold/15"><button type="button" onClick={() => setQuantity(item.slug, item.quantity - 1)} className="grid h-8 w-8 place-items-center text-gold-light"><Minus size={14} /></button><span className="min-w-8 text-center text-sm font-black text-warm">{item.quantity}</span><button type="button" onClick={() => setQuantity(item.slug, item.quantity + 1)} className="grid h-8 w-8 place-items-center text-gold-light"><Plus size={14} /></button></div><p className="text-sm text-muted">{formatPrice(item.price * item.quantity)}</p></div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-gold/10 bg-night/55 p-5 text-sm leading-7 text-muted">
              هنوز محصولی اضافه نشده است.
            </div>
          )}
        </div>
        <div className="mt-5 rounded-3xl border border-gold/20 bg-gold/10 p-5">
          <p className="text-xs font-bold text-muted">جمع سبد</p>
          <p className="mt-1 text-2xl font-black text-gold-light">{formatPrice(total)}</p>
        </div>
        {cart.length ? (
          <Link
            href={checkoutHref}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light"
          >
            ادامه سفارش
            <ArrowLeft size={17} />
          </Link>
        ) : (
          <span className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-gold/35 px-5 py-3 font-black text-night/70">
            ابتدا یک محصول انتخاب کنید
            <ArrowLeft size={17} />
          </span>
        )}
        <div className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 px-5 py-3 text-sm font-bold text-gold-light">
          <Sparkles size={17} />
          سبد شما روی همین دستگاه نگه داشته می‌شود
        </div>
        <div className="mt-5 border-t border-gold/12 pt-5">
          <div className="flex items-center gap-2 text-gold-light"><Heart size={18} /><h3 className="font-black">علاقه‌مندی‌ها</h3><span className="mr-auto text-xs text-muted">{wishlist.length}</span></div>
          {wishlist.length ? <div className="mt-3 grid gap-2">{products.filter((product) => wishlist.includes(product.slug)).map((product) => <div key={product.slug} className="flex items-center justify-between gap-3 rounded-xl border border-gold/10 bg-night/45 p-3"><Link href={`/shop/${product.slug}`} className="min-w-0 flex-1 truncate text-sm font-black text-warm hover:text-gold-light">{product.title}</Link><button type="button" onClick={() => toggleWishlist(product.slug)} className="text-muted hover:text-gold-light" aria-label={`حذف ${product.title}`}><Trash2 size={15} /></button></div>)}</div> : <p className="mt-3 text-xs leading-6 text-muted">محصول‌های دلخواهت را با آیکن قلب نگه دار.</p>}
        </div>
      </aside>
    </div>
  );
}
