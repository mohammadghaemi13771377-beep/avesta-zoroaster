# برنامه احراز هویت

نسخه فعلی auth فقط demo است و برای نمایش مسیر کاربری استفاده می‌شود. این نسخه cookie نشست می‌سازد و مسیرهای `/profile`، `/admin` و مسیرهای کنترل‌شده اوستا را با middleware محافظت می‌کند.

## مسیرهای فعلی

- `GET /login`
- `GET /register`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `GET /api/auth/session`

## تبدیل به نسخه تولید

1. افزودن hash رمز با `bcrypt` یا `argon2`
2. ذخیره کاربر در مدل `User`
3. ساخت جدول Session یا استفاده از Auth.js
4. اتصال middleware به session واقعی و beta access groupها
5. نقش‌بندی دقیق برای admin و editor
6. محافظت کامل APIهای پنل مدیریت

## نقش‌ها

- `READER`: مطالعه، بوکمارک، ادامه مطالعه
- `EDITOR`: ورود و ویرایش محتوای اوستا و مقاله‌ها
- `ADMIN`: مدیریت کامل محتوا، کاربرها و SEO
