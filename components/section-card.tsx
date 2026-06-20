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
      className="group lux-frame block min-h-[390px] overflow-hidden rounded-[18px] p-3 transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-gold"
    >
      <div className={`image-scene ${atmosphere} h-52 rounded-[14px] border border-gold/15`}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(min-width: 1280px) 14vw, (min-width: 768px) 30vw, 92vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020608]/62 via-[#071521]/8 to-transparent" />
        {roman ? (
          <div className="absolute right-4 top-4 z-10 font-display text-lg font-bold text-gold-light">
            {roman}
          </div>
        ) : null}
        <div className="absolute inset-x-4 bottom-4 z-10 h-px bg-gradient-to-l from-transparent via-gold/45 to-transparent" />
      </div>

      <div className="px-2 pb-3 pt-5">
        {kicker ? <p className="text-xs font-bold text-gold-light">{kicker}</p> : null}
        <h3 className="mt-2 text-2xl font-black leading-9 text-warm">{title}</h3>
        <p className="mt-3 min-h-20 text-sm leading-7 text-muted">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-gold-light">
          مطالعه
          <ArrowLeft size={16} className="transition group-hover:-translate-x-1" />
        </span>
      </div>
    </TrackedLink>
  );
}
