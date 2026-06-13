import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminResourcePage } from "@/components/admin/admin-resource-page";

export const metadata: Metadata = {
  title: "مدیریت اوستا",
  description: "مدیریت بخش‌ها، فصل‌ها، بندها و ترجمه‌های اوستا.",
};

export default function AdminAvestaPage() {
  return (
    <AdminShell>
      <AdminResourcePage
        eyebrow="Avesta CMS"
        title="مدیریت اوستا"
        description="ساخت و ویرایش بخش‌ها، فصل‌ها، بندها، ترجمه‌ها، بازنویسی ساده، تحلیل مفهومی، تصویر و صوت."
        checklist={["بخش‌های اوستا", "فصل‌ها و هات‌ها", "بندها و ترجمه‌ها", "تصویر و صوت هر بند"]}
      />
    </AdminShell>
  );
}
