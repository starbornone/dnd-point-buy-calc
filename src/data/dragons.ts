export const dragons = [
  { name: "Black", damage: "acid", breath: "line", save: "dexterity" },
  { name: "Blue", damage: "lightning", breath: "line", save: "dexterity" },
  { name: "Brass", damage: "fire", breath: "line", save: "dexterity" },
  { name: "Bronze", damage: "lightning", breath: "line", save: "dexterity" },
  { name: "Copper", damage: "acid", breath: "line", save: "dexterity" },
  { name: "Gold", damage: "fire", breath: "cone", save: "dexterity" },
  { name: "Green", damage: "poison", breath: "cone", save: "constitution" },
  { name: "Red", damage: "fire", breath: "cone", save: "dexterity" },
  { name: "Silver", damage: "cold", breath: "cone", save: "constitution" },
  { name: "White", damage: "cold", breath: "cone", save: "constitution" },
] as const;

export type DragonName = (typeof dragons)[number]["name"];
export type DragonDamage = (typeof dragons)[number]["damage"];
export type DragonBreath = (typeof dragons)[number]["breath"];

export const dragonByName = (name: string) =>
  dragons.find((dragon) => dragon.name === name);
