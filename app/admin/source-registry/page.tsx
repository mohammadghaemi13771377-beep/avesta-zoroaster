import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { SourceRegistryBoard } from "@/components/admin/source-registry-board";
import { getSourceRegistryRecords } from "@/lib/source-registry";

export const metadata: Metadata = {
  title: "رجیستری منابع | AVESTA-ZOROASTER",
  description: "فهرست رسمی منابع پژوهشی، ترجمه‌ها، آرشیوها و policy استفاده برای citationهای پروژه.",
};

export default function AdminSourceRegistryPage() {
  return (
    <AdminShell>
      <SourceRegistryBoard records={getSourceRegistryRecords()} />
    </AdminShell>
  );
}
