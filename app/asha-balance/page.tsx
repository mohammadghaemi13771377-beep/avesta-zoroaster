import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { AshaBalancePanel } from "@/components/asha-balance-panel";
import { getAshaBalanceStats } from "@/lib/asha-balance";

export const metadata: Metadata = {
  title: "نورسنج اشا | AVESTA-ZOROASTER",
  description: "داشبورد تعادل پندار نیک، گفتار نیک و کردار نیک بر اساس تمرین، استمرار و مأموریت‌های کاربر.",
};

export default function AshaBalancePage() {
  return (
    <CinematicHub
      eyebrow="Asha Balance"
      title="نورسنج اشا"
      lead="تعادل زنده پندار، گفتار و کردار؛ جایی که رفتار روزانه به زبان روشنایی، اشا و استمرار ترجمه می‌شود."
      scene="scene-sunrise"
      roman="A"
      actions={[
        { label: "دیدن نورسنج", href: "#asha-balance" },
        { label: "تمرین اخلاقی", href: "/practice", variant: "secondary" },
      ]}
      stats={getAshaBalanceStats()}
    >
      <div id="asha-balance" className="scroll-mt-28">
        <AshaBalancePanel />
      </div>
    </CinematicHub>
  );
}
