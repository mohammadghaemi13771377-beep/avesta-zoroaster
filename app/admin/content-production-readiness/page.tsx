import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ContentProductionReadinessBoard } from "@/components/admin/content-production-readiness-board";
import { contentProductionItems } from "@/lib/content-production-readiness";

export const metadata: Metadata = {
  title: "آمادگی ورود محتوای واقعی",
  description: "کنسول آمادگی پنل مدیریت برای ورود محتوای واقعی، تصویر، صوت، ویدئو، دیتابیس و storage."
};

export default function AdminContentProductionReadinessPage() {
  return (
    <AdminShell>
      <ContentProductionReadinessBoard items={contentProductionItems} />
    </AdminShell>
  );
}
