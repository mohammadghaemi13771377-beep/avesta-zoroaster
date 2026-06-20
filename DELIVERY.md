# بسته تحویل پروژه AVESTA-ZOROASTER

این فایل نقطه شروع تحویل پروژه به تیم فنی، محصول، دیزاین، محتوا و مدیریت است.

## فایل‌های دانلودی

فایل zip کامل پروژه:

```txt
avesta-zoroaster-source.zip
```

فایل متنی فول‌کد:

```txt
avesta-zoroaster-full-code.txt
```

فایل zip شامل کد Next.js، کامپوننت‌ها، Prisma، APIها، مستندات، لوگو، فایل preview و تنظیمات پروژه است.

## سند مادر تحویل

برای تحویل کامل به همه تیم‌ها این فایل را اول بخوانید:

```txt
docs/team-delivery-master.md
```

## خلاصه پروژه

AVESTA-ZOROASTER یک سایت مقاله‌ای ساده یا مذهبی سنتی نیست. هدف پروژه ساخت یک «جهان دیجیتال سینمایی» برای اوستا، زرتشت، گات‌ها، خرد ایران باستان و یکتاپرستی است.

سبک طراحی:

- Dark Luxury Persian Mythology
- پس‌زمینه مشکی/سرمه‌ای عمیق
- طلایی آیینی
- تجربه موزه دیجیتال و دانشنامه زنده
- RTL-first برای فارسی

## وضعیت فعلی

فاز MVP/پایه آماده شده است:

