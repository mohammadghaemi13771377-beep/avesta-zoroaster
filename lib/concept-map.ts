import { articleItems, glossaryTerms, monotheismPillars, sampleVerses } from "@/lib/sample-content";

export type ConceptNodeType = "principle" | "term" | "text" | "article" | "hub";
export type ConceptLinkType = "defines" | "explains" | "appears-in" | "continues" | "supports";

export type ConceptNode = {
  id: string;
  title: string;
  subtitle: string;
  type: ConceptNodeType;
  href: string;
  accent: string;
  weight: number;
};

export type ConceptLink = {
  from: string;
  to: string;
  type: ConceptLinkType;
  label: string;
};

export const conceptTypeLabels: Record<ConceptNodeType, string> = {
  principle: "اصل بنیادین",
  term: "واژه",
  text: "متن اوستا",
  article: "مقاله",
  hub: "هاب",
};

export const conceptLinkLabels: Record<ConceptLinkType, string> = {
  defines: "تعریف می‌کند",
  explains: "توضیح می‌دهد",
  "appears-in": "در متن می‌آید",
  continues: "ادامه مسیر",
  supports: "پشتیبانی مفهومی",
};

export function getConceptNodes(): ConceptNode[] {
  const principleNodes: ConceptNode[] = monotheismPillars.map((pillar, index) => ({
    id: `principle-${index}`,
    title: pillar.title,
    subtitle: pillar.subtitle,
    type: "principle",
    href: "/monotheism",
    accent: pillar.accent,
    weight: 95 - index * 4,
  }));

  const termNodes: ConceptNode[] = glossaryTerms.map((term, index) => ({
    id: `term-${term.slug}`,
    title: term.term,
    subtitle: term.meaning,
    type: "term",
    href: `/dictionary/${term.slug}`,
    accent: ["#F2D58A", "#D6A84F", "#FFF8EA", "#7EA4C8", "#C9B27A"][index] ?? "#D6A84F",
    weight: 88 - index * 3,
  }));

  const textNodes: ConceptNode[] = sampleVerses.map((verse, index) => ({
    id: `text-${verse.sectionSlug}-${verse.chapterSlug ?? index}`,
    title: `${verse.chapterTitle} / ${verse.verseNumber}`,
    subtitle: verse.quote,
    type: "text",
    href: `/avesta/${verse.sectionSlug}/${verse.chapterSlug ?? "chapter"}/${verse.verseSlug ?? "verse"}`,
    accent: verse.sectionSlug === "gathas" ? "#FFF8EA" : "#D6A84F",
    weight: 82 - index * 4,
  }));

  const articleNodes: ConceptNode[] = articleItems.map((article, index) => ({
    id: `article-${article.slug}`,
    title: article.title,
    subtitle: article.excerpt,
    type: "article",
    href: `/articles/${article.slug}`,
    accent: ["#D6A84F", "#FFF8EA", "#7EA4C8"][index] ?? "#D6A84F",
    weight: 76 - index * 3,
  }));

  const hubNodes: ConceptNode[] = [
    {
      id: "hub-reading-room",
      title: "تالار مطالعه زنده",
      subtitle: "تجربه مطالعه، صوت، واژه‌نامه و مسیر بعدی",
      type: "hub",
      href: "/reading-room",
      accent: "#F2D58A",
      weight: 72,
    },
    {
      id: "hub-trust",
      title: "مرکز اعتماد و ارجاع",
      subtitle: "منابع، citation و اعتبار پژوهشی",
      type: "hub",
      href: "/trust-center",
      accent: "#7EA4C8",
      weight: 70,
    },
  ];

  return [...principleNodes, ...termNodes, ...textNodes, ...articleNodes, ...hubNodes];
}

export function getConceptLinks(): ConceptLink[] {
  return [
    { from: "principle-1", to: "term-asha", type: "defines", label: "اشا ستون راستی است" },
    { from: "principle-0", to: "term-ahura-mazda", type: "defines", label: "اهورامزدا سرچشمه دانایی" },
    { from: "principle-2", to: "term-vohuman", type: "supports", label: "اختیار با اندیشه نیک معنا می‌گیرد" },
    { from: "term-gatha", to: "text-gathas-ahunavaiti", type: "appears-in", label: "سرود گاهانی" },
    { from: "term-asha", to: "article-asha-truth-order", type: "explains", label: "مقاله اشا" },
    { from: "term-faravahar", to: "article-faravahar-symbol", type: "explains", label: "نماد راه و انتخاب" },
    { from: "term-gatha", to: "article-what-are-gathas", type: "explains", label: "گات‌ها چیست" },
    { from: "text-yasna-ha-1", to: "hub-reading-room", type: "continues", label: "ادامه در تالار مطالعه" },
    { from: "article-asha-truth-order", to: "hub-trust", type: "supports", label: "اعتبار و منابع" },
    { from: "text-gathas-ahunavaiti", to: "term-vohuman", type: "appears-in", label: "خرد و انتخاب" },
  ];
}

export function getConceptMap() {
  const nodes = getConceptNodes();
  const links = getConceptLinks();

  return {
    nodes,
    links,
    summary: {
      nodes: nodes.length,
      links: links.length,
      types: new Set(nodes.map((node) => node.type)).size,
      strongestNode: [...nodes].sort((a, b) => b.weight - a.weight)[0],
    },
  };
}
