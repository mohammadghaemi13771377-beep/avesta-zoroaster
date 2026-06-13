# مدل داده پروفایل و ادامه مطالعه

این سند توضیح می‌دهد پروفایل کاربر در AVESTA-ZOROASTER چطور از حالت نمونه به حالت دیتابیسی تبدیل می‌شود.

## مدل‌ها

### User

کاربر اصلی سایت.

- `email`
- `displayName`
- `role`
- `avatarUrl`

### ReadingPreference

تنظیمات مطالعه کاربر.

- حالت مطالعه: شب، سپیا، روشن
- اندازه فونت
- فعال بودن صوت
- زبان

### ReadingProgress

ادامه مطالعه.

- لینک مقصد
- عنوان مقصد
- درصد پیشرفت
- اتصال اختیاری به `AvestaVerse`
- زمان آخرین مطالعه

### Bookmark

ذخیره هر نوع محتوای قابل برگشت.

- بند اوستا
- مقاله
- واژه‌نامه
- هاب یکتاپرستی
- آیتم کتابخانه
- رسانه

## APIهای نمونه

- `GET /api/profile`
- `GET /api/profile/bookmarks`
- `POST /api/profile/bookmarks`
- `GET /api/profile/progress`
- `POST /api/profile/progress`

## مسیر تبدیل به نسخه واقعی

1. اضافه کردن احراز هویت
2. دریافت `userId` از session
3. جایگزینی `profileSnapshot` با queryهای Prisma
4. ذخیره bookmark با unique key روی `userId + targetUrl`
5. ذخیره progress با unique key روی `userId + targetUrl`
6. خواندن preference کاربر هنگام باز کردن صفحه مطالعه