- صفحه خانه و پورتال اوستا با UI سینمایی
- آیین ورود `/onboarding` برای تبدیل کاربر تازه‌وارد به مسیر شروع شخصی
- نقشه جهان دیجیتال `/world`
- تور موزه‌ای جهان اوستا برای تجربه هدایت‌شده از آتش، گات‌ها، واژه روز، رسانه، راهنمای روزانه و نورسنج اشا
- نمایشگاه‌های موضوعی `/exhibitions` برای تبدیل مسیرهای محتوایی به تجربه curated با آثار، یادداشت کیوریتور، مسیر مرتبط و پیشرفت محلی
- فاز تکمیل طراحی و محتوا: تصویر hero، cover صفحه‌های کلیدی، thumbnailهای رسانه/مقاله/نمایشگاه و تصویر محصول فروشگاه داخل `public/images/ai`
- فاز طراحی داخلی اوستا: الگوی پوستر/موزه نورانی برای یسنا، گات‌ها، ویسپرد، وندیداد، یشت‌ها، خرده اوستا و هات‌ها با تصویر مرکزی، قاب‌های روایی، پیام امروزی و تمرین روزانه
- فاز زیرصفحه‌های اوستا: route اختصاصی برای یسنا ۱، اهونود گات، درآمد ویسپرد، آبان یشت، مهر یشت، فرگرد اول، فرگرد دوم، نیایش‌های روزانه، آتش نیایش و نقشه هات‌ها همراه با API و داده نمونه
- پروفایل محتوایی فصل‌های اوستا با زمینه تاریخی، زمینه آیینی، کلیدواژه‌ها، alt تصویر، فصل‌های مرتبط و بندهای شاخص برای تبدیل هر فصل به اطلس آموزشی
- اطلس تصویری فصل‌ها در صفحه‌های مادر اوستا برای نمایش پوستر، نقل‌قول، تعداد بند و CTA ورود به صفحه اختصاصی
- شاخص‌های آماده‌سازی داخل پورتال اوستا و ماتریس تکمیل برای سنجش راهنمای تصویری، پروفایل آموزشی و alt/SEO تصویر
- مسیرهای شروع مطالعه اوستا برای هدایت کاربر تازه‌وارد، علاقه‌مند گات‌ها، نیایش روزانه، یشت‌ها و وندیداد از داخل پورتال `/avesta`
- صفحه‌های عمومی `/avesta/paths` و `/avesta/paths/[id]` برای نمایش مسیر کامل، مراحل، CTA و مسیرهای پیشنهادی دیگر
- پیشرفت local داخل صفحه هر مسیر مطالعه با تیک‌زدن قدم‌ها، درصد تکمیل، بازنشانی و event tracking
- کنسول ادمین `/admin/avesta-study-paths` برای مدیریت آمادگی، مالک، کمبودها و چک‌لیست انتشار مسیرهای شروع مطالعه
- کنسول `/admin/content-production-readiness` برای تشخیص دقیق نیازهای production قبل از اینکه خودتان متن، تصویر، صوت و ویدئو وارد کنید
- کنسول `/admin/content-export` و API `/api/admin/content-export` برای خروجی کامل JSON، بکاپ محتوایی، manifest تصویرها و تحویل snapshot به تیم محتوا، دیزاین، محصول و فنی
- کنسول `/admin/asset-operations` و API `/api/admin/asset-operations` برای کنترل مسیر تصویر، صوت، PDF، ویدئو، storage، CDN و بکاپ دارایی‌ها
- کنسول `/admin/publish-pipeline` و API `/api/admin/publish-pipeline` برای تصمیم publish/schedule/hold/block بر اساس تقویم انتشار، وظایف تحریریه، رسانه، منبع و SEO
- فاز ارتقای جهانی SEO و اعتماد: metadata/canonical/OpenGraph/Twitter، hreflang، schema مرکزی، breadcrumb، CreativeWork، sitemap گسترده‌تر، noindex ادمین، 404 حرفه‌ای و `llms.txt`
- صفحات عمومی `/research-methodology` و `/contact` برای روش پژوهش، disclaimer آموزشی، همکاری پژوهشی/هنری و اعتماد مخاطب جهانی
- مقاله‌های pillar دو‌زبانه برای Avesta، Zoroaster، Yasna، Vendidad و Zoroastrian/Iranian festivals
- اتصال صفحه‌های بند/آیه به chapter guide برای نمایش hero تصویری، زمینه روایی، تمرین‌های همان تالار و لینک بازگشت به صفحه اختصاصی
- Reference board تصویری داخل `public/images/references` و سند `docs/visual-reference-board.md` برای ادامه مسیر دیزاین
- صفحات عمومی اصلی: زرتشت، گات‌ها، یکتاپرستی، مسیرهای موضوعی یکتاپرستی، استاد تمرین اخلاقی، دین زرتشتی، کوروش، تایم‌لاین، کتابخانه، رسانه، مقاله‌ها و جستجو
- نورسنج اشا برای تبدیل تمرین، دفتر روزانه و مأموریت‌ها به امتیاز تعادل پندار، گفتار و کردار
- راهنمای روزانه روشنایی برای تبدیل اوستای امروز، دفتر روزانه، تمرین اخلاقی، مأموریت و نورسنج اشا به مسیر ۱۵ دقیقه‌ای
- کپسول خرد برای تجربه سه دقیقه‌ای پیام اوستا، واژه روز، تمرین اشا و اشتراک‌گذاری
- صفحه‌های مطالعه اوستا و جزئیات بند/آیه
- واژه‌نامه و صفحات جزئی واژه‌ها
- پروفایل مطالعه، ورود و ثبت‌نام demo
- نورخانه شخصی برای ادامه مطالعه، اوستای امروز، استمرار، XP و پیشنهاد مسیر روزانه
- اتصال آیین ورود به نورخانه با کارت مسیر شروع ذخیره‌شده و event قابل اندازه‌گیری
- قطب‌نمای خرد برای پیشنهاد قدم بعدی بر اساس رفتار، مأموریت، استمرار و حافظه مطالعه
- Journey Builder برای مسیر شخصی کاربر در جهان اوستا
- Journey Builder با query params برای ادامه مستقیم مسیر ذخیره‌شده از نورخانه
- ذخیره مسیر فعال در مرورگر و نمایش قدم بعدی در نورخانه شخصی
- تکمیل قدم‌های مسیر فعال از نورخانه با progress bar و event قابل اندازه‌گیری
- Share Studio برای ساخت کارت نقل‌قول طلایی و رشد شبکه‌های اجتماعی
- Ritual Room برای تجربه آیینی کوتاه، تایمر، نیت و اتصال به دفتر روزانه
- Achievement Hall برای نشان‌ها، سطح کاربر و وفادارسازی
- Daily Streak برای زنجیره روشنایی، تقویم عادت روزانه و برگشت کاربر
- پنل ادمین برای Go-Live، کنترل کیفیت صفحات، آنالیتیکس محصول، Event Tracking، تحویل تیم‌ها، محتوا، رسانه، کنترل تصویرهای AI، رجیستری منابع، پوشش ارجاع، بازبینی منابع، import، SEO، فروشگاه، خبرنامه، Inventory، Production، Brief و Review
- کنسول مدیریت نمایشگاه‌ها برای کنترل آمادگی رسانه، روایت کیوریتوری، ریسک انتشار، مسیرهای مرتبط و اقدام بعدی
- API قرارداد مدیریت محتوا `/api/admin/content-models` برای آماده‌سازی CRUD آینده و اتصال upload به storage واقعی
- کنسول آمادگی Deploy برای مدیریت وضعیت GitHub، Vercel، envها، دیتابیس، DNS، storage و smoke test
- ماتریس تکمیل اوستا برای مدیریت کمبودهای متن، ترجمه، تحلیل، تصویر، صوت، منبع و SEO
- Batch تولید اوستا برای تبدیل کمبودها به تسک‌های دارای مالک، مرحله، اولویت و معیار پذیرش
- دروازه انتشار اوستا برای تصمیم Publish/Hold/Block بر اساس تکمیل محتوا، citation و کیفیت صفحه
- موج‌های انتشار اوستا برای تقسیم لانچ به موج داخلی، بتا و عمومی با شرط ورود/خروج و خروجی CSV
- Feature Flags اوستا برای کنترل نمایش hidden/internal/beta/public هر بخش در لانچ مرحله‌ای
- گارد دسترسی اوستا در middleware برای اعمال سطح دسترسی anonymous/reader/editor/admin روی مسیرهای اوستا
- Route Visibility Audit برای جلوگیری از ورود مسیرهای hidden/internal/beta به sitemap و index عمومی
- Source Pack اوستا برای تحویل منابع لازم، citationها، دارایی‌های رسانه‌ای، معیار پذیرش و خروجی CSV/Markdown به تیم پژوهش
- رجیستری رسمی منابع پژوهشی با خروجی JSON، CSV و BibTeX برای اتصال citationهای نهایی
- نقشه پوشش ارجاع اوستا برای تشخیص ریسک منبع، citationهای معلق و کمبود نوع منبع قبل از انتشار
- قالب Import اوستا برای تحویل JSON/CSV استاندارد به تیم محتوا و اجرای dry-run
- ماتریس Event Tracking برای payload، مقصد ابزارها، QA rule، privacy note و اتصال PostHog/GA4/first-party events
- First-party Event Collector با `/api/events`، helper سمت کلاینت و preview ادمین
- Instrumentation اولیه برای CTAهای خانه، کارت‌های پورتال و بخش‌های اوستا
- فرمان‌خانه سریع جهانی با میانبر `Ctrl+K` برای پرش سریع به اوستا، نورخانه، جستجو و ابزارهای کلیدی
- مرکز حریم خصوصی و consent-aware tracking برای آنالیتیکس، شخصی‌سازی، نورنامه و فروشگاه
- بنر جهانی رضایت کاربر برای فعال‌سازی همه یا حالت ضروری
- Prisma schema و APIهای پایه
- مستندات راه‌اندازی، طراحی، محتوا و فنی
- پریویو استاتیک برای مشاهده سریع

