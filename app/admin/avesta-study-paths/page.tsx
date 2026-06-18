import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AvestaStudyPathControlBoard } from "@/components/admin/avesta-study-path-control-board";
import { getAvestaStudyPathControlItems } from "@/lib/avesta-study-path-control";

export const metadata: Metadata = {
  title: "مسیرهای شروع اوستا",
  description: "کنترل آمادگی، مالک، کمبودها و چک‌لیست انتشار مسیرهای شروع مطالعه اوستا."
};

export default function AdminAvestaStudyPathsPage() {
  return (
    <AdminShell>
      <AvestaStudyPathControlBoard items={getAvestaStudyPathControlItems()} />
    </AdminShell>
  );
}
