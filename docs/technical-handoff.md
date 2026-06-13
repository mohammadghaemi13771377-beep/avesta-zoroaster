# راهنمای تحویل فنی

این سند برای تیم فنی و برنامه‌نویس پروژه است.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Meilisearch آماده اتصال
- RTL-first UI

## اجرای لوکال

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

## متغیرهای محیطی

از `.env.example` شروع کنید:

- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL`
- `MEILISEARCH_HOST`
- `MEILISEARCH_API_KEY`
- `SESSION_SECRET`
- `ADMIN_EMAIL`
- `UPLOAD_STORAGE`
- `PUBLIC_UPLOAD_BASE_URL`

## مدل‌های اصلی Prisma

در `prisma/schema.prisma`:

- `AvestaSection`
- `AvestaChapter`
- `AvestaVerse`
- `Article`
- `GlossaryTerm`
- `LibraryItem`
- `MediaAsset`
- `ImportJob`
- `User`
- `Bookmark`
- `ReadingProgress`
- `ReadingPreference`
- مدل‌های ترجمه چندزبانه

## APIهای مهم

- `GET /api/avesta`
- `GET /api/avesta/[section]`
- `GET /api/avesta/[section]/[chapter]/[verse]`
- `GET /api/search`
- `GET /api/media`
- `POST /api/media`
- `POST /api/admin/content`
- `GET /api/admin/stats`
- `GET /api/admin/slots`
- `POST /api/admin/upload`
- `GET /api/admin/import`
- `POST /api/admin/import`
- `GET /api/admin/import/[id]`

## پنل ادمین

مسیرهای فعلی:

- `/admin`
- `/admin/avesta`
- `/admin/articles`
- `/admin/glossary`
- `/admin/library`
- `/admin/media`
- `/admin/import`
- `/admin/seo`

پنل فعلی contract-first است. فرم‌ها به APIها وصل هستند و بعد از اتصال دیتابیس واقعی، ذخیره‌سازی با Prisma کامل می‌شود.

## مسیرهای مهم کد

- `app/`: صفحات، route handlerها، sitemap و robots
- `components/`: کامپوننت‌های UI و ادمین
- `lib/`: منطق محتوا، جستجو، i18n، Prisma، رسانه، import و auth
- `prisma/`: schema و seed
- `public/`: لوگو و فایل‌های static
- `docs/`: مستندات تحویل و اجرا

## کارهای فنی بعدی

1. اجرای `npm install`
2. اجرای `npm run db:generate`
3. تنظیم PostgreSQL و `DATABASE_URL`
4. اجرای migrate و seed
5. تست مسیرهای اصلی
6. اتصال Meilisearch واقعی
7. کامل‌کردن auth production
8. اتصال upload به storage دائمی
9. ساخت CRUD کامل برای همه منابع ادمین
10. اجرای build production

## چک قبل از production

```bash
npm run lint
npm run build
npm run db:generate
```

سپس این مسیرها بررسی شوند:

- `/`
- `/avesta`
- `/avesta/yasna`
- `/search`
- `/media`
- `/admin`
- `/admin/import`
- `/api/admin/stats`
- `/sitemap.xml`
- `/robots.txt`
