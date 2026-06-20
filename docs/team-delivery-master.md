# AVESTA-ZOROASTER Team Delivery Master

این سند برای تحویل همین نسخه فعلی پروژه به تیم‌های فنی، محصول، دیزاین، محتوا، رسانه، رشد، فروشگاه و مدیریت نوشته شده است.

## 1. خلاصه مدیریتی

AVESTA-ZOROASTER قرار است یک وبلاگ یا سایت مذهبی سنتی نباشد؛ محصول باید مثل یک جهان دیجیتال سینمایی برای اوستا، زرتشت، یکتاپرستی و خرد ایران باستان عمل کند.

وضعیت فعلی:

- اسکلت محصول، تجربه کاربر، مسیرها، پنل ادمین، APIهای اصلی و مدل دیتابیس آماده شده‌اند.
- داده‌های فعلی sample/local هستند و برای production باید به PostgreSQL، CMS/storage، Meilisearch، email provider و payment واقعی وصل شوند.
- بخش‌های عملیاتی جدید برای مدیریت تکمیل پروژه اضافه شده‌اند: World Map، Inventory، Production Queue، Brief Studio و Review Gate.
- در محیط Codex، `npx tsc --noEmit` و build کامل Next.js با موفقیت اجرا شد و `294/294` صفحه تولید شد. تیم فنی باید همین checks را پس از اتصال سرویس‌های production دوباره اجرا کند.

## 2. فایل‌های تحویل

- `avesta-zoroaster-source.zip`: کل سورس پروژه و مستندات.
- `avesta-zoroaster-full-code.txt`: فول‌کد متنی برای مرور سریع یا ارسال.
- `README.md`: راه‌اندازی پایه.
- `DELIVERY.md`: خلاصه تحویل.
- `docs/team-delivery-master.md`: همین سند مادر.
- `docs/technical-handoff.md`: توضیح فنی.
- `docs/product-design-handoff.md`: توضیح محصول و طراحی.
- `docs/content-intake-guide.md`: ورود محتوا.
- `docs/media-asset-plan.md`: رسانه و تصویر AI.
- `docs/search-meilisearch-plan.md`: جستجو.
- `docs/local-preview-and-deploy.md`: پیش‌نمایش و deploy.
- `docs/final-github-vercel-team-handoff.md`: چک‌لیست نهایی تحویل به GitHub، Vercel و همه تیم‌ها.

## 3. اجرای پروژه برای تیم فنی

پیش‌نیاز:

- Node.js 20+
- npm
- PostgreSQL برای production

دستورها:

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

بعد از تنظیم `DATABASE_URL`:

```bash
npm run db:migrate
npm run db:seed
npm run build
npm run start
```

پیش‌نمایش استاتیک سبک:

```bash
node preview-server.mjs
```

آدرس:

```txt
http://127.0.0.1:4173
```

## 4. متغیرهای محیطی

