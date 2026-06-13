import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { EditorialCommandCenter } from "@/components/admin/editorial-command-center";
import { PublishingCalendarBoard } from "@/components/admin/publishing-calendar-board";
import { editorialCommandTasks } from "@/lib/editorial-workflow";
import { getCalendarEventsWithTaskReadiness } from "@/lib/publishing-calendar";

export const metadata: Metadata = {
  title: "مرکز فرماندهی تحریریه",
  description: "مدیریت وظایف محتوا، منابع، رسانه، بازبینی و آماده‌سازی انتشار AVESTA-ZOROASTER.",
};

export default function AdminEditorialPage() {
  return (
    <AdminShell>
      <EditorialCommandCenter tasks={editorialCommandTasks} />
      <div className="mt-8">
        <PublishingCalendarBoard events={getCalendarEventsWithTaskReadiness()} />
      </div>
    </AdminShell>
  );
}
