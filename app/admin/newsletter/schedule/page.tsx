import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { NewsletterScheduleBoard } from "@/components/admin/newsletter-schedule-board";
import { getNewsletterScheduleItems } from "@/lib/newsletter-schedule";

export const metadata: Metadata = {
  title: "تقویم ارسال خبرنامه",
  description: "اتاق کنترل صف ارسال نورنامه، چک‌لیست آماده‌سازی، زمان پیشنهادی و وضعیت انتشار هر شماره.",
};

export default function AdminNewsletterSchedulePage() {
  return (
    <AdminShell>
      <NewsletterScheduleBoard items={getNewsletterScheduleItems()} />
    </AdminShell>
  );
}