از `.env.example` شروع شود. برای production حداقل این‌ها باید نهایی شوند:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_DEMO_EMAIL`
- `ADMIN_DEMO_PASSWORD`
- متغیرهای storage برای upload واقعی
- متغیرهای email provider برای newsletter
- متغیرهای payment provider برای فروشگاه
- متغیرهای Meilisearch برای search production

## 5. مسیرهای عمومی مهم

- `/`: خانه سینمایی
- `/world`: نقشه جهان دیجیتال
- `/tour`: تور موزه‌ای هدایت‌شده برای تجربه سینمایی جهان اوستا
- `/exhibitions`: نمایشگاه‌های موضوعی curated با آثار، یادداشت کیوریتور و مسیرهای مرتبط
- `/dashboard`: نورخانه شخصی و مرکز ورود روزانه کاربر
- `/daily-light`: راهنمای روزانه روشنایی برای مسیر کوتاه مطالعه، تأمل، تمرین، مأموریت و نورسنج اشا
- `/wisdom-capsule`: تجربه سه دقیقه‌ای پیام اوستا، واژه روز، تمرین اشا و اشتراک
- `/compass`: قطب‌نمای خرد و پیشنهاد قدم بعدی
- `/privacy-center`: مرکز رضایت کاربر و تنظیمات حریم خصوصی
- `/avesta`: پورتال اوستا
- `/avesta/yasna`
- `/avesta/gathas`
- `/avesta/visperad`
- `/avesta/vendidad`
- `/avesta/yashts`
- `/avesta/khordeh-avesta`
- `/avesta/hats`
- `/zoroaster`
- `/gathas`
- `/zoroastrianism`
- `/monotheism`
- `/monotheism/paths`
- `/dictionary`
- `/library`
- `/library/archive`
- `/media`
- `/articles`
- `/timeline`
- `/search`
- `/reading-room`
- `/concept-map`
- `/journey-builder`
- `/quests`
- `/reflection`
- `/practice`
- `/asha-balance`
- `/share-studio`
- `/ritual-room`
- `/memory`
- `/calendar`
- `/campaigns`
- `/achievements`
- `/streak`
- `/newsletter`
- `/newsletter/archive`
- `/newsletter/preview`
- `/newsletter/html-export`
- `/newsletter/preferences`
- `/shop`
- `/shop/checkout`
- `/profile`

## 6. مسیرهای ادمین مهم

- `/admin`: داشبورد اصلی
- `/admin/go-live`: اتاق کنترل بالا آوردن سایت
- `/admin/deployment-readiness`: آمادگی تحویل GitHub، Vercel، envها، دیتابیس، DNS، storage و smoke test
- `/admin/page-quality`: ماتریس QA صفحات، SEO، محتوا، رسانه، منبع و موبایل
- `/admin/route-visibility`: audit نمایش route، sitemap، navigation و index عمومی
- `/admin/product-analytics`: قیف محصول، conversion و event tracking پیشنهادی
- `/admin/event-tracking`: ماتریس payload، مقصد ابزارها، QA و privacy برای eventهای production
- `/admin/event-collector`: پیش‌نمایش کلکتور first-party و رویدادهای local
- `/admin/team-handoff`: کنسول تحویل به تیم‌ها
- `/admin/exhibitions`: کنسول آمادگی نمایشگاه‌ها، روایت کیوریتوری، رسانه، ریسک و مسیرهای مرتبط
- `/admin/inventory`: نقشه تکمیل محتوا و دارایی‌ها
- `/admin/avesta-completion`: ماتریس تکمیل متن، ترجمه، تحلیل، تصویر، صوت، منبع و SEO اوستا
- `/admin/avesta-production`: batchهای تولید اوستا بر اساس کمبودهای ماتریس تکمیل
- `/admin/avesta-publication-gates`: دروازه انتشار اوستا برای تصمیم Publish/Hold/Block
- `/admin/avesta-release-waves`: موج‌های انتشار اوستا برای لانچ داخلی، بتا و عمومی
- `/admin/avesta-feature-flags`: کنترل نمایش hidden/internal/beta/public بخش‌های اوستا
- `/admin/avesta-access-control`: ماتریس دسترسی anonymous/reader/editor/admin به مسیرهای اوستا
- `/admin/avesta-source-packs`: Source Pack منابع، citation، دارایی و معیار انتشار بخش‌های اوستا
- `/admin/avesta-import-template`: قالب JSON/CSV ورود دسته‌ای محتوای طلایی اوستا
- `/admin/production`: صف تولید محتوا و دارایی‌ها
- `/admin/production/briefs`: Brief Studio تولید
- `/admin/production/review`: Review Gate تولید
- `/admin/visual-assets`: اتاق کنترل تصویرهای AI، prompt، نسبت تصویر و مسیر فایل
- `/admin/source-registry`: رجیستری رسمی منابع پژوهشی، ترجمه، آرشیو و خروجی citation
- `/admin/citation-coverage`: نقشه پوشش citation، ریسک منبع و اقدام بعدی برای بخش‌های اوستا
- `/admin/source-review`: مرکز بازبینی منابع، ریسک citation و مالک پژوهشی
- `/admin/avesta`: مدیریت اوستا
- `/admin/articles`: مدیریت مقاله‌ها
- `/admin/glossary`: مدیریت واژه‌نامه
- `/admin/library`: مدیریت کتابخانه
- `/admin/media`: مدیریت رسانه
- `/admin/import`: ورود دسته‌ای
- `/admin/editorial`: فرماندهی تحریریه
- `/admin/calendar`: تقویم انتشار
- `/admin/newsletter`: پنل خبرنامه
- `/admin/newsletter/analytics`: آنالیتیکس خبرنامه
- `/admin/newsletter/experiments`: A/B Lab
- `/admin/newsletter/send-times`: بهینه‌ساز زمان ارسال
- `/admin/newsletter/schedule`: صف ارسال خبرنامه
- `/admin/newsletter/delivery`: مانیتور تحویل خبرنامه
- `/admin/shop`: مدیریت فروشگاه
- `/admin/seo`: SEO

## 7. APIهای مهم

عمومی:

- `/api/search`
- `/api/search/indexes`
- `/api/search/sync`
- `/api/avesta`
- `/api/avesta/[section]`
- `/api/avesta/[section]/[chapter]/[verse]`
- `/api/articles`
- `/api/library`
- `/api/media`
- `/api/media/prompts`
- `/api/tour`
- `/api/exhibitions`
- `/api/monotheism/paths`
- `/api/world-map`
- `/api/dashboard`
- `/api/daily-light`
- `/api/wisdom-capsule`
- `/api/compass`
- `/api/wisdom-guide`
- `/api/journey-builder`
- `/api/reading-room`
- `/api/concept-map`
- `/api/quests`
- `/api/reflection`
- `/api/practice`
- `/api/asha-balance`
- `/api/share-studio`
- `/api/ritual-room`
- `/api/memory`
- `/api/calendar`
- `/api/campaigns`
- `/api/achievements`
- `/api/streak`
- `/api/events`
- `/api/consent`
- `/api/newsletter`
- `/api/newsletter/archive`
- `/api/newsletter/preview`
- `/api/newsletter/preferences`
- `/api/shop`
- `/api/shop/orders`
- `/api/shop/payments`
- `/api/profile`
- `/api/auth/session`

ادمین:

- `/api/admin/stats`
- `/api/admin/health`
- `/api/admin/go-live`
- `/api/admin/deployment-readiness`
- `/api/admin/page-quality`
- `/api/admin/route-visibility`
- `/api/admin/product-analytics`
- `/api/admin/event-tracking`
- `/api/admin/team-handoff`
- `/api/admin/exhibitions`
- `/api/admin/content`
- `/api/admin/upload`
- `/api/admin/import`
- `/api/admin/inventory`
- `/api/admin/avesta-completion`
- `/api/admin/avesta-production`
- `/api/admin/avesta-publication-gates`
- `/api/admin/avesta-release-waves`
- `/api/admin/avesta-feature-flags`
- `/api/admin/avesta-access-control`
- `/api/admin/avesta-source-packs`
- `/api/admin/avesta-import-template`
- `/api/admin/production`
- `/api/admin/production/briefs`
- `/api/admin/production/review`
- `/api/admin/visual-assets`
- `/api/admin/source-registry`
- `/api/admin/citation-coverage`
- `/api/admin/source-review`
- `/api/admin/editorial`
- `/api/admin/calendar`
- `/api/admin/launch-readiness`
- `/api/admin/newsletter`
- `/api/admin/newsletter/analytics`
- `/api/admin/newsletter/experiments`
- `/api/admin/newsletter/send-times`
- `/api/admin/newsletter/schedule`
- `/api/admin/newsletter/delivery`
- `/api/admin/shop/products`
- `/api/admin/shop/orders`
- `/api/admin/shop/inventory`
- `/api/admin/shop/reports`
- `/api/admin/roles`
- `/api/admin/audit`

## 8. مدل‌های دیتابیس Prisma

مدل‌های اصلی در `prisma/schema.prisma`:

- `AvestaSection`
- `AvestaChapter`
- `AvestaVerse`
- `Article`
- `GlossaryTerm`
- `LibraryItem`
- `MediaAsset`
- `ImportJob`
- `AuditLog`
- `Product`
- `Order`
- `OrderItem`
- `Payment`
- `Shipment`
- `Coupon`
- translation models برای FA/EN
- `User`
- `Bookmark`
- `ReadingProgress`
- `ReadingPreference`

کار production:

- migrate روی PostgreSQL واقعی
- seed اولیه
- بررسی relationها برای CMS واقعی
- اضافه کردن session/auth امن
- اتصال upload به storage واقعی

## 9. تحویل به تیم فنی

مالکیت تیم فنی:

- نصب dependencyها و اجرای `npm run build`
- بررسی `/admin/deployment-readiness` برای وضعیت GitHub، Vercel، env، دیتابیس، DNS و smoke test
- اتصال PostgreSQL
- اجرای Prisma migrate/seed
- امن‌سازی auth و cookie/session
- اتصال upload به S3/R2/Cloudinary یا storage داخلی
- اتصال Meilisearch
- اتصال email provider
- اتصال payment provider
- پیاده‌سازی/تکمیل helper مشترک `trackEvent()` و اتصال endpoint first-party `/api/events` به دیتابیس
- ادامه instrumentation برای جستجو، مطالعه بند، خبرنامه، فروشگاه و checkout بر اساس `/admin/event-tracking`
- اتصال consent history به دیتابیس و نگه‌داشتن analytics routing به شکل consent-aware
- بررسی UX بنر جهانی رضایت، copy حقوقی، و سازگاری با سیاست‌های منطقه‌ای قبل از production
- اضافه کردن تست smoke برای مسیرهای عمومی و ادمین
- بررسی performance و responsive

فایل‌های کلیدی:

- `app/`
- `components/`
- `lib/`
- `prisma/schema.prisma`
- `middleware.ts`
- `next.config.mjs`
- `tailwind.config.ts`
- `.env.example`

## 10. تحویل به تیم محصول

مالکیت تیم محصول:

- بررسی journey خانه تا `/world` و `/avesta`
- بررسی `/tour` به عنوان تجربه first-run موزه‌ای برای کاربران تازه‌وارد
- بررسی `/exhibitions` به عنوان لایه curated برای تبدیل محتوا و رسانه به مسیرهای قابل کشف
- بررسی `/admin/exhibitions` برای تصمیم آمادگی انتشار هر نمایشگاه و مالک‌های محتوا/رسانه
- بررسی `/daily-light` به عنوان مسیر ۱۵ دقیقه‌ای روزانه برای برگشت کاربر
- بررسی `/wisdom-capsule` به عنوان micro-learning سریع برای روزهای کم‌زمان
- بررسی مسیر برگشت کاربر از `/dashboard` به `/streak`، `/quests`، `/reflection` و `/memory`
- بررسی حلقه مسیر فعال از `/journey-builder` به `/dashboard`، تکمیل قدم‌ها و برگشت روزانه کاربر
- بررسی next-best-action از `/compass` به مطالعه، تأمل، مأموریت، پژوهش و اشتراک
- بررسی مسیرهای موضوعی `/monotheism/paths` برای تبدیل مفاهیم یکتاپرستی به مطالعه، واژه، مقاله و تمرین روزانه
- بررسی `/practice` به عنوان حلقه تبدیل مطالعه و یکتاپرستی به رفتار روزانه و retention
- بررسی `/asha-balance` به عنوان داشبورد سنجش تعادل پندار، گفتار، کردار و پیشنهاد تمرین بعدی
- تعریف MVP لانچ
- اولویت‌دهی قلمروها در `/admin/inventory`
- مدیریت صف تولید در `/admin/production`
- کنترل قفل‌های لانچ در `/admin#launch-readiness`
- نهایی کردن فازهای فروشگاه، خبرنامه، پروفایل و جستجو
- طراحی retention loop بین `/streak`، `/reflection`، `/quests` و `/achievements`
- نهایی کردن eventهای must-have در `/admin/event-tracking`

