import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { PublishingCalendarBoard } from "@/components/admin/publishing-calendar-board";
import { getCalendarEventsWithTaskReadiness } from "@/lib/publishing-calendar";

export const metadata: Metadata = {
  title: "تقویم انتشار",
  description: "تقویم انتشار، کمپین محتوا و برنامه‌ریزی SEO، رسانه، کتابخانه و فروشگاه AVESTA-ZOROASTER.",
};

export default function AdminCalendarPage() {
  return (
    <AdminShell>
      <PublishingCalendarBoard events={getCalendarEventsWithTaskReadiness()} />
    </AdminShell>
  );
}
