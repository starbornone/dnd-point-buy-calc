import { attributeKeys, attributeLabels } from "@/data/attributeNames";
import { emptyBonuses } from "@/data/bonuses";
import { feats } from "@/data/feats";
import { raceData } from "@/data/raceData";
import { AttributeState, BonusPicks } from "@/types";
import { calculateModifier } from "./calculateModifier";
import {
  calculatePointCost,
  MAX_ABILITY_SCORE,
  MAX_POINT_BUDGET,
  MIN_ABILITY_SCORE,
  MIN_POINT_BUDGET,
  POINT_BUY_BUDGET,
} from "./calculatePointCost";
import { grantedFeatAbility, calculateFeatBonus, featNeedsChoice } from "./calculateFeatBonus";
import { calculateRacialBonuses, resolveFloatingBonus } from "./calculateRacialBonuses";
import { getFixedBonuses } from "./getModifiers";
import {
  emptyLanguagePicks,
  LanguagePicks,
  resolveLanguageChoice,
  selectLanguages,
} from "./languageChoice";
import { resolveCantripChoice, selectCantrip } from "./cantripChoice";
import { selectDragon } from "./draconicAncestry";
import {
  resolveGrantedCantrips,
  resolveGrantedSkills,
  resolveGrantedTools,
} from "./grantedProficiencies";
import { emptySkillPicks, resolveSkillChoice, selectSkills, SkillPicks } from "./skillChoice";
import { resolveToolChoice, selectTool } from "./toolChoice";
import { calculateBackgroundBonuses, emptyOrigin2024, selectOrigin2024, type Origin2024, type RulesEdition } from "./origin2024";

const SCORE_PARAMS: Record<keyof AttributeState, string> = {
  strength: "str",
  dexterity: "dex",
  constitution: "con",
  intelligence: "int",
  wisdom: "wis",
  charisma: "cha",
};

export const defaultAttributes = (): AttributeState => ({
  strength: MIN_ABILITY_SCORE,
  dexterity: MIN_ABILITY_SCORE,
  constitution: MIN_ABILITY_SCORE,
  intelligence: MIN_ABILITY_SCORE,
  wisdom: MIN_ABILITY_SCORE,
  charisma: MIN_ABILITY_SCORE,
});

export const emptyBonusPicks = (): BonusPicks => [undefined, undefined];

export interface CharacterBuild {
  race: string;
  variant: string;
  attributes: AttributeState;
  bonuses: BonusPicks;
  skills: SkillPicks;
  languages: LanguagePicks;
  tool: string;
  cantrip: string;
  dragon: string;
  feat: string;
  featAbility: keyof AttributeState | "";
  budget: number;
  origin2024?: Origin2024;
}

export const defaultBuild = (edition: RulesEdition = "2014"): CharacterBuild => ({
  race: "",
  variant: "",
  attributes: defaultAttributes(),
  bonuses: emptyBonusPicks(),
  skills: emptySkillPicks(),
  languages: emptyLanguagePicks(),
  tool: "",
  cantrip: "",
  dragon: "",
  feat: "",
  featAbility: "",
  budget: POINT_BUY_BUDGET,
  ...(edition === "2024" ? { origin2024: emptyOrigin2024() } : {}),
});

const isAbility = (value: string): value is keyof AttributeState =>
  value in attributeLabels;

const writeOriginParams = (params: URLSearchParams, origin: Origin2024) => {
  params.set("rules", "2024");
  if (origin.species) params.set("species", origin.species);
  if (origin.lineage) params.set("lineage", origin.lineage);
  if (origin.background) params.set("background", origin.background);
  if (origin.spread) params.set("spread", "1");
  if (origin.plusTwo) params.set("plusTwo", origin.plusTwo);
  if (origin.plusOne) params.set("plusOne", origin.plusOne);
  if (origin.humanFeat) params.set("humanFeat", origin.humanFeat);
};

export const serializeBuild = (build: CharacterBuild): string => {
  const params = new URLSearchParams();
  if (build.origin2024) {
    writeOriginParams(params, build.origin2024);
  } else {
    if (build.race) params.set("race", build.race);
    if (build.variant) params.set("variant", build.variant);
  }

  for (const key of attributeKeys) {
    const score = build.attributes[key];
    if (score !== MIN_ABILITY_SCORE) {
      params.set(SCORE_PARAMS[key], String(score));
    }
  }

  if (!build.origin2024) {
    const picks = build.bonuses.filter(Boolean);
    if (picks.length > 0) params.set("bonus", picks.join(","));
    const chosenSkills = build.skills.filter(Boolean);
    if (chosenSkills.length > 0) params.set("skill", chosenSkills.join(","));
    const chosenLanguages = build.languages.filter(Boolean);
    if (chosenLanguages.length > 0) params.set("tongue", chosenLanguages.join(","));
    if (build.tool) params.set("tool", build.tool);
    if (build.cantrip) params.set("cantrip", build.cantrip);
    if (build.dragon) params.set("dragon", build.dragon);
    if (build.feat) params.set("feat", build.feat);
    if (build.featAbility && featNeedsChoice(build.feat)) {
      params.set("asi", build.featAbility);
    }
  }
  if (build.budget !== POINT_BUY_BUDGET) {
    params.set("budget", String(build.budget));
  }

  return params.toString() || "rules=2014";
};