صفحات مهم:

- `/world`
- `/admin/inventory`
- `/admin/production`
- `/admin/production/briefs`
- `/admin/production/review`
- `/admin/visual-assets`
- `/admin/source-review`
- `/admin#launch-readiness`

## 11. تحویل به تیم دیزاین

هویت طراحی:

- Dark Luxury Persian Mythology
- رنگ‌ها: `#05080D`, `#071521`, `#D6A84F`, `#F2D58A`, `#FFF8EA`, `#B9B9B9`
- حس: باشکوه، رازآلود، خردمندانه، تاریخی، مدرن، ایرانی، معنوی
- فونت فارسی پیشنهادی: Vazirmatn / IRANSansX
- انگلیسی لوگو: Cinzel / Cormorant Garamond

کارهای دیزاین:

- بررسی homepage و `/world`
- بررسی `/exhibitions` برای طراحی کارت‌های آثار، state پیشرفت، hero هر نمایشگاه و نسخه موبایل
- تکمیل visual system برای cardها، heroها، فرم‌ها و ادمین
- خروجی responsive موبایل
- تعریف component states
- کنترل contrast و خوانایی
- آماده‌سازی assetهای final برای hero، section cover، product photo و media thumbnail

## 12. تحویل به تیم محتوا و پژوهش

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
- منابع

