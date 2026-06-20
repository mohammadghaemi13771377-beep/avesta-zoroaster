# فهرست فایل‌های پروژه

این manifest برای تحویل سریع به تیم فنی است.

## Root

- `.env.example`: نمونه متغیرهای محیطی
- `README.md`: راهنمای اصلی پروژه
- `DELIVERY.md`: نقطه شروع بسته تحویل
- `package.json`: dependencyها و scriptها
- `next.config.mjs`: تنظیمات Next.js
- `tailwind.config.ts`: تنظیمات Tailwind
- `tsconfig.json`: تنظیمات TypeScript
- `middleware.ts`: محافظ مسیرهای profile، admin و gate دسترسی اوستا بر اساس visibility
- `preview-server.mjs`: سرور سبک برای `local-preview.html`
- `local-preview.html`: پیش‌نمایش static
- `avesta-zoroaster-source.zip`: فایل دانلودی کل پروژه

## app

- `app/page.tsx`: صفحه خانه
- `app/layout.tsx`: layout اصلی
- `app/globals.css`: استایل global
- `app/tour`: تور موزه‌ای هدایت‌شده جهان اوستا
- `app/exhibitions`: نمایشگاه‌های موضوعی curated با آثار، یادداشت کیوریتور و پیشرفت local
- `app/daily-light`: راهنمای روزانه روشنایی و مسیر ۱۵ دقیقه‌ای کاربر
- `app/wisdom-capsule`: کپسول خرد سه دقیقه‌ای با پیام، واژه، تمرین و اشتراک
- `app/research-methodology`: صفحه روش پژوهش، سیاست منابع، بازبینی و disclaimer آموزشی
- `app/contact`: صفحه تماس و همکاری پژوهشی/هنری
- `app/llms.txt/route.ts`: خروجی متنی برای مستندسازی سایت برای crawlerهای AI
- `app/not-found.tsx`: صفحه 404 سینمایی با مسیرهای بازگشت به خانه، اوستا و جستجو
- `app/admin/layout.tsx`: metadata noindex برای همه مسیرهای ادمین
- `app/avesta/[section]/[chapter]`: صفحه اختصاصی هر یشت، فرگرد، هات یا نیایش با پوستر، پیام امروزی و لیست بندها
- `app/avesta/paths`: فهرست عمومی مسیرهای شروع مطالعه
- `app/avesta/paths/[id]`: صفحه اختصاصی هر مسیر مطالعه با مراحل و CTA
- `app/onboarding`: آیین ورود و مسیر شروع کاربر تازه‌وارد
- `app/journey-builder`: سازنده مسیر با پشتیبانی از query params برای intent، pace، level و mode
- `app/admin/avesta-completion`: ماتریس تکمیل محتوای اوستا برای تیم محتوا و پژوهش
- `app/admin/avesta-study-paths`: کنترل آمادگی، مالک، کمبودها و چک‌لیست انتشار مسیرهای شروع اوستا
- `app/admin/deployment-readiness`: کنسول آمادگی GitHub، Vercel، envها، دیتابیس و deploy production
- `app/admin/content-production-readiness`: کنسول آمادگی ورود محتوای واقعی، upload، امنیت، search و بکاپ
- `app/admin/content-export`: کنسول خروجی و بکاپ محتوا با snapshot کامل JSON و manifest تصویرها
- `app/admin/asset-operations`: کنسول عملیات دارایی‌ها برای تصویر، صوت، PDF، ویدئو، storage، CDN و بکاپ
- `app/admin/publish-pipeline`: اتاق تصمیم انتشار برای publish/schedule/hold/block بر اساس گیت‌های محتوا، رسانه، منبع و SEO
- `app/admin/avesta-production`: batchهای تولید اوستا بر اساس کمبودهای ماتریس تکمیل
- `app/admin/avesta-publication-gates`: دروازه تصمیم انتشار اوستا با وضعیت Publish/Hold/Block
- `app/admin/avesta-release-waves`: موج‌های انتشار داخلی، بتا و عمومی اوستا
- `app/admin/avesta-feature-flags`: کنترل نمایش hidden/internal/beta/public برای بخش‌های اوستا
- `app/admin/avesta-access-control`: ماتریس دسترسی anonymous/reader/editor/admin برای مسیرهای اوستا
- `app/admin/route-visibility`: Audit مسیرها برای sitemap، navigation و index عمومی
- `app/admin/exhibitions`: کنسول مدیریت آمادگی نمایشگاه‌ها، رسانه، روایت و ریسک انتشار
- `app/admin/avesta-source-packs`: پک منابع، citation، دارایی و معیار انتشار بخش‌های اوستا
- `app/admin/avesta-import-template`: قالب JSON/CSV ورود دسته‌ای محتوای طلایی اوستا
- `app/admin/source-registry`: رجیستری رسمی منابع پژوهشی و خروجی citation
- `app/admin/citation-coverage`: نقشه پوشش citation و ریسک منبع بخش‌های اوستا
- `app/avesta`: پورتال و صفحات اوستا
- `app/monotheism/paths`: مسیرهای موضوعی یکتاپرستی با تمرین اخلاقی، بند پیشنهادی، واژه و مقاله
- `app/practice`: استاد تمرین اخلاقی و برنامه هفت‌روزه پندار، گفتار، کردار
- `app/asha-balance`: نورسنج اشا برای امتیاز تعادل پندار، گفتار، کردار، استمرار و مأموریت
- `app/articles`: مقاله‌ها
- `app/dictionary`: واژه‌نامه
- `app/library`: کتابخانه
- `app/media`: رسانه
- `app/search`: جستجو
- `app/timeline`: تایم‌لاین
- `app/profile`: پروفایل مطالعه
- `app/admin`: پنل مدیریت
- `app/api`: API routes
- `app/sitemap.ts`: sitemap داینامیک
- `app/robots.ts`: robots داینامیک

