import { skills } from "@/data/skills";
import { Race, SkillChoice, Variant } from "@/types";

export type SkillPicks = [string, string];

const skillNames: readonly string[] = skills;

export const emptySkillPicks = (): SkillPicks => ["", ""];

export const resolveSkillChoice = (
  race: Race | undefined,
  variant: Variant | undefined
): SkillChoice | undefined => {
  if (!race) return undefined;
  if (variant?.replacesParent) return variant.skillChoice;
  return variant?.skillChoice ?? race.skillChoice;
};

export const selectSkills = (
  choice: SkillChoice | undefined,
  requested: readonly string[]
): SkillPicks => {
  const picks = emptySkillPicks();
  if (!choice) return picks;

  const allowed = new Set(
    (choice.options ?? skillNames).filter((name) => skillNames.includes(name))
  );
  const used = new Set<string>();
  for (const name of requested) {
    if (!allowed.has(name) || used.has(name)) continue;
    picks[used.size] = name;
    used.add(name);
    if (used.size === choice.count) break;
  }
  return picks;
};
