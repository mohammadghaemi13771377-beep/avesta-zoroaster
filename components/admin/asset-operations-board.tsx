import Link from "next/link";
import { ArrowLeft, DatabaseBackup, FileAudio, FileText, ImagePlus, Server, Video, type LucideIcon } from "lucide-react";
import {
  assetOperationStatusLabels,
  assetOperationStatusTone,
  getAssetOperationSummary,
  type AssetOperationChannel,
  type AssetOperationStatus
} from "@/lib/asset-operations";
import type { UploadKind } from "@/lib/upload-storage";

type AssetOperationsBoardProps = {
  channels: AssetOperationChannel[];
  checklist: string[];
};

const kindIcon: Record<UploadKind, LucideIcon> = {
  image: ImagePlus,
  audio: FileAudio,
  pdf: FileText,
  video: Video
};

const statusOrder: AssetOperationStatus[] = ["needs-storage", "needs-backup", "needs-review", "ready-local"];

export function AssetOperationsBoard({ channels, checklist }: AssetOperationsBoardProps) {
  const summary = getAssetOperationSummary(channels);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">ASSET OPERATIONS</p>
          <h1 className="mt-3 text-4xl font-black text-warm">فرماندهی دارایی‌ها و Storage</h1>
          <p className="mt-4 max-w-3xl leading-8 text-muted">
            این صفحه مسیر واقعی تصویر، صوت، PDF و ویدئو را روشن می‌کند: الان فایل‌ها در public local می‌نشینند؛ برای production
            باید storage، CDN، بکاپ و metadata نهایی آماده شود تا ورود محتوای سنگین سایت امن و قابل نگهداری باشد.
          </p>
        </div>
        <Link href="/api/admin/asset-operations" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
          خروجی JSON
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="کانال upload" value={String(summary.channels)} />
        <Metric label="دارایی تصویری" value={String(summary.visualAssets)} />
        <Metric label="Hero و Cover" value={String(summary.routeHeroes + summary.sectionCovers)} />
        <Metric label="آمادگی بکاپ" value={`${summary.backupCoverage}%`} />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        {channels.map((channel) => {
          const Icon = kindIcon[channel.kind];

          return (
            <article key={channel.kind} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${assetOperationStatusTone[channel.status]}`}>
                    <Server size={14} />
                    {assetOperationStatusLabels[channel.status]}
                  </span>
                  <h2 className="mt-3 text-2xl font-black text-warm">{channel.label}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted">{channel.nextAction}</p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-royal/45 px-5 py-4 text-center">
                  <Icon className="mx-auto text-gold-light" size={22} />
                  <p className="mt-2 text-sm font-black uppercase text-warm">{channel.kind}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Info label="پوشه local" value={channel.localDirectory} />
                <Info label="مسیر عمومی" value={channel.publicPath} />
                <Info label="حجم مجاز" value={channel.maxSizeLabel} />
                <Info label="Storage هدف" value={channel.productionTarget} />
              </div>

              <div className="mt-4 rounded-2xl border border-gold/10 bg-royal/35 p-4">
                <p className="text-xs font-black text-gold-light">فرمت‌های مجاز</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {channel.allowedExtensions.map((extension) => (
                    <span key={extension} className="rounded-full border border-gold/10 bg-night/45 px-3 py-2 text-xs font-bold text-warm">
                      {extension}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-gold/10 bg-gold/10 p-5">
          <div className="flex items-center gap-3 text-gold-light">
            <DatabaseBackup size={22} />
            <p className="text-xs font-black">Production Checklist</p>
          </div>
          <div className="mt-4 grid gap-3">
            {checklist.map((item) => (
              <p key={item} className="rounded-2xl border border-gold/10 bg-night/45 px-4 py-3 text-sm font-bold leading-7 text-warm">
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gold/10 bg-night/55 p-5">
          <p className="text-xs font-black text-gold-light">مسیرهای مرتبط</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Action href="/admin/media" title="Media Upload" body="آپلود محلی تصویر، صوت، PDF و ویدئو." />
            <Action href="/admin/visual-assets" title="Visual Assets" body="Prompt، نسبت تصویر، مسیر پیشنهادی و review تصویرها." />
            <Action href="/admin/content-export" title="Content Export" body="snapshot کامل محتوا و manifest دارایی‌ها." />
            <Action href="/admin/deployment-readiness" title="Deployment" body="وضعیت Vercel، env، storage و smoke test." />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {statusOrder.map((status) => (
          <span key={status} className={`rounded-full border px-3 py-1 text-xs font-black ${assetOperationStatusTone[status]}`}>
            {assetOperationStatusLabels[status]}
          </span>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4 text-center">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-2xl font-black text-gold-light">{value}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/35 p-4">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-black leading-6 text-warm" dir="ltr">
        {value}
      </p>
    </div>
  );
}

function Action({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-gold/10 bg-royal/35 p-4 transition hover:border-gold/40">
      <h3 className="text-lg font-black text-warm">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{body}</p>
    </Link>
  );
}