## components

- `components/header.tsx`: هدر اصلی
- `components/museum-tour-panel.tsx`: پنل تور موزه‌ای، ایستگاه‌ها و پیشرفت local
- `components/exhibitions-gallery.tsx`: گالری نمایشگاه‌های موضوعی، آثار، مسیرهای مرتبط و پیشرفت local
- `components/command-center.tsx`: فرمان‌خانه سریع جهانی، جستجوی مسیرها و میانبر `Ctrl+K`
- `components/footer.tsx`: فوتر
- `components/section-card.tsx`: کارت بخش‌ها
- `components/avesta-chapter-atlas.tsx`: اطلس تصویری chapterها در صفحه‌های مادر اوستا
- `components/avesta-study-paths-panel.tsx`: مسیرهای شروع مطالعه برای تازه‌واردها، گات‌ها، نیایش روزانه، یشت‌ها و وندیداد
- `components/study-path-progress-panel.tsx`: پیشرفت local قدم‌های هر مسیر مطالعه با تیک، درصد تکمیل و reset
- `components/avesta-poster-experience.tsx`: لایه پوستر/موزه نورانی برای صفحه‌های داخلی اوستا
- `components/admin/avesta-study-path-control-board.tsx`: بورد ادمین برای آمادگی و انتشار مسیرهای شروع مطالعه
- `components/search-panel.tsx`: پنل جستجو
- `components/onboarding-gateway.tsx`: UI انتخاب نیت، ریتم، حال‌وهوا و مسیر شروع
- `components/resource-explorer.tsx`: مرور منابع
- `components/reading-controls.tsx`: کنترل حالت مطالعه
- `components/articles-explorer.tsx`: فیلتر مقاله‌ها
- `components/personal-dashboard-panel.tsx`: نورخانه شخصی، مسیر شروع ذخیره‌شده، مسیر فعال، progress قدم‌ها و مرکز ورود روزانه کاربر
- `components/journey-builder-panel.tsx`: سازنده مسیر شخصی با ذخیره مسیر فعال در نورخانه
- `components/monotheism-paths-board.tsx`: بورد تعاملی مسیرهای یکتاپرستی
- `components/practice-studio-board.tsx`: بورد تمرین هفت‌روزه اخلاقی با ذخیره پیشرفت local
- `components/asha-balance-panel.tsx`: داشبورد تعادل اشا و پیشنهاد تمرین بعدی
- `components/wisdom-compass-panel.tsx`: قطب‌نمای خرد و پیشنهاد قدم بعدی
- `components/daily-streak-panel.tsx`: پنل زنجیره روشنایی و تقویم عادت روزانه
- `components/daily-light-guide-panel.tsx`: پنل مسیر روزانه مطالعه، تأمل، تمرین، مأموریت و نورسنج اشا
- `components/wisdom-capsule-panel.tsx`: پنل کپسول خرد و اشتراک پیام روزانه
- `components/privacy-consent-panel.tsx`: مرکز رضایت کاربر و تنظیمات حریم خصوصی
- `components/privacy-consent-banner.tsx`: بنر جهانی رضایت کاربر روی کل سایت
- `components/admin/event-tracking-board.tsx`: ماتریس event tracking، payload، QA و privacy
- `components/admin/deployment-readiness-board.tsx`: بورد آمادگی deploy و تحویل GitHub/Vercel
- `components/admin/content-production-readiness-board.tsx`: بورد آمادگی ادمین برای ورود واقعی محتوا، تصویر، صوت و ویدئو
- `components/admin/content-export-board.tsx`: بورد خروجی و بکاپ محتوایی برای تیم محتوا، دیزاین، محصول و فنی
- `components/admin/asset-operations-board.tsx`: بورد مدیریت کانال‌های upload، storage هدف، فرمت‌های مجاز و checklist production media
- `components/admin/publish-pipeline-board.tsx`: بورد تصمیم انتشار با فیلتر، گیت‌ها، deliverableها و blockerها
- `components/admin/exhibition-control-board.tsx`: بورد مدیریت نمایشگاه‌ها، readiness، نیازهای رسانه/محتوا/محصول و checklist
- `components/admin/avesta-completion-board.tsx`: بورد تکمیل متن، ترجمه، رسانه، منبع و SEO اوستا
- `components/admin/avesta-production-batch-board.tsx`: بورد batch تولید اوستا با فیلتر مرحله و فیلد
- `components/admin/avesta-publication-gate-board.tsx`: بورد دروازه انتشار اوستا با مانع، هشدار و چک‌لیست
- `components/admin/avesta-release-wave-board.tsx`: بورد موج‌های انتشار اوستا با شرط ورود/خروج و خروجی‌ها
- `components/admin/avesta-feature-flag-board.tsx`: بورد feature flag و visibility برای لانچ مرحله‌ای اوستا
- `components/admin/avesta-access-control-board.tsx`: بورد policy دسترسی نقش‌ها به مسیرهای اوستا
- `components/admin/route-visibility-audit-board.tsx`: بورد audit نمایش route و sitemap بر اساس Feature Flags
- `components/admin/avesta-source-pack-board.tsx`: بورد Source Pack اوستا با فیلتر وضعیت و ریسک
- `components/admin/avesta-import-template-board.tsx`: نمایش قالب import اوستا، JSON dry-run و CSV نمونه
- `components/admin/source-registry-board.tsx`: بورد رجیستری منابع با خروجی CSV و BibTeX
- `components/admin/citation-coverage-board.tsx`: بورد پوشش ارجاع اوستا با امتیاز، ریسک و اقدام بعدی
- `components/admin/event-collector-board.tsx`: preview کلکتور first-party رویدادها
- `components/tracked-link.tsx`: لینک قابل ردیابی برای ارسال event کلیک به `/api/events`
- `components/admin`: کامپوننت‌های پنل ادمین
- `components/auth`: فرم‌های ورود و خروج

