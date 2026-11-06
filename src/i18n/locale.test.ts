import { describe, expect, it } from "vitest";
import { raceDropdown } from "@/data/raceDropdown";
import { defaultAttributes, parseBuild, serializeBuild } from "@/utils/characterBuild";
import { readLocale, withLocale } from "./locale";
import { raceNames, skillLabel } from "./names";

describe("locale query", () => {
  it("keeps a shared build when a language is added", () => {
    const query = serializeBuild({
      race: "dwarf",
      variant: "Hill Dwarf",
      attributes: { ...defaultAttributes(), strength: 15 },
      bonuses: [undefined, undefined],
      skills: ["", ""],
      feat: "",
      featAbility: "",
      budget: 27,
    });
    const localized = withLocale(query, "es");

    expect(readLocale(localized)).toBe("es");
    expect(parseBuild(localized)).toMatchObject({
      race: "dwarf",
      variant: "Hill Dwarf",
      attributes: expect.objectContaining({ strength: 15 }),
    });
    expect(withLocale(query, "en")).toBe(query);
  });

  it("ignores an unknown language", () => {
    expect(readLocale("?lang=fr&race=elf")).toBe("en");
    expect(parseBuild("?lang=es")).toBeNull();
  });
});

describe("display names", () => {
  it("names every race in both languages", () => {
    for (const race of raceDropdown) {
      expect(raceNames.en[race.value]).toBeTruthy();
      expect(raceNames.es[race.value]).toBeTruthy();
    }
  });

  it("uses the Spanish Player's Handbook skill names", () => {
    expect(skillLabel("es", "Perception")).toBe("Percepción");
    expect(skillLabel("es", "Animal Handling")).toBe("Trato con animales");
    expect(skillLabel("en", "Perception")).toBe("Perception");
  });
});
