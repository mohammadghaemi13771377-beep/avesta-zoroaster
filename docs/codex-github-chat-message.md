سلام. لطفاً آخرین فایل `avesta-zoroaster-source.zip` را روی repo فعلی AVESTA-ZOROASTER اعمال کن، تغییرها را commit و push کن و deploy جدید Vercel بده.

این release شامل هدر خلوت با فروشگاه، منوی موبایل جمع‌شونده، نور محیطی روشن‌تر، 404 برنددار، coverهای واقعی خانه، بوکمارک/share/audio برای بندهای اوستا، نمایشگاه‌های deep-linkable، بهبود تجربه رسانه و فرم کامل‌تر upload ادمین است.

قبل از commit اجرا کن:

```bash
npm install
npm run db:generate
npx tsc --noEmit
npm run build
```

نتیجه تاییدشده: TypeScript بدون خطا و Next.js build با `294/294` صفحه موفق است.

Suggested commit:

```txt
feat: refine luminous UX and storefront
```

بعد از push، commit hash، branch، Vercel preview URL، production URL، build status و env/integrationهای باقی‌مانده را گزارش بده.

راهنمای کامل: `docs/codex-github-final-prompt.md`
