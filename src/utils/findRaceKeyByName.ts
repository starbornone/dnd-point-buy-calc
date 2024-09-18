import { racialModifiers } from "@/data";

export const findRaceKeyByName = (name: string): string | undefined => {
  for (const key in racialModifiers) {
    if (racialModifiers[key].name === name) {
      return key;
    }
  }
  return undefined;
};
