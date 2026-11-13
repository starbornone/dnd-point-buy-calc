import { feats } from "@/data/feats";
import { describe, expect, it } from "vitest";
import { ancestryLabel, backgroundLabel, featLabel, featsForLocale, languageGroupLabel, lineageLabel, speciesLabel } from "./names";

describe("2024 origin labels", () => {
  it("localizes backgrounds, species and lineages", () => {
    expect(backgroundLabel("en", "Farmer")).toBe("Farmer");
    expect(backgroundLabel("zh", "Farmer")).toBe("农夫");
    expect(speciesLabel("en", "orc")).toBe("Orc");
    expect(speciesLabel("zh", "orc")).toBe("兽人");
    expect(speciesLabel("zh", "human")).toBe("人类");
    expect(lineageLabel("zh", "elf", "Drow")).toBe("卓尔精灵");
    expect(lineageLabel("zh", "elf", "Wood Elf")).toBe("木精灵");
    expect(lineageLabel("zh", "dragonborn", "Red")).toBe(ancestryLabel("zh", "Red"));
  });
});

describe("featsForLocale", () => {
  it("keeps English source order for the English locale", () => {
    expect(featsForLocale("en")).toEqual([...feats]);
  });

  it("sorts by Chinese labels for the Chinese locale", () => {
    const sorted = featsForLocale("zh");
    expect(sorted).not.toEqual([...feats]);
    expect(sorted).toEqual(
      [...feats].sort((a, b) =>
        featLabel("zh", a).localeCompare(featLabel("zh", b), "zh")
      )
    );
  });
});

describe("languageGroupLabel", () => {
  it("localizes standard and exotic group names", () => {
    expect(languageGroupLabel("en", "Standard languages")).toBe("Standard languages");
    expect(languageGroupLabel("en", "Exotic languages")).toBe("Exotic languages");
    expect(languageGroupLabel("zh", "Standard languages")).toBe("标准语言");
    expect(languageGroupLabel("zh", "Exotic languages")).toBe("异种语言");
  });
});
