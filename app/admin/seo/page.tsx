import type { Metadata } from "next";
import Link from "next/link";
import { Bot, FileJson, Globe2, ListChecks, Search } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { routeMap } from "@/lib/content";
import { searchIndexes } from "@/lib/search";
import { siteConfig } from "@/lib/seo";
import { adminDashboard } from "@/lib/sample-content";

export const metadata: Metadata = {
  title: "SEO",
  description: "داشبورد SEO، sitemap، robots، schema و آماده‌سازی ایندکس AVESTA-ZOROASTER.",
};

const seoTools = [
  {
    title: "Sitemap",
    description: "مسیرهای ثابت، چندزبانه و صفحات جزئیات در sitemap.xml قرار می‌گیرند.",
    href: "/sitemap.xml",
    icon: Globe2,
  },
  {
    title: "Robots",
    description: "پنل ادمین و APIهای حساس از ایندکس عمومی خارج شده‌اند.",
    href: "/robots.txt",
    icon: Bot,
  },
  {
    title: "Schema",
    description: "مقاله‌ها، واژه‌نامه و رسانه‌ها به JSON-LD مجهز شده‌اند.",
    href: "/articles",
    icon: FileJson,
  },
  {
    title: "Search Index",
    description: "ساختار Meilisearch برای اوستا، مقاله، واژه‌نامه، کتابخانه و رسانه آماده است.",
    href: "/api/search/indexes",
    icon: Search,
  },
];

export default function AdminSeoPage() {
  return (
    <AdminShell>
      <p className="gold-text text-sm font-semibold tracking-[0.24em]">SEO Console</p>
      <h1 className="mt-4 text-5xl font-black text-warm">مدیریت SEO و ایندکس</h1>
      <p className="mt-5 max-w-3xl text-lg leading-9 text-muted">
        کنترل metadata، schema، sitemap، robots و وضعیت آماده‌سازی Meilisearch برای دامنه {siteConfig.domain}.
      </p>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        <MetricCard label="Route Map" value={`${routeMap.length}`} description="مسیر ثابت در معماری سایت" />
        <MetricCard label="Search Index" value={`${searchIndexes.length}`} description="ایندکس آماده برای Meilisearch" />
        <MetricCard label="Domain" value={siteConfig.domain} description="دامنه اصلی پروژه" />
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {seoTools.map(({ title, description, href, icon: Icon }) => (
          <Link key={title} href={href} className="lux-frame group p-5 transition hover:border-gold/45 hover:bg-gold/10">
            <Icon className="text-gold-light" size={28} />
            <h2 className="mt-4 text-xl font-black text-warm">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
          </Link>
        ))}
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {adminDashboard.seoChecks.map((check) => (
          <article key={check.label} className="lux-frame p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ListChecks className="text-gold-light" size={20} />
                <h2 className="text-xl font-black text-warm">{check.label}</h2>
              </div>
              <span className="text-gold-light">{check.score}%</span>
            </div>
            <p className="mt-3 text-muted">{check.status}</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${check.score}%` }} />
            </div>
          </article>
        ))}
      </section>
    </AdminShell>
  );
}

function MetricCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <article className="lux-frame p-6">
      <p className="text-sm font-bold text-gold-light">{label}</p>
      <h2 className="mt-3 text-3xl font-black text-warm" dir="ltr">
        {value}
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
    </article>
  );
}
