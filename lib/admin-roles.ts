export type AdminRoleId = "READER" | "EDITOR" | "ADMIN";

export type AdminPermission = {
  id: string;
  label: string;
  description: string;
};

export type AdminRoleProfile = {
  id: AdminRoleId;
  label: string;
  description: string;
  tone: string;
  permissions: string[];
};

export const adminPermissions: AdminPermission[] = [
  {
    id: "read_content",
    label: "مشاهده محتوا",
    description: "دیدن متن‌ها، مقاله‌ها، واژه‌نامه و رسانه‌های منتشرشده.",
  },
  {
    id: "manage_avesta",
    label: "مدیریت اوستا",
    description: "ساخت و ویرایش بخش‌ها، فصل‌ها، بندها، ترجمه‌ها و تحلیل‌ها.",
  },
  {
    id: "manage_articles",
    label: "مدیریت مقاله‌ها",
    description: "ساخت، ویرایش و آماده‌سازی مقاله‌های پژوهشی و تحلیلی.",
  },
  {
    id: "manage_glossary",
    label: "مدیریت واژه‌نامه",
    description: "ثبت معنی، ریشه، توضیح و پیوندهای مرتبط هر واژه.",
  },
  {
    id: "manage_media",
    label: "مدیریت رسانه",
    description: "بارگذاری تصویر AI، صوت، ویدیو، فایل و اتصال آن‌ها به محتوا.",
  },
  {
    id: "manage_shop",
    label: "مدیریت فروشگاه",
    description: "ساخت و ویرایش محصول، قیمت، موجودی، وضعیت انتشار و آماده‌سازی سفارش‌ها.",
  },
  {
    id: "bulk_import",
    label: "ورود دسته‌ای",
    description: "اجرای dry-run و import واقعی برای متن، رسانه و منابع.",
  },
  {
    id: "seo_admin",
    label: "SEO و متادیتا",
    description: "کنترل metadata، schema، sitemap و آماده‌سازی ایندکس.",
  },
  {
    id: "system_admin",
    label: "مدیریت سیستم",
    description: "دیدن سلامت پروژه، APIها، وضعیت دیتابیس و تنظیمات حساس.",
  },
];

export const adminRoleProfiles: AdminRoleProfile[] = [
  {
    id: "READER",
    label: "Reader",
    description: "کاربر عادی که مطالعه می‌کند، بوکمارک می‌سازد و مسیر شخصی دارد.",
    tone: "#B9B9B9",
    permissions: ["read_content"],
  },
  {
    id: "EDITOR",
    label: "Editor",
    description: "عضو تیم محتوا که متن‌ها، مقاله‌ها، واژه‌نامه و رسانه‌ها را آماده می‌کند.",
    tone: "#D6A84F",
    permissions: [
      "read_content",
      "manage_avesta",
      "manage_articles",
      "manage_glossary",
      "manage_media",
      "manage_shop",
      "bulk_import",
    ],
  },
  {
    id: "ADMIN",
    label: "Admin",
    description: "مدیر کامل پروژه با دسترسی به انتشار، SEO، سلامت سیستم و همه بخش‌های ادمین.",
    tone: "#F2D58A",
    permissions: adminPermissions.map((permission) => permission.id),
  },
];

export function getRoleMatrix() {
  return adminRoleProfiles.map((role) => ({
    ...role,
    permissionDetails: adminPermissions.map((permission) => ({
      ...permission,
      enabled: role.permissions.includes(permission.id),
    })),
  }));
}
