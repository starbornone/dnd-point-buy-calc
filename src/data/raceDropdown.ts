import {
  aarakocra,
  aasimar,
  changeling,
  dragonborn,
  dwarf,
  elf,
  genasi,
  gnome,
  goliath,
  halfElf,
  halfling,
  halfOrc,
  human,
  shifter,
  tiefling,
  warforged,
} from "./races";

export const raceDropdown = [
  { name: aarakocra.name, value: "aarakocra" },
  { name: aasimar.name, value: "aasimar" },
  { name: changeling.name, value: "changeling" },
  { name: dragonborn.name, value: "dragonborn" },
  { name: dwarf.name, value: "dwarf" },
  { name: elf.name, value: "elf" },
  { name: genasi.name, value: "genasi" },
  { name: gnome.name, value: "gnome" },
  { name: goliath.name, value: "goliath" },
  { name: halfElf.name, value: "halfElf" },
  { name: halfOrc.name, value: "halfOrc" },
  { name: halfling.name, value: "halfling" },
  { name: human.name, value: "human" },
  { name: shifter.name, value: "shifter" },
  { name: tiefling.name, value: "tiefling" },
  { name: warforged.name, value: "warforged" },
  { name: `Tabaxi — TODO —`, value: "tabaxi", disabled: true },
  { name: `Firbolg — TODO —`, value: "firbolg", disabled: true },
  { name: `Kobold — TODO —`, value: "kobold", disabled: true },
  { name: `Lizardfolk — TODO —`, value: "lizardfolk", disabled: true },
  { name: `Githyanki — TODO —`, value: "githyanki", disabled: true },
  { name: `Githzerai — TODO —`, value: "githzerai", disabled: true },
];
