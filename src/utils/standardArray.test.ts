import { attributeKeys } from "@/data/attributeNames";
import { describe, expect, it } from "vitest";
import { calculatePointCost, POINT_BUY_BUDGET } from "./calculatePointCost";
import { STANDARD_ARRAY_SCORES, standardArrayAttributes } from "./standardArray";

describe("standard array", () => {
  it("assigns 15, 14, 13, 12, 10, and 8 in ability order", () => {
    const attributes = standardArrayAttributes();
    attributeKeys.forEach((key, index) => {
      expect(attributes[key]).toBe(STANDARD_ARRAY_SCORES[index]);
    });
    const cost = attributeKeys.reduce(
      (sum, key) => sum + calculatePointCost(attributes[key]),
      0
    );
    expect(cost).toBe(POINT_BUY_BUDGET);
  });
});