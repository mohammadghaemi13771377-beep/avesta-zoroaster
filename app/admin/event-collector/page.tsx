import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { EventCollectorBoard } from "@/components/admin/event-collector-board";
import { getCollectedEvents } from "@/lib/event-collector";

export const metadata: Metadata = {
  title: "کلکتور رویدادها | AVESTA-ZOROASTER",
  description: "پیش‌نمایش first-party event collector و رویدادهای ثبت‌شده local.",
};

export default function AdminEventCollectorPage() {
  return (
    <AdminShell>
      <EventCollectorBoard events={getCollectedEvents()} />
    </AdminShell>
  );
}
