import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ContentInventoryBoard } from "@/components/admin/content-inventory-board";
import { getContentInventoryRealms } from "@/lib/content-inventory";

export const metadata: Metadata = {
  title: "Inventory محتوا",
  description: "نقشه تکمیل محتوا، تصویر، صوت، منابع و کارهای ادمینی برای جهان AVESTA-ZOROASTER.",
};

export default function AdminInventoryPage() {
  return (
    <AdminShell>
      <ContentInventoryBoard realms={getContentInventoryRealms()} />
    </AdminShell>
  );
}
