"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent, type TrackPayloadValue } from "@/lib/client-events";

type TrackedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "href" | "onClick"> & {
    children: ReactNode;
    event: string;
    payload?: Record<string, TrackPayloadValue>;
  };

export function TrackedLink({ children, event, payload, href, ...props }: TrackedLinkProps) {
  return (
    <Link
      href={href}
      {...props}
      onClick={() => {
        const route = typeof href === "string" ? href : String(href);
        void trackEvent({
          event,
          route,
          payload: {
            ...payload,
            target_href: route,
          },
        });
      }}
    >
      {children}
    </Link>
  );
}
