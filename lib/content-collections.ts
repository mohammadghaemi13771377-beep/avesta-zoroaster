export type ContentCollection = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  scene: string;
  accent: string;
  items: Array<{
    label: string;
    href: string;
    type: string;
  }>;
};

export const contentCollections: ContentCollection[] = [
  {
    id: "wisdom",
    title: "مسیر خرد",
    subtitle: "گات‌ها، اشا و انتخاب اخلاقی",
    description: "برای کاربری که می‌خواهد پیام زرتشت را به زبان امروز بفهمد: خرد، راستی، مسئولیت و اندیشه نیک.",
    scene: "scene-sunrise",
    accent: "#F2D58A",
    items: [
      { label: "گات‌ها چیست؟", href: "/gathas", type: "هاب" },
      { label: "اشا؛ نظم راستی", href: "/dictionary/asha", type: "واژه" },
      { label: "مقاله گات‌ها", href: "/articles/what-are-gathas", type: "مقاله" },
    ],
  },
  {
    id: "ritual",
    title: "نیایش و آتش",
    subtitle: "یسنا، خرده اوستا و صوت آیینی",
    description: "مجموعه‌ای برای لمس فضای آیینی سایت: آتش، نیایش، خوانش صوتی و آرامش روزانه.",
    scene: "scene-fire",
    accent: "#D6A84F",
    items: [
      { label: "پورتال یسنا", href: "/avesta/yasna", type: "اوستا" },
      { label: "خرده اوستا", href: "/avesta/khordeh-avesta", type: "اوستا" },
      { label: "رسانه‌ها", href: "/media", type: "رسانه" },
    ],
  },
  {
    id: "ancient-iran",
    title: "ایران باستان",
    subtitle: "تاریخ، هخامنشیان و حافظه فرهنگی",
    description: "برای کاربرانی که از شکوه تاریخی، تایم‌لاین، معماری و روایت ایران باستان وارد جهان اوستا می‌شوند.",
    scene: "scene-stone",
    accent: "#B9B9B9",
    items: [
      { label: "تایم‌لاین", href: "/timeline", type: "تاریخ" },
      { label: "ایران باستان", href: "/cyrus", type: "هاب" },
      { label: "فروهر", href: "/dictionary/faravahar", type: "واژه" },
    ],
  },
  {
    id: "monotheism",
    title: "یکتاپرستی و روشنایی",
    subtitle: "اهورامزدا، اشا و اخلاق سه‌گانه",
    description: "یک مسیر مفهومی برای فهم یکتاپرستی زرتشتی، دانایی، روشنایی و شعار پندار نیک، گفتار نیک، کردار نیک.",
    scene: "scene-cosmic",
    accent: "#FFF8EA",
    items: [
      { label: "هاب یکتاپرستی", href: "/monotheism", type: "هاب" },
      { label: "اهورامزدا", href: "/dictionary/ahura-mazda", type: "واژه" },
      { label: "دین زرتشتی", href: "/zoroastrianism", type: "صفحه" },
    ],
  },
];

export function getCollectionById(id: string) {
  return contentCollections.find((collection) => collection.id === id);
}
