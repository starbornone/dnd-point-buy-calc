import { CantripName, wizardCantrips } from "@/data/cantrips";
import { DragonBreath, DragonDamage, DragonName, dragonByName, dragons } from "@/data/dragons";
import { languages, LanguageName } from "@/data/languages";
import { raceDropdown } from "@/data/raceDropdown";
import { skills } from "@/data/skills";
import { ToolGroupName, ToolName, toolGroups, tools } from "@/data/tools";
import { AttributeState } from "@/types";
import { Locale } from "./locale";

type SkillName = (typeof skills)[number];
type RaceKey = (typeof raceDropdown)[number]["value"];

const identity = <T extends string>(items: readonly T[]): Record<T, string> =>
  Object.fromEntries(items.map((item) => [item, item])) as unknown as Record<T, string>;

export const abilityNames: Record<Locale, Record<keyof AttributeState, string>> = {
  en: {
    strength: "Strength",
    dexterity: "Dexterity",
    constitution: "Constitution",
    intelligence: "Intelligence",
    wisdom: "Wisdom",
    charisma: "Charisma",
  },
  zh: {
    strength: "力量",
    dexterity: "敏捷",
    constitution: "体质",
    intelligence: "智力",
    wisdom: "感知",
    charisma: "魅力",
  },
  es: {
    strength: "Fuerza",
    dexterity: "Destreza",
    constitution: "Constitución",
    intelligence: "Inteligencia",
    wisdom: "Sabiduría",
    charisma: "Carisma",
  },
};

export const skillNames: Record<Locale, Record<SkillName, string>> = {
  en: identity(skills),
  zh: {
    Acrobatics: "特技",
    "Animal Handling": "驯兽",
    Arcana: "奥秘",
    Athletics: "运动",
    Deception: "欺瞒",
    History: "历史",
    Insight: "洞悉",
    Intimidation: "威吓",
    Investigation: "调查",
    Medicine: "医药",
    Nature: "自然",
    Perception: "察觉",
    Performance: "表演",
    Persuasion: "说服",
    Religion: "宗教",
    "Sleight of Hand": "巧手",
    Stealth: "隐匿",
    Survival: "生存",
  },
  es: {
    Acrobatics: "Acrobacias",
    "Animal Handling": "Trato con animales",
    Arcana: "Arcano",
    Athletics: "Atletismo",
    Deception: "Engaño",
    History: "Historia",
    Insight: "Perspicacia",
    Intimidation: "Intimidación",
    Investigation: "Investigación",
    Medicine: "Medicina",
    Nature: "Naturaleza",
    Perception: "Percepción",
    Performance: "Interpretación",
    Persuasion: "Persuasión",
    Religion: "Religión",
    "Sleight of Hand": "Juego de manos",
    Stealth: "Sigilo",
    Survival: "Supervivencia",
  },
};

export const raceNames: Record<Locale, Record<RaceKey, string>> = {
  en: {
    aarakocra: "Aarakocra",
    aasimar: "Aasimar",
    changeling: "Changeling",
    dragonborn: "Dragonborn",
    dwarf: "Dwarf",
    elf: "Elf",
    firbolg: "Firbolg",
    genasi: "Genasi",
    githyanki: "Githyanki",
    githzerai: "Githzerai",
    gnome: "Gnome",
    goliath: "Goliath",
    halfElf: "Half-Elf",
    halfOrc: "Half-Orc",
    halfling: "Halfling",
    human: "Human",
    kobold: "Kobold",
    lizardfolk: "Lizardfolk",
    shifter: "Shifter",
    tabaxi: "Tabaxi",
    tiefling: "Tiefling",
    warforged: "Warforged",
  },
  zh: {
    aarakocra: "阿兰寇拉",
    aasimar: "阿斯莫",
    changeling: "化形者",
    dragonborn: "龙裔",
    dwarf: "矮人",
    elf: "精灵",
    firbolg: "费尔博格",
    genasi: "元素裔",
    githyanki: "吉斯洋基",
    githzerai: "吉斯泽莱",
    gnome: "侏儒",
    goliath: "歌利亚",
    halfElf: "半精灵",
    halfOrc: "半兽人",
    halfling: "半身人",
    human: "人类",
    kobold: "狗头人",
    lizardfolk: "蜥蜴人",
    shifter: "化兽者",
    tabaxi: "塔巴希",
    tiefling: "提夫林",
    warforged: "战俑",
  },
  es: {
    aarakocra: "Aarakocra",
    aasimar: "Aasimar",
    changeling: "Cambiante",
    dragonborn: "Dracónido",
    dwarf: "Enano",
    elf: "Elfo",
    firbolg: "Firbolg",
    genasi: "Genasi",
    githyanki: "Githyanki",
    githzerai: "Githzerai",
    gnome: "Gnomo",
    goliath: "Goliat",
    halfElf: "Semielfo",
    halfOrc: "Semiorco",
    halfling: "Mediano",
    human: "Humano",
    kobold: "Kóbold",
    lizardfolk: "Hombre lagarto",
    shifter: "Shifter",
    tabaxi: "Tabaxi",
    tiefling: "Tiefling",
    warforged: "Warforged",
  },
};

