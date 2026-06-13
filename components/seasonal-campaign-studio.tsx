"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, CheckCircle2, ImageIcon, Megaphone, Send, ShoppingBag, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { CampaignChannel, SeasonalCampaign } from "@/lib/seasonal-campaigns";
import { channelLabels } from "@/lib/seasonal-campaigns";

type SeasonalCampaignStudioProps = {
  campaigns: SeasonalCampaign[];
};

const channelIcons: Record<CampaignChannel, typeof Megaphone> = {
  homepage: Megaphone,
  article: Sparkles,
  media: ImageIcon,
  email: Send,
  shop: ShoppingBag,
};

export function SeasonalCampaignStudio({ campaigns }: SeasonalCampaignStudioProps) {
  const [activeId, setActiveId] = useState(campaigns[0]?.id ?? "");
  const activeCampaign = useMemo(
    () => campaigns.find((campaign) => campaign.id === activeId) ?? campaigns[0],
    [activeId, campaigns]
  );

  if (!activeCampaign) {
    return null;
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
      <aside className="lux-frame p-5">
        <div className="flex items-center gap-2 text-gold-light">
          <Megaphone size={21} />
          <h2 className="text-2xl font-black text-warm">کمپین‌ها</h2>
        </div>
        <div className="mt-5 grid gap-3">
          {campaigns.map((campaign) => (
            <button
              key={campaign.id}
              type="button"
              onClick={() => setActiveId(campaign.id)}
              className={
                activeCampaign.id === campaign.id
                  ? "rounded-2xl border border-gold/45 bg-gold/12 p-4 text-right"
                  : "rounded-2xl border border-gold/10 bg-night/55 p-4 text-right transition hover:border-gold/35"
              }
            >
              <span className="text-xs font-bold text-gold-light">{campaign.channels.length} کانال انتشار</span>
              <span className="mt-2 block text-xl font-black text-warm">{campaign.title}</span>
              <span className="mt-2 block text-sm leading-7 text-muted">{campaign.subtitle}</span>
            </button>
          ))}
        </div>
      </aside>

      <article className="lux-frame p-5 sm:p-7">
        <p className="gold-text text-xs font-semibold tracking-[0.24em]">SEASONAL CAMPAIGN KIT</p>
        <h2 className="mt-3 text-4xl font-black text-warm">{activeCampaign.title}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-9 text-muted">{activeCampaign.heroMessage}</p>
        <Link
          href={activeCampaign.primaryCta.href}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-gold-light"
        >
          {activeCampaign.primaryCta.label}
          <ArrowLeft size={15} />
        </Link>

        <div className="mt-7 grid gap-4 xl:grid-cols-5">
          {activeCampaign.channels.map((channel) => {
            const Icon = channelIcons[channel.type];

            return (
              <Link
                key={channel.type}
                href={channel.href}
                className="rounded-3xl border border-gold/10 bg-night/55 p-4 transition hover:border-gold/40 hover:bg-gold/10 xl:col-span-1"
              >
                <Icon className="text-gold-light" size={22} />
                <p className="mt-3 text-xs font-bold text-gold-light">{channelLabels[channel.type]}</p>
                <h3 className="mt-2 font-black text-warm">{channel.label}</h3>
                <p className="mt-3 text-xs leading-6 text-muted">{channel.deliverable}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <CampaignList icon={ImageIcon} title="Assetهای لازم" items={activeCampaign.assets} />
          <CampaignList icon={CheckCircle2} title="چک‌لیست لانچ کمپین" items={activeCampaign.checklist} />
        </div>
      </article>
    </section>
  );
}

function CampaignList({
  icon: Icon,
  title,
  items,
}: {
  icon: LucideIcon;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-3xl border border-gold/10 bg-night/55 p-5">
      <div className="flex items-center gap-2 text-gold-light">
        <Icon size={18} />
        <h3 className="font-black text-warm">{title}</h3>
      </div>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-warm/10 bg-black/18 p-3 text-sm leading-7 text-muted">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
