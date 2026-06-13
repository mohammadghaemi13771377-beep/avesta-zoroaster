"use client";

import { ImagePlus, Save } from "lucide-react";
import { useMemo, useState } from "react";
import { aiPromptTemplates } from "@/lib/ai-prompts";

export function MediaAssetForm() {
  const firstTemplate = aiPromptTemplates[1] ?? aiPromptTemplates[0];
  const [templateId, setTemplateId] = useState(firstTemplate.id);
  const selectedTemplate = aiPromptTemplates.find((template) => template.id === templateId) ?? firstTemplate;
  const [title, setTitle] = useState(selectedTemplate.title);
  const [slug, setSlug] = useState(selectedTemplate.id);
  const [type, setType] = useState("AI Image");
  const [category, setCategory] = useState(selectedTemplate.category);
  const [sectionSlug, setSectionSlug] = useState(selectedTemplate.sectionSlug === "home" ? "" : selectedTemplate.sectionSlug);
  const [chapterSlug, setChapterSlug] = useState("ha-1");
  const [verseOrder, setVerseOrder] = useState(1);
  const [assetUrl, setAssetUrl] = useState(selectedTemplate.recommendedPath);
  const [description, setDescription] = useState(selectedTemplate.usage);
  const [prompt, setPrompt] = useState(selectedTemplate.prompt);
  const [mood, setMood] = useState(selectedTemplate.mood);
  const [status, setStatus] = useState("Asset آماده ثبت است.");

  function applyTemplate(id: string) {
    const template = aiPromptTemplates.find((item) => item.id === id);

    if (!template) {
      return;
    }

    setTemplateId(id);
    setTitle(template.title);
    setSlug(template.id);
    setCategory(template.category);
    setSectionSlug(template.sectionSlug === "home" ? "" : template.sectionSlug);
    setAssetUrl(template.recommendedPath);
    setDescription(template.usage);
    setPrompt(template.prompt);
    setMood(template.mood);
  }

  const payload = useMemo(
    () => ({
      title,
      slug,
      type,
      category,
      description,
      url: assetUrl,
      thumbnail: assetUrl,
      prompt,
      mood,
      accent: selectedTemplate.accent,
      sectionSlug: sectionSlug || undefined,
      chapterSlug: chapterSlug || undefined,
      verseOrder: sectionSlug ? verseOrder : undefined,
      status: "DRAFT"
    }),
    [assetUrl, category, chapterSlug, description, mood, prompt, sectionSlug, selectedTemplate.accent, slug, title, type, verseOrder]
  );

  async function handleSave() {
    setStatus("در حال ارسال asset به API رسانه...");
    const response = await fetch("/api/media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = (await response.json()) as { ok: boolean; message: string; errors?: string[]; mode?: string };

    if (!data.ok) {
      setStatus(`${data.message} ${data.errors?.join(" | ") ?? ""}`);
      return;
    }

    setStatus(`${data.message}${data.mode ? ` (${data.mode})` : ""}`);
  }

  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-[18px] border border-gold/15 bg-night/65 p-6">
        <div className="flex items-center gap-2 text-gold-light">
          <ImagePlus size={20} />
          <h2 className="text-2xl font-black">ثبت رسانه</h2>
        </div>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-warm">قالب پرامپت</span>
            <select
              value={templateId}
              onChange={(event) => applyTemplate(event.target.value)}
              className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
            >
              {aiPromptTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.title}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-warm">عنوان</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-warm">Slug</span>
              <input
                dir="ltr"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-left text-warm outline-none focus:border-gold"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-warm">نوع رسانه</span>
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
              >
                <option>AI Image</option>
                <option>Audio</option>
                <option>Video</option>
                <option>Podcast</option>
                <option>Document</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-warm">دسته</span>
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-warm">مسیر فایل یا URL</span>
            <input
              dir="ltr"
              value={assetUrl}
              onChange={(event) => setAssetUrl(event.target.value)}
              className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-left text-warm outline-none focus:border-gold"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-warm">بخش</span>
              <input
                dir="ltr"
                value={sectionSlug}
                onChange={(event) => setSectionSlug(event.target.value)}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-left text-warm outline-none focus:border-gold"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-warm">فصل</span>
              <input
                dir="ltr"
                value={chapterSlug}
                onChange={(event) => setChapterSlug(event.target.value)}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-left text-warm outline-none focus:border-gold"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-warm">شماره بند</span>
              <input
                type="number"
                min={1}
                value={verseOrder}
                onChange={(event) => setVerseOrder(Number(event.target.value))}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-warm">توضیح</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              className="rounded-2xl border border-gold/20 bg-royal p-4 text-warm outline-none focus:border-gold"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-warm">Mood</span>
            <input
              value={mood}
              onChange={(event) => setMood(event.target.value)}
              className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-warm">AI prompt</span>
            <textarea
              dir="ltr"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={5}
              className="rounded-2xl border border-gold/20 bg-royal p-4 text-left text-warm outline-none focus:border-gold"
            />
          </label>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light"
          >
            <Save size={18} />
            ثبت رسانه
          </button>
          <p className="text-sm text-muted">{status}</p>
        </div>
      </div>

      <div className="rounded-[18px] border border-gold/15 bg-royal/45 p-6">
        <h2 className="text-2xl font-black text-warm">Payload رسانه</h2>
        <pre
          className="mt-5 max-h-[560px] overflow-auto rounded-2xl border border-gold/10 bg-night/80 p-4 text-left text-xs leading-6 text-gold-light"
          dir="ltr"
        >
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>
    </section>
  );
}
