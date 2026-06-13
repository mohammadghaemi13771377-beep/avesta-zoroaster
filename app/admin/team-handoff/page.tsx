import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { TeamHandoffBoard } from "@/components/admin/team-handoff-board";
import { teamHandoffItems } from "@/lib/team-handoff";

export const metadata: Metadata = {
  title: "تحویل به تیم‌ها",
  description: "کنسول تحویل پروژه AVESTA-ZOROASTER به تیم‌های فنی، محصول، دیزاین، محتوا، رسانه، رشد و فروشگاه.",
};

export default function AdminTeamHandoffPage() {
  return (
    <AdminShell>
      <TeamHandoffBoard items={teamHandoffItems} />
    </AdminShell>
  );
}
