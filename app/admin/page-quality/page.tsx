import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { PageQualityBoard } from "@/components/admin/page-quality-board";
import { getPageQualityItems } from "@/lib/page-quality";

export const metadata: Metadata = {
  title: "کنترل کیفیت صفحات | AVESTA-ZOROASTER",
  description: "ماتریس QA برای SEO، محتوا، رسانه، منبع، موبایل، مالک و اقدام بعدی هر route سایت.",
};

export default function AdminPageQualityPage() {
  return (
    <AdminShell>
      <PageQualityBoard items={getPageQualityItems()} />
    </AdminShell>
  );
}
