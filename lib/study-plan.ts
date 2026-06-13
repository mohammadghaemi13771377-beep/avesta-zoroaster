export type StudyPlanStep = {
  id: string;
  day: string;
  title: string;
  description: string;
  href: string;
  duration: string;
  theme: string;
  accent: string;
};

export const studyPlanSteps: StudyPlanStep[] = [
  {
    id: "gateway",
    day: "روز ۱",
    title: "ورود به جهان اوستا",
    description: "آشنایی با پورتال اوستا، بخش‌های اصلی و منطق تجربه موزه دیجیتال.",
    href: "/avesta",
    duration: "۱۲ دقیقه",
    theme: "پورتال",
    accent: "#D6A84F"
  },
  {
    id: "yasna",
    day: "روز ۲",
    title: "آغاز با یسنا",
    description: "دیدن ساختار نیایش، مفهوم آتش مقدس و مسیر خواندن هات‌ها.",
    href: "/avesta/yasna",
    duration: "۱۵ دقیقه",
    theme: "نیایش",
    accent: "#F2D58A"
  },
  {
    id: "gathas",
    day: "روز ۳",
    title: "گات‌ها و پیام زرتشت",
    description: "ورود به هسته اخلاقی و فلسفی پروژه: خرد، انتخاب و مسئولیت.",
    href: "/gathas",
    duration: "۱۸ دقیقه",
    theme: "خرد",
    accent: "#FFF8EA"
  },
  {
    id: "asha",
    day: "روز ۴",
    title: "اشا؛ نظم راستی",
    description: "شناخت یکی از مهم‌ترین واژه‌های اوستایی و پیوند آن با زندگی امروز.",
    href: "/dictionary/asha",
    duration: "۱۰ دقیقه",
    theme: "واژه‌نامه",
    accent: "#D6A84F"
  },
  {
    id: "monotheism",
    day: "روز ۵",
    title: "یکتاپرستی، خرد و روشنایی",
    description: "مطالعه اهورامزدا، اشا، اختیار انسان و اخلاق سه‌گانه.",
    href: "/monotheism",
    duration: "۱۴ دقیقه",
    theme: "الهیات",
    accent: "#B9B9B9"
  },
  {
    id: "timeline",
    day: "روز ۶",
    title: "تایم‌لاین ایران باستان",
    description: "قرار دادن زرتشت، گات‌ها، هخامنشیان، ساسانیان و امروز در یک خط روایی.",
    href: "/timeline",
    duration: "۱۶ دقیقه",
    theme: "تاریخ",
    accent: "#7EA4C8"
  },
  {
    id: "media",
    day: "روز ۷",
    title: "تصویر، صوت و تجربه",
    description: "دیدن رسانه‌ها، تصویرسازی AI و مسیر آینده پادکست و ویدیو.",
    href: "/media",
    duration: "۱۰ دقیقه",
    theme: "رسانه",
    accent: "#F2D58A"
  }
];

export function getStudyPlanSummary(completedIds: string[] = []) {
  const completed = studyPlanSteps.filter((step) => completedIds.includes(step.id)).length;
  const progress = Math.round((completed / studyPlanSteps.length) * 100);
  const nextStep = studyPlanSteps.find((step) => !completedIds.includes(step.id)) ?? studyPlanSteps[0];

  return {
    total: studyPlanSteps.length,
    completed,
    progress,
    nextStep
  };
}
