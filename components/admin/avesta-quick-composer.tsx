"use client";

import { BookOpen, Clipboard, FileText, ImagePlus, Layers3, Save, Sparkles, Wand2 } from "lucide-react";
import { useMemo, useState } from "react";

type ComposerResource = "avestaChapter" | "avestaVerse" | "avestaChapterGuide";

type Preset = {
  label: string;
  sectionSlug: string;
  chapterSlug: string;
  chapterTitle: string;
  chapterSummary: string;
  chapterOrder: number;
  coverImage: string;
};

type BatchTemplate = {
  label: string;
  sectionSlug: string;
  coverImage: string;
  chapters: Array<{
    title: string;
    slug: string;
    order: number;
    summary: string;
  }>;
};

const presets: Preset[] = [
  {
    label: "وندیداد / فرگرد اول",
    sectionSlug: "vendidad",
    chapterSlug: "fargard-1",
    chapterTitle: "فرگرد اول",
    chapterSummary: "آغاز روایت وندیداد درباره آفرینش سرزمین‌های نیک و ورود نیروهای ویرانگر.",
    chapterOrder: 1,
    coverImage: "/images/ai/vendidad-hero.jpg",
  },
  {
    label: "یشت‌ها / آبان یشت",
    sectionSlug: "yashts",
    chapterSlug: "aban-yasht",
    chapterTitle: "آبان یشت",
    chapterSummary: "ستایش آب‌ها، پاکی، زندگی و پیوند انسان با طبیعت روشن و روان.",
    chapterOrder: 1,
    coverImage: "/images/ai/yashts-hero.jpg",
  },
  {
    label: "خرده اوستا / آتش نیایش",
    sectionSlug: "khordeh-avesta",
    chapterSlug: "atash-niyayesh",
    chapterTitle: "آتش نیایش",
    chapterSummary: "نیایش روزانه با محور روشنایی، آگاهی، پاکی و آرامش در زندگی معمول.",
    chapterOrder: 1,
    coverImage: "/images/ai/khordeh-avesta-hero.jpg",
  },
  {
    label: "یسنا / هات ۱",
    sectionSlug: "yasna",
    chapterSlug: "ha-1",
    chapterTitle: "هات ۱",
    chapterSummary: "ورود به ساختار آیینی یسنا و آغاز مسیر نیایش، آتش و سرود.",
    chapterOrder: 1,
    coverImage: "/images/ai/yasna-hero.jpg",
  },
];

const batchTemplates: BatchTemplate[] = [
  {
    label: "ساخت اسکلت ۲۲ فرگرد وندیداد",
    sectionSlug: "vendidad",
    coverImage: "/images/ai/vendidad-hero.jpg",
    chapters: Array.from({ length: 22 }, (_, index) => {
      const order = index + 1;
      return {
        title: `فرگرد ${order}`,
        slug: `fargard-${order}`,
        order,
        summary: `جایگاه محتوای فرگرد ${order} وندیداد؛ آماده برای متن، ترجمه، تحلیل، تصویر و صوت اختصاصی.`,
      };
    }),
  },
  {
    label: "ساخت اسکلت ۷۲ هات یسنا",
    sectionSlug: "yasna",
    coverImage: "/images/ai/yasna-hero.jpg",
    chapters: Array.from({ length: 72 }, (_, index) => {
      const order = index + 1;
      return {
        title: `هات ${order}`,
        slug: `ha-${order}`,
        order,
        summary: `جایگاه محتوای هات ${order} یسنا؛ آماده برای متن اصلی، ترجمه، بازنویسی ساده و پیام امروزی.`,
      };
    }),
  },
  {
    label: "ساخت اسکلت ۲۱ یشت",
    sectionSlug: "yashts",
    coverImage: "/images/ai/yashts-hero.jpg",
    chapters: [
      "هرمزد یشت",
      "هفت امشاسپند یشت",
      "اردیبهشت یشت",
      "خرداد یشت",
      "آبان یشت",
      "خورشید یشت",
      "ماه یشت",
      "تیشتر یشت",
      "گوش یشت",
      "مهر یشت",
      "سروش یشت",
      "رشن یشت",
      "فروردین یشت",
      "بهرام یشت",
      "رام یشت",
      "دین یشت",
      "ارت یشت",
      "اشتاد یشت",
      "زامیاد یشت",
      "هوم یشت",
      "ونند یشت",
    ].map((title, index) => {
      const order = index + 1;
      return {
        title,
        slug: `${toAsciiSlug(title)}-yasht`,
        order,
        summary: `جایگاه محتوای ${title}؛ آماده برای روایت، بندها، تصویر اسطوره‌ای و پیوندهای واژه‌نامه.`,
      };
    }),
  },
  {
    label: "ساخت نیایش‌های پایه خرده‌اوستا",
    sectionSlug: "khordeh-avesta",
    coverImage: "/images/ai/khordeh-avesta-hero.jpg",
    chapters: [
      ["آتش نیایش", "atash-niyayesh"],
      ["خورشید نیایش", "khorshid-niyayesh"],
      ["ماه نیایش", "mah-niyayesh"],
      ["آبان نیایش", "aban-niyayesh"],
      ["مهر نیایش", "mehr-niyayesh"],
      ["سروش باج", "srosh-baj"],
    ].map(([title, slug], index) => ({
      title,
      slug,
      order: index + 1,
      summary: `جایگاه محتوای ${title}؛ آماده برای نیایش روزانه، توضیح ساده، تصویر آرام و صوت.`,
    })),
  },
];

