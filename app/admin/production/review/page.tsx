import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProductionReviewBoard } from "@/components/admin/production-review-board";
import { getProductionReviewItems } from "@/lib/production-review";

export const metadata: Metadata = {
  title: "Review تولید",
  description: "دروازه تایید کیفیت برای خروجی‌های تولید محتوا، تصویر، صوت و منابع AVESTA-ZOROASTER.",
};

export default function AdminProductionReviewPage() {
  return (
    <AdminShell>
      <ProductionReviewBoard items={getProductionReviewItems()} />
    </AdminShell>
  );
}
