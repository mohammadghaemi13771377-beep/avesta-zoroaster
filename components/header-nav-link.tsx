"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type HeaderNavLinkProps = {
  href: string;
  children: ReactNode;
  className: string;
  activeClassName?: string;
};

export function HeaderNavLink({ href, children, className, activeClassName = "bg-gold/14 text-gold-light" }: HeaderNavLinkProps) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={`${className} ${active ? activeClassName : ""}`}>
      {children}
    </Link>
  );
}
