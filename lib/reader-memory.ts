export type ReaderMemoryKey = {
  key: string;
  label: string;
  description: string;
  futureModel: string;
};

export const readerMemoryKeys: ReaderMemoryKey[] = [
  {
    key: "avesta-reader-settings-v1",
    label: "تنظیمات مطالعه",
    description: "حالت شب/سپیا/روشن، اندازه فونت و فاصله خطوط.",
    futureModel: "ReadingPreference",
  },
  {
    key: "avesta-reader-bookmarks-v1",
    label: "بوکمارک‌ها",
    description: "صفحه‌ها و بندهایی که کاربر برای بازگشت بعدی ذخیره می‌کند.",
    futureModel: "Bookmark",
  },
  {
    key: "avesta-reader-last-read-v1",
    label: "آخرین مطالعه",
    description: "آخرین مسیر خواندن، عنوان صفحه و درصد پیشرفت اسکرول.",
    futureModel: "ReadingProgress",
  },
  {
    key: "avesta-reader-notes-v1",
    label: "یادداشت‌ها",
    description: "یادداشت‌های شخصی کاربر کنار بندها و مقاله‌ها.",
    futureModel: "ReaderNote",
  },
  {
    key: "avesta-study-plan-completed-v1",
    label: "برنامه مطالعه",
    description: "قدم‌های کامل‌شده در مسیر ۷ روزه مطالعه.",
    futureModel: "StudyPlanProgress",
  },
  {
    key: "avesta-learning-quests-v1",
    label: "مأموریت‌های خرد",
    description: "مأموریت‌های کامل‌شده، XP و badgeهای قابل اتصال به پروفایل.",
    futureModel: "LearningQuestProgress",
  },
  {
    key: "avesta-daily-reflection-v1",
    label: "دفتر روزانه",
    description: "ثبت‌های روزانه پندار نیک، گفتار نیک و کردار نیک.",
    futureModel: "DailyReflection",
  },
  {
    key: "avesta-reader-collections-v1",
    label: "کلکسیون‌ها",
    description: "کلکسیون‌های مطالعاتی ذخیره‌شده برای مسیرهای موضوعی.",
    futureModel: "SavedCollection",
  },
  {
    key: "avesta-saved-searches-v1",
    label: "جستجوهای ذخیره‌شده",
    description: "عبارت‌های پژوهشی و جستجوهای مهم کاربر.",
    futureModel: "SavedSearch",
  },
];

export function getReaderMemoryApiSummary() {
  return {
    totalKeys: readerMemoryKeys.length,
    localMode: true,
    nextSource: "User profile database models, encrypted notes, cross-device sync and personalized AI recommendations",
  };
}
