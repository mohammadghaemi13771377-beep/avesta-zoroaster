# پیام نهایی برای Codex GitHub اوستا

این متن را در چت GitHub/Vercel پروژه AVESTA-ZOROASTER بفرستید تا پروژه از روی بسته آماده، روی GitHub به‌روزرسانی و deploy جدید Vercel ساخته شود.

```txt
سلام. لطفاً پروژه AVESTA-ZOROASTER را با آخرین بسته تحویل Codex به‌روزرسانی کن و deploy جدید Vercel بده.

هدف:
آخرین نسخه پروژه شامل طراحی سینمایی، routeهای اصلی، ادمین، خروجی محتوا، مدیریت دارایی‌ها، publish pipeline، media/storage readiness و مستندات کامل است. باید روی GitHub commit/push شود و Vercel build جدید بگیرد.

فایل‌های تحویل:
- avesta-zoroaster-source.zip
- avesta-zoroaster-full-code.txt
- README.md
- DELIVERY.md
- docs/github-vercel-update-note.md
- docs/file-manifest.md

روش اجرا:
1. فایل avesta-zoroaster-source.zip را به‌عنوان سورس اصلی پروژه باز کن.
2. همه فایل‌ها و پوشه‌های داخل zip را روی repo فعلی AVESTA-ZOROASTER اعمال کن.
3. node_modules و .next را commit نکن.
4. فایل‌های public/images، public/audio، public/library، public/video و docs را حفظ کن.
5. اگر conflict وجود داشت، نسخه داخل zip را منبع آخر بدان، مگر اینکه در repo production فایل env یا config محرمانه وجود داشته باشد.
6. .env.example را نگه دار و هیچ secret واقعی را commit نکن.

چک‌های لازم قبل از commit:
npm install
npm run db:generate
npm run build

اگر TypeScript یا build خطا داد:
- خطا را دقیق بررسی کن.
- routeهای جدید admin را نشکن.
- public assetها و مسیرهای image را حذف نکن.

ویژگی‌های مهمی که باید بعد از update حفظ شوند:
- Homepage سینمایی و RTL
- /avesta و صفحات داخلی اوستا
- /avesta/paths و /avesta/paths/[id]
- /admin
- /admin/content-production-readiness
- /admin/content-export
- /admin/asset-operations
- /admin/publish-pipeline
- /admin/deployment-readiness
- /admin/exhibitions
- /admin/avesta-study-paths
- /sitemap.xml
- /robots.txt

APIهای مهم:
- /api/admin/content-export
- /api/admin/asset-operations
- /api/admin/publish-pipeline
- /api/admin/content-production-readiness
- /api/avesta/study-paths
- /api/avesta/[section]/[chapter]

آخرین verification از Codex:
- tsc --noEmit: passed
- next build: passed
- static pages: 280/280
- missing image assets: none
- mojibake check: none

Suggested commit:
feat: add publish pipeline and asset operations

بعد از commit:
1. push کن به branch متصل به Vercel.
2. deploy جدید Vercel را اجرا/بررسی کن.
3. لینک production یا preview را بده.
4. routeهای زیر را smoke test کن:
   /
   /avesta
   /gathas
   /zoroaster
   /search
   /dictionary
   /articles
   /library
   /media
   /exhibitions
   /shop
   /admin
   /admin/content-export
   /admin/asset-operations
   /admin/publish-pipeline
   /admin/deployment-readiness
   /sitemap.xml
   /robots.txt

خروجی مورد انتظار:
- GitHub repo updated
- commit hash
- Vercel deployment URL
- build status
- اگر build fail شد، علت و patch پیشنهادی را بده.
```

## نکته

فایل `avesta-zoroaster-full-code.txt` برای بازبینی متنی کل کد است، اما تصویرها و فایل‌های binary داخل آن نیستند. برای deploy واقعی باید از `avesta-zoroaster-source.zip` استفاده شود، چون assetهای `public` داخل zip هستند.
