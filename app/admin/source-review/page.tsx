import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { SourceReviewBoard } from "@/components/admin/source-review-board";
import { getSourceReviewItems } from "@/lib/source-review";

export const metadata: Metadata = {
  title: "مرکز بازبینی منابع | AVESTA-ZOROASTER",
  description: "داشبورد مدیریتی ریسک منابع، citationها، مالک پژوهشی و اقدام بعدی برای محتوای سایت.",
};

export default function AdminSourceReviewPage() {
  return (
    <AdminShell>
      <SourceReviewBoard items={getSourceReviewItems()} />
    </AdminShell>
  );
}
