export type ProductCategory = "book" | "mug" | "shirt" | "accessory" | "statue" | "art";

export type ShopProduct = {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  excerpt: string;
  description: string;
  price: number;
  currency: "IRR";
  imageScene: string;
  imageSrc: string;
  badge: string;
  inventoryStatus: "available" | "preorder" | "limited";
  spiritualTheme: string;
  materials: string[];
  seoKeywords: string[];
};

export const productCategories: Array<{ id: "all" | ProductCategory; label: string; description: string }> = [
  { id: "all", label: "همه", description: "کل محصولات فرهنگی و الهام‌گرفته از اوستا" },
  { id: "book", label: "کتاب", description: "کتاب، نسخه مطالعاتی و دفترچه پژوهشی" },
  { id: "mug", label: "ماگ", description: "ماگ‌های مینیمال با شعار و نماد" },
  { id: "shirt", label: "پیراهن", description: "پوشاک فرهنگی با طراحی لوکس" },
  { id: "accessory", label: "اکسسوری", description: "گردنبند، نشان، بوکمارک و هدیه" },
  { id: "statue", label: "مجسمه", description: "مجسمه و دکور الهام‌گرفته از ایران باستان" },
  { id: "art", label: "آرت‌پرینت", description: "پوستر و تصویرسازی سینمایی" },
];

export const shopProducts: ShopProduct[] = [
  {
    id: "product-gathas-book",
    title: "کتاب گات‌ها، نسخه مطالعه روزانه",
    slug: "gathas-daily-study-book",
    category: "book",
    categoryLabel: "کتاب",
    excerpt: "نسخه لوکس برای مطالعه روزانه گات‌ها با جایگاه یادداشت و پیام اخلاقی.",
    description:
      "یک محصول فرهنگی برای کاربرانی که می‌خواهند مسیر مطالعه گات‌ها را در کنار نسخه دیجیتال سایت به شکل فیزیکی دنبال کنند.",
    price: 1250000,
    currency: "IRR",
    imageScene: "scene-scroll",
    imageSrc: "/images/ai/product-book.png",
    badge: "پیشنهادی",
    inventoryStatus: "preorder",
    spiritualTheme: "پندار نیک و خرد روزانه",
    materials: ["جلد سخت", "کاغذ کرم", "طراحی طلایی"],
    seoKeywords: ["کتاب گات‌ها", "اوستا", "زرتشت", "کتاب یکتاپرستی"],
  },
  {
    id: "product-good-thoughts-mug",
    title: "ماگ پندار نیک",
    slug: "good-thoughts-mug",
    category: "mug",
    categoryLabel: "ماگ",
    excerpt: "ماگ سرامیکی تیره با نوشته طلایی پندار نیک، گفتار نیک، کردار نیک.",
    description:
      "یک هدیه روزمره و ساده برای همراهان سایت؛ مناسب میز کار، کتابخانه و لحظه‌های مطالعه.",
    price: 460000,
    currency: "IRR",
    imageScene: "scene-fire",
    imageSrc: "/images/ai/product-mug.png",
    badge: "هدیه محبوب",
    inventoryStatus: "available",
    spiritualTheme: "سه‌گانه اخلاقی زرتشتی",
    materials: ["سرامیک", "چاپ مقاوم", "جعبه هدیه"],
    seoKeywords: ["ماگ زرتشتی", "پندار نیک", "هدیه فرهنگی"],
  },
  {
    id: "product-faravahar-shirt",
    title: "پیراهن فروهر طلایی",
    slug: "golden-faravahar-shirt",
    category: "shirt",
    categoryLabel: "پیراهن",
    excerpt: "تی‌شرت مشکی با نشان فروهر و تایپوگرافی AVESTA-ZOROASTER.",
    description:
      "پوشاک فرهنگی با زبان طراحی مدرن؛ مناسب استفاده روزمره و رویدادهای فرهنگی.",
    price: 890000,
    currency: "IRR",
    imageScene: "scene-portrait",
    imageSrc: "/images/ai/product-shirt.png",
    badge: "طراحی ویژه",
    inventoryStatus: "limited",
    spiritualTheme: "فروهر، انتخاب آگاهانه و روشنایی",
    materials: ["پنبه", "چاپ طلایی", "دوخت تقویت‌شده"],
    seoKeywords: ["پیراهن فروهر", "لباس زرتشتی", "AVESTA ZOROASTER"],
  },
  {
    id: "product-asha-bookmark",
    title: "بوکمارک فلزی اشا",
    slug: "asha-metal-bookmark",
    category: "accessory",
    categoryLabel: "اکسسوری",
    excerpt: "نشان کتاب فلزی با حک واژه اشا و الگوی الهام‌گرفته از تخت جمشید.",
    description:
      "اکسسوری کوچک اما معنادار برای همراهی با کتابخانه دیجیتال و نسخه‌های چاپی آینده.",
    price: 280000,
    currency: "IRR",
    imageScene: "scene-tablets",
    imageSrc: "/images/ai/library-hero.jpg",
    badge: "سبک و لوکس",
    inventoryStatus: "available",
    spiritualTheme: "اشا؛ راستی و نظم جهان",
    materials: ["فلز آبکاری‌شده", "حک لیزری", "پاکت هدیه"],
    seoKeywords: ["بوکمارک اشا", "اکسسوری اوستا", "هدیه کتاب"],
  },
  {
    id: "product-zoroaster-statue",
    title: "مجسمه رومیزی زرتشت",
    slug: "zoroaster-desk-statue",
    category: "statue",
    categoryLabel: "مجسمه",
    excerpt: "مجسمه دکوراتیو رومیزی با الهام از تصویر برند و فضای ایران باستان.",
    description:
      "یک قطعه دکور لوکس برای کتابخانه، دفتر کار یا فضای فرهنگی؛ مناسب نسخه کلکسیونی آینده.",
    price: 2450000,
    currency: "IRR",
    imageScene: "scene-stone",
    imageSrc: "/images/ai/product-statue.png",
    badge: "کلکسیونی",
    inventoryStatus: "preorder",
    spiritualTheme: "زرتشت، خرد و روشنایی",
    materials: ["رزین سنگی", "رنگ پتینه", "پایه مشکی"],
    seoKeywords: ["مجسمه زرتشت", "دکور ایران باستان", "مجسمه فروهر"],
  },
  {
    id: "product-avesta-portal-print",
    title: "آرت‌پرینت پورتال اوستا",
    slug: "avesta-portal-art-print",
    category: "art",
    categoryLabel: "آرت‌پرینت",
    excerpt: "پوستر سینمایی از جهان دیجیتال اوستا با ترکیب طلوع، آتش و معماری باستانی.",
    description:
      "پرینت هنری برای اتاق مطالعه و فضای فرهنگی؛ در آینده از تصاویر AI اختصاصی سایت تولید می‌شود.",
    price: 620000,
    currency: "IRR",
    imageScene: "scene-cosmic",
    imageSrc: "/images/ai/shop-hero.jpg",
    badge: "AI Art",
    inventoryStatus: "available",
    spiritualTheme: "جهان دیجیتال اوستا",
    materials: ["کاغذ هنری", "چاپ مات", "قاب اختیاری"],
    seoKeywords: ["پوستر اوستا", "آرت پرینت زرتشت", "هنر ایران باستان"],
  },
];

export function getShopProduct(slug: string) {
  return shopProducts.find((product) => product.slug === slug);
}

export function formatPrice(value: number) {
  return `${new Intl.NumberFormat("fa-IR").format(value)} تومان`;
}
