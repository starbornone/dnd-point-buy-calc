import { attributeKeys } from "@/data/attributeNames";
import { featOptions, feats } from "@/data/feats";
import { describe, expect, it } from "vitest";
import {
  calculateFeatBonus,
  featNeedsChoice,
  grantedFeatAbility,
} from "./calculateFeatBonus";

describe("feat ability increases", () => {
  it("only names feats from the Player's Handbook list", () => {
    for (const name of feats) {
      expect(featOptions(name).every((ability) => attributeKeys.includes(ability))).toBe(
        true
      );
    }
    expect(featOptions("Lucky")).toEqual([]);
    expect(featNeedsChoice("Resilient")).toBe(true);
    expect(featOptions("Resilient")).toEqual(attributeKeys);
  });

  it("applies a fixed increase and a chosen increase", () => {
    expect(grantedFeatAbility("Actor", "")).toBe("charisma");
    expect(calculateFeatBonus("Actor", "").charisma).toBe(1);
    expect(calculateFeatBonus("Athlete", "dexterity").dexterity).toBe(1);
    expect(calculateFeatBonus("Athlete", "wisdom").dexterity).toBe(0);
    expect(calculateFeatBonus("Athlete", "wisdom").strength).toBe(0);
    expect(calculateFeatBonus("Lucky", "strength").strength).toBe(0);
  });
});