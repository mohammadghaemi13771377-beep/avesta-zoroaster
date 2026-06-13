# راهنمای اجرای لوکال و دیپلوی

این پروژه دو نوع اجرا دارد:

1. اجرای کامل Next.js برای توسعه واقعی
2. پیش‌نمایش سبک HTML برای دیدن حال‌وهوای اولیه بدون نصب کامل dependencyها

## اجرای کامل Next.js

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

آدرس لوکال:

```txt
http://localhost:3000
```

## اجرای پیش‌نمایش سبک

```bash
npm run preview:static
```

آدرس پیش‌نمایش:

```txt
http://127.0.0.1:4173
```

این حالت فقط `local-preview.html` و فایل‌های public را سرو می‌کند. برای تست مسیرهای واقعی Next.js، پنل ادمین، APIها و دیتابیس باید اجرای کامل Next.js انجام شود.

## تنظیمات محیط

فایل `.env.example` را به `.env` کپی کن و مقدارها را تغییر بده:

```bash
cp .env.example .env
```

مهم‌ترین مقدارها:

- `NEXT_PUBLIC_SITE_URL`: دامنه اصلی سایت
- `DATABASE_URL`: اتصال PostgreSQL
- `MEILISEARCH_HOST`: آدرس Meilisearch
- `MEILISEARCH_API_KEY`: کلید Meilisearch
- `SESSION_SECRET`: کلید نشست کاربران
- `ADMIN_EMAIL`: ایمیل مدیر اصلی

## دیتابیس

برای توسعه لوکال می‌توان PostgreSQL را روی سیستم یا Docker اجرا کرد. بعد از تنظیم `DATABASE_URL`:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## دیپلوی پیشنهادی

گزینه‌های مناسب:

- Vercel برای Frontend و APIهای Next.js
- PostgreSQL روی Neon، Supabase یا Railway
- Meilisearch روی سرویس جداگانه یا سرور اختصاصی
- Cloudflare R2 یا S3 برای رسانه‌های واقعی

## چک قبل از انتشار

```bash
npm run lint
npm run build
npm run db:generate
```

بعد از build موفق، مسیرهای زیر را بررسی کن:

- `/`
- `/avesta`
- `/avesta/yasna`
- `/search`
- `/media`
- `/admin`
- `/admin/media`
- `/admin/import`
- `/api/admin/stats`
- `/sitemap.xml`
- `/robots.txt`

## نکته مهم درباره محتوا

فعلاً ساختار، مسیرها، APIها، مدل دیتابیس، جایگاه رسانه و import آماده است. تصاویر AI، صوت‌ها، PDFها و متن‌های نهایی می‌توانند بعداً از پنل ادمین یا import دسته‌ای وارد شوند.