const variantNames: Record<Locale, Record<string, string>> = {
  en: {},
  zh: {
    "Hill Dwarf": "丘陵矮人",
    "Mountain Dwarf": "山地矮人",
    "Dark Elf (Drow)": "卓尔",
    "High Elf": "高等精灵",
    "Wood Elf": "木精灵",
    Eladrin: "雅灵",
    "Forest Gnome": "森林侏儒",
    "Rock Gnome": "岩侏儒",
    "Lightfoot Halfling": "轻足半身人",
    "Stout Halfling": "强魂半身人",
    "Standard Human": "标准人类",
    "Variant Human": "变体人类",
    "Air Genasi": "气元素裔",
    "Earth Genasi": "土元素裔",
    "Fire Genasi": "火元素裔",
    "Water Genasi": "水元素裔",
    Protector: "守护者",
    Scourge: "天谴者",
    Fallen: "堕化者",
    Beasthide: "兽皮",
    Longtooth: "长牙",
    Swiftstride: "迅步",
    Wildhunt: "野猎",
  },
  es: {
    "Hill Dwarf": "Enano de las colinas",
    "Mountain Dwarf": "Enano de las montañas",
    "Dark Elf (Drow)": "Elfo oscuro (drow)",
    "High Elf": "Alto elfo",
    "Wood Elf": "Elfo de los bosques",
    "Forest Gnome": "Gnomo de los bosques",
    "Rock Gnome": "Gnomo de las rocas",
    "Lightfoot Halfling": "Mediano piesligeros",
    "Stout Halfling": "Mediano fornido",
    "Standard Human": "Humano estándar",
    "Variant Human": "Humano variante",
    "Air Genasi": "Genasi del aire",
    "Earth Genasi": "Genasi de la tierra",
    "Fire Genasi": "Genasi del fuego",
    "Water Genasi": "Genasi del agua",
    Fallen: "Caído",
  },
};

const englishLanguages = Object.fromEntries(
  languages.map((language) => [language, language])
) as Record<LanguageName, string>;

export const languageNames: Record<Locale, Record<LanguageName, string>> = {
  en: englishLanguages,
  zh: {
    Common: "通用语",
    Dwarvish: "矮人语",
    Elvish: "精灵语",
    Giant: "巨人语",
    Gnomish: "侏儒语",
    Goblin: "地精语",
    Halfling: "半身人语",
    Orc: "兽人语",
    Abyssal: "深渊语",
    Celestial: "天界语",
    Draconic: "龙语",
    "Deep Speech": "深潜语",
    Infernal: "炼狱语",
    Primordial: "原初语",
    Sylvan: "木族语",
    Undercommon: "地底通用语",
  },
  es: {
    Common: "Común",
    Dwarvish: "Enano",
    Elvish: "Élfico",
    Giant: "Gigante",
    Gnomish: "Gnómico",
    Goblin: "Goblin",
    Halfling: "Mediano",
    Orc: "Orco",
    Abyssal: "Abisal",
    Celestial: "Celestial",
    Draconic: "Dracónico",
    "Deep Speech": "Habla profunda",
    Infernal: "Infernal",
    Primordial: "Primordial",
    Sylvan: "Silvano",
    Undercommon: "Infracomún",
  },
};

