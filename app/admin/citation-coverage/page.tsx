import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { CitationCoverageBoard } from "@/components/admin/citation-coverage-board";
import { getCitationCoverageItems } from "@/lib/citation-coverage";

export const metadata: Metadata = {
  title: "پوشش ارجاع اوستا | AVESTA-ZOROASTER",
  description: "داشبورد مدیریتی پوشش citation، ریسک منبع و اقدام بعدی برای بخش‌های اوستا.",
};

export default function AdminCitationCoveragePage() {
  return (
    <AdminShell>
      <CitationCoverageBoard items={getCitationCoverageItems()} />
    </AdminShell>
  );
}
