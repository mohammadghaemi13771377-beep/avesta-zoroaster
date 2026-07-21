export type AdminContentFieldType =
  | "text"
  | "richtext"
  | "slug"
  | "image"
  | "audio"
  | "number"
  | "select"
  | "tags"
  | "relation"
  | "json";

export type AdminContentModel = {
  id: string;
  title: string;
  description: string;
  apiRoute: string;
  adminRoute: string;
  storageStrategy: string;
  cmsStatus: "ready" | "partial" | "planned";
  ownerTeam: "content" | "research" | "media" | "commerce" | "engineering";
  fields: Array<{
    name: string;
    label: string;
    type: AdminContentFieldType;
    required: boolean;
    note: string;
  }>;
};

export const adminContentModels: AdminContentModel[] = [
  {
    id: "article",
    title: "مقاله",
    description: "مقاله‌های پژوهشی، آموزشی و SEO-ready با تصویر کاور، لینک داخلی، دسته‌بندی و metadata اختصاصی.",
    apiRoute: "/api/admin/content",
    adminRoute: "/admin/articles",
    storageStrategy: "در production با Prisma Article؛ تا قبل از دیتابیس کامل از نمونه‌های lib/sample-content.ts استفاده می‌شود.",
    cmsStatus: "partial",
    ownerTeam: "content",
    fields: [
      { name: "title", label: "عنوان", type: "text", required: true, note: "برای H1، metadata و کارت مقاله استفاده می‌شود." },
      { name: "slug", label: "اسلاگ", type: "slug", required: true, note: "URL تمیز مثل what-is-avesta یا asha-truth-order." },
      { name: "excerpt", label: "خلاصه", type: "text", required: true, note: "برای کارت‌ها، جستجو و SEO description." },
      { name: "content", label: "متن کامل", type: "richtext", required: true, note: "در CMS آینده بهتر است block-based ذخیره شود." },
      { name: "coverImage", label: "تصویر کاور", type: "image", required: true, note: "فایل local در public/images/ai یا storage آینده." },
      { name: "tags", label: "برچسب‌ها", type: "tags", required: false, note: "برای جستجو، پیشنهاد محتوا و لینک‌سازی داخلی." },
      { name: "seoTitle", label: "عنوان SEO", type: "text", required: false, note: "اگر خالی باشد از title ساخته می‌شود." },
      { name: "seoDescription", label: "توضیح SEO", type: "text", required: false, note: "برای Google و شبکه‌های اجتماعی." },
    ],
  },
  {
    id: "avesta-section",
    title: "بخش اوستا",
    description: "دروازه‌های اصلی اوستا مثل یسنا، گات‌ها، ویسپرد، وندیداد، یشت‌ها و خرده‌اوستا.",
    apiRoute: "/api/admin/content",
    adminRoute: "/admin/avesta",
    storageStrategy: "فعلاً از داده‌های محلی Avesta استفاده می‌شود؛ در فاز CMS به AvestaSection منتقل می‌شود.",
    cmsStatus: "partial",
    ownerTeam: "research",
    fields: [
      { name: "title", label: "عنوان", type: "text", required: true, note: "نام فارسی/انگلیسی بخش." },
      { name: "slug", label: "اسلاگ", type: "slug", required: true, note: "مثل yasna، vendidad یا yashts." },
      { name: "description", label: "معرفی کوتاه", type: "richtext", required: true, note: "برای landing page بخش." },
      { name: "coverImage", label: "Hero/Cover", type: "image", required: true, note: "تصویر اختصاصی سینمایی هر بخش." },
      { name: "themeColor", label: "رنگ تم", type: "text", required: false, note: "برای accent کارت و صفحه." },
      { name: "order", label: "ترتیب نمایش", type: "number", required: true, note: "برای مرتب‌سازی در پورتال اوستا." },
    ],
  },
  {
    id: "avesta-chapter",
    title: "فصل / هات / فرگرد / یشت",
    description: "صفحه اختصاصی هر فصل، هات، فرگرد، یشت یا نیایش با summary، context، key themes و مسیرهای مرتبط.",
    apiRoute: "/api/admin/content",
    adminRoute: "/admin/avesta",
    storageStrategy: "فعلاً از routeهای SSG نمونه؛ در فاز بعد با AvestaChapter و رابطه به Section ذخیره می‌شود.",
    cmsStatus: "partial",
    ownerTeam: "research",
    fields: [
      { name: "sectionId", label: "بخش مادر", type: "relation", required: true, note: "اتصال به یسنا، وندیداد، یشت‌ها و..." },
      { name: "title", label: "عنوان", type: "text", required: true, note: "نام فصل یا هات." },
      { name: "slug", label: "اسلاگ", type: "slug", required: true, note: "مثل ha-1، fargard-1 یا aban-yasht." },
      { name: "number", label: "شماره", type: "number", required: false, note: "برای فصل‌هایی که ترتیب عددی دارند." },
      { name: "summary", label: "خلاصه", type: "richtext", required: true, note: "توضیح قابل فهم برای مخاطب عمومی." },
      { name: "historicalContext", label: "زمینه تاریخی", type: "richtext", required: false, note: "برای اعتبار پژوهشی و منابع." },
      { name: "ritualContext", label: "زمینه آیینی", type: "richtext", required: false, note: "ارتباط فصل با آیین، نیایش یا مطالعه." },
      { name: "keyThemes", label: "کلیدواژه‌ها", type: "tags", required: true, note: "برای فیلتر، جستجو و نقشه مفهومی." },
      { name: "coverImage", label: "تصویر فصل", type: "image", required: true, note: "Hero اختصاصی فصل." },
    ],
  },
  {
    id: "avesta-verse",
    title: "بند اوستا",
    description: "سیستم محتوای طلایی برای متن اصلی، آوانویسی، ترجمه کلاسیک، بازنویسی ساده، تحلیل، پیام اخلاقی، تصویر و صوت.",
    apiRoute: "/api/avesta/[section]/[chapter]/[verse]",
    adminRoute: "/admin/avesta",
    storageStrategy: "فعلاً sample verse؛ در production با AvestaVerse و رابطه به Chapter ذخیره می‌شود.",
    cmsStatus: "planned",
    ownerTeam: "research",
    fields: [
      { name: "chapterId", label: "فصل مادر", type: "relation", required: true, note: "اتصال بند به هات، فرگرد یا یشت." },
      { name: "originalText", label: "متن اصلی", type: "richtext", required: true, note: "متن اوستایی یا متن مرجع." },
      { name: "transliteration", label: "آوانویسی", type: "text", required: false, note: "برای خوانش، آموزش و جستجو." },
      { name: "classicalTranslation", label: "ترجمه کلاسیک", type: "richtext", required: true, note: "باید همراه با citation و source note باشد." },
      { name: "simpleRewrite", label: "بازنویسی ساده", type: "richtext", required: true, note: "فارسی روان برای مخاطب عمومی." },
      { name: "modernInterpretation", label: "تحلیل امروزی", type: "richtext", required: true, note: "لایه مفهومی و کاربردی." },
      { name: "ethicalMessage", label: "پیام اخلاقی", type: "richtext", required: true, note: "برداشت کوتاه و قابل استفاده در زندگی." },
      { name: "imageUrl", label: "تصویر بند", type: "image", required: false, note: "تصویر AI یا curated." },
      { name: "audioUrl", label: "صوت", type: "audio", required: false, note: "خوانش بند یا توضیح کوتاه." },
    ],
  },
  {
    id: "glossary-term",
    title: "واژه‌نامه",
    description: "مدیریت واژه‌های کلیدی مثل اشا، وهومن، اهورامزدا، فروهر و گاتا با ریشه، کاربرد و لینک‌های مرتبط.",
    apiRoute: "/api/admin/content",
    adminRoute: "/admin/glossary",
    storageStrategy: "فعلاً داده نمونه؛ در فاز CMS به GlossaryTerm و relationهای مقاله/بند وصل می‌شود.",
    cmsStatus: "partial",
    ownerTeam: "research",
    fields: [
      { name: "term", label: "واژه", type: "text", required: true, note: "عنوان اصلی صفحه واژه." },
      { name: "slug", label: "اسلاگ", type: "slug", required: true, note: "URL مثل asha یا ahura-mazda." },
      { name: "meaning", label: "معنی کوتاه", type: "text", required: true, note: "تعریف سریع برای کارت و search." },
      { name: "root", label: "ریشه", type: "text", required: false, note: "ریشه زبانی یا تاریخی." },
      { name: "description", label: "توضیح کامل", type: "richtext", required: true, note: "شرح پژوهشی و ساده." },
      { name: "relatedArticles", label: "مقاله‌های مرتبط", type: "relation", required: false, note: "برای لینک‌سازی داخلی." },
      { name: "relatedVerses", label: "بندهای مرتبط", type: "relation", required: false, note: "برای اتصال واژه به متن اوستا." },
    ],
  },
  {
    id: "media-asset",
    title: "رسانه",
    description: "تصویر AI، صوت، ویدیو، پادکست، PDF و thumbnailهای قابل اتصال به صفحات.",
    apiRoute: "/api/admin/upload",
    adminRoute: "/admin/media",
    storageStrategy: "فعلاً public/images/ai و public/audio؛ بعداً S3، Cloudflare R2 یا Cloudinary.",
    cmsStatus: "partial",
    ownerTeam: "media",
    fields: [
      { name: "title", label: "عنوان", type: "text", required: true, note: "برای کارت رسانه و alt text." },
      { name: "type", label: "نوع", type: "select", required: true, note: "AI Image، Audio، Video، Podcast، PDF." },
      { name: "url", label: "فایل اصلی", type: "image", required: true, note: "مسیر فایل یا URL storage." },
      { name: "thumbnail", label: "Thumbnail", type: "image", required: true, note: "برای کارت‌ها، heroها و preview." },
      { name: "altFa", label: "Alt فارسی", type: "text", required: true, note: "برای accessibility و SEO فارسی." },
      { name: "altEn", label: "Alt انگلیسی", type: "text", required: true, note: "برای نسخه انگلیسی سایت." },
      { name: "usageMap", label: "نقشه استفاده", type: "json", required: false, note: "مشخص می‌کند تصویر در کدام routeها استفاده شده است." },
      { name: "prompt", label: "Prompt", type: "richtext", required: false, note: "برای بازتولید دارایی AI." },
    ],
  },
  {
    id: "exhibition",
    title: "نمایشگاه",
    description: "مسیر curated شامل hero، آثار، یادداشت کیوریتور، CTA، وضعیت انتشار و آثار مرتبط.",
    apiRoute: "/api/admin/exhibitions",
    adminRoute: "/admin/exhibitions",
    storageStrategy: "فعلاً lib/exhibitions.ts؛ بعداً مدل Exhibition و ExhibitionArtifact در دیتابیس.",
    cmsStatus: "partial",
    ownerTeam: "content",
    fields: [
      { name: "title", label: "عنوان", type: "text", required: true, note: "نام نمایشگاه." },
      { name: "slug", label: "اسلاگ", type: "slug", required: true, note: "برای route نمایشگاه." },
      { name: "heroImage", label: "Hero", type: "image", required: true, note: "تصویر سینمایی بالای نمایشگاه." },
      { name: "curatorNote", label: "یادداشت کیوریتور", type: "richtext", required: true, note: "روایت انسانی و موزه‌ای." },
      { name: "artifacts", label: "آثار", type: "json", required: true, note: "لیست اثرها با thumbnail، توضیح و href." },
      { name: "relatedRoutes", label: "مسیرهای مرتبط", type: "relation", required: false, note: "لینک به صفحات سایت." },
    ],
  },
  {
    id: "product",
    title: "محصول فروشگاه",
    description: "محصول فرهنگی با تصویر، قیمت نمایشی، وضعیت موجودی، دسته‌بندی، مشخصات و مسیر checkout آینده.",
    apiRoute: "/api/admin/shop/products",
    adminRoute: "/admin/shop",
    storageStrategy: "Prisma Product در production؛ fallback در lib/shop.ts.",
    cmsStatus: "partial",
    ownerTeam: "commerce",
    fields: [
      { name: "title", label: "نام محصول", type: "text", required: true, note: "برای کارت و صفحه محصول." },
      { name: "slug", label: "اسلاگ", type: "slug", required: true, note: "URL محصول." },
      { name: "price", label: "قیمت", type: "number", required: true, note: "فعلاً نمایشی؛ بعداً به payment وصل می‌شود." },
      { name: "imageSrc", label: "تصویر محصول", type: "image", required: true, note: "عکس یا mockup محصول." },
      { name: "inventoryStatus", label: "وضعیت", type: "select", required: true, note: "available، preorder یا limited." },
      { name: "materials", label: "جزئیات", type: "tags", required: false, note: "جنس، بسته‌بندی، نسخه و مشخصات." },
    ],
  },
];

export function getAdminContentModels() {
  return adminContentModels;
}

export function getAdminContentModelSummary(models: AdminContentModel[] = getAdminContentModels()) {
  return {
    total: models.length,
    ready: models.filter((model) => model.cmsStatus === "ready").length,
    partial: models.filter((model) => model.cmsStatus === "partial").length,
    planned: models.filter((model) => model.cmsStatus === "planned").length,
    requiredFields: models.reduce((count, model) => count + model.fields.filter((field) => field.required).length, 0),
  };
}