export const toolNames: Record<Locale, Record<ToolName, string>> = {
  en: identity(tools),
  zh: {
    "Alchemist's supplies": "炼金术士工具",
    "Brewer's supplies": "酿酒师工具",
    "Calligrapher's supplies": "书法家工具",
    "Carpenter's tools": "木匠工具",
    "Cartographer's tools": "制图师工具",
    "Cobbler's tools": "鞋匠工具",
    "Cook's utensils": "厨师工具",
    "Glassblower's tools": "玻璃匠工具",
    "Jeweler's tools": "珠宝匠工具",
    "Leatherworker's tools": "皮匠工具",
    "Mason's tools": "石匠工具",
    "Painter's supplies": "画家工具",
    "Potter's tools": "陶匠工具",
    "Smith's tools": "铁匠工具",
    "Tinker's tools": "修补匠工具",
    "Weaver's tools": "织布匠工具",
    "Woodcarver's tools": "木雕匠工具",
    "Disguise kit": "易容工具",
    "Forgery kit": "文书伪造工具",
    "Herbalism kit": "草药师工具",
    "Navigator's tools": "领航员工具",
    "Poisoner's kit": "制毒师工具",
    "Thieves' tools": "盗贼工具",
    "Dice set": "骰子",
    "Dragonchess set": "龙棋",
    "Playing card set": "纸牌",
    "Three-Dragon Ante set": "三龙牌",
    Bagpipes: "风笛",
    Drum: "鼓",
    Dulcimer: "扬琴",
    Flute: "长笛",
    Lute: "鲁特琴",
    Lyre: "里拉琴",
    Horn: "号角",
    "Pan flute": "排箫",
    Shawm: "肖姆管",
    Viol: "维奥尔琴",
    "Vehicles (land)": "陆上载具",
    "Vehicles (water)": "水上载具",
  },
  es: {
    "Alchemist's supplies": "Suministros de alquimista",
    "Brewer's supplies": "Suministros de cervecero",
    "Calligrapher's supplies": "Suministros de calígrafo",
    "Carpenter's tools": "Herramientas de carpintero",
    "Cartographer's tools": "Herramientas de cartógrafo",
    "Cobbler's tools": "Herramientas de zapatero",
    "Cook's utensils": "Utensilios de cocinero",
    "Glassblower's tools": "Herramientas de soplador de vidrio",
    "Jeweler's tools": "Herramientas de joyero",
    "Leatherworker's tools": "Herramientas de peletero",
    "Mason's tools": "Herramientas de albañil",
    "Painter's supplies": "Suministros de pintor",
    "Potter's tools": "Herramientas de alfarero",
    "Smith's tools": "Herramientas de herrero",
    "Tinker's tools": "Herramientas de hojalatero",
    "Weaver's tools": "Herramientas de tejedor",
    "Woodcarver's tools": "Herramientas de tallista",
    "Disguise kit": "Kit de disfraz",
    "Forgery kit": "Kit de falsificación",
    "Herbalism kit": "Kit de herboristería",
    "Navigator's tools": "Herramientas de navegante",
    "Poisoner's kit": "Kit de envenenador",
    "Thieves' tools": "Herramientas de ladrón",
    "Dice set": "Juego de dados",
    "Dragonchess set": "Ajedrez de dragones",
    "Playing card set": "Baraja",
    "Three-Dragon Ante set": "Ante de tres dragones",
    Bagpipes: "Gaita",
    Drum: "Tambor",
    Dulcimer: "Dulcémele",
    Flute: "Flauta",
    Lute: "Laúd",
    Lyre: "Lira",
    Horn: "Cuerno",
    "Pan flute": "Flauta de pan",
    Shawm: "Chirimía",
    Viol: "Viola",
    "Vehicles (land)": "Vehículos terrestres",
    "Vehicles (water)": "Vehículos acuáticos",
  },
};

const toolGroupNames: Record<Locale, Record<ToolGroupName, string>> = {
  en: identity(toolGroups.map((group) => group.name)),
  zh: {
    "Artisan's tools": "工匠工具",
    Kits: "工具套组",
    "Gaming sets": "赌具",
    "Musical instruments": "乐器",
    Vehicles: "载具",
  },
  es: {
    "Artisan's tools": "Herramientas de artesano",
    Kits: "Equipos",
    "Gaming sets": "Juegos",
    "Musical instruments": "Instrumentos musicales",
    Vehicles: "Vehículos",
  },
};