## lib

- `lib/content.ts`: محتوای ساختاری نمونه
- `lib/museum-tour.ts`: مسیر تور موزه‌ای، ایستگاه‌ها، روایت و curator note
- `lib/exhibitions.ts`: مدل و داده نمایشگاه‌های موضوعی، آثار، مسیرهای مرتبط و summary
- `lib/exhibition-control.ts`: وضعیت آمادگی نمایشگاه‌ها برای ادمین، ریسک‌ها، مالک‌ها و اقدام بعدی
- `lib/visual-assets.ts`: نقشه مرکزی تصویرهای واقعی hero، cover، رسانه، نمایشگاه و فروشگاه
- `lib/avesta-visual-guides.ts`: داده الگوهای تصویری بخش‌های اوستا، قاب‌های روایی، پیام امروزی و تمرین‌ها
- `lib/avesta-chapter-guides.ts`: داده پوسترهای اختصاصی آبان یشت، مهر یشت، فرگردها و نیایش‌های خرده اوستا
- `lib/avesta-chapter-profiles.ts`: پروفایل محتوایی هر فصل شامل زمینه تاریخی، زمینه آیینی، کلیدواژه‌ها، alt تصویر، فصل‌های مرتبط و بندهای شاخص
- `lib/avesta-study-paths.ts`: داده مسیرهای شروع مطالعه و API `/api/avesta/study-paths`
- `lib/avesta-study-path-control.ts`: مدل کنترل ادمین برای readiness، owner، missing items و checklist مسیرهای شروع
- `lib/admin-content-models.ts`: قرارداد مدل‌های آینده ادمین برای مقاله، بند اوستا، رسانه، نمایشگاه و محصول
- `lib/admin-content.ts`: قرارداد ذخیره/اعتبارسنجی محتوای ادمین شامل `avestaChapterGuide`
- `lib/sample-content.ts`: داده‌های نمونه صفحات
- `lib/avesta-repository.ts`: خواندن اوستا از Prisma یا fallback
- `lib/media-repository.ts`: خواندن و ذخیره رسانه
- `lib/admin-content.ts`: قرارداد ذخیره محتوای ادمین
- `lib/bulk-import.ts`: ورود دسته‌ای محتوا
- `lib/admin-stats.ts`: آمار داشبورد ادمین
- `lib/search.ts`: جستجوی نمونه
- `lib/onboarding.ts`: موتور مسیر شروع، نرمال‌سازی انتخاب‌ها، پیشنهاد onboarding و لینک‌سازی به Journey Builder
- `lib/active-journey.ts`: قرارداد مسیر فعال، ساخت snapshot، محاسبه progress و لینک‌سازی به Journey Builder
- `lib/avesta-completion.ts`: مدل ماتریس تکمیل محتوای اوستا و summary کمبودها
- `lib/avesta-production-batches.ts`: تبدیل کمبودهای اوستا به batchهای تولید دارای مالک، اولویت و معیار پذیرش
- `lib/avesta-publication-gates.ts`: ترکیب تکمیل اوستا، پوشش citation و کیفیت صفحه برای تصمیم انتشار
- `lib/avesta-release-waves.ts`: ساخت موج‌های انتشار مرحله‌ای اوستا از روی Publication Gate
- `lib/avesta-feature-flags.ts`: محاسبه visibility هر بخش از روی Release Wave و Publication Gate
- `lib/avesta-access-control.ts`: تصمیم دسترسی roleها برای مسیرهای اوستا و policy خروجی ادمین
- `lib/deployment-readiness.ts`: وضعیت آمادگی GitHub، Vercel، env، دیتابیس، DNS، storage و smoke test
- `lib/content-production-readiness.ts`: وضعیت آمادگی CRUD محتوا، upload، auth، search و بکاپ برای production
- `lib/content-export.ts`: ساخت bundle خروجی کامل محتوا، مسیرهای مطالعه، راهنمای فصل‌ها، manifest تصویرها و readiness
- `lib/asset-operations.ts`: مدل عملیات دارایی‌ها، کانال‌های upload، summary storage و خروجی API
- `lib/publish-pipeline.ts`: ترکیب تقویم انتشار و وظایف تحریریه برای تصمیم publish/schedule/hold/block
- `lib/seo.ts`: تنظیمات دامنه، metadata helper، hreflang، schema WebSite/Organization/Breadcrumb/CollectionPage/CreativeWork
- `lib/route-visibility-audit.ts`: اتصال visibility به sitemap، navigation، index و خروجی CSV
- `lib/avesta-source-packs.ts`: ساخت Source Pack، CSV و Markdown برای منابع پژوهشی بخش‌های اوستا
- `lib/avesta-import-template.ts`: ساخت قالب JSON/CSV برای ورود دسته‌ای بندهای اوستا
- `lib/source-registry.ts`: مدل رجیستری منابع رسمی، summary و خروجی CSV/BibTeX
- `lib/citation-coverage.ts`: محاسبه پوشش citation، منبع کم‌شده، امتیاز و CSV
- `lib/i18n.ts`: چندزبانه
- `lib/prisma.ts`: Prisma client
- `lib/auth.ts`: auth demo
- `lib/upload-storage.ts`: ذخیره فایل آپلودی
- `lib/ai-prompts.ts`: پرامپت‌های AI
- `lib/personal-dashboard.ts`: snapshot نورخانه شخصی، پیشنهادهای روزانه و جمع‌بندی حافظه کاربر
- `lib/wisdom-compass.ts`: امتیازدهی سیگنال‌ها و موتور rule-based پیشنهاد قدم بعدی
- `lib/daily-streak.ts`: مدل retention روزانه، تقویم ۱۴ روزه و snapshot استمرار
- `lib/daily-light-guide.ts`: ساخت راهنمای روزانه روشنایی و قدم‌های ۱۵ دقیقه‌ای
- `lib/wisdom-capsule.ts`: ساخت کپسول خرد سه دقیقه‌ای از اوستای امروز، اشا و Share Studio
- `lib/event-tracking.ts`: قرارداد eventها، مقصد analytics، وضعیت پیاده‌سازی و checklist production
- `lib/event-collector.ts`: validation، sanitize و ذخیره in-memory رویدادهای first-party
- `lib/client-events.ts`: helper کلاینتی `trackEvent` برای ارسال رویداد به `/api/events`
- `lib/privacy-consent.ts`: مدل consent، policy دسته‌های داده و گارد consent-aware tracking
- `lib/monotheism-paths.ts`: مسیرهای موضوعی یکتاپرستی و summary مسیرها
- `lib/practice-studio.ts`: برنامه هفت‌روزه تمرین اخلاقی، XP و summary پیشرفت
- `lib/asha-balance.ts`: موتور امتیازدهی تعادل اشا از تمرین‌ها، استمرار و مأموریت‌ها

