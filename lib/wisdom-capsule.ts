import { buildAshaBalanceSnapshot } from "@/lib/asha-balance";
import { getDailyAvesta } from "@/lib/daily-avesta";
import { getShareStudioState } from "@/lib/share-studio";

export type WisdomCapsule = {
  date: string;
  title: string;
  quote: string;
  sourceHref: string;
  term: {
    label: string;
    meaning: string;
    href: string;
  };
  practice: string;
  shareText: string;
  ashaScore: number;
  steps: Array<{
    label: string;
    title: string;
    href: string;
  }>;
};

export function getWisdomCapsule(): WisdomCapsule {
  const daily = getDailyAvesta();
  const asha = buildAshaBalanceSnapshot();
  const shareSeed = getShareStudioState().defaultSeed;

  return {
    date: daily.date,
    title: "کپسول خرد امروز",
    quote: daily.quote,
    sourceHref: daily.href,
    term: daily.term,
    practice: asha.nextPractice.prompt,
    ashaScore: asha.score,
    shareText: `${shareSeed.quote}\n\n${shareSeed.sourceTitle}\nAVESTA-ZOROASTER`,
    steps: [
      {
        label: "بخوان",
        title: "بند امروز",
        href: daily.href,
      },
      {
        label: "بفهم",
        title: daily.term.label,
        href: daily.term.href,
      },
      {
        label: "تمرین کن",
        title: "پندار، گفتار، کردار",
        href: "/practice",
      },
      {
        label: "منتشر کن",
        title: "کارت طلایی",
        href: "/share-studio",
      },
    ],
  };
}

export function getWisdomCapsuleStats() {
  const capsule = getWisdomCapsule();

  return [
    { value: "۳ دقیقه", label: "زمان تجربه" },
    { value: capsule.term.label, label: "واژه روز" },
    { value: `${capsule.ashaScore}%`, label: "تعادل اشا" },
  ];
}
