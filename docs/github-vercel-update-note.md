# GitHub/Vercel Update Note

این نسخه برای commit و deploy جدید آماده است.

## Suggested Commit

```txt
feat: add illuminated Avesta chapter experiences
```

## Summary

- اضافه شدن الگوی پوستر/موزه نورانی برای صفحه‌های داخلی اوستا
- اتصال کاور واقعی به hero صفحه‌های `/avesta/[section]`
- اضافه شدن داده‌های اختصاصی برای یسنا، گات‌ها، ویسپرد، وندیداد، یشت‌ها، خرده اوستا و هات‌ها
- اضافه شدن route اختصاصی `/avesta/[section]/[chapter]` برای یسنا ۱، اهونود گات، درآمد ویسپرد، آبان یشت، مهر یشت، فرگردهای وندیداد، نیایش‌های خرده اوستا و نقشه هات‌ها
- اضافه شدن API جدید `/api/avesta/[section]/[chapter]`
- اضافه شدن اطلس تصویری chapterها در صفحه‌های مادر اوستا برای نمایش کاور، نقل‌قول، تعداد بند و CTAها
- اتصال صفحه‌های `/avesta/[section]/[chapter]/[verse]` به chapter guide برای hero تصویری، زمینه روایی و تمرین‌های همان تالار
- اضافه شدن resource ادمین `avestaChapterGuide` برای مدیریت آینده راهنمای تصویری فصل‌ها
- اضافه شدن رفرنس‌های تصویری کارفرما در `public/images/references`
- اضافه شدن سند visual reference board برای تیم طراحی
- به‌روزرسانی README، DELIVERY و file manifest

## Files To Review

- `app/avesta/[section]/page.tsx`
- `app/avesta/[section]/[chapter]/page.tsx`
- `app/avesta/[section]/[chapter]/[verse]/page.tsx`
- `app/api/avesta/[section]/[chapter]/route.ts`
- `components/avesta-chapter-atlas.tsx`
- `components/avesta-poster-experience.tsx`
- `components/admin-content-form.tsx`
- `lib/admin-content.ts`
- `lib/admin-content-models.ts`
- `lib/avesta-visual-guides.ts`
- `lib/avesta-chapter-guides.ts`
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
static pages: 263/263
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