## prisma

- `prisma/schema.prisma`: مدل دیتابیس
- `prisma/seed.js`: seed اولیه

## public

- `public/images/avesta-zoroaster-logo.png`: لوگوی اصلی
- `public/images/ai`: جایگاه تصاویر AI
- `public/images/references`: رفرنس‌های تصویری جهت هنری برای صفحه‌های داخلی و homepage
- `public/audio`: جایگاه صوت
- `public/library`: جایگاه PDF
- `public/video`: جایگاه ویدیو

## docs

- `docs/technical-handoff.md`
- `docs/final-github-vercel-team-handoff.md`
- `docs/product-design-handoff.md`
- `docs/local-preview-and-deploy.md`
- `docs/content-intake-guide.md`
- `docs/bulk-import-guide.md`
- `docs/media-asset-plan.md`
- `docs/ai-prompt-library.md`
- `docs/search-meilisearch-plan.md`
- `docs/implementation-roadmap.md`
- `docs/project-brief.md`
- `docs/auth-plan.md`
- `docs/i18n-plan.md`
- `docs/user-profile-data-model.md`
- `docs/avesta-data-flow.md`
- `docs/admin-content-asset-management.md`
- `docs/visual-reference-board.md`
- `docs/github-vercel-update-note.md`

## public/images/ai

