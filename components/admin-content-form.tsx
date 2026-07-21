"use client";

import { Braces, Eye, Save, Sparkles, Upload } from "lucide-react";
import { useMemo, useState } from "react";

import { getAdminContentModels, type AdminContentModel } from "@/lib/admin-content-models";

type SupportedResource =
  | "avestaSection"
  | "avestaChapter"
  | "avestaChapterGuide"
  | "avestaVerse"
  | "article"
  | "glossaryTerm"
  | "libraryItem";

const resourceMap: Partial<Record<string, SupportedResource>> = {
  article: "article",
  "avesta-section": "avestaSection",
  "avesta-chapter": "avestaChapter",
  "avesta-verse": "avestaVerse",
  "glossary-term": "glossaryTerm",
  "library-item": "libraryItem",
};

const fallbackValues: Record<string, string> = {
  title: "هات نمونه ۱",
  term: "اشا",
  slug: "sample-entry",
  excerpt: "خلاصه‌ای کوتاه برای نمایش در کارت، جستجو و SEO.",
  content: "متن کامل مقاله یا محتوای آموزشی در این بخش قرار می‌گیرد.",
  description: "توضیح کامل و قابل ارائه برای مخاطب عمومی و پژوهشی.",
  summary: "خلاصه محتوایی برای معرفی این آیتم در سایت.",
  coverImage: "/images/ai/yasna-hero.jpg",
  heroImage: "/images/ai/avesta-portal.jpg",
  imageSrc: "/images/ai/shop-hero.jpg",
  sectionId: "yasna",
  chapterId: "ha-1",
  sectionSlug: "yasna",
  chapterSlug: "ha-1",
  originalText: "جایگاه متن اصلی اوستایی یا متن مرجع.",
  transliteration: "Sample transliteration",
  classicalTranslation: "جایگاه ترجمه کلاسیک همراه با یادداشت منبع.",
  simpleRewrite: "بازنویسی ساده و قابل فهم برای مخاطب عمومی.",
  modernInterpretation: "تحلیل مفهومی و کاربرد امروزی.",
  ethicalMessage: "پیام اخلاقی کوتاه و قابل استفاده در زندگی روزانه.",
  meaning: "معنی کوتاه واژه.",
  root: "Avestan root",
  url: "/images/ai/sample.jpg",
  thumbnail: "/images/ai/sample-thumb.jpg",
  altFa: "توضیح فارسی تصویر برای دسترسی‌پذیری و سئو.",
  altEn: "English alt text for accessibility and SEO.",
  fileUrl: "/library/avesta-reading-guide.pdf",
  language: "fa",
  type: "PDF",
  price: "480000",
  inventoryStatus: "preorder",
  seoTitle: "عنوان SEO | AVESTA-ZOROASTER",
  seoDescription: "توضیح کوتاه SEO برای نمایش در نتایج جستجو.",
};

const textAreaTypes = new Set(["richtext", "json"]);
const supportedModelIds = new Set(Object.keys(resourceMap));

