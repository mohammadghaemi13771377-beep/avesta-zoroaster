import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { VisualAssetControlBoard } from "@/components/admin/visual-asset-control-board";
import { getVisualAssetItems } from "@/lib/visual-asset-control";

export const metadata: Metadata = {
  title: "اتاق کنترل تصویرهای AI | AVESTA-ZOROASTER",
  description: "مدیریت prompt، نسبت تصویر، مسیر فایل، وضعیت تولید و آپلود تصویرهای AI پروژه.",
};

export default function AdminVisualAssetsPage() {
  return (
    <AdminShell>
      <VisualAssetControlBoard items={getVisualAssetItems()} />
    </AdminShell>
  );
}
