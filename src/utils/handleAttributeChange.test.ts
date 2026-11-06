import { AttributeState } from "@/types";
import { describe, expect, it } from "vitest";
import { handleAttributeChange } from "./handleAttributeChange";

const baseScores = (): AttributeState => ({
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8,
});

const apply = (raw: string) => {
  let next: AttributeState | undefined;
  handleAttributeChange(
    { target: { value: raw } } as React.ChangeEvent<HTMLInputElement>,
    "strength",
    (update) => {
      next = typeof update === "function" ? update(baseScores()) : update;
    }
  );
  return next;
};

describe("handleAttributeChange", () => {
  it("stores a legal score", () => {
    expect(apply("14")?.strength).toBe(14);
  });

  it("ignores empty, non-numeric, and out-of-range values", () => {
    expect(apply("")).toBeUndefined();
    expect(apply("abc")).toBeUndefined();
    expect(apply("7")).toBeUndefined();
    expect(apply("16")).toBeUndefined();
  });
});
