import { Race, Variant } from "@/types";

const combine = (
  parent: readonly string[] | undefined,
  variant: Variant | undefined,
  pick: (entry: Race | Variant) => readonly string[] | undefined
): string[] => {
  if (variant?.replacesParent) return [...(pick(variant) ?? [])];
  const names = [...(parent ?? []), ...(variant ? pick(variant) ?? [] : [])];
  return names.filter((name, index) => names.indexOf(name) === index);
};

export const resolveGrantedSkills = (
  race: Race | undefined,
  variant: Variant | undefined
): string[] => {
  if (!race) return [];
  return combine(race.grantedSkills, variant, (entry) => entry.grantedSkills);
};

export const resolveGrantedTools = (
  race: Race | undefined,
  variant: Variant | undefined
): string[] => {
  if (!race) return [];
  return combine(race.grantedTools, variant, (entry) => entry.grantedTools);
};

export const resolveGrantedCantrips = (
  race: Race | undefined,
  variant: Variant | undefined
): string[] => {
  if (!race) return [];
  return combine(race.grantedCantrips, variant, (entry) => entry.grantedCantrips);
};
