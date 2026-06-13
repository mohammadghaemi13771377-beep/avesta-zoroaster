import { buildAchievements, type Achievement, type AchievementInput } from "@/lib/achievements";
import { getQuestSummary, learningQuests } from "@/lib/learning-quests";

export type AchievementHallSnapshot = {
  input: AchievementInput;
  achievements: Achievement[];
  unlocked: number;
  total: number;
  completion: number;
  level: string;
  nextAchievement: Achievement;
  featuredBadges: string[];
};

export const defaultAchievementInput: AchievementInput = {
  bookmarks: 3,
  notes: 2,
  completedVerses: 1,
  savedDaily: 2,
  studyPlanSteps: 3,
  collections: 1,
};

export function getAchievementHallSnapshot(input: AchievementInput = defaultAchievementInput): AchievementHallSnapshot {
  const achievements = buildAchievements(input);
  const unlocked = achievements.filter((achievement) => achievement.unlocked).length;
  const completion = Math.round((unlocked / achievements.length) * 100);
  const questSummary = getQuestSummary(["first-light", "asha-wisdom"], learningQuests);
  const nextAchievement = achievements.find((achievement) => !achievement.unlocked) ?? achievements[0];

  return {
    input,
    achievements,
    unlocked,
    total: achievements.length,
    completion,
    level: completion >= 80 ? "راهنمای روشنایی" : completion >= 45 ? "جوینده پیشرفته" : "جوینده روشنایی",
    nextAchievement,
    featuredBadges: [...questSummary.badges, ...achievements.filter((item) => item.unlocked).map((item) => item.title)].slice(0, 8),
  };
}

export function getAchievementHallStats() {
  const snapshot = getAchievementHallSnapshot();

  return [
    { label: "نشان فعال", value: String(snapshot.unlocked) },
    { label: "پیشرفت", value: `${snapshot.completion}٪` },
    { label: "سطح", value: snapshot.level },
  ];
}
