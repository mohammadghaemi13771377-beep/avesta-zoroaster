import type { Metadata } from "next";
import { BookOpen, Compass, Flame, Sparkles } from "lucide-react";

import { CinematicHub } from "@/components/cinematic-hub";
import { StudyPlanBoard } from "@/components/study-plan-board";
import { studyPlanSteps } from "@/lib/study-plan";

export const metadata: Metadata = {
  title: "برنامه مطالعه اوستا",
  description: "مسیر ۷ روزه برای ورود مرحله‌به‌مرحله به اوستا، گات‌ها، واژه‌نامه، یکتاپرستی، تاریخ و رسانه.",
};

export default function StudyPlanPage() {
  return (
    <CinematicHub
      eyebrow="Study Journey"
      title="برنامه مطالعه اوستا و زرتشت"
      lead="یک مسیر کوتاه، روشن و سینمایی برای کاربرانی که می‌خواهند از دروازه اصلی وارد شوند و قدم‌به‌قدم با اوستا، گات‌ها، اشا، یکتاپرستی و ایران باستان آشنا شوند."
      scene="scene-sunrise"
      roman="VII"
      actions={[
        { label: "شروع مسیر", href: "#study-plan" },
        { label: "اوستای امروز", href: "/", variant: "secondary" },
      ]}
      stats={[
        { value: "۷", label: "قدم مطالعاتی" },
        { value: "۹۵", label: "دقیقه مسیر پیشنهادی" },
        { value: "Local", label: "ذخیره پیشرفت روی دستگاه" },
      ]}
    >
      <div className="study-plan-page grid gap-5 md:grid-cols-3">
        {[
          ["بدون سردرگمی", "کاربر از ابتدا با فهرست سنگین اوستا تنها نمی‌ماند.", Compass],
          ["تجربه روزانه", "هر قدم کوتاه، قابل انجام و متصل به صفحه واقعی سایت است.", Flame],
          ["آماده پروفایل", "پیشرفت فعلاً محلی ذخیره می‌شود و بعداً به حساب کاربری وصل می‌شود.", BookOpen],
        ].map(([title, description, Icon]) => (
          <article key={String(title)} className="study-plan-feature-card lux-frame p-6">
            <Icon className="text-gold-light" size={28} />
            <h2 className="mt-5 text-2xl font-black text-warm">{title}</h2>
            <p className="mt-3 text-sm leading-8 text-muted">{description}</p>
          </article>
        ))}
      </div>

      <div id="study-plan" className="study-plan-anchor pt-6">
        <StudyPlanBoard steps={studyPlanSteps} />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="study-plan-future-panel lux-frame p-7">
          <div className="flex items-center gap-2 text-gold-light">
            <Sparkles size={20} />
            <h2 className="text-2xl font-black">نسخه آینده</h2>
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-8 text-muted">
            در فاز دیتابیس، همین برنامه مطالعه می‌تواند شخصی‌سازی شود: مسیر مخصوص گات‌ها، مسیر مخصوص واژه‌نامه، مسیر
            صوتی، مسیر کودکان، و مسیر پژوهشی برای کاربران حرفه‌ای.
          </p>
        </div>
      </section>
    </CinematicHub>
  );
}
