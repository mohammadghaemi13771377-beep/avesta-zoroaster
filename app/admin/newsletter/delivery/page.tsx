import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { NewsletterDeliveryBoard } from "@/components/admin/newsletter-delivery-board";
import { newsletterDeliveryEvents, newsletterDeliveryReports } from "@/lib/newsletter-delivery";

export const metadata: Metadata = {
  title: "پایش تحویل خبرنامه",
  description: "مانیتور تحویل نورنامه، bounce، complaint، retry و eventهای ارسال برای تیم رشد و محتوا.",
};

export default function AdminNewsletterDeliveryPage() {
  return (
    <AdminShell>
      <NewsletterDeliveryBoard reports={newsletterDeliveryReports} events={newsletterDeliveryEvents} />
    </AdminShell>
  );
}
