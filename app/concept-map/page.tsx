import type { Metadata } from "next";
import { CinematicHub } from "@/components/cinematic-hub";
import { ConceptMapBoard } from "@/components/concept-map-board";
import { getConceptMap } from "@/lib/concept-map";

export const metadata: Metadata = {
  title: "نقشه مفهومی اوستا | AVESTA-ZOROASTER",
  description:
    "نقشه شبکه‌ای مفاهیم اوستا، زرتشت، گات‌ها، اهورامزدا، اشا، وهومن، مقاله‌ها و مسیرهای مطالعه.",
};

export default function ConceptMapPage() {
  const map = getConceptMap();

  return (
    <CinematicHub
      eyebrow="Concept Map"
      title="نقشه مفهومی جهان اوستا"
      lead="این نقشه نشان می‌دهد مفاهیم بنیادین، واژه‌ها، متن‌ها، مقاله‌ها و هاب‌های تجربه چگونه به هم وصل می‌شوند؛ یک راه بصری برای کاوش جهان AVESTA-ZOROASTER."
      scene="scene-cosmic"
      roman="N"
      actions={[
        { label: "کاوش نقشه", href: "#concept-map" },
        { label: "واژه‌نامه", href: "/dictionary", variant: "secondary" },
      ]}
      stats={[
        { value: String(map.summary.nodes), label: "گره مفهومی" },
        { value: String(map.summary.links), label: "پیوند داخلی" },
        { value: String(map.summary.types), label: "نوع محتوا" },
      ]}
    >
      <div id="concept-map" className="scroll-mt-28">
        <ConceptMapBoard nodes={map.nodes} links={map.links} />
      </div>
    </CinematicHub>
  );
}
