import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ExhibitionControlBoard } from "@/components/admin/exhibition-control-board";
import { getExhibitionControlItems } from "@/lib/exhibition-control";

export const metadata: Metadata = {
  title: "کنسول نمایشگاه‌ها | AVESTA-ZOROASTER",
  description: "مدیریت آمادگی نمایشگاه‌های موضوعی، روایت کیوریتوری، رسانه، ریسک و مسیرهای مرتبط.",
};

export default function AdminExhibitionsPage() {
  return (
    <AdminShell>
      <ExhibitionControlBoard items={getExhibitionControlItems()} />
    </AdminShell>
  );
}
