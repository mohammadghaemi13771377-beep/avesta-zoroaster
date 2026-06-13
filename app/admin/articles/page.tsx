import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminResourcePage } from "@/components/admin/admin-resource-page";
import { FocusedContentForm } from "@/components/admin/focused-content-form";

export const metadata: Metadata = {
  title: "مدیریت مقاله‌ها",
  description: "مدیریت مقاله‌ها، دسته‌بندی، تگ و SEO.",
};

export default function AdminArticlesPage() {
  return (
    <AdminShell>
      <AdminResourcePage
        eyebrow="Article Desk"
        title="مدیریت مقاله‌ها"
        description="نوشتن مقاله‌های سئو، اتصال به واژه‌نامه و بندهای اوستا، و کنترل metadata و JSON-LD."
        checklist={["عنوان و slug", "دسته‌بندی و تگ", "SEO title و description", "پیوندهای مرتبط"]}
        showContentForm={false}
      />
      <FocusedContentForm resource="article" />
    </AdminShell>
  );
}
