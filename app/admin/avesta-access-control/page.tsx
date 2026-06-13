import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AvestaAccessControlBoard } from "@/components/admin/avesta-access-control-board";
import { getAvestaAccessPolicy } from "@/lib/avesta-access-control";
import { routeMap } from "@/lib/content";

export const metadata: Metadata = {
  title: "گارد دسترسی اوستا | AVESTA-ZOROASTER",
  description: "کنترل دسترسی anonymous، reader، editor و admin برای مسیرهای اوستا بر اساس visibility و Feature Flags.",
};

export default function AdminAvestaAccessControlPage() {
  return (
    <AdminShell>
      <AvestaAccessControlBoard policy={getAvestaAccessPolicy(routeMap)} />
    </AdminShell>
  );
}
