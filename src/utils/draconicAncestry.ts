import { dragonByName, dragons } from "@/data/dragons";
import { Race } from "@/types";

export const hasDraconicAncestry = (race: Race | undefined): boolean =>
  Boolean(race?.draconicAncestry);

export const selectDragon = (race: Race | undefined, requested: string): string => {
  if (!hasDraconicAncestry(race) || !dragonByName(requested)) return "";
  return requested;
};

export const dragonOptions = (): readonly string[] => dragons.map((dragon) => dragon.name);
