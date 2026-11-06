import { describe, expect, it } from "vitest";
import { raceDropdown } from "@/data/raceDropdown";
import { defaultAttributes, parseBuild, serializeBuild } from "@/utils/characterBuild";
import { LOCALES, PLANNED_LOCALES, readLocale, withLocale } from "./locale";
import { raceNames, skillLabel } from "./names";

describe("locale query", () => {
  it("keeps a shared build when a language is added", () => {
    const query = serializeBuild({
      race: "dwarf",
      variant: "Hill Dwarf",
      attributes: { ...defaultAttributes(), strength: 15 },
      bonuses: [undefined, undefined],
      skills: ["", ""],
      languages: ["", ""],
      tool: "",
      cantrip: "",
      dragon: "",
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
    expect(withLocale(query, "zh")).toContain("lang=zh");
    expect(readLocale(withLocale(query, "zh"))).toBe("zh");
    expect(withLocale(query, "en")).toBe(query);
  });

  it("ignores an unknown language", () => {
    expect(readLocale("?lang=fr&race=elf")).toBe("en");
    expect(parseBuild("?lang=es")).toBeNull();
  });

  it("leaves planned languages untranslated", () => {
    for (const locale of PLANNED_LOCALES) {
      expect(LOCALES).not.toContain(locale.code);
      expect(readLocale(`?lang=${locale.code}`)).toBe("en");
    }
  });
});

describe("display names", () => {
  it("names every race in each language", () => {
    for (const race of raceDropdown) {
      for (const locale of LOCALES) {
        expect(raceNames[locale][race.value]).toBeTruthy();
      }
    }
  });

  it("uses the handbook skill names", () => {
    expect(skillLabel("zh", "Perception")).toBe("察觉");
    expect(skillLabel("zh", "Animal Handling")).toBe("驯兽");
    expect(skillLabel("es", "Perception")).toBe("Percepción");
    expect(skillLabel("es", "Animal Handling")).toBe("Trato con animales");
    expect(skillLabel("en", "Perception")).toBe("Perception");
  });
});
