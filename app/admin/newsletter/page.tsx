import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { NewsletterCommandBoard } from "@/components/admin/newsletter-command-board";
import { newsletterEditions } from "@/lib/newsletter-editions";

export const metadata: Metadata = {
  title: "ادمین خبرنامه",
  description: "پنل مدیریت شماره‌های خبرنامه روشنایی، نورنامه‌ها، موضوع‌ها و وضعیت آماده‌سازی ارسال.",
};

export default function AdminNewsletterPage() {
  return (
    <AdminShell>
      <NewsletterCommandBoard editions={newsletterEditions} />
    </AdminShell>
  );
}