کارهای محتوا:

- تکمیل اوستا، گات‌ها، یسنا، وندیداد، یشت‌ها، خرده اوستا، هات‌ها
- تکمیل واژه‌نامه
- آماده‌سازی مقاله‌ها
- ثبت منابع و citation
- استفاده از `/admin/inventory` برای دیدن کمبودها
- استفاده از `/admin/avesta-completion` برای دیدن کمبودهای دقیق هر بخش اوستا
- استفاده از `/admin/avesta-production` برای تبدیل کمبودها به تسک‌های اجرایی با مالک، مرحله و معیار پذیرش
- استفاده از `/admin/avesta-publication-gates` برای تصمیم انتشار هر بخش بر اساس محتوا، citation و کیفیت صفحه
- استفاده از `/admin/avesta-release-waves` برای تقسیم انتشار اوستا به موج داخلی، بتا و عمومی
- استفاده از `/admin/avesta-feature-flags` برای کنترل سطح نمایش هر بخش در لانچ مرحله‌ای
- استفاده از `/admin/avesta-access-control` برای کنترل دسترسی roleها به مسیرهای hidden/internal/beta
- استفاده از `/admin/route-visibility` برای اطمینان از اینکه مسیرهای hidden/internal/beta وارد sitemap عمومی نشوند
- استفاده از `/admin/avesta-source-packs` برای گرفتن پک منابع، citationها، دارایی‌های لازم و خروجی CSV/Markdown
- استفاده از `/admin/avesta-import-template` برای پر کردن قالب استاندارد متن، ترجمه، تحلیل، رسانه، منبع و SEO
- استفاده از `/admin/source-registry` برای ثبت و بازبینی منابع رسمی، policy استفاده و خروجی CSV/BibTeX
- استفاده از `/admin/citation-coverage` برای پیدا کردن کمبود citation، منبع کم‌شده و ریسک انتشار هر بخش اوستا
- استفاده از `/admin/production` و `/admin/production/briefs` برای تولید محتوا
- استفاده از `/admin/production/review` برای تایید خروجی

