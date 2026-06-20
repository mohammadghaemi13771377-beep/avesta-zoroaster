import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { SourceIntakeHubBoard } from "@/components/admin/source-intake-hub-board";
import { getSourceIntakeItems } from "@/lib/source-intake-hub";

export const metadata: Metadata = {
  title: "مرکز ورود منابع | AVESTA-ZOROASTER Admin",
  description: "داشبورد مدیریت آمادگی منابع، ارجاع‌ها و دارایی‌های پژوهشی اوستا.",
  robots: { index: false, follow: false },
};

export default function AdminSourceIntakePage() {
  return <AdminShell><SourceIntakeHubBoard items={getSourceIntakeItems()} /></AdminShell>;
}
