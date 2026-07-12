import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Brain, Flame, GalleryVerticalEnd, Library, ShoppingBag, Sparkles, UserRoundSearch } from "lucide-react";

const worldNodes = [
  {
    title: "اوستا",
    label: "قلب جهان",
    text: "بخش‌های اصلی، فصل‌ها و مسیرهای مطالعه.",
    href: "/avesta",
    image: "/images/ai/avesta-portal.jpg",
    icon: BookOpen,
  },
  {
    title: "گات‌ها",
    label: "خرد روشن",
    text: "سروده‌ها، اشا و انتخاب آگاهانه.",
    href: "/gathas",
    image: "/images/ai/gathas-hero.jpg",
    icon: Sparkles,
  },
  {
    title: "زرتشت",
    label: "راهنمای اندیشه",
    text: "زندگی، پیام و زمینه تاریخی.",
    href: "/zoroaster",
    image: "/images/ai/zoroaster-hero.jpg",
    icon: UserRoundSearch,
  },
  {
    title: "واژه‌نامه",
    label: "کلید مفاهیم",
    text: "اشا، وهومن، اهورامزدا و فروهر.",
    href: "/dictionary",
    image: "/images/ai/dictionary-hero.jpg",
    icon: Brain,
  },
  {
    title: "کتابخانه",
    label: "منابع معتبر",
    text: "کتاب‌ها، PDFها و مسیر پژوهش.",
    href: "/library",
    image: "/images/ai/library-hero.jpg",
    icon: Library,
  },
  {
    title: "رسانه",
    label: "دیدن و شنیدن",
    text: "پادکست، ویدیو، تصویر و روایت.",
    href: "/media",
    image: "/images/ai/media-hero.jpg",
    icon: GalleryVerticalEnd,
  },
  {
    title: "آیین روزانه",
    label: "تمرین و مکث",
    text: "خرده‌اوستا و اتاق نیایش.",
    href: "/ritual-room",
    image: "/images/ai/khordeh-avesta-hero.jpg",
    icon: Flame,
  },
  {
    title: "فروشگاه",
    label: "یادگار فرهنگی",
    text: "کتاب، هدیه و محصولات آینده.",
    href: "/shop",
    image: "/images/ai/shop-hero.jpg",
    icon: ShoppingBag,
  },
];

export function HomeWorldMap() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="home-world-map-title">
      <div className="relative overflow-hidden rounded-[26px] border border-gold/18 bg-night/54 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.26)] bright:bg-white/58 sm:p-7">
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/65 to-transparent" />
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-gold-light/12 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/22 bg-black/18 px-4 py-2 text-xs font-black text-gold-light bright:bg-white/50 bright:text-amber-800">
              <Sparkles className="h-4 w-4" />
              نقشه سریع جهان
            </p>
            <h2 id="home-world-map-title" className="gold-text mt-5 text-3xl font-black leading-tight sm:text-5xl">
              قلمروهای اصلی AVESTA-ZOROASTER
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-muted bright:text-stone-700">
              خانه فقط مسیر می‌دهد؛ جزئیات هر قلمرو در صفحه اختصاصی خودش باز می‌شود.
            </p>
          </div>
          <Link href="/world" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-3 font-black text-night transition hover:bg-gold-light">
            نقشه کامل
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative z-10 mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {worldNodes.map((node) => {
            const Icon = node.icon;

            return (
              <Link
                key={node.href}
                href={node.href}
                className="home-world-node group flex min-h-[224px] flex-col justify-between overflow-hidden rounded-[18px] border border-gold/14 bg-black/20 p-3 transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-gold/10 bright:bg-white/44"
              >
                <span className="relative block h-28 overflow-hidden rounded-2xl border border-gold/14">
                  <Image
                    src={node.image}
                    alt={`تصویر ${node.title}`}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-night/82 via-night/18 to-transparent bright:from-stone-950/46" />
                  <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-2xl border border-gold/24 bg-black/35 text-gold-light backdrop-blur-md bright:bg-white/54 bright:text-amber-800">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="absolute left-3 top-3 rounded-full border border-gold/18 bg-black/28 px-3 py-1 text-[11px] font-black text-gold-light backdrop-blur-md bright:bg-white/62 bright:text-amber-800">
                    {node.label}
                  </span>
                </span>
                <span className="block px-1 pt-4">
                  <span className="block text-xl font-black text-warm bright:text-stone-950">{node.title}</span>
                  <span className="mt-2 block text-sm leading-7 text-muted bright:text-stone-700">{node.text}</span>
                </span>
                <span className="mt-4 inline-flex items-center gap-2 px-1 text-sm font-black text-gold-light bright:text-amber-900">
                  ورود
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
