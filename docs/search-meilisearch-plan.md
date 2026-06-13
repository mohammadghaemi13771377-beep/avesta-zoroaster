# معماری جستجو و Meilisearch

هدف این بخش ساخت جستجوی سریع در کل جهان AVESTA-ZOROASTER است:

- متن اوستا
- ترجمه‌ها
- بازنویسی ساده
- تحلیل مفهومی
- مقاله‌ها
- واژه‌نامه
- کتابخانه
- رسانه
- هاب یکتاپرستی

## indexها

### `avesta_verses`

برای بندهای اوستا.

- `title`
- `excerpt`
- `section`
- `category`
- `href`

### `articles`

برای مقاله‌های سئو.

- `title`
- `excerpt`
- `category`
- `tags`
- `href`

### `glossary`

برای واژه‌نامه اوستایی.

- `title`
- `excerpt`
- `category`
- `href`

### `library`

برای PDF، کتاب، مقاله و آرشیو.

### `media`

برای تصویر AI، صوت، ویدیو و promptها.

## endpointهای فعلی

- `GET /api/search?q=اشا&type=article&category=مفاهیم`
- `GET /api/search/indexes`
- `POST /api/search/sync`

فعلاً sync در حالت dry-run است. در نسخه واقعی باید:

1. داده‌ها از Prisma خوانده شوند.
2. هر مدل به `SearchDocument` تبدیل شود.
3. indexها در Meilisearch ساخته یا به‌روزرسانی شوند.
4. documents با batch upload ارسال شوند.
5. فیلترها و searchable attributes ست شوند.

## env پیشنهادی

```env
MEILISEARCH_HOST=http://127.0.0.1:7700
MEILISEARCH_API_KEY=change-me
```

## اولویت‌ها

1. جستجو در متن اوستا و ترجمه
2. جستجو در واژه‌نامه
3. جستجو در مقاله‌ها
4. فیلتر بر اساس نوع محتوا و بخش اوستا
5. پیشنهاد نتیجه‌های مرتبط در صفحه مطالعه