## 13. تحویل به تیم رسانه و AI

مسیرها:

- `/media`
- `/exhibitions`
- `/ai-studio`
- `/admin/media`
- `/admin/production/briefs`
- `/admin/production/review`
- `/admin/exhibitions`

کارها:

- تولید تصویر AI اختصاصی برای هر بخش
- تعریف نمایشگاه‌های فصلی/موضوعی با تصویر hero، thumbnail آثار و روایت کیوریتوری
- کنترل prompt، نسبت تصویر، مسیر فایل و وضعیت upload در `/admin/visual-assets`
- پایش ریسک منابع، citationهای تایید نشده و مالک پژوهشی در `/admin/source-review`
- thumbnail و نسخه desktop/mobile
- تولید صوت برای بندهای مهم
- ثبت prompt، negative prompt، mood، accent و مسیر فایل
- رعایت ممنوعیت‌ها: متن تصادفی، watermark، لباس مدرن، ساختمان مدرن، کیفیت پایین

## 14. تحویل به تیم رشد و خبرنامه

مسیرها:

- `/newsletter`
- `/newsletter/archive`
- `/newsletter/preview`
- `/newsletter/html-export`
- `/newsletter/preferences`
- `/admin/newsletter`
- `/admin/newsletter/analytics`
- `/admin/newsletter/experiments`
- `/admin/newsletter/send-times`
- `/admin/newsletter/schedule`
- `/admin/newsletter/delivery`

