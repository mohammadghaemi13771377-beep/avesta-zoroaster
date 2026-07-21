import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { JourneyBuilderPanel } from "@/components/journey-builder-panel";
import { getJourneyBuilderStats, normalizeJourneyInput } from "@/lib/journey-builder";

export const metadata: Metadata = {
  title: "سازنده مسیر شخصی | AVESTA-ZOROASTER",
  description: "Journey Builder برای ساخت مسیر شخصی مطالعه، نیایش، رسانه و کردار روزانه در جهان اوستا.",
};

type JourneyBuilderPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function JourneyBuilderPage({ searchParams }: JourneyBuilderPageProps) {
  const initialInput = normalizeJourneyInput({
    intent: getFirstParam(searchParams?.intent) as never,
    pace: getFirstParam(searchParams?.pace) as never,
    level: getFirstParam(searchParams?.level) as never,
    mode: getFirstParam(searchParams?.mode) as never,
  });

  return (
    <CinematicHub
      eyebrow="Journey Builder"
      title="مسیر شخصی خودت در جهان اوستا را بساز"
      lead="به‌جای اینکه کاربر میان ده‌ها بخش گم شود، این ابزار بر اساس نیت، زمان، سطح و سبک تجربه، یک مسیر زنده و قابل ادامه پیشنهاد می‌دهد."
      scene="scene-sunrise"
      roman="J"
      actions={[
        { label: "شروع ساخت مسیر", href: "#builder" },
        { label: "برنامه ۷ روزه", href: "/study-plan", variant: "secondary" },
      ]}
      stats={getJourneyBuilderStats()}
    >
      <div id="builder" className="journey-builder-page scroll-mt-28">
        <JourneyBuilderPanel initialInput={initialInput} />
      </div>
    </CinematicHub>
  );
}

function getFirstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}
