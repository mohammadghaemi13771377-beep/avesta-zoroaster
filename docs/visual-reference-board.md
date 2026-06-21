# AVESTA-ZOROASTER Visual Reference Board

این سند برای تیم طراحی، محصول و محتواست تا مسیر تصویری صفحه‌های داخلی اوستا روشن بماند.

## Reference Assets

فایل‌های مرجع داخل پروژه قرار گرفته‌اند:

- `/public/images/references/reference-water-anahita.png`
- `/public/images/references/reference-soul-chinvat.png`
- `/public/images/references/reference-vendidad-first.png`
- `/public/images/references/reference-vendidad-second.png`
- `/public/images/references/reference-atashkadeh.png`
- `/public/images/references/reference-silence-mind.png`
- `/public/images/references/reference-hope-despair.png`
- `/public/images/references/reference-home-ui.png`
- `/public/images/references/reference-logo.png`

این تصاویر برای جهت هنری هستند، نه لزوماً برای انتشار مستقیم در UI عمومی.

## UI Reference Expansion - 2026-06-21

رفرنس‌های تازه در مسیر زیر نگه‌داری می‌شوند:

```txt
public/images/references/2026-06-21-ui/
```

این برد جدید، زبان محصولی مرحله بعد را مشخص می‌کند:

- layout سه‌ستونه برای صفحه‌های مطالعه: فهرست بخش، محتوای اصلی و پنل یادداشت/منبع
- کارت‌های رسانه، کتابخانه و مسیر یادگیری با تصویر واقعی، برچسب نوع و CTA واضح
- داشبورد شخصی با XP، نشان، مأموریت روزانه، ادامه مطالعه و نمودار پیشرفت
- سایدبارهای کم‌ارتفاع و متراکم برای desktop؛ ناوبری پایین برای mobile
- استفاده از طلایی برای اقدام و وضعیت فعال، نه برای همه عناصر هم‌زمان
- تم روشن واقعی با سفید گرم، parchment، طلایی تیره و سایه‌های کم‌عمق؛ نه صرفاً نسخه روشن سرمه‌ای
- بخش‌های اصلی به‌جای landing marketing، مانند ابزار مطالعه و کشف محتوا طراحی شوند

این رفرنس‌ها فقط برای هنر نیستند: باید در مسیرهای `/avesta`، صفحه بند، `/dashboard`، `/library`، `/media` و `/shop` به‌تدریج به الگوی UI قابل استفاده تبدیل شوند.

## Design Direction

صفحه‌های داخلی اوستا باید شبیه یک پوستر آموزشی سینمایی و قابل تعامل باشند:

- تصویر مرکزی بزرگ با نور کنترل‌شده
- قاب‌های کناری با تیتر کوتاه و متن قابل فهم
- کارت پیام امروزی با حس کاغذ/طومار روشن
- کارت تمرین روزانه برای تبدیل متن به تجربه
- ترکیب طلایی، سرمه‌ای، آبی آب، آتش گرم و سفید نورانی
- خروج از تاریکی یک‌دست با halo، glow، parchment و آسمان روشن

## Current Implementation

نسخه فعلی یک لایه جدید به صفحه‌های `/avesta/[section]` اضافه می‌کند:

- داده‌ها: `lib/avesta-visual-guides.ts`
- UI: `components/avesta-poster-experience.tsx`
- استایل: کلاس‌های `poster-*` در `app/globals.css`

برای هر بخش، این موارد آماده شده‌اند:

- `yasna`: آتشکده، نیایش، روشنایی
- `gathas`: سکوت ذهن، خرد، انتخاب
- `visperad`: آیین جمعی و ردان
- `vendidad`: پاکی، داوری، پل چینود
- `yashts`: آب، طبیعت، نیروهای نگهبان
- `khordeh-avesta`: نیایش روزانه و آرامش
- `hats`: نقشه خواندن و مسیر متن

## Future Expansion

برای هر یشت، فرگرد، هات یا نیایش می‌توان همین الگو را به سطح پایین‌تر برد:

- `sectionSlug`
- `chapterSlug`
- `verseSlug`
- `coverImage`
- `sidePanels`
- `storyPanels`
- `ethicalMessage`
- `todayPractice`

در فاز بعدی، پنل ادمین باید بتواند همین داده‌ها را مثل یک بلوک محتوایی مدیریت کند.
