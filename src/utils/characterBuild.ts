import { attributeKeys, attributeLabels } from "@/data/attributeNames";
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
}

export const defaultBuild = (): CharacterBuild => ({
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
});

const isAbility = (value: string): value is keyof AttributeState =>
  value in attributeLabels;

export const serializeBuild = (build: CharacterBuild): string => {
  const params = new URLSearchParams();
  if (build.race) params.set("race", build.race);
  if (build.variant) params.set("variant", build.variant);

  for (const key of attributeKeys) {
    const score = build.attributes[key];
    if (score !== MIN_ABILITY_SCORE) {
      params.set(SCORE_PARAMS[key], String(score));
    }
  }

  const picks = build.bonuses.filter((pick): pick is keyof AttributeState =>
    Boolean(pick)
  );
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
  if (build.budget !== POINT_BUY_BUDGET) {
    params.set("budget", String(build.budget));
  }

  return params.toString();
};

export const parseBuild = (search: string): CharacterBuild | null => {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
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
  if (!tracked.some((key) => params.has(key))) return null;

  const requestedRace = params.get("race") ?? "";
  const race = Object.hasOwn(raceData, requestedRace) ? requestedRace : "";
  const requestedVariant = params.get("variant") ?? "";
  const variant =
    race &&
    raceData[race].variants?.some((entry) => entry.name === requestedVariant)
      ? requestedVariant
      : "";

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

  let budget = POINT_BUY_BUDGET;
  if (params.has("budget")) {
    const value = Number.parseInt(params.get("budget") ?? "", 10);
    if (
      Number.isInteger(value) &&
      value >= MIN_POINT_BUDGET &&
      value <= MAX_POINT_BUDGET
    ) {
      budget = value;
    }
  }

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
  total: number;
  modifier: string;
}

export interface BuildFile {
  version: 1;
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

export const toBuildFile = (build: CharacterBuild): BuildFile => {
  const race = raceData[build.race];
  const variant = race?.variants?.find((entry) => entry.name === build.variant);
  const racial = calculateRacialBonuses({
    fixedBonuses: getFixedBonuses(build.race, build.variant),
    floatingBonus: resolveFloatingBonus(race, variant),
    selectedBonuses: build.bonuses,
  });
  const featBonus = calculateFeatBonus(build.feat, build.featAbility);

  const abilities = attributeKeys.map((key) => {
    const score = build.attributes[key];
    const cost = calculatePointCost(score);
    const total = score + racial[key] + featBonus[key];
    return {
      key,
      name: attributeLabels[key],
      score,
      cost,
      racial: racial[key],
      feat: featBonus[key],
      total,
      modifier: calculateModifier(total),
    };
  });

  const pointCost = abilities.every((ability) => !Number.isNaN(ability.cost))
    ? abilities.reduce((sum, ability) => sum + ability.cost, 0)
    : Number.NaN;

  return {
    version: 1,
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
  const slug = [race?.name, build.variant]
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
  if (!isRecord(value) || value.version !== 1 || !isRecord(value.attributes)) {
    return null;
  }

  const params = new URLSearchParams();
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
