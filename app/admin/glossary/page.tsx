import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminResourcePage } from "@/components/admin/admin-resource-page";
import { FocusedContentForm } from "@/components/admin/focused-content-form";

export const metadata: Metadata = {
  title: "مدیریت واژه‌نامه",
  description: "مدیریت واژه‌های اوستایی و مفاهیم زرتشتی.",
};

export default function AdminGlossaryPage() {
  return (
    <AdminShell>
      <AdminResourcePage
        eyebrow="Glossary"
        title="مدیریت واژه‌نامه"
        description="تعریف واژه، ریشه، معنی، کاربرد در متن و اتصال به مقاله‌ها و بندهای اوستا."
        checklist={["واژه و slug", "معنی و ریشه", "کاربرد در متن", "مقاله‌ها و بندهای مرتبط"]}
        showContentForm={false}
      />
      <FocusedContentForm resource="glossaryTerm" />
    </AdminShell>
  );
}
