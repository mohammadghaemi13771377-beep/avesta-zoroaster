import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AvestaProductionBatchBoard } from "@/components/admin/avesta-production-batch-board";
import { getAvestaProductionBatches } from "@/lib/avesta-production-batches";

export const metadata: Metadata = {
  title: "Batch تولید اوستا",
  description: "تسک‌های اجرایی تولید متن، ترجمه، تصویر، صوت، منبع و SEO بر اساس کمبودهای ماتریس تکمیل اوستا.",
};

export default function AdminAvestaProductionPage() {
  return (
    <AdminShell>
      <AvestaProductionBatchBoard batches={getAvestaProductionBatches()} />
    </AdminShell>
  );
}
