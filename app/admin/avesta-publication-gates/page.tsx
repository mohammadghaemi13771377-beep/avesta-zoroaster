import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AvestaPublicationGateBoard } from "@/components/admin/avesta-publication-gate-board";
import { getAvestaPublicationGates } from "@/lib/avesta-publication-gates";

export const metadata: Metadata = {
  title: "دروازه انتشار اوستا | AVESTA-ZOROASTER",
  description: "Publication Gate برای سنجش آمادگی انتشار بخش‌های اوستا از نظر محتوا، منبع، citation و کیفیت صفحه.",
};

export default function AdminAvestaPublicationGatesPage() {
  return (
    <AdminShell>
      <AvestaPublicationGateBoard gates={getAvestaPublicationGates()} />
    </AdminShell>
  );
}
