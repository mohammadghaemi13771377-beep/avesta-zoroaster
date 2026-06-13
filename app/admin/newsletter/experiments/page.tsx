import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { NewsletterExperimentBoard } from "@/components/admin/newsletter-experiment-board";
import { newsletterExperiments } from "@/lib/newsletter-experiments";

export const metadata: Metadata = {
  title: "آزمایش A/B خبرنامه",
  description: "لابراتوار آزمایش subject، preheader و CTA برای شماره‌های خبرنامه روشنایی.",
};

export default function AdminNewsletterExperimentsPage() {
  return (
    <AdminShell>
      <NewsletterExperimentBoard experiments={newsletterExperiments} />
    </AdminShell>
  );
}