- `home-hero.png`: hero اصلی صفحه خانه
- `avesta-portal.png`: پورتال اوستا و مسیرهای عمومی
- `gathas-cover.png`: گات‌ها، مقاله‌ها و محتوای مرتبط
- `zoroaster-cover.png`: زرتشت و حافظه ایران باستان
- `zoroastrianism-cover.png`: دین زرتشتی
- `monotheism-cover.png`: یکتاپرستی و اشا
- `dictionary-cover.png`: واژه‌نامه و جستجو
- `articles-cover.png`: مقاله‌ها
- `library-cover.png`: کتابخانه و منابع
- `media-cover.png`: رسانه
- `exhibitions-cover.png`: نمایشگاه‌ها
- `shop-cover.png`: فروشگاه
- `yasna-cover.png`, `vendidad-cover.png`, `yashts-cover.png`, `khordeh-avesta-cover.png`, `hats-cover.png`: بخش‌های اوستا
- `product-book.png`, `product-mug.png`, `product-shirt.png`, `product-statue.png`: محصولات نمونه فروشگاه

## public/images/references

- `reference-water-anahita.png`: الگوی آب، آناهیتا و قاب‌های آموزشی یشت‌ها
- `reference-soul-chinvat.png`: الگوی روح، داوری و پل چینود
- `reference-vendidad-first.png`, `reference-vendidad-second.png`: الگوی وندیداد، فرگردها، پاکی و نبرد نور و تاریکی
- `reference-atashkadeh.png`: الگوی آتشکده، نیایش و تالار آیینی
- `reference-silence-mind.png`: الگوی سکوت ذهن و گات‌ها
- `reference-hope-despair.png`: الگوی امید، ناامیدی و پیام امروزی
- `reference-home-ui.png`: الگوی homepage سینمایی
- `reference-logo.png`: لوگوی مرجع