## فایل‌های مهم

- `README.md`: اجرای پروژه و معرفی ساختار
- `.env.example`: متغیرهای محیطی لازم
- `docs/local-preview-and-deploy.md`: راه‌اندازی لوکال و دیپلوی
- `docs/team-delivery-master.md`: سند مادر تحویل به تیم‌ها
- `docs/final-github-vercel-team-handoff.md`: چک‌لیست نهایی تحویل به GitHub، Vercel و همه تیم‌ها
- `docs/technical-handoff.md`: توضیح فنی برای تیم برنامه‌نویسی
- `docs/product-design-handoff.md`: توضیح محصول و دیزاین
- `docs/visual-reference-board.md`: الگوی بصری صفحه‌های داخلی اوستا بر اساس رفرنس‌های تصویری
- `docs/content-intake-guide.md`: روش ورود محتوا و تصویر
- `docs/bulk-import-guide.md`: ورود دسته‌ای محتوا
- `docs/file-manifest.md`: فهرست ساختار فایل‌ها
- `docs/github-vercel-update-note.md`: متن آماده commit، review و deploy برای GitHub/Vercel
- `docs/codex-github-final-prompt.md`: پیام آماده برای Codex GitHub/Vercel جهت push و deploy

## اجرای سریع

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

آدرس:

