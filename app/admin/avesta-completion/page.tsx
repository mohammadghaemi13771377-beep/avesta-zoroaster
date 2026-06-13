import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AvestaCompletionBoard } from "@/components/admin/avesta-completion-board";
import { getAvestaCompletionSections } from "@/lib/avesta-completion";

export const metadata: Metadata = {
  title: "تکمیل محتوای اوستا",
  description: "ماتریس تکمیل متن، ترجمه، بازنویسی، تحلیل، تصویر، صوت، منبع و SEO برای بخش‌های اوستا.",
};

export default function AdminAvestaCompletionPage() {
  return (
    <AdminShell>
      <AvestaCompletionBoard sections={getAvestaCompletionSections()} />
    </AdminShell>
  );
}