export const cantripNames: Record<Locale, Record<CantripName, string>> = {
  en: identity(wizardCantrips),
  zh: {
    "Acid Splash": "酸液飞溅",
    "Blade Ward": "剑刃防护",
    "Chill Touch": "冻寒之触",
    "Dancing Lights": "舞光术",
    "Fire Bolt": "火焰箭",
    Friends: "交友术",
    Light: "光亮术",
    "Mage Hand": "法师之手",
    Mending: "修复术",
    Message: "传讯术",
    "Minor Illusion": "次级幻影",
    "Poison Spray": "毒气喷溅",
    Prestidigitation: "魔法伎俩",
    "Ray of Frost": "冷冻射线",
    "Shocking Grasp": "电爪",
    "True Strike": "克敌先机",
  },
  es: {
    "Acid Splash": "Salpicadura de ácido",
    "Blade Ward": "Protección contra armas",
    "Chill Touch": "Toque gélido",
    "Dancing Lights": "Luces danzantes",
    "Fire Bolt": "Rayo de fuego",
    Friends: "Amigos",
    Light: "Luz",
    "Mage Hand": "Mano de mago",
    Mending: "Remendar",
    Message: "Mensaje",
    "Minor Illusion": "Ilusión menor",
    "Poison Spray": "Rocío de veneno",
    Prestidigitation: "Prestidigitación",
    "Ray of Frost": "Rayo de escarcha",
    "Shocking Grasp": "Toque electrizante",
    "True Strike": "Golpe certero",
  },
};

export const dragonNames: Record<Locale, Record<DragonName, string>> = {
  en: identity(dragons.map((dragon) => dragon.name)),
  zh: {
    Black: "黑龙",
    Blue: "蓝龙",
    Brass: "黄铜龙",
    Bronze: "青铜龙",
    Copper: "赤铜龙",
    Gold: "金龙",
    Green: "绿龙",
    Red: "红龙",
    Silver: "银龙",
    White: "白龙",
  },
  es: {
    Black: "Negro",
    Blue: "Azul",
    Brass: "Latón",
    Bronze: "Bronce",
    Copper: "Cobre",
    Gold: "Oro",
    Green: "Verde",
    Red: "Rojo",
    Silver: "Plata",
    White: "Blanco",
  },
};

const damageNames: Record<Locale, Record<DragonDamage, string>> = {
  en: { acid: "Acid", lightning: "Lightning", fire: "Fire", poison: "Poison", cold: "Cold" },
  zh: { acid: "强酸", lightning: "闪电", fire: "火焰", poison: "毒素", cold: "寒冷" },
  es: { acid: "Ácido", lightning: "Relámpago", fire: "Fuego", poison: "Veneno", cold: "Frío" },
};

const breathNames: Record<Locale, Record<DragonBreath, string>> = {
  en: { line: "5 by 30 ft. line", cone: "15 ft. cone" },
  zh: { line: "5 尺宽、30 尺长的直线", cone: "15 尺锥形" },
  es: { line: "línea de 5 × 30 pies", cone: "cono de 15 pies" },
};

export const abilityLabel = (locale: Locale, key: keyof AttributeState): string =>
  abilityNames[locale][key];

export const skillLabel = (locale: Locale, skill: string): string =>
  skillNames[locale][skill as SkillName] ?? skill;

export const languageLabel = (locale: Locale, language: string): string =>
  languageNames[locale][language as LanguageName] ?? language;

export const toolLabel = (locale: Locale, tool: string): string =>
  toolNames[locale][tool as ToolName] ?? tool;

export const toolGroupLabel = (locale: Locale, group: string): string =>
  toolGroupNames[locale][group as ToolGroupName] ?? group;

const extraCantripNames: Record<Locale, Record<string, string>> = {
  en: {
    "Produce Flame": "Produce Flame",
    "Shape Water": "Shape Water",
    Thaumaturgy: "Thaumaturgy",
  },
  zh: {
    "Produce Flame": "燃火术",
    "Shape Water": "塑水术",
    Thaumaturgy: "奇术",
  },
  es: {
    "Produce Flame": "Producir llama",
    "Shape Water": "Moldear agua",
    Thaumaturgy: "Taumaturgia",
  },
};

export const cantripLabel = (locale: Locale, cantrip: string): string =>
  cantripNames[locale][cantrip as CantripName] ?? extraCantripNames[locale][cantrip] ?? cantrip;

export const ancestryLabel = (locale: Locale, name: string): string => {
  const dragon = dragonByName(name);
  if (!dragon) return name;
  const damage = damageNames[locale][dragon.damage];
  const breath = breathNames[locale][dragon.breath];
  return `${dragonNames[locale][dragon.name]} — ${damage}, ${breath} (${abilityLabel(locale, dragon.save)})`;
};

export const raceLabel = (locale: Locale, key: string): string =>
  raceNames[locale][key as RaceKey] ?? raceNames.en[key as RaceKey] ?? key;

export const variantLabel = (locale: Locale, name: string): string =>
  variantNames[locale][name] ?? name;
