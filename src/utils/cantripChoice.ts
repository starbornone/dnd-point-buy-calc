import { wizardCantrips } from "@/data/cantrips";
import { CantripChoice, Race, Variant } from "@/types";

const cantripNames: readonly string[] = wizardCantrips;

export const resolveCantripChoice = (
  race: Race | undefined,
  variant: Variant | undefined
): CantripChoice | undefined => {
  if (!race) return undefined;
  return variant?.cantripChoice ?? race.cantripChoice;
};

export const cantripOptions = (choice: CantripChoice): readonly string[] =>
  choice.list === "wizard" ? cantripNames : [];

export const selectCantrip = (
  choice: CantripChoice | undefined,
  requested: string
): string => {
  if (!choice || !cantripOptions(choice).includes(requested)) return "";
  return requested;
};
