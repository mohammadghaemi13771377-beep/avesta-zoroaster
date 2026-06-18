# AVESTA-ZOROASTER

دامنه: `avesta-zoroaster.com`

این پروژه فاز پایه «جهان دیجیتال اوستا و زرتشت» است؛ یک تجربه RTL فارسی با Next.js، TypeScript و Tailwind CSS که قرار است حس موزه سینمایی، دانشنامه، کتابخانه و فضای ایران باستان را هم‌زمان منتقل کند.

## اجرای پروژه

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

بعد از اجرا:

```txt
http://localhost:3000
```

پیش‌نمایش سبک بدون نصب کامل dependencyها:

```bash
node preview-server.mjs
```

پریویو روی `http://127.0.0.1:4173` اجرا می‌شود و فایل `local-preview.html` را نمایش می‌دهد.

## ساخته‌شده تا این مرحله

- صفحه خانه سینمایی و خلوت
- آیین ورود `/onboarding` برای انتخاب مسیر شروع بر اساس نیت، زمان و حال‌وهوای کاربر
- نقشه جهان دیجیتال `/world`
- تور موزه‌ای `/tour` برای تجربه هدایت‌شده، سینمایی و مرحله‌ای جهان اوستا
- نمایشگاه‌های موضوعی `/exhibitions` برای مسیرهای curated شامل آثار، یادداشت کیوریتور و پیشرفت محلی
- فاز طراحی و محتوا با ۲۱ تصویر واقعی در `public/images/ai` برای hero، cover، رسانه، نمایشگاه و محصولات فروشگاه
- فاز UI داخلی اوستا با الگوی پوستر/موزه نورانی برای یسنا، گات‌ها، ویسپرد، وندیداد، یشت‌ها، خرده اوستا و هات‌ها
- صفحه‌های اختصاصی زیرمجموعه‌ها مثل یسنا ۱، اهونود گات، درآمد ویسپرد، آبان یشت، مهر یشت، فرگرد اول، فرگرد دوم، نیایش‌های روزانه، آتش نیایش و نقشه هات‌ها
- پروفایل محتوایی فصل‌ها با زمینه تاریخی، زمینه آیینی، کلیدواژه‌ها، alt تصویر، مسیرهای مرتبط و بندهای شاخص برای تبدیل اوستا به اطلس آموزشی
- اطلس تصویری chapterها داخل صفحه‌های مادر اوستا برای ورود سریع به تالار اختصاصی و بند اول
- شاخص‌های تکمیل در پورتال اوستا برای نمایش وضعیت آماده‌سازی محتوا، راهنمای تصویری، پروفایل آموزشی و alt تصویر
- مسیرهای شروع مطالعه در پورتال اوستا برای تازه‌واردها، گات‌ها، نیایش روزانه، یشت‌ها و وندیداد با API مستقل
- صفحه‌های اختصاصی مسیرهای مطالعه مثل `/avesta/paths/first-light` برای نمایش نقشه مرحله‌ای هر مسیر
- پیشرفت local مسیرهای مطالعه با تیک‌زدن قدم‌ها، درصد تکمیل و event tracking
- کنسول ادمین مسیرهای شروع اوستا برای کنترل آمادگی، مالک، کمبودها و چک‌لیست انتشار هر مسیر
- کنسول آمادگی ورود محتوای واقعی برای اتصال ادمین به دیتابیس، storage، امنیت، search و بکاپ
- کنسول خروجی و بکاپ محتوا برای دریافت snapshot کامل JSON از مقاله‌ها، واژه‌نامه، کتابخانه، رسانه، فصل‌های اوستا، مسیرهای مطالعه، manifest تصویرها و آمادگی production
- کنسول Asset Operations برای مدیریت تصویر، صوت، PDF، ویدئو، مسیرهای local، storage هدف، CDN و بکاپ media
- اتاق تصمیم انتشار برای ترکیب تقویم محتوا، وظایف تحریریه، رسانه، منابع و SEO و تصمیم‌گیری `publish/schedule/hold/block`
- اتصال صفحه‌های بند/آیه به راهنمای تصویری chapter با hero اختصاصی، پنل زمینه تصویری و تمرین‌های همان تالار
- Reference board تصویری در `public/images/references` و سند `docs/visual-reference-board.md` برای تیم طراحی
- پورتال اصلی `/avesta`
- صفحه‌های بخش‌های اوستا و صفحه جزئی بند/آیه
- هاب‌های زرتشت، گات‌ها، دین زرتشتی، یکتاپرستی، مسیرهای موضوعی یکتاپرستی، کوروش، تایم‌لاین، کتابخانه، رسانه، مقاله‌ها و جستجو
- استاد تمرین اخلاقی `/practice` برای تبدیل پندار، گفتار و کردار نیک به برنامه هفت‌روزه قابل پیگیری
- نورسنج اشا `/asha-balance` برای سنجش تعادل پندار، گفتار، کردار، استمرار و مأموریت‌ها
- واژه‌نامه و صفحه جزئی هر واژه
- مقاله‌ها و صفحه جزئی مقاله با JSON-LD
- پروفایل مطالعه با ادامه مطالعه، بوکمارک و تنظیمات خواندن
- نورخانه شخصی برای ادامه مطالعه، اوستای امروز، استمرار، XP و پیشنهاد مسیر روزانه
- راهنمای روزانه روشنایی `/daily-light` برای مسیر ۱۵ دقیقه‌ای مطالعه، تأمل، تمرین، مأموریت و نورسنج اشا
- کپسول خرد `/wisdom-capsule` برای تجربه سه دقیقه‌ای پیام، واژه، تمرین و اشتراک
- اتصال آیین ورود به نورخانه با کارت «مسیر شروع من» و ادامه مسیر ذخیره‌شده
- قطب‌نمای خرد برای پیشنهاد قدم بعدی بر اساس رفتار، مأموریت، استمرار و حافظه مطالعه
- Journey Builder برای ساخت مسیر شخصی مطالعه، نیایش، رسانه و کردار
- پشتیبانی Journey Builder از query params برای باز کردن مسیر ذخیره‌شده از onboarding و نورخانه
- ذخیره مسیر ساخته‌شده در Journey Builder و نمایش «مسیر فعال من» در نورخانه
- پیشرفت مسیر فعال در نورخانه با درصد تکمیل، قدم بعدی و دکمه «انجام شد»
- Share Studio برای ساخت کارت نقل‌قول طلایی و اشتراک‌گذاری
- Ritual Room برای مکث، آتش آرام، نیت روزانه و اتصال به دفتر روزانه
- Achievement Hall برای نشان‌ها، سطح کاربر و وفادارسازی
- Daily Streak برای زنجیره روشنایی، تقویم عادت روزانه و برگشت کاربر
- ورود و ثبت‌نام demo با cookie session
- پنل ادمین برای Go-Live، کنترل کیفیت صفحات، آنالیتیکس محصول، تحویل تیم‌ها، محتوا، رسانه، کنترل تصویرهای AI، رجیستری منابع، پوشش ارجاع، بازبینی منابع، import، SEO، فروشگاه، خبرنامه، Inventory، Production، Brief و Review
- کنسول ادمین نمایشگاه‌ها برای کنترل آمادگی روایت، رسانه، ریسک و مسیرهای مرتبط هر نمایشگاه
- قرارداد مدل‌های محتوایی ادمین `/api/admin/content-models` برای مقاله، بند اوستا، رسانه، نمایشگاه و محصول
- کنسول آمادگی Deploy برای تحویل GitHub، Vercel، env، دیتابیس، DNS، storage، search و smoke test
- ماتریس تکمیل اوستا برای رصد متن اصلی، ترجمه، بازنویسی، تحلیل، تصویر، صوت، منبع و SEO هر بخش
- Batch تولید اوستا برای تبدیل کمبودهای ماتریس تکمیل به تسک‌های اجرایی تیم محتوا، رسانه، پژوهش و SEO
- دروازه انتشار اوستا برای ترکیب تکمیل محتوا، citation coverage و کیفیت صفحه در تصمیم Publish/Hold/Block
- موج‌های انتشار اوستا برای برنامه داخلی، بتا و عمومی بر اساس Publication Gate و شرط‌های ورود/خروج
- Feature Flags اوستا برای کنترل نمایش hidden/internal/beta/public هر بخش بر اساس موج انتشار و Gate
- گارد دسترسی اوستا در middleware برای کنترل anonymous/reader/editor/admin روی مسیرهای beta/internal/hidden
- Route Visibility Audit برای هماهنگی Feature Flags با sitemap، navigation و index عمومی
- Source Pack اوستا برای تحویل منابع لازم، citationها، دارایی‌ها، معیار پذیرش و خروجی CSV/Markdown به تیم پژوهش
- رجیستری منابع پژوهشی با خروجی JSON، CSV و BibTeX برای اتصال citationهای نهایی
- نقشه پوشش ارجاع اوستا برای سنجش citationهای تاییدشده، معلق، منبع کم‌شده و ریسک انتشار
- قالب Import اوستا با خروجی JSON و CSV برای ورود دسته‌ای سیستم محتوای طلایی
- ماتریس Event Tracking برای payload، مقصد ابزارها، QA rule، privacy note و اتصال PostHog/GA4/first-party events
- First-party Event Collector با `/api/events`، helper سمت کلاینت و preview ادمین
- Instrumentation اولیه برای CTAهای خانه، کارت‌های پورتال و بخش‌های اوستا
- فرمان‌خانه سریع جهانی با میانبر `Ctrl+K` برای دسترسی فوری به مسیرها، ابزارها و بخش‌های اوستا
- مرکز حریم خصوصی و consent-aware tracking برای آنالیتیکس، شخصی‌سازی، نورنامه و فروشگاه
- بنر جهانی رضایت کاربر برای فعال‌سازی همه یا حالت ضروری
- Prisma schema برای محتوای اوستا، مقاله، واژه‌نامه، کتابخانه، رسانه، کاربر، بوکمارک، پیشرفت مطالعه و import job
- APIهای پایه برای محتوا، جستجو، ادمین، رسانه، پروفایل، auth و i18n
- مسیرهای چندزبانه `/fa` و `/en`
- `sitemap.xml` و `robots.txt` داینامیک

