import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { PublishPipelineBoard } from "@/components/admin/publish-pipeline-board";
import { getPublishPipelineItems } from "@/lib/publish-pipeline";

export const metadata: Metadata = {
  title: "اتاق تصمیم انتشار",
  description: "Pipeline انتشار محتوا برای تصمیم publish، schedule، hold یا block بر اساس محتوا، رسانه، منبع و SEO."
};

export default function AdminPublishPipelinePage() {
  return (
    <AdminShell>
      <PublishPipelineBoard items={getPublishPipelineItems()} />
    </AdminShell>
  );
}