کارها:

- اتصال email provider
- double opt-in
- unsubscribe واقعی
- segment موضوعی
- tracking open/click
- ارسال زمان‌بندی‌شده
- اتصال analytics و delivery webhooks
- اتصال eventهای signup، preference، open/click و unsubscribe به ماتریس Event Tracking

## 15. تحویل به تیم فروشگاه

مسیرها:

- `/shop`
- `/shop/[slug]`
- `/shop/checkout`
- `/shop/payment/demo`
- `/admin/shop`
- `/api/shop/orders`
- `/api/shop/payments`
- `/api/admin/shop/products`
- `/api/admin/shop/orders`
- `/api/admin/shop/inventory`
- `/api/admin/shop/reports`

کارها:

- محصول واقعی: کتاب، ماگ، پوشاک، اکسسوری، مجسمه، پوستر
- عکس محصول
- موجودی واقعی
- درگاه پرداخت
- ارسال و tracking
- قوانین مرجوعی
- مالیات و گزارش فروش

## 16. چک‌لیست قبل از لانچ

- `npm install`
- `npm run db:generate`
- `npm run db:migrate`
- `npm run db:seed`
- `npm run build`
- تست `/`, `/world`, `/avesta`, `/search`, `/admin`
- تست auth demo و سپس auth production
- تست APIهای اصلی
- تست responsive موبایل
- تست SEO metadata و sitemap
- تست upload
- تست checkout demo و سپس payment واقعی
- تست newsletter subscription و unsubscribe
- پاکسازی محتوای sample یا برچسب‌گذاری آن
- ثبت backup دیتابیس و storage

## 17. وضعیت باقی‌مانده تا جهان کامل

کارهای بزرگ باقی‌مانده:

- ورود محتوای کامل و معتبر اوستا
- تولید تصویر و صوت واقعی
- اتصال دیتابیس production
- اتصال CMS/storage
- اتصال Meilisearch
- auth امن production
- email provider
- payment provider
- تست کامل build و responsive
- policy محتوا، citation و review
- analytics واقعی و event tracking

این پروژه از نظر معماری و تجربه محصول آماده تحویل به تیم‌هاست؛ فاز بعدی، تبدیل داده‌های sample/local به داده و سرویس production است.
