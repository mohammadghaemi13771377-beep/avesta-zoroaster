import { normalizeSearchText } from "@/lib/search";

export type MobedSource = {
  label: string;
  href: string;
};

export type MobedReply = {
  answer: string;
  note: string;
  sources: MobedSource[];
  next: MobedSource[];
};

export const mobedStarterQuestions = [
  "اشا یعنی چه؟",
  "فرق گات‌ها و یشت‌ها چیست؟",
  "یسنا چیست؟",
  "پیام اخلاقی اوستا چیست؟"
];

const fallbackReply: MobedReply = {
  answer:
    "برای پاسخ دقیق‌تر، نام واژه، بخش اوستا یا بند موردنظر را بنویس. من می‌توانم از واژه‌نامه، گات‌ها، یسنا، وندیداد و مقاله‌های سایت مسیر مطالعه پیشنهاد بدهم.",
  note: "این راهنما آموزشی است و جایگزین پژوهش تخصصی یا تفسیر قطعی تاریخی نیست.",
  sources: [
    { label: "واژه‌نامه اوستایی", href: "/dictionary" },
    { label: "روش پژوهش سایت", href: "/research-methodology" }
  ],
  next: [
    { label: "جستجوی پیشرفته", href: "/search" },
    { label: "پورتال اوستا", href: "/avesta" }
  ]
};

