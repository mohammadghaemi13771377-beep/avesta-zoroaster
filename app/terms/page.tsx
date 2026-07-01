import type { Metadata } from "next";
import { AlertTriangle, BookOpen, ShieldCheck } from "lucide-react";

import { CinematicHub } from "@/components/cinematic-hub";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "قوانین استفاده | AVESTA-ZOROASTER",
  description: "قوانین استفاده، یادداشت پژوهشی، محدوده مسئولیت و اصول محتوایی AVESTA-ZOROASTER.",
  path: "/terms",
  image: "/images/ai/library-hero.jpg",
});

const rules = [
  {
    title: "کاربری آموزشی",
    body: "محتوای سایت برای آموزش، آشنایی فرهنگی، پژوهش مقدماتی و تجربه دیجیتال طراحی شده و جایگزین منبع دانشگاهی قطعی نیست.",
    icon: BookOpen,
  },
  {
    title: "احترام به منبع",
    body: "بازنشر، نقل‌قول و استفاده پژوهشی باید با ارجاع مناسب به منبع و با رعایت حقوق پدیدآورندگان انجام شود.",
    icon: ShieldCheck,
  },
  {
    title: "محتوای در حال تکمیل",
    body: "بخش‌هایی از اوستا، ترجمه‌ها، تصویرها و رسانه‌ها ممکن است در نسخه‌های بعدی اصلاح، تکمیل یا جایگزین شوند.",
    icon: AlertTriangle,
  },
];

export default function TermsPage() {
  return (
    <CinematicHub
      eyebrow="Terms"
      title="قوانین استفاده"
      lead="AVESTA-ZOROASTER یک پلتفرم فرهنگی و آموزشی است. استفاده از سایت باید با احترام به منابع، پژوهش، فرهنگ و حقوق کاربران انجام شود."
      scene="scene-scroll"
      heroImage="/images/ai/library-hero.jpg"
      actions={[
        { label: "مرکز حریم خصوصی", href: "/privacy-center" },
        { label: "مرکز اعتماد", href: "/trust-center", variant: "secondary" },
      ]}
      stats={[
        { value: "Respect", label: "احترام به منبع" },
        { value: "Privacy", label: "حریم کاربر" },
        { value: "Review", label: "بازبینی محتوا" },
      ]}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {rules.map(({ title, body, icon: Icon }) => (
          <article key={title} className="lux-frame p-6">
            <Icon className="text-gold-light" size={28} />
            <h2 className="mt-5 text-2xl font-black text-warm">{title}</h2>
            <p className="mt-3 leading-8 text-muted">{body}</p>
          </article>
        ))}
      </div>
    </CinematicHub>
  );
}
