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
2. node_modules، .next، .env و secretهای واقعی را commit نکن.
3. public/images، public/audio، public/library، public/video و همه docs را نگه دار.
4. تغییرهای فعلی کاربر را revert نکن؛ با آن‌ها merge کن.
5. اگر conflict داری، اول ساختار app، components، lib، prisma و public را حفظ کن و conflict را patch کن.

خلاصه آخرین تغییرها:
- هدر عمومی خلوت و کتابی شد: خانه، اوستا، زرتشت، گات‌ها، کتابخانه و منوی کاوش.
- منوی موبایل جدید برای مسیرهای اصلی، بخش‌های اوستا و کاوش بیشتر اضافه شد.
- صفحه خانه به gateway خلوت تبدیل شد؛ CTAهای اصلی به route مستقل می‌روند.
- /avesta فیلتر «نیت مطالعه» برای آغاز آشنایی، نیایش و مطالعه عمیق دارد.
- فهرست فصل‌های هر بخش اوستا جستجو و فیلتر مفهومی دارد.
- دکمه‌های hero بخش‌های اوستا حالا به شروع مطالعه، جستجوی همان بخش و منابع پژوهشی وصل‌اند.
- کتابخانه فیلتر نوع، موضوع، زبان و پاک‌سازی فیلتر دارد.
- مقاله‌ها فیلتر موضوع، برچسب، ترتیب مطالعه و پاک‌سازی دارند.
- /search فیلتر نوع، دسته، بخش و فروشگاه دارد و deep-linkهای section-aware کار می‌کنند.
- Research Source Intake، Localization Hub و Global Growth Audit در ادمین آماده‌اند.
- assetهای local و fallbackهای محتوا حفظ شده‌اند تا بدون database production هم build نشکند.

فایل‌های کلیدی این release:
- components/header.tsx
- components/mobile-navigation.tsx
- components/avesta-section-explorer.tsx
- components/avesta-chapter-atlas.tsx
- components/resource-explorer.tsx
- components/articles-explorer.tsx
- components/search-panel.tsx
- app/page.tsx
- app/avesta/page.tsx
- app/avesta/[section]/page.tsx
- app/search/page.tsx
- lib/content.ts
- lib/source-intake-hub.ts

قبل از commit اجرا کن:
npm install
npm run db:generate
npx tsc --noEmit
npm run build

نتیجه تاییدشده در بسته Codex:
- TypeScript بدون خطا
- Next.js build موفق
- 294/294 صفحه استاتیک تولید شده

اگر build خطا داد:
- routeهای جدید، public assetها یا fallbackهای local را حذف نکن.
- secret واقعی را وارد git نکن.
- خطا را با patch محدود حل کن و دوباره build بگیر.

Suggested commit:
feat: polish navigation, search and Avesta reading paths

بعد از push:
1. Vercel production deployment را اجرا یا بررسی کن.
2. لینک preview و لینک production را گزارش بده.
3. این routeها را smoke test کن:
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

خروجی مورد انتظار:
- commit hash
- branch name
- Vercel preview URL
- Vercel production URL
- build status
- هر env یا integration که هنوز برای production لازم است
```

نکته: `avesta-zoroaster-full-code.txt` برای مرور متنی کد است و فایل‌های binary را شامل نمی‌شود؛ برای deploy واقعی از `avesta-zoroaster-source.zip` استفاده شود.
