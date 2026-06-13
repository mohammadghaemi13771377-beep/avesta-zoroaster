"use client";

import { PackagePlus, Save, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import type { InventoryStatus, ProductStatus } from "@/lib/admin-shop";
import { adminShopSchema } from "@/lib/admin-shop";
import type { ProductCategory } from "@/lib/shop";

export function ProductForm() {
  const [title, setTitle] = useState("ماگ پندار نیک");
  const [slug, setSlug] = useState("good-thoughts-mug");
  const [category, setCategory] = useState<ProductCategory>("mug");
  const [excerpt, setExcerpt] = useState("ماگ سرامیکی تیره با نوشته طلایی پندار نیک، گفتار نیک، کردار نیک.");
  const [description, setDescription] = useState("هدیه روزمره برای همراهان سایت و دوستداران فرهنگ ایران باستان.");
  const [price, setPrice] = useState("460000");
  const [stock, setStock] = useState("50");
  const [status, setStatus] = useState<ProductStatus>("DRAFT");
  const [inventoryStatus, setInventoryStatus] = useState<InventoryStatus>("AVAILABLE");
  const [materials, setMaterials] = useState("سرامیک, چاپ مقاوم, جعبه هدیه");
  const [tags, setTags] = useState("ماگ زرتشتی, پندار نیک, هدیه فرهنگی");
  const [seoTitle, setSeoTitle] = useState("ماگ پندار نیک | AVESTA-ZOROASTER");
  const [seoDescription, setSeoDescription] = useState("ماگ فرهنگی با شعار پندار نیک، گفتار نیک، کردار نیک.");
  const [message, setMessage] = useState("پیش‌نویس محصول آماده ارسال است.");

  const payload = useMemo(
    () => ({
      title,
      slug,
      category,
      excerpt,
      description,
      price: Number(price),
      stock: Number(stock),
      status,
      inventoryStatus,
      materials: splitList(materials),
      tags: splitList(tags),
      seoTitle,
      seoDescription,
    }),
    [category, description, excerpt, inventoryStatus, materials, price, seoDescription, seoTitle, slug, status, stock, tags, title]
  );

  async function handleSave() {
    setMessage("در حال ارسال محصول به API فروشگاه...");
    const response = await fetch("/api/admin/shop/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as { ok: boolean; message: string; mode?: string; errors?: string[] };

    if (!data.ok) {
      setMessage(`${data.message} ${data.errors?.join(" | ") ?? ""}`);
      return;
    }

    setMessage(`${data.message}${data.mode ? ` (${data.mode})` : ""}`);
  }

  return (
    <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.85fr]">
      <div className="lux-frame p-6">
        <div className="flex items-center gap-2 text-gold-light">
          <PackagePlus size={22} />
          <h2 className="text-2xl font-black">فرم محصول فروشگاه</h2>
        </div>
        <div className="mt-6 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="عنوان محصول" value={title} onChange={setTitle} />
            <Field label="Slug" value={slug} onChange={setSlug} ltr />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Select label="دسته" value={category} onChange={(value) => setCategory(value as ProductCategory)} options={adminShopSchema.categories.map((item) => [item.id, item.label])} />
            <Field label="قیمت تومان" value={price} onChange={setPrice} ltr />
            <Field label="موجودی" value={stock} onChange={setStock} ltr />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Select label="وضعیت انتشار" value={status} onChange={(value) => setStatus(value as ProductStatus)} options={adminShopSchema.statuses.map((item) => [item, item])} />
            <Select label="وضعیت انبار" value={inventoryStatus} onChange={(value) => setInventoryStatus(value as InventoryStatus)} options={adminShopSchema.inventoryStatuses.map((item) => [item, item])} />
          </div>
          <TextArea label="خلاصه کارت محصول" value={excerpt} onChange={setExcerpt} rows={3} />
          <TextArea label="توضیح کامل محصول" value={description} onChange={setDescription} rows={5} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="متریال‌ها" value={materials} onChange={setMaterials} />
            <Field label="تگ‌های SEO" value={tags} onChange={setTags} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="SEO title" value={seoTitle} onChange={setSeoTitle} />
            <Field label="SEO description" value={seoDescription} onChange={setSeoDescription} />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light"
          >
            <Save size={18} />
            ذخیره محصول
          </button>
          <p className="text-sm leading-7 text-muted">{message}</p>
        </div>
      </div>

      <div className="lux-frame p-6">
        <div className="flex items-center gap-2 text-gold-light">
          <Sparkles size={20} />
          <h2 className="text-2xl font-black">Payload محصول</h2>
        </div>
        <pre className="mt-5 max-h-[720px] overflow-auto rounded-2xl border border-gold/10 bg-night/80 p-4 text-left text-xs leading-6 text-gold-light" dir="ltr">
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>
    </section>
  );
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function Field({
  label,
  value,
  onChange,
  ltr = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  ltr?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-warm">{label}</span>
      <input
        dir={ltr ? "ltr" : "rtl"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={ltr ? inputClassName("text-left") : inputClassName("")}
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-warm">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClassName("")}
      >
        {options.map(([id, labelText]) => (
          <option key={id} value={id}>
            {labelText}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-warm">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="rounded-2xl border border-gold/20 bg-royal p-4 text-warm outline-none focus:border-gold"
      />
    </label>
  );
}

function inputClassName(extra: string) {
  return `h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold ${extra}`;
}
