import { backgrounds2024, originFeats2024, species2024 } from "@/data/origins2024";
import { emptyBonuses } from "@/data/bonuses";
import type { AttributeState } from "@/types";

export type RulesEdition = "2014" | "2024";
type Ability = keyof AttributeState;

export interface Origin2024 {
  species: string;
  lineage: string;
  background: string;
  spread: boolean;
  plusTwo: Ability | "";
  plusOne: Ability | "";
  humanFeat: string;
}

export const emptyOrigin2024 = (): Origin2024 => ({
  species: "", lineage: "", background: "", spread: false, plusTwo: "", plusOne: "", humanFeat: "",
});

export const getBackground2024 = (name: string) =>
  Object.hasOwn(backgrounds2024, name) ? backgrounds2024[name] : undefined;

export const getSpecies2024 = (name: string) =>
  Object.hasOwn(species2024, name) ? species2024[name] : undefined;

export const humanFeatOptions = (background: string) => {
  const granted = getBackground2024(background)?.feat;
  return originFeats2024.filter((feat) => feat !== granted || feat === "Skilled");
};

export const selectOrigin2024 = (input: Partial<Record<keyof Origin2024, unknown>>): Origin2024 => {
  const species = typeof input.species === "string" && getSpecies2024(input.species) ? input.species : "";
  const background = typeof input.background === "string" && getBackground2024(input.background) ? input.background : "";
  const lineages = getSpecies2024(species)?.lineages ?? [];
  const abilities = getBackground2024(background)?.abilities ?? [];
  const spread = Boolean(background) && input.spread === true;
  const plusTwo = spread ? "" : abilities.find((ability) => ability === input.plusTwo) ?? "";
  const plusOne = spread ? "" : abilities.find((ability) => ability === input.plusOne && ability !== plusTwo) ?? "";

  return {
    species,
    lineage: lineages.find((lineage) => lineage === input.lineage) ?? "",
    background,
    spread,
    plusTwo,
    plusOne,
    humanFeat: species === "human" ? humanFeatOptions(background).find((feat) => feat === input.humanFeat) ?? "" : "",
  };
};

export const calculateBackgroundBonuses = (origin: Origin2024): AttributeState => {
  const bonuses = emptyBonuses();
  const background = getBackground2024(origin.background);
  if (!background) return bonuses;
  if (!origin.spread && (!origin.plusTwo || !origin.plusOne)) return bonuses;

  for (const ability of background.abilities) {
    if (origin.spread) bonuses[ability] = 1;
    else if (ability === origin.plusTwo) bonuses[ability] = 2;
    else if (ability === origin.plusOne) bonuses[ability] = 1;
  }
  return bonuses;
};