## Latest Global Growth Files

- `lib/global-growth-audit.ts`: مدل امتیازدهی رشد جهانی برای SEO، multilingual، schema، trust، performance، content، assets و admin/CMS.
- `components/admin/global-growth-audit-board.tsx`: بورد مدیریتی رشد جهانی با امتیاز، وضعیت، چک‌ها، routeهای مرتبط و next action.
- `app/admin/global-growth-audit/page.tsx`: صفحه ادمین noindex برای مشاهده Global Growth Audit.
- `app/api/admin/global-growth-audit/route.ts`: خروجی JSON بدون cache برای مصرف QA، GitHub/Vercel یا مانیتورینگ داخلی.
- `components/admin/admin-shell.tsx`: لینک «رشد جهانی» در سایدبار ادمین.
- `lib/content.ts`: اضافه شدن route جدید به route map پروژه.

## Latest Localization Files

- `lib/localization-hub.ts`: مدل آمادگی ترجمه، وضعیت فارسی/انگلیسی، بازبینی انسانی، مقاله‌ها، واژه‌نامه و chapter guideهای اوستا.
- `components/admin/localization-hub-board.tsx`: بورد ادمین برای Localization Hub با امتیاز، status، owner، checks و next action.
- `app/admin/localization/page.tsx`: صفحه ادمین noindex برای مدیریت آمادگی ترجمه.
- `app/api/admin/localization/route.ts`: خروجی JSON بدون cache برای مصرف QA، SEO، GitHub/Vercel یا automation.
- `lib/global-growth-audit.ts`: اتصال بخش multilingual به Localization Hub.
- `components/admin/admin-shell.tsx`: لینک «چندزبانه» در سایدبار ادمین.
- `lib/content.ts`: اضافه شدن `/admin/localization` به route map پروژه.

## Latest Research Source Intake Files

- `lib/source-intake-hub.ts`: تجمیع Source Pack، رجیستری منابع، پوشش citation و بازبینی پژوهشی در یک مدل آمادگی ورود محتوا.
- `components/admin/source-intake-hub-board.tsx`: بورد ادمین برای مشاهده readiness، مانع‌ها، citationها، منابع و دارایی‌های لازم هر بخش.
- `app/admin/source-intake/page.tsx`: صفحه ادمین noindex برای مدیریت آمادگی پژوهشی محتوا.
- `app/api/admin/source-intake/route.ts`: API محافظت‌شده برای مصرف CMS، QA یا automation آینده.
- `lib/global-growth-audit.ts`: اتصال امتیاز اعتماد پژوهشی به Source Intake Hub.
- `components/admin/admin-shell.tsx`: لینک «ورود منابع» در سایدبار ادمین.
- `lib/content.ts`: اضافه شدن `/admin/source-intake` به route map پروژه.

## Latest Release Handoff Files

- `docs/release-handoff-2026-06-20.md`: وضعیت نهایی release، راه‌اندازی، deploy، smoke test و مسئولیت‌های تیم‌ها.
- `docs/codex-github-final-prompt.md`: متن کامل آماده برای چت GitHub/Vercel.
- `docs/codex-github-chat-message.md`: نسخه کوتاه پیام deploy.
- `components/mobile-navigation.tsx`: منوی موبایل route-first.
- `components/avesta-section-explorer.tsx`: فیلتر نیت مطالعه پورتال اوستا.
- `components/avesta-chapter-atlas.tsx`: جستجو و فیلتر مفهومی فصل‌ها.
- `components/search-panel.tsx`: فیلتر بخش، فروشگاه و deep-link جستجو.
