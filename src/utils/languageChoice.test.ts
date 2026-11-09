import { raceData } from "@/data/raceData";
import { describe, expect, it } from "vitest";
import {
  languageGroupsFor,
  resolveLanguageChoice,
  selectLanguages,
} from "./languageChoice";

const variant = (raceKey: string, name: string) =>
  raceData[raceKey].variants?.find((entry) => entry.name === name);

describe("language choices", () => {
  it("gives the extra languages each race actually offers", () => {
    expect(resolveLanguageChoice(raceData.human, variant("human", "Variant Human"))?.count).toBe(
      1
    );
    expect(resolveLanguageChoice(raceData.changeling, undefined)?.count).toBe(2);
    expect(resolveLanguageChoice(raceData.elf, variant("elf", "High Elf"))?.count).toBe(1);
    expect(resolveLanguageChoice(raceData.elf, variant("elf", "Wood Elf"))).toBeUndefined();
    expect(resolveLanguageChoice(raceData.dwarf, variant("dwarf", "Hill Dwarf"))).toBeUndefined();
  });

  it("skips a language the race already speaks and a repeated pick", () => {
    const halfElf = resolveLanguageChoice(raceData.halfElf, undefined);
    expect(selectLanguages(halfElf, ["Elvish", "Elvish", "Dwarvish", "Giant"])).toEqual([
      "Dwarvish",
      "",
    ]);
    expect(selectLanguages(resolveLanguageChoice(raceData.changeling, undefined), ["Common", "Orc", "Goblin"])).toEqual([
      "Orc",
      "Goblin",
    ]);
  });

  it("groups remaining languages as standard then exotic after exclusions", () => {
    const halfElf = resolveLanguageChoice(raceData.halfElf, undefined);
    expect(halfElf).toBeDefined();
    const groups = languageGroupsFor(halfElf!);
    expect(groups.map((group) => group.name)).toEqual([
      "Standard languages",
      "Exotic languages",
    ]);
    expect(groups[0].languages).not.toContain("Common");
    expect(groups[0].languages).not.toContain("Elvish");
    expect(groups[0].languages).toContain("Dwarvish");
    expect(groups[1].languages).toContain("Draconic");
  });
});
