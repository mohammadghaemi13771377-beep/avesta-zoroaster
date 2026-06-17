# Admin Content and Asset Management

این سند برای فاز طراحی و محتوا اضافه شده است تا تیم فنی بداند مدیریت آینده محتوا و تصویر چطور باید ادامه پیدا کند.

## مسیرهای فعلی دارایی

- تصویرهای AI و heroها: `public/images/ai`
- لوگو: `public/images/avesta-zoroaster-logo.png`
- صوت آینده: `public/audio`
- PDF و فایل کتابخانه: `public/library`
- ویدیو آینده: `public/video`

## دارایی‌های اضافه‌شده در این فاز

- `home-hero.png`
- `avesta-portal.png`
- `gathas-cover.png`
- `zoroaster-cover.png`
- `zoroastrianism-cover.png`
- `monotheism-cover.png`
- `dictionary-cover.png`
- `articles-cover.png`
- `library-cover.png`
- `media-cover.png`
- `exhibitions-cover.png`
- `shop-cover.png`
- `yasna-cover.png`
- `vendidad-cover.png`
- `yashts-cover.png`
- `khordeh-avesta-cover.png`
- `hats-cover.png`
- `product-book.png`
- `product-mug.png`
- `product-shirt.png`
- `product-statue.png`

## قرارداد مدل‌ها

API قرارداد مدل‌های محتوایی:

```txt
/api/admin/content-models
```

این API مدل‌های قابل مدیریت آینده را برمی‌گرداند:

- مقاله
- بند اوستا
- راهنمای تصویری فصل اوستا
- رسانه
- نمایشگاه
- محصول فروشگاه

## استراتژی production

نسخه فعلی با fallback محلی کار می‌کند تا سایت نشکند. در production:

1. تصویرها از `public/images/ai` به S3/R2/Cloudinary منتقل شوند.
2. فیلدهای `coverImage`, `heroImage`, `thumbnail`, `imageSrc`, `audioUrl` در دیتابیس ذخیره شوند.
3. APIهای ادمین از dry-run به CRUD کامل با auth و role تبدیل شوند.
4. upload validation اضافه شود: نوع فایل، حجم، ابعاد، نام امن و اسکن امنیتی.
5. هر صفحه public از مقدار دیتابیس استفاده کند و در صورت نبودن مقدار، fallback local را نگه دارد.

## راهنمای تصویری فصل‌ها

صفحه‌های جدید chapter و verse از داده‌های `lib/avesta-chapter-guides.ts` استفاده می‌کنند. در production این داده بهتر است به یک collection مستقل منتقل شود:

- `sectionSlug`
- `chapterSlug`
- `title`
- `question`
- `subtitle`
- `coverImage`
- `accent`
- `tone`
- `leadQuote`
- `sidePanels`
- `storyPanels`
- `todayPractice`
- `curatorNote`

این مدل در `/api/admin/content-models` با id زیر معرفی شده است:

```txt
avesta-chapter-guide
```

## مسیرهای مهم ادمین

- `/admin/media`
- `/admin/visual-assets`
- `/admin/exhibitions`
- `/admin/articles`
- `/admin/avesta`
- `/admin/library`
- `/admin/shop`
- `/admin/deployment-readiness`

## نکته طراحی

در UI عمومی نباید مسیرهای خالی یا placeholder تصویری استفاده شود. هر hero، کارت نمایشگاه، کارت رسانه و محصول باید یا تصویر واقعی local داشته باشد یا fallback قابل ارائه از `public/images/ai`.
