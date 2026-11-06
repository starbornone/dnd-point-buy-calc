import { raceData } from "@/data/raceData";
import { describe, expect, it } from "vitest";
import {
  resolveGrantedCantrips,
  resolveGrantedSkills,
  resolveGrantedTools,
} from "./grantedProficiencies";

const variant = (raceKey: string, name: string) =>
  raceData[raceKey].variants?.find((entry) => entry.name === name);

describe("granted proficiencies", () => {
  it("keeps an elf's Perception on every subrace", () => {
    expect(resolveGrantedSkills(raceData.elf, variant("elf", "High Elf"))).toEqual([
      "Perception",
    ]);
    expect(resolveGrantedSkills(raceData.elf, variant("elf", "Wood Elf"))).toEqual([
      "Perception",
    ]);
  });

  it("uses the subrace skill for a shifter", () => {
    expect(resolveGrantedSkills(raceData.shifter, variant("shifter", "Beasthide"))).toEqual([
      "Athletics",
    ]);
    expect(resolveGrantedSkills(raceData.shifter, variant("shifter", "Longtooth"))).toEqual([
      "Intimidation",
    ]);
  });

  it("lists both tabaxi skills and the rock gnome's tool", () => {
    expect(resolveGrantedSkills(raceData.tabaxi, undefined)).toEqual([
      "Acrobatics",
      "Stealth",
    ]);
    expect(resolveGrantedTools(raceData.gnome, variant("gnome", "Rock Gnome"))).toEqual([
      "Tinker's tools",
    ]);
    expect(resolveGrantedTools(raceData.gnome, variant("gnome", "Forest Gnome"))).toEqual([]);
  });

  it("keeps a fixed cantrip on the subrace that knows it", () => {
    expect(resolveGrantedCantrips(raceData.elf, variant("elf", "Dark Elf (Drow)"))).toEqual([
      "Dancing Lights",
    ]);
    expect(resolveGrantedCantrips(raceData.elf, variant("elf", "High Elf"))).toEqual([]);
    expect(resolveGrantedCantrips(raceData.aasimar, variant("aasimar", "Protector"))).toEqual([
      "Light",
    ]);
    expect(resolveGrantedCantrips(raceData.gnome, variant("gnome", "Forest Gnome"))).toEqual([
      "Minor Illusion",
    ]);
    expect(resolveGrantedCantrips(raceData.genasi, variant("genasi", "Fire Genasi"))).toEqual([
      "Produce Flame",
    ]);
    expect(resolveGrantedCantrips(raceData.genasi, variant("genasi", "Air Genasi"))).toEqual([]);
    expect(resolveGrantedCantrips(raceData.tiefling, undefined)).toEqual(["Thaumaturgy"]);
    expect(resolveGrantedCantrips(raceData.githzerai, undefined)).toEqual(["Mage Hand"]);
  });
});