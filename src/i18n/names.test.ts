import { feats } from "@/data/feats";
import { describe, expect, it } from "vitest";
import { featLabel, featsForLocale, languageGroupLabel } from "./names";

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
