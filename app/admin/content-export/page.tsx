import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ContentExportBoard } from "@/components/admin/content-export-board";
import { getContentExportBundle } from "@/lib/content-export";

export const metadata: Metadata = {
  title: "خروجی و بکاپ محتوا",
  description: "کنسول خروجی JSON و snapshot محتوای سایت AVESTA-ZOROASTER برای تحویل، بکاپ و مهاجرت به CMS."
};

export default function AdminContentExportPage() {
  return (
    <AdminShell>
      <ContentExportBoard bundle={getContentExportBundle()} />
    </AdminShell>
  );
}
