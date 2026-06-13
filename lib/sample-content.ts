export type ReadingBlock = {
  label: string;
  title: string;
  body: string;
};

export type SampleVerse = {
  sectionSlug: string;
  chapterSlug?: string;
  verseSlug?: string;
  chapterTitle: string;
  verseNumber: string;
  quote: string;
  blocks: ReadingBlock[];
  ethicalMessage: string;
  progress: number;
};

export const sampleVerses: SampleVerse[] = [
  {
    sectionSlug: "yasna",
    chapterSlug: "ha-1",
    verseSlug: "verse-1",
    chapterTitle: "یسنا ۱",
    verseNumber: "هات نمونه ۱",
    quote: "روشنایی زمانی معنا دارد که انسان آن را در اندیشه و کردار خود نگه دارد.",
    progress: 18,
    ethicalMessage:
      "نیایش فقط گفتن کلمات نیست؛ تمرین توجه، نظم و انتخاب روشنایی در زندگی روزمره است.",
    blocks: [
      {
        label: "متن اصلی",
        title: "جایگاه متن اوستایی",
        body: "در نسخه نهایی، متن اوستایی هر بند در این بخش قرار می‌گیرد و با آوانویسی، ترجمه و توضیح لایه‌به‌لایه همراه می‌شود.",
      },
      {
        label: "ترجمه کلاسیک",
        title: "خوانش پژوهشی",
        body: "ترجمه کلاسیک برای حفظ دقت تاریخی و پژوهشی نمایش داده می‌شود تا کاربر بتواند متن را با منابع معتبر دنبال کند.",
      },
      {
        label: "بازنویسی ساده",
        title: "فهم امروزی",
        body: "بازنویسی ساده، مفهوم متن را به فارسی روان امروز منتقل می‌کند؛ برای کاربری که می‌خواهد بفهمد، نه فقط بخواند.",
      },
      {
        label: "تحلیل مفهومی",
        title: "لایه معنا",
        body: "اینجا تحلیل فلسفی، اخلاقی و آیینی متن قرار می‌گیرد و نشان می‌دهد هر بند چه جایگاهی در جهان‌بینی زرتشتی دارد.",
      },
    ],
  },
  {
    sectionSlug: "gathas",
    chapterSlug: "ahunavaiti",
    verseSlug: "verse-1",
    chapterTitle: "اهونود گات",
    verseNumber: "سرود نمونه",
    quote: "خرد، راهی است که انسان با آزادی و مسئولیت انتخاب می‌کند.",
    progress: 32,
    ethicalMessage: "پیام گات‌ها انسان را به انتخاب آگاهانه، راستی و مسئولیت اخلاقی دعوت می‌کند.",
    blocks: [
      {
        label: "متن اصلی",
        title: "سرود گاهانی",
        body: "متن اصلی گاهانی با دقت پژوهشی، شماره‌بندی و ارجاع‌پذیری در این قسمت قرار می‌گیرد.",
      },
      {
        label: "ترجمه کلاسیک",
        title: "معنای دقیق",
        body: "ترجمه کلاسیک کمک می‌کند لحن و بافت متن کهن حفظ شود و مسیر مطالعه علمی روشن بماند.",
      },
      {
        label: "بازنویسی ساده",
        title: "زبان امروز",
        body: "در بازنویسی ساده، مفهوم سرود به زبان روشن و الهام‌بخش امروز بازگو می‌شود.",
      },
      {
        label: "تحلیل مفهومی",
        title: "پیام برای اکنون",
        body: "تحلیل نشان می‌دهد مفاهیمی مثل اشا، وهومن و انتخاب اخلاقی چگونه می‌توانند به زندگی امروز وصل شوند.",
      },
    ],
  },
];

export const sampleChapters = [
  {
    sectionSlug: "yasna",
    title: "یسنا ۱",
    slug: "ha-1",
    description: "نمونه مسیر مطالعه یسنا با ساختار متن، ترجمه، بازنویسی ساده و تحلیل.",
    verses: [
      {
        title: "هات نمونه ۱",
        slug: "verse-1",
        excerpt: "آغاز مسیر مطالعه با نمونه محتوای طلایی AVESTA-ZOROASTER.",
      },
    ],
  },
  {
    sectionSlug: "gathas",
    title: "اهونود گات",
    slug: "ahunavaiti",
    description: "نمونه مسیر مطالعه گات‌ها با تمرکز بر خرد، انتخاب و پیام اخلاقی.",
    verses: [
      {
        title: "سرود نمونه",
        slug: "verse-1",
        excerpt: "خوانش نمونه برای سروده‌های گاهانی.",
      },
    ],
  },
];

