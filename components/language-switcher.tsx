import Link from "next/link";
import { Globe2 } from "lucide-react";
import { localizedRouteMap } from "@/lib/i18n";

export function LanguageSwitcher({ path = "/" }: { path?: string }) {
  return (
    <div className="hidden items-center gap-1 rounded-xl border border-gold/18 px-2 py-1 text-xs text-gold-light md:flex">
      <Globe2 size={15} />
      {localizedRouteMap(path).map((item) => (
        <Link key={item.locale} href={item.href} className="rounded-lg px-2 py-1 transition hover:bg-gold/10">
          {item.locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
