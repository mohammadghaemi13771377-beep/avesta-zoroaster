# Final GitHub, Vercel and Team Handoff

این سند برای زمانی است که پروژه AVESTA-ZOROASTER باید به GitHub، Vercel و همه تیم‌های اجرایی تحویل داده شود.

## 1. فایل‌های تحویل

- `avesta-zoroaster-source.zip`: سورس کامل پروژه، مستندات، تنظیمات، Prisma، APIها، کامپوننت‌ها و دارایی‌های public.
- `avesta-zoroaster-full-code.txt`: فول‌کد متنی برای مرور، ارسال یا آرشیو.
- `README.md`: شروع سریع و فهرست قابلیت‌ها.
- `DELIVERY.md`: خلاصه وضعیت تحویل.
- `docs/team-delivery-master.md`: سند مادر برای همه تیم‌ها.
- `docs/technical-handoff.md`: تحویل فنی به برنامه‌نویس‌ها.
- `docs/github-vercel-deploy.md`: اتصال GitHub و Vercel.
- `docs/file-manifest.md`: نقشه فایل‌های پروژه.
- `docs/final-github-vercel-team-handoff.md`: همین چک‌لیست نهایی.
- `/admin/deployment-readiness`: نسخه عملیاتی همین چک‌لیست داخل پنل ادمین.

## 2. تحویل به GitHub

داخل پوشه پروژه:

```bash
git init
git branch -M main
git add .
git commit -m "Initial AVESTA-ZOROASTER handoff"
git remote add origin https://github.com/YOUR_USERNAME/avesta-zoroaster.git
git push -u origin main
```

تنظیمات پیشنهادی repository:

- Repository name: `avesta-zoroaster`
- Default branch: `main`
- Visibility: ابتدا private تا قبل از launch عمومی.
- Branch protection برای `main` بعد از شروع کار تیمی فعال شود.
- Pull request review حداقل توسط تیم فنی و محصول قبل از merge.

## 3. تحویل به Vercel

در Vercel:

1. `Add New Project`
2. انتخاب repository با نام `avesta-zoroaster`
3. Framework: `Next.js`
4. Install command: `npm install`
5. Build command: `npm run build`
6. Environment Variables را از روی `.env.example` وارد کنید.

متغیرهای ضروری production:

```txt
NEXT_PUBLIC_SITE_URL=https://avesta-zoroaster.com
NEXT_PUBLIC_SITE_NAME=AVESTA-ZOROASTER
DATABASE_URL=postgresql://...
MEILISEARCH_HOST=https://...
MEILISEARCH_API_KEY=...
SESSION_SECRET=long-random-production-secret
ADMIN_EMAIL=admin@avesta-zoroaster.com
UPLOAD_STORAGE=s3-or-r2-or-cloudinary
PUBLIC_UPLOAD_BASE_URL=https://...
```

دامنه:

- دامنه `avesta-zoroaster.com` در Vercel اضافه شود.
- DNS طبق رکوردهای Vercel تنظیم شود.
- بعد از اتصال دامنه، مقدار `NEXT_PUBLIC_SITE_URL` روی `https://avesta-zoroaster.com` بماند.

## 4. دسترسی‌های تیمی

GitHub:

- Owner: مدیر پروژه یا مالک محصول.
- Admin: لید فنی.
- Maintain: برنامه‌نویس‌های اصلی.
- Write: تیم فنی اجرایی.
- Triage/Read: محصول، دیزاین، محتوا و QA.

Vercel:

- Owner/Admin: مالک پروژه و لید فنی.
- Developer: برنامه‌نویس‌ها.
- Viewer: محصول، دیزاین، محتوا و مدیریت.

Database / Storage / Search:

- PostgreSQL production فقط برای لید فنی و backend.
- Storage برای تیم رسانه با دسترسی upload کنترل‌شده.
- Meilisearch admin key فقط backend؛ search key عمومی جداگانه ساخته شود.

Admin Panel:

- `ADMIN`: مالک، لید فنی، مدیر محتوا.
- `EDITOR`: تیم محتوا، پژوهش، رسانه.
- `READER`: تسترها، بتا کاربران و اعضای مشاهده‌گر.

نقش‌های demo فعلی در کد برای تست هستند. در production باید auth واقعی، رمزنگاری session و مدیریت کاربر کامل جایگزین شود.

