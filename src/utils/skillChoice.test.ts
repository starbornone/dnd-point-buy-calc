import { raceData } from "@/data/raceData";
import { describe, expect, it } from "vitest";
import { resolveSkillChoice, selectSkills } from "./skillChoice";

const variant = (raceKey: string, name: string) =>
  raceData[raceKey].variants?.find((entry) => entry.name === name);

describe("skill choices", () => {
  it("follows the race, and a replacing variant replaces that choice", () => {
    expect(resolveSkillChoice(raceData.halfElf, undefined)?.count).toBe(2);
    expect(resolveSkillChoice(raceData.changeling, undefined)?.options).toEqual([
      "Deception",
      "Insight",
      "Intimidation",
      "Persuasion",
    ]);
    expect(resolveSkillChoice(raceData.human, variant("human", "Standard Human"))).toBeUndefined();
    expect(resolveSkillChoice(raceData.human, variant("human", "Variant Human"))?.count).toBe(1);
    expect(resolveSkillChoice(raceData.dwarf, variant("dwarf", "Hill Dwarf"))).toBeUndefined();
  });

  it("keeps two different legal skills and drops the rest", () => {
    const choice = resolveSkillChoice(raceData.halfElf, undefined);
    expect(selectSkills(choice, ["Perception", "Perception", "Stealth", "Arcana"])).toEqual([
      "Perception",
      "Stealth",
    ]);
    expect(selectSkills(resolveSkillChoice(raceData.changeling, undefined), ["Arcana", "Deception"])).toEqual([
      "Deception",
      "",
    ]);
    expect(
      selectSkills(resolveSkillChoice(raceData.human, variant("human", "Variant Human")), [
        "Perception",
        "Stealth",
      ])
    ).toEqual(["Perception", ""]);
  });
});