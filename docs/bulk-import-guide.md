# راهنمای ورود دسته‌ای محتوا

وقتی حجم زیادی متن، تصویر، صوت یا مقاله آماده باشد، ورود تک‌تک از فرم‌ها زمان‌بر می‌شود. برای همین پروژه یک مسیر ورود دسته‌ای دارد.

## صفحه ادمین

```txt
/admin/import
```

در این صفحه می‌توانی یک بسته JSON را paste کنی و ابتدا در حالت `dryRun` بررسی بگیری.

## API

```http
GET /api/admin/import
POST /api/admin/import
GET /api/admin/import/{id}
```

`GET` نمونه قالب و 20 import اخیر را برمی‌گرداند.

`POST` بسته را بررسی یا import می‌کند. اگر دیتابیس وصل باشد، هر اجرا در جدول `ImportJob` ذخیره می‌شود.

`GET /api/admin/import/{id}` جزئیات کامل یک اجرا، شامل `payload` و `result` را برمی‌گرداند.

## قالب کلی

```json
{
  "dryRun": true,
  "name": "Yasna starter content",
  "content": [],
  "media": []
}
```

## نمونه بند اوستا

```json
{
  "resource": "avestaVerse",
  "locale": "FA",
  "sectionSlug": "yasna",
  "chapterSlug": "ha-1",
  "order": 1,
  "coverImage": "/images/ai/yasna-ha-1-verse-1.jpg",
  "audioUrl": "/audio/yasna-verse-1.mp3",
  "fields": {
    "originalText": "متن اصلی اوستایی",
    "transliteration": "Sample transliteration",
    "classicalTranslation": "ترجمه کلاسیک",
    "simpleRewrite": "بازنویسی ساده",
    "modernInterpretation": "تحلیل مفهومی",
    "ethicalMessage": "پیام اخلاقی"
  }
}
```

## نمونه رسانه

```json
{
  "title": "آتش مقدس یسنا",
  "slug": "yasna-ha-1-verse-1",
  "type": "AI Image",
  "category": "یسنا",
  "description": "تصویر مرتبط با بند نمونه یسنا.",
  "url": "/images/ai/yasna-ha-1-verse-1.jpg",
  "thumbnail": "/images/ai/yasna-ha-1-verse-1.jpg",
  "sectionSlug": "yasna",
  "chapterSlug": "ha-1",
  "verseOrder": 1,
  "status": "DRAFT"
}
```

## روند پیشنهادی

1. فایل‌ها را با `/admin/media` آپلود کن.
2. URL خروجی را در بسته JSON بگذار.
3. `dryRun` را `true` نگه دار و بررسی بگیر.
4. وقتی خروجی درست بود، `dryRun` را `false` کن.
5. بعد از اتصال دیتابیس واقعی، بسته‌ها مستقیم در PostgreSQL ذخیره می‌شوند و تاریخچه اجرا در `ImportJob` می‌ماند.
