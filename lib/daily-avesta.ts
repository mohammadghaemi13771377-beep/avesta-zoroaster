import { glossaryTerms, sampleVerses } from "@/lib/sample-content";

export type DailyAvesta = {
  date: string;
  title: string;
  section: string;
  quote: string;
  ethicalMessage: string;
  href: string;
  term: {
    label: string;
    meaning: string;
    href: string;
  };
  reflectionPrompt: string;
};

const reflectionPrompts = [
  "امروز کجا می‌توانی روشن‌تر و راست‌تر انتخاب کنی؟",
  "کدام گفتار امروزت می‌تواند آرام‌تر، دقیق‌تر و نیک‌تر باشد؟",
  "یک کردار کوچک که امروز جهان اطرافت را بهتر می‌کند چیست؟",
  "اگر خرد را معیار بگیری، قدم بعدی تو چه تغییری می‌کند؟",
  "کدام بخش زندگی‌ات به نظم، صداقت و توجه بیشتری نیاز دارد؟"
];

export function getDailyAvesta(date = new Date()): DailyAvesta {
  const daySeed = getDaySeed(date);
  const verse = sampleVerses[daySeed % sampleVerses.length] ?? sampleVerses[0];
  const term = glossaryTerms[daySeed % glossaryTerms.length] ?? glossaryTerms[0];
  const dateKey = date.toISOString().slice(0, 10);

  return {
    date: dateKey,
    title: "اوستای امروز",
    section: verse.chapterTitle,
    quote: verse.quote,
    ethicalMessage: verse.ethicalMessage,
    href: `/avesta/${verse.sectionSlug}/${verse.chapterSlug ?? "chapter"}/${verse.verseSlug ?? "verse"}`,
    term: {
      label: term.term,
      meaning: term.meaning,
      href: `/dictionary/${term.slug}`
    },
    reflectionPrompt: reflectionPrompts[daySeed % reflectionPrompts.length] ?? reflectionPrompts[0]
  };
}

function getDaySeed(date: Date) {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const current = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

  return Math.floor((current.getTime() - start.getTime()) / 86400000);
}
