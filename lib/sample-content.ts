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
  {
    sectionSlug: "yashts",
    chapterSlug: "aban-yasht",
    verseSlug: "verse-1",
    chapterTitle: "آبان یشت",
    verseNumber: "بند نمونه آبان",
    quote: "آب پاک، جریان زندگی و نشانه احترام انسان به نظم جهان است.",
    progress: 21,
    ethicalMessage: "احترام به آب یعنی احترام به زندگی، طبیعت و پاکی ذهن و کردار.",
    blocks: [
      {
        label: "متن اصلی",
        title: "جایگاه آبان یشت",
        body: "در نسخه نهایی، بندهای آبان یشت با متن اصلی، آوانویسی و ارجاع دقیق در این بخش قرار می‌گیرند.",
      },
      {
        label: "ترجمه کلاسیک",
        title: "خوانش پژوهشی آب",
        body: "ترجمه کلاسیک نشان می‌دهد آب در متن اوستایی فقط ماده طبیعی نیست، بلکه نشانه زندگی و پاکی است.",
      },
      {
        label: "بازنویسی ساده",
        title: "زبان امروز",
        body: "آب را آلوده نکن؛ چون آسیب به آب، آسیب به جریان زندگی و نظم طبیعت است.",
      },
      {
        label: "تحلیل مفهومی",
        title: "پیام آب",
        body: "آبان یشت می‌تواند کاربر امروز را از مصرف بی‌توجه به رابطه اخلاقی با طبیعت برساند.",
      },
    ],
  },
  {
    sectionSlug: "yashts",
    chapterSlug: "mehr-yasht",
    verseSlug: "verse-1",
    chapterTitle: "مهر یشت",
    verseNumber: "بند نمونه مهر",
    quote: "مهر، روشنایی پیمان است؛ جایی که گفتار و کردار انسان یکی می‌شوند.",
    progress: 24,
    ethicalMessage: "وفای به پیمان، راستگویی و اعتماد، شکل اجتماعی پندار و کردار نیک است.",
    blocks: [
      {
        label: "متن اصلی",
        title: "جایگاه مهر یشت",
        body: "متن اصلی مهر یشت بعداً با شماره‌گذاری و لایه‌های ترجمه در همین ساختار وارد می‌شود.",
      },
      {
        label: "ترجمه کلاسیک",
        title: "پیمان و راستی",
        body: "ترجمه دقیق باید نشان دهد مهر با مراقبت از عهد، عدالت و راستگویی پیوند دارد.",
      },
      {
        label: "بازنویسی ساده",
        title: "فهم امروزی",
        body: "اگر قولی می‌دهی، آن را روشن و صادقانه نگه دار؛ اعتماد از همین جا ساخته می‌شود.",
      },
      {
        label: "تحلیل مفهومی",
        title: "مهر در جامعه",
        body: "مهر یشت می‌تواند به اخلاق اجتماعی، اعتماد عمومی و مسئولیت در رابطه‌ها وصل شود.",
      },
    ],
  },
  {
    sectionSlug: "vendidad",
    chapterSlug: "fargard-1",
    verseSlug: "verse-1",
    chapterTitle: "فرگرد اول",
    verseNumber: "بند نمونه سرزمین‌ها",
    quote: "جهان زیبا آفریده شده، اما نگهبانی از آن با انتخاب انسان ادامه پیدا می‌کند.",
    progress: 16,
    ethicalMessage: "انسان با پاکی و انتخاب درست، سهم خود را در حفظ جهان روشن انجام می‌دهد.",
    blocks: [
      {
        label: "متن اصلی",
        title: "سرزمین‌های نخستین",
        body: "در نسخه نهایی، متن فرگرد اول و نام سرزمین‌ها با توضیح تاریخی و پژوهشی وارد می‌شود.",
      },
      {
        label: "ترجمه کلاسیک",
        title: "آفرینش و آسیب",
        body: "ترجمه کلاسیک باید دوگانه آفرینش نیک و ورود آسیب را با دقت و بی‌اغراق نشان دهد.",
      },
      {
        label: "بازنویسی ساده",
        title: "روایت قابل فهم",
        body: "جهان جای زیبایی است، اما اگر انسان بی‌توجه باشد، تاریکی و آلودگی وارد آن می‌شود.",
      },
      {
        label: "تحلیل مفهومی",
        title: "مسئولیت انسان",
        body: "پیام فرگرد اول برای امروز، مسئولیت در برابر محیط، سلامت و نظم اخلاقی است.",
      },
    ],
  },
  {
    sectionSlug: "vendidad",
    chapterSlug: "fargard-2",
    verseSlug: "verse-1",
    chapterTitle: "فرگرد دوم",
    verseNumber: "بند نمونه جمشید",
    quote: "خرد یعنی پیش از بحران، جای امنی برای زندگی و امید بسازی.",
    progress: 18,
    ethicalMessage: "آمادگی، مراقبت از زندگی و نگهداری از بهترین‌ها، پیام امروزی روایت جمشید است.",
    blocks: [
      {
        label: "متن اصلی",
        title: "روایت جمشید",
        body: "متن فرگرد دوم درباره جم، هشدار بحران و ساختن پناهگاه زندگی در این بخش وارد می‌شود.",
      },
      {
        label: "ترجمه کلاسیک",
        title: "بحران و نجات",
        body: "ترجمه باید فضای حماسی روایت را حفظ کند و همزمان از اغراق نمایشی فاصله بگیرد.",
      },
      {
        label: "بازنویسی ساده",
        title: "قصه امروز",
        body: "وقتی خطر نزدیک است، بهترین کار ترسیدن نیست؛ آماده شدن و حفظ زندگی است.",
      },
      {
        label: "تحلیل مفهومی",
        title: "پیام جمشید",
        body: "فرگرد دوم می‌تواند به آینده‌نگری، مدیریت بحران و مسئولیت نگهبانی از جهان وصل شود.",
      },
    ],
  },
  {
    sectionSlug: "khordeh-avesta",
    chapterSlug: "daily-prayers",
    verseSlug: "verse-1",
    chapterTitle: "نیایش‌های روزانه",
    verseNumber: "نیایش نمونه روز",
    quote: "یک نیت روشن، آغاز یک روز روشن است.",
    progress: 28,
    ethicalMessage: "نیایش روزانه وقتی معنا دارد که به آرامش، یادآوری و رفتار بهتر تبدیل شود.",
    blocks: [
      {
        label: "متن اصلی",
        title: "نیایش کوتاه",
        body: "متن نیایش‌های روزانه با آوانویسی و خوانش صوتی در نسخه نهایی وارد می‌شود.",
      },
      {
        label: "ترجمه کلاسیک",
        title: "دقت آیینی",
        body: "ترجمه کلاسیک برای حفظ دقت و احترام به متن در کنار بازنویسی ساده نمایش داده می‌شود.",
      },
      {
        label: "بازنویسی ساده",
        title: "نیت امروز",
        body: "امروز می‌خواهم اندیشه‌ام روشن، گفتارم آرام و کردارم درست باشد.",
      },
      {
        label: "تحلیل مفهومی",
        title: "نیایش در زندگی",
        body: "این بخش نشان می‌دهد چطور یک متن کوتاه می‌تواند ریتم روزانه کاربر را بهتر کند.",
      },
    ],
  },
  {
    sectionSlug: "khordeh-avesta",
    chapterSlug: "atash-niyayesh",
    verseSlug: "verse-1",
    chapterTitle: "آتش نیایش",
    verseNumber: "بند نمونه آتش",
    quote: "آتش بیرون، یادآور نوری است که باید در دل انسان روشن بماند.",
    progress: 26,
    ethicalMessage: "آگاهی درونی، پاکی و تمرکز، پیام امروزی آتش نیایش است.",
    blocks: [
      {
        label: "متن اصلی",
        title: "نیایش آتش",
        body: "متن آتش نیایش، آوانویسی، ترجمه و فایل صوتی در این ساختار وارد خواهد شد.",
      },
      {
        label: "ترجمه کلاسیک",
        title: "نور و پاکی",
        body: "ترجمه باید جایگاه آتش را به عنوان نشانه آگاهی، پاکی و حضور حقیقت نشان دهد.",
      },
      {
        label: "بازنویسی ساده",
        title: "نور درونی",
        body: "نور را در دل خود روشن نگه دار تا در بیرون هم راه درست را ببینی.",
      },
      {
        label: "تحلیل مفهومی",
        title: "آتش به عنوان یادآور",
        body: "آتش نیایش می‌تواند کاربر امروز را به مکث، تمرکز و تصمیم روشن دعوت کند.",
      },
    ],
  },
  {
    sectionSlug: "visperad",
    chapterSlug: "visperad-starter",
    verseSlug: "verse-1",
    chapterTitle: "درآمد ویسپرد",
    verseNumber: "بند نمونه آیین جمعی",
    quote: "وقتی نیایش جمعی می‌شود، هر واژه در نظمی بزرگ‌تر معنا پیدا می‌کند.",
    progress: 19,
    ethicalMessage: "آیین جمعی یادآور پیوند، احترام و مسئولیت انسان در برابر جهان نیک است.",
    blocks: [
      {
        label: "متن اصلی",
        title: "درآمد ویسپرد",
        body: "متن آغازین ویسپرد در نسخه نهایی با آوانویسی، ترجمه و توضیح آیینی وارد می‌شود.",
      },
      {
        label: "ترجمه کلاسیک",
        title: "خوانش آیینی",
        body: "ترجمه باید پیوند ویسپرد با یسنا، ستایش ردان و فضای مراسم را روشن کند.",
      },
      {
        label: "بازنویسی ساده",
        title: "معنای امروز",
        body: "در آیین، انسان تنها نیست؛ نیکی وقتی گسترده می‌شود که با دیگران پیوند پیدا کند.",
      },
      {
        label: "تحلیل مفهومی",
        title: "پیوند و مسئولیت",
        body: "ویسپرد می‌تواند مفهوم نیایش جمعی، پیوستگی متن‌ها و همبستگی اخلاقی را برای کاربر امروز توضیح دهد.",
      },
    ],
  },
  {
    sectionSlug: "hats",
    chapterSlug: "ha-map",
    verseSlug: "verse-1",
    chapterTitle: "نقشه هات‌ها",
    verseNumber: "بند نمونه نقشه مطالعه",
    quote: "هر هات یک در است؛ پشت هر در، یک مسیر روشن برای فهم متن قرار دارد.",
    progress: 22,
    ethicalMessage: "متن بزرگ با قدم‌های کوچک، نظم، صبر و توجه قابل فهم می‌شود.",
    blocks: [
      {
        label: "متن اصلی",
        title: "جایگاه هات",
        body: "در نسخه نهایی، هر هات با شماره، متن اصلی، ترجمه و مسیر مطالعه جداگانه ثبت می‌شود.",
      },
      {
        label: "ترجمه کلاسیک",
        title: "نظم پژوهشی",
        body: "ترجمه کلاسیک به کاربر کمک می‌کند متن را با دقت، منبع و ارجاع دنبال کند.",
      },
      {
        label: "بازنویسی ساده",
        title: "مسیر خواندن",
        body: "به جای روبه‌رو شدن با متن سنگین، یک بخش کوچک را انتخاب کن و همان را کامل بفهم.",
      },
      {
        label: "تحلیل مفهومی",
        title: "سیستم محتوای طلایی",
        body: "هات‌ها ستون اصلی سیستم محتوایی سایت هستند: متن، ترجمه، بازنویسی، تحلیل، پیام اخلاقی، تصویر و صوت.",
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
  {
    sectionSlug: "yashts",
    title: "آبان یشت",
    slug: "aban-yasht",
    description: "روایت آب، آناهیتا، پاکی، جریان زندگی و احترام به طبیعت.",
    verses: [
      {
        title: "بند نمونه آبان",
        slug: "verse-1",
        excerpt: "آب پاک، جریان زندگی و نشانه احترام انسان به نظم جهان است.",
      },
    ],
  },
  {
    sectionSlug: "yashts",
    title: "مهر یشت",
    slug: "mehr-yasht",
    description: "روایت مهر، پیمان، روشنایی، عدالت و مسئولیت اجتماعی.",
    verses: [
      {
        title: "بند نمونه مهر",
        slug: "verse-1",
        excerpt: "مهر، روشنایی پیمان است؛ جایی که گفتار و کردار انسان یکی می‌شوند.",
      },
    ],
  },
  {
    sectionSlug: "vendidad",
    title: "فرگرد اول",
    slug: "fargard-1",
    description: "روایت سرزمین‌های آفریده‌شده، ورود آسیب و مسئولیت انسان در نگهبانی از جهان.",
    verses: [
      {
        title: "بند نمونه سرزمین‌ها",
        slug: "verse-1",
        excerpt: "جهان زیبا آفریده شده، اما نگهبانی از آن با انتخاب انسان ادامه پیدا می‌کند.",
      },
    ],
  },
  {
    sectionSlug: "vendidad",
    title: "فرگرد دوم",
    slug: "fargard-2",
    description: "روایت جمشید، زمستان بزرگ، پناهگاه زندگی و آمادگی در برابر بحران.",
    verses: [
      {
        title: "بند نمونه جمشید",
        slug: "verse-1",
        excerpt: "خرد یعنی پیش از بحران، جای امنی برای زندگی و امید بسازی.",
      },
    ],
  },
  {
    sectionSlug: "khordeh-avesta",
    title: "نیایش‌های روزانه",
    slug: "daily-prayers",
    description: "نیایش‌های کوتاه برای صبح، میان‌روز و شب؛ آرام، روشن و قابل ادامه.",
    verses: [
      {
        title: "نیایش نمونه روز",
        slug: "verse-1",
        excerpt: "یک نیت روشن، آغاز یک روز روشن است.",
      },
    ],
  },
  {
    sectionSlug: "khordeh-avesta",
    title: "آتش نیایش",
    slug: "atash-niyayesh",
    description: "نیایش آتش، بیداری، پاکی و یادآوری حقیقت در زندگی روزانه.",
    verses: [
      {
        title: "بند نمونه آتش",
        slug: "verse-1",
        excerpt: "آتش بیرون، یادآور نوری است که باید در دل انسان روشن بماند.",
      },
    ],
  },
  {
    sectionSlug: "visperad",
    title: "درآمد ویسپرد",
    slug: "visperad-starter",
    description: "ورود به آیین جمعی، ستایش ردان، پیوند نیایش‌ها و نظم گسترده‌تر اوستا.",
    verses: [
      {
        title: "بند نمونه آیین جمعی",
        slug: "verse-1",
        excerpt: "وقتی نیایش جمعی می‌شود، هر واژه در نظمی بزرگ‌تر معنا پیدا می‌کند.",
      },
    ],
  },
  {
    sectionSlug: "hats",
    title: "نقشه هات‌ها",
    slug: "ha-map",
    description: "مسیر مطالعه مرحله‌ای برای فهم هات‌ها، شماره‌بندی، پیشرفت و سیستم محتوای طلایی.",
    verses: [
      {
        title: "بند نمونه نقشه مطالعه",
        slug: "verse-1",
        excerpt: "هر هات یک در است؛ پشت هر در، یک مسیر روشن برای فهم متن قرار دارد.",
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
    thumbnail: "/images/ai/library-cover.png",
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
    thumbnail: "/images/ai/gathas-cover.png",
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
    thumbnail: "/images/ai/dictionary-cover.png",
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
    thumbnail: "/images/ai/avesta-portal.png",
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
    thumbnail: "/images/ai/yasna-cover.png",
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
    thumbnail: "/images/ai/gathas-cover.png",
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
    thumbnail: "/images/ai/vendidad-cover.png",
  },
  {
    title: "روایت صوتی گات‌ها",
    type: "Audio",
    category: "صوت",
    mood: "آرام، روایی، عمیق",
    description: "جایگاه آینده فایل‌های صوتی، پادکست و خوانش بندهای اوستا.",
    prompt: "Audio narration placeholder for Gathas reading and explanation.",
    accent: "#F2D58A",
    thumbnail: "/images/ai/media-cover.png",
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
    coverImage: "/images/ai/monotheism-cover.png",
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
    coverImage: "/images/ai/gathas-cover.png",
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
    coverImage: "/images/ai/zoroaster-cover.png",
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
  {
    title: "What is the Avesta? | اوستا چیست؟",
    slug: "what-is-the-avesta",
    excerpt: "A clear Persian-English pillar guide to the Avesta as scripture, cultural memory, ritual text and digital learning path.",
    category: "Pillar",
    tags: ["Avesta", "اوستا", "Zoroastrianism"],
    readingTime: "۱۰ دقیقه",
    publishedAt: "2026-06-18",
    coverTone: "موزه‌ای، نسخه خطی، طلایی",
    coverImage: "/images/ai/avesta-portal.png",
    seoTitle: "What is the Avesta? راهنمای جامع اوستا",
    seoDescription: "A bilingual introduction to the Avesta, its structure, cultural role, ritual context and modern study path.",
    relatedTerms: ["gatha", "asha", "ahura-mazda"],
    relatedVerses: ["/avesta/yasna/ha-1/verse-1", "/avesta/gathas/ahunavaiti/verse-1"],
    sections: [
      {
        heading: "اوستا چیست؟",
        body: "اوستا مجموعه‌ای از متن‌های دینی، آیینی، نیایشی و فرهنگی زرتشتی است که در طول تاریخ به شکل‌های گوناگون حفظ، خوانده و تفسیر شده است.",
      },
      {
        heading: "What the Avesta means today",
        body: "For a modern reader, the Avesta is not only an ancient text; it is a gateway into ethics, ritual memory, language, mythology, and the intellectual history of ancient Iran.",
      },
    ],
  },
  {
    title: "Who was Zoroaster? | زرتشت کیست؟",
    slug: "who-was-zoroaster",
    excerpt: "A trustworthy overview of Zoroaster as a teacher of wisdom, moral choice, truth and responsibility.",
    category: "Pillar",
    tags: ["Zoroaster", "زرتشت", "گات‌ها"],
    readingTime: "۹ دقیقه",
    publishedAt: "2026-06-18",
    coverTone: "نورانی، آرام، تاریخی",
    coverImage: "/images/ai/zoroaster-cover.png",
    seoTitle: "Who was Zoroaster? زرتشت کیست؟",
    seoDescription: "An accessible guide to Zoroaster, the Gathas, moral choice, Asha and the spiritual legacy of ancient Iran.",
    relatedTerms: ["asha", "vohuman", "gatha"],
    relatedVerses: ["/avesta/gathas/ahunavaiti/verse-1"],
    sections: [
      {
        heading: "زرتشت در یک نگاه",
        body: "زرتشت در سنت ایرانی به عنوان آموزگار خرد، راستی، انتخاب اخلاقی و توجه انسان به مسئولیت شناخته می‌شود.",
      },
      {
        heading: "A teacher of moral clarity",
        body: "In the Gathic imagination, Zoroaster is remembered through questions of truth, good mind, ethical action and the human ability to choose light over darkness.",
      },
    ],
  },
  {
    title: "Yasna Guide | راهنمای یسنا",
    slug: "yasna-guide",
    excerpt: "راهنمای ورود به یسنا، آتش، نیایش، هات‌ها و مسیر مطالعه آیینی در AVESTA-ZOROASTER.",
    category: "اوستا",
    tags: ["Yasna", "یسنا", "هات‌ها"],
    readingTime: "۸ دقیقه",
    publishedAt: "2026-06-18",
    coverTone: "آتشکده، طلایی، آیینی",
    coverImage: "/images/ai/yasna-cover.png",
    seoTitle: "Yasna Guide | راهنمای یسنا در اوستا",
    seoDescription: "A reader-friendly guide to Yasna, ritual structure, sacred fire, hats and layered study of Avesta texts.",
    relatedTerms: ["asha", "ahura-mazda"],
    relatedVerses: ["/avesta/yasna/ha-1/verse-1", "/avesta/hats/ha-map/verse-1"],
    sections: [
      {
        heading: "یسنا چه جایگاهی دارد؟",
        body: "یسنا یکی از مهم‌ترین بخش‌های اوستا است و با نیایش، آیین، آتش و ساختار هات‌ها پیوند دارد.",
      },
      {
        heading: "How to study Yasna",
        body: "A strong Yasna page should connect original text, classical translation, simple explanation, ritual context, audio and ethical reflection.",
      },
    ],
  },
  {
    title: "Vendidad Guide | راهنمای وندیداد",
    slug: "vendidad-guide",
    excerpt: "راهنمای فهم وندیداد، پاکی، قانون، روایت‌های اسطوره‌ای و خوانش مسئولانه متن‌های دشوار اوستا.",
    category: "اوستا",
    tags: ["Vendidad", "وندیداد", "پاکی"],
    readingTime: "۹ دقیقه",
    publishedAt: "2026-06-18",
    coverTone: "آبی تیره، آتش، رازآلود",
    coverImage: "/images/ai/vendidad-cover.png",
    seoTitle: "Vendidad Guide | راهنمای وندیداد",
    seoDescription: "A careful guide to Vendidad, purity, law, mythic geography and responsible contextual reading.",
    relatedTerms: ["asha", "ahura-mazda"],
    relatedVerses: ["/avesta/vendidad/fargard-1/verse-1", "/avesta/vendidad/fargard-2/verse-1"],
    sections: [
      {
        heading: "وندیداد را چگونه بخوانیم؟",
        body: "وندیداد از بخش‌های پیچیده‌تر اوستا است و باید با توجه به زمینه تاریخی، آیینی، اسطوره‌ای و زبان نمادین خوانده شود.",
      },
      {
        heading: "Responsible context",
        body: "A modern educational site must separate text, translation, historical context, interpretation and contemporary ethical reflection.",
      },
    ],
  },
  {
    title: "Zoroastrian Festivals | جشن‌ها و گاه‌شمار زرتشتی",
    slug: "zoroastrian-festivals",
    excerpt: "A cultural guide to Nowruz, Mehregan, Sadeh, Tirgan and the living seasonal memory of Iranian tradition.",
    category: "فرهنگ",
    tags: ["Festivals", "نوروز", "مهرگان", "سده"],
    readingTime: "۷ دقیقه",
    publishedAt: "2026-06-18",
    coverTone: "فصلی، روشن، فرهنگی",
    coverImage: "/images/ai/exhibitions-cover.png",
    seoTitle: "Zoroastrian Festivals | جشن‌های زرتشتی و ایرانی",
    seoDescription: "A bilingual cultural guide to Zoroastrian and Iranian festivals, seasonal meaning, ritual memory and modern learning paths.",
    relatedTerms: ["asha", "faravahar"],
    relatedVerses: ["/calendar", "/timeline"],
    sections: [
      {
        heading: "جشن‌ها به عنوان حافظه فرهنگی",
        body: "مناسبت‌هایی مانند نوروز، مهرگان، تیرگان و سده فقط تاریخ نیستند؛ آن‌ها راه‌هایی برای فهم زمان، طبیعت، اجتماع و روشنایی‌اند.",
      },
      {
        heading: "Festivals as learning journeys",
        body: "Each festival can become a content path with article, media, glossary, historical context, ethical practice and seasonal campaign.",
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