export function answerMobedQuestion(question: string): MobedReply {
  const value = normalizeSearchText(question);

  if (value.includes("اشا") || value.includes("اشه")) {
    return {
      answer:
        "اَشا مفهومی بنیادین در اندیشه زرتشتی است و معمولاً با راستی، نظم درست و هماهنگی اخلاقی فهمیده می‌شود. در خوانش امروزی، اشا فقط یک واژه نظری نیست: انتخابی است که اندیشه، گفتار و کردار را با حقیقت و مسئولیت پیوند می‌دهد.",
      note: "معادل‌گذاری دقیق واژه‌های اوستایی میان مترجمان متفاوت است؛ برای پژوهش، ترجمه و منبع هر متن را جداگانه بررسی کنید.",
      sources: [
        { label: "واژه‌نامه: اشا", href: "/dictionary/asha" },
        { label: "مقاله: اشا و راستی", href: "/articles/asha-truth-order" }
      ],
      next: [
        { label: "نورسنج اشا", href: "/asha-balance" },
        { label: "گات‌ها", href: "/avesta/gathas" }
      ]
    };
  }

  if ((value.includes("گات") || value.includes("گاث")) && (value.includes("یشت") || value.includes("یَشت"))) {
    return {
      answer:
        "گات‌ها سرودهایی هستند که در سنت زرتشتی به زرتشت نسبت داده می‌شوند و معمولاً هسته اخلاقی و اندیشه‌ای اوستا دانسته می‌شوند. یشت‌ها مجموعه‌ای گسترده‌تر از سرودهای ستایش و روایت‌های آیینی و اسطوره‌ای‌اند. هر دو برای فهم جهان اوستا مهم‌اند، اما کارکرد و لحن یکسانی ندارند.",
      note: "تاریخ‌گذاری و نسبت‌دادن متن‌ها موضوع پژوهش دانشگاهی است؛ این توضیح یک نقشه شروع آموزشی است.",
      sources: [
        { label: "ورود به گات‌ها", href: "/gathas" },
        { label: "پورتال یشت‌ها", href: "/avesta/yashts" }
      ],
      next: [
        { label: "شروع گات‌ها", href: "/avesta/gathas" },
        { label: "آبان یشت", href: "/avesta/yashts/aban-yasht" }
      ]
    };
  }

  if (value.includes("گات") || value.includes("گاث")) {
    return {
      answer:
        "گات‌ها در این پلتفرم مسیر اصلی برای خواندن خرد، راستی، اختیار و مسئولیت انسان‌اند. هر فصل با متن، ترجمه، بازنویسی ساده، تحلیل مفهومی و پیشنهاد مطالعه بعدی ارائه می‌شود.",
      note: "برای نقل یا تحلیل پژوهشی، منبع و ترجمه مشخص را در صفحه هر بند بررسی کنید.",
      sources: [{ label: "هاب گات‌ها", href: "/gathas" }, { label: "گات‌ها در اوستا", href: "/avesta/gathas" }],
      next: [{ label: "آغاز مطالعه گات‌ها", href: "/avesta/gathas/ahunavaiti" }, { label: "واژه‌نامه", href: "/dictionary" }]
    };
  }

  if (value.includes("یسنا")) {
    return {
      answer:
        "یسنا از بخش‌های اصلی اوستاست و با نیایش، سرود و زمینه آیینی پیوند دارد. در سایت، یسنا به‌صورت مسیر مطالعه‌ای شامل معرفی، فصل‌ها، بندها، ترجمه، روایت صوتی و پیام امروز باز می‌شود.",
      note: "زمینه‌های آیینی در سنت‌های زرتشتی می‌توانند تفاوت‌های محلی و تاریخی داشته باشند.",
      sources: [{ label: "پورتال یسنا", href: "/avesta/yasna" }, { label: "یسنا ۱", href: "/avesta/yasna/ha-1" }],
      next: [{ label: "شروع مطالعه یسنا", href: "/avesta/yasna/ha-1" }, { label: "تالار آیینی", href: "/ritual-room" }]
    };
  }

  if (value.includes("وندیداد")) {
    return {
      answer:
        "وندیداد بخشی از اوستاست که در آن موضوع‌های پاکی، قانون، آسیب و نظم آیینی دیده می‌شود. برای خواندن امروز، بهتر است متن را همراه با زمینه تاریخی و یادداشت منبع‌دار ببینیم، نه جدا از زمان و سنت انتقال آن.",
      note: "برداشت از وندیداد نیازمند دقت تاریخی و پرهیز از نتیجه‌گیری قطعی بدون منبع است.",
      sources: [{ label: "پورتال وندیداد", href: "/avesta/vendidad" }, { label: "فرگرد اول", href: "/avesta/vendidad/fargard-1" }],
      next: [{ label: "مطالعه وندیداد", href: "/avesta/vendidad" }, { label: "روش پژوهش", href: "/research-methodology" }]
    };
  }

  if (value.includes("ترجمه") || value.includes("اوستایی") || value.includes("بند")) {
    return {
      answer:
        "برای توضیح یا ترجمه یک بند، متن یا نشانی دقیق آن را بفرست. صفحه‌های بند در این سایت متن اصلی، آوانویسی، ترجمه، بازنویسی ساده، تحلیل مفهومی، پیام اخلاقی و منبع را کنار هم نگه می‌دارند.",
      note: "ترجمه واژه‌به‌واژه بدون مشخص‌بودن متن و نسخه منبع، می‌تواند گمراه‌کننده باشد.",
      sources: [{ label: "جستجو در بندهای اوستا", href: "/search?type=verse" }, { label: "پورتال اوستا", href: "/avesta" }],
      next: [{ label: "شروع از یسنا", href: "/avesta/yasna" }, { label: "واژه‌نامه", href: "/dictionary" }]
    };
  }

  if (value.includes("اخلاق") || value.includes("پندار") || value.includes("گفتار") || value.includes("کردار")) {
    return {
      answer:
        "پندار نیک، گفتار نیک و کردار نیک در سایت فقط شعار نیستند؛ به‌عنوان یک مسیر عملی برای تأمل، انتخاب مسئولانه و تمرین روزانه معرفی می‌شوند. می‌توانی از تمرین هفت‌روزه یا نورسنج اشا شروع کنی.",
      note: "این بخش یک خوانش آموزشی و کاربردی است و تنوع تفسیرهای پژوهشی را جایگزین نمی‌کند.",
      sources: [{ label: "مسیر تمرین اخلاقی", href: "/practice" }, { label: "یکتاپرستی و خرد", href: "/monotheism" }],
      next: [{ label: "تمرین امروز", href: "/daily-light" }, { label: "نورسنج اشا", href: "/asha-balance" }]
    };
  }

  return fallbackReply;
}