```txt
http://localhost:3000
```

## دیتابیس

بعد از تنظیم `DATABASE_URL`:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## نکته تحویل

برای اجرای کامل، تیم باید Node.js و npm نصب داشته باشد. در محیط فعلی Codex با runtime داخلی Node، `tsc --noEmit` و build کامل Next.js اجرا شد و `294/294` صفحه با موفقیت ساخته شد.

## آخرین افزوده تحویلی

در این فاز بورد `/admin/global-growth-audit` و API متناظر `/api/admin/global-growth-audit` اضافه شد. این بخش برای تیم محصول، SEO، فنی، محتوا و DevOps نشان می‌دهد که سایت از نظر رشد جهانی در چه وضعیتی است: SEO، چندزبانه، schema، اعتماد پژوهشی، performance، دارایی‌ها، معماری محتوا و آمادگی CMS.

فایل‌های کلیدی این فاز:

- `lib/global-growth-audit.ts`
- `components/admin/global-growth-audit-board.tsx`
- `app/admin/global-growth-audit/page.tsx`
- `app/api/admin/global-growth-audit/route.ts`

بعد از این تغییر، بسته zip و فایل full-code باید دوباره ساخته شوند و build جدید Vercel باید اجرا شود.

## افزوده جدید: Localization Hub

در این فاز مسیر `/admin/localization` و API متناظر `/api/admin/localization` اضافه شد. این بخش وضعیت ترجمه فارسی/انگلیسی، بازبینی انسانی، آماده‌سازی اصطلاحات زرتشتی، routeهای چندزبانه، مقاله‌های pillar، chapter guideهای اوستا و واژه‌نامه را برای رشد جهانی سایت پایش می‌کند.

فایل‌های کلیدی این فاز:

- `lib/localization-hub.ts`
- `components/admin/localization-hub-board.tsx`
- `app/admin/localization/page.tsx`
- `app/api/admin/localization/route.ts`

بخش multilingual در Global Growth Audit هم اکنون از همین Localization Hub تغذیه می‌شود.

## افزوده جدید: Research Source Intake Hub

در این فاز مسیر `/admin/source-intake` و API متناظر `/api/admin/source-intake` اضافه شد. این بخش پیش از ورود محتوای واقعی، برای هر بخش اوستا نشان می‌دهد کدام منبع اصلی، ترجمه، citation، دارایی رسانه‌ای و بازبینی پژوهشی آماده است و چه مانعی باید رفع شود.

فایل‌های کلیدی این فاز:

- `lib/source-intake-hub.ts`
- `components/admin/source-intake-hub-board.tsx`
- `app/admin/source-intake/page.tsx`
- `app/api/admin/source-intake/route.ts`

بخش Research Trust در `lib/global-growth-audit.ts` نیز از این هاب استفاده می‌کند. این سازوکار در حال حاضر با fallback محلی build-safe است و برای اتصال بعدی به CMS، storage و پایگاه داده طراحی شده است.

## افزوده جدید: Focused Navigation

هدر عمومی برای تجربه کتابی و متمرکز بازطراحی شد. پنج مسیر اصلی در سطح اول دیده می‌شوند و مسیرهای فرعی در منوی «کاوش» قرار دارند. صفحه خانه نیز به یک gateway خلوت تبدیل شده و هر CTA کاربر را به صفحه مستقل همان تجربه می‌برد.

فایل‌های کلیدی این فاز:

- `components/header.tsx`
- `lib/content.ts`
- `app/page.tsx`

## Release Handoff: 2026-06-20

نسخه نهایی تحویل این مرحله، مسیرهای مطالعه، فیلترهای کتابخانه و مقاله، deep-link جستجوی بخش‌های اوستا، منوی موبایل و CTAهای واقعی بخش‌های اوستا را شامل می‌شود.

- راهنمای release: `docs/release-handoff-2026-06-20.md`
- پیام آماده GitHub/Vercel: `docs/codex-github-final-prompt.md`
- آخرین build موفق: `294/294` صفحه
- commit پیشنهادی: `feat: polish navigation, search and Avesta reading paths`