export const glossaryTerms = [
  {
    term: "اشا",
    slug: "asha",
    meaning: "راستی، نظم کیهانی و هماهنگی اخلاقی",
    root: "Asha / Arta",
    description: "اشا یکی از کلیدی‌ترین مفاهیم جهان زرتشتی است و به راستی، نظم و راه درست اشاره دارد.",
  },
  {
    term: "وهومن",
    slug: "vohuman",
    meaning: "اندیشه نیک",
    root: "Vohu Manah",
    description: "وهومن نیروی اندیشه نیک و خرد اخلاقی است؛ راهی برای دیدن جهان با روشنایی و انصاف.",
  },
  {
    term: "اهورامزدا",
    slug: "ahura-mazda",
    meaning: "سرور دانا",
    root: "Ahura Mazda",
    description: "اهورامزدا سرچشمه دانایی، روشنایی و نظم اخلاقی در آموزه‌های زرتشتی است.",
  },
  {
    term: "فروهر",
    slug: "faravahar",
    meaning: "نماد راه، انتخاب و نیروی پیش‌برنده معنوی",
    root: "Fravashi",
    description: "فروهر در فرهنگ ایرانی به نمادی از هویت، انتخاب اخلاقی و تعالی انسان تبدیل شده است.",
  },
  {
    term: "گاتا",
    slug: "gatha",
    meaning: "سرود",
    root: "Gatha",
    description: "گات‌ها کهن‌ترین سروده‌های منسوب به زرتشت هستند و هسته معنوی و اخلاقی پروژه را شکل می‌دهند.",
  },
];

export const searchIndex = [
  {
    title: "یکتاپرستی، خرد و روشنایی",
    type: "هاب آموزشی",
    href: "/monotheism",
    excerpt: "هاب مرکزی اهورامزدا، اشا، اختیار انسان و پیام پندار نیک، گفتار نیک، کردار نیک.",
  },
  {
    title: "اشا؛ نظم راستی در جهان زرتشتی",
    type: "واژه‌نامه",
    href: "/dictionary/asha",
    excerpt: "راستی، نظم کیهانی و هماهنگی اخلاقی در قلب آموزه‌های زرتشتی.",
  },
  {
    title: "گات‌ها چیست؟",
    type: "مقاله",
    href: "/articles/what-are-gathas",
    excerpt: "مسیر ورود به کهن‌ترین سروده‌های منسوب به زرتشت.",
  },
  {
    title: "پورتال یسنا",
    type: "اوستا",
    href: "/avesta/yasna",
    excerpt: "آیین نیایش، آتش مقدس و ساختار مطالعه هات‌ها.",
  },
];

export const timelineEvents = [
  {
    era: "آغاز پیام",
    title: "زرتشت و دعوت به راستی",
    date: "دوره کهن",
    description: "روایت آغازین پروژه از پیام خرد، انتخاب اخلاقی، اشا و مسئولیت انسان در برابر روشنایی.",
    accent: "#F2D58A",
  },
  {
    era: "سروده‌ها",
    title: "شکل‌گیری گات‌ها",
    date: "هسته معنوی",
    description: "گات‌ها به عنوان کهن‌ترین لایه آموزه‌ها، محور خوانش فلسفی و اخلاقی سایت خواهند بود.",
    accent: "#FFF8EA",
  },
  {
    era: "ایران شاهنشاهی",
    title: "هخامنشیان و فرهنگ ایران باستان",
    date: "دوره هخامنشی",
    description: "پیوند هنر، کتیبه، معماری و تصویر ایران باستان با تجربه بصری AVESTA-ZOROASTER.",
    accent: "#D6A84F",
  },
  {
    era: "حفظ متن",
    title: "ساسانیان و گردآوری اوستا",
    date: "دوره ساسانی",
    description: "مسیر حفظ، تنظیم و انتقال متن‌ها؛ بخشی مهم برای صفحات پژوهشی و کتابخانه دیجیتال.",
    accent: "#7EA4C8",
  },
  {
    era: "امروز",
    title: "زرتشتیان و میراث زنده",
    date: "دوران معاصر",
    description: "نمایش پیوند آیین، اخلاق، فرهنگ و زندگی امروز در قالب مقاله، رسانه، صوت و تایم‌لاین.",
    accent: "#B9B9B9",
  },
];

