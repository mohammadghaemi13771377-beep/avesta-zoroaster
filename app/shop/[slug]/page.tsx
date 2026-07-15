import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, PackageCheck, ShoppingBag, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import { ProductPurchaseActions } from "@/components/product-purchase-actions";

import { formatPrice, getShopProduct, shopProducts } from "@/lib/shop";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return shopProducts.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getShopProduct(params.slug);

  if (!product) {
    return { title: "محصول پیدا نشد" };
  }

  return {
    title: product.title,
    description: product.excerpt,
    keywords: product.seoKeywords,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getShopProduct(params.slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.excerpt,
    brand: "AVESTA-ZOROASTER",
    category: product.categoryLabel,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "IRR",
      availability: product.inventoryStatus === "available" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    },
  };

  return (
    <main className="shop-detail-page px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className={`shop-detail-gallery image-scene ${product.imageScene} min-h-[520px] rounded-[24px] border border-gold/18`}>
          <Image
            src={product.imageSrc}
            alt={product.title}
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 92vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-8 bottom-8 z-10 rounded-3xl border border-gold/18 bg-black/35 p-5 text-warm backdrop-blur">
            <p className="text-xs font-bold text-gold-light">{product.categoryLabel}</p>
            <p className="mt-2 text-2xl font-black">{product.badge}</p>
          </div>
        </section>

        <section className="shop-detail-panel lux-frame p-7">
          <Link href="/shop" className="shop-detail-back inline-flex items-center gap-2 text-sm font-bold text-gold-light">
            <ArrowLeft size={16} />
            بازگشت به فروشگاه
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
              {product.categoryLabel}
            </span>
            <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
              {product.badge}
            </span>
          </div>
          <h1 className="gold-text mt-5 text-5xl font-black leading-[1.18]">{product.title}</h1>
          <p className="mt-5 text-lg leading-9 text-muted">{product.description}</p>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <InfoCard icon={ShoppingBag} label="قیمت" value={formatPrice(product.price)} />
            <InfoCard icon={PackageCheck} label="وضعیت" value={inventoryLabel(product.inventoryStatus)} />
            <InfoCard icon={Sparkles} label="تم" value={product.spiritualTheme} />
          </div>

          <div className="shop-detail-materials mt-7 rounded-3xl border border-gold/10 bg-night/55 p-5">
            <h2 className="text-2xl font-black text-warm">جزئیات محصول</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.materials.map((item) => (
                <span key={item} className="shop-material-chip rounded-full border border-gold/20 px-3 py-1 text-xs font-bold text-gold-light">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <ProductPurchaseActions product={product} />
        </section>
      </div>
    </main>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="shop-detail-info rounded-2xl border border-gold/10 bg-royal/45 p-4">
      <Icon className="text-gold-light" size={22} />
      <p className="mt-3 text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 font-black text-warm">{value}</p>
    </div>
  );
}

function inventoryLabel(value: string) {
  if (value === "available") {
    return "موجود";
  }

  if (value === "limited") {
    return "محدود";
  }

  return "پیش‌فروش";
}
