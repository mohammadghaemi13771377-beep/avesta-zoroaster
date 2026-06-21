import { getAvestaChapterGuideList } from "@/lib/avesta-chapter-guides";

export type AvestaChapterProfile = {
  sectionSlug: string;
  chapterSlug: string;
  title: string;
  subtitle: string;
  summary: string;
  historicalContext: string;
  ritualContext: string;
  keyThemes: string[];
  image: string;
  imageAlt: {
    fa: string;
    en: string;
  };
  relatedChapters: Array<{
    title: string;
    href: string;
    reason: string;
  }>;
  verses: Array<{
    title: string;
    href: string;
    summary: string;
  }>;
};

const profiles: AvestaChapterProfile[] = [
  {
    sectionSlug: "yasna",
    chapterSlug: "ha-1",
    title: "پرونده محتوایی یسنا ۱",
    subtitle: "ورود آرام به تالار آتش، نیایش و نظم آیینی",
    summary:
      "این فصل نقطه شروع تجربه یسناست؛ کاربر باید بفهمد با یک متن آیینی روبه‌روست که خواندن، شنیدن، توجه و کردار روشن را کنار هم می‌نشاند.",
    historicalContext:
      "یسنا از مهم‌ترین لایه‌های آیینی سنت اوستایی است و در خوانش تاریخی، با نیایش، ستایش نیروهای نیک و نگهداری نظم مقدس پیوند دارد. صفحه یسنا ۱ باید به مخاطب نشان دهد که متن فقط سند کهن نیست، بلکه درون یک آیین زنده خوانده می‌شده است.",
    ritualContext:
      "در تجربه دیجیتال، آتش مرکزی، سکوت، آماده‌سازی ذهن و خواندن مرحله‌ای جایگاه آیینی این فصل را منتقل می‌کنند. کاربر ابتدا با فضای نیایش آشنا می‌شود و بعد وارد بندهای قابل مطالعه می‌شود.",
    keyThemes: ["آتش", "نیایش", "آمادگی ذهن", "پاکی", "شروع مطالعه"],
    image: "/images/ai/yasna-cover.png",
    imageAlt: {
      fa: "آتشکده‌ای روشن با آتش مقدس، ستون‌های سنگی و فضای آیینی یسنا",
      en: "A luminous fire temple with sacred fire, stone columns, and a Yasna ritual atmosphere"
    },
    relatedChapters: [
      { title: "آتش نیایش", href: "/avesta/khordeh-avesta/atash-niyayesh", reason: "برای ادامه تجربه آتش و نیایش روزانه" },
      { title: "درآمد ویسپرد", href: "/avesta/visperad/visperad-starter", reason: "برای دیدن گسترش آیین جمعی" }
    ],
    verses: [
      { title: "بند آغازین", href: "/avesta/yasna/ha-1/verse-1", summary: "ورود به متن با تمرکز بر نیت، ترجمه و پیام اخلاقی." }
    ]
  },
  {
    sectionSlug: "gathas",
    chapterSlug: "ahunavaiti",
    title: "پرونده محتوایی اهونود گات",
    subtitle: "سکوت، شنیدن و انتخاب آگاهانه",
    summary:
      "اهونود گات باید خلوت‌تر، روشن‌تر و اندیشمندانه‌تر از بخش‌های حماسی باشد؛ صفحه‌ای که کاربر را از تماشا به تأمل می‌برد.",
    historicalContext:
      "گات‌ها در سنت زرتشتی به عنوان کهن‌ترین و بنیادی‌ترین سرودهای منسوب به زرتشت شناخته می‌شوند. این فصل باید لحن انسانی، اخلاقی و پرسش‌گر گات‌ها را برجسته کند.",
    ritualContext:
      "این صفحه تجربه‌ای آرام می‌سازد: سکوت پیش از خواندن، تمرکز بر واژه‌ها، و تبدیل هر بند به پرسشی برای زندگی امروز.",
    keyThemes: ["سکوت", "خرد", "انتخاب", "اشا", "مسئولیت اخلاقی"],
    image: "/images/ai/gathas-cover.png",
    imageAlt: {
      fa: "زرتشت در فضای روشن کوهستانی با نور نرم و حالتی مراقبه‌ای",
      en: "Zoroaster in a luminous mountain setting with soft light and a contemplative mood"
    },
    relatedChapters: [
      { title: "مهر یشت", href: "/avesta/yashts/mehr-yasht", reason: "برای پیوند اخلاق فردی با پیمان اجتماعی" },
      { title: "نقشه هات‌ها", href: "/avesta/hats/ha-map", reason: "برای یافتن مسیرهای کوچک مطالعه" }
    ],
    verses: [
      { title: "سرود انتخاب", href: "/avesta/gathas/ahunavaiti/verse-1", summary: "نمونه‌ای برای اتصال ترجمه، بازنویسی و پیام امروزی." }
    ]
  },
  {
    sectionSlug: "yashts",
    chapterSlug: "aban-yasht",
    title: "پرونده محتوایی آبان یشت",
    subtitle: "آب، آناهیتا، پاکی و جریان زندگی",
    summary:
      "آبان یشت باید یکی از روشن‌ترین و تصویری‌ترین صفحه‌های سایت باشد؛ جایی که احترام به آب به زبان امروز و با روایت طبیعت فهمیده می‌شود.",
    historicalContext:
      "یشت‌ها سرودهایی ستایشی‌اند و آبان یشت با آب‌ها، پاکی، نیروهای زندگی‌بخش و تصویر آناهیتا پیوند دارد. این فصل فرصت دارد اوستا را برای مخاطب امروز ملموس و زیست‌محیطی کند.",
    ritualContext:
      "قاب‌های آب، پاکی، نذر و مراقبت از طبیعت باید کنار هم بنشینند تا کاربر حس کند خواندن متن با یک عمل روزانه مرتبط می‌شود.",
    keyThemes: ["آب", "آناهیتا", "پاکی", "طبیعت", "زندگی"],
    image: "/images/ai/yashts-cover.png",
    imageAlt: {
      fa: "چشم‌انداز رود و کوهستان با نور طلایی و حس آبان یشت",
      en: "A river and mountain landscape with golden light evoking Aban Yasht"
    },
    relatedChapters: [
      { title: "مهر یشت", href: "/avesta/yashts/mehr-yasht", reason: "برای دیدن چهره پیمان و روشنایی در یشت‌ها" },
      { title: "نیایش‌های روزانه", href: "/avesta/khordeh-avesta/daily-prayers", reason: "برای تبدیل پیام به تمرین روزانه" }
    ],
    verses: [
      { title: "ستایش آب‌ها", href: "/avesta/yashts/aban-yasht/verse-1", summary: "درگاه خواندن درباره پاکی آب و پیام اخلاقی آن." }
    ]
  },
  {
    sectionSlug: "yashts",
    chapterSlug: "mehr-yasht",
    title: "پرونده محتوایی مهر یشت",
    subtitle: "پیمان، اعتماد و روشنایی اجتماعی",
    summary:
      "مهر یشت باید صفحه‌ای آسمانی، روشن و جدی باشد؛ درباره وفاداری، انصاف، قول و پیوند اجتماعی.",
    historicalContext:
      "در سنت ایرانی، مهر با پیمان، روشنایی و مراقبت از راستی پیوند دارد. این فصل ظرفیت دارد آموزه‌های کهن را به زبان اعتماد اجتماعی امروز ترجمه کند.",
    ritualContext:
      "حس آسمان، سپیده و نور باید با کارت‌هایی درباره پیمان، دادگری و وفاداری همراه شود تا مخاطب از مفهوم اسطوره‌ای به رفتار عملی برسد.",
    keyThemes: ["پیمان", "اعتماد", "روشنایی", "دادگری", "وفاداری"],
    image: "/images/ai/gathas-cover.png",
    imageAlt: {
      fa: "آسمان روشن و کوهستان طلایی برای روایت مهر و پیمان",
      en: "A bright sky and golden mountain scene for Mithra, covenant, and trust"
    },
    relatedChapters: [
      { title: "اهونود گات", href: "/avesta/gathas/ahunavaiti", reason: "برای پیوند پیمان با انتخاب اخلاقی" },
      { title: "آبان یشت", href: "/avesta/yashts/aban-yasht", reason: "برای دیدن زبان تصویری یشت‌ها" }
    ],
    verses: [
      { title: "پیمان روشن", href: "/avesta/yashts/mehr-yasht/verse-1", summary: "نمونه مسیر مطالعه درباره وفای به عهد و راستی." }
    ]
  },
  {
    sectionSlug: "vendidad",
    chapterSlug: "fargard-1",
    title: "پرونده محتوایی وندیداد، فرگرد اول",
    subtitle: "آفرینش، سرزمین‌های نیک و ورود آسیب",
    summary:
      "فرگرد اول باید روشن‌تر از تصور معمول از وندیداد ساخته شود: جهان زیباست، اما هر زیبایی نیاز به مراقبت دارد.",
    historicalContext:
      "وندیداد بخشی پیچیده و چندلایه از اوستاست که با پاکی، قانون، آسیب و نظم جهان سر و کار دارد. فرگرد اول روایت آفرینش سرزمین‌ها و ورود نیروهای آسیب‌زا را به شکل روایی نشان می‌دهد.",
    ritualContext:
      "این فصل باید با دوگانه بصری نور و تاریکی کار کند، اما تاریکی نباید غالب شود. هدف نمایش مسئولیت انسان در پاک نگه داشتن جهان است.",
    keyThemes: ["آفرینش", "پاکی", "سرزمین", "آسیب", "انتخاب انسان"],
    image: "/images/ai/vendidad-cover.png",
    imageAlt: {
      fa: "جهان دوپاره نور و تاریکی برای فرگرد اول وندیداد",
      en: "A split world of light and darkness for Vendidad Fargard One"
    },
    relatedChapters: [
      { title: "فرگرد دوم", href: "/avesta/vendidad/fargard-2", reason: "برای ادامه روایت بحران و نجات" },
      { title: "آبان یشت", href: "/avesta/yashts/aban-yasht", reason: "برای پیوند پاکی جهان با طبیعت و آب" }
    ],
    verses: [
      { title: "سرزمین نخست", href: "/avesta/vendidad/fargard-1/verse-1", summary: "نمونه‌ای برای روایت آفرینش و پیام مراقبت از جهان." }
    ]
  },
  {
    sectionSlug: "vendidad",
    chapterSlug: "fargard-2",
    title: "پرونده محتوایی وندیداد، فرگرد دوم",
    subtitle: "جم، بحران بزرگ و نگهبانی از زندگی",
    summary:
      "فرگرد دوم باید حماسی، روایی و امیدبخش باشد؛ نه فقط روایت ترس، بلکه درس آمادگی و حفاظت از زندگی.",
    historicalContext:
      "روایت جم در فرگرد دوم از مشهورترین بخش‌های وندیداد است و با بحران، پناهگاه و حفظ بهترین نمونه‌های زندگی پیوند دارد.",
    ritualContext:
      "در تجربه سایت، زمستان بزرگ، ور جم و نگهبانی از بذرهای زندگی باید به تصمیم‌های امروز درباره آمادگی، خرد و آینده وصل شوند.",
    keyThemes: ["جمشید", "بحران", "پناهگاه", "نگهداری زندگی", "امید"],
    image: "/images/ai/vendidad-cover.png",
    imageAlt: {
      fa: "پناهگاه نورانی در برابر زمستان و تاریکی برای روایت جم",
      en: "A luminous refuge against winter and darkness for the story of Yima"
    },
    relatedChapters: [
      { title: "فرگرد اول", href: "/avesta/vendidad/fargard-1", reason: "برای فهم زمینه آفرینش و آسیب" },
      { title: "نقشه هات‌ها", href: "/avesta/hats/ha-map", reason: "برای تبدیل روایت بلند به مسیر مطالعه" }
    ],
    verses: [
      { title: "وَر جم", href: "/avesta/vendidad/fargard-2/verse-1", summary: "درگاه مطالعه درباره پناهگاه و نگهبانی از زندگی." }
    ]
  },
  {
    sectionSlug: "khordeh-avesta",
    chapterSlug: "daily-prayers",
    title: "پرونده محتوایی نیایش‌های روزانه",
    subtitle: "همراه کوچک هر روز برای نیت، آرامش و کردار نیک",
    summary:
      "این فصل باید موبایل‌پسند، روشن و کاربردی باشد؛ مخاطب باید بتواند در چند دقیقه بخواند، ذخیره کند و برگردد.",
    historicalContext:
      "خرده اوستا مجموعه‌ای برای نیایش‌ها و متن‌های کاربردی‌تر در زندگی دینی روزانه است. نیایش‌های روزانه باید برای مخاطب عمومی قابل فهم و همراه‌پذیر باشند.",
    ritualContext:
      "صفحه باید حالت صبح، میان‌روز و شب داشته باشد و هر بخش با نیت کوتاه، صوت آینده و تمرین کوچک همراه شود.",
    keyThemes: ["نیایش روزانه", "نیت", "آرامش", "تکرار روشن", "موبایل"],
    image: "/images/ai/khordeh-avesta-cover.png",
    imageAlt: {
      fa: "کتاب نیایش و نور صبحگاهی برای خرده اوستا",
      en: "A prayer book and morning light for Khordeh Avesta"
    },
    relatedChapters: [
      { title: "آتش نیایش", href: "/avesta/khordeh-avesta/atash-niyayesh", reason: "برای تجربه نیایش با محور نور و آتش" },
      { title: "یسنا ۱", href: "/avesta/yasna/ha-1", reason: "برای دیدن ریشه آیینی‌تر نیایش" }
    ],
    verses: [
      { title: "نیت صبح", href: "/avesta/khordeh-avesta/daily-prayers/verse-1", summary: "نمونه‌ای برای شروع روز با پیام کوتاه و روشن." }
    ]
  },
  {
    sectionSlug: "khordeh-avesta",
    chapterSlug: "atash-niyayesh",
    title: "پرونده محتوایی آتش نیایش",
    subtitle: "آتش به عنوان آگاهی، پاکی و حضور ذهن",
    summary:
      "آتش نیایش باید گرم، روشن و آرام باشد؛ صفحه‌ای برای فهم اینکه آتش فقط شعله بیرونی نیست، بلکه یادآور بیداری درون است.",
    historicalContext:
      "آتش در سنت زرتشتی نشانه پاکی، روشنایی و حضور آیینی است. این فصل باید بدون اغراق، احترام و معنای نمادین آتش را توضیح دهد.",
    ritualContext:
      "در طراحی صفحه، آتش مرکزی با تمرین نگاه، آرام‌سازی فکر و انتخاب یک کردار درست همراه می‌شود.",
    keyThemes: ["آتش", "آگاهی", "پاکی", "نیایش", "بیداری"],
    image: "/images/ai/yasna-cover.png",
    imageAlt: {
      fa: "آتش مقدس در آتشکده‌ای آرام با نور طلایی",
      en: "Sacred fire in a quiet fire temple with golden light"
    },
    relatedChapters: [
      { title: "نیایش‌های روزانه", href: "/avesta/khordeh-avesta/daily-prayers", reason: "برای ساخت عادت روزانه" },
      { title: "یسنا ۱", href: "/avesta/yasna/ha-1", reason: "برای ورود به تالار آیینی یسنا" }
    ],
    verses: [
      { title: "نور درون", href: "/avesta/khordeh-avesta/atash-niyayesh/verse-1", summary: "نمونه‌ای برای پیوند آتش، فکر روشن و کردار درست." }
    ]
  },
  {
    sectionSlug: "visperad",
    chapterSlug: "visperad-starter",
    title: "پرونده محتوایی درآمد ویسپرد",
    subtitle: "نیایش جمعی، پیوند و گسترش آیین",
    summary:
      "ویسپرد باید حس مراسم و هم‌خوانی داشته باشد؛ یک فضای اجتماعی و آیینی که یسنا را گسترده‌تر می‌کند.",
    historicalContext:
      "ویسپرد در کنار یسنا فهمیده می‌شود و به ستایش گسترده‌تر نیروهای نیک و ردان پیوند دارد. این صفحه باید نقش مکمل و آیینی آن را ساده کند.",
    ritualContext:
      "قاب‌های مراسم، ردان، هم‌خوانی و پیوند متن‌ها باید کاربر را از مطالعه فردی به تجربه جمعی هدایت کنند.",
    keyThemes: ["مراسم", "ردان", "هم‌خوانی", "پیوند", "آیین جمعی"],
    image: "/images/ai/avesta-portal.jpg",
    imageAlt: {
      fa: "تالار سنگی آیینی با نور طلایی برای درآمد ویسپرد",
      en: "A ritual stone hall with golden light for Visperad"
    },
    relatedChapters: [
      { title: "یسنا ۱", href: "/avesta/yasna/ha-1", reason: "برای دیدن پایه آیینی مشترک" },
      { title: "نقشه هات‌ها", href: "/avesta/hats/ha-map", reason: "برای مسیرهای مطالعه ساختارمند" }
    ],
    verses: [
      { title: "ورود به آیین", href: "/avesta/visperad/visperad-starter/verse-1", summary: "آغاز مطالعه درآمد ویسپرد با زمینه آیینی." }
    ]
  },
  {
    sectionSlug: "hats",
    chapterSlug: "ha-map",
    title: "پرونده محتوایی نقشه هات‌ها",
    subtitle: "ساختار، پیشرفت و تبدیل متن بزرگ به مسیر خواندن",
    summary:
      "نقشه هات‌ها ستون فقرات تجربه مطالعه است؛ باید به کاربر نشان دهد از کجا شروع کند، کجا ادامه دهد و چه چیزی کامل شده است.",
    historicalContext:
      "هات‌ها واحدهای مهم ساختاردهی متن هستند و برای یک سایت بزرگ، بهترین راه تبدیل متن عظیم به مسیرهای کوچک و قابل دنبال کردن‌اند.",
    ritualContext:
      "این صفحه بیشتر کاربردی است تا آیینی: طومار، شماره، وضعیت تکمیل، منبع، تصویر، صوت و مسیر ورود به بندها.",
    keyThemes: ["ساختار", "طومار", "پیشرفت", "مطالعه مرحله‌ای", "سیستم محتوا"],
    image: "/images/ai/hats-cover.png",
    imageAlt: {
      fa: "طومار کهن و میز مطالعه برای نقشه هات‌های اوستا",
      en: "An ancient scroll and study desk for the Avesta Ha map"
    },
    relatedChapters: [
      { title: "یسنا ۱", href: "/avesta/yasna/ha-1", reason: "برای شروع عملی مطالعه" },
      { title: "اهونود گات", href: "/avesta/gathas/ahunavaiti", reason: "برای مسیر تأملی گات‌ها" }
    ],
    verses: [
      { title: "راهنمای مسیر", href: "/avesta/hats/ha-map/verse-1", summary: "نمونه‌ای برای توضیح مسیر مطالعه و وضعیت تکمیل." }
    ]
  }
];

const profileMap = Object.fromEntries(profiles.map((profile) => [`${profile.sectionSlug}/${profile.chapterSlug}`, profile]));

export function getAvestaChapterProfile(sectionSlug: string, chapterSlug: string) {
  return profileMap[`${sectionSlug}/${chapterSlug}`] as AvestaChapterProfile | undefined;
}

export function getAvestaChapterProfiles() {
  return profiles;
}

export function getMissingChapterProfiles() {
  return getAvestaChapterGuideList()
    .filter((guide) => !getAvestaChapterProfile(guide.sectionSlug, guide.chapterSlug))
    .map((guide) => `${guide.sectionSlug}/${guide.chapterSlug}`);
}
