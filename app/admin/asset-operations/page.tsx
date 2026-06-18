import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AssetOperationsBoard } from "@/components/admin/asset-operations-board";
import { getAssetOperationsSnapshot } from "@/lib/asset-operations";

export const metadata: Metadata = {
  title: "فرماندهی دارایی‌ها",
  description: "کنسول وضعیت تصویر، صوت، PDF، ویدئو، storage، CDN و بکاپ دارایی‌های AVESTA-ZOROASTER."
};

export default function AdminAssetOperationsPage() {
  const snapshot = getAssetOperationsSnapshot();

  return (
    <AdminShell>
      <AssetOperationsBoard channels={snapshot.channels} checklist={snapshot.productionChecklist} />
    </AdminShell>
  );
}
