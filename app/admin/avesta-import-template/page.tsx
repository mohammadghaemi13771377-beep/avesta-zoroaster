import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AvestaImportTemplateBoard } from "@/components/admin/avesta-import-template-board";

export const metadata: Metadata = {
  title: "قالب Import اوستا",
  description: "قالب JSON و CSV برای ورود دسته‌ای سیستم محتوای طلایی اوستا.",
};

export default function AdminAvestaImportTemplatePage() {
  return (
    <AdminShell>
      <AvestaImportTemplateBoard />
    </AdminShell>
  );
}
