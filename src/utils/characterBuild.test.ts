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
