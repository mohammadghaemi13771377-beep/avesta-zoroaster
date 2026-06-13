# برنامه رسانه و تصویرسازی AI

هدف این بخش این است که AVESTA-ZOROASTER فقط متن نباشد. هر بخش اوستا، هر بند مهم، مقاله‌ها و واژه‌نامه‌ها باید بتوانند تصویر، صوت، ویدیو یا prompt اختصاصی داشته باشند.

## مدل دیتابیس

مدل `MediaAsset` در Prisma اضافه شده است.

فیلدهای مهم:

- `title`
- `slug`
- `type`
- `category`
- `description`
- `url`
- `thumbnail`
- `prompt`
- `mood`
- `accent`
- `sectionSlug`
- `chapterSlug`
- `verseOrder`
- `status`

## API

```http
GET /api/media
POST /api/media
GET /api/media/prompts
GET /api/admin/upload
POST /api/admin/upload
```

`GET` فهرست رسانه‌ها را از دیتابیس می‌خواند و اگر دیتابیس آماده نباشد از نمونه‌های محلی استفاده می‌کند.

`POST` payload رسانه را اعتبارسنجی می‌کند و در صورت آماده بودن دیتابیس در `MediaAsset` ذخیره می‌کند.

`/api/admin/upload` فایل واقعی را در محیط توسعه داخل `public` ذخیره می‌کند و URL قابل استفاده در فرم MediaAsset برمی‌گرداند.

`/api/media/prompts` کتابخانه پرامپت‌های آماده برای تولید تصویر AI را برمی‌گرداند.

## نمونه payload

```json
{
  "title": "آتش مقدس یسنا",
  "slug": "yasna-sacred-fire",
  "type": "AI Image",
  "category": "یسنا",
  "description": "تصویرسازی سینمایی برای فضای یسنا با آتش آرام و نور طلایی.",
  "prompt": "Cinematic ancient Persian temple at sunrise, sacred fire altar, Avestan script mist, gold and deep navy palette",
  "mood": "طلایی، آیینی، سینمایی",
  "accent": "#D6A84F",
  "sectionSlug": "yasna",
  "chapterSlug": "ha-1",
  "verseOrder": 1,
  "status": "DRAFT"
}
```

## مسیر توسعه بعدی

1. اتصال upload به storage دائمی در deploy.
2. ساخت thumbnail خودکار برای تصویر و ویدیو.
3. افزودن وضعیت انتشار: draft، ready، published، archived.
4. اتصال prompt library به سرویس تولید تصویر در آینده.

## اتصال به بندهای اوستا

صفحه بند اوستا اکنون از این تابع استفاده می‌کند:

```ts
getMediaAssetsForVerse(sectionSlug, chapterSlug, verseOrder)
```

این تابع ابتدا در `MediaAsset` دنبال رسانه‌هایی می‌گردد که با بخش، فصل و شماره بند یکی باشند. اگر دیتابیس آماده نباشد یا asset مرتبط پیدا نشود، از نمونه‌های محلی مناسب همان بخش استفاده می‌کند.

API بند هم رسانه مرتبط را برمی‌گرداند:

```http
GET /api/avesta/yasna/ha-1/verse-1
```

پاسخ شامل `verse` و `media` است تا نسخه وب، اپ موبایل یا هر کلاینت دیگر بتواند متن و تجربه بصری/صوتی را با هم نمایش دهد.