export const libraryItems = [
  {
    title: "راهنمای مطالعه اوستا",
    author: "تحریریه AVESTA-ZOROASTER",
    language: "فارسی",
    type: "PDF",
    category: "راهنما",
    description: "مسیر پیشنهادی برای شروع مطالعه اوستا، گات‌ها و مفاهیم پایه.",
    href: "/library/avesta-reading-guide.pdf",
    accent: "#D6A84F",
  },
  {
    title: "Gathas Study Notes",
    author: "Editorial Research",
    language: "English",
    type: "Article",
    category: "پژوهش",
    description: "English notes for future bilingual study pages and references.",
    href: "/articles/what-are-gathas",
    accent: "#F2D58A",
  },
  {
    title: "واژه‌های کلیدی زرتشتی",
    author: "واژه‌نامه پروژه",
    language: "فارسی",
    type: "Glossary",
    category: "واژه‌نامه",
    description: "مجموعه مفاهیم اشا، وهومن، اهورامزدا، فروهر و گاتا.",
    href: "/dictionary",
    accent: "#FFF8EA",
  },
  {
    title: "نسخه‌های تاریخی و منابع قدیمی",
    author: "آرشیو پروژه",
    language: "چندزبانه",
    type: "Archive",
    category: "نسخه قدیمی",
    description: "جایگاه آینده برای نسخه‌های اسکن‌شده، منابع کتابخانه‌ای و ارجاعات پژوهشی.",
    href: "/library/archive",
    accent: "#7EA4C8",
  },
];

export const mediaItems = [
  {
    title: "آتش مقدس یسنا",
    type: "AI Image",
    category: "یسنا",
    mood: "طلایی، آیینی، معبد و نور خورشید",
    description: "تصویرسازی اختصاصی برای فضای یسنا با آتش آرام و معماری هخامنشی.",
    prompt:
      "Cinematic ancient Persian temple at sunrise, sacred fire altar, Avestan script mist, gold and deep navy palette, museum quality, no modern objects",
    accent: "#D6A84F",
  },
  {
    title: "سپیدی گات‌ها",
    type: "AI Image",
    category: "گات‌ها",
    mood: "روشن، الهی، مینیمال و معنوی",
    description: "فضای تصویری برای سروده‌های گاهانی؛ سپیدی، طلا و حس آرامش.",
    prompt:
      "Luminous spiritual scene inspired by ancient Iranian wisdom, soft white and gold light, peaceful mountain horizon, cinematic digital museum artwork",
    accent: "#FFF8EA",
  },
  {
    title: "وندیداد رازآلود",
    type: "AI Image",
    category: "وندیداد",
    mood: "آبی تیره، آتش نارنجی، قانون و پاکی",
    description: "فضای تاریک‌تر و رازآلود برای وندیداد با حس قانون، پاکی و مراقبت.",
    prompt:
      "Dark blue ancient Persian chamber, orange sacred flame, mysterious ritual purity atmosphere, carved stone, cinematic shadows",
    accent: "#7EA4C8",
  },
  {
    title: "روایت صوتی گات‌ها",
    type: "Audio",
    category: "صوت",
    mood: "آرام، روایی، عمیق",
    description: "جایگاه آینده فایل‌های صوتی، پادکست و خوانش بندهای اوستا.",
    prompt: "Audio narration placeholder for Gathas reading and explanation.",
    accent: "#F2D58A",
  },
];

