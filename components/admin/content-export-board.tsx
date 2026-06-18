import Link from "next/link";
import { ArrowLeft, Archive, Database, DownloadCloud, FileJson, Images, Route, ShieldCheck } from "lucide-react";
import type { ContentExportBundle, ContentExportJob } from "@/lib/content-export";

type ContentExportBoardProps = {
  bundle: ContentExportBundle;
};

const ownerLabel: Record<ContentExportJob["owner"], string> = {
  content: "تیم محتوا",
  design: "تیم دیزاین",
  engineering: "تیم فنی",
  product: "تیم محصول"
};

const ownerClass: Record<ContentExportJob["owner"], string> = {
  content: "border-gold/25 bg-gold/10 text-gold-light",
  design: "border-sky-300/25 bg-sky-300/10 text-sky-100",
  engineering: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  product: "border-violet-300/25 bg-violet-300/10 text-violet-100"
};

export function ContentExportBoard({ bundle }: ContentExportBoardProps) {
  const metricGroups = [
    { label: "مقاله", value: bundle.summary.articles, icon: FileJson },
    { label: "واژه‌نامه", value: bundle.summary.glossaryTerms, icon: Database },
    { label: "فصل اوستا", value: bundle.summary.avestaChapters, icon: Route },
    { label: "بند نمونه", value: bundle.summary.avestaVerses, icon: Archive },
    { label: "راهنمای فصل", value: bundle.summary.chapterGuides, icon: FileJson },
    { label: "پروفایل فصل", value: bundle.summary.chapterProfiles, icon: ShieldCheck },
    { label: "مسیر مطالعه", value: bundle.summary.studyPaths, icon: Route },
    { label: "گروه تصویر", value: bundle.summary.visualAssetGroups, icon: Images }
  ];

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="gold-text text-xs font-semibold tracking-[0.24em]">CONTENT EXPORT & BACKUP</p>
          <h1 className="mt-3 text-4xl font-black text-warm">خروجی و بکاپ محتوای سایت</h1>
          <p className="mt-4 max-w-3xl leading-8 text-muted">
            این بخش برای روزی است که سایت با متن، تصویر، مقاله، واژه‌نامه و مسیرهای مطالعه پر می‌شود. تیم‌ها می‌توانند
            همین حالا یک snapshot ساختارمند از محتوا بگیرند و بعداً آن را به دیتابیس، CMS، storage یا بکاپ دوره‌ای وصل کنند.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/api/admin/content-export" className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10">
            مشاهده JSON
            <FileJson size={16} />
          </Link>
          <Link href="/api/admin/content-export?download=1" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light">
            دانلود خروجی
            <DownloadCloud size={16} />
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metricGroups.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-gold/10 bg-royal/45 p-4">
            <Icon className="text-gold-light" size={19} />
            <p className="mt-3 text-xs font-bold text-muted">{label}</p>
            <p className="mt-1 text-2xl font-black text-warm">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-gold/10 bg-night/55 p-5">
          <p className="text-xs font-black text-gold-light">Bundle فعال</p>
          <h2 className="mt-2 text-2xl font-black text-warm">{bundle.project.name}</h2>
          <div className="mt-4 grid gap-3 text-sm leading-7 text-muted sm:grid-cols-2">
            <Info label="دامنه" value={bundle.project.domain} />
            <Info label="زبان" value={bundle.project.locale} />
            <Info label="جهت" value={bundle.project.direction.toUpperCase()} />
            <Info label="تاریخ تولید" value={new Date(bundle.generatedAt).toLocaleString("fa-IR")} />
          </div>
          <p className="mt-4 rounded-2xl border border-gold/10 bg-royal/35 p-4 text-sm leading-7 text-muted">
            {bundle.project.note}
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5">
          <div className="flex items-center gap-3 text-emerald-100">
            <ShieldCheck size={20} />
            <p className="text-xs font-black">آمادگی production محتوا</p>
          </div>
          <p className="mt-3 text-4xl font-black text-warm">{bundle.summary.productionReadiness}%</p>
          <p className="mt-2 text-sm leading-7 text-muted">
            این عدد از بورد آمادگی محتوای واقعی می‌آید و نشان می‌دهد برای ورود محتوای سنگین، کدام بخش‌ها هنوز به دیتابیس،
            storage، امنیت یا workflow نیاز دارند.
          </p>
          <Link href="/admin/content-production-readiness" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">
            دیدن جزئیات آمادگی
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {bundle.jobs.map((job) => (
          <article key={job.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${ownerClass[job.owner]}`}>
                    {ownerLabel[job.owner]}
                  </span>
                  <span className="rounded-full border border-warm/10 bg-warm/5 px-3 py-1 text-xs font-bold uppercase text-muted">
                    {job.format}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-black text-warm">{job.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{job.description}</p>
              </div>
              <Link href={job.route} className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-4 py-2 text-sm font-black text-gold-light transition hover:bg-gold/10">
                باز کردن خروجی
                <ArrowLeft size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-night/35 p-4">
      <p className="text-xs font-bold text-muted">{label}</p>
      <p className="mt-1 font-black text-warm" dir="ltr">
        {value}
      </p>
    </div>
  );
}