export const parseBuild = (search: string): CharacterBuild | null => {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const edition = params.get("rules");
  const tracked = [
    "race",
    "variant",
    "bonus",
    "skill",
    "tongue",
    "tool",
    "cantrip",
    "dragon",
    "feat",
    "asi",
    "budget",
    ...Object.values(SCORE_PARAMS),
  ];
  if (edition !== "2024" && edition !== "2014" && !tracked.some((key) => params.has(key))) return null;

  const attributes = defaultAttributes();
  for (const key of attributeKeys) {
    const raw = params.get(SCORE_PARAMS[key]);
    if (raw === null) continue;
    const value = Number.parseInt(raw, 10);
    if (
      Number.isInteger(value) &&
      value >= MIN_ABILITY_SCORE &&
      value <= MAX_ABILITY_SCORE
    ) {
      attributes[key] = value;
    }
  }

  const requestedBudget = Number.parseInt(params.get("budget") ?? "", 10);
  const budget = requestedBudget >= MIN_POINT_BUDGET && requestedBudget <= MAX_POINT_BUDGET
    ? requestedBudget
    : POINT_BUY_BUDGET;

  if (edition === "2024") {
    return {
      ...defaultBuild(),
      attributes,
      budget,
      origin2024: selectOrigin2024({
        species: params.get("species"),
        lineage: params.get("lineage"),
        background: params.get("background"),
        spread: params.get("spread") === "1",
        plusTwo: params.get("plusTwo"),
        plusOne: params.get("plusOne"),
        humanFeat: params.get("humanFeat"),
      }),
    };
  }

  const requestedRace = params.get("race") ?? "";
  const race = Object.hasOwn(raceData, requestedRace) ? requestedRace : "";
  const requestedVariant = params.get("variant") ?? "";
  const variant =
    race &&
    raceData[race].variants?.some((entry) => entry.name === requestedVariant)
      ? requestedVariant
      : "";

  const bonuses = emptyBonusPicks();
  const bonusParts = (params.get("bonus") ?? "")
    .split(",")
    .filter(isAbility)
    .slice(0, 2);
  bonusParts.forEach((pick, index) => {
    bonuses[index] = pick;
  });

  const raceRecord = race ? raceData[race] : undefined;
  const variantRecord = raceRecord?.variants?.find((entry) => entry.name === variant);
  const chosenSkills = selectSkills(
    resolveSkillChoice(raceRecord, variantRecord),
    (params.get("skill") ?? "").split(",").filter(Boolean)
  );
  const chosenLanguages = selectLanguages(
    resolveLanguageChoice(raceRecord, variantRecord),
    (params.get("tongue") ?? "").split(",").filter(Boolean)
  );
  const tool = selectTool(resolveToolChoice(raceRecord, variantRecord), params.get("tool") ?? "");
  const cantrip = selectCantrip(
    resolveCantripChoice(raceRecord, variantRecord),
    params.get("cantrip") ?? ""
  );
  const dragon = selectDragon(raceRecord, params.get("dragon") ?? "");
  const requestedFeat = params.get("feat") ?? "";
  const variantHuman = variant === "Variant Human";
  const feat =
    variantHuman && feats.includes(requestedFeat as (typeof feats)[number])
      ? requestedFeat
      : "";
  const featAbility = grantedFeatAbility(feat, params.get("asi") ?? "");

  return {
    race,
    variant,
    attributes,
    bonuses,
    skills: chosenSkills,
    languages: chosenLanguages,
    tool,
    cantrip,
    dragon,
    feat,
    featAbility,
    budget,
  };
};

export interface AbilityExport {
  key: keyof AttributeState;
  name: string;
  score: number;
  cost: number;
  racial: number;
  feat: number;
  background?: number;
  total: number;
  modifier: string;
}

