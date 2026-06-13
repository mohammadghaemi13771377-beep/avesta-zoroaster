import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AvestaSourcePackBoard } from "@/components/admin/avesta-source-pack-board";
import { getAvestaSourcePacks } from "@/lib/avesta-source-packs";

export const metadata: Metadata = {
  title: "پک منابع اوستا | AVESTA-ZOROASTER",
  description: "داشبورد مدیریتی Source Pack برای منابع، citationها، دارایی‌ها و معیار انتشار بخش‌های اوستا.",
};

export default function AdminAvestaSourcePacksPage() {
  return (
    <AdminShell>
      <AvestaSourcePackBoard packs={getAvestaSourcePacks()} />
    </AdminShell>
  );
}
