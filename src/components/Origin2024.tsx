"use client";

import { NativeSelect } from "@/components/ui/native-select";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { backgrounds2024, species2024 } from "@/data/origins2024";
import { abilityLabel, ancestryLabel, featLabel, raceLabel, skillLabel, variantLabel } from "@/i18n/names";
import type { Locale } from "@/i18n/locale";
import { getBackground2024, getSpecies2024, humanFeatOptions, selectOrigin2024, type Origin2024 } from "@/utils/origin2024";
import { SetupChecklist } from "./SetupChecklist";

const backgroundsZh: Record<string, string> = {
  Acolyte: "侍僧", Artisan: "工匠", Charlatan: "骗子", Criminal: "罪犯", Entertainer: "艺人",
  Farmer: "农夫", Guard: "守卫", Guide: "向导", Hermit: "隐士", Merchant: "商人", Noble: "贵族",
  Sage: "智者", Sailor: "水手", Scribe: "抄写员", Soldier: "士兵", Wayfarer: "旅人",
};

const lineagesZh: Record<string, string> = {
  Drow: "卓尔精灵", Cloud: "云巨人", Fire: "火巨人", Frost: "霜巨人", Hill: "丘陵巨人",
  Stone: "石巨人", Storm: "风暴巨人", Abyssal: "深渊", Chthonic: "冥界", Infernal: "炼狱",
};

const originFeatsZh: Record<string, string> = {
  Crafter: "工匠", Musician: "音乐家", "Magic Initiate (Cleric)": "魔法学徒（牧师）",
  "Magic Initiate (Druid)": "魔法学徒（德鲁伊）", "Magic Initiate (Wizard)": "魔法学徒（法师）",
};

const backgroundLabel = (locale: Locale, name: string) => locale === "zh" ? backgroundsZh[name] ?? name : name;
const speciesLabel = (locale: Locale, name: string) => name === "orc" ? (locale === "zh" ? "兽人" : "Orc") : raceLabel(locale, name);
const originFeatLabel = (locale: Locale, name: string) => locale === "zh" ? originFeatsZh[name] ?? featLabel(locale, name) : name;
const lineageLabel = (locale: Locale, species: string, name: string) => {
  if (species === "dragonborn") return ancestryLabel(locale, name);
  return locale === "zh" ? lineagesZh[name] ?? variantLabel(locale, name) : name;
};

const OriginSelect = ({ id, label, value, onChange, options, placeholder }: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
}) => (
  <div className="min-w-0">
    <label htmlFor={id} className="mb-2 block">{label}</label>
    <NativeSelect id={id} value={value} onChange={(event) => onChange(event.target.value)}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </NativeSelect>
  </div>
);

