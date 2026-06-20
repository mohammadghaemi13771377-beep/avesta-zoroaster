import type { Metadata } from "next";
import { GlobalGrowthAuditBoard } from "@/components/admin/global-growth-audit-board";
import { getGlobalGrowthAuditItems } from "@/lib/global-growth-audit";

export const metadata: Metadata = {
  title: "Global Growth Audit | AVESTA-ZOROASTER Admin",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminGlobalGrowthAuditPage() {
  return <GlobalGrowthAuditBoard items={getGlobalGrowthAuditItems()} />;
}
