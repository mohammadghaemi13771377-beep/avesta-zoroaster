import { avestaSections } from "@/lib/content";
import { getDailyAvesta } from "@/lib/daily-avesta";

export type MuseumTourStop = {
  id: string;
  title: string;
  subtitle: string;
  scene: string;
  href: string;
  duration: string;
  narration: string;
  artifact: string;
  curatorNote: string;
};

export type MuseumTour = {
  title: string;
  subtitle: string;
  totalDuration: string;
  stops: MuseumTourStop[];
};

export function getMuseumTour(): MuseumTour {
  const daily = getDailyAvesta();
  const yasna = avestaSections.find((section) => section.slug === "yasna");
  const gathas = avestaSections.find((section) => section.slug === "gathas");

  return {
    title: "تور موزه‌ای جهان اوستا",
    subtitle: "یک مسیر هدایت‌شده برای تجربه سینمایی متن، نماد، واژه، تصویر و تمرین اخلاقی.",
    totalDuration: "۱۸ دقیقه",
    stops: [
      {
        id: "gate-of-fire",
        title: "دروازه آتش",
        subtitle: "ورود به جهان روشنایی",
        scene: yasna?.atmosphere ?? "scene-fire",
        href: "/avesta",
        duration: "۳ دقیقه",
        narration: "تور از آتش آغاز می‌شود؛ نماد حضور، مراقبت و روشنایی که کاربر را وارد متن اوستا می‌کند.",
        artifact: "پورتال اوستا",
        curatorNote: "کاربر نباید با فهرست خشک روبه‌رو شود؛ باید حس کند وارد یک موزه دیجیتال شده است.",
      },
      {
        id: "gathas-chamber",
        title: "تالار گات‌ها",
        subtitle: "سروده‌های خرد و انتخاب",
        scene: gathas?.atmosphere ?? "scene-sunrise",
        href: "/avesta/gathas",
        duration: "۴ دقیقه",
        narration: "در این ایستگاه، کاربر با کهن‌ترین سروده‌های زرتشت و پیام اخلاقی انتخاب آگاهانه روبه‌رو می‌شود.",
        artifact: "گات‌ها",
        curatorNote: "گات‌ها باید مثل قلب شاعرانه و فلسفی جهان سایت ارائه شوند.",
      },
      {
        id: "word-of-the-day",
        title: "ویترین واژه روز",
        subtitle: daily.term.label,
        scene: "scene-cosmic",
        href: daily.term.href,
        duration: "۲ دقیقه",
        narration: `واژه امروز ${daily.term.label} است؛ پلی میان متن، فهم و کاربرد اخلاقی امروز.`,
        artifact: daily.term.label,
        curatorNote: daily.term.meaning,
      },
      {
        id: "media-vault",
        title: "گنجینه رسانه",
        subtitle: "تصویر، صوت و روایت",
        scene: "scene-mountain",
        href: "/media",
        duration: "۳ دقیقه",
        narration: "این ایستگاه نشان می‌دهد سایت فقط خواندنی نیست؛ دیدنی، شنیدنی و قابل تجربه است.",
        artifact: "رسانه‌های اوستا",
        curatorNote: "برای تولید تصویرهای AI، هر بخش باید mood، نسبت تصویر و سبک اختصاصی داشته باشد.",
      },
      {
        id: "daily-light",
        title: "اتاق روشنایی روزانه",
        subtitle: "از تجربه به عادت",
        scene: "scene-fire",
        href: "/daily-light",
        duration: "۳ دقیقه",
        narration: "تور با یک مسیر روزانه بسته می‌شود تا کاربر بعد از تماشا، یک قدم واقعی بردارد.",
        artifact: "راهنمای روزانه",
        curatorNote: "موزه دیجیتال وقتی زنده می‌شود که به عادت، تمرین و بازگشت کاربر وصل شود.",
      },
      {
        id: "asha-balance",
        title: "نورسنج اشا",
        subtitle: "سنجش تعادل پندار، گفتار، کردار",
        scene: "scene-sunrise",
        href: "/asha-balance",
        duration: "۳ دقیقه",
        narration: "آخرین ایستگاه، تجربه را به آینه تبدیل می‌کند: کاربر می‌بیند امروز کدام ستون اخلاقی نیاز به نور دارد.",
        artifact: "تعادل اشا",
        curatorNote: "این بخش می‌تواند در آینده با حساب کاربر و داده‌های واقعی شخصی‌سازی شود.",
      },
    ],
  };
}

export function getMuseumTourStats() {
  const tour = getMuseumTour();

  return [
    { value: String(tour.stops.length), label: "ایستگاه موزه‌ای" },
    { value: tour.totalDuration, label: "مدت تور" },
    { value: "Story", label: "روایت هدایت‌شده" },
  ];
}
