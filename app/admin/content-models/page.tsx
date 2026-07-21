import { AdminShell } from "@/components/admin/admin-shell";
import { ContentModelStudio } from "@/components/admin/content-model-studio";
import { getAdminContentModels } from "@/lib/admin-content-models";

export const metadata = {
  title: "مدل‌های محتوا | پنل ادمین AVESTA-ZOROASTER",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminContentModelsPage() {
  return (
    <AdminShell>
      <ContentModelStudio models={getAdminContentModels()} />
    </AdminShell>
  );
}
