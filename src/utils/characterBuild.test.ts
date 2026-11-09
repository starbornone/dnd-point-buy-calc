import { describe, expect, it } from "vitest";
import {
  buildFileName,
  defaultAttributes,
  fromBuildFile,
  parseBuild,
  serializeBuild,
  toBuildFile,
} from "./characterBuild";

describe("character build links", () => {
  it("ignores inherited race keys in links and JSON builds", () => {
    expect(parseBuild("?race=constructor")?.race).toBe("");
    expect(fromBuildFile({ version: 1, attributes: {}, race: "__proto__" })?.race).toBe("");
  });

  it("round-trips a shared build", () => {
    const attributes = defaultAttributes();
    attributes.strength = 15;
    attributes.dexterity = 14;
    const query = serializeBuild({
      race: "dwarf",
      variant: "Hill Dwarf",
      attributes,
      bonuses: [undefined, undefined],
      skills: ["", ""],
      languages: ["", ""],
      tool: "",
      cantrip: "",
      dragon: "",
      feat: "",
      featAbility: "",
      budget: 32,
    });

    expect(parseBuild(query)).toMatchObject({
      race: "dwarf",
      variant: "Hill Dwarf",
      budget: 32,
      attributes: expect.objectContaining({ strength: 15, dexterity: 14, constitution: 8 }),
    });
  });

  it("keeps variant human skill and feat choices", () => {
    const query = serializeBuild({
      race: "human",
      variant: "Variant Human",
      attributes: defaultAttributes(),
      bonuses: ["dexterity", "charisma"],
      skills: ["Perception", ""],
      languages: ["", ""],
      tool: "",
      cantrip: "",
      dragon: "",
      feat: "Lucky",
      featAbility: "",
      budget: 27,
    });
    const parsed = parseBuild(`?${query}`);
    expect(parsed?.bonuses).toEqual(["dexterity", "charisma"]);
    expect(parsed?.skills).toEqual(["Perception", ""]);
    expect(parsed?.feat).toBe("Lucky");
  });

  it("keeps a half-elf skill pair and drops a skill a changeling cannot take", () => {
    expect(parseBuild("?race=halfElf&skill=Perception,Stealth")?.skills).toEqual([
      "Perception",
      "Stealth",
    ]);
    expect(parseBuild("?race=changeling&skill=Arcana,Deception,Insight")?.skills).toEqual([
      "Deception",
      "Insight",
    ]);
  });

  it("keeps an extra language and drops one the race already speaks", () => {
    expect(parseBuild("?race=halfElf&tongue=Elvish,Dwarvish")?.languages).toEqual([
      "Dwarvish",
      "",
    ]);
    expect(parseBuild("?race=changeling&tongue=Orc,Goblin")?.languages).toEqual([
      "Orc",
      "Goblin",
    ]);
    expect(parseBuild("?race=elf&variant=High+Elf&tongue=Sylvan")?.languages).toEqual([
      "Sylvan",
      "",
    ]);
    expect(parseBuild("?race=elf&variant=Wood+Elf&tongue=Sylvan")?.languages).toEqual([
      "",
      "",
    ]);
  });

  it("keeps a legal tool or cantrip and drops one the race cannot take", () => {
    const dwarf = new URLSearchParams({
      race: "dwarf",
      variant: "Hill Dwarf",
      tool: "Smith's tools",
    });
    expect(parseBuild(dwarf.toString())?.tool).toBe("Smith's tools");
    expect(parseBuild("?race=dwarf&variant=Hill+Dwarf&tool=Thieves'+tools")?.tool).toBe("");
    expect(parseBuild("?race=warforged&tool=Thieves'+tools")?.tool).toBe("Thieves' tools");
    expect(parseBuild("?race=elf&variant=High+Elf&cantrip=Fire+Bolt")?.cantrip).toBe("Fire Bolt");
    expect(parseBuild("?race=elf&variant=Wood+Elf&cantrip=Fire+Bolt")?.cantrip).toBe("");
  });

  it("keeps a dragonborn ancestry and drops it for any other race", () => {
    expect(parseBuild("?race=dragonborn&dragon=Red")?.dragon).toBe("Red");
    expect(parseBuild("?race=dragonborn&dragon=Purple")?.dragon).toBe("");
    expect(parseBuild("?race=dwarf&variant=Hill+Dwarf&dragon=Red")?.dragon).toBe("");
  });

  it("drops scores and choices that are not legal", () => {
    const parsed = parseBuild(
      "?race=nope&str=18&cha=3&bonus=luck,wisdom&skill=Perception&feat=Lucky&budget=500"
    );
    expect(parsed?.race).toBe("");
    expect(parsed?.attributes.strength).toBe(8);
    expect(parsed?.attributes.charisma).toBe(8);
    expect(parsed?.bonuses).toEqual(["wisdom", undefined]);
    expect(parsed?.skills).toEqual(["", ""]);
    expect(parsed?.feat).toBe("");
    expect(parsed?.featAbility).toBe("");
    expect(parsed?.budget).toBe(27);
  });

  it("returns null when the link has no build fields", () => {
    expect(parseBuild("")).toBeNull();
  });
});

