import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { DeploymentReadinessBoard } from "@/components/admin/deployment-readiness-board";
import { deploymentReadinessItems } from "@/lib/deployment-readiness";

export const metadata: Metadata = {
  title: "تحویل GitHub و Vercel | AVESTA-ZOROASTER",
  description: "کنسول آمادگی deploy برای GitHub، Vercel، envها، دیتابیس، دامنه و سرویس‌های production.",
};

export default function AdminDeploymentReadinessPage() {
  return (
    <AdminShell>
      <DeploymentReadinessBoard items={deploymentReadinessItems} />
    </AdminShell>
  );
}
