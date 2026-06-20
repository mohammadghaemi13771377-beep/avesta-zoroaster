سلام. لطفاً آخرین فایل `avesta-zoroaster-source.zip` را روی repo فعلی AVESTA-ZOROASTER اعمال کن، تغییرها را commit و push کن و deploy جدید Vercel بده.

این release شامل این تغییرهای اصلی است:

- هدر خلوت و کتابی با پنج مسیر اصلی و منوی «کاوش»
- منوی موبایل با مسیرهای مستقل سایت و بخش‌های اوستا
- صفحه خانه خلوت‌تر و route-first
- فیلتر نیت مطالعه در `/avesta`
- جستجو و فیلتر مفهومی فصل‌ها در صفحه‌های داخلی اوستا
- CTAهای واقعی برای شروع مطالعه، جستجوی همان بخش و منابع پژوهشی
- فیلترهای پیشرفته در کتابخانه و مقاله‌ها
- جستجوی سراسری با فیلتر فروشگاه، بخش و deep-linkهای section-aware
- Research Source Intake، Localization Hub و Global Growth Audit در ادمین

قبل از commit اجرا کن:

```bash
npm install
npm run db:generate
npx tsc --noEmit
npm run build
```

تایید شده در نسخه تحویل: TypeScript بدون خطا و Next.js build با `294/294` صفحه موفق است.

Suggested commit:

```txt
feat: polish navigation, search and Avesta reading paths
```

بعد از push، Vercel deploy را اجرا و این‌ها را گزارش کن: commit hash، branch، preview URL، production URL، build status و env/integrationهای لازم برای production.

برای جزئیات کامل از این فایل‌ها استفاده کن:

- `docs/codex-github-final-prompt.md`
- `docs/release-handoff-2026-06-20.md`
- `docs/github-vercel-update-note.md`
