"use client";

import { Check, Copy, ImagePlus, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";

const accepts: Record<string, string> = {
  image: ".jpg,.jpeg,.png,.webp,image/*",
  audio: ".mp3,.wav,.m4a,.ogg,audio/*",
  pdf: ".pdf,application/pdf",
  video: ".mp4,.webm,.mov,video/*"
};

export function MediaUploadForm() {
  const [kind, setKind] = useState("image");
  const [preferredName, setPreferredName] = useState("yasna-sacred-fire");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("فایل را انتخاب کن تا مسیر عمومی آماده شود.");
  const [assetUrl, setAssetUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!file || kind !== "image") {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, kind]);

  async function handleUpload() {
    if (!file) {
      setStatus("اول یک فایل انتخاب کن.");
      return;
    }

    const formData = new FormData();
    formData.set("kind", kind);
    formData.set("name", preferredName);
    formData.set("file", file);

    setUploading(true);
    setStatus("در حال آپلود فایل...");

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      const data = (await response.json()) as { ok: boolean; message: string; assetUrl?: string };

      if (!data.ok) {
        setStatus(data.message);
        return;
      }

      setAssetUrl(data.assetUrl ?? "");
      setStatus(data.message);
    } catch {
      setStatus("ارتباط با سرویس آپلود برقرار نشد. دوباره تلاش کن.");
    } finally {
      setUploading(false);
    }
  }

  async function copyAssetUrl() {
    if (!assetUrl) return;

    await navigator.clipboard.writeText(assetUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-[18px] border border-gold/15 bg-night/65 p-6">
        <div className="flex items-center gap-2 text-gold-light">
          <UploadCloud size={20} />
          <h2 className="text-2xl font-black">آپلود فایل</h2>
        </div>
        <div className="mt-6 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-warm">نوع فایل</span>
              <select
                value={kind}
                onChange={(event) => {
                  setKind(event.target.value);
                  setFile(null);
                  setAssetUrl("");
                  setStatus("نوع فایل تغییر کرد؛ فایل مناسب را انتخاب کن.");
                }}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
              >
                <option value="image">تصویر AI</option>
                <option value="audio">صوت</option>
                <option value="pdf">PDF</option>
                <option value="video">ویدیو</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-warm">نام پیشنهادی</span>
              <input
                dir="ltr"
                value={preferredName}
                onChange={(event) => setPreferredName(event.target.value)}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-left text-warm outline-none focus:border-gold"
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-warm">انتخاب فایل</span>
            <input
              type="file"
              accept={accepts[kind]}
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="rounded-2xl border border-gold/20 bg-royal p-4 text-warm file:ml-4 file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-2 file:font-bold file:text-night"
            />
          </label>

          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || uploading}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-55"
            >
              <UploadCloud size={18} />
              {uploading ? "در حال آپلود..." : "آپلود و ساخت URL"}
            </button>
          <p className="text-sm text-muted" aria-live="polite">{status}</p>
          {file ? <p className="text-xs font-bold text-gold-light">فایل انتخاب‌شده: {file.name}</p> : null}
        </div>
      </div>

      <div className="rounded-[18px] border border-gold/15 bg-royal/45 p-6">
        <h2 className="text-2xl font-black text-warm">URL آماده ثبت</h2>
        <p className="mt-3 leading-8 text-muted">
          بعد از آپلود، این مسیر را در فرم «ثبت رسانه» بگذار تا به بند یا صفحه مربوط وصل شود.
        </p>
        <div className="mt-5 min-h-14 rounded-2xl border border-gold/10 bg-night/80 p-4 text-left text-sm leading-6 text-gold-light" dir="ltr">
          {assetUrl || "/images/ai/media-cover.png"}
        </div>
        {assetUrl ? (
          <button type="button" onClick={copyAssetUrl} className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light transition hover:bg-gold/10">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "کپی شد" : "کپی URL"}
          </button>
        ) : null}
        {previewUrl ? (
          <div className="image-atmosphere relative mt-5 h-48 overflow-hidden rounded-2xl border border-gold/15">
            <img src={previewUrl} alt="پیش‌نمایش فایل انتخاب‌شده" className="h-full w-full object-cover" />
            <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-night/70 px-3 py-1 text-xs font-black text-gold-light backdrop-blur"><ImagePlus size={14} />پیش‌نمایش</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
