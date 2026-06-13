import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AvestaReleaseWaveBoard } from "@/components/admin/avesta-release-wave-board";
import { getAvestaReleaseWaves } from "@/lib/avesta-release-waves";

export const metadata: Metadata = {
  title: "موج‌های انتشار اوستا | AVESTA-ZOROASTER",
  description: "برنامه مرحله‌ای انتشار اوستا بر اساس Publication Gate، موج داخلی، بتا و عمومی.",
};

export default function AdminAvestaReleaseWavesPage() {
  return (
    <AdminShell>
      <AvestaReleaseWaveBoard waves={getAvestaReleaseWaves()} />
    </AdminShell>
  );
}
