import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ArrowRight, BookOpen, Link2, Search, Sparkles, Volume2, Waypoints } from "lucide-react";

import { glossaryTerms } from "@/lib/sample-content";

type PageProps = {
  params: {
    slug: string;
  };
};

const termMeta: Record<string, { concept: string; scene: string; pronunciation: string; usage: string; related: string[]; links: Array<[string, string]> }> = {
  asha: {
    concept: "راستی و نظم اخلاقی",
    scene: "scene-sunrise",
    pronunciation: "اَشا | Asha",
    usage: "در خوانش‌های گاهانی، اشا برای سخن گفتن از راستی، نظم درست و انتخاب اخلاقی به‌کار می‌رود.",
    related: ["کردار نیک", "نظم کیهانی", "راستی", "مسئولیت"],
    links: [["مقاله اشا", "/articles/asha-truth-order"], ["هاب یکتاپرستی", "/monotheism"]],
  },
  vohuman: {
    concept: "اندیشه نیک",
    scene: "scene-cosmic",
    pronunciation: "وَهومن | Vohu Manah",
    usage: "وهومن به اندیشه نیک و خردی اشاره دارد که انسان را به انتخاب آگاهانه نزدیک می‌کند.",
    related: ["خرد", "انصاف", "آگاهی", "انتخاب"],
    links: [["هاب یکتاپرستی", "/monotheism"], ["جستجوی وهومن", "/search"]],
  },
  "ahura-mazda": {
    concept: "دانایی و روشنایی",
    scene: "scene-fire",
    pronunciation: "اَهورامَزدا | Ahura Mazda",
    usage: "اهورامزدا در متن‌های زرتشتی با دانایی، روشنایی و جهت اخلاقی جهان پیوند دارد.",
    related: ["یکتاپرستی", "خرد", "نور", "آفرینش"],
    links: [["هاب یکتاپرستی", "/monotheism"], ["دین زرتشتی", "/zoroastrianism"]],
  },
  faravahar: {
    concept: "نماد انتخاب و تعالی",
    scene: "scene-stone",
    pronunciation: "فَرَوَهَر | Faravahar",
    usage: "فروهر در تجربه فرهنگی امروز به‌عنوان نمادی شناخته‌شده از هویت، انتخاب و تعالی دیده می‌شود.",
    related: ["هویت", "انتخاب", "پیشرفت", "میراث"],
    links: [["رسانه‌ها", "/media"], ["ایران باستان", "/cyrus"]],
  },
  gatha: {
    concept: "سرودهای کهن",
    scene: "scene-tablets",
    pronunciation: "گاتا | Gatha",
    usage: "گاتا یا گاثا نام سرودهایی است که در سنت زرتشتی به زرتشت نسبت داده می‌شوند.",
    related: ["زرتشت", "سروده", "گات‌ها", "اوستا"],
    links: [["صفحه گات‌ها", "/gathas"], ["پورتال گات‌ها", "/avesta/gathas"]],
  },
};

export function generateStaticParams() {
  return glossaryTerms.map((term) => ({ slug: term.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const term = glossaryTerms.find((item) => item.slug === params.slug);

  if (!term) {
    return {};
  }

  return {
    title: `${term.term} | واژه‌نامه اوستایی`,
    description: term.description,
    openGraph: {
      title: term.term,
      description: term.description,
      type: "article",
    },
  };
}

export default function DictionaryTermPage({ params }: PageProps) {
  const term = glossaryTerms.find((item) => item.slug === params.slug);

  if (!term) {
    notFound();
  }

  const meta = termMeta[term.slug] ?? {
    concept: "مفهوم اوستایی",
    scene: "scene-cosmic",
    pronunciation: term.term,
    usage: "برای دیدن کاربردهای این واژه، متن‌های مرتبط و مسیرهای مطالعه زیر را باز کن.",
    related: [term.meaning],
    links: [["جستجوی پیشرفته", "/search"]],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    termCode: term.root,
    description: term.description,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "AVESTA-ZOROASTER Glossary",
      url: "https://avesta-zoroaster.com/dictionary",
    },
  };

  return (
    <main className="overflow-hidden pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero-cosmos relative px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="hero-horizon" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <Link
              href="/dictionary"
              className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-bold text-gold-light transition hover:bg-gold/10"
            >
              <ArrowRight size={17} />
              بازگشت به واژه‌نامه
            </Link>
            <p className="gold-text mt-10 text-sm font-semibold tracking-[0.3em]">AVESTAN GLOSSARY</p>
            <h1 className="mt-4 text-5xl font-black text-warm sm:text-7xl">{term.term}</h1>
            <p className="mt-5 text-xl font-bold text-gold-light">{term.root}</p>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-muted">{term.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {meta.related.map((item) => (
                <span key={item} className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-light">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="lux-frame p-4">
            <div className={`image-scene ${meta.scene} min-h-[360px] rounded-[1.4rem]`}>
              <Image src="/images/ai/dictionary-cover.png" alt={`تصویر مفهومی ${term.term}`} fill sizes="(min-width: 1024px) 380px, 92vw" className="object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/82 via-night/20 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <Sparkles className="h-16 w-16 text-gold-light" />
              </div>
              <div className="absolute bottom-7 right-7">
                <p className="text-sm font-bold text-gold-light">{meta.concept}</p>
                <p className="mt-2 text-xs text-muted">واژه‌نامه مفهومی</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-24 sm:px-6 lg:grid-cols-2 lg:px-8">
        <InfoBlock title="معنی" body={term.meaning} icon={BookOpen} />
        <InfoBlock title="ریشه" body={term.root} icon={Sparkles} />
        <InfoBlock title="تلفظ راهنما" body={meta.pronunciation} icon={Volume2} />
        <InfoBlock title="توضیح" body={term.description} icon={Link2} />
        <InfoBlock
          title="کاربرد در متن"
          body={meta.usage}
          icon={Waypoints}
        />

        <section className="lux-frame p-6 lg:col-span-2">
          <div className="flex items-center gap-2 text-gold-light">
            <Search size={20} />
            <h2 className="text-2xl font-black">مسیرهای مرتبط</h2>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link href={`/search?q=${encodeURIComponent(term.term)}&type=verse`} className="rounded-2xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40 hover:bg-gold/10">
              <p className="text-xs font-bold text-gold-light">کاربردهای متنی</p>
              <h3 className="mt-2 flex items-center justify-between gap-3 text-xl font-black text-warm">بندهای مرتبط<ArrowLeft size={18} /></h3>
            </Link>
            {meta.links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-gold/10 bg-night/55 p-5 transition hover:border-gold/40 hover:bg-gold/10"
              >
                <p className="text-xs font-bold text-gold-light">ادامه مطالعه</p>
                <h3 className="mt-2 flex items-center justify-between gap-3 text-xl font-black text-warm">
                  {label}
                  <ArrowLeft size={18} />
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function InfoBlock({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon: LucideIcon;
}) {
  return (
    <section className="lux-frame p-6">
      <Icon className="text-gold-light" size={26} />
      <h2 className="mt-4 text-2xl font-black text-gold-light">{title}</h2>
      <p className="mt-3 leading-8 text-muted">{body}</p>
    </section>
  );
}