## 5. اجرای فنی بعد از تحویل

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run build
npm run start
```

Smoke test:

- `/`
- `/avesta`
- `/avesta/yasna`
- `/search`
- `/dictionary`
- `/articles`
- `/library`
- `/media`
- `/exhibitions`
- `/shop`
- `/admin`
- `/admin/go-live`
- `/admin/deployment-readiness`
- `/admin/exhibitions`
- `/admin/route-visibility`
- `/admin/avesta-access-control`
- `/sitemap.xml`
- `/robots.txt`

## 6. وضعیت امنیت و دسترسی

در نسخه فعلی:

- `middleware.ts` مسیرهای `/profile`، `/admin`، `/api/admin` و مسیرهای کنترل‌شده اوستا را محافظت می‌کند.
- `/admin/deployment-readiness` وضعیت GitHub، Vercel، envها، database، storage، domain، auth و smoke test را برای تیم فنی نشان می‌دهد.
- `lib/avesta-access-control.ts` دسترسی `anonymous/reader/editor/admin` را برای بخش‌های `public/beta/internal/hidden` محاسبه می‌کند.
- `/admin/avesta-access-control` ماتریس دسترسی مسیرهای اوستا را نشان می‌دهد.
- `/admin/route-visibility` کنترل می‌کند مسیرهای hidden/internal/beta وارد sitemap عمومی نشوند.
- `/admin/exhibitions` آمادگی نمایشگاه‌های موضوعی، نیاز رسانه، ریسک انتشار و اقدام بعدی را نشان می‌دهد.

کارهای production:

- جایگزینی session demo با auth واقعی.
- ذخیره user/session در دیتابیس.
- rate limit برای APIهای حساس.
- audit log واقعی برای عملیات ادمین.
- بررسی امنیت upload و file validation.
- فعال‌سازی HTTPS و secure cookie.

## 7. تحویل به تیم محصول

مسیرهای کلیدی محصول:

- `/world`
- `/tour`
- `/exhibitions`
- `/dashboard`
- `/compass`
- `/journey-builder`
- `/reading-room`
- `/ritual-room`
- `/achievements`
- `/streak`
- `/shop`
- `/admin/go-live`
- `/admin/product-analytics`
- `/admin/event-tracking`
- `/admin/exhibitions`

مسئولیت‌ها:

- تعریف MVP launch.
- تعیین مسیرهای beta/internal/public.
- اولویت‌بندی فازهای اوستا، رسانه، فروشگاه و خبرنامه.
- تصمیم درباره paywall، اشتراک ویژه و فروشگاه آینده.
- تایید متن‌های CTA، onboarding و retention loop.

## 8. تحویل به تیم دیزاین

هویت:

- Dark Luxury Persian Mythology
- رنگ‌ها: `#05080D`, `#071521`, `#D6A84F`, `#F2D58A`, `#FFF8EA`, `#B9B9B9`
- حس: سینمایی، ایرانی، تاریخی، معنوی، مدرن.

مسئولیت‌ها:

- بازبینی mobile-first.
- تکمیل component states.
- طراحی نسخه final heroها و cardها.
- طراحی state نمایشگاه‌ها، کارت آثار و نسخه موبایل مسیرهای curated.
- آماده‌سازی assetهای desktop/mobile.
- کنترل خوانایی متن‌های فارسی روی backgroundهای تیره.

## 9. تحویل به تیم محتوا و پژوهش

مسیرهای ادمین:

- `/admin/avesta-completion`
- `/admin/avesta-production`
- `/admin/avesta-publication-gates`
- `/admin/avesta-release-waves`
- `/admin/avesta-source-packs`
- `/admin/avesta-import-template`
- `/admin/source-registry`
- `/admin/citation-coverage`
- `/admin/source-review`

ساختار طلایی هر متن:

- متن اصلی
- آوانویسی
- ترجمه کلاسیک
- بازنویسی ساده
- تحلیل مفهومی
- پیام امروزی
- پیام اخلاقی
- تصویر
- صوت
- نقل‌قول
- citation و منبع

## 10. تحویل به تیم رسانه و AI

مسیرهای کلیدی:

- `/ai-studio`
- `/media`
- `/exhibitions`
- `/admin/media`
- `/admin/visual-assets`
- `/admin/production/briefs`
- `/admin/production/review`

مسئولیت‌ها:

- تولید تصویر اختصاصی برای هر بخش اوستا.
- تولید تصویر hero برای صفحات اصلی.
- تولید hero و thumbnail اختصاصی برای نمایشگاه‌های موضوعی و فصلی.
- ثبت prompt، negative prompt، mood، نسبت تصویر و مسیر فایل.
- آماده‌سازی صوت برای بندهای مهم.
- جلوگیری از watermark، متن اشتباه، لباس مدرن، فضای غیرایرانی و کیفیت پایین.

## 11. تحویل به تیم رشد، خبرنامه و فروشگاه

رشد و خبرنامه:

- `/newsletter`
- `/newsletter/preferences`
- `/admin/newsletter`
- `/admin/newsletter/analytics`
- `/admin/newsletter/experiments`
- `/admin/newsletter/schedule`
- `/admin/newsletter/delivery`

فروشگاه:

- `/shop`
- `/shop/[slug]`
- `/shop/checkout`
- `/admin/shop`
- `/api/shop/orders`
- `/api/shop/payments`

کارهای production:

- اتصال email provider.
- double opt-in و unsubscribe واقعی.
- اتصال payment gateway.
- موجودی واقعی، shipment، قوانین مرجوعی و گزارش فروش.
- تعریف محصولات: کتاب، ماگ، پیراهن، اکسسوری، مجسمه، پوستر.

## 12. چک‌لیست Go-Live

قبل از public launch:

- `npm run build` بدون خطا.
- اتصال PostgreSQL production.
- اجرای migrate و seed.
- اتصال Meilisearch.
- اتصال storage production.
- جایگزینی auth demo با auth production.
- تست صفحات public و admin.
- بررسی sitemap و robots.
- بررسی mobile responsive.
- پاکسازی sample content یا برچسب‌گذاری sample.
- تنظیم backup دیتابیس و storage.
- تست event tracking و privacy consent.
- تست newsletter و checkout.
- بازبینی حقوقی محتوا و منابع.

## 13. وضعیت فعلی

پروژه از نظر اسکلت محصول، UI اصلی، مسیرها، پنل‌های ادمین، APIهای پایه، Prisma schema و مستندات تحویل آماده است.

باقی‌مانده اصلی برای production:

- ورود داده و منابع واقعی.
- اتصال سرویس‌های واقعی.
- build/test در محیط تیم فنی.
- تکمیل auth، storage، search، newsletter و payment production.