export function AvestaQuickComposer() {
  const [resource, setResource] = useState<ComposerResource>("avestaChapter");
  const [locale, setLocale] = useState<"FA" | "EN">("FA");
  const [sectionSlug, setSectionSlug] = useState("vendidad");
  const [chapterSlug, setChapterSlug] = useState("fargard-1");
  const [title, setTitle] = useState("فرگرد اول");
  const [slug, setSlug] = useState("fargard-1");
  const [order, setOrder] = useState(1);
  const [summary, setSummary] = useState("آغاز روایت وندیداد درباره آفرینش سرزمین‌های نیک و ورود نیروهای ویرانگر.");
  const [coverImage, setCoverImage] = useState("/images/ai/vendidad-hero.jpg");
  const [audioUrl, setAudioUrl] = useState("");
  const [originalText, setOriginalText] = useState("متن اصلی اوستایی یا جایگاه ورود متن اصلی");
  const [classicalTranslation, setClassicalTranslation] = useState("ترجمه کلاسیک این بند را اینجا وارد کنید.");
  const [simpleRewrite, setSimpleRewrite] = useState("بازنویسی ساده و قابل فهم برای مخاطب عمومی.");
  const [modernInterpretation, setModernInterpretation] = useState("تحلیل مفهومی و زمینه امروزی این بند.");
  const [ethicalMessage, setEthicalMessage] = useState("پیام اخلاقی و کاربرد امروزی این بخش.");
  const [sourceTitle, setSourceTitle] = useState("منبع پژوهشی یا نسخه مرجع");
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceNote, setSourceNote] = useState("یادداشت کوتاه درباره منبع، روش ترجمه یا سطح اطمینان این محتوا.");
  const [status, setStatus] = useState("آماده ساخت فصل، بند یا راهنمای تصویری.");
  const [batchStatus, setBatchStatus] = useState("هیچ batchی اجرا نشده است.");
  const [verseBatchCount, setVerseBatchCount] = useState(10);
  const [verseBatchStatus, setVerseBatchStatus] = useState("برای ساخت بندها، اول بخش و فصل والد را انتخاب کن.");
  const [promptStatus, setPromptStatus] = useState("Prompt تصویری آماده است.");
  const [assetStatus, setAssetStatus] = useState("مسیر و alt تصویر آماده است.");
  const [launchStatus, setLaunchStatus] = useState("چک‌لیست انتشار آماده است.");
  const [seoStatus, setSeoStatus] = useState("SEO preview آماده است.");

  const seoDescription = useMemo(() => buildSeoDescription(summary, title), [summary, title]);

  const payload = useMemo(() => {
    const base = {
      resource,
      locale,
      title,
      slug: resource === "avestaVerse" ? `verse-${order}` : slug,
      sectionSlug,
      chapterSlug,
      order,
      summary,
      coverImage,
      audioUrl: audioUrl || undefined,
      seoTitle: `${title} | AVESTA-ZOROASTER`,
      seoDescription,
      fields: {
        originalText,
        classicalTranslation,
        simpleRewrite,
        modernInterpretation,
        ethicalMessage,
        sourceTitle,
        sourceUrl,
        sourceNote,
        citation: JSON.stringify({
          title: sourceTitle,
          url: sourceUrl,
          note: sourceNote,
        }),
        question: `${title} درباره چیست؟`,
        subtitle: summary,
        leadQuote: ethicalMessage,
        curatorNote: "این فصل برای تجربه تصویری، مطالعه بندها و اتصال به رسانه آماده شده است.",
        historicalContext: summary,
        ritualContext: modernInterpretation,
        keyThemes: JSON.stringify(["خرد", "روشنایی", "پاکی", "انتخاب آگاهانه"]),
        imageAlt: JSON.stringify({
          fa: `تصویر سینمایی مرتبط با ${title} در جهان اوستا`,
          en: `Cinematic visual for ${title} in the Avesta world`,
        }),
        todayPractice: JSON.stringify(["یک بند بخوان.", "یک نکته اخلاقی یادداشت کن.", "یک کار نیک کوچک انجام بده."]),
      },
    };

    if (resource === "avestaChapterGuide") {
      return {
        ...base,
        accent: "#D6A84F",
        tone: sectionSlug === "vendidad" ? "mystic" : "gold",
      };
    }

    return base;
  }, [
    audioUrl,
    chapterSlug,
    classicalTranslation,
    coverImage,
    ethicalMessage,
    locale,
    modernInterpretation,
    order,
    originalText,
    resource,
    sectionSlug,
    seoDescription,
    simpleRewrite,
    slug,
    sourceNote,
    sourceTitle,
    sourceUrl,
    summary,
    title,
  ]);

  const imagePrompt = useMemo(
    () =>
      buildImagePrompt({
        title,
        summary,
        sectionSlug,
        resource,
      }),
    [resource, sectionSlug, summary, title]
  );

  const assetPlan = useMemo(
    () =>
      buildAssetPlan({
        title,
        sectionSlug,
        chapterSlug,
        slug,
        order,
        resource,
      }),
    [chapterSlug, order, resource, sectionSlug, slug, title]
  );

  const publicRoute =
    resource === "avestaVerse"
      ? `/avesta/${sectionSlug}/${chapterSlug}/verse-${order}`
      : `/avesta/${sectionSlug}/${resource === "avestaChapter" || resource === "avestaChapterGuide" ? slug : chapterSlug}`;

  const launchChecklist = useMemo(
    () =>
      buildLaunchChecklist({
        title,
        publicRoute,
        coverImage,
        assetPlan,
        resource,
        sourceTitle,
        sourceUrl,
      }),
    [assetPlan, coverImage, publicRoute, resource, sourceTitle, sourceUrl, title]
  );

  function applyPreset(preset: Preset) {
    setSectionSlug(preset.sectionSlug);
    setChapterSlug(preset.chapterSlug);
    setSlug(preset.chapterSlug);
    setTitle(preset.chapterTitle);
    setSummary(preset.chapterSummary);
    setOrder(preset.chapterOrder);
    setCoverImage(preset.coverImage);
    setStatus(`${preset.label} آماده ویرایش شد.`);
  }

  async function saveContent() {
    setStatus("در حال ذخیره در API ادمین...");

    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as { ok: boolean; message: string; mode?: string; errors?: string[] };

    if (!data.ok) {
      setStatus(`${data.message} ${data.errors?.join(" | ") ?? ""}`);
      return;
    }

    setStatus(`${data.message}${data.mode ? ` (${data.mode})` : ""}`);
  }

  async function saveBatch(template: BatchTemplate) {
    setBatchStatus(`در حال آماده‌سازی ${template.chapters.length} فصل برای ${template.sectionSlug}...`);

    let successCount = 0;
    let failedCount = 0;

    for (const chapter of template.chapters) {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource: "avestaChapter",
          locale,
          title: chapter.title,
          slug: chapter.slug,
          sectionSlug: template.sectionSlug,
          chapterSlug: chapter.slug,
          order: chapter.order,
          summary: chapter.summary,
          coverImage: template.coverImage,
          seoTitle: `${chapter.title} | AVESTA-ZOROASTER`,
          fields: {
            description: chapter.summary,
          },
        }),
      });
      const data = (await response.json()) as { ok: boolean };

      if (response.ok && data.ok) {
        successCount += 1;
      } else {
        failedCount += 1;
      }

      setBatchStatus(`${template.label}: ${successCount} آماده، ${failedCount} نیازمند بررسی`);
    }
  }

  async function saveVerseBatch() {
    const safeCount = Math.max(1, Math.min(200, Number(verseBatchCount) || 1));
    setVerseBatchStatus(`در حال ساخت ${safeCount} بند برای ${sectionSlug}/${chapterSlug}...`);

    let successCount = 0;
    let failedCount = 0;

    for (let index = 1; index <= safeCount; index += 1) {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource: "avestaVerse",
          locale,
          title: `بند ${index}`,
          slug: `verse-${index}`,
          sectionSlug,
          chapterSlug,
          order: index,
          summary: `جایگاه بند ${index} برای ${title}`,
          coverImage,
          audioUrl: audioUrl || undefined,
          seoTitle: `${title}، بند ${index} | AVESTA-ZOROASTER`,
          fields: {
            originalText: `جایگاه متن اصلی بند ${index}`,
            classicalTranslation: `جایگاه ترجمه کلاسیک بند ${index}`,
            simpleRewrite: `بازنویسی ساده بند ${index}`,
            modernInterpretation: `تحلیل مفهومی بند ${index}`,
            ethicalMessage: `پیام اخلاقی بند ${index}`,
          },
        }),
      });
      const data = (await response.json()) as { ok: boolean };

      if (response.ok && data.ok) {
        successCount += 1;
      } else {
        failedCount += 1;
      }

      setVerseBatchStatus(`${successCount} بند آماده، ${failedCount} نیازمند بررسی`);
    }
  }

  async function copyImagePrompt() {
    await navigator.clipboard.writeText(imagePrompt);
    setPromptStatus("Prompt کپی شد؛ حالا می‌توانی در ابزار تصویرسازی AI استفاده‌اش کنی.");
  }

  async function copyAssetPlan() {
    await navigator.clipboard.writeText(
      [`Path: ${assetPlan.publicPath}`, `Local folder: ${assetPlan.localFolder}`, `FA alt: ${assetPlan.altFa}`, `EN alt: ${assetPlan.altEn}`].join("\n")
    );
    setAssetStatus("مسیر تصویر و alt text کپی شد.");
  }

  function applyAssetPath() {
    setCoverImage(assetPlan.publicPath);
    setAssetStatus("مسیر پیشنهادی تصویر داخل فیلد تصویر قرار گرفت.");
  }

  async function copyLaunchChecklist() {
    await navigator.clipboard.writeText(launchChecklist);
    setLaunchStatus("چک‌لیست انتشار کپی شد.");
  }

  async function copySeoSnippet() {
    await navigator.clipboard.writeText(
      [`Title: ${title} | AVESTA-ZOROASTER`, `Description: ${seoDescription}`, `URL: https://avesta-zoroaster.com${publicRoute}`, `Image: ${coverImage || assetPlan.publicPath}`].join("\n")
    );
    setSeoStatus("SEO snippet کپی شد.");
  }

  return (
    <section className="mt-10 rounded-[24px] border border-gold/18 bg-royal/48 p-5 shadow-2xl shadow-black/20 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <div className="flex items-center gap-3 text-gold-light">
            <Sparkles size={22} />
            <p className="text-sm font-black tracking-[0.18em]">QUICK COMPOSER</p>
          </div>
          <h2 className="mt-3 text-3xl font-black text-warm">سازنده سریع فرگرد، یشت و بند</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            برای ورود سریع محتوا، یک preset انتخاب کن، نوع محتوا را مشخص کن و بعد ذخیره بزن. اگر دیتابیس production
            وصل باشد ذخیره واقعی می‌شود؛ اگر نه، payload اعتبارسنجی و آماده مهاجرت می‌ماند.
          </p>
        </div>
        <a
          href={publicRoute}
          className="rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm font-black text-gold-light transition hover:bg-gold/18"
        >
          پیش‌نمایش مسیر: <span dir="ltr">{publicRoute}</span>
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => applyPreset(preset)}
            className="rounded-full border border-gold/18 bg-night/35 px-4 py-2 text-sm font-bold text-warm transition hover:border-gold/45 hover:bg-gold/10"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-[20px] border border-gold/14 bg-night/42 p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-gold-light">BATCH BUILDER</p>
            <h3 className="mt-2 text-2xl font-black text-warm">ساخت سریع اسکلت فصل‌ها</h3>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
              این بخش فقط جایگاه فصل‌ها را می‌سازد؛ بعداً برای هر فصل، بندها، ترجمه‌ها، تصویر و صوت را جداگانه پر می‌کنی.
            </p>
          </div>
          <p className="rounded-full border border-gold/18 bg-gold/10 px-4 py-2 text-sm font-bold text-gold-light">
            {batchStatus}
          </p>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {batchTemplates.map((template) => (
            <button
              key={template.label}
              type="button"
              onClick={() => void saveBatch(template)}
              className="group rounded-2xl border border-gold/14 bg-royal/52 p-4 text-right transition hover:-translate-y-1 hover:border-gold/45 hover:bg-gold/10"
            >
              <span className="block text-lg font-black text-warm">{template.label}</span>
              <span className="mt-2 block text-xs leading-6 text-muted">
                {template.chapters.length} صفحه فصل برای <span dir="ltr">{template.sectionSlug}</span>
              </span>
              <span className="mt-4 inline-flex text-sm font-black text-gold-light transition group-hover:-translate-x-1">
                اجرا
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-4 rounded-2xl border border-gold/14 bg-royal/42 p-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-gold-light">VERSE SCAFFOLD</p>
            <h4 className="mt-2 text-xl font-black text-warm">ساخت اسکلت بندهای همین فصل</h4>
            <p className="mt-2 text-sm leading-7 text-muted">
              اول فصل والد را بساز، بعد اینجا تعداد بندهای موردنیاز را وارد کن. برای نمونه اگر بخش
              <span className="mx-1 rounded-full border border-gold/15 px-2 py-0.5" dir="ltr">{sectionSlug}/{chapterSlug}</span>
              فعال باشد، بندهای آماده و قابل ویرایش همان فصل ساخته می‌شوند.
            </p>
            <p className="mt-3 rounded-full border border-gold/18 bg-gold/10 px-4 py-2 text-sm font-bold text-gold-light">
              {verseBatchStatus}
            </p>
          </div>
          <div className="grid gap-3">
            <ComposerInput
              label="تعداد بند"
              type="number"
              value={String(verseBatchCount)}
              onChange={(value) => setVerseBatchCount(Number(value) || 1)}
            />
            <button
              type="button"
              onClick={() => void saveVerseBatch()}
              className="rounded-2xl bg-gold px-5 py-3 text-sm font-black text-night transition hover:-translate-y-0.5 hover:bg-gold-light"
            >
              ساخت بندها
            </button>
          </div>
        </div>
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-3">
            <ComposerSelect
              label="نوع محتوا"
              value={resource}
              onChange={(value) => setResource(value as ComposerResource)}
              options={[
                ["avestaChapter", "فصل / فرگرد / یشت"],
                ["avestaVerse", "بند اوستا"],
                ["avestaChapterGuide", "راهنمای تصویری فصل"],
              ]}
              icon={Layers3}
            />
            <ComposerSelect
              label="زبان"
              value={locale}
              onChange={(value) => setLocale(value as "FA" | "EN")}
              options={[
                ["FA", "فارسی"],
                ["EN", "English"],
              ]}
              icon={BookOpen}
            />
            <ComposerInput label="ترتیب / شماره بند" type="number" value={String(order)} onChange={(value) => setOrder(Number(value) || 1)} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ComposerInput label="بخش" ltr value={sectionSlug} onChange={setSectionSlug} placeholder="vendidad" />
            <ComposerInput label="فصل والد" ltr value={chapterSlug} onChange={setChapterSlug} placeholder="fargard-1" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ComposerInput label="عنوان" value={title} onChange={setTitle} placeholder="فرگرد اول" />
            <ComposerInput label="Slug فصل" ltr value={slug} onChange={setSlug} placeholder="fargard-1" />
          </div>

          <ComposerTextarea label="خلاصه / توضیح صفحه" value={summary} onChange={setSummary} rows={3} />

          <div className="grid gap-4 md:grid-cols-2">
            <ComposerInput label="تصویر hero یا thumbnail" ltr value={coverImage} onChange={setCoverImage} icon={ImagePlus} />
            <ComposerInput label="فایل صوتی" ltr value={audioUrl} onChange={setAudioUrl} placeholder="/audio/vendidad-fargard-1.mp3" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ComposerTextarea label="متن اصلی" value={originalText} onChange={setOriginalText} rows={4} />
            <ComposerTextarea label="ترجمه کلاسیک" value={classicalTranslation} onChange={setClassicalTranslation} rows={4} />
            <ComposerTextarea label="بازنویسی ساده" value={simpleRewrite} onChange={setSimpleRewrite} rows={4} />
            <ComposerTextarea label="تحلیل مفهومی" value={modernInterpretation} onChange={setModernInterpretation} rows={4} />
          </div>

          <ComposerTextarea label="پیام اخلاقی / کاربرد امروزی" value={ethicalMessage} onChange={setEthicalMessage} rows={3} />

          <div className="rounded-[20px] border border-gold/14 bg-night/36 p-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black tracking-[0.18em] text-gold-light">SOURCE TRUST</p>
                <h3 className="mt-2 text-xl font-black text-warm">منبع و یادداشت پژوهشی</h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  برای هر فصل یا بند، منبع و سطح اطمینان را ثبت کن تا صفحه‌ها حس پژوهشی و قابل اعتماد داشته باشند.
                </p>
              </div>
              <a
                href="/admin/source-registry"
                className="rounded-full border border-gold/20 px-4 py-2 text-sm font-black text-gold-light transition hover:bg-gold/10"
              >
                رجیستری منابع
              </a>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <ComposerInput label="عنوان منبع" value={sourceTitle} onChange={setSourceTitle} />
              <ComposerInput label="لینک یا شناسه منبع" ltr value={sourceUrl} onChange={setSourceUrl} placeholder="https://..." />
            </div>
            <div className="mt-4">
              <ComposerTextarea label="یادداشت پژوهشی" value={sourceNote} onChange={setSourceNote} rows={3} />
            </div>
          </div>

          <div className="rounded-[20px] border border-gold/14 bg-royal/45 p-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-gold-light">
                  <Wand2 size={18} />
                  <p className="text-xs font-black tracking-[0.18em]">IMAGE PROMPT LAB</p>
                </div>
                <h3 className="mt-2 text-xl font-black text-warm">Prompt آماده برای تصویر اختصاصی همین صفحه</h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  این متن را به ابزار تصویرسازی بده، خروجی را در <span dir="ltr">public/images/ai</span> بگذار و مسیرش را در فیلد تصویر وارد کن.
                </p>
              </div>
              <button
                type="button"
                onClick={() => void copyImagePrompt()}
                className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-black text-gold-light transition hover:bg-gold/18"
              >
                <Clipboard size={16} />
                کپی Prompt
              </button>
            </div>
            <textarea
              readOnly
              value={imagePrompt}
              rows={7}
              dir="ltr"
              className="mt-4 w-full rounded-2xl border border-gold/12 bg-night/68 p-4 text-left text-xs leading-6 text-gold-light outline-none"
            />
            <p className="mt-3 text-sm font-bold text-muted">{promptStatus}</p>
            <div className="mt-4 rounded-2xl border border-gold/12 bg-night/45 p-4">
              <p className="text-xs font-black tracking-[0.18em] text-gold-light">ASSET NAMING</p>
              <div className="mt-3 grid gap-3">
                <code dir="ltr" className="rounded-xl border border-gold/10 bg-black/24 px-3 py-2 text-xs text-gold-light">
                  {assetPlan.publicPath}
                </code>
                <p className="text-sm leading-7 text-muted">
                  مسیر لوکال: <span dir="ltr" className="text-gold-light">{assetPlan.localFolder}</span>
                </p>
                <p className="text-sm leading-7 text-muted">Alt فارسی: {assetPlan.altFa}</p>
                <p className="text-sm leading-7 text-muted">English alt: <span dir="ltr">{assetPlan.altEn}</span></p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={applyAssetPath}
                  className="rounded-full bg-gold px-4 py-2 text-sm font-black text-night transition hover:bg-gold-light"
                >
                  گذاشتن مسیر در فیلد تصویر
                </button>
                <button
                  type="button"
                  onClick={() => void copyAssetPlan()}
                  className="rounded-full border border-gold/20 px-4 py-2 text-sm font-black text-gold-light transition hover:bg-gold/10"
                >
                  کپی مسیر و alt
                </button>
              </div>
              <p className="mt-3 text-sm font-bold text-muted">{assetStatus}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={saveContent}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-black text-night transition hover:bg-gold-light"
            >
              <Save size={18} />
              ذخیره محتوا
            </button>
            <p className="text-sm leading-7 text-muted">{status}</p>
          </div>
        </div>

        <aside className="rounded-[20px] border border-gold/14 bg-night/75 p-4">
          <div className="overflow-hidden rounded-2xl border border-gold/12 bg-black/24">
            <div className="relative aspect-video bg-royal/60">
              {coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverImage} alt={assetPlan.altFa} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-bold text-muted">بدون تصویر</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 right-3 left-3">
                <p className="text-sm font-black text-warm">{title}</p>
                <p className="mt-1 text-xs text-gold-light" dir="ltr">{publicRoute}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="rounded-2xl border border-gold/12 bg-night/42 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-gold-light">SEO / Share Preview</p>
                  <button
                    type="button"
                    onClick={() => void copySeoSnippet()}
                    className="rounded-full border border-gold/20 px-3 py-1 text-xs font-black text-gold-light transition hover:bg-gold/10"
                  >
                    کپی
                  </button>
                </div>
                <p className="mt-3 text-sm font-black text-warm">{title} | AVESTA-ZOROASTER</p>
                <p className="mt-2 line-clamp-3 text-xs leading-6 text-muted">{seoDescription}</p>
                <p className="mt-2 truncate text-left text-xs text-gold-light" dir="ltr">https://avesta-zoroaster.com{publicRoute}</p>
                <p className="mt-2 text-xs font-bold text-muted">{seoStatus}</p>
              </div>

              <div className="mt-4 rounded-2xl border border-gold/12 bg-night/42 p-4">
                <p className="text-sm font-black text-gold-light">Source Trust</p>
                <p className="mt-3 text-sm font-black text-warm">{sourceTitle}</p>
                <p className="mt-2 truncate text-left text-xs text-gold-light" dir="ltr">{sourceUrl || "source-url-not-set"}</p>
                <p className="mt-2 line-clamp-3 text-xs leading-6 text-muted">{sourceNote}</p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-sm font-black text-gold-light">چک‌لیست انتشار</p>
                <button
                  type="button"
                  onClick={() => void copyLaunchChecklist()}
                  className="rounded-full border border-gold/20 px-3 py-1 text-xs font-black text-gold-light transition hover:bg-gold/10"
                >
                  کپی
                </button>
              </div>
              <pre className="mt-3 max-h-52 overflow-auto rounded-xl border border-gold/10 bg-black/24 p-3 text-right text-xs leading-6 text-muted" dir="rtl">
                {launchChecklist}
              </pre>
              <p className="mt-2 text-xs font-bold text-muted">{launchStatus}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gold-light">
            <FileText size={18} />
            <h3 className="font-black">Payload آماده</h3>
          </div>
          <pre className="mt-4 max-h-[760px] overflow-auto rounded-2xl border border-gold/10 bg-black/32 p-4 text-left text-xs leading-6 text-gold-light" dir="ltr">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </aside>
      </div>
    </section>
  );
}

function ComposerInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  ltr = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  ltr?: boolean;
  icon?: typeof BookOpen;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-warm">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        dir={ltr ? "ltr" : "rtl"}
        className="h-12 rounded-2xl border border-gold/18 bg-night/58 px-4 text-warm outline-none transition placeholder:text-muted/60 focus:border-gold"
      />
    </label>
  );
}