export const articleItems = [
  {
    title: "اشا؛ نظم راستی در جهان زرتشتی",
    slug: "asha-truth-order",
    excerpt: "اشا فقط یک واژه اخلاقی نیست؛ راهی برای فهم نظم جهان، راستی انسان و پیوند کردار با روشنایی است.",
    category: "مفاهیم",
    tags: ["اشا", "اخلاق", "زرتشت"],
    readingTime: "۷ دقیقه",
    publishedAt: "2026-05-25",
    coverTone: "طلایی، روشن، مفهومی",
    seoTitle: "اشا چیست؟ معنی اشا در دین زرتشتی و اوستا",
    seoDescription:
      "معرفی مفهوم اشا در جهان زرتشتی، پیوند آن با راستی، نظم اخلاقی، گات‌ها و زندگی امروز.",
    relatedTerms: ["asha", "vohuman"],
    relatedVerses: ["/avesta/gathas/ahunavaiti/verse-1"],
    sections: [
      {
        heading: "اشا یعنی چه؟",
        body: "اشا یکی از بنیادین‌ترین مفاهیم در جهان زرتشتی است. این مفهوم هم به راستی اخلاقی اشاره دارد و هم به نظم عمیق جهان؛ نظمی که انسان با اندیشه، گفتار و کردار خود می‌تواند با آن هماهنگ شود.",
      },
      {
        heading: "اشا در زندگی امروز",
        body: "در خوانش امروزی، اشا می‌تواند به معنای انتخاب آگاهانه، صداقت در عمل و تلاش برای ساختن نظمی انسانی‌تر در زندگی روزمره باشد.",
      },
    ],
  },
  {
    title: "گات‌ها چیست و چرا مهم است؟",
    slug: "what-are-gathas",
    excerpt: "گات‌ها هسته معنوی و فلسفی آموزه‌های زرتشت‌اند؛ سروده‌هایی برای خرد، انتخاب و مسئولیت اخلاقی.",
    category: "اوستا",
    tags: ["گات‌ها", "زرتشت", "اوستا"],
    readingTime: "۹ دقیقه",
    publishedAt: "2026-05-25",
    coverTone: "سپید، مینوی، آرام",
    seoTitle: "گات‌ها چیست؟ آشنایی با سروده‌های زرتشت",
    seoDescription:
      "معرفی گات‌ها، جایگاه آن‌ها در اوستا، پیام اخلاقی و اهمیتشان برای شناخت زرتشت.",
    relatedTerms: ["gatha", "asha"],
    relatedVerses: ["/avesta/gathas/ahunavaiti/verse-1"],
    sections: [
      {
        heading: "گات‌ها در قلب اوستا",
        body: "گات‌ها کهن‌ترین لایه سروده‌های منسوب به زرتشت به شمار می‌آیند و در این پروژه به شکل متن، ترجمه، بازنویسی ساده و تحلیل مفهومی ارائه می‌شوند.",
      },
      {
        heading: "پیام گات‌ها",
        body: "پیام مرکزی گات‌ها دعوت به خرد، راستی، انتخاب آگاهانه و مسئولیت انسان در برابر نیکی و روشنایی است.",
      },
    ],
  },
  {
    title: "فروهر؛ نماد راه و انتخاب",
    slug: "faravahar-symbol",
    excerpt: "فروهر در فرهنگ امروز ایران به نشانه هویت، تعالی و انتخاب اخلاقی تبدیل شده است.",
    category: "نمادها",
    tags: ["فروهر", "ایران باستان", "نماد"],
    readingTime: "۶ دقیقه",
    publishedAt: "2026-05-25",
    coverTone: "طلایی، هخامنشی، نمادین",
    seoTitle: "فروهر چیست؟ معنی و نمادشناسی فروهر",
    seoDescription:
      "بررسی فروهر به عنوان نماد فرهنگی و معنوی در ایران باستان و جهان زرتشتی.",
    relatedTerms: ["faravahar"],
    relatedVerses: ["/timeline"],
    sections: [
      {
        heading: "فروهر در نگاه امروز",
        body: "فروهر برای بسیاری از مخاطبان امروز، نشانه‌ای از هویت ایرانی، حرکت رو به بالا و انتخاب میان مسیرهای اخلاقی زندگی است.",
      },
      {
        heading: "کاربرد در طراحی سایت",
        body: "در AVESTA-ZOROASTER، فروهر می‌تواند به عنوان نشانه بصری، آیکون راهنما و نماد ورود به جهان خرد ایران باستان استفاده شود.",
      },
    ],
  },
];

export const monotheismPillars = [
  {
    title: "اهورامزدا؛ دانایی و روشنایی",
    subtitle: "یک سرچشمه برتر برای خرد، راستی و نظم اخلاقی",
    description:
      "در روایت سایت، یکتاپرستی زرتشتی با تمرکز بر اهورامزدا به عنوان سرچشمه دانایی، روشنایی و نظم اخلاقی معرفی می‌شود.",
    accent: "#F2D58A",
  },
  {
    title: "اشا؛ قانون راستی",
    subtitle: "جهان معنا دارد و انسان می‌تواند با راستی هماهنگ شود",
    description: "اشا محور اخلاقی این هاب است: راستی، نظم، هماهنگی و مسئولیت.",
    accent: "#D6A84F",
  },
  {
    title: "اختیار انسان",
    subtitle: "انتخاب میان روشنایی و تاریکی",
    description: "انسان با پندار، گفتار و کردار خود در ساختن جهان اخلاقی سهم دارد.",
    accent: "#FFF8EA",
  },
  {
    title: "پندار نیک، گفتار نیک، کردار نیک",
    subtitle: "فرمول ساده، عمیق و جهانی اخلاق",
    description: "این شعار ستون طلایی کل سایت است؛ از صفحه خانه تا مطالعه اوستا و مقاله‌ها.",
    accent: "#B9B9B9",
  },
];