## مسیرهای اصلی

- `/`
- `/fa`
- `/en`
- `/onboarding`
- `/avesta`
- `/avesta/paths`
- `/avesta/paths/first-light`
- `/avesta/yasna`
- `/avesta/gathas`
- `/avesta/visperad`
- `/avesta/visperad/visperad-starter`
- `/avesta/vendidad`
- `/avesta/vendidad/fargard-1`
- `/avesta/vendidad/fargard-2`
- `/avesta/yashts`
- `/avesta/yashts/aban-yasht`
- `/avesta/yashts/mehr-yasht`
- `/avesta/khordeh-avesta`
- `/avesta/khordeh-avesta/daily-prayers`
- `/avesta/khordeh-avesta/atash-niyayesh`
- `/avesta/hats`
- `/avesta/hats/ha-map`
- `/world`
- `/tour`
- `/exhibitions`
- `/dashboard`
- `/daily-light`
- `/wisdom-capsule`
- `/compass`
- `/privacy-center`
- `/zoroaster`
- `/gathas`
- `/zoroastrianism`
- `/monotheism`
- `/monotheism/paths`
- `/cyrus`
- `/dictionary`
- `/journey-builder`
- `/practice`
- `/asha-balance`
- `/share-studio`
- `/ritual-room`
- `/achievements`
- `/streak`
- `/library`
- `/media`
- `/articles`
- `/search`
- `/timeline`
- `/login`
- `/register`
- `/profile`
- `/admin`
- `/admin/go-live`
- `/admin/deployment-readiness`
- `/admin/content-production-readiness`
- `/admin/content-export`
- `/admin/asset-operations`
- `/admin/page-quality`
- `/admin/route-visibility`
- `/admin/product-analytics`
- `/admin/event-tracking`
- `/admin/event-collector`
- `/admin/team-handoff`
- `/admin/exhibitions`
- `/admin/avesta-completion`
- `/admin/avesta-study-paths`
- `/admin/avesta-production`
- `/admin/avesta-publication-gates`
- `/admin/avesta-release-waves`
- `/admin/avesta-feature-flags`
- `/admin/avesta-access-control`
- `/admin/avesta-source-packs`
- `/admin/avesta-import-template`
- `/admin/inventory`
- `/admin/production`
- `/admin/production/briefs`
- `/admin/production/review`
- `/admin/publish-pipeline`
- `/admin/visual-assets`
- `/admin/source-registry`
- `/admin/citation-coverage`
- `/admin/source-review`

