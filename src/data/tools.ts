export const toolGroups = [
  {
    name: "Artisan's tools",
    tools: [
      "Alchemist's supplies",
      "Brewer's supplies",
      "Calligrapher's supplies",
      "Carpenter's tools",
      "Cartographer's tools",
      "Cobbler's tools",
      "Cook's utensils",
      "Glassblower's tools",
      "Jeweler's tools",
      "Leatherworker's tools",
      "Mason's tools",
      "Painter's supplies",
      "Potter's tools",
      "Smith's tools",
      "Tinker's tools",
      "Weaver's tools",
      "Woodcarver's tools",
    ],
  },
  {
    name: "Kits",
    tools: [
      "Disguise kit",
      "Forgery kit",
      "Herbalism kit",
      "Navigator's tools",
      "Poisoner's kit",
      "Thieves' tools",
    ],
  },
  {
    name: "Gaming sets",
    tools: ["Dice set", "Dragonchess set", "Playing card set", "Three-Dragon Ante set"],
  },
  {
    name: "Musical instruments",
    tools: [
      "Bagpipes",
      "Drum",
      "Dulcimer",
      "Flute",
      "Lute",
      "Lyre",
      "Horn",
      "Pan flute",
      "Shawm",
      "Viol",
    ],
  },
  {
    name: "Vehicles",
    tools: ["Vehicles (land)", "Vehicles (water)"],
  },
] as const;

export type ToolGroupName = (typeof toolGroups)[number]["name"];

export const tools = toolGroups.flatMap((group) => group.tools);

export type ToolName = (typeof tools)[number];

export const dwarfTools = ["Smith's tools", "Brewer's supplies", "Mason's tools"] as const;
