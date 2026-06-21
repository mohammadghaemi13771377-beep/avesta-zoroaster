import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import type { TrackPayloadValue } from "@/lib/client-events";

type SectionCardProps = {
  title: string;
  description: string;
  href: string;
  atmosphere: string;
  kicker?: string;
  roman?: string;
  imageSrc?: string;
  tracking?: {
    event: string;
    payload: Record<string, TrackPayloadValue>;
  };
};

export function SectionCard({ title, description, href, atmosphere, kicker, roman, imageSrc, tracking }: SectionCardProps) {
  return (
    <TrackedLink
      href={href}
      event={tracking?.event ?? "avesta_section_opened"}
      payload={
        tracking?.payload ?? {
          section_slug: href.split("/").filter(Boolean).at(-1) ?? href,
          card_position: roman ?? "",
          source_route: "section-card",
        }
      }
      className="group block min-h-[430px] overflow-hidden rounded-[14px] border border-gold/28 bg-night/72 p-2 shadow-[0_18px_52px_rgba(0,0,0,0.28)] backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-gold/70 hover:bg-night/88 hover:shadow-gold"
    >
      <div className={`image-scene ${atmosphere} h-60 rounded-[10px] border border-gold/20`}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(min-width: 1280px) 14vw, (min-width: 768px) 30vw, 92vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020608]/82 via-[#071521]/10 to-transparent" />
        {roman ? (
          <div className="absolute right-3 top-3 z-10 rounded-full border border-gold/35 bg-black/30 px-3 py-1 font-display text-sm font-bold text-gold-light backdrop-blur">
            {roman}
          </div>
        ) : null}
        <div className="absolute inset-x-4 bottom-4 z-10 h-px bg-gradient-to-l from-transparent via-gold/65 to-transparent" />
      </div>

      <div className="px-3 pb-4 pt-5">
        {kicker ? <p className="text-xs font-bold text-gold-light">{kicker}</p> : null}
        <h3 className="mt-2 text-2xl font-black leading-9 text-warm">{title}</h3>
        <p className="mt-3 min-h-20 text-sm leading-7 text-warm/70">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">
          مطالعه
          <ArrowLeft size={16} className="transition group-hover:-translate-x-1" />
        </span>
      </div>
    </TrackedLink>
  );
}
