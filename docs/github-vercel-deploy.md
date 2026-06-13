# راه اندازی GitHub و نمایش آنلاین سایت

هدف این جریان:

- کد پروژه داخل GitHub قرار بگیرد.
- سایت از روی همان GitHub روی Vercel آنلاین شود.
- هر بار کد در پروژه به روز شد و روی GitHub push شد، Vercel خودکار نسخه آنلاین را تازه کند.

## مسیر پیشنهادی

برای این پروژه، GitHub Pages مناسب نیست؛ چون پروژه Next.js دارد و از API route، middleware، Prisma و پنل ادمین استفاده می کند.

مسیر درست:

1. ساخت repository در GitHub
2. push کردن همین پروژه به repository
3. اتصال repository به Vercel
4. deploy خودکار با هر push

## ساخت repository در GitHub

در GitHub یک repository جدید بسازید:

- Repository name: `avesta-zoroaster`
- Visibility: private یا public طبق نیاز
- گزینه های `Add README`، `Add .gitignore` و `Choose a license` را فعال نکنید؛ پروژه خودش فایل ها را دارد.

## push اولیه از روی سیستم

داخل همین پوشه پروژه اجرا شود:

```bash
git init
git branch -M main
git add .
git commit -m "Initial AVESTA-ZOROASTER project"
git remote add origin https://github.com/YOUR_USERNAME/avesta-zoroaster.git
git push -u origin main
```

به جای `YOUR_USERNAME` نام کاربری GitHub قرار بگیرد.

## اتصال به Vercel

1. وارد Vercel شوید.
2. گزینه `Add New Project` را بزنید.
3. repository با نام `avesta-zoroaster` را انتخاب کنید.
4. Framework باید `Next.js` باشد.
5. Environment variables را از روی `.env.example` وارد کنید.
6. Deploy را بزنید.

## متغیرهای مهم

حداقل این موارد باید در Vercel تنظیم شوند:

```txt
NEXT_PUBLIC_SITE_URL=https://avesta-zoroaster.com
NEXT_PUBLIC_SITE_NAME=AVESTA-ZOROASTER
DATABASE_URL=...
MEILISEARCH_HOST=...
MEILISEARCH_API_KEY=...
SESSION_SECRET=...
ADMIN_EMAIL=admin@avesta-zoroaster.com
UPLOAD_STORAGE=local
PUBLIC_UPLOAD_BASE_URL=
```

برای نسخه نمایشی اولیه می توان فقط frontend را بررسی کرد، اما برای production واقعی باید دیتابیس PostgreSQL و مقادیر امن تنظیم شوند.

## آپدیت های بعدی از چت Codex

هر بار در چت `avesta-zoroaster.com` کد جدید اضافه شد:

```bash
git status
git add .
git commit -m "Update AVESTA-ZOROASTER"
git push
```

بعد از push، Vercel خودکار build جدید را اجرا می کند و سایت آنلاین به روز می شود.

## نکته مهم برای همگام سازی خودکار

Codex زمانی می تواند خودش push کند که یکی از این دو مورد فعال باشد:

- Git و GitHub CLI روی همین محیط نصب و لاگین شده باشند.
- یا اتصال GitHub داخل Codex فعال باشد و ابزار push/PR در دسترس باشد.

در غیر این صورت Codex می تواند کد را آماده کند، اما push نهایی باید دستی انجام شود.
