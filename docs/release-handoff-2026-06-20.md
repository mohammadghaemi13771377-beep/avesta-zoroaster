# Release Handoff - 2026-06-20

## وضعیت تحویل

- Next.js 14 + TypeScript + Tailwind + App Router
- آخرین بررسی: `npx tsc --noEmit` موفق
- آخرین build: `npm run build` موفق با `294/294` صفحه
- asset گمشده و mojibake در کنترل قبلی پروژه مشاهده نشده است
- داده‌های local/sample به‌عنوان fallback باقی مانده‌اند تا بدون database production نیز build انجام شود

## تغییرهای این release

### تکمیل تجربه بصری و محصولی

- تم نور محیطی کاربر در `components/ambient-light-toggle.tsx` برای روشن‌تر شدن فضای سینمایی سایت اضافه شد.
- هدر عمومی اکنون پنج مسیر اصلی «خانه، اوستا، زرتشت، فروشگاه و کتابخانه» دارد و مسیرهای ثانویه در «کاوش» باقی مانده‌اند.
- منوی موبایل به فهرست جمع‌شونده تبدیل شد تا بخش‌های اوستا و کاوش بیشتر، صفحه را شلوغ نکنند.
- صفحه 404 در `app/not-found.tsx` به تجربه بازگشت به جهان اوستا، با تصویر واقعی و مسیرهای اصلی تبدیل شد.
- کارت‌های زرتشت، گات‌ها، مقاله‌ها و کتابخانه در صفحه خانه به coverهای واقعی `public/images/ai` متصل شدند.
- صفحه هر بند اوستا دارای بوکمارک پایدار، اشتراک‌گذاری واقعی و پرش نرم به روایت صوتی است.
- نمایشگاه‌ها با hash قابل اشتراک مانند `/exhibitions#light-and-asha` باز می‌شوند و نام مسیرهای مرتبط کاربرپسند شده است.
- فیلترهای کتابخانه و رسانه دیگر متن داخلی توسعه‌دهنده نمایش نمی‌دهند و به مسیرهای عمومی مناسب می‌روند.
- فرم آپلود ادمین برای فایل‌های تصویر، صوت، PDF و ویدئو دارای accept مناسب، وضعیت آپلود، پیش‌نمایش تصویر و کپی URL نهایی شد.

### تجربه کاربر

- ناوبری دسکتاپ خلوت: خانه، اوستا، زرتشت، گات‌ها، کتابخانه و کاوش
- ناوبری موبایل در `components/mobile-navigation.tsx`
- homepage در `app/page.tsx` به gateway انتخاب‌محور تبدیل شد
- همه CTAهای اصلی به route مستقل می‌روند

### مطالعه و اوستا

- فیلتر نیت مطالعه در `components/avesta-section-explorer.tsx`
- جستجو و فیلتر key theme فصل‌ها در `components/avesta-chapter-atlas.tsx`
- CTAهای کاربردی صفحه بخش در `app/avesta/[section]/page.tsx`
- reader controls شامل حالت خواندن، progress، bookmark، share و note در `components/reading-controls.tsx`

### کشف محتوا

- فیلتر زبان، نوع و موضوع در `components/resource-explorer.tsx`
- فیلتر دسته، tag و sort در `components/articles-explorer.tsx`
- فیلتر نوع، category، section و product در `components/search-panel.tsx`
- deep-link نمونه: `/search?type=verse&section=yasna`

### ادمین و پژوهش

- `/admin/global-growth-audit`
- `/admin/localization`
- `/admin/source-intake`
- مدل‌ها: `lib/global-growth-audit.ts`، `lib/localization-hub.ts` و `lib/source-intake-hub.ts`

## فایل‌های تحویل

- `avesta-zoroaster-source.zip`: سورس کامل با public assetها و docs
- `avesta-zoroaster-full-code.txt`: مرور متنی تمام فایل‌های متنی
- `README.md`: راه‌اندازی پایه
- `DELIVERY.md`: خلاصه تحویل
- `docs/team-delivery-master.md`: مسئولیت همه تیم‌ها
- `docs/technical-handoff.md`: تحویل فنی
- `docs/product-design-handoff.md`: تحویل محصول و دیزاین
- `docs/content-intake-guide.md`: ورود محتوا
- `docs/admin-content-asset-management.md`: مدیریت محتوا و asset
- `docs/github-vercel-deploy.md`: راهنمای deploy

## اجرای فنی

```bash
npm install
cp .env.example .env
npm run db:generate
npx tsc --noEmit
npm run build
```

برای production، `DATABASE_URL`، storage، auth، Meilisearch، email provider و payment provider باید از fallback local به سرویس واقعی متصل شوند.

## Vercel

- Framework: Next.js
- Install: `npm install`
- Build: `npm run build`
- متغیرهای واقعی را فقط در Project Settings تنظیم کنید
- `NEXT_PUBLIC_SITE_URL` را به دامنه نهایی `https://avesta-zoroaster.com` تغییر دهید
- قبل از launch، `/admin/deployment-readiness` را بازبینی کنید

## smoke test بعد از deploy

```txt
/
/avesta
/avesta/yasna
/avesta/gathas
/avesta/vendidad
/gathas
/zoroaster
/articles
/library
/search
/search?type=verse&section=yasna
/dictionary
/media
/exhibitions
/shop
/admin
/admin/deployment-readiness
/admin/global-growth-audit
/admin/localization
/admin/source-intake
/sitemap.xml
/robots.txt
```

## Commit پیشنهادی

`feat: refine luminous UX and storefront`
