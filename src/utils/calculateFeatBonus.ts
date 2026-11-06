import { emptyBonuses } from "@/data/bonuses";
import { featOptions } from "@/data/feats";
import { AttributeState } from "@/types";

type Ability = keyof AttributeState;

const isListedAbility = (
  options: readonly Ability[],
  choice: string
): choice is Ability => options.includes(choice as Ability);

export const grantedFeatAbility = (feat: string, choice: string): Ability | "" => {
  const options = featOptions(feat);
  if (options.length === 1) return options[0];
  return isListedAbility(options, choice) ? choice : "";
};

export const calculateFeatBonus = (feat: string, choice: string): AttributeState => {
  const totals = emptyBonuses();
  const ability = grantedFeatAbility(feat, choice);
  if (ability) totals[ability] = 1;
  return totals;
};

export const featGrantsIncrease = (feat: string): boolean => featOptions(feat).length > 0;

export const featNeedsChoice = (feat: string): boolean => featOptions(feat).length > 1;
