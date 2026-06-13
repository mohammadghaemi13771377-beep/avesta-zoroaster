import { CheckCircle2, KeyRound, Lock, ShieldCheck } from "lucide-react";
import { adminPermissions, getRoleMatrix } from "@/lib/admin-roles";

export function RoleAccessBoard() {
  const roles = getRoleMatrix();

  return (
    <section className="lux-frame p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-gold-light">
            <KeyRound size={21} />
            <h2 className="text-2xl font-black">نقش‌ها و سطح دسترسی</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">
            این ماتریس بر اساس enum فعلی Prisma یعنی READER، EDITOR و ADMIN ساخته شده و آماده اتصال به کنترل دسترسی
            واقعی در API و پنل مدیریت است.
          </p>
        </div>
        <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-bold text-gold-light">
          {roles.length} نقش / {adminPermissions.length} مجوز
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {roles.map((role) => (
          <article key={role.id} className="rounded-3xl border border-gold/10 bg-night/55 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black" style={{ color: role.tone }}>
                  {role.id}
                </p>
                <h3 className="mt-2 text-2xl font-black text-warm">{role.label}</h3>
              </div>
              <ShieldCheck className="text-gold-light" size={24} />
            </div>
            <p className="mt-3 text-sm leading-8 text-muted">{role.description}</p>
            <div className="mt-5 grid gap-2">
              {role.permissionDetails.map((permission) => (
                <div
                  key={permission.id}
                  className={
                    permission.enabled
                      ? "rounded-2xl border border-gold/20 bg-gold/10 p-3"
                      : "rounded-2xl border border-warm/10 bg-royal/35 p-3 opacity-65"
                  }
                >
                  <div className="flex items-center gap-2">
                    {permission.enabled ? (
                      <CheckCircle2 className="text-gold-light" size={16} />
                    ) : (
                      <Lock className="text-muted" size={15} />
                    )}
                    <p className="text-sm font-black text-warm">{permission.label}</p>
                  </div>
                  <p className="mt-1 text-xs leading-6 text-muted">{permission.description}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
