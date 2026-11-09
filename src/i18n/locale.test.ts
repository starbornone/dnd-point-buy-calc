import { describe, expect, it } from "vitest";
import { raceData } from "@/data/raceData";
import { raceDropdown } from "@/data/raceDropdown";
import { defaultAttributes, parseBuild, serializeBuild } from "@/utils/characterBuild";
import { LOCALES, PLANNED_LOCALES, readLocale, withLocale } from "./locale";
import { raceNames, skillLabel } from "./names";
import { getRaceTraits } from "./raceTraits";

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

describe("Chinese racial trait text", () => {
  it.each(raceDropdown)("covers $name and its variants", ({ value }) => {
    const race = raceData[value];
    const variants = ["", ...(race.variants ?? []).map(({ name }) => name)];

    for (const variant of variants) {
      const en = getRaceTraits("en", value, variant)!;
      const zh = getRaceTraits("zh", value, variant)!;
      const fields = ["ability", "age", "alignment", "size", "speed", "language"] as const;

      expect(zh.other).toHaveLength(en.other.length);
      for (const text of [...fields.map((field) => zh[field]), ...zh.other]) {
        expect(text).toMatch(/\p{Script=Han}/u);
      }
    }
  });

  it("merges translated variants using the base rules", () => {
    const woodElf = getRaceTraits("zh", "elf", "Wood Elf");
    expect(woodElf?.ability).toBe("你的敏捷值增加 2。 你的感知值增加 1。");
    expect(woodElf?.speed).toBe("你的基础步行速度为 35 尺。");
    expect(woodElf?.other).toEqual(expect.arrayContaining(["黑暗视觉", "荒野面具"]));

    const human = getRaceTraits("zh", "human", "Variant Human");
    expect(human?.ability).toBe("选择两项不同的属性，其属性值各增加 1。");
    expect(human?.other).toContain("你获得一项自选专长。");
  });

  it("preserves English rules text for Spanish", () => {
    expect(getRaceTraits("es", "dwarf", "Hill Dwarf")).toEqual(
      getRaceTraits("en", "dwarf", "Hill Dwarf")
    );
  });
});
