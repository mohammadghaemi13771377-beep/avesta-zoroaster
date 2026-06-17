export type AdminContentModel = {
  id: string;
  title: string;
  description: string;
  apiRoute: string;
  adminRoute: string;
  storageStrategy: string;
  fields: Array<{
    name: string;
    label: string;
    type: "text" | "richtext" | "slug" | "image" | "audio" | "number" | "select" | "tags" | "relation" | "json";
    required: boolean;
    note: string;
  }>;
};

export const adminContentModels: AdminContentModel[] = [
  {
    id: "article",
    title: "مقاله",
    description: "مقاله‌های پژوهشی، آموزشی و SEO-ready با تصویر کاور و لینک داخلی.",
    apiRoute: "/api/admin/content",
    adminRoute: "/admin/articles",
    storageStrategy: "Prisma Article در production؛ fallback نمونه در lib/sample-content.ts",
    fields: [
      { name: "title", label: "عنوان", type: "text", required: true, note: "برای H1 و metadata استفاده می‌شود." },
      { name: "slug", label: "اسلاگ", type: "slug", required: true, note: "URL تمیز مثل asha-truth-order." },
      { name: "excerpt", label: "خلاصه", type: "text", required: true, note: "برای کارت و SEO description." },
      { name: "content", label: "متن کامل", type: "richtext", required: true, note: "قابل تبدیل به blocks در CMS." },
      { name: "coverImage", label: "تصویر کاور", type: "image", required: true, note: "مسیر local فعلی در public/images/ai یا storage آینده." },
      { name: "tags", label: "برچسب‌ها", type: "tags", required: false, note: "برای سرچ، پیشنهاد محتوا و SEO." },
    ],
  },
  {
    id: "avesta-verse",
    title: "بند اوستا",
    description: "سیستم محتوای طلایی برای متن اصلی، ترجمه، بازنویسی، تحلیل، پیام اخلاقی، تصویر و صوت.",
    apiRoute: "/api/avesta/[section]/[chapter]/[verse]",
    adminRoute: "/admin/avesta",
    storageStrategy: "Prisma AvestaVerse؛ fallback از sample verses تا قبل از ورود کامل محتوا.",
    fields: [
      { name: "originalText", label: "متن اصلی", type: "richtext", required: true, note: "متن اوستایی یا متن مرجع." },
      { name: "transliteration", label: "آوانویسی", type: "text", required: false, note: "برای خوانش و جستجو." },
      { name: "classicalTranslation", label: "ترجمه کلاسیک", type: "richtext", required: true, note: "با citation پژوهشی." },
      { name: "simpleRewrite", label: "بازنویسی ساده", type: "richtext", required: true, note: "فارسی روان برای مخاطب عمومی." },
      { name: "modernInterpretation", label: "تحلیل امروزی", type: "richtext", required: true, note: "لایه مفهومی و اخلاقی." },
      { name: "imageUrl", label: "تصویر بند", type: "image", required: false, note: "قابل آپلود local یا storage آینده." },
      { name: "audioUrl", label: "صوت", type: "audio", required: false, note: "خوانش بند یا توضیح کوتاه." },
    ],
  },
  {
    id: "avesta-chapter-guide",
    title: "راهنمای تصویری فصل اوستا",
    description: "داده پوستر/موزه برای هر یشت، فرگرد، هات یا نیایش شامل hero، قاب‌های روایی، پیام امروزی و تمرین‌ها.",
    apiRoute: "/api/admin/content",
    adminRoute: "/admin/avesta",
    storageStrategy: "فعلاً lib/avesta-chapter-guides.ts و dry-run در /api/admin/content؛ بعداً Prisma/CMS collection مستقل.",
    fields: [
      { name: "sectionSlug", label: "بخش", type: "relation", required: true, note: "مثل yashts یا vendidad." },
      { name: "chapterSlug", label: "فصل", type: "relation", required: true, note: "مثل aban-yasht یا fargard-1." },
      { name: "title", label: "عنوان پوستر", type: "text", required: true, note: "H2 اصلی تجربه تصویری." },
      { name: "question", label: "پرسش محوری", type: "text", required: true, note: "پرسشی که صفحه را به روایت تبدیل می‌کند." },
      { name: "subtitle", label: "زیرعنوان", type: "richtext", required: true, note: "توضیح کوتاه hero و زمینه روایی." },
      { name: "coverImage", label: "Hero/Cover", type: "image", required: true, note: "مسیر public/images/ai یا storage آینده." },
      { name: "accent", label: "رنگ Accent", type: "text", required: false, note: "مثل #9EE7F2 برای آب یا #F2B45E برای آتش." },
      { name: "tone", label: "Tone", type: "select", required: false, note: "water, fire, judgment, creation, silence, ritual, scroll." },
      { name: "leadQuote", label: "نقل‌قول محوری", type: "richtext", required: true, note: "در کارت طلایی chapter و verse نمایش داده می‌شود." },
      { name: "sidePanels", label: "قاب‌های کناری", type: "json", required: true, note: "آرایه عنوان، متن و icon." },
      { name: "storyPanels", label: "کارت‌های روایت", type: "json", required: true, note: "آرایه کارت‌ها با image و متن." },
      { name: "todayPractice", label: "تمرین روزانه", type: "json", required: true, note: "سه تمرین کوتاه برای کاربر." },
    ],
  },
  {
    id: "media-asset",
    title: "رسانه",
    description: "تصویر AI، صوت، ویدیو، پادکست و thumbnailهای قابل اتصال به صفحات.",
    apiRoute: "/api/admin/upload",
    adminRoute: "/admin/media",
    storageStrategy: "فعلاً public/images/ai و public/audio؛ بعداً S3/R2/Cloudinary.",
    fields: [
      { name: "title", label: "عنوان", type: "text", required: true, note: "برای کارت رسانه." },
      { name: "type", label: "نوع", type: "select", required: true, note: "AI Image, Audio, Video, Podcast." },
      { name: "url", label: "فایل اصلی", type: "image", required: true, note: "یا audio/video در storage آینده." },
      { name: "thumbnail", label: "thumbnail", type: "image", required: true, note: "برای کارت‌ها و heroها." },
      { name: "prompt", label: "Prompt", type: "richtext", required: false, note: "برای بازتولید دارایی AI." },
    ],
  },
  {
    id: "exhibition",
    title: "نمایشگاه",
    description: "مسیر curated شامل hero، آثار، یادداشت کیوریتور، CTA و readiness.",
    apiRoute: "/api/admin/exhibitions",
    adminRoute: "/admin/exhibitions",
    storageStrategy: "فعلاً lib/exhibitions.ts؛ بعداً مدل Exhibition و ExhibitionArtifact در دیتابیس.",
    fields: [
      { name: "title", label: "عنوان", type: "text", required: true, note: "نام نمایشگاه." },
      { name: "heroImage", label: "Hero", type: "image", required: true, note: "تصویر سینمایی بالای نمایشگاه." },
      { name: "curatorNote", label: "یادداشت کیوریتور", type: "richtext", required: true, note: "روایت انسانی و موزه‌ای." },
      { name: "artifacts", label: "آثار", type: "json", required: true, note: "لیست اثرها با thumbnail و href." },
      { name: "relatedRoutes", label: "مسیرهای مرتبط", type: "relation", required: false, note: "لینک به صفحات سایت." },
    ],
  },
  {
    id: "product",
    title: "محصول فروشگاه",
    description: "محصول فرهنگی با تصویر، قیمت نمایشی، وضعیت موجودی و مسیر checkout آینده.",
    apiRoute: "/api/admin/shop/products",
    adminRoute: "/admin/shop",
    storageStrategy: "Prisma Product در production؛ fallback در lib/shop.ts.",
    fields: [
      { name: "title", label: "نام محصول", type: "text", required: true, note: "برای کارت و صفحه محصول." },
      { name: "price", label: "قیمت", type: "number", required: true, note: "فعلاً نمایشی، بعداً payment." },
      { name: "imageSrc", label: "تصویر محصول", type: "image", required: true, note: "عکس یا mockup محصول." },
      { name: "inventoryStatus", label: "وضعیت", type: "select", required: true, note: "available, preorder, limited." },
      { name: "materials", label: "جزئیات", type: "tags", required: false, note: "جنس، بسته‌بندی، نسخه." },
    ],
  },
];

export function getAdminContentModels() {
  return adminContentModels;
}
