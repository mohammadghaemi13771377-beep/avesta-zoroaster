import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminResourcePage } from "@/components/admin/admin-resource-page";
import { CitationBoard } from "@/components/citation-board";
import { FocusedContentForm } from "@/components/admin/focused-content-form";
import { getCitationRecords } from "@/lib/citations";

export const metadata: Metadata = {
  title: "مدیریت کتابخانه",
  description: "مدیریت PDFها، منابع فارسی و انگلیسی، نسخه‌های قدیمی و فایل‌های پژوهشی.",
};

export default function AdminLibraryPage() {
  return (
    <AdminShell>
      <AdminResourcePage
        eyebrow="Digital Library"
        title="مدیریت کتابخانه"
        description="ثبت منابع، فایل‌های PDF، نسخه‌های پژوهشی، زبان، نویسنده و مسیر فایل برای کتابخانه دیجیتال."
        checklist={["عنوان و نویسنده", "مسیر فایل", "زبان و نوع منبع", "منبع و توضیح"]}
        showContentForm={false}
      />
      <section className="mt-12">
        <div className="mb-5">
          <p className="text-sm font-bold text-gold-light">Citation Map</p>
          <h2 className="mt-2 text-3xl font-black text-warm">نقشه ارجاع منابع</h2>
          <p className="mt-3 max-w-3xl leading-8 text-muted">
            این بورد نشان می‌دهد هر محتوای سایت به کدام منبع، ترجمه یا یادداشت تحریریه وصل شده و چه چیزی هنوز نیازمند بازبینی است.
          </p>
        </div>
        <CitationBoard records={getCitationRecords().slice(0, 6)} compact />
      </section>
      <FocusedContentForm resource="libraryItem" />
    </AdminShell>
  );
}
