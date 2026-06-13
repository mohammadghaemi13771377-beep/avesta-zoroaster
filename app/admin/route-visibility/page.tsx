import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { RouteVisibilityAuditBoard } from "@/components/admin/route-visibility-audit-board";
import { getRouteVisibilityAuditItems } from "@/lib/route-visibility-audit";

export const metadata: Metadata = {
  title: "Route Visibility Audit | AVESTA-ZOROASTER",
  description: "Audit مسیرها، sitemap، navigation و index عمومی بر اساس Feature Flags اوستا.",
};

export default function AdminRouteVisibilityPage() {
  return (
    <AdminShell>
      <RouteVisibilityAuditBoard items={getRouteVisibilityAuditItems()} />
    </AdminShell>
  );
}
