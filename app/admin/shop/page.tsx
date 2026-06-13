import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Boxes, CreditCard, PackageCheck, ShoppingBag } from "lucide-react";

import { AdminResourcePage } from "@/components/admin/admin-resource-page";
import { AdminShell } from "@/components/admin/admin-shell";
import { InventoryBoard } from "@/components/admin/inventory-board";
import { OrdersBoard } from "@/components/admin/orders-board";
import { PaymentReadinessBoard } from "@/components/admin/payment-readiness-board";
import { ProductForm } from "@/components/admin/product-form";
import { SalesReportBoard } from "@/components/admin/sales-report-board";
import { getCommerceDashboard, getCommerceOrders, getInventorySnapshot } from "@/lib/admin-shop";
import { formatPrice } from "@/lib/shop";

export const metadata: Metadata = {
  title: "مدیریت فروشگاه",
  description: "مدیریت محصولات، قیمت، موجودی، سفارش و اتصال پرداخت فروشگاه AVESTA-ZOROASTER.",
};

export default async function AdminShopPage() {
  const dashboard = getCommerceDashboard();
  const orders = await getCommerceOrders();
  const inventory = getInventorySnapshot(orders);

  return (
    <AdminShell>
      <AdminResourcePage
        eyebrow="Commerce Console"
        title="مدیریت فروشگاه"
        description="مرکز آماده‌سازی محصولات فرهنگی، قیمت‌گذاری، موجودی، وضعیت انتشار، سفارش‌ها و اتصال آینده به درگاه پرداخت."
        checklist={["محصول و دسته‌بندی", "قیمت و موجودی", "سفارش و پرداخت", "SEO محصول"]}
        showContentForm={false}
      />

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={ShoppingBag} label="محصول نمونه" value={`${dashboard.productCount}`} />
        <Metric icon={Boxes} label="دسته فعال" value={`${dashboard.visibleCategories}`} />
        <Metric icon={CreditCard} label="میانگین قیمت" value={formatPrice(dashboard.averagePrice)} />
        <Metric icon={PackageCheck} label="هشدار موجودی" value={`${dashboard.lowStockCount}`} />
      </section>

      <ProductForm />
      <InventoryBoard items={inventory} />
      <OrdersBoard orders={orders} />
      <SalesReportBoard orders={orders} />
      <PaymentReadinessBoard />
    </AdminShell>
  );
}

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <article className="lux-frame p-5">
      <Icon className="text-gold-light" size={24} />
      <p className="mt-4 text-sm font-bold text-muted">{label}</p>
      <p className="mt-2 text-2xl font-black text-warm">{value}</p>
    </article>
  );
}