export interface BuildFile {
  version: 1 | 2;
  origin2024?: Origin2024;
  race: string;
  variant: string;
  attributes: AttributeState;
  bonuses: (keyof AttributeState)[];
  skill: string;
  languages: string;
  tool: string;
  cantrip: string;
  dragon: string;
  feat: string;
  featAbility: keyof AttributeState | "";
  budget: number;
  grantedSkills: string[];
  grantedTools: string[];
  grantedCantrips: string[];
  abilities: AbilityExport[];
  pointCost: number;
  pointsRemaining: number | null;
}

export const toBuildFile = (current: CharacterBuild): BuildFile => {
  const { origin2024 } = current;
  const build = origin2024 ? { ...defaultBuild(), attributes: current.attributes, budget: current.budget } : current;
  const race = raceData[build.race];
  const variant = race?.variants?.find((entry) => entry.name === build.variant);
  const racial = origin2024 ? emptyBonuses() : calculateRacialBonuses({
    fixedBonuses: getFixedBonuses(build.race, build.variant),
    floatingBonus: resolveFloatingBonus(race, variant),
    selectedBonuses: build.bonuses,
  });
  const featBonus = calculateFeatBonus(build.feat, build.featAbility);
  const background = origin2024 ? calculateBackgroundBonuses(origin2024) : undefined;

  const abilities = attributeKeys.map((key) => {
    const score = build.attributes[key];
    const cost = calculatePointCost(score);
    const total = score + racial[key] + featBonus[key] + (background?.[key] ?? 0);
    return {
      key,
      name: attributeLabels[key],
      score,
      cost,
      racial: racial[key],
      feat: featBonus[key],
      ...(background ? { background: background[key] } : {}),
      total,
      modifier: calculateModifier(total),
    };
  });

  const pointCost = abilities.every((ability) => !Number.isNaN(ability.cost))
    ? abilities.reduce((sum, ability) => sum + ability.cost, 0)
    : Number.NaN;

  return {
    version: origin2024 ? 2 : 1,
    ...(origin2024 ? { origin2024 } : {}),
    race: build.race,
    variant: build.variant,
    attributes: build.attributes,
    bonuses: build.bonuses.filter((pick): pick is keyof AttributeState => Boolean(pick)),
    skill: build.skills.filter(Boolean).join(","),
    languages: build.languages.filter(Boolean).join(","),
    tool: build.tool,
    cantrip: build.cantrip,
    dragon: build.dragon,
    feat: build.feat,
    grantedSkills: resolveGrantedSkills(race, variant),
    grantedTools: resolveGrantedTools(race, variant),
    grantedCantrips: resolveGrantedCantrips(race, variant),
    featAbility: grantedFeatAbility(build.feat, build.featAbility),
    budget: build.budget,
    abilities,
    pointCost,
    pointsRemaining: Number.isNaN(pointCost) ? null : build.budget - pointCost,
  };
};

export const buildFileName = (build: CharacterBuild): string => {
  const race = raceData[build.race];
  const names = build.origin2024 ? [build.origin2024.species, build.origin2024.background] : [race?.name, build.variant];
  const slug = names
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "character"}.json`;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const fromBuildFile = (value: unknown): CharacterBuild | null => {
  if (!isRecord(value) || !isRecord(value.attributes) || (value.version !== 1 && value.version !== 2)) {
    return null;
  }

  const params = new URLSearchParams();
  if (value.version === 2) {
    if (!isRecord(value.origin2024)) return null;
    writeOriginParams(params, selectOrigin2024(value.origin2024));
  }
  if (typeof value.race === "string" && value.race) params.set("race", value.race);
  if (typeof value.variant === "string" && value.variant) {
    params.set("variant", value.variant);
  }
  for (const key of attributeKeys) {
    const score = value.attributes[key];
    if (typeof score === "number") params.set(SCORE_PARAMS[key], String(score));
  }
  if (Array.isArray(value.bonuses)) {
    const picks = value.bonuses.filter(
      (pick): pick is string => typeof pick === "string"
    );
    if (picks.length > 0) params.set("bonus", picks.join(","));
  }
  if (typeof value.skill === "string" && value.skill) params.set("skill", value.skill);
  if (typeof value.languages === "string" && value.languages) {
    params.set("tongue", value.languages);
  }
  if (typeof value.tool === "string" && value.tool) params.set("tool", value.tool);
  if (typeof value.cantrip === "string" && value.cantrip) params.set("cantrip", value.cantrip);
  if (typeof value.dragon === "string" && value.dragon) params.set("dragon", value.dragon);
  if (typeof value.feat === "string" && value.feat) params.set("feat", value.feat);
  if (typeof value.featAbility === "string" && value.featAbility) {
    params.set("asi", value.featAbility);
  }
  if (typeof value.budget === "number") params.set("budget", String(value.budget));

  return parseBuild(params.toString()) ?? defaultBuild();
};
