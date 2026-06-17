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
- `avestaChapterGuide`
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
  "coverImage": "/images/ai/yasna-cover.png",
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

## نمونه راهنمای تصویری فصل

```json
{
  "resource": "avestaChapterGuide",
  "locale": "FA",
  "title": "چرا آب در اوستا مقدس بود؟",
  "slug": "aban-yasht-visual-guide",
  "sectionSlug": "yashts",
  "chapterSlug": "aban-yasht",
  "summary": "راهنمای تصویری آبان یشت برای hero، قاب‌های روایی، پیام امروزی و تمرین‌ها.",
  "coverImage": "/images/ai/yashts-cover.png",
  "accent": "#9EE7F2",
  "tone": "water",
  "fields": {
    "question": "آبان یشت چگونه آب را از عنصر طبیعی به نشانه زندگی تبدیل می‌کند؟",
    "subtitle": "آب در این صفحه به صورت یک روایت تصویری دیده می‌شود: پاکی، جریان جهان و پیام اخلاقی امروز.",
    "leadQuote": "اگر آب پاک بماند، زندگی جریان دارد.",
    "curatorNote": "این صفحه بر اساس reference-water-anahita طراحی شده است.",
    "ethicalMessage": "پاکی طبیعت با پاکی ذهن و کردار انسان جدا نیست.",
    "todayPractice": "[\"یک رفتار کوچک برای صرفه‌جویی آب انجام بده.\",\"یک دقیقه کنار تصویر آب مکث کن.\",\"یک جمله درباره پاکی ذهن بنویس.\"]",
    "sidePanels": "[{\"title\":\"نگهبان آب‌ها\",\"body\":\"جایگاه آب در زندگی و آیین.\",\"icon\":\"water\"}]",
    "storyPanels": "[{\"title\":\"آب در اوستا\",\"body\":\"ماده زندگی و نشانه پاکی.\",\"image\":\"/images/ai/yashts-cover.png\"}]"
  }
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
  "coverImage": "/images/ai/yasna-cover.png"
}
```

## نکته توسعه

این contract عمداً ساده نگه داشته شده تا در مرحله بعدی به فرم‌های جداگانه، ویرایشگر rich text، upload واقعی تصویر/صوت و workflow انتشار وصل شود.
