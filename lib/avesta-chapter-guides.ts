import type { AvestaVisualGuide } from "@/lib/avesta-visual-guides";
import { visualAssets } from "@/lib/visual-assets";

export type AvestaChapterGuide = AvestaVisualGuide & {
  chapterSlug: string;
  sectionTitle: string;
  chapterTitle: string;
  chapterIntro: string;
  curatorNote: string;
};

const chapterGuideList: AvestaChapterGuide[] = [
  {
    sectionSlug: "yasna",
    chapterSlug: "ha-1",
    sectionTitle: "یسنا",
    chapterTitle: "یسنا ۱",
    chapterIntro: "صفحه نمونه برای آغاز آیین یسنا؛ جایی که آتش، نیایش، نظم آیینی و توجه در یک مسیر خواندنی جمع می‌شوند.",
    title: "آغاز یسنا؛ تالار آتش و نیایش",
    question: "چگونه نخستین هات، کاربر را وارد فضای آیینی اوستا می‌کند؟",
    subtitle: "یسنا ۱ باید گرم، روشن و باوقار باشد؛ شبیه ورود به آتشکده‌ای که متن، صدا و تصویر را با هم همراه می‌کند.",
    coverImage: visualAssets.yasna,
    accent: "#F2B45E",
    tone: "fire",
    leadQuote: "آغاز نیایش یعنی آماده کردن ذهن برای راستی، پاکی و کردار روشن.",
    sidePanels: [
      {
        title: "آتش مرکزی",
        body: "آتش در این صفحه نقطه تمرکز تصویر و معناست؛ نه فقط تزئین، بلکه یادآور آگاهی و پاکی.",
        icon: "flame"
      },
      {
        title: "ورود به آیین",
        body: "کاربر باید حس کند از یک صفحه مقاله وارد یک تالار نیایش دیجیتال شده است.",
        icon: "sparkles"
      },
      {
        title: "مسیر خواندن",
        body: "هر بند با متن اصلی، ترجمه، بازنویسی، تحلیل، صوت و پیام امروزی تکمیل می‌شود.",
        icon: "scroll"
      }
    ],
    storyPanels: [
      {
        title: "آتشکده دیجیتال",
        body: "الهام از reference-atashkadeh: آتش مرکزی، قاب‌های طلایی و پیام روشن.",
        image: visualAssets.yasna
      },
      {
        title: "نیایش و عمل",
        body: "این صفحه باید نیایش را به تمرین روزانه و تصمیم اخلاقی وصل کند.",
        image: visualAssets.khordehAvesta
      }
    ],
    ethicalMessage: "نیایش وقتی اثر دارد که ذهن را آرام و کردار را روشن‌تر کند.",
    todayPractice: ["یک دقیقه آرام بنشین.", "یک نیت روشن انتخاب کن.", "یک کردار کوچک را با دقت انجام بده."],
    curatorNote: "یسنا ۱ صفحه مرجع برای تالارهای آیینی است؛ نور گرم، آتش مرکزی و متن خوانا باید غالب باشد."
  },
  {
    sectionSlug: "gathas",
    chapterSlug: "ahunavaiti",
    sectionTitle: "گات‌ها",
    chapterTitle: "اهونود گات",
    chapterIntro: "صفحه نمونه برای سرودهای آغازین گات‌ها؛ آرام، روشن، اندیشمند و متمرکز بر انتخاب آگاهانه.",
    title: "اهونود گات؛ سکوت، خرد و انتخاب",
    question: "چرا گات‌ها پیش از پاسخ، انسان را به شنیدن و اندیشیدن دعوت می‌کنند؟",
    subtitle: "این صفحه باید از شلوغی دور باشد: زرتشت در مرکز آرامش، نور نرم، کارت‌های کوتاه و پیام برای زندگی امروز.",
    coverImage: visualAssets.gathas,
    accent: "#BFEBD7",
    tone: "silence",
    leadQuote: "راه نور از سکوت ذهن آغاز می‌شود؛ آنجا که انسان می‌تواند درست بشنود و درست انتخاب کند.",
    sidePanels: [
      {
        title: "سکوت ذهن",
        body: "الهام از reference-silence-mind: روشنایی در اطراف چهره، آرامش و قاب‌های کم‌هیاهو.",
        icon: "brain"
      },
      {
        title: "پرسش اخلاقی",
        body: "گات‌ها کاربر را به انتخاب میان راستی و ناراستی دعوت می‌کنند.",
        icon: "scale"
      },
      {
        title: "نور نرم",
        body: "فضا باید روشن‌تر از سایر بخش‌ها باشد؛ طلایی ملایم، سبز روشن و سفید گرم.",
        icon: "sun"
      }
    ],
    storyPanels: [
      {
        title: "سرود خرد",
        body: "هر بند گاهانی با پرسش، ترجمه، بازنویسی ساده و پیام امروزی باز می‌شود.",
        image: visualAssets.gathas
      },
      {
        title: "سه راه روشن",
        body: "پندار، گفتار و کردار نیک به عنوان نقشه عملی صفحه نمایش داده می‌شوند.",
        image: visualAssets.monotheism
      }
    ],
    ethicalMessage: "آدمی با آزادی و مسئولیت، هر روز مسیر روشن یا تاریک را انتخاب می‌کند.",
    todayPractice: ["سه دقیقه سکوت کن.", "یک انتخاب امروز را آگاهانه‌تر کن.", "یک فکر روشن را بنویس."],
    curatorNote: "اهونود گات صفحه مرجع برای تجربه‌های تأملی است؛ خلوت‌تر، روشن‌تر و کم‌نمایش‌تر از وندیداد."
  },
  {
    sectionSlug: "yashts",
    chapterSlug: "aban-yasht",
    sectionTitle: "یشت‌ها",
    chapterTitle: "آبان یشت",
    chapterIntro: "صفحه نمونه برای روایت آب، آناهیتا، پاکی، جریان زندگی و احترام به طبیعت در جهان اوستایی.",
    title: "چرا آب در اوستا مقدس بود؟",
    question: "آبان یشت چگونه آب را از عنصر طبیعی به نشانه زندگی تبدیل می‌کند؟",
    subtitle: "در این صفحه، آب به صورت یک روایت تصویری دیده می‌شود: نگهبان آب‌ها، پاکی، جریان جهان و پیام اخلاقی امروز.",
    coverImage: visualAssets.yashts,
    accent: "#9EE7F2",
    tone: "water",
    leadQuote: "اگر آب پاک بماند، زندگی جریان دارد؛ اگر فکر انسان پاک بماند، جهان درون او روشن می‌شود.",
    sidePanels: [
      {
        title: "نگهبان آب‌ها",
        body: "آبان یشت می‌تواند با قاب‌های آبی، طلایی و روشن، جایگاه آب را در زندگی و آیین نشان دهد.",
        icon: "water"
      },
      {
        title: "پاکی و طبیعت",
        body: "پیام صفحه برای کاربر امروز ساده است: احترام به آب یعنی احترام به نظم زنده جهان.",
        icon: "sparkles"
      },
      {
        title: "روایت تصویری",
        body: "هر کارت می‌تواند یک نکته کوتاه، یک تصویر و یک CTA برای مطالعه بندها داشته باشد.",
        icon: "sun"
      }
    ],
    storyPanels: [
      {
        title: "آب در اوستا",
        body: "ماده زندگی، هدیه اهورامزدا و نشانه پاکی در طبیعت و انسان.",
        image: visualAssets.yashts
      },
      {
        title: "احترام به آب",
        body: "بخش عملی صفحه: آلوده نکردن، مصرف آگاهانه و دیدن طبیعت به عنوان امانت.",
        image: visualAssets.media
      }
    ],
    ethicalMessage: "پاکی طبیعت با پاکی ذهن و کردار انسان جدا نیست.",
    todayPractice: ["یک رفتار کوچک برای صرفه‌جویی آب انجام بده.", "یک دقیقه کنار تصویر آب مکث کن.", "یک جمله درباره پاکی ذهن بنویس."],
    curatorNote: "این صفحه بر اساس reference-water-anahita طراحی شده: تصویر مرکزی روشن، کارت‌های کناری و پیام امروزی."
  },
  {
    sectionSlug: "yashts",
    chapterSlug: "mehr-yasht",
    sectionTitle: "یشت‌ها",
    chapterTitle: "مهر یشت",
    chapterIntro: "صفحه نمونه برای مهر، پیمان، روشنایی، مراقبت از راستی و پیوند اجتماعی.",
    title: "مهر؛ روشنایی پیمان و راستی",
    question: "چرا مهر در یشت‌ها با پیمان و مراقبت از راستی گره می‌خورد؟",
    subtitle: "مهر یشت باید فضایی روشن، آسمانی و حماسی داشته باشد؛ جایی میان خورشید، پیمان و مسئولیت.",
    coverImage: visualAssets.gathas,
    accent: "#F2D58A",
    tone: "silence",
    leadQuote: "پیمان وقتی نور دارد که گفتار انسان با کردار او یکی باشد.",
    sidePanels: [
      {
        title: "پیمان",
        body: "مهر یادآور مراقبت از قول، عدالت و وفاداری در رابطه انسان‌هاست.",
        icon: "shield"
      },
      {
        title: "روشنایی",
        body: "نور در این صفحه باید نرم و آسمانی باشد، نه تاریک و سنگین.",
        icon: "sun"
      },
      {
        title: "راستی اجتماعی",
        body: "پیام امروز مهر یشت می‌تواند به اعتماد، انصاف و مسئولیت اجتماعی وصل شود.",
        icon: "scale"
      }
    ],
    storyPanels: [
      {
        title: "پیمان روشن",
        body: "قاب‌هایی برای توضیح عهد، راستی و عدالت در زبان قابل فهم امروز.",
        image: visualAssets.monotheism
      },
      {
        title: "مهر و آسمان",
        body: "تصویرها باید آفتاب، کوه، سپیده و حس مراقبت را منتقل کنند.",
        image: visualAssets.yashts
      }
    ],
    ethicalMessage: "هیچ جامعه‌ای بدون اعتماد، راستگویی و وفای به پیمان روشن نمی‌ماند.",
    todayPractice: ["یک قول کوچک را کامل کن.", "یک رابطه را با صداقت روشن‌تر کن.", "از یک بی‌انصافی کوچک پرهیز کن."],
    curatorNote: "این صفحه برای توسعه آینده مهر یشت آماده شده و باید با تصویر آسمان، خورشید و پیمان تکمیل شود."
  },
  {
    sectionSlug: "vendidad",
    chapterSlug: "fargard-1",
    sectionTitle: "وندیداد",
    chapterTitle: "فرگرد اول",
    chapterIntro: "صفحه نمونه برای روایت آفرینش سرزمین‌های نیک، ورود تاریکی و مسئولیت انسان در برابر جهان.",
    title: "سرزمین‌هایی که اهورامزدا آفرید",
    question: "وندیداد چگونه جهان را میدان انتخاب نور و تاریکی نشان می‌دهد؟",
    subtitle: "فرگرد اول با تصویرهای روشن و تاریک باید روایت کند که جهان زیباست، اما هر زیبایی نیاز به مراقبت دارد.",
    coverImage: visualAssets.vendidad,
    accent: "#8DD6FF",
    tone: "creation",
    leadQuote: "جهان فقط صحنه تماشا نیست؛ هر انتخاب انسان، بخشی از نبرد نور و تاریکی است.",
    sidePanels: [
      {
        title: "آفرینش روشن",
        body: "سرزمین‌های نیک با رنگ‌های روشن‌تر، آبی، سبز و طلایی نمایش داده می‌شوند.",
        icon: "sun"
      },
      {
        title: "ورود آسیب",
        body: "تاریکی در این صفحه باید معنا داشته باشد: هشدار، نه غلبه کامل بر تصویر.",
        icon: "shield"
      },
      {
        title: "انتخاب انسان",
        body: "پیام اصلی فرگرد اول این است که انسان در حفظ جهان نقش دارد.",
        icon: "scale"
      }
    ],
    storyPanels: [
      {
        title: "جهان زیبا",
        body: "کارت‌های سرزمین‌ها، نعمت‌ها و نظم نخستین.",
        image: visualAssets.zoroastrianism
      },
      {
        title: "تاریکی وارد می‌شود",
        body: "کارت‌های آسیب، آلودگی، بیماری و نیاز به هوشیاری.",
        image: visualAssets.vendidad
      }
    ],
    ethicalMessage: "انسان با پاکی در اندیشه، گفتار و کردار، جهان را از تاریکی رها می‌کند.",
    todayPractice: ["یک انتخاب نادرست را اصلاح کن.", "یک گوشه از خانه یا محیطت را پاک کن.", "یک نعمت را آگاهانه شکر کن."],
    curatorNote: "این صفحه از reference-vendidad-first الهام گرفته: دوگانه روشنایی/تاریکی با پیام اخلاقی روشن."
  },
  {
    sectionSlug: "vendidad",
    chapterSlug: "fargard-2",
    sectionTitle: "وندیداد",
    chapterTitle: "فرگرد دوم",
    chapterIntro: "صفحه نمونه برای روایت جم، پناهگاه نجات و آماده‌سازی انسان در برابر بحران.",
    title: "جمشید؛ پادشاهی که می‌خواست جهان را نجات دهد",
    question: "فرگرد دوم چه تصویری از مسئولیت، بحران و نجات می‌سازد؟",
    subtitle: "این صفحه باید حماسی‌تر باشد: زمستان بزرگ، پناهگاه، انتخاب بهترین‌ها و پیام مراقبت از زندگی.",
    coverImage: visualAssets.vendidad,
    accent: "#F0C66D",
    tone: "judgment",
    leadQuote: "وقتی بحران نزدیک می‌شود، خرد یعنی آماده کردن جای امن برای زندگی.",
    sidePanels: [
      {
        title: "زمستان بزرگ",
        body: "تهدید نباید فقط ترسناک باشد؛ باید کاربر را به فکر آمادگی و مسئولیت ببرد.",
        icon: "mountain"
      },
      {
        title: "وَر جم",
        body: "پناهگاه جم می‌تواند مثل یک شهر نورانی در دل تاریکی تصویر شود.",
        icon: "shield"
      },
      {
        title: "نگهبانی از زندگی",
        body: "انسان، حیوان، گیاه و بذر زندگی در این روایت کنار هم دیده می‌شوند.",
        icon: "sparkles"
      }
    ],
    storyPanels: [
      {
        title: "داستان شبیه کشتی نوح",
        body: "اما با رنگ و بوی ایرانی؛ پناهگاه برای حفظ زندگی در برابر نابودی.",
        image: visualAssets.yashts
      },
      {
        title: "پیام فرگرد دوم",
        body: "برای نجات جهان، باید آگاه، درستکار و نگهبان نور باشی.",
        image: visualAssets.homeHero
      }
    ],
    ethicalMessage: "آمادگی، خرد و مراقبت از زندگی، شکل امروزی پیام جمشید است.",
    todayPractice: ["یک برنامه کوچک برای بحران بنویس.", "یک چیز ارزشمند را بهتر نگهداری کن.", "یک انتخاب آگاهانه برای آینده انجام بده."],
    curatorNote: "این صفحه از reference-vendidad-second الهام گرفته: روایت حماسی، زمستان، پناهگاه و پیام امید."
  },
  {
    sectionSlug: "khordeh-avesta",
    chapterSlug: "daily-prayers",
    sectionTitle: "خرده اوستا",
    chapterTitle: "نیایش‌های روزانه",
    chapterIntro: "صفحه نمونه برای نیایش‌های کوتاه، آرامش روزانه، نیت و بازگشت به نور.",
    title: "نیایش روزانه؛ روشنایی در زندگی معمول",
    question: "چطور خرده اوستا به یک همراه روزانه تبدیل می‌شود؟",
    subtitle: "نیایش‌های روزانه باید کوتاه، آرام، روشن و قابل ذخیره باشند؛ نه سنگین و دور از زندگی.",
    coverImage: visualAssets.khordehAvesta,
    accent: "#F2D58A",
    tone: "ritual",
    leadQuote: "گاهی یک جمله روشن، مسیر یک روز کامل را عوض می‌کند.",
    sidePanels: [
      {
        title: "صبح",
        body: "شروع روز با نیت، یک متن کوتاه و یک تمرین اخلاقی.",
        icon: "sun"
      },
      {
        title: "میان روز",
        body: "بازگشت کوتاه به تمرکز وقتی ذهن شلوغ شده است.",
        icon: "brain"
      },
      {
        title: "شب",
        body: "مرور کردار روز و آماده شدن برای فردا.",
        icon: "sparkles"
      }
    ],
    storyPanels: [
      {
        title: "نیایش کوتاه",
        body: "برای موبایل، ذخیره مطالعه و ادامه روزانه طراحی می‌شود.",
        image: visualAssets.khordehAvesta
      },
      {
        title: "آرامش روشن",
        body: "خواندن، شنیدن و ثبت نیت در یک مسیر نرم و نورانی.",
        image: visualAssets.library
      }
    ],
    ethicalMessage: "معنویت ماندگار از تکرارهای کوچک و روشن ساخته می‌شود.",
    todayPractice: ["یک نیت برای امروز انتخاب کن.", "یک جمله آرام بخوان.", "در پایان روز یک کردار نیک را یادداشت کن."],
    curatorNote: "این صفحه باید روشن‌تر، خلوت‌تر و روزانه‌تر از بخش‌های حماسی باشد."
  },
  {
    sectionSlug: "khordeh-avesta",
    chapterSlug: "atash-niyayesh",
    sectionTitle: "خرده اوستا",
    chapterTitle: "آتش نیایش",
    chapterIntro: "صفحه نمونه برای نیایش آتش، بیداری، پاکی و یادآوری حقیقت در زندگی روزانه.",
    title: "آتش نیایش؛ نور را در دل خود روشن کن",
    question: "چرا آتش در نیایش روزانه فقط شعله نیست؟",
    subtitle: "آتش نیایش باید گرما، آگاهی و وقار داشته باشد؛ شبیه آتشکده‌ای آرام برای فکر کردن.",
    coverImage: visualAssets.yasna,
    accent: "#F2B45E",
    tone: "fire",
    leadQuote: "نور را در دل خود روشن کن تا آتش بیرون، راهت را نشان دهد.",
    sidePanels: [
      {
        title: "آگاهی",
        body: "آتش یادآور بیداری و حضور ذهن است.",
        icon: "flame"
      },
      {
        title: "پاکی",
        body: "نیایش آتش با حس پاکی، تمرکز و احترام طراحی می‌شود.",
        icon: "sparkles"
      },
      {
        title: "راهنمایی",
        body: "کاربر بعد از خواندن باید یک کار روشن برای امروز داشته باشد.",
        icon: "sun"
      }
    ],
    storyPanels: [
      {
        title: "آتشکده آرام",
        body: "الگوی بصری صفحه از reference-atashkadeh می‌آید: آتش مرکزی و پنل‌های دانستنی.",
        image: visualAssets.yasna
      },
      {
        title: "تمرین درونی",
        body: "نیت روزانه و یک رفتار روشن به متن وصل می‌شود.",
        image: visualAssets.gathas
      }
    ],
    ethicalMessage: "آتش بیرونی وقتی معنا دارد که آگاهی درونی را زنده کند.",
    todayPractice: ["یک دقیقه به یک شعله یا نور نگاه کن.", "یک فکر آشفته را آرام کن.", "یک کار درست را همین امروز انجام بده."],
    curatorNote: "این صفحه از reference-atashkadeh الهام گرفته و برای نیایش‌های نورانی آماده است."
  },
  {
    sectionSlug: "visperad",
    chapterSlug: "visperad-starter",
    sectionTitle: "ویسپرد",
    chapterTitle: "درآمد ویسپرد",
    chapterIntro: "صفحه نمونه برای ورود به ویسپرد؛ آیین جمعی، پیوند، ستایش ردان و نظم بزرگ‌تر نیایش.",
    title: "ویسپرد؛ وقتی نیایش جمعی می‌شود",
    question: "چگونه ویسپرد یسنا را به آیینی گسترده‌تر و پیوندی‌تر تبدیل می‌کند؟",
    subtitle: "درآمد ویسپرد باید حس مراسم، هم‌خوانی، آتش، ستون‌های سنگی و قاب‌های آیینی داشته باشد.",
    coverImage: visualAssets.avesta,
    accent: "#E7C26B",
    tone: "ritual",
    leadQuote: "در آیین، هر صدا تنها نیست؛ بخشی از نظمی بزرگ‌تر و روشن‌تر است.",
    sidePanels: [
      {
        title: "مراسم",
        body: "ویسپرد باید با چینش آیینی، نشانه‌های آتش و حس حضور جمعی طراحی شود.",
        icon: "sparkles"
      },
      {
        title: "ردان",
        body: "این صفحه جایگاه ستایش نیروهای نیک و ردان را در زبان ساده توضیح می‌دهد.",
        icon: "shield"
      },
      {
        title: "پیوند متن‌ها",
        body: "ویسپرد می‌تواند کاربران را از یسنا به نیایش‌ها، واژه‌نامه و منابع پژوهشی هدایت کند.",
        icon: "scroll"
      }
    ],
    storyPanels: [
      {
        title: "تالار آیینی",
        body: "فضا باید حس مراسم و نیایش جمعی را بدون شلوغی اضافه منتقل کند.",
        image: visualAssets.avesta
      },
      {
        title: "همه نیروهای نیک",
        body: "هر نام یا مفهوم مهم می‌تواند به واژه‌نامه و مقاله مرتبط وصل شود.",
        image: visualAssets.dictionary
      }
    ],
    ethicalMessage: "آیین جمعی یادآور این است که روشنایی فقط تجربه فردی نیست؛ پیوند انسانی هم هست.",
    todayPractice: ["برای یک نفر دعا یا آرزوی نیک کن.", "یک پیوند کوچک را ترمیم کن.", "یک کار نیک را بی‌نام انجام بده."],
    curatorNote: "این صفحه پایه طراحی ویسپرد است؛ آیینی، طلایی، سنگی و کمی روشن‌تر از فضای عمومی اوستا."
  },
  {
    sectionSlug: "hats",
    chapterSlug: "ha-map",
    sectionTitle: "هات‌ها",
    chapterTitle: "نقشه هات‌ها",
    chapterIntro: "صفحه نمونه برای فهم ساختار هات‌ها؛ طومار مطالعه، شماره‌بندی، پیشرفت و مسیر ورود به بندها.",
    title: "نقشه هات‌ها؛ از طومار تا تجربه",
    question: "چگونه یک متن بزرگ به مسیرهای کوچک و قابل مطالعه تبدیل می‌شود؟",
    subtitle: "این صفحه باید مثل میز مطالعه یک نسخه کهن باشد: طومار، کتاب، شماره‌ها، وضعیت تکمیل و CTA روشن.",
    coverImage: visualAssets.hats,
    accent: "#E8C878",
    tone: "scroll",
    leadQuote: "متن بزرگ وقتی زنده می‌شود که راه خواندن آن روشن و قابل ادامه باشد.",
    sidePanels: [
      {
        title: "ساختار",
        body: "هات‌ها به کاربر کمک می‌کنند بداند کجای متن ایستاده و قدم بعدی چیست.",
        icon: "scroll"
      },
      {
        title: "پیشرفت",
        body: "هر هات باید وضعیت محتوا، تصویر، صوت، منبع و SEO خودش را داشته باشد.",
        icon: "shield"
      },
      {
        title: "خواندن مرحله‌ای",
        body: "کاربر به جای روبه‌رو شدن با متن عظیم، مسیرهای کوچک و قابل فهم می‌بیند.",
        icon: "sparkles"
      }
    ],
    storyPanels: [
      {
        title: "طومار مطالعه",
        body: "کارت‌ها باید شبیه قطعه‌های یک نقشه خواندن باشند، نه لیست خشک.",
        image: visualAssets.hats
      },
      {
        title: "سیستم محتوای طلایی",
        body: "هر هات به متن اصلی، ترجمه، بازنویسی ساده، تحلیل و پیام اخلاقی وصل می‌شود.",
        image: visualAssets.library
      }
    ],
    ethicalMessage: "فهم متن مقدس با صبر، نظم و قدم‌های کوچک ساخته می‌شود.",
    todayPractice: ["یک هات برای مطالعه انتخاب کن.", "فقط یک بند را کامل بخوان.", "یک جمله از پیام آن را نگه دار."],
    curatorNote: "این صفحه پایه تکثیر هزاران صفحه مطالعه است؛ باید کاربردی، روشن و بسیار خوانا باشد."
  }
];

export const avestaChapterGuides = Object.fromEntries(
  chapterGuideList.map((guide) => [`${guide.sectionSlug}/${guide.chapterSlug}`, guide])
) as Record<string, AvestaChapterGuide>;

export function getAvestaChapterGuide(sectionSlug: string, chapterSlug: string) {
  return avestaChapterGuides[`${sectionSlug}/${chapterSlug}`];
}

export function getAvestaChapterGuideList() {
  return chapterGuideList;
}
