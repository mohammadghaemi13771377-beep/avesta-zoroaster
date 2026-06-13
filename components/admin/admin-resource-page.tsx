import { CheckCircle2 } from "lucide-react";

import { AdminContentForm } from "@/components/admin-content-form";

type AdminResourcePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  checklist: string[];
  showContentForm?: boolean;
};

export function AdminResourcePage({
  eyebrow,
  title,
  description,
  checklist,
  showContentForm = true,
}: AdminResourcePageProps) {
  return (
    <div>
      <p className="gold-text text-sm font-semibold tracking-[0.24em]">{eyebrow}</p>
      <h1 className="mt-4 text-5xl font-black leading-[1.25] text-warm">{title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-9 text-muted">{description}</p>
      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {checklist.map((item) => (
          <article key={item} className="lux-frame p-5">
            <CheckCircle2 className="text-gold-light" size={24} />
            <h2 className="mt-4 text-xl font-black text-warm">{item}</h2>
            <p className="mt-2 leading-7 text-muted">
              این بخش به قرارداد ذخیره‌سازی ادمین وصل است و بعد از اتصال دیتابیس به CRUD کامل تبدیل می‌شود.
            </p>
          </article>
        ))}
      </section>
      {showContentForm ? <AdminContentForm /> : null}
    </div>
  );
}
