# پیام آماده برای چت «GitHub اوستا»

این متن را کامل در چت Codex مربوط به GitHub/Vercel پروژه AVESTA-ZOROASTER بفرست.

```txt
سلام. این پروژه AVESTA-ZOROASTER است و باید از همین فایل‌های آماده داخل workspace به GitHub منتقل شود و بعد روی Vercel deploy شود.

مسیر پروژه:
C:\Users\m.ghaemi\Documents\Codex\2026-05-25\files-mentioned-by-the-user-chatgpt

فایل‌های اصلی تحویل:
1. سورس کامل پروژه:
C:\Users\m.ghaemi\Documents\Codex\2026-05-25\files-mentioned-by-the-user-chatgpt\avesta-zoroaster-source.zip

2. فول‌کد متنی کامل:
C:\Users\m.ghaemi\Documents\Codex\2026-05-25\files-mentioned-by-the-user-chatgpt\avesta-zoroaster-full-code.txt

3. راهنمای اصلی:
C:\Users\m.ghaemi\Documents\Codex\2026-05-25\files-mentioned-by-the-user-chatgpt\README.md

4. بسته تحویل:
C:\Users\m.ghaemi\Documents\Codex\2026-05-25\files-mentioned-by-the-user-chatgpt\DELIVERY.md

5. سند نهایی GitHub/Vercel:
C:\Users\m.ghaemi\Documents\Codex\2026-05-25\files-mentioned-by-the-user-chatgpt\docs\final-github-vercel-team-handoff.md

6. راهنمای اتصال GitHub و Vercel:
C:\Users\m.ghaemi\Documents\Codex\2026-05-25\files-mentioned-by-the-user-chatgpt\docs\github-vercel-deploy.md

کاری که باید انجام بدهی:

1. داخل مسیر پروژه برو.

2. اگر لازم بود zip را باز نکن، چون سورس کامل همین الان در پوشه پروژه وجود دارد. zip فقط برای دانلود/آرشیو است.

3. وضعیت git را بررسی کن:
git status

4. اگر repo هنوز ساخته نشده:
git init
git branch -M main
git add .
git commit -m "Initial AVESTA-ZOROASTER handoff"

5. در GitHub یک repository بساز:
Repository name: avesta-zoroaster
Visibility: private تا قبل از launch عمومی
README/gitignore/license را در GitHub اضافه نکن، چون پروژه خودش فایل دارد.

6. remote را وصل کن:
git remote add origin https://github.com/YOUR_USERNAME/avesta-zoroaster.git
git push -u origin main

اگر remote قبلاً وجود داشت:
git remote -v
git remote set-url origin https://github.com/YOUR_USERNAME/avesta-zoroaster.git
git push -u origin main

7. بعد در Vercel:
- Add New Project
- repo: avesta-zoroaster
- Framework: Next.js
- Install command: npm install
- Build command: npm run build

8. Environment Variables در Vercel را از روی فایل .env.example بساز.
حداقل production:
NEXT_PUBLIC_SITE_URL=https://avesta-zoroaster.com
NEXT_PUBLIC_SITE_NAME=AVESTA-ZOROASTER
DATABASE_URL=postgresql://...
MEILISEARCH_HOST=https://...
MEILISEARCH_API_KEY=...
SESSION_SECRET=long-random-production-secret
ADMIN_EMAIL=admin@avesta-zoroaster.com
UPLOAD_STORAGE=s3-or-r2-or-cloudinary
PUBLIC_UPLOAD_BASE_URL=https://...

9. دامنه:
دامنه avesta-zoroaster.com را در Vercel اضافه کن و DNS را طبق رکوردهای Vercel تنظیم کن.

10. قبل از deploy نهایی یا بعد از اولین deploy این مسیرها را smoke test کن:
/
/avesta
/avesta/yasna
/search
/dictionary
/articles
/library
/media
/exhibitions
/shop
/admin
/admin/go-live
/admin/deployment-readiness
/admin/exhibitions
/admin/route-visibility
/admin/avesta-access-control
/sitemap.xml
/robots.txt

11. نکته مهم:
در محیط قبلی Codex، npm روی PATH نبود، برای همین build کامل Next.js همانجا اجرا نشده بود. در محیط GitHub/Vercel یا سیستم فنی باید این‌ها اجرا شوند:
npm install
npm run db:generate
npm run build

12. این پروژه یک سایت ساده نیست. هدف:
ساخت «جهان دیجیتال سینمایی اوستا، زرتشت، گات‌ها، یکتاپرستی و خرد ایران باستان» است.
پس موقع deploy، فایل‌ها و مسیرهای زیر را حفظ کن:
- app
- components
- lib
- prisma
- public
- docs
- middleware.ts
- package.json
- next.config.mjs
- tailwind.config.ts
- tsconfig.json
- vercel.json

13. بعد از push و deploy، لینک GitHub repo و لینک Vercel preview/production را به من بده.
```

## خلاصه کوتاه برای همان چت

اگر خواستی نسخه کوتاه‌تر بفرستی:

```txt
این پروژه آماده GitHub/Vercel است. مسیر پروژه:
C:\Users\m.ghaemi\Documents\Codex\2026-05-25\files-mentioned-by-the-user-chatgpt

لطفاً همین پوشه را به repo جدید GitHub با نام avesta-zoroaster push کن، سپس آن را به Vercel با Framework=Next.js وصل کن.
فایل‌های راهنما:
README.md
DELIVERY.md
docs\github-vercel-deploy.md
docs\final-github-vercel-team-handoff.md

فایل‌های دانلود/آرشیو:
avesta-zoroaster-source.zip
avesta-zoroaster-full-code.txt

بعد از deploy این مسیرها را smoke test کن:
/, /avesta, /search, /exhibitions, /admin, /admin/deployment-readiness, /sitemap.xml, /robots.txt
```
