import { describe, expect, it } from "vitest";
import {
  calculatePointCost,
  formatPointCost,
  POINT_BUY_BUDGET,
} from "./calculatePointCost";

describe("calculatePointCost", () => {
  it.each([
    [8, 0],
    [9, 1],
    [10, 2],
    [11, 3],
    [12, 4],
    [13, 5],
    [14, 7],
    [15, 9],
  ])("scores %i at %i points", (score, cost) => {
    expect(calculatePointCost(score)).toBe(cost);
  });

  it("prices the standard 15/14/13/12/10/8 array at 27", () => {
    const total = [15, 14, 13, 12, 10, 8].reduce(
      (sum, score) => sum + calculatePointCost(score),
      0
    );
    expect(total).toBe(27);
    expect(total).toBe(POINT_BUY_BUDGET);
  });

  it("does not price scores outside 8-15", () => {
    expect(calculatePointCost(7)).toBeNaN();
    expect(calculatePointCost(16)).toBeNaN();
    expect(calculatePointCost(1)).toBeNaN();
    expect(calculatePointCost(Number.NaN)).toBeNaN();
    expect(formatPointCost(16)).toBe("\u2014");
  });
});
