import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { NewsletterAnalyticsBoard } from "@/components/admin/newsletter-analytics-board";
import { newsletterAnalytics } from "@/lib/newsletter-analytics";
import { newsletterEditions } from "@/lib/newsletter-editions";

export const metadata: Metadata = {
  title: "آنالیتیکس خبرنامه",
  description: "داشبورد نرخ باز شدن، کلیک، تبدیل و لغو عضویت خبرنامه روشنایی.",
};

export default function AdminNewsletterAnalyticsPage() {
  return (
    <AdminShell>
      <NewsletterAnalyticsBoard editions={newsletterEditions} metrics={newsletterAnalytics} />
    </AdminShell>
  );
}
