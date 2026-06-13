import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProductionQueueBoard } from "@/components/admin/production-queue-board";
import { getProductionQueueItems } from "@/lib/production-queue";

export const metadata: Metadata = {
  title: "صف تولید محتوا",
  description: "صف عملیاتی تولید متن، تصویر، صوت، منبع و کارهای ادمینی AVESTA-ZOROASTER.",
};

export default function AdminProductionPage() {
  return (
    <AdminShell>
      <ProductionQueueBoard items={getProductionQueueItems()} />
    </AdminShell>
  );
}
