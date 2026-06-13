import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { EventTrackingBoard } from "@/components/admin/event-tracking-board";
import { getTrackingEventMatrix } from "@/lib/event-tracking";

export const metadata: Metadata = {
  title: "ماتریس Event Tracking | AVESTA-ZOROASTER",
  description: "قرارداد event tracking برای PostHog، GA4، first-party events، newsletter و commerce.",
};

export default function AdminEventTrackingPage() {
  return (
    <AdminShell>
      <EventTrackingBoard events={getTrackingEventMatrix()} />
    </AdminShell>
  );
}
