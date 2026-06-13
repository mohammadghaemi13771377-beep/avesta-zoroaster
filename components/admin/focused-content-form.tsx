"use client";

import { Save, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

type FocusedResource = "article" | "glossaryTerm" | "libraryItem";

type FocusedContentFormProps = {
  resource: FocusedResource;
};

const presets = {
  article: {
    heading: "فرم مقاله",
    title: "اهورامزدا؛ خرد روشن در سنت زرتشتی",
    slug: "ahura-mazda-wisdom",
    summary: "مقاله‌ای آموزشی درباره مفهوم اهورامزدا، خرد، روشنایی و یکتاپرستی در سنت زرتشتی.",
    category: "مفاهیم",
    tags: "اهورامزدا, زرتشت, یکتاپرستی",
    seoTitle: "اهورامزدا | AVESTA-ZOROASTER",
    seoDescription: "معرفی اهورامزدا در سنت زرتشتی و پیوند آن با خرد، روشنایی و یکتاپرستی.",
    content: "متن کامل مقاله را اینجا بنویس. این بخش برای محتوای بلند، لینک داخلی، نقل‌قول و تحلیل آماده است."
  },
  glossaryTerm: {
    heading: "فرم واژه‌نامه",
    title: "اشا",
    slug: "asha",
    summary: "اشا یکی از بنیادی‌ترین مفاهیم اندیشه زرتشتی و به معنای راستی، نظم و هماهنگی کیهانی است.",
    meaning: "راستی، نظم، هماهنگی کیهانی",
    root: "Asha / Arta",
    description: "این واژه در گات‌ها و سنت زرتشتی به محور اخلاق، حقیقت و سامان جهان اشاره دارد."
  },
  libraryItem: {
    heading: "فرم کتابخانه",
    title: "راهنمای مطالعه اوستا",
    slug: "avesta-reading-guide",
    summary: "فایل راهنمای شروع مطالعه اوستا برای کاربران تازه‌وارد.",
    author: "AVESTA-ZOROASTER Editorial",
    fileUrl: "/library/avesta-reading-guide.pdf",
    language: "fa",
    type: "PDF",
    source: "Internal"
  }
} as const;

export function FocusedContentForm({ resource }: FocusedContentFormProps) {
  const preset = presets[resource];
  const [title, setTitle] = useState(preset.title);
  const [slug, setSlug] = useState(preset.slug);
  const [summary, setSummary] = useState(preset.summary);
  const [status, setStatus] = useState("پیش‌نویس آماده ارسال است.");

  const [category, setCategory] = useState(resource === "article" ? presets.article.category : "");
  const [tags, setTags] = useState(resource === "article" ? presets.article.tags : "");
  const [seoTitle, setSeoTitle] = useState(resource === "article" ? presets.article.seoTitle : "");
  const [seoDescription, setSeoDescription] = useState(resource === "article" ? presets.article.seoDescription : "");
  const [content, setContent] = useState(resource === "article" ? presets.article.content : "");

  const [meaning, setMeaning] = useState(resource === "glossaryTerm" ? presets.glossaryTerm.meaning : "");
  const [root, setRoot] = useState(resource === "glossaryTerm" ? presets.glossaryTerm.root : "");
  const [description, setDescription] = useState(
    resource === "glossaryTerm" ? presets.glossaryTerm.description : ""
  );

  const [author, setAuthor] = useState(resource === "libraryItem" ? presets.libraryItem.author : "");
  const [fileUrl, setFileUrl] = useState(resource === "libraryItem" ? presets.libraryItem.fileUrl : "");
  const [language, setLanguage] = useState(resource === "libraryItem" ? presets.libraryItem.language : "fa");
  const [type, setType] = useState(resource === "libraryItem" ? presets.libraryItem.type : "PDF");
  const [source, setSource] = useState(resource === "libraryItem" ? presets.libraryItem.source : "");

  const payload = useMemo(() => {
    if (resource === "article") {
      return {
        resource,
        locale: "FA",
        title,
        slug,
        summary,
        category,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        seoTitle,
        seoDescription,
        fields: {
          content
        }
      };
    }

    if (resource === "glossaryTerm") {
      return {
        resource,
        locale: "FA",
        title,
        slug,
        summary,
        fields: {
          meaning,
          root,
          description
        }
      };
    }

    return {
      resource,
      locale: "FA",
      title,
      slug,
      summary,
      author,
      fileUrl,
      language,
      type,
      source,
      fields: {}
    };
  }, [
    author,
    category,
    content,
    description,
    fileUrl,
    language,
    meaning,
    resource,
    root,
    seoDescription,
    seoTitle,
    slug,
    source,
    summary,
    tags,
    title,
    type
  ]);

  async function handleSave() {
    setStatus("در حال ارسال محتوا به API ادمین...");
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = (await response.json()) as { ok: boolean; message: string; mode?: string; errors?: string[] };

    if (!data.ok) {
      setStatus(`${data.message} ${data.errors?.join(" | ") ?? ""}`);
      return;
    }

    setStatus(`${data.message}${data.mode ? ` (${data.mode})` : ""}`);
  }

  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-[18px] border border-gold/15 bg-night/65 p-6">
        <div className="flex items-center gap-2 text-gold-light">
          <Sparkles size={20} />
          <h2 className="text-2xl font-black">{preset.heading}</h2>
        </div>

        <div className="mt-6 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="عنوان" value={title} onChange={setTitle} />
            <Field label="Slug" value={slug} onChange={setSlug} ltr />
          </div>

          <TextArea label="خلاصه" value={summary} onChange={setSummary} rows={3} />

          {resource === "article" ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="دسته‌بندی" value={category} onChange={setCategory} />
                <Field label="تگ‌ها" value={tags} onChange={setTags} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="SEO title" value={seoTitle} onChange={setSeoTitle} />
                <Field label="SEO description" value={seoDescription} onChange={setSeoDescription} />
              </div>
              <TextArea label="متن کامل مقاله" value={content} onChange={setContent} rows={9} />
            </>
          ) : null}

          {resource === "glossaryTerm" ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="معنی" value={meaning} onChange={setMeaning} />
                <Field label="ریشه" value={root} onChange={setRoot} ltr />
              </div>
              <TextArea label="توضیح و کاربرد" value={description} onChange={setDescription} rows={6} />
            </>
          ) : null}

          {resource === "libraryItem" ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="نویسنده" value={author} onChange={setAuthor} />
                <Field label="مسیر فایل" value={fileUrl} onChange={setFileUrl} ltr />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="زبان" value={language} onChange={setLanguage} ltr />
                <Field label="نوع" value={type} onChange={setType} />
                <Field label="منبع" value={source} onChange={setSource} />
              </div>
            </>
          ) : null}

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light"
          >
            <Save size={18} />
            ذخیره در پنل
          </button>
          <p className="text-sm text-muted">{status}</p>
        </div>
      </div>

      <div className="rounded-[18px] border border-gold/15 bg-royal/45 p-6">
        <h2 className="text-2xl font-black text-warm">Payload آماده</h2>
        <pre
          className="mt-5 max-h-[620px] overflow-auto rounded-2xl border border-gold/10 bg-night/80 p-4 text-left text-xs leading-6 text-gold-light"
          dir="ltr"
        >
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  ltr = false
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
        className={
          ltr
            ? "h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-left text-warm outline-none focus:border-gold"
            : "h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
        }
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows
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
