"use client";

import { NativeSelect } from "@/components/ui/native-select";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { attributeKeys } from "@/data";
import { featOptions, feats } from "@/data/feats";
import { raceData } from "@/data/raceData";
import { abilityLabel, ancestryLabel, cantripLabel, featLabel, languageLabel, skillLabel, toolGroupLabel, toolLabel } from "@/i18n/names";
import { skills } from "@/data/skills";
import {
  featNeedsChoice,
  resolveFloatingBonus,
  cantripOptions,
  dragonOptions,
  languageOptions,
  resolveCantripChoice,
  resolveLanguageChoice,
  resolveSkillChoice,
  resolveToolChoice,
  toolGroupsFor,
} from "@/utils";
import { RaceSelector } from "./RaceSelector";
import { floatingBonusOptionsForSlot, VariantBonusSelector } from "./VariantBonusSelector";

const choiceSlots = [0, 1] as const;

export const CharacterOptions = () => {
  const { locale } = useLocale();
  const copy = useMessages();
  const {
    selectedRace,
    selectedVariant,
    selectedBonuses,
    setSelectedBonuses,
    selectedSkills,
    setSelectedSkill,
    selectedLanguages,
    setSelectedLanguage,
    selectedTool,
    setSelectedTool,
    selectedCantrip,
    setSelectedCantrip,
    selectedDragon,
    setSelectedDragon,
    selectedFeat,
    setSelectedFeat,
    selectedFeatAbility,
    setSelectedFeatAbility,
  } = useRace();

  const race = raceData[selectedRace];
  const variant = race?.variants?.find((entry) => entry.name === selectedVariant);
  const floatingBonus = resolveFloatingBonus(race, variant);
  const variantHuman = selectedVariant === "Variant Human";
  const chooseFeatAbility = variantHuman && featNeedsChoice(selectedFeat);
  const skillChoice = resolveSkillChoice(race, variant);
  const skillOptions = skillChoice?.options ?? skills;
  const languageChoice = resolveLanguageChoice(race, variant);
  const toolChoice = resolveToolChoice(race, variant);
  const cantripChoice = resolveCantripChoice(race, variant);
  const skillSlots = choiceSlots.slice(0, skillChoice?.count ?? 0).map((slot) => ({
    slot,
    id: `skill-choice-${slot}`,
    label: skillChoice?.count === 1 ? copy.skillProficiency : copy.skillSlot(slot),
  }));
  const languageSlots = choiceSlots.slice(0, languageChoice?.count ?? 0).map((slot) => ({
    slot,
    id: `language-choice-${slot}`,
    label: languageChoice?.count === 1 ? copy.extraLanguage : copy.languageSlot(slot),
  }));
  const bonusSlots = floatingBonus
    ? choiceSlots.slice(0, floatingBonus.count).map((slot) => {
        const pick = selectedBonuses[slot];
        const allowed = floatingBonusOptionsForSlot(attributeKeys, floatingBonus, selectedBonuses, slot);
        return {
          id: `floating-bonus-${slot}`,
          label: floatingBonus.count === 1 ? copy.abilityBonus : copy.abilityBonusSlot(slot),
          missing: !pick || !allowed.includes(pick),
        };
      })
    : [];
  const missingChoices = [
    { id: "race", label: copy.selectRacePlaceholder, missing: !race },
    {
      id: "variant",
      label: copy.selectVariantPlaceholder,
      // The Human selector already defaults to Standard Human.
      missing: race?.variants?.length && selectedRace !== "human" && !variant,
    },
    ...bonusSlots,
    ...skillSlots.map(({ slot, id, label }) => ({ id, label, missing: !selectedSkills[slot] })),
    { id: "variant-feat", label: copy.feat, missing: variantHuman && !selectedFeat },
    { id: "feat-ability", label: copy.featAbility, missing: chooseFeatAbility && !selectedFeatAbility },
    ...languageSlots.map(({ slot, id, label }) => ({ id, label, missing: !selectedLanguages[slot] })),
    { id: "tool-choice", label: copy.toolProficiency, missing: toolChoice && !selectedTool },
    { id: "cantrip-choice", label: copy.cantrip, missing: cantripChoice && !selectedCantrip },
    { id: "dragon-ancestry", label: copy.draconicAncestry, missing: race?.draconicAncestry && !selectedDragon },
  ].filter(({ missing }) => missing);

  return (
    <>
      <div className="col-span-full rounded-md border border-border bg-muted p-2.5 text-sm">
        <p role="status" className="font-semibold">
          {missingChoices.length
            ? copy.setupChoicesRemaining(missingChoices.length)
            : copy.setupChoicesComplete}
        </p>
        {missingChoices.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
            {missingChoices.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-flex min-h-8 items-center rounded-sm text-primary underline underline-offset-4 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  onClick={(event) => {
                    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
                    const control = document.getElementById(id);
                    if (control) {
                      event.preventDefault();
                      control.focus();
                    }
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <RaceSelector />
      {floatingBonus && (
        <VariantBonusSelector
          selectedBonuses={selectedBonuses}
          setSelectedBonuses={setSelectedBonuses}
          attributeKeys={attributeKeys}
          floatingBonus={floatingBonus}
        />
      )}

      {skillSlots.map(({ slot, id, label }) => {
        const other = selectedSkills[slot === 0 ? 1 : 0];
        return (
          <div key={id} className="min-w-0">
            <label htmlFor={id} className="mb-2 block">
              {label}
            </label>
            <NativeSelect
              id={id}
              value={selectedSkills[slot]}
              onChange={(event) => setSelectedSkill(slot, event.target.value)}
            >
              <option value="">{copy.selectSkill}</option>
              {skillOptions
                .filter((skill) => skill !== other)
                .map((skill) => (
                  <option key={skill} value={skill}>
                    {skillLabel(locale, skill)}
                  </option>
                ))}
            </NativeSelect>
          </div>
        );
      })}
      {variantHuman && (
        <div className="min-w-0">
          <label htmlFor="variant-feat" className="mb-2 block">
            {copy.feat}
          </label>
          <NativeSelect
            id="variant-feat"
            value={selectedFeat}
            onChange={(event) => setSelectedFeat(event.target.value)}
          >
            <option value="">{copy.selectFeat}</option>
            {feats.map((feat) => (
              <option key={feat} value={feat}>
                {featLabel(locale, feat)}
              </option>
            ))}
          </NativeSelect>
        </div>
      )}
      {chooseFeatAbility && (
        <div className="min-w-0">
          <label htmlFor="feat-ability" className="mb-2 block">
            {copy.featAbility}
          </label>
          <NativeSelect
            id="feat-ability"
            value={selectedFeatAbility}
            onChange={(event) => {
              const value = event.target.value;
              const allowed = featOptions(selectedFeat);
              setSelectedFeatAbility(
                allowed.includes(value as (typeof allowed)[number])
                  ? (value as (typeof allowed)[number])
                  : ""
              );
            }}
          >
            <option value="">{copy.selectAttribute}</option>
            {featOptions(selectedFeat).map((ability) => (
              <option key={ability} value={ability}>
                {abilityLabel(locale, ability)}
              </option>
            ))}
          </NativeSelect>
        </div>
      )}

      {languageChoice &&
        languageSlots.map(({ slot, id, label }) => {
          const other = selectedLanguages[slot === 0 ? 1 : 0];
          return (
            <div key={id} className="min-w-0">
              <label htmlFor={id} className="mb-2 block">
                {label}
              </label>
              <NativeSelect
                id={id}
                value={selectedLanguages[slot]}
                onChange={(event) => setSelectedLanguage(slot, event.target.value)}
              >
                <option value="">{copy.selectLanguage}</option>
                {languageOptions(languageChoice)
                  .filter((language) => language !== other)
                  .map((language) => (
                    <option key={language} value={language}>
                      {languageLabel(locale, language)}
                    </option>
                  ))}
              </NativeSelect>
            </div>
          );
        })}

      {toolChoice && (
        <div className="min-w-0">
          <label htmlFor="tool-choice" className="mb-2 block">
            {copy.toolProficiency}
          </label>
          <NativeSelect
            id="tool-choice"
            value={selectedTool}
            onChange={(event) => setSelectedTool(event.target.value)}
          >
            <option value="">{copy.selectTool}</option>
            {toolGroupsFor(toolChoice).map((group) => (
              <optgroup key={group.name} label={toolGroupLabel(locale, group.name)}>
                {group.tools.map((tool) => (
                  <option key={tool} value={tool}>
                    {toolLabel(locale, tool)}
                  </option>
                ))}
              </optgroup>
            ))}
          </NativeSelect>
        </div>
      )}
      {cantripChoice && (
        <div className="min-w-0">
          <label htmlFor="cantrip-choice" className="mb-2 block">
            {copy.cantrip}
          </label>
          <NativeSelect
            id="cantrip-choice"
            value={selectedCantrip}
            onChange={(event) => setSelectedCantrip(event.target.value)}
          >
            <option value="">{copy.selectCantrip}</option>
            {cantripOptions(cantripChoice).map((cantrip) => (
              <option key={cantrip} value={cantrip}>
                {cantripLabel(locale, cantrip)}
              </option>
            ))}
          </NativeSelect>
        </div>
      )}

      {race?.draconicAncestry && (
        <div className="min-w-0">
          <label htmlFor="dragon-ancestry" className="mb-2 block">
            {copy.draconicAncestry}
          </label>
          <NativeSelect
            id="dragon-ancestry"
            value={selectedDragon}
            onChange={(event) => setSelectedDragon(event.target.value)}
          >
            <option value="">{copy.selectDragon}</option>
            {dragonOptions().map((dragon) => (
              <option key={dragon} value={dragon}>
                {ancestryLabel(locale, dragon)}
              </option>
            ))}
          </NativeSelect>
        </div>
      )}
    </>
  );
};
