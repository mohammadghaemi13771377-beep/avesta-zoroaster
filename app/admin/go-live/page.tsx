import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { GoLiveBoard } from "@/components/admin/go-live-board";
import { getGoLiveGates } from "@/lib/go-live";

export const metadata: Metadata = {
  title: "Go-Live Command",
  description: "اتاق کنترل بالا آوردن سایت AVESTA-ZOROASTER روی دامنه production.",
};

export default function AdminGoLivePage() {
  return (
    <AdminShell>
      <GoLiveBoard gates={getGoLiveGates()} />
    </AdminShell>
  );
}
