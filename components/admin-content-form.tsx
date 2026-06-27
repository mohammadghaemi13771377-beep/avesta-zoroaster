"use client";

import { Save, Sparkles, Upload } from "lucide-react";
import { useMemo, useState } from "react";

const contentTypes = [
  { label: "بند اوستا", value: "avestaVerse" },
  { label: "فصل / هات", value: "avestaChapter" },
  { label: "راهنمای تصویری فصل", value: "avestaChapterGuide" },
  { label: "بخش اوستا", value: "avestaSection" },
  { label: "مقاله", value: "article" },
  { label: "واژه‌نامه", value: "glossaryTerm" },
  { label: "کتابخانه", value: "libraryItem" }
];

export function AdminContentForm() {
  const [resource, setResource] = useState("avestaVerse");
  const [locale, setLocale] = useState("FA");
  const [title, setTitle] = useState("هات نمونه ۱");
  const [slug, setSlug] = useState("verse-1");
  const [sectionSlug, setSectionSlug] = useState("yasna");
  const [chapterSlug, setChapterSlug] = useState("ha-1");
  const [order, setOrder] = useState(1);
  const [summary, setSummary] = useState("نمونه محتوای طلایی برای نمایش ساختار پنل مدیریت.");
  const [seoTitle, setSeoTitle] = useState("هات نمونه ۱ | AVESTA-ZOROASTER");
  const [status, setStatus] = useState("پیش‌نویس آماده ذخیره است.");

  const payload = useMemo(
    () => ({
      resource,
      locale,
      title,
      slug,
      sectionSlug,
      chapterSlug,
      order,
      summary,
      seoTitle,
      coverImage: "/images/ai/yasna-hero.jpg",
      accent: "#F2B45E",
      tone: "fire",
      audioUrl: "/audio/yasna-verse-1.mp3",
      fileUrl: "/library/avesta-reading-guide.pdf",
      language: "fa",
      type: "PDF",
      fields: {
        originalText: "جایگاه متن اصلی اوستایی",
        transliteration: "Sample transliteration",
        classicalTranslation: "جایگاه ترجمه کلاسیک",
        simpleRewrite: "جایگاه بازنویسی ساده",
        modernInterpretation: "جایگاه تحلیل مفهومی",
        ethicalMessage: "جایگاه پیام اخلاقی",
        meaning: "معنی واژه",
        root: "Avestan root",
        description: summary,
        content: "متن کامل مقاله یا محتوای آموزشی در این بخش قرار می‌گیرد.",
        question: "چگونه این فصل به تجربه تصویری و اخلاقی تبدیل می‌شود؟",
        subtitle: "زیرعنوان راهنمای تصویری فصل برای hero، کارت‌ها و صفحه بندها.",
        leadQuote: "نقل‌قول محوری این فصل برای اتصال متن به زندگی امروز.",
        curatorNote: "یادداشت کیوریتور برای تیم محتوا و دیزاین.",
        historicalContext: "زمینه تاریخی فصل؛ این متن به کاربر می‌گوید فصل در سنت و تاریخ اوستا چه جایگاهی دارد.",
        ritualContext: "زمینه آیینی و تجربه کاربری؛ توضیح اینکه صفحه چگونه متن را به مطالعه، تصویر، نیایش یا تمرین روزانه وصل می‌کند.",
        keyThemes: JSON.stringify(["آتش", "نیایش", "پاکی", "پندار نیک"]),
        imageAlt: JSON.stringify({
          fa: "آتشکده‌ای روشن با آتش مقدس و قاب‌های طلایی برای تجربه یسنا",
          en: "A luminous fire temple with sacred fire and golden frames for the Yasna experience"
        }),
        relatedChapters: JSON.stringify([
          { title: "آتش نیایش", href: "/avesta/khordeh-avesta/atash-niyayesh", reason: "برای ادامه تجربه نور و نیایش روزانه" }
        ]),
        verses: JSON.stringify([
          { title: "بند آغازین", href: "/avesta/yasna/ha-1/verse-1", summary: "شروع مطالعه با متن، ترجمه و پیام اخلاقی." }
        ]),
        todayPractice: JSON.stringify(["یک متن کوتاه بخوان.", "یک پیام اخلاقی یادداشت کن.", "یک کار نیک انجام بده."]),
        sidePanels: JSON.stringify([
          { title: "قاب اول", body: "توضیح کوتاه قاب اول.", icon: "sparkles" },
          { title: "قاب دوم", body: "توضیح کوتاه قاب دوم.", icon: "sun" }
        ]),
        storyPanels: JSON.stringify([
          { title: "کارت روایت", body: "توضیح کارت روایت.", image: "/images/ai/yasna-hero.jpg" }
        ])
      }
    }),
    [chapterSlug, locale, order, resource, sectionSlug, seoTitle, slug, summary, title]
  );

  async function handleSave() {
    setStatus("در حال ارسال payload به API مدیریت...");
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
    <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-[18px] border border-gold/15 bg-night/65 p-6">
        <div className="flex items-center gap-2 text-gold-light">
          <Sparkles size={20} />
          <h2 className="text-2xl font-black">فرم محتوای طلایی</h2>
        </div>
        <div className="mt-6 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-warm">نوع محتوا</span>
              <select
                value={resource}
                onChange={(event) => setResource(event.target.value)}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
              >
                {contentTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
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
          </div>

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
              <span className="text-sm font-bold text-warm">ترتیب</span>
              <input
                type="number"
                min={1}
                value={order}
                onChange={(event) => setOrder(Number(event.target.value))}
                className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-warm">خلاصه</span>
            <textarea
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              rows={4}
              className="rounded-2xl border border-gold/20 bg-royal p-4 text-warm outline-none focus:border-gold"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-warm">SEO title</span>
            <input
              value={seoTitle}
              onChange={(event) => setSeoTitle(event.target.value)}
              className="h-12 rounded-2xl border border-gold/20 bg-royal px-4 text-warm outline-none focus:border-gold"
            />
          </label>

          <div className="grid gap-3 rounded-2xl border border-gold/10 bg-royal/45 p-4">
            {["متن اصلی", "ترجمه کلاسیک", "بازنویسی ساده", "تحلیل مفهومی", "پیام اخلاقی"].map((item) => (
              <div key={item} className="rounded-xl border border-gold/10 bg-night/45 px-4 py-3 text-sm text-muted">
                {item}: در نسخه واقعی، ویرایشگر کامل این فیلد اینجا قرار می‌گیرد.
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-5 py-3 font-bold text-gold-light transition hover:bg-gold/10"
            >
              <Upload size={18} />
              آپلود تصویر / صوت
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light"
            >
              <Save size={18} />
              ذخیره نمونه
            </button>
          </div>
          <p className="text-sm text-muted">{status}</p>
        </div>
      </div>

      <div className="rounded-[18px] border border-gold/15 bg-royal/45 p-6">
        <h2 className="text-2xl font-black text-warm">Payload آماده اتصال</h2>
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
