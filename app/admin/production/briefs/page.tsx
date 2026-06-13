import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProductionBriefBoard } from "@/components/admin/production-brief-board";
import { getProductionBriefs } from "@/lib/production-briefs";

export const metadata: Metadata = {
  title: "Brief تولید",
  description: "استودیوی brief برای تولید متن، تصویر، صوت، منابع و تسک‌های ادمینی AVESTA-ZOROASTER.",
};

export default function AdminProductionBriefsPage() {
  return (
    <AdminShell>
      <ProductionBriefBoard briefs={getProductionBriefs()} />
    </AdminShell>
  );
}
