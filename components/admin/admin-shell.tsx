import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  Activity,
  BookMarked,
  BookOpen,
  Boxes,
  CalendarDays,
  BarChart3,
  ClipboardList,
  Cloud,
  DownloadCloud,
  DatabaseZap,
  Eye,
  FileText,
  FolderInput,
  GalleryHorizontalEnd,
  FileClock,
  Gauge,
  Globe2,
  HeartPulse,
  ImagePlus,
  KeyRound,
  Languages,
  LibraryBig,
  ListChecks,
  MousePointerClick,
  MailCheck,
  MailOpen,
  Palette,
  Route,
  PackageOpen,
  PackageCheck,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Tags,
  ToggleRight,
  UploadCloud,
  UsersRound,
} from "lucide-react";

const adminLinks: Array<[string, string, LucideIcon]> = [
  ["داشبورد", "/admin", Gauge],
  ["Go-Live", "/admin/go-live", Rocket],
  ["آمادگی Deploy", "/admin/deployment-readiness", Cloud],
  ["کیفیت صفحات", "/admin/page-quality", ListChecks],
  ["رشد جهانی", "/admin/global-growth-audit", Globe2],
  ["چندزبانه", "/admin/localization", Languages],
  ["آنالیتیکس محصول", "/admin/product-analytics", MousePointerClick],
  ["Event Tracking", "/admin/event-tracking", Activity],
  ["Event Collector", "/admin/event-collector", DatabaseZap],
  ["تحویل تیم‌ها", "/admin/team-handoff", UsersRound],
  ["خروجی و بکاپ محتوا", "/admin/content-export", DownloadCloud],
  ["اوستا", "/admin/avesta", BookOpen],
  ["آمادگی محتوای واقعی", "/admin/content-production-readiness", DatabaseZap],
  ["تکمیل اوستا", "/admin/avesta-completion", ListChecks],
  ["مسیرهای شروع اوستا", "/admin/avesta-study-paths", Route],
  ["تولید اوستا", "/admin/avesta-production", UploadCloud],
  ["انتشار اوستا", "/admin/avesta-publication-gates", Rocket],
  ["موج انتشار اوستا", "/admin/avesta-release-waves", CalendarDays],
  ["Feature Flags اوستا", "/admin/avesta-feature-flags", ToggleRight],
  ["گارد دسترسی اوستا", "/admin/avesta-access-control", KeyRound],
  ["Route Visibility", "/admin/route-visibility", Eye],
  ["پک منابع اوستا", "/admin/avesta-source-packs", PackageCheck],
  ["قالب Import اوستا", "/admin/avesta-import-template", DatabaseZap],
  ["مقاله‌ها", "/admin/articles", FileText],
  ["واژه‌نامه", "/admin/glossary", Tags],
  ["کتابخانه", "/admin/library", BookMarked],
  ["رسانه", "/admin/media", ImagePlus],
  ["تصاویر AI", "/admin/visual-assets", Palette],
  ["Asset Operations", "/admin/asset-operations", DatabaseZap],
  ["نمایشگاه‌ها", "/admin/exhibitions", GalleryHorizontalEnd],
  ["رجیستری منابع", "/admin/source-registry", LibraryBig],
  ["ورود منابع", "/admin/source-intake", FolderInput],
  ["پوشش ارجاع", "/admin/citation-coverage", BarChart3],
  ["بازبینی منابع", "/admin/source-review", ShieldCheck],
  ["فروشگاه", "/admin/shop", PackageOpen],
  ["Inventory", "/admin/inventory", Boxes],
  ["عملیات محتوا", "/admin/content-operations", ClipboardList],
  ["صف تولید", "/admin/production", UploadCloud],
  ["Brief تولید", "/admin/production/briefs", ClipboardList],
  ["Review تولید", "/admin/production/review", ShieldCheck],
  ["ورود دسته‌ای", "/admin/import", DatabaseZap],
  ["گردش‌کار", "/admin/editorial", ListChecks],
  ["Publish Pipeline", "/admin/publish-pipeline", Rocket],
  ["تقویم انتشار", "/admin/calendar", CalendarDays],
  ["خبرنامه", "/admin/newsletter", MailOpen],
  ["صف خبرنامه", "/admin/newsletter/schedule", Send],
  ["تحویل خبرنامه", "/admin/newsletter/delivery", MailCheck],
  ["آمادگی لانچ", "/admin#launch-readiness", Rocket],
  ["SEO", "/admin/seo", Search],
  ["سلامت پروژه", "/api/admin/health", HeartPulse],
  ["نقش‌ها", "/admin#roles", KeyRound],
  ["گزارش فعالیت", "/admin#audit-log", FileClock],
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-32 sm:px-6 lg:grid-cols-[270px_1fr] lg:px-8">
      <aside className="lux-frame h-fit p-4 lg:sticky lg:top-28">
        <p className="gold-text px-3 text-sm font-semibold tracking-[0.22em]">ADMIN CONSOLE</p>
        <nav className="mt-5 grid gap-2">
          {adminLinks.map(([label, href, Icon]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-warm transition hover:bg-gold/10 hover:text-gold-light"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </main>
  );
}
