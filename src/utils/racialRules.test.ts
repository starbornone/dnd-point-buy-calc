import { bonuses } from "@/data/bonuses";
import { raceData } from "@/data/raceData";
import { raceDropdown } from "@/data/raceDropdown";
import { describe, expect, it } from "vitest";
import { calculateRacialBonuses } from "./calculateRacialBonuses";
import { getFixedBonuses } from "./getModifiers";
import { mergeRaceAndVariant } from "./mergeRaceAndVariant";

describe("race catalogue", () => {
  it("offers every dropdown race from the same records as the trait text", () => {
    for (const race of raceDropdown) {
      expect(raceData[race.value]?.name).toBe(race.name);
    }
  });

  it("uses the Eberron subrace list for shifters", () => {
    expect(raceData.shifter.variants?.map((variant) => variant.name)).toEqual([
      "Beasthide",
      "Longtooth",
      "Swiftstride",
      "Wildhunt",
    ]);
  });
});

describe("fixed racial bonuses", () => {
  it("matches the trait text for races that had drifted numbers", () => {
    expect(getFixedBonuses("firbolg", "")).toEqual(
      bonuses({ wisdom: 2, strength: 1 })
    );
    expect(getFixedBonuses("lizardfolk", "")).toEqual(
      bonuses({ constitution: 2, wisdom: 1 })
    );
    expect(getFixedBonuses("kobold", "")).toEqual(
      bonuses({ dexterity: 2, strength: -2 })
    );
    expect(getFixedBonuses("githyanki", "")).toEqual(
      bonuses({ strength: 2, intelligence: 1 })
    );
    expect(getFixedBonuses("githzerai", "")).toEqual(
      bonuses({ wisdom: 2, intelligence: 1 })
    );
  });

  it("stacks subrace deltas on the parent bonuses", () => {
    expect(getFixedBonuses("dwarf", "Hill Dwarf")).toEqual(
      bonuses({ constitution: 2, wisdom: 1 })
    );
    expect(getFixedBonuses("dwarf", "Mountain Dwarf")).toEqual(
      bonuses({ strength: 2, constitution: 2 })
    );
    expect(getFixedBonuses("elf", "High Elf")).toEqual(
      bonuses({ dexterity: 2, intelligence: 1 })
    );
    expect(getFixedBonuses("elf", "Eladrin")).toEqual(
      bonuses({ dexterity: 2, intelligence: 1 })
    );
  });

  it("uses Volo's aasimar subraces", () => {
    expect(getFixedBonuses("aasimar", "")).toEqual(bonuses({ charisma: 2 }));
    expect(getFixedBonuses("aasimar", "Protector")).toEqual(
      bonuses({ charisma: 2, wisdom: 1 })
    );
    expect(getFixedBonuses("aasimar", "Scourge")).toEqual(
      bonuses({ charisma: 2, constitution: 1 })
    );
    expect(getFixedBonuses("aasimar", "Fallen")).toEqual(
      bonuses({ charisma: 2, strength: 1 })
    );
    const protector = mergeRaceAndVariant(raceData.aasimar, "Protector");
    expect(protector.ability).toContain("Charisma score increases by 2");
    expect(protector.ability).toContain("Wisdom score increases by 1");
    expect(protector.other).toContain("Healing Hands");
    expect(protector.other).toContain("Radiant Soul");
  });

  it("uses published Eberron bonuses for shifter, changeling, and warforged", () => {
    expect(getFixedBonuses("shifter", "Beasthide")).toEqual(
      bonuses({ constitution: 2, strength: 1 })
    );
    expect(getFixedBonuses("shifter", "Longtooth")).toEqual(
      bonuses({ strength: 2, dexterity: 1 })
    );
    expect(getFixedBonuses("shifter", "Swiftstride")).toEqual(
      bonuses({ dexterity: 2, charisma: 1 })
    );
    expect(getFixedBonuses("shifter", "Wildhunt")).toEqual(
      bonuses({ wisdom: 2, dexterity: 1 })
    );
    expect(getFixedBonuses("changeling", "")).toEqual(bonuses({ charisma: 2 }));
    expect(getFixedBonuses("warforged", "")).toEqual(
      bonuses({ constitution: 2 })
    );
  });

  it("replaces the standard human bonuses for variant human", () => {
    expect(getFixedBonuses("human", "")).toEqual(
      bonuses({
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1,
      })
    );
    expect(getFixedBonuses("human", "Variant Human")).toEqual(bonuses({}));
  });
});

