import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminResourcePage } from "@/components/admin/admin-resource-page";
import { AiArtStudio } from "@/components/ai-art-studio";
import { AiPromptLibrary } from "@/components/admin/ai-prompt-library";
import { ContentSlotGrid } from "@/components/admin/content-slot-grid";
import { MediaAssetForm } from "@/components/admin/media-asset-form";
import { MediaUploadForm } from "@/components/admin/media-upload-form";
import { aiArtStyleRules, getAiArtBriefs } from "@/lib/ai-art-studio";

export const metadata: Metadata = {
  title: "مدیریت رسانه",
  description: "مدیریت تصویرهای AI، صوت، ویدیو و promptهای تولید محتوای AVESTA-ZOROASTER.",
};

export default function AdminMediaPage() {
  return (
    <AdminShell>
      <AdminResourcePage
        eyebrow="Media Library"
        title="مدیریت رسانه"
        description="ثبت تصویر، صوت، ویدیو، promptهای AI و اتصال هر asset به صفحه، بخش یا بند مرتبط."
        checklist={["تصویر AI", "فایل صوتی", "پرامپت تولید تصویر", "اتصال asset به محتوا"]}
        showContentForm={false}
      />
      <ContentSlotGrid />
      <AiArtStudio briefs={getAiArtBriefs()} styleRules={aiArtStyleRules} adminMode />
      <AiPromptLibrary />
      <MediaUploadForm />
      <MediaAssetForm />
    </AdminShell>
  );
}
