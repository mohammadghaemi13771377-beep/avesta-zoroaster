import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { PersonalDashboardPanel } from "@/components/personal-dashboard-panel";
import { getPersonalDashboardStats } from "@/lib/personal-dashboard";

export const metadata: Metadata = {
  title: "نورخانه شخصی | AVESTA-ZOROASTER",
  description:
    "داشبورد شخصی کاربر برای ادامه مطالعه، اوستای امروز، استمرار، مأموریت‌ها، نشان‌ها و پیشنهادهای روزانه.",
};

export default function DashboardPage() {
  return (
    <CinematicHub
      eyebrow="Personal Command Center"
      title="نورخانه شخصی"
      lead="مرکز ورود روزانه کاربر به جهان اوستا: ادامه مطالعه، پیام امروز، زنجیره روشنایی، مأموریت بعدی و نشان‌های مسیر."
      scene="scene-cosmic"
      roman="1"
      actions={[
        { label: "دیدن مسیر امروز", href: "#dashboard" },
        { label: "راهنمای روزانه", href: "/daily-light", variant: "secondary" },
      ]}
      stats={getPersonalDashboardStats()}
    >
      <div id="dashboard" className="scroll-mt-28">
        <PersonalDashboardPanel />
      </div>
    </CinematicHub>
  );
}
