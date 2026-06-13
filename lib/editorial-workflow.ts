export type EditorialTask = {
  id: string;
  title: string;
  area: string;
  stage: "content" | "review" | "media" | "seo" | "ready";
  owner: string;
  priority: "high" | "medium" | "low";
  readiness: number;
  href: string;
  nextAction: string;
};

export type EditorialCommandTask = EditorialTask & {
  deadline: string;
  blocker: string;
  checklist: Array<{
    label: string;
    done: boolean;
  }>;
  reviewer: string;
  publishTarget: string;
};

export const editorialTasks: EditorialTask[] = [
  {
    id: "yasna-ha-1",
    title: "تکمیل یسنا ۱ و لایه‌های ترجمه",
    area: "اوستا",
    stage: "content",
    owner: "Content",
    priority: "high",
    readiness: 42,
    href: "/admin/avesta",
    nextAction: "ورود متن اصلی، ترجمه کلاسیک و تحلیل مفهومی",
  },
  {
    id: "gathas-audio",
    title: "آماده‌سازی روایت صوتی گات‌ها",
    area: "رسانه",
    stage: "media",
    owner: "Media",
    priority: "high",
    readiness: 36,
    href: "/admin/media",
    nextAction: "آپلود فایل صوتی و اتصال به بند نمونه",
  },
  {
    id: "asha-sources",
    title: "اتصال منابع مقاله اشا",
    area: "مقاله‌ها",
    stage: "review",
    owner: "Editorial",
    priority: "medium",
    readiness: 68,
    href: "/admin/articles",
    nextAction: "ثبت منابع کتابخانه و وضعیت بازبینی",
  },
  {
    id: "library-archive",
    title: "ورود منابع آرشیوی کتابخانه",
    area: "کتابخانه",
    stage: "content",
    owner: "Library",
    priority: "medium",
    readiness: 54,
    href: "/admin/library",
    nextAction: "افزودن فایل، زبان، منبع و توضیح پژوهشی",
  },
  {
    id: "seo-schema",
    title: "بازبینی schema صفحات محتوایی",
    area: "SEO",
    stage: "seo",
    owner: "SEO",
    priority: "low",
    readiness: 82,
    href: "/admin/seo",
    nextAction: "کنترل Article، DefinedTerm و sitemap",
  },
];

export const editorialCommandTasks: EditorialCommandTask[] = editorialTasks.map((task, index) => {
  const deadline = ["2026-06-12", "2026-06-14", "2026-06-18", "2026-06-20", "2026-06-22"][index] ?? "2026-06-30";
  const reviewer = task.stage === "seo" ? "SEO Lead" : task.stage === "media" ? "Creative Lead" : "Research Lead";

  return {
    ...task,
    deadline,
    reviewer,
    publishTarget: task.stage === "ready" || task.readiness >= 85 ? "انتشار نزدیک" : "فاز آماده‌سازی",
    blocker: getBlocker(task),
    checklist: getChecklist(task),
  };
});

export function getEditorialSummary(tasks: EditorialTask[] = editorialTasks) {
  const readyCount = tasks.filter((task) => task.stage === "ready" || task.readiness >= 85).length;
  const highPriorityCount = tasks.filter((task) => task.priority === "high").length;
  const averageReadiness = Math.round(tasks.reduce((sum, task) => sum + task.readiness, 0) / tasks.length);

  return {
    total: tasks.length,
    readyCount,
    highPriorityCount,
    averageReadiness,
    nextTask: [...tasks].sort((a, b) => priorityWeight(b.priority) - priorityWeight(a.priority) || a.readiness - b.readiness)[0],
  };
}

export function getEditorialCommandSummary(tasks: EditorialCommandTask[] = editorialCommandTasks) {
  const base = getEditorialSummary(tasks);
  const blocked = tasks.filter((task) => task.blocker !== "بدون blocker جدی").length;
  const overdueRisk = tasks.filter((task) => task.priority === "high" && task.readiness < 50).length;
  const checklistTotal = tasks.reduce((sum, task) => sum + task.checklist.length, 0);
  const checklistDone = tasks.reduce((sum, task) => sum + task.checklist.filter((item) => item.done).length, 0);

  return {
    ...base,
    blocked,
    overdueRisk,
    checklistProgress: Math.round((checklistDone / checklistTotal) * 100),
  };
}

function priorityWeight(priority: EditorialTask["priority"]) {
  return priority === "high" ? 3 : priority === "medium" ? 2 : 1;
}

function getBlocker(task: EditorialTask) {
  if (task.stage === "content") {
    return "نیازمند ورود متن/فایل نهایی";
  }

  if (task.stage === "media") {
    return "نیازمند asset تصویری یا صوتی";
  }

  if (task.stage === "review") {
    return "نیازمند citation و تایید پژوهشی";
  }

  if (task.stage === "seo") {
    return "نیازمند بازبینی metadata در build نهایی";
  }

  return "بدون blocker جدی";
}

function getChecklist(task: EditorialTask) {
  return [
    {
      label: "محتوای اصلی ثبت شده",
      done: task.readiness >= 45,
    },
    {
      label: "منبع و citation وصل شده",
      done: task.stage === "review" ? task.readiness >= 75 : task.readiness >= 65,
    },
    {
      label: "رسانه و تصویر آماده است",
      done: task.stage === "media" ? task.readiness >= 75 : task.readiness >= 70,
    },
    {
      label: "SEO و schema بررسی شده",
      done: task.stage === "seo" ? task.readiness >= 80 : task.readiness >= 85,
    },
  ];
}
