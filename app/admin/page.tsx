import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowLeft, Database, Gauge, HeartPulse, Settings } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { AuditLogBoard } from "@/components/admin/audit-log-board";
import { EditorialWorkflowBoard } from "@/components/admin/editorial-workflow-board";
import { LaunchReadinessBoard } from "@/components/admin/launch-readiness-board";
import { RoleAccessBoard } from "@/components/admin/role-access-board";
import { AdminContentForm } from "@/components/admin-content-form";
import { getAdminStats, getProjectHealth } from "@/lib/admin-stats";
import { getAuditLogEntries } from "@/lib/audit-log";
import { editorialTasks } from "@/lib/editorial-workflow";
import { launchReadinessItems } from "@/lib/launch-readiness";

export const metadata: Metadata = {
  title: "پنل مدیریت",
  description: "داشبورد مدیریت محتوای AVESTA-ZOROASTER.",
};

export default async function AdminPage() {
  const adminDashboard = await getAdminStats();
  const projectHealth = await getProjectHealth();
  const auditEntries = await getAuditLogEntries();

  return (
    <AdminShell>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="gold-text text-sm font-semibold tracking-[0.24em]">Admin Dashboard</p>
          <h1 className="mt-4 text-5xl font-black leading-[1.25] text-warm">پنل مدیریت AVESTA-ZOROASTER</h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-muted">
            مرکز کنترل محتوای اوستا، مقاله‌ها، واژه‌نامه، رسانه، SEO، صف انتشار و وضعیت آماده‌سازی پروژه.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-5 py-3 text-gold-light">
            <Settings size={18} />
            {adminDashboard.source === "database" ? "متصل به دیتابیس" : "آماده اتصال به CMS"}
          </div>
          <Link
            href="/api/admin/health"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-gold-light transition hover:bg-gold/10"
          >
            <HeartPulse size={18} />
            Health API
          </Link>
        </div>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminDashboard.metrics.map((metric) => (
          <article key={metric.label} className="lux-frame p-5">
            <div className="h-2 w-20 rounded-full" style={{ backgroundColor: metric.tone }} />
            <p className="mt-5 text-sm font-bold text-muted">{metric.label}</p>
            <p className="mt-2 text-4xl font-black text-warm">{metric.value}</p>
            <p className="mt-2 text-sm text-gold-light">{metric.change}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <article className="lux-frame p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gold-light">
              <Activity size={20} />
              <h2 className="text-2xl font-black">صف انتشار</h2>
            </div>
            <Link href="/admin/import" className="text-sm font-bold text-gold-light">
              ورود دسته‌ای
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            {adminDashboard.publishingQueue.map((item) => (
              <div key={`${item.title}-${item.type}`} className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-black text-warm">{item.title}</h3>
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                    {item.type}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  {item.status} / {item.owner}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="lux-frame p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gold-light">
              <Gauge size={20} />
              <h2 className="text-2xl font-black">وضعیت SEO</h2>
            </div>
            <Link href="/admin/seo" className="inline-flex items-center gap-2 text-sm font-bold text-gold-light">
              کنسول SEO
              <ArrowLeft size={15} />
            </Link>
          </div>
          <div className="mt-5 grid gap-4">
            {adminDashboard.seoChecks.map((check) => (
              <div key={check.label}>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-bold text-warm">{check.label}</span>
                  <span className="text-gold-light">
                    {check.status} / {check.score}%
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-warm/10">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${check.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="lux-frame mt-8 p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gold-light">
            <Database size={20} />
            <h2 className="text-2xl font-black">سلامت سیستم</h2>
          </div>
          <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-bold text-gold-light">
            {projectHealth.status}
          </span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {adminDashboard.systemHealth.map((item) => (
            <div key={item.label} className="rounded-2xl border border-gold/10 bg-night/55 p-4">
              <p className="text-sm font-bold text-gold-light">{item.label}</p>
              <p className="mt-2 leading-7 text-muted">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="editorial-workflow" className="mt-8">
        <EditorialWorkflowBoard tasks={editorialTasks} />
      </section>

      <section id="launch-readiness" className="mt-8">
        <LaunchReadinessBoard items={launchReadinessItems} />
      </section>

      <section id="roles" className="mt-8">
        <RoleAccessBoard />
      </section>

      <section id="audit-log" className="mt-8">
        <AuditLogBoard entries={auditEntries} />
      </section>

      <AdminContentForm />
    </AdminShell>
  );
}
