import Link from "next/link";
import { ArrowLeft, CheckCircle2, CircleDashed, FileText, ShieldCheck } from "lucide-react";
import type { SourceTrustProfile } from "@/lib/source-trust";

type SourceTrustPanelProps = {
  profile: SourceTrustProfile;
};

const statusStyle = {
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  draft: "border-gold/20 bg-gold/10 text-gold-light",
  pending: "border-warm/10 bg-warm/5 text-muted",
};

export function SourceTrustPanel({ profile }: SourceTrustPanelProps) {
  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold-light">
            <ShieldCheck size={22} />
          </span>
          <div>
            <p className="gold-text text-xs font-semibold tracking-[0.22em]">SOURCE TRUST</p>
            <h2 className="mt-1 text-2xl font-black text-warm">{profile.title}</h2>
          </div>
        </div>
        <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-black text-gold-light">
          اعتبار {profile.confidence}٪
        </span>
      </div>

      <p className="mt-4 text-sm leading-8 text-muted">{profile.summary}</p>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-night/70">
        <div className="h-full rounded-full bg-gold" style={{ width: `${profile.confidence}%` }} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {profile.items.map((item) => {
          const Icon = item.status === "ready" ? CheckCircle2 : CircleDashed;

          return (
            <div key={`${item.label}-${item.value}`} className={`rounded-2xl border p-4 ${statusStyle[item.status]}`}>
              <div className="flex items-center gap-2">
                <Icon size={17} />
                <p className="text-xs font-black">{item.label}</p>
              </div>
              <p className="mt-2 text-sm font-bold leading-7">{item.value}</p>
            </div>
          );
        })}
      </div>

      <Link
        href="/trust-center"
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-night/45 px-5 py-3 text-sm font-black text-gold-light transition hover:bg-gold/10"
      >
        <FileText size={16} />
        رفتن به مرکز اعتماد
        <ArrowLeft size={16} />
      </Link>
    </section>
  );
}
