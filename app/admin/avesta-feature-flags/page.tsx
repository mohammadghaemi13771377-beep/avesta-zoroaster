import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AvestaFeatureFlagBoard } from "@/components/admin/avesta-feature-flag-board";
import { getAvestaFeatureFlags } from "@/lib/avesta-feature-flags";

export const metadata: Metadata = {
  title: "Feature Flag اوستا | AVESTA-ZOROASTER",
  description: "کنترل نمایش داخلی، بتا و عمومی بخش‌های اوستا بر اساس موج انتشار و Publication Gate.",
};

export default function AdminAvestaFeatureFlagsPage() {
  return (
    <AdminShell>
      <AvestaFeatureFlagBoard flags={getAvestaFeatureFlags()} />
    </AdminShell>
  );
}
