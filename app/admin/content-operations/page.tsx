import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ContentOperationsBoard } from "@/components/admin/content-operations-board";
import { getContentOperationsPlan } from "@/lib/content-operations";

export const metadata: Metadata = {
  title: "اتاق عملیات محتوا | AVESTA-ZOROASTER",
  description: "برنامه عملیاتی تولید محتوا، تصویر، صوت، منبع و زیرساخت ادمین بر اساس inventory و صف تولید AVESTA-ZOROASTER.",
};

export default function AdminContentOperationsPage() {
  return (
    <AdminShell>
      <ContentOperationsBoard plan={getContentOperationsPlan()} />
    </AdminShell>
  );
}
