import type { Metadata } from "next";
import { Suspense } from "react";
import { CinematicHub } from "@/components/cinematic-hub";
import { MonotheismPathsBoard } from "@/components/monotheism-paths-board";
import { getMonotheismPaths } from "@/lib/monotheism-paths";

export const metadata: Metadata = {
  title: "مسیرهای یکتاپرستی | AVESTA-ZOROASTER",
  description: "مسیرهای موضوعی برای شناخت اهورامزدا، اشا، اختیار انسان و پندار نیک، گفتار نیک، کردار نیک.",
};

export default function MonotheismPathsPage() {
  return (
    <CinematicHub
      eyebrow="Monotheism Paths"
      title="مسیرهای زنده یکتاپرستی"
      lead="اینجا یکتاپرستی فقط توضیح داده نمی‌شود؛ به مسیر مطالعه، واژه، آیه، مقاله و تمرین اخلاقی روزانه تبدیل می‌شود."
      scene="scene-cosmic"
      roman="M"
      actions={[
        { label: "شروع مسیرها", href: "/monotheism/paths?path=ahura-mazda" },
        { label: "تمرین هفت‌روزه", href: "/practice", variant: "secondary" },
      ]}
      stats={[
        { value: "۴", label: "مسیر موضوعی" },
        { value: "اشا", label: "راستی و نظم اخلاقی" },
        { value: "امروز", label: "تمرین قابل اجرا" },
      ]}
    >
      <section>
        <Suspense fallback={<div className="lux-frame p-6 text-muted">در حال آماده‌سازی مسیرها...</div>}>
        <MonotheismPathsBoard paths={getMonotheismPaths()} />
        </Suspense>
      </section>
    </CinematicHub>
  );
}
