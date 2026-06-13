import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { NewsletterSendTimeBoard } from "@/components/admin/newsletter-send-time-board";
import { newsletterSendTimeSlots } from "@/lib/newsletter-send-times";

export const metadata: Metadata = {
  title: "زمان ارسال خبرنامه",
  description: "بهینه‌ساز زمان ارسال نورنامه بر اساس نرخ باز شدن، کلیک، ریسک و مناسبت.",
};

export default function AdminNewsletterSendTimesPage() {
  return (
    <AdminShell>
      <NewsletterSendTimeBoard slots={newsletterSendTimeSlots} />
    </AdminShell>
  );
}