export const Origin2024Options = () => {
  const { locale } = useLocale();
  const copy = useMessages();
  const { origin2024: origin, setOrigin2024 } = useRace();
  const background = getBackground2024(origin.background);
  const lineages = getSpecies2024(origin.species)?.lineages ?? [];
  const human = origin.species === "human";
  const lineageName = origin.species === "dragonborn" ? copy.draconicAncestry : copy.speciesLineage;
  const update = (changes: Partial<Record<keyof Origin2024, unknown>>) => {
    setOrigin2024((current) => selectOrigin2024({ ...current, ...changes }));
  };
  const missing = [
    { id: "species-2024", label: copy.selectSpecies, missing: !origin.species },
    { id: "lineage-2024", label: lineageName, missing: lineages.length > 0 && !origin.lineage },
    { id: "background-2024", label: copy.selectBackground, missing: !background },
    { id: "background-plus-two", label: copy.backgroundPlusTwo, missing: background && !origin.spread && !origin.plusTwo },
    { id: "background-plus-one", label: copy.backgroundPlusOne, missing: background && !origin.spread && !origin.plusOne },
    { id: "human-origin-feat", label: copy.humanOriginFeat, missing: human && !origin.humanFeat },
  ].filter(({ missing }) => missing);

  return (
    <>
      <SetupChecklist choices={missing} />
      <OriginSelect id="species-2024" label={copy.species} placeholder={copy.selectSpecies} value={origin.species}
        options={Object.keys(species2024).map((value) => ({ value, label: speciesLabel(locale, value) }))}
        onChange={(species) => update({ species, lineage: "", humanFeat: "" })} />
      {lineages.length > 0 && (
        <OriginSelect id="lineage-2024" label={lineageName} placeholder={copy.selectLineage} value={origin.lineage}
          options={lineages.map((value) => ({ value, label: lineageLabel(locale, origin.species, value) }))}
          onChange={(lineage) => update({ lineage })} />
      )}
      <OriginSelect id="background-2024" label={copy.background} placeholder={copy.selectBackground} value={origin.background}
        options={Object.keys(backgrounds2024).map((value) => ({ value, label: backgroundLabel(locale, value) }))}
        onChange={(background) => update({ background, spread: false, plusTwo: "", plusOne: "" })} />
      {background && (
        <fieldset className="col-span-full min-w-0 space-y-2 rounded-md border border-border p-2.5 text-sm">
          <legend className="px-1 font-semibold text-primary">{copy.backgroundBonuses}</legend>
          <p className="text-muted-foreground">
            {background.abilities.map((ability) => abilityLabel(locale, ability)).join(locale === "zh" ? "、" : ", ")}
          </p>
          <OriginSelect id="background-distribution" label={copy.backgroundDistribution} value={origin.spread ? "spread" : "split"}
            options={[{ value: "split", label: copy.backgroundSplit }, { value: "spread", label: copy.backgroundSpread }]}
            onChange={(value) => update({ spread: value === "spread" })} />
          {!origin.spread && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,9rem),1fr))] gap-2">
              <OriginSelect id="background-plus-two" label={copy.backgroundPlusTwo} placeholder={copy.backgroundSelectAbility} value={origin.plusTwo}
                options={background.abilities.filter((value) => value !== origin.plusOne).map((value) => ({ value, label: abilityLabel(locale, value) }))}
                onChange={(plusTwo) => update({ plusTwo })} />
              <OriginSelect id="background-plus-one" label={copy.backgroundPlusOne} placeholder={copy.backgroundSelectAbility} value={origin.plusOne}
                options={background.abilities.filter((value) => value !== origin.plusTwo).map((value) => ({ value, label: abilityLabel(locale, value) }))}
                onChange={(plusOne) => update({ plusOne })} />
            </div>
          )}
        </fieldset>
      )}
      {human && (
        <OriginSelect id="human-origin-feat" label={copy.humanOriginFeat} placeholder={copy.selectFeat} value={origin.humanFeat}
          options={humanFeatOptions(origin.background).map((value) => ({ value, label: originFeatLabel(locale, value) }))}
          onChange={(humanFeat) => update({ humanFeat })} />
      )}
    </>
  );
};

export const Origin2024Details = ({ origin }: { origin: Origin2024 }) => {
  const { locale } = useLocale();
  const copy = useMessages();
  const species = getSpecies2024(origin.species);
  const background = getBackground2024(origin.background);
  if (!species && !background) return <p className="text-sm text-muted-foreground">{copy.selectOriginPrompt}</p>;

  return (
    <div className="grid gap-3 text-sm sm:grid-cols-2 [&_dt]:font-semibold">
      {species && (
        <dl>
          <dt>{copy.species}</dt>
          <dd>{speciesLabel(locale, origin.species)}{origin.lineage && ` · ${lineageLabel(locale, origin.species, origin.lineage)}`}</dd>
          <dt className="mt-2">{copy.size}</dt>
          <dd>{copy[species.size]}</dd>
          <dt className="mt-2">{copy.speed}</dt>
          <dd>{copy.walkingSpeed(origin.species === "elf" && origin.lineage === "Wood Elf" ? 35 : species.speed)}</dd>
          {origin.humanFeat && <><dt className="mt-2">{copy.humanOriginFeat}</dt><dd>{originFeatLabel(locale, origin.humanFeat)}</dd></>}
        </dl>
      )}
      {background && (
        <dl>
          <dt>{copy.background}</dt>
          <dd>{backgroundLabel(locale, origin.background)}</dd>
          <dt className="mt-2">{copy.originFeat}</dt>
          <dd>{originFeatLabel(locale, background.feat)}</dd>
          <dt className="mt-2">{copy.grantedSkills}</dt>
          <dd>{background.skills.map((skill) => skillLabel(locale, skill)).join(locale === "zh" ? "、" : ", ")}</dd>
        </dl>
      )}
    </div>
  );
};
