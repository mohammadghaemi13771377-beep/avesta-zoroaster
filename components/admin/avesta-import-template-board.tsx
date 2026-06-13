import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, DatabaseZap, FileJson, Sheet, ShieldCheck } from "lucide-react";
import { buildAvestaCsvTemplate, getAvestaImportTemplate } from "@/lib/avesta-import-template";

export function AvestaImportTemplateBoard() {
  const template = getAvestaImportTemplate();
  const csv = buildAvestaCsvTemplate(template.rows);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">AVESTA IMPORT TEMPLATE</p>
          <h2 className="mt-3 text-3xl font-black text-warm">قالب ورود دسته‌ای محتوای طلایی اوستا</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این قالب برای پر کردن ستون‌های اصلی هر بند اوستا ساخته شده: متن اصلی، آوانویسی، ترجمه کلاسیک، بازنویسی
            ساده، تحلیل، پیام اخلاقی، نقل‌قول، تصویر، صوت، منبع و SEO.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="نسخه" value={template.version} />
          <Metric label="ردیف" value={String(template.rows.length)} />
          <Metric label="content" value={String(template.payload.content?.length ?? 0)} />
          <Metric label="media" value={String(template.payload.media?.length ?? 0)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-gold/10 bg-royal/45 p-5">
          <div className="flex items-center gap-2 text-gold-light">
            <ShieldCheck size={18} />
            <h3 className="font-black text-warm">چک‌لیست قبل از import</h3>
          </div>
          <ul className="mt-4 grid gap-2 text-sm leading-7 text-muted">
            {template.checklist.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <Link href="/admin/import" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
            رفتن به Import
            <ArrowLeft size={16} />
          </Link>
        </div>

        <div className="rounded-3xl border border-gold/10 bg-royal/45 p-5">
          <div className="flex items-center gap-2 text-gold-light">
            <DatabaseZap size={18} />
            <h3 className="font-black text-warm">API آماده</h3>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">
            خروجی JSON و CSV از API قابل دریافت است. در production می‌توان همین خروجی را به CSV download، Google Sheets یا CMS intake وصل کرد.
          </p>
          <div className="mt-4 grid gap-2 text-left text-xs" dir="ltr">
            <code className="rounded-2xl border border-gold/10 bg-night/70 p-3 text-gold-light">/api/admin/avesta-import-template</code>
            <code className="rounded-2xl border border-gold/10 bg-night/70 p-3 text-gold-light">/api/admin/avesta-import-template?format=csv</code>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <PreviewBlock icon={FileJson} title="JSON آماده dry-run" text={JSON.stringify(template.payload, null, 2)} />
        <PreviewBlock icon={Sheet} title="CSV نمونه برای تیم محتوا" text={csv} />
      </div>
    </section>
  );
}

function PreviewBlock({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-gold/10 bg-night/55 p-5">
      <div className="flex items-center gap-2 text-gold-light">
        <Icon size={18} />
        <h3 className="font-black text-warm">{title}</h3>
      </div>
      <pre className="mt-4 max-h-[520px] overflow-auto rounded-2xl border border-gold/10 bg-black/30 p-4 text-left text-xs leading-6 text-gold-light" dir="ltr">
        {text}
      </pre>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-black text-gold-light">{value}</p>
    </div>
  );
}
