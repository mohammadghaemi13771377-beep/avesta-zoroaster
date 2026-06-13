"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Boxes, CalendarClock, FileText, Filter, ImagePlus, Mic2, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import type { InventoryAssetType } from "@/lib/content-inventory";
import { inventoryAssetLabels } from "@/lib/content-inventory";
import type { ProductionQueueItem } from "@/lib/production-queue";
import { getProductionQueueSummary, productionStageLabels } from "@/lib/production-queue";
import { normalizeSearchText } from "@/lib/search";

type ProductionQueueBoardProps = {
  items: ProductionQueueItem[];
};

const allLabel = "همه";

const assetIcons: Record<InventoryAssetType, LucideIcon> = {
  text: FileText,
  image: ImagePlus,
  audio: Mic2,
  source: ShieldCheck,
  admin: Boxes,
};

const priorityClass: Record<ProductionQueueItem["priority"], string> = {
  high: "border-red-300/25 bg-red-300/10 text-red-100",
  medium: "border-gold/20 bg-gold/10 text-gold-light",
  low: "border-warm/10 bg-warm/5 text-muted",
};

export function ProductionQueueBoard({ items }: ProductionQueueBoardProps) {
  const [query, setQuery] = useState("");
  const [assetType, setAssetType] = useState<typeof allLabel | InventoryAssetType>(allLabel);
  const [stage, setStage] = useState<typeof allLabel | ProductionQueueItem["stage"]>(allLabel);
  const summary = useMemo(() => getProductionQueueSummary(items), [items]);

  const filteredItems = useMemo(() => {
    const normalized = normalizeSearchText(query);

    return items.filter((item) => {
      const matchesAsset = assetType === allLabel || item.assetType === assetType;
      const matchesStage = stage === allLabel || item.stage === stage;
      const haystack = normalizeSearchText(`${item.title} ${item.realmTitle} ${item.owner} ${item.action}`);
      const matchesQuery = !normalized || haystack.includes(normalized);

      return matchesAsset && matchesStage && matchesQuery;
    });
  }, [assetType, items, query, stage]);

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">PRODUCTION QUEUE</p>
          <h2 className="mt-3 text-3xl font-black text-warm">صف تولید محتوا و دارایی‌ها</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد کمبودهای Inventory را به تسک‌های عملیاتی تبدیل می‌کند: متن، تصویر، صوت، منبع و کار ادمینی.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="تسک" value={String(summary.total)} />
          <Metric label="اولویت بالا" value={String(summary.highPriority)} />
          <Metric label="باقی‌مانده" value={formatNumber(summary.totalMissing)} />
          <Metric label="مرحله‌ها" value={String(summary.byStage.filter((item) => item.count > 0).length)} />
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-gold/10 bg-royal/45 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-muted">تسک بعدی پیشنهادی</p>
            <h3 className="mt-1 text-xl font-black text-warm">{summary.nextItem?.title ?? "تسکی باقی نمانده"}</h3>
          </div>
          {summary.nextItem ? (
            <Link
              href={summary.nextItem.href}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
            >
              شروع اقدام
              <ArrowLeft size={16} />
            </Link>
          ) : null}
        </div>
        <Link
          href="/admin/production/briefs"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10"
        >
          ساخت Brief تولید
          <ArrowLeft size={16} />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_200px_200px]">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در تسک، قلمرو، مالک یا اقدام"
            className="h-14 w-full rounded-full border border-gold/20 bg-night/70 pr-12 pl-5 text-warm outline-none placeholder:text-muted focus:border-gold"
          />
        </label>
        <select
          value={assetType}
          onChange={(event) => setAssetType(event.target.value as typeof allLabel | InventoryAssetType)}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          <option>{allLabel}</option>
          {(Object.keys(inventoryAssetLabels) as InventoryAssetType[]).map((item) => (
            <option key={item} value={item}>
              {inventoryAssetLabels[item]}
            </option>
          ))}
        </select>
        <select
          value={stage}
          onChange={(event) => setStage(event.target.value as typeof allLabel | ProductionQueueItem["stage"])}
          className="h-14 rounded-full border border-gold/20 bg-night/70 px-5 text-warm outline-none focus:border-gold"
        >
          <option>{allLabel}</option>
          {Object.entries(productionStageLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-5">
        {filteredItems.map((item) => {
          const Icon = assetIcons[item.assetType];

          return (
            <article key={item.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
                      <Icon size={13} />
                      {inventoryAssetLabels[item.assetType]}
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${priorityClass[item.priority]}`}>
                      اولویت {item.priority === "high" ? "بالا" : item.priority === "medium" ? "متوسط" : "پایین"}
                    </span>
                    <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold text-muted">
                      {productionStageLabels[item.stage]}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-warm">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.action}</p>
                </div>
                <div className="rounded-2xl border border-gold/10 bg-royal/45 px-4 py-3 text-center">
                  <CalendarClock className="mx-auto text-gold-light" size={20} />
                  <p className="mt-2 text-sm font-black text-warm">{item.dueDate}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <Info label="قلمرو" value={item.realmTitle} />
                <Info label="مالک" value={item.owner} />
                <Info label="تعداد باقی‌مانده" value={formatNumber(item.missingCount)} />
              </div>

              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/20 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10"
              >
                باز کردن محل اقدام
                <ArrowLeft size={16} />
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        {summary.byStage.map((item) => (
          <div key={item.stage} className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
            <Filter className="text-gold-light" size={17} />
            <p className="mt-2 text-xs font-bold text-muted">{item.label}</p>
            <p className="mt-1 text-xl font-black text-warm">{item.count}</p>
          </div>
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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 text-sm font-black text-warm">{value}</p>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