function ComposerTextarea({
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
      <span className="text-sm font-black text-warm">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="rounded-2xl border border-gold/18 bg-night/58 p-4 leading-8 text-warm outline-none transition placeholder:text-muted/60 focus:border-gold"
      />
    </label>
  );
}

function ComposerSelect({
  label,
  value,
  onChange,
  options,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
  icon: typeof BookOpen;
}) {
  return (
    <label className="grid gap-2">
      <span className="inline-flex items-center gap-2 text-sm font-black text-warm">
        <Icon size={15} className="text-gold-light" />
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-2xl border border-gold/18 bg-night/58 px-4 text-warm outline-none transition focus:border-gold"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function toAsciiSlug(value: string) {
  const known: Record<string, string> = {
    "هرمزد یشت": "hormazd",
    "هفت امشاسپند یشت": "haft-ameshaspand",
    "اردیبهشت یشت": "ardibehesht",
    "خرداد یشت": "khordad",
    "آبان یشت": "aban",
    "خورشید یشت": "khorshid",
    "ماه یشت": "mah",
    "تیشتر یشت": "tishtar",
    "گوش یشت": "gosh",
    "مهر یشت": "mehr",
    "سروش یشت": "srosh",
    "رشن یشت": "rashn",
    "فروردین یشت": "farvardin",
    "بهرام یشت": "bahram",
    "رام یشت": "ram",
    "دین یشت": "din",
    "ارت یشت": "art",
    "اشتاد یشت": "ashtad",
    "زامیاد یشت": "zamyad",
    "هوم یشت": "hom",
    "ونند یشت": "vanand",
  };

  return known[value] ?? value.toLowerCase().replace(/\s+/g, "-");
}

function buildImagePrompt({
  title,
  summary,
  sectionSlug,
  resource,
}: {
  title: string;
  summary: string;
  sectionSlug: string;
  resource: ComposerResource;
}) {
  const moodBySection: Record<string, string> = {
    yasna: "sacred fire temple, calm ritual atmosphere, sunrise through ancient Persian stone architecture, luminous gold and warm ivory light",
    gathas: "bright Iranian mountains at dawn, open sacred book, white and gold light, serene wisdom and contemplative silence",
    visperad: "ceremonial hall of prayer, ancient scrolls, soft firelight, respectful ritual mood, museum-like Persian atmosphere",
    vendidad: "stone passage between light and shadow, blue stormy sky, sacred fire in foreground, mysterious but not frightening",
    yashts: "mythic Iranian nature, river, waterfall, stars, golden sky, heroic natural elements and ancient ruins",
    "khordeh-avesta": "peaceful Iranian home at dawn, open prayer book, small sacred flame, Persian textiles, daily devotion",
    hats: "ancient manuscript table, parchment, carved stone, study light, quiet scholarly museum atmosphere",
  };

  const format =
    resource === "avestaVerse"
      ? "cinematic editorial illustration for a verse page, intimate reading-card composition"
      : resource === "avestaChapterGuide"
        ? "poster-like chapter guide composition with central visual, space for UI panels around it"
        : "premium website hero image with clean negative space for headline and call-to-action";

  return [
    "Cinematic Persian mythology, ancient Iranian heritage aesthetic, ultra realistic premium website image.",
    `Subject: ${title}.`,
    `Context: ${summary}.`,
    `Mood and scene: ${moodBySection[sectionSlug] ?? moodBySection.hats}.`,
    format,
    "Refined museum lighting, luminous gold accents, warm ivory highlights, subtle deep navy shadows, realistic stone and parchment textures.",
    "Elegant, respectful, scholarly, inspiring, modern digital museum feeling.",
    "No readable text, no letters, no calligraphy, no watermark, no logo, not a UI mockup, not a poster with text.",
    "High detail, balanced composition, shallow depth of field, cinematic lighting, 16:9 aspect ratio, 8k, masterpiece.",
  ].join(" ");
}

function buildSeoDescription(summary: string, title: string) {
  const cleanSummary = summary.replace(/\s+/g, " ").trim();
  const fallback = `مطالعه ${title} در جهان دیجیتال اوستا، همراه با متن، ترجمه، بازنویسی ساده، تحلیل مفهومی و تصویر اختصاصی.`;
  const value = cleanSummary.length > 40 ? cleanSummary : fallback;
  return value.length > 158 ? `${value.slice(0, 155).trim()}...` : value;
}

function buildAssetPlan({
  title,
  sectionSlug,
  chapterSlug,
  slug,
  order,
  resource,
}: {
  title: string;
  sectionSlug: string;
  chapterSlug: string;
  slug: string;
  order: number;
  resource: ComposerResource;
}) {
  const baseSlug = resource === "avestaVerse" ? `${chapterSlug}-verse-${order}` : slug || chapterSlug;
  const suffix = resource === "avestaChapterGuide" ? "guide" : resource === "avestaVerse" ? "illustration" : "hero";
  const fileName = `${sectionSlug}-${baseSlug}-${suffix}.jpg`.replace(/-+/g, "-");

  return {
    publicPath: `/images/ai/avesta/${fileName}`,
    localFolder: "public/images/ai/avesta",
    altFa: `تصویر سینمایی ${title} در بخش ${sectionSlug} از جهان اوستا`,
    altEn: `Cinematic artwork for ${title} in the ${sectionSlug} section of the Avesta world`,
  };
}

function buildLaunchChecklist({
  title,
  publicRoute,
  coverImage,
  assetPlan,
  resource,
  sourceTitle,
  sourceUrl,
}: {
  title: string;
  publicRoute: string;
  coverImage: string;
  assetPlan: ReturnType<typeof buildAssetPlan>;
  resource: ComposerResource;
  sourceTitle: string;
  sourceUrl: string;
}) {
  const contentLabel =
    resource === "avestaVerse" ? "بند اوستا" : resource === "avestaChapterGuide" ? "راهنمای تصویری فصل" : "فصل / فرگرد / یشت";

  return [
    `صفحه: ${title}`,
    `نوع محتوا: ${contentLabel}`,
    `مسیر عمومی: ${publicRoute}`,
    `تصویر: ${coverImage || assetPlan.publicPath}`,
    `منبع: ${sourceTitle}${sourceUrl ? ` - ${sourceUrl}` : ""}`,
    "",
    "قبل از انتشار:",
    "□ متن اصلی/خلاصه کامل شده است.",
    "□ ترجمه یا بازنویسی ساده بررسی شده است.",
    "□ تصویر اختصاصی داخل public/images/ai/avesta قرار گرفته است.",
    "□ alt فارسی و انگلیسی ثبت شده است.",
    "□ منبع یا یادداشت پژوهشی اضافه شده است.",
    "□ لینک‌های داخلی و مسیر مطالعه بعدی بررسی شده‌اند.",
    "□ نمایش موبایل و دسکتاپ دیده شده است.",
  ].join("\n");
}