export const monotheismJourney = [
  {
    step: "۱",
    title: "شناخت",
    description: "کاربر ابتدا با اهورامزدا، اشا، وهومن و گات‌ها آشنا می‌شود.",
  },
  {
    step: "۲",
    title: "مطالعه",
    description: "بعد وارد متن اوستا و گات‌ها می‌شود و هر بند را با ترجمه و تحلیل می‌خواند.",
  },
  {
    step: "۳",
    title: "تجربه",
    description: "تصویر، صوت، تایم‌لاین و مقاله‌ها فهم را به یک تجربه سینمایی تبدیل می‌کنند.",
  },
  {
    step: "۴",
    title: "کاربرد امروز",
    description: "پیام اخلاقی هر متن به زندگی امروز وصل می‌شود: انتخاب، راستی، خرد و مسئولیت.",
  },
];

export const profileSnapshot = {
  user: {
    name: "همراه اوستا",
    level: "جوینده روشنایی",
    joinedAt: "2026-05-25",
  },
  readingStats: [
    {
      label: "پیشرفت مطالعه",
      value: "۱۸٪",
      description: "بر اساس نمونه مسیر یسنا و گات‌ها",
    },
    {
      label: "بوکمارک‌ها",
      value: "۳",
      description: "بندها، مقاله‌ها و واژه‌ها",
    },
    {
      label: "زمان مطالعه",
      value: "۲۴ دقیقه",
      description: "نمونه آمار برای اتصال به حساب کاربری",
    },
  ],
  continueReading: {
    title: "هات نمونه ۱",
    section: "یسنا",
    href: "/avesta/yasna/ha-1/verse-1",
    progress: 18,
    excerpt: "ادامه خواندن متن اصلی، ترجمه کلاسیک، بازنویسی ساده و پیام اخلاقی.",
  },
  bookmarks: [
    {
      title: "اشا؛ نظم راستی",
      type: "مقاله",
      href: "/articles/asha-truth-order",
    },
    {
      title: "اهورامزدا",
      type: "واژه‌نامه",
      href: "/dictionary/ahura-mazda",
    },
    {
      title: "یکتاپرستی، خرد و روشنایی",
      type: "هاب",
      href: "/monotheism",
    },
  ],
  readingSettings: {
    mode: "شب",
    fontSize: "۱۸px",
    audio: "فعال",
    language: "فارسی",
  },
};

export const adminDashboard = {
  metrics: [
    {
      label: "بخش‌های اوستا",
      value: "۷",
      change: "آماده ورود محتوا",
      tone: "#D6A84F",
    },
    {
      label: "بندهای نمونه",
      value: "۲",
      change: "متصل به مسیر مطالعه",
      tone: "#F2D58A",
    },
    {
      label: "مقاله‌ها",
      value: "۳",
      change: "دارای JSON-LD",
      tone: "#FFF8EA",
    },
    {
      label: "واژه‌نامه",
      value: "۵",
      change: "قابل اتصال به متن",
      tone: "#7EA4C8",
    },
  ],
  publishingQueue: [
    {
      title: "تکمیل یسنا ۱",
      type: "اوستا",
      status: "نیازمند متن اصلی",
      owner: "Editor",
    },
    {
      title: "تصویر AI برای وندیداد",
      type: "رسانه",
      status: "در صف تولید",
      owner: "Media",
    },
    {
      title: "مقاله اهورامزدا",
      type: "مقاله",
      status: "نیازمند SEO",
      owner: "Content",
    },
  ],
  seoChecks: [
    {
      label: "metadata صفحات اصلی",
      status: "فعال",
      score: 92,
    },
    {
      label: "schema مقاله‌ها",
      status: "فعال",
      score: 88,
    },
    {
      label: "sitemap و robots",
      status: "آماده",
      score: 95,
    },
    {
      label: "Meilisearch",
      status: "در انتظار اتصال",
      score: 40,
    },
  ],
  systemHealth: [
    {
      label: "PostgreSQL",
      value: "آماده تنظیم DATABASE_URL",
    },
    {
      label: "Prisma",
      value: "schema و seed آماده",
    },
    {
      label: "Auth",
      value: "demo cookie فعال",
    },
    {
      label: "Uploads",
      value: "در انتظار storage",
    },
  ],
};
