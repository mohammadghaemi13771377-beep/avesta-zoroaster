export type ContentProductionStatus = "ready" | "needs_database" | "needs_storage" | "needs_security" | "needs_workflow";

export type ContentProductionItem = {
  id: string;
  title: string;
  area: "content" | "media" | "admin" | "search" | "backup";
  status: ContentProductionStatus;
  owner: string;
  readiness: number;
  whatWorksNow: string;
  productionGap: string;
  nextAction: string;
  envKeys: string[];
  routes: string[];
};

export const contentProductionStatusLabels: Record<ContentProductionStatus, string> = {
  ready: "آماده",
  needs_database: "نیازمند دیتابیس",
  needs_storage: "نیازمند Storage",
  needs_security: "نیازمند امنیت",
  needs_workflow: "نیازمند Workflow"
};

export const contentProductionItems: ContentProductionItem[] = [
  {
    id: "avesta-content-crud",
    title: "CRUD محتوای اوستا",
    area: "content",
    status: "needs_database",
    owner: "Backend + Content",
    readiness: 62,
    whatWorksNow: "فرم نمونه ادمین، API اعتبارسنجی و fallback محتوای نمونه کار می‌کند.",
    productionGap: "ذخیره واقعی chapter guide، profile، verse، ترجمه و citation باید به دیتابیس/ CMS وصل شود.",
    nextAction: "مدل‌های production برای AvestaChapterGuide و AvestaChapterProfile را در Prisma یا Strapi بسازید.",
    envKeys: ["DATABASE_URL"],
    routes: ["/admin/avesta", "/api/admin/content", "/avesta/[section]/[chapter]"]
  },
  {
    id: "article-glossary-library",
    title: "مقاله، واژه‌نامه و کتابخانه",
    area: "content",
    status: "needs_database",
    owner: "Editorial + Research",
    readiness: 70,
    whatWorksNow: "Article، GlossaryTerm و LibraryItem در قرارداد ادمین و Prisma schema آماده‌اند.",
    productionGap: "نیاز به rich text editor، draft/publish، versioning و citation review دارد.",
    nextAction: "workflow انتشار و فیلدهای source/citation را برای هر مقاله و واژه اجباری کنید.",
    envKeys: ["DATABASE_URL"],
    routes: ["/admin/articles", "/admin/glossary", "/admin/library"]
  },
  {
    id: "image-audio-video-upload",
    title: "آپلود تصویر، صوت و ویدئو",
    area: "media",
    status: "needs_storage",
    owner: "Media + DevOps",
    readiness: 58,
    whatWorksNow: "آپلود local برای image/audio/pdf/video با validation پایه آماده است.",
    productionGap: "در Vercel filesystem پایدار نیست؛ فایل‌ها باید به R2/S3/Cloudinary منتقل شوند.",
    nextAction: "Storage provider را انتخاب کنید و upload adapter production را به lib/upload-storage.ts وصل کنید.",
    envKeys: ["PUBLIC_UPLOAD_BASE_URL", "S3_BUCKET", "S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY"],
    routes: ["/admin/media", "/admin/visual-assets", "/api/admin/upload"]
  },
  {
    id: "admin-auth-roles",
    title: "ورود واقعی ادمین و نقش‌ها",
    area: "admin",
    status: "needs_security",
    owner: "Security + Backend",
    readiness: 44,
    whatWorksNow: "مسیرهای ادمین، role guard و auth demo وجود دارد.",
    productionGap: "ادمین واقعی نیاز به session امن، password reset، rate limit و role policy production دارد.",
    nextAction: "Auth provider یا credential auth امن را انتخاب کنید و admin routes را پشت session واقعی ببرید.",
    envKeys: ["SESSION_SECRET", "NEXTAUTH_SECRET"],
    routes: ["/login", "/register", "/admin", "/admin/avesta-access-control"]
  },
  {
    id: "search-indexing",
    title: "ایندکس جستجوی محتوا",
    area: "search",
    status: "needs_workflow",
    owner: "Search + Backend",
    readiness: 57,
    whatWorksNow: "Search API و برنامه Meilisearch آماده اتصال است.",
    productionGap: "بعد از هر import محتوا، indexها باید sync شوند و فیلدهای اوستا/مقاله/واژه‌نامه جدا وزن بگیرند.",
    nextAction: "پس از اتصال دیتابیس، job sync برای Meilisearch و smoke test جستجو تعریف کنید.",
    envKeys: ["MEILISEARCH_HOST", "MEILISEARCH_API_KEY"],
    routes: ["/search", "/api/search", "/api/search/sync"]
  },
  {
    id: "backup-export",
    title: "بکاپ و خروجی محتوا",
    area: "backup",
    status: "needs_workflow",
    owner: "Ops + Content",
    readiness: 38,
    whatWorksNow: "بسته سورس و full-code ساخته می‌شود و import template وجود دارد.",
    productionGap: "محتوای واردشده باید خروجی JSON/CSV، بکاپ دیتابیس و بکاپ media داشته باشد.",
    nextAction: "export endpoint و برنامه بکاپ روزانه برای DB و storage تعریف کنید.",
    envKeys: ["DATABASE_URL", "BACKUP_STORAGE_BUCKET"],
    routes: ["/admin/avesta-import-template", "/admin/source-registry", "/admin/deployment-readiness"]
  }
];

export function getContentProductionSummary(items: ContentProductionItem[] = contentProductionItems) {
  const averageReadiness = Math.round(items.reduce((sum, item) => sum + item.readiness, 0) / Math.max(items.length, 1));
  const ready = items.filter((item) => item.status === "ready").length;
  const blocked = items.filter((item) => item.status === "needs_security" || item.status === "needs_storage").length;
  const nextItem = [...items].sort((a, b) => a.readiness - b.readiness)[0];

  return {
    total: items.length,
    ready,
    blocked,
    averageReadiness,
    nextItem
  };
}
