# قرارداد محتوای پنل مدیریت

پنل مدیریت AVESTA-ZOROASTER باید همه محتوای اصلی را از یک endpoint واحد ذخیره کند:

`/api/admin/content`

## GET

قرارداد و فیلدهای مورد نیاز را برمی‌گرداند.

```http
GET /api/admin/content
```

## POST

payload را اعتبارسنجی می‌کند. اگر دیتابیس آماده باشد با Prisma ذخیره می‌کند، و اگر آماده نباشد در حالت `dry-run` یا `validated` پاسخ می‌دهد.

```http
POST /api/admin/content
Content-Type: application/json
```

## resourceهای پشتیبانی‌شده

- `avestaSection`
- `avestaChapter`
- `avestaVerse`
- `article`
- `glossaryTerm`
- `libraryItem`

## نمونه بند اوستا

```json
{
  "resource": "avestaVerse",
  "locale": "FA",
  "sectionSlug": "yasna",
  "chapterSlug": "ha-1",
  "order": 1,
  "coverImage": "/images/ai/yasna-verse-1.jpg",
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

## نمونه فصل

```json
{
  "resource": "avestaChapter",
  "locale": "FA",
  "title": "یسنا ۱",
  "slug": "ha-1",
  "sectionSlug": "yasna",
  "order": 1,
  "summary": "نمونه مسیر مطالعه یسنا با متن، ترجمه و تحلیل."
}
```

## نمونه بخش اوستا

```json
{
  "resource": "avestaSection",
  "locale": "FA",
  "title": "یسنا",
  "slug": "yasna",
  "summary": "آیین نیایش و آتش مقدس؛ یکی از مهم‌ترین بخش‌های اوستا.",
  "themeColor": "#D6A84F",
  "coverImage": "/images/ai/yasna-cover.jpg"
}
```

## نکته توسعه

این contract عمداً ساده نگه داشته شده تا در مرحله بعدی به فرم‌های جداگانه، ویرایشگر rich text، upload واقعی تصویر/صوت و workflow انتشار وصل شود.
