import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { TrustCenterBoard } from "@/components/trust-center-board";
import { getTrustCenterSummary, getTrustRecords } from "@/lib/trust-center";

export const metadata: Metadata = {
  title: "مرکز اعتماد و منابع | AVESTA-ZOROASTER",
  description:
    "مرکز شفافیت منابع، سطح اعتماد، وضعیت بازبینی و مسیر تکمیل پژوهشی برای متن‌های اوستا، مقاله‌ها، واژه‌نامه و کتابخانه.",
};

export default function TrustCenterPage() {
  const records = getTrustRecords();
  const summary = getTrustCenterSummary(records);

  return (
    <CinematicHub
      eyebrow="Trust Center"
      title="مرکز اعتماد، منابع و بازبینی پژوهشی"
      lead="برای اینکه AVESTA-ZOROASTER فقط زیبا نباشد و به یک مرجع جدی تبدیل شود، هر محتوا باید سطح اعتماد، منبع، وضعیت بازبینی و قدم بعدی پژوهشی داشته باشد."
      scene="scene-scroll"
      roman="T"
      actions={[
        { label: "دیدن نقشه اعتماد", href: "#trust-board" },
        { label: "مرکز ارجاع", href: "/citations", variant: "secondary" },
      ]}
      stats={[
        { value: `${summary.average}٪`, label: "میانگین اعتماد فعلی" },
        { value: String(summary.total), label: "رکورد قابل پایش" },
        { value: String(summary.verified), label: "مستند آماده انتشار" },
      ]}
    >
      <div id="trust-board" className="scroll-mt-28">
        <TrustCenterBoard records={records} />
      </div>
    </CinematicHub>
  );
}
