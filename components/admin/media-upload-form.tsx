"use client";

import { UploadCloud } from "lucide-react";
import { useState } from "react";

export function MediaUploadForm() {
  const [kind, setKind] = useState("image");
  const [preferredName, setPreferredName] = useState("yasna-sacred-fire");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("فایل را انتخاب کن تا مسیر عمومی آماده شود.");
  const [assetUrl, setAssetUrl] = useState("");

  async function handleUpload() {
    if (!file) {
      setStatus("اول یک فایل انتخاب کن.");
      return;
    }

    const formData = new FormData();
    formData.set("kind", kind);
    formData.set("name", preferredName);
    formData.set("file", file);

    setStatus("در حال آپلود فایل...");
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
                onChange={(event) => setKind(event.target.value)}
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
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="rounded-2xl border border-gold/20 bg-royal p-4 text-warm file:ml-4 file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-2 file:font-bold file:text-night"
            />
          </label>

          <button
            type="button"
            onClick={handleUpload}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light"
          >
            <UploadCloud size={18} />
            آپلود و ساخت URL
          </button>
          <p className="text-sm text-muted">{status}</p>
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
      </div>
    </section>
  );
}
