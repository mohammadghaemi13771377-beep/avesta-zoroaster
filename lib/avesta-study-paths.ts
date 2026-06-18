import { visualAssets } from "@/lib/visual-assets";

export type AvestaStudyPath = {
  id: string;
  title: string;
  subtitle: string;
  audience: string;
  duration: string;
  mood: string;
  image: string;
  accent: string;
  href: string;
  detailHref: string;
  cta: string;
  steps: Array<{
    title: string;
    href: string;
    note: string;
  }>;
};

export const avestaStudyPaths: AvestaStudyPath[] = [
  {
    id: "first-light",
    title: "شروع روشن برای تازه‌واردها",
    subtitle: "از پرسش ساده شروع کن، بعد وارد یسنا و گات‌ها شو.",
    audience: "کاربر تازه‌وارد",
    duration: "۱۵ دقیقه",
    mood: "آرام و راهنما",
    image: visualAssets.avesta,
    accent: "#F2D58A",
    href: "/avesta/yasna/ha-1",
    detailHref: "/avesta/paths/first-light",
    cta: "شروع مسیر",
    steps: [
      { title: "پورتال اوستا", href: "/avesta", note: "نقشه کلی جهان را ببین." },
      { title: "یسنا ۱", href: "/avesta/yasna/ha-1", note: "با تالار آتش و نیایش وارد شو." },
      { title: "اهونود گات", href: "/avesta/gathas/ahunavaiti", note: "بعد از آیین، به پرسش اخلاقی برس." }
    ]
  },
  {
    id: "gathic-wisdom",
    title: "مسیر خرد گات‌ها",
    subtitle: "برای کسی که دنبال اندیشه، انتخاب اخلاقی و زبان آرام‌تر زرتشت است.",
    audience: "مطالعه تأملی",
    duration: "۲۰ دقیقه",
    mood: "سکوت و خرد",
    image: visualAssets.gathas,
    accent: "#BFEBD7",
    href: "/avesta/gathas/ahunavaiti",
    detailHref: "/avesta/paths/gathic-wisdom",
    cta: "ورود به گات‌ها",
    steps: [
      { title: "اهونود گات", href: "/avesta/gathas/ahunavaiti", note: "سکوت، شنیدن و انتخاب." },
      { title: "مهر یشت", href: "/avesta/yashts/mehr-yasht", note: "اخلاق فردی را به پیمان اجتماعی وصل کن." },
      { title: "واژه اشا", href: "/dictionary/asha", note: "کلید فهم راستی و نظم را بخوان." }
    ]
  },
  {
    id: "daily-prayer",
    title: "نیایش روزانه و آتش",
    subtitle: "برای بازگشت کوتاه روزانه به نیت، آرامش و کردار روشن.",
    audience: "کاربر موبایل",
    duration: "۷ دقیقه",
    mood: "گرم و آیینی",
    image: visualAssets.khordehAvesta,
    accent: "#F2B45E",
    href: "/avesta/khordeh-avesta/atash-niyayesh",
    detailHref: "/avesta/paths/daily-prayer",
    cta: "نیایش امروز",
    steps: [
      { title: "نیایش‌های روزانه", href: "/avesta/khordeh-avesta/daily-prayers", note: "نیت صبح، میان‌روز و شب." },
      { title: "آتش نیایش", href: "/avesta/khordeh-avesta/atash-niyayesh", note: "نور بیرونی را به آگاهی درونی وصل کن." },
      { title: "اتاق آیینی", href: "/ritual-room", note: "نیت کوتاه و مکث آرام." }
    ]
  },
  {
    id: "mythic-yashts",
    title: "یشت‌ها؛ اسطوره و طبیعت",
    subtitle: "برای دیدن آب، مهر، آسمان، پیمان و نیروهای زندگی در قاب تصویری.",
    audience: "علاقه‌مند اسطوره",
    duration: "۱۸ دقیقه",
    mood: "حماسی و طبیعت‌محور",
    image: visualAssets.yashts,
    accent: "#9EE7F2",
    href: "/avesta/yashts/aban-yasht",
    detailHref: "/avesta/paths/mythic-yashts",
    cta: "تماشای یشت‌ها",
    steps: [
      { title: "آبان یشت", href: "/avesta/yashts/aban-yasht", note: "آب، آناهیتا و پاکی طبیعت." },
      { title: "مهر یشت", href: "/avesta/yashts/mehr-yasht", note: "پیمان، اعتماد و نور اجتماعی." },
      { title: "نمایشگاه‌ها", href: "/exhibitions", note: "نسخه موزه‌ای روایت‌ها را ببین." }
    ]
  },
  {
    id: "vendidad-light-dark",
    title: "وندیداد؛ نور، قانون و پاکی",
    subtitle: "برای کاربری که می‌خواهد بخش دشوارتر اوستا را با راهنمای تصویری بفهمد.",
    audience: "مطالعه جدی‌تر",
    duration: "۲۵ دقیقه",
    mood: "رازآلود اما روشن",
    image: visualAssets.vendidad,
    accent: "#8DD6FF",
    href: "/avesta/vendidad/fargard-1",
    detailHref: "/avesta/paths/vendidad-light-dark",
    cta: "ورود به وندیداد",
    steps: [
      { title: "فرگرد اول", href: "/avesta/vendidad/fargard-1", note: "آفرینش، سرزمین و ورود آسیب." },
      { title: "فرگرد دوم", href: "/avesta/vendidad/fargard-2", note: "جم، بحران و نگهبانی زندگی." },
      { title: "پوشش ارجاع", href: "/admin/citation-coverage", note: "برای تیم پژوهش: وضعیت منبع و ریسک انتشار." }
    ]
  }
];

export function getAvestaStudyPaths() {
  return avestaStudyPaths;
}

export function getAvestaStudyPath(id: string) {
  return avestaStudyPaths.find((path) => path.id === id);
}
