# GitHub/Vercel Update Note

این نسخه برای commit و deploy جدید آماده است.

## Suggested Commit

```txt
feat: add publish pipeline and asset operations
```

## Summary

- اضافه شدن الگوی پوستر/موزه نورانی برای صفحه‌های داخلی اوستا
- اتصال کاور واقعی به hero صفحه‌های `/avesta/[section]`
- اضافه شدن داده‌های اختصاصی برای یسنا، گات‌ها، ویسپرد، وندیداد، یشت‌ها، خرده اوستا و هات‌ها
- اضافه شدن route اختصاصی `/avesta/[section]/[chapter]` برای یسنا ۱، اهونود گات، درآمد ویسپرد، آبان یشت، مهر یشت، فرگردهای وندیداد، نیایش‌های خرده اوستا و نقشه هات‌ها
- اضافه شدن API جدید `/api/avesta/[section]/[chapter]`
- اضافه شدن اطلس تصویری chapterها در صفحه‌های مادر اوستا برای نمایش کاور، نقل‌قول، تعداد بند و CTAها
- اتصال صفحه‌های `/avesta/[section]/[chapter]/[verse]` به chapter guide برای hero تصویری، زمینه روایی و تمرین‌های همان تالار
- اضافه شدن `lib/avesta-chapter-profiles.ts` برای زمینه تاریخی، زمینه آیینی، کلیدواژه‌ها، alt تصویر، مسیرهای مرتبط و بندهای شاخص هر فصل
- نمایش پروفایل محتوایی داخل صفحه‌های `/avesta/[section]/[chapter]` برای تبدیل صفحه از پوستر صرف به اطلس آموزشی قابل مطالعه
- افزودن `profile` به API `/api/avesta/[section]/[chapter]` برای مصرف CMS، اپ، ادمین یا محصول آینده
- توسعه ماتریس تکمیل اوستا با فیلدهای `chapterGuide`، `chapterProfile` و `imageAlt`
- اضافه شدن شاخص‌های آماده‌سازی به پورتال `/avesta` و نمایش کلیدواژه‌های پروفایل در اطلس فصل‌ها
- اضافه شدن مسیرهای شروع مطالعه اوستا در `/avesta` و API جدید `/api/avesta/study-paths`
- اضافه شدن صفحه‌های عمومی `/avesta/paths` و `/avesta/paths/[id]`
- اضافه شدن progress tracker محلی برای قدم‌های هر مسیر مطالعه
- اضافه شدن کنسول ادمین `/admin/avesta-study-paths` و API `/api/admin/avesta-study-paths`
- اضافه شدن کنسول `/admin/content-production-readiness` و API `/api/admin/content-production-readiness` برای فعال‌سازی ادمین واقعی محتوا
- اضافه شدن کنسول `/admin/content-export` و API `/api/admin/content-export` برای خروجی کامل JSON، بکاپ محتوایی و manifest تصویرها
- اضافه شدن `lib/content-export.ts` برای ساخت bundle تحویلی شامل مقاله‌ها، واژه‌نامه، کتابخانه، رسانه، فصل‌های اوستا، مسیرهای مطالعه و وضعیت production
- اضافه شدن کنسول `/admin/asset-operations` و API `/api/admin/asset-operations` برای مدیریت کانال‌های تصویر، صوت، PDF، ویدئو، storage و بکاپ media
- اضافه شدن `lib/asset-operations.ts` برای summary دارایی‌ها، مسیرهای local، storage هدف و checklist production
- اضافه شدن کنسول `/admin/publish-pipeline` و API `/api/admin/publish-pipeline` برای تصمیم publish/schedule/hold/block
- اضافه شدن `lib/publish-pipeline.ts` برای ترکیب تقویم انتشار، وظایف تحریریه، رسانه، منبع و SEO
- اضافه شدن resource ادمین `avestaChapterGuide` برای مدیریت آینده راهنمای تصویری فصل‌ها
- اضافه شدن رفرنس‌های تصویری کارفرما در `public/images/references`
- اضافه شدن سند visual reference board برای تیم طراحی
- به‌روزرسانی README، DELIVERY و file manifest

## Files To Review

- `app/avesta/[section]/page.tsx`
- `app/avesta/[section]/[chapter]/page.tsx`
- `app/avesta/[section]/[chapter]/[verse]/page.tsx`
- `app/api/avesta/[section]/[chapter]/route.ts`
- `app/api/avesta/study-paths/route.ts`
- `app/avesta/paths/page.tsx`
- `app/avesta/paths/[id]/page.tsx`
- `app/admin/avesta-study-paths/page.tsx`
- `app/api/admin/avesta-study-paths/route.ts`
- `app/admin/content-production-readiness/page.tsx`
- `app/api/admin/content-production-readiness/route.ts`
- `app/admin/content-export/page.tsx`
- `app/api/admin/content-export/route.ts`
- `app/admin/asset-operations/page.tsx`
- `app/api/admin/asset-operations/route.ts`
- `app/admin/publish-pipeline/page.tsx`
- `app/api/admin/publish-pipeline/route.ts`
- `components/avesta-chapter-atlas.tsx`
- `components/avesta-study-paths-panel.tsx`
- `components/study-path-progress-panel.tsx`
- `components/admin/avesta-study-path-control-board.tsx`
- `components/admin/content-production-readiness-board.tsx`
- `components/admin/content-export-board.tsx`
- `components/admin/asset-operations-board.tsx`
- `components/admin/publish-pipeline-board.tsx`
- `components/avesta-poster-experience.tsx`
- `lib/avesta-completion.ts`
- `components/admin-content-form.tsx`
- `lib/admin-content.ts`
- `lib/admin-content-models.ts`
- `lib/avesta-visual-guides.ts`
- `lib/avesta-chapter-guides.ts`
- `lib/avesta-chapter-profiles.ts`
- `lib/avesta-study-paths.ts`
- `lib/avesta-study-path-control.ts`
- `lib/content-production-readiness.ts`
- `lib/content-export.ts`
- `lib/asset-operations.ts`
- `lib/publish-pipeline.ts`
- `lib/sample-content.ts`
- `lib/content.ts`
- `app/globals.css`
- `docs/visual-reference-board.md`
- `docs/file-manifest.md`
- `README.md`
- `DELIVERY.md`
- `public/images/references/*`

## Verification

این چک‌ها در Codex اجرا شدند:

```txt
tsc --noEmit: passed
next build: passed
static pages: 280/280
missing image assets: none
mojibake check: none
```

## Vercel

بعد از push به branch اصلی یا branch متصل به Vercel، deploy باید خودکار شروع شود.

اگر deploy دستی لازم بود:

```bash
npm install
npm run db:generate
npm run build
```

متغیرهای production طبق `.env.example` و سندهای تحویل تنظیم شوند.
