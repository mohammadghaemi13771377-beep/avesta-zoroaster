import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { AvestaStudyPathsPanel } from "@/components/avesta-study-paths-panel";
import { getAvestaStudyPaths } from "@/lib/avesta-study-paths";

export const metadata: Metadata = {
  title: "مسیرهای شروع اوستا",
  description: "مسیرهای راهنما برای شروع مطالعه اوستا بر اساس نیت، زمان، علاقه و سطح آشنایی کاربر."
};

export default function AvestaStudyPathsPage() {
  const paths = getAvestaStudyPaths();

  return (
    <main className="overflow-hidden pt-24" dir="rtl">
      <section className="hero-cosmos relative px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <div className="hero-horizon" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Link
            href="/avesta"
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-black/22 px-4 py-2 text-sm font-bold text-gold-light transition hover:border-gold/55"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به پورتال اوستا
          </Link>
          <div className="mt-10 max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black text-gold-light">
              <Compass className="h-4 w-4" />
              AVESTA STUDY PATHS
            </p>
            <h1 className="gold-text mt-5 text-5xl font-black leading-tight sm:text-7xl">مسیرهای شروع مطالعه اوستا</h1>
            <p className="mt-6 max-w-3xl text-lg leading-10 text-warm/82">
              اگر نمی‌دانی از کجا شروع کنی، این صفحه مسیرهای آماده را بر اساس حال‌وهوا، زمان و علاقه تو پیشنهاد می‌کند.
            </p>
          </div>
        </div>
      </section>

      <AvestaStudyPathsPanel paths={paths} />
    </main>
  );
}
