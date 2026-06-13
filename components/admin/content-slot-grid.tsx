import { CheckCircle2, CircleDashed, FileAudio, FileText, Image as ImageIcon, Video } from "lucide-react";
import { contentSlots, type ContentSlot } from "@/lib/content-slots";

const iconByKind = {
  image: ImageIcon,
  audio: FileAudio,
  text: FileText,
  pdf: FileText,
  video: Video
};

export function ContentSlotGrid() {
  return (
    <section className="mt-12 rounded-[18px] border border-gold/15 bg-night/60 p-6">
      <p className="text-sm font-bold text-gold-light">Content Slots</p>
      <h2 className="mt-3 text-3xl font-black text-warm">جایگاه‌های آماده پر کردن</h2>
      <p className="mt-3 max-w-3xl leading-8 text-muted">
        این‌ها جای خالی‌های مهم پروژه هستند. بعداً می‌توانی تصویر، صوت، PDF یا متن را با همین مسیرها وارد کنی.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {contentSlots.map((slot) => (
          <SlotCard key={slot.id} slot={slot} />
        ))}
      </div>
    </section>
  );
}

function SlotCard({ slot }: { slot: ContentSlot }) {
  const Icon = iconByKind[slot.kind];
  const isEmpty = slot.status === "empty";

  return (
    <article className="rounded-[18px] border border-gold/12 bg-royal/45 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/20 bg-gold/10 text-gold-light">
          <Icon size={22} />
        </div>
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${isEmpty ? "bg-warm/8 text-muted" : "bg-gold/10 text-gold-light"}`}>
          {isEmpty ? <CircleDashed size={14} /> : <CheckCircle2 size={14} />}
          {slot.status}
        </div>
      </div>
      <h3 className="mt-5 text-xl font-black text-warm">{slot.title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{slot.note}</p>
      <div className="mt-4 rounded-2xl border border-gold/10 bg-night/65 p-3 text-left text-xs leading-6 text-gold-light" dir="ltr">
        {slot.suggestedPath}
      </div>
      <p className="mt-3 text-xs text-muted" dir="ltr">
        target: {slot.target}
      </p>
    </article>
  );
}
