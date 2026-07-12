import type { Metadata } from "next";

import { CinematicHub } from "@/components/cinematic-hub";
import { MuseumTourPanel } from "@/components/museum-tour-panel";
import { getMuseumTour, getMuseumTourStats } from "@/lib/museum-tour";

export const metadata: Metadata = {
  title: "تور موزه‌ای جهان اوستا | AVESTA-ZOROASTER",
  description:
    "تور هدایت‌شده و سینمایی برای تجربه پورتال اوستا، گات‌ها، واژه روز، رسانه، راهنمای روزانه و نورسنج اشا.",
};

export default function TourPage() {
  const tour = getMuseumTour();

  return (
    <CinematicHub
      eyebrow="تور موزه‌ای"
      title="تور موزه‌ای جهان اوستا"
      lead="یک مسیر هدایت‌شده شبیه موزه دیجیتال؛ از آتش و گات‌ها تا واژه روز، رسانه، راهنمای روزانه و نورسنج اشا."
      scene="scene-stone"
      heroImage="/images/ai/exhibitions-hero.jpg"
      actions={[
        { label: "ورود به پورتال اوستا", href: "/avesta" },
        { label: "نمایشگاه‌ها", href: "/exhibitions", variant: "secondary" },
      ]}
      stats={getMuseumTourStats()}
    >
      <MuseumTourPanel tour={tour} />
    </CinematicHub>
  );
}
