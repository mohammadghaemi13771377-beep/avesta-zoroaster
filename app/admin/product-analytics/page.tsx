import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProductAnalyticsBoard } from "@/components/admin/product-analytics-board";
import { getProductEventSpecs, getProductFunnelStages } from "@/lib/product-analytics";

export const metadata: Metadata = {
  title: "آنالیتیکس محصول | AVESTA-ZOROASTER",
  description: "مرکز قیف محصول، conversion، event tracking و نقشه اتصال analytics production.",
};

export default function AdminProductAnalyticsPage() {
  return (
    <AdminShell>
      <ProductAnalyticsBoard stages={getProductFunnelStages()} events={getProductEventSpecs()} />
    </AdminShell>
  );
}
