import { racialModifiers } from "@/data/racialModifiers";
import { AttributeState } from "@/types/race";
import { findRaceKeyByName } from "@/utils/findRaceKeyByName";

export const getModifiers = (
  raceOrVariant: string,
  name: string
): AttributeState => {
  let key = name;

  if (raceOrVariant === "variant") {
    key = findRaceKeyByName(name) || name;
  }

  return (
    racialModifiers[key as keyof typeof racialModifiers] || {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    }
  );
};
