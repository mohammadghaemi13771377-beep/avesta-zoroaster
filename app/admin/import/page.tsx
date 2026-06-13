import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { BulkImportForm } from "@/components/admin/bulk-import-form";

export const metadata: Metadata = {
  title: "ورود دسته‌ای محتوا",
  description: "ورود دسته‌ای متن‌های اوستا، مقاله‌ها، واژه‌نامه و رسانه.",
};

export default function AdminImportPage() {
  return (
    <AdminShell>
      <p className="text-sm font-bold text-gold-light">Bulk Import</p>
      <h1 className="mt-4 text-5xl font-black leading-[1.25] text-warm">ورود دسته‌ای محتوا</h1>
      <p className="mt-5 max-w-3xl text-lg leading-9 text-muted">
        این صفحه برای زمانی است که متن‌ها، ترجمه‌ها، تصویرها و رسانه‌ها را دسته‌ای آماده داری. بسته را با JSON استاندارد وارد کن،
        اول dry-run بگیر، بعد import واقعی انجام بده.
      </p>
      <BulkImportForm />
    </AdminShell>
  );
}
