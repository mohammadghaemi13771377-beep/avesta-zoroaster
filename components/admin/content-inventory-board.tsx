import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Boxes, CheckCircle2, FileText, ImagePlus, Mic2, ShieldCheck, UploadCloud } from "lucide-react";
import type { ContentInventoryRealm, InventoryAssetType } from "@/lib/content-inventory";
import { getContentInventorySummary, inventoryAssetLabels } from "@/lib/content-inventory";
import { worldRealmStatusLabels } from "@/lib/world-map";

type ContentInventoryBoardProps = {
  realms: ContentInventoryRealm[];
};

const assetIcons: Record<InventoryAssetType, LucideIcon> = {
  text: FileText,
  image: ImagePlus,
  audio: Mic2,
  source: ShieldCheck,
  admin: Boxes,
};

export function ContentInventoryBoard({ realms }: ContentInventoryBoardProps) {
  const summary = getContentInventorySummary(realms);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">CONTENT INVENTORY</p>
          <h2 className="mt-3 text-3xl font-black text-warm">نقشه تکمیل محتوا و دارایی‌ها</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد نشان می‌دهد برای تبدیل سایت به جهان کامل، در هر قلمرو چند متن، تصویر، صوت، منبع و کار ادمینی
            لازم است و چه مقدار آماده شده.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <Metric label="قلمرو" value={String(summary.realms)} />
          <Metric label="لازم" value={formatNumber(summary.required)} />
          <Metric label="آماده" value={formatNumber(summary.ready)} />
          <Metric label="باقی" value={formatNumber(summary.remaining)} />
          <Metric label="تکمیل" value={`${summary.completion}%`} />
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-gold/10 bg-royal/45 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/25 text-gold-light">
              <UploadCloud size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-muted">مهم‌ترین قلمرو برای تکمیل</p>
              <h3 className="mt-1 text-xl font-black text-warm">{summary.nextRealm.title}</h3>
            </div>
          </div>
          <p className="max-w-2xl text-sm font-bold leading-7 text-gold-light">{summary.nextRealm.nextAction}</p>
        </div>
        <Link
          href="/admin/production"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
        >
          ساخت صف تولید از Inventory
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-5">
        {realms.map((realm) => (
          <article key={realm.realmId} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                    {worldRealmStatusLabels[realm.status]}
                  </span>
                  <span className="rounded-full border border-gold/10 bg-royal/60 px-3 py-1 text-xs font-black text-warm">
                    {realm.owner}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{realm.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{realm.nextAction}</p>
              </div>
              <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                <CheckCircle2 className="mx-auto text-gold-light" size={20} />
                <p className="mt-2 text-sm font-black text-warm">{realm.completion}% کامل</p>
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-warm/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${realm.completion}%` }} />
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-5">
              {(Object.keys(inventoryAssetLabels) as InventoryAssetType[]).map((asset) => {
                const Icon = assetIcons[asset];
                const required = realm.required[asset];
                const ready = realm.ready[asset];
                const percent = Math.round((ready / Math.max(required, 1)) * 100);

                return (
                  <div key={asset} className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
                    <Icon className="text-gold-light" size={18} />
                    <p className="mt-2 text-xs font-bold text-muted">{inventoryAssetLabels[asset]}</p>
                    <p className="mt-1 text-lg font-black text-warm">
                      {formatNumber(ready)} / {formatNumber(required)}
                    </p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-warm/10">
                      <div className="h-full rounded-full bg-gold" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href={realm.href}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              باز کردن قلمرو
              <ArrowLeft size={16} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-xl font-black text-gold-light">{value}</p>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