describe("build files", () => {
  it("records racial totals and reloads the same choices", () => {
    const attributes = defaultAttributes();
    attributes.strength = 15;
    const build = {
      race: "halfElf",
      variant: "",
      attributes,
      bonuses: ["dexterity", "wisdom"] as ["dexterity", "wisdom"],
      skills: ["", ""] as ["", ""],
      languages: ["", ""] as ["", ""],
      tool: "",
      cantrip: "",
      dragon: "",
      feat: "",
      featAbility: "" as const,
      budget: 27,
    };
    const file = toBuildFile(build);

    expect(file.abilities.find((ability) => ability.key === "charisma")).toMatchObject({
      racial: 2,
      total: 10,
      modifier: "+0",
    });
    expect(file.abilities.find((ability) => ability.key === "dexterity")?.racial).toBe(1);
    expect(file.pointCost).toBe(9);
    expect(file.grantedSkills).toEqual([]);
    expect(file.grantedCantrips).toEqual([]);
    expect(file.pointsRemaining).toBe(18);
    expect(fromBuildFile(file)).toMatchObject({
      race: "halfElf",
      bonuses: ["dexterity", "wisdom"],
      attributes: expect.objectContaining({ strength: 15 }),
    });
    expect(buildFileName(build)).toBe("half-elf.json");
  });

  it("adds a feat increase without spending points", () => {
    const build = {
      race: "human",
      variant: "Variant Human",
      attributes: defaultAttributes(),
      bonuses: ["strength", "dexterity"] as ["strength", "dexterity"],
      skills: ["Perception", ""] as ["Perception", ""],
      languages: ["", ""] as ["", ""],
      tool: "",
      cantrip: "",
      dragon: "",
      feat: "Actor",
      featAbility: "" as const,
      budget: 27,
    };
    const file = toBuildFile(build);
    expect(file.abilities.find((ability) => ability.key === "charisma")).toMatchObject({
      racial: 0,
      feat: 1,
      total: 9,
      modifier: "-1",
    });
    expect(file.pointCost).toBe(0);
    expect(fromBuildFile(file)?.featAbility).toBe("charisma");

    const athlete = serializeBuild({ ...build, feat: "Athlete", featAbility: "dexterity" });
    expect(parseBuild(athlete)?.featAbility).toBe("dexterity");
    expect(
      parseBuild("?race=human&variant=Variant+Human&feat=Athlete&asi=wisdom")?.featAbility
    ).toBe("");
  });

  it("rejects a file from another version", () => {
    expect(fromBuildFile({ version: 2, attributes: defaultAttributes() })).toBeNull();
    expect(fromBuildFile(null)).toBeNull();
  });
});