export function AdminContentForm() {
  const models = getAdminContentModels();
  const [modelId, setModelId] = useState(models[0]?.id ?? "article");
  const [locale, setLocale] = useState("FA");
  const [publicationStatus, setPublicationStatus] = useState("draft");
  const [values, setValues] = useState<Record<string, string>>(() => buildInitialValues(models[0]));
  const [status, setStatus] = useState("پیش‌نویس آماده است. مدل محتوا را انتخاب کنید و payload را بسازید.");

  const selectedModel = models.find((model) => model.id === modelId) ?? models[0];
  const isSaveSupported = supportedModelIds.has(selectedModel.id);

  const payload = useMemo(() => buildPayload(selectedModel, values, locale, publicationStatus), [locale, publicationStatus, selectedModel, values]);

  function handleModelChange(nextId: string) {
    const nextModel = models.find((model) => model.id === nextId) ?? models[0];
    setModelId(nextId);
    setValues(buildInitialValues(nextModel));
    setStatus("فرم بر اساس مدل انتخاب‌شده ساخته شد.");
  }

  function updateValue(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSave() {
    if (!isSaveSupported) {
      setStatus("این مدل فعلاً برای قرارداد CMS آینده آماده شده و هنوز در API ذخیره محتوا پشتیبانی مستقیم ندارد.");
      return;
    }

    setStatus("در حال ارسال payload به API مدیریت محتوا...");
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as { ok: boolean; message: string; mode?: string; errors?: string[] };

    if (!data.ok) {
      setStatus(`${data.message} ${data.errors?.join(" | ") ?? ""}`);
      return;
    }

    setStatus(`${data.message}${data.mode ? ` (${data.mode})` : ""}`);
  }

  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-[18px] border border-gold/15 bg-night/65 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold-light">
              <Sparkles size={20} />
              <h2 className="text-2xl font-black">فرم داینامیک محتوای طلایی</h2>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">
              این فرم از قرارداد مدل‌های محتوا ساخته می‌شود و پایه‌ی CRUD آینده برای ادمین، CMS و دیتابیس است.
            </p>
          </div>
          <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-black text-gold-light">
            {isSaveSupported ? "قابل ذخیره در API فعلی" : "آماده CMS آینده"}
          </span>
        </div>

        <div className="mt-6 grid gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 md:col-span-1">
              <span className="text-sm font-bold text-warm">مدل محتوا</span>
              <select
                value={modelId}
                onChange={(event) => handleModelChange(event.target.value)}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-warm">زبان</span>
              <select
                value={locale}
                onChange={(event) => setLocale(event.target.value)}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
              >
                <option value="FA">فارسی</option>
                <option value="EN">English</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-warm">وضعیت انتشار</span>
              <select
                value={publicationStatus}
                onChange={(event) => setPublicationStatus(event.target.value)}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
              >
                <option value="draft">Draft</option>
                <option value="review">Review</option>
                <option value="published">Published</option>
              </select>
            </label>
          </div>

          <div className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
            <div className="flex items-center gap-2 text-gold-light">
              <Braces size={17} />
              <p className="text-sm font-black">{selectedModel.title}</p>
            </div>
            <p className="mt-2 text-sm leading-7 text-muted">{selectedModel.description}</p>
            <p className="mt-2 text-xs font-bold leading-6 text-muted">{selectedModel.storageStrategy}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {selectedModel.fields.map((field) => (
              <label key={field.name} className={textAreaTypes.has(field.type) ? "grid gap-2 md:col-span-2" : "grid gap-2"}>
                <span className="flex items-center justify-between gap-2 text-sm font-bold text-warm">
                  {field.label}
                  <span className="text-xs font-black text-gold-light">{field.required ? "ضروری" : "اختیاری"}</span>
                </span>
                {textAreaTypes.has(field.type) ? (
                  <textarea
                    value={values[field.name] ?? ""}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    rows={field.type === "json" ? 4 : 5}
                    dir={field.type === "json" ? "ltr" : "rtl"}
                    className="rounded-2xl border border-gold/20 bg-royal p-4 text-warm outline-none focus:border-gold"
                  />
                ) : (
                  <input
                    value={values[field.name] ?? ""}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    type={field.type === "number" ? "number" : "text"}
                    dir={["slug", "image", "audio"].includes(field.type) ? "ltr" : "rtl"}
                    className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
                  />
                )}
                <span className="text-xs font-bold leading-6 text-muted">{field.note}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-5 py-3 font-bold text-gold-light transition hover:bg-gold/10"
            >
              <Upload size={18} />
              اتصال آپلود تصویر / صوت
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light"
            >
              <Save size={18} />
              ذخیره / اعتبارسنجی
            </button>
          </div>
          <p className="text-sm leading-7 text-muted">{status}</p>
        </div>
      </div>

      <div className="rounded-[18px] border border-gold/15 bg-royal/45 p-6">
        <div className="flex items-center gap-2 text-gold-light">
          <Eye size={20} />
          <h2 className="text-2xl font-black text-warm">Payload آماده اتصال</h2>
        </div>
        <pre
          className="mt-5 max-h-[680px] overflow-auto rounded-2xl border border-gold/10 bg-night/80 p-4 text-left text-xs leading-6 text-gold-light"
          dir="ltr"
        >
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>
    </section>
  );
}

function buildInitialValues(model?: AdminContentModel) {
  if (!model) {
    return {};
  }

  return Object.fromEntries(
    model.fields.map((field) => [
      field.name,
      fallbackValues[field.name] ?? (field.type === "json" ? "[]" : field.type === "number" ? "1" : ""),
    ])
  );
}

function buildPayload(model: AdminContentModel, values: Record<string, string>, locale: string, publicationStatus: string) {
  const resource = resourceMap[model.id];
  const fields = { ...values };
  const title = values.title ?? values.term ?? values.name ?? model.title;
  const slug = values.slug ?? slugify(title);

  return {
    resource,
    modelId: model.id,
    locale,
    publicationStatus,
    title,
    slug,
    summary: values.summary ?? values.excerpt ?? values.description,
    seoTitle: values.seoTitle,
    seoDescription: values.seoDescription,
    sectionSlug: values.sectionSlug ?? values.sectionId,
    chapterSlug: values.chapterSlug ?? values.chapterId,
    order: Number(values.order ?? values.number ?? 1),
    themeColor: values.themeColor,
    accent: values.accent,
    tone: values.tone,
    coverImage: values.coverImage ?? values.heroImage ?? values.imageSrc ?? values.thumbnail,
    audioUrl: values.audioUrl,
    fileUrl: values.fileUrl ?? values.url,
    type: values.type,
    language: values.language ?? (locale === "EN" ? "en" : "fa"),
    author: values.author,
    source: values.source,
    category: values.category,
    tags: splitTags(values.tags ?? values.keyThemes ?? values.materials),
    fields,
  };
}

function splitTags(value?: string) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9آ-ی-]/g, "");
}