describe("calculateRacialBonuses", () => {
  const halfElf = raceData.halfElf.floatingBonus!;
  const changeling = raceData.changeling.floatingBonus!;
  const variantHuman = raceData.human.variants!.find(
    (variant) => variant.name === "Variant Human"
  )!.floatingBonus!;

  it("does not invent a Strength bonus when a pick is empty", () => {
    expect(
      calculateRacialBonuses({
        fixedBonuses: getFixedBonuses("halfElf", ""),
        floatingBonus: halfElf,
        selectedBonuses: [undefined, undefined],
      })
    ).toEqual(bonuses({ charisma: 2 }));
  });

  it("applies half-elf picks except Charisma, and only once each", () => {
    expect(
      calculateRacialBonuses({
        fixedBonuses: getFixedBonuses("halfElf", ""),
        floatingBonus: halfElf,
        selectedBonuses: ["dexterity", "wisdom"],
      })
    ).toEqual(bonuses({ charisma: 2, dexterity: 1, wisdom: 1 }));

    expect(
      calculateRacialBonuses({
        fixedBonuses: getFixedBonuses("halfElf", ""),
        floatingBonus: halfElf,
        selectedBonuses: ["charisma", "strength"],
      })
    ).toEqual(bonuses({ charisma: 2, strength: 1 }));

    expect(
      calculateRacialBonuses({
        fixedBonuses: getFixedBonuses("halfElf", ""),
        floatingBonus: halfElf,
        selectedBonuses: ["strength", "strength"],
      })
    ).toEqual(bonuses({ charisma: 2, strength: 1 }));
  });

  it("adds the warforged floating bonus to an ability other than Constitution", () => {
    expect(
      calculateRacialBonuses({
        fixedBonuses: getFixedBonuses("warforged", ""),
        floatingBonus: raceData.warforged.floatingBonus!,
        selectedBonuses: ["strength", undefined],
      })
    ).toEqual(bonuses({ constitution: 2, strength: 1 }));

    expect(
      calculateRacialBonuses({
        fixedBonuses: getFixedBonuses("warforged", ""),
        floatingBonus: raceData.warforged.floatingBonus!,
        selectedBonuses: ["constitution"],
      })
    ).toEqual(bonuses({ constitution: 2 }));
  });

  it("applies one changeling pick and neither human bonus until both are chosen", () => {
    expect(
      calculateRacialBonuses({
        fixedBonuses: getFixedBonuses("changeling", ""),
        floatingBonus: changeling,
        selectedBonuses: ["dexterity", "wisdom"],
      }).dexterity
    ).toBe(1);
    expect(
      calculateRacialBonuses({
        fixedBonuses: getFixedBonuses("changeling", ""),
        floatingBonus: changeling,
        selectedBonuses: ["charisma"],
      })
    ).toEqual(bonuses({ charisma: 2 }));

    expect(
      calculateRacialBonuses({
        fixedBonuses: getFixedBonuses("human", "Variant Human"),
        floatingBonus: variantHuman,
        selectedBonuses: ["intelligence", undefined],
      })
    ).toEqual(bonuses({ intelligence: 1 }));
  });
});

describe("mergeRaceAndVariant", () => {
  it("keeps parent traits and appends the subrace", () => {
    const hillDwarf = mergeRaceAndVariant(raceData.dwarf, "Hill Dwarf");
    expect(hillDwarf.ability).toContain("Constitution score increases by 2");
    expect(hillDwarf.ability).toContain("Wisdom score increases by 1");
    expect(hillDwarf.other).toContain("Darkvision");
    expect(hillDwarf.other).toContain("Dwarven Toughness");
  });

  it("overrides speed when the subrace changes it", () => {
    const woodElf = mergeRaceAndVariant(raceData.elf, "Wood Elf");
    expect(woodElf.speed).toContain("35 feet");
    expect(woodElf.other).toContain("Keen Senses");
    expect(woodElf.other).toContain("Mask of the Wild");
  });

  it("replaces variant human ability text instead of stacking it", () => {
    const variant = mergeRaceAndVariant(raceData.human, "Variant Human");
    expect(variant.ability).toBe(
      "Two different ability scores of your choice increase by 1."
    );
    expect(variant.other).toContain("Feat");
  });
});
