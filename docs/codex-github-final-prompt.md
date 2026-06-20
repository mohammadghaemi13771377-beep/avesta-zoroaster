# پیام نهایی برای Codex GitHub اوستا

متن زیر را کامل در چت GitHub/Vercel پروژه AVESTA-ZOROASTER بفرستید:

```txt
سلام. لطفاً آخرین بسته AVESTA-ZOROASTER را روی repository فعلی اعمال کن، commit و push بزن و یک deploy جدید Vercel بده.

فایل اصلی سورس:
- avesta-zoroaster-source.zip

فایل‌های کمکی تحویل:
- avesta-zoroaster-full-code.txt
- README.md
- DELIVERY.md
- docs/release-handoff-2026-06-20.md
- docs/team-delivery-master.md
- docs/github-vercel-update-note.md
- docs/file-manifest.md

قواعد اعمال:
1. محتوای zip را روی repository فعلی merge کن.
2. تغییرهای موجود کاربر را revert نکن؛ فقط با آن‌ها merge کن.
3. `node_modules`، `.next`، `.env` و secretهای واقعی را commit نکن.
4. همه فایل‌های `public/images`، `public/audio`، `public/library`، `public/video` و `docs` را نگه دار.
5. اگر conflict داری، ساختار `app`، `components`، `lib`، `prisma` و `public` را حفظ کن و conflict را با patch محدود حل کن.

خلاصه این release:
- هدر عمومی خلوت و کتابی است: خانه، اوستا، زرتشت، فروشگاه، کتابخانه و منوی کاوش.
- منوی موبایل جمع‌شونده است تا کاربر بخش‌های اوستا را بدون شلوغی باز کند.
- حالت نور محیطی برای تجربه روشن‌ترِ سینمایی اضافه شده است.
- صفحه 404 یک تجربه برنددار با تصویر واقعی و مسیر بازگشت به خانه، اوستا، جستجو و کتابخانه دارد.
- کارت‌های کلیدی صفحه خانه به assetهای واقعی `public/images/ai` وصل شده‌اند.
- صفحه‌های بند اوستا بوکمارک پایدار، share واقعی و پرش نرم به روایت صوتی دارند.
- نمایشگاه‌ها deep-link دارند؛ نمونه: `/exhibitions#light-and-asha`.
- جستجو، کتابخانه، مقاله‌ها و اطلس فصل‌های اوستا فیلتر و ورود مستقیم به مسیر مستقل دارند.
- فرم `/admin/media` برای آپلود تصویر، صوت، PDF و ویدئو دارای محدودسازی نوع فایل، وضعیت ارسال، پیش‌نمایش تصویر و کپی URL است.
- fallbackهای local/sample باقی مانده‌اند تا بدون database production هم سایت build-safe بماند.

فایل‌های کلیدی این release:
- components/header.tsx
- components/mobile-navigation.tsx
- components/ambient-light-toggle.tsx
- components/verse-quick-actions.tsx
- components/exhibitions-gallery.tsx
- components/resource-explorer.tsx
- components/admin/media-upload-form.tsx
- app/not-found.tsx
- app/page.tsx
- app/avesta/[section]/[chapter]/[verse]/page.tsx
- public/images/ai/

قبل از commit اجرا کن:
npm install
npm run db:generate
npx tsc --noEmit
npm run build

نتیجه تاییدشده در بسته Codex:
- TypeScript بدون خطا
- Next.js build موفق با 294/294 صفحه استاتیک

Suggested commit:
feat: refine luminous UX and storefront

بعد از push:
1. Vercel production deployment را اجرا یا بررسی کن.
2. لینک preview و لینک production را گزارش بده.
3. این routeها را smoke test کن:
   /
   /avesta
   /avesta/yasna
   /avesta/vendidad
   /avesta/yashts
   /articles
   /library
   /media
   /exhibitions#light-and-asha
   /shop
   /admin
   /admin/media
   /admin/deployment-readiness
   /sitemap.xml
   /robots.txt

خروجی مورد انتظار:
- commit hash
- branch name
- Vercel preview URL
- Vercel production URL
- build status
- هر env یا integration باقی‌مانده برای production
```

نکته: `avesta-zoroaster-full-code.txt` فقط برای مرور متنی کد است و فایل‌های binary را شامل نمی‌شود؛ برای deploy واقعی از `avesta-zoroaster-source.zip` استفاده شود.