## APIهای نمونه

- `/api/search?q=اشا`
- `/api/onboarding?goal=avesta&time=daily-15&tone=cinematic`
- `/api/search/indexes`
- `/api/avesta`
- `/api/avesta/study-paths`
- `/api/avesta/yasna`
- `/api/avesta/yashts/aban-yasht`
- `/api/avesta/yasna/ha-1/verse-1`
- `/api/tour`
- `/api/exhibitions`
- `/api/dashboard`
- `/api/daily-light`
- `/api/wisdom-capsule`
- `/api/compass`
- `/api/journey-builder`
- `/api/share-studio`
- `/api/ritual-room`
- `/api/achievements`
- `/api/streak`
- `/api/events`
- `/api/consent`
- `/api/media`
- `/api/media/prompts`
- `/api/monotheism/paths`
- `/api/practice`
- `/api/asha-balance`
- `/api/admin/stats`
- `/api/admin/go-live`
- `/api/admin/deployment-readiness`
- `/api/admin/content-production-readiness`
- `/api/admin/content-export`
- `/api/admin/asset-operations`
- `/api/admin/page-quality`
- `/api/admin/route-visibility`
- `/api/admin/product-analytics`
- `/api/admin/event-tracking`
- `/api/admin/avesta-completion`
- `/api/admin/avesta-study-paths`
- `/api/admin/avesta-production`
- `/api/admin/avesta-publication-gates`
- `/api/admin/avesta-release-waves`
- `/api/admin/avesta-feature-flags`
- `/api/admin/avesta-access-control`
- `/api/admin/avesta-source-packs`
- `/api/admin/avesta-import-template`
- `/api/admin/team-handoff`
- `/api/admin/exhibitions`
- `/api/admin/inventory`
- `/api/admin/production`
- `/api/admin/production/briefs`
- `/api/admin/production/review`
- `/api/admin/publish-pipeline`
- `/api/admin/visual-assets`
- `/api/admin/source-registry`
- `/api/admin/citation-coverage`
- `/api/admin/source-review`

## دیتابیس

بعد از نصب dependencyها و تنظیم `DATABASE_URL`:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## مستندات مهم

- `DELIVERY.md`
- `docs/technical-handoff.md`
- `docs/product-design-handoff.md`
- `docs/visual-reference-board.md`
- `docs/file-manifest.md`
- `docs/implementation-roadmap.md`
- `docs/content-intake-guide.md`
- `docs/bulk-import-guide.md`
- `docs/media-asset-plan.md`
- `docs/ai-prompt-library.md`
- `docs/search-meilisearch-plan.md`
- `docs/local-preview-and-deploy.md`
- `docs/final-github-vercel-team-handoff.md`
- `docs/team-delivery-master.md`

## مسیر بعدی پیشنهادی

1. نصب dependencyها و اجرای build کامل
2. اتصال PostgreSQL واقعی
3. اجرای migrate و seed
4. اتصال Meilisearch
5. تبدیل فرم‌های ادمین به CRUD کامل production
6. اتصال upload به storage دائمی
7. ورود محتوای واقعی اوستا، گات‌ها، مقاله‌ها و رسانه‌ها
