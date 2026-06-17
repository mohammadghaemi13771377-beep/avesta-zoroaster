import { sectionCoverBySlug, visualAssets } from "@/lib/visual-assets";

export type AvestaVisualTone = "water" | "fire" | "judgment" | "creation" | "silence" | "ritual" | "scroll";

export type AvestaVisualGuidePanel = {
  title: string;
  body: string;
  icon: "water" | "flame" | "scale" | "scroll" | "sun" | "sparkles" | "shield" | "mountain" | "brain";
};

export type AvestaVisualGuide = {
  sectionSlug: string;
  title: string;
  question: string;
  subtitle: string;
  coverImage: string;
  accent: string;
  tone: AvestaVisualTone;
  leadQuote: string;
  sidePanels: AvestaVisualGuidePanel[];
  storyPanels: {
    title: string;
    body: string;
    image: string;
    href?: string;
  }[];
  ethicalMessage: string;
  todayPractice: string[];
};

export const avestaVisualGuides: Record<string, AvestaVisualGuide> = {
  yasna: {
    sectionSlug: "yasna",
    title: "آتشکده فقط محل عبادت نبود",
    question: "یسنا چگونه نیایش را به بیداری تبدیل می‌کند؟",
    subtitle: "در یسنا، آتش فقط شعله نیست؛ نشانه‌ای از حضور آگاهی، پاکی، نظم و یادآوری حقیقت است.",
    coverImage: sectionCoverBySlug.yasna,
    accent: "#F2B45E",
    tone: "fire",
    leadQuote: "آتشی که خاموش نمی‌شود، یعنی حقیقتی که باید درون انسان زنده بماند.",
    sidePanels: [
      {
        title: "آتش در مرکز آیین",
        body: "آتش در یسنا یادآور روشنایی، تمرکز و پاکی است؛ چیزی که نگاه انسان را از آشوب به سوی معنا می‌برد.",
        icon: "flame"
      },
      {
        title: "نیایش به جای تماشا",
        body: "یسنا کاربر را از خواننده منفعل به همراه آیین تبدیل می‌کند: متن، ترجمه، صدا و تصویر در یک مسیر.",
        icon: "sparkles"
      },
      {
        title: "نظم آیینی",
        body: "هر هات مثل یک ایستگاه است؛ از دعوت و ستایش تا اندیشه، انتخاب و پیام اخلاقی.",
        icon: "scroll"
      }
    ],
    storyPanels: [
      {
        title: "تالار آتش",
        body: "ورود به هات‌ها با تصویری گرم، صدای خوانش و قاب طلایی انجام می‌شود.",
        image: visualAssets.yasna,
        href: "/avesta/yasna"
      },
      {
        title: "پیام امروز",
        body: "پرسش هر بند: امروز کدام فکر، گفتار یا کردار باید روشن‌تر شود؟",
        image: visualAssets.homeHero
      }
    ],
    ethicalMessage: "نیایش وقتی زنده است که به انتخاب اخلاقی روزانه تبدیل شود.",
    todayPractice: ["یک تصمیم را با آرامش بگیر.", "یک جمله روشن و صادقانه بگو.", "یک کار کوچک را کامل و پاک انجام بده."]
  },
  gathas: {
    sectionSlug: "gathas",
    title: "سکوت ذهن، آغاز شنیدن حقیقت",
    question: "چرا گات‌ها این‌قدر از خرد و انتخاب حرف می‌زنند؟",
    subtitle: "گات‌ها به جای ترساندن، انسان را به اندیشیدن، شنیدن و انتخاب آگاهانه دعوت می‌کنند.",
    coverImage: sectionCoverBySlug.gathas,
    accent: "#BFEBD7",
    tone: "silence",
    leadQuote: "نور در ذهن آشفته دیده نمی‌شود؛ اول باید صدای حقیقت را شنید.",
    sidePanels: [
      {
        title: "پرسش پیش از پاسخ",
        body: "گات‌ها با روح پرسشگر خوانده می‌شوند؛ متن، خواننده را به فکر کردن و انتخاب کردن فرا می‌خواند.",
        icon: "brain"
      },
      {
        title: "راه سه‌گانه",
        body: "پندار نیک، گفتار نیک و کردار نیک در این تالار به تجربه عملی تبدیل می‌شوند.",
        icon: "sparkles"
      },
      {
        title: "آرامش روشن",
        body: "فضای گات‌ها روشن‌تر، نرم‌تر و کم‌هیاهوتر از بخش‌های حماسی و آیینی طراحی شده است.",
        icon: "sun"
      }
    ],
    storyPanels: [
      {
        title: "تالار تأمل",
        body: "هر بند با بازنویسی ساده و پیام امروزی به زبان قابل فهم امروز باز می‌شود.",
        image: visualAssets.gathas,
        href: "/avesta/gathas"
      },
      {
        title: "از متن تا زندگی",
        body: "کاربر فقط متن نمی‌خواند؛ یک تمرین کوچک برای رفتار روزانه دریافت می‌کند.",
        image: visualAssets.monotheism
      }
    ],
    ethicalMessage: "پیش از تغییر جهان، باید ذهن را از آشوب و تاریکی نجات داد.",
    todayPractice: ["سه دقیقه سکوت کن.", "یک فکر تاریک را نام‌گذاری کن.", "برای همان فکر، یک پاسخ روشن بنویس."]
  },
  visperad: {
    sectionSlug: "visperad",
    title: "ویسپرد؛ بزرگداشت همه نیروهای نیک",
    question: "چگونه یک نیایش به آیین کامل تبدیل می‌شود؟",
    subtitle: "ویسپرد فضای مراسم، پیوند و ستایش جمعی را به پورتال اوستا اضافه می‌کند.",
    coverImage: sectionCoverBySlug.visperad,
    accent: "#E7C26B",
    tone: "ritual",
    leadQuote: "وقتی نیایش جمعی می‌شود، هر واژه در یک نظم بزرگ‌تر معنا پیدا می‌کند.",
    sidePanels: [
      {
        title: "آیین و پیوند",
        body: "ویسپرد بخش‌های آیینی را به هم وصل می‌کند و حال و هوای مراسم را در سایت زنده نگه می‌دارد.",
        icon: "sparkles"
      },
      {
        title: "ردان و نیروهای نیک",
        body: "این تالار برای نشان دادن شبکه‌ای از نام‌ها، نیایش‌ها و نسبت‌ها آماده شده است.",
        icon: "shield"
      },
      {
        title: "خوانش لایه‌ای",
        body: "ادمین می‌تواند برای هر قطعه متن، ترجمه، توضیح و تصویر آیینی اضافه کند.",
        icon: "scroll"
      }
    ],
    storyPanels: [
      {
        title: "مراسم",
        body: "قاب‌ها می‌توانند تصویر آیین، آتش، موبد و فضای نیایش را نشان دهند.",
        image: visualAssets.avesta,
        href: "/avesta/visperad"
      },
      {
        title: "همه ردان",
        body: "در آینده هر نام آیینی به واژه‌نامه، مقاله و رسانه خودش وصل می‌شود.",
        image: visualAssets.dictionary
      }
    ],
    ethicalMessage: "آیین زمانی عمیق می‌شود که انسان خود را بخشی از نظم نیک جهان بداند.",
    todayPractice: ["یک نام نیک را یادداشت کن.", "یک پیوند انسانی را ترمیم کن.", "یک کار کوچک را برای جمع انجام بده."]
  },
  vendidad: {
    sectionSlug: "vendidad",
    title: "وندیداد؛ پل میان پاکی و تاریکی",
    question: "چرا وندیداد از قانون، مرگ و پاکی سخن می‌گوید؟",
    subtitle: "وندیداد تاریک‌تر است، اما نباید فقط سیاه باشد؛ نور آن از مرز میان خطر، پاکی و انتخاب بیرون می‌آید.",
    coverImage: sectionCoverBySlug.vendidad,
    accent: "#7AC7F2",
    tone: "judgment",
    leadQuote: "در جهان وندیداد، انسان تماشاگر نیست؛ هر انتخاب، نور را قوی‌تر یا تاریکی را سنگین‌تر می‌کند.",
    sidePanels: [
      {
        title: "قانون پاکی",
        body: "پاکی در این بخش فقط رسم نیست؛ نظم زندگی، تن، محیط و ذهن را در بر می‌گیرد.",
        icon: "shield"
      },
      {
        title: "پل چینود",
        body: "روایت داوری و مسئولیت، بخش اخلاقی و دراماتیک وندیداد را قابل لمس می‌کند.",
        icon: "scale"
      },
      {
        title: "نور در دل خطر",
        body: "کارت‌ها باید ترکیب آبی تیره، طلایی و نور سرد داشته باشند تا از تاریکی یک‌دست بیرون بیایند.",
        icon: "sun"
      }
    ],
    storyPanels: [
      {
        title: "فرگردهای وندیداد",
        body: "هر فرگرد مثل یک روایت تصویری باز می‌شود: مسئله، قانون، پیام و برداشت امروز.",
        image: visualAssets.vendidad,
        href: "/avesta/vendidad"
      },
      {
        title: "روح، داوری، مسئولیت",
        body: "برای روایت‌های مرگ و پس از مرگ، UI باید جدی، محترمانه و روشن‌محور باشد.",
        image: visualAssets.zoroastrianism
      }
    ],
    ethicalMessage: "ترس وقتی معنا دارد که انسان را به مراقبت، پاکی و مسئولیت برساند.",
    todayPractice: ["یک آلودگی ذهنی را حذف کن.", "یک فضای کوچک را پاکیزه کن.", "یک انتخاب سخت را با راستی بسنج."]
  },
  yashts: {
    sectionSlug: "yashts",
    title: "آب، آسمان و نیروهای نگهبان",
    question: "چرا آب در اوستا مقدس بود؟",
    subtitle: "در یشت‌ها طبیعت، ایزدان، آب، مهر، روشنایی و نیروی قهرمانی به زبان تصویر و سرود دیده می‌شوند.",
    coverImage: sectionCoverBySlug.yashts,
    accent: "#9EE7F2",
    tone: "water",
    leadQuote: "اگر آب پاک بماند، زندگی جریان پیدا می‌کند؛ اگر ذهن پاک بماند، نور در انسان زنده می‌شود.",
    sidePanels: [
      {
        title: "نگهبان آب‌ها",
        body: "آب در نگاه اوستایی نشانه زندگی، پاکی، برکت و جریان راستین جهان است.",
        icon: "water"
      },
      {
        title: "سرودهای حماسی",
        body: "هر یشت می‌تواند با یک تصویر، یک نیروی نمادین و چند کارت روایی معرفی شود.",
        icon: "mountain"
      },
      {
        title: "طبیعت مقدس",
        body: "این بخش باید از سیاهی صرف بیرون بیاید و با آبی، طلایی و نور طبیعت بدرخشد.",
        icon: "sun"
      }
    ],
    storyPanels: [
      {
        title: "آبان یشت",
        body: "الگوی صفحه آب: تصویر مرکزی، کارت‌های دانستنی، پیام اخلاقی و تمرین احترام به آب.",
        image: visualAssets.yashts,
        href: "/avesta/yashts"
      },
      {
        title: "مهر و روشنایی",
        body: "یشت‌ها می‌توانند از اسطوره به تجربه تعاملی، مقاله و رسانه وصل شوند.",
        image: visualAssets.media
      }
    ],
    ethicalMessage: "احترام به طبیعت، شکل امروزیِ فهم پاکی و راستی است.",
    todayPractice: ["آب را بیهوده مصرف نکن.", "یک لحظه کنار آب یا تصویر آب آرام بگیر.", "یک رفتار کوچک برای طبیعت انجام بده."]
  },
  "khordeh-avesta": {
    sectionSlug: "khordeh-avesta",
    title: "خرده اوستا؛ نیایش روزانه",
    question: "چگونه روشنایی وارد زندگی معمول می‌شود؟",
    subtitle: "خرده اوستا تالار آرام‌تر سایت است؛ جایی برای نیایش کوتاه، ذکر روزانه، آرامش و بازگشت به نور.",
    coverImage: sectionCoverBySlug["khordeh-avesta"],
    accent: "#F2D58A",
    tone: "ritual",
    leadQuote: "بزرگ‌ترین نیایش گاهی یک لحظه مکث، یک جمله راست و یک کردار نیک است.",
    sidePanels: [
      {
        title: "نیایش‌های کوتاه",
        body: "این بخش برای کاربر روزانه است: متن کوتاه، صوت، ذخیره و ادامه مطالعه.",
        icon: "scroll"
      },
      {
        title: "آرامش شخصی",
        body: "طراحی باید نرم، خوانا و نورانی باشد تا به جای سنگینی، حس همراهی بدهد.",
        icon: "sparkles"
      },
      {
        title: "برنامه روز",
        body: "در آینده می‌توان هر نیایش را به یادآور، صوت و تمرین روزانه وصل کرد.",
        icon: "sun"
      }
    ],
    storyPanels: [
      {
        title: "نیایش صبح",
        body: "کارت‌های کوتاه برای شروع روز و بازگشت به تمرکز.",
        image: visualAssets.khordehAvesta,
        href: "/avesta/khordeh-avesta"
      },
      {
        title: "ذخیره و ادامه",
        body: "کاربر می‌تواند نیایش‌های محبوب را در پروفایل و کلکسیون خود نگه دارد.",
        image: visualAssets.library
      }
    ],
    ethicalMessage: "معنویت وقتی ماندگار است که به عادت کوچک و پیوسته تبدیل شود.",
    todayPractice: ["یک نیایش کوتاه بخوان.", "یک نیت روشن برای امروز بنویس.", "قبل از واکنش، یک نفس آرام بکش."]
  },
  hats: {
    sectionSlug: "hats",
    title: "هات‌ها؛ نقشه خواندن متن مقدس",
    question: "چگونه از طومار بزرگ اوستا وارد بندهای قابل فهم شویم؟",
    subtitle: "هات‌ها ساختار مطالعه را از متن سنگین به مسیر مرحله‌ای، قابل ذخیره و قابل جستجو تبدیل می‌کنند.",
    coverImage: sectionCoverBySlug.hats,
    accent: "#E8C878",
    tone: "scroll",
    leadQuote: "هر هات یک در است؛ پشت هر در، متن، ترجمه، تصویر، صدا و پیام امروز قرار می‌گیرد.",
    sidePanels: [
      {
        title: "طومار مطالعه",
        body: "فصل‌ها باید با شماره، پیشرفت، خلاصه و CTA روشن نمایش داده شوند.",
        icon: "scroll"
      },
      {
        title: "از متن به تجربه",
        body: "هر بند می‌تواند چند لایه داشته باشد: متن اصلی، ترجمه کلاسیک، ساده‌سازی و تحلیل.",
        icon: "sparkles"
      },
      {
        title: "مقیاس‌پذیر برای هزاران صفحه",
        body: "این قالب برای تکثیر روی همه بخش‌های اوستا و ورود محتوای ادمین آماده است.",
        icon: "shield"
      }
    ],
    storyPanels: [
      {
        title: "کتاب مقدس دیجیتال",
        body: "هات‌ها در قالب کارت‌های خواندنی، نه لیست خشک، نمایش داده می‌شوند.",
        image: visualAssets.hats,
        href: "/avesta/hats"
      },
      {
        title: "مسیر پژوهش",
        body: "هر هات به مقاله، واژه‌نامه، منبع و رسانه مرتبط وصل می‌شود.",
        image: visualAssets.articles
      }
    ],
    ethicalMessage: "متن مقدس وقتی زنده می‌شود که مسیر خواندن آن روشن، انسانی و قابل ادامه باشد.",
    todayPractice: ["یک بند کوتاه انتخاب کن.", "معنای ساده‌اش را بنویس.", "یک پیام اخلاقی از آن بیرون بکش."]
  }
};

export function getAvestaVisualGuide(sectionSlug: string) {
  return avestaVisualGuides[sectionSlug];
}
