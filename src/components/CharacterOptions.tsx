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
import { VariantBonusSelector } from "./VariantBonusSelector";

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
  const skillChoice = resolveSkillChoice(race, variant);
  const skillOptions = skillChoice?.options ?? skills;
  const languageChoice = resolveLanguageChoice(race, variant);
  const toolChoice = resolveToolChoice(race, variant);
  const cantripChoice = resolveCantripChoice(race, variant);

  return (
    <>
      {floatingBonus && (
        <VariantBonusSelector
          selectedBonuses={selectedBonuses}
          setSelectedBonuses={setSelectedBonuses}
          attributeKeys={attributeKeys}
          floatingBonus={floatingBonus}
        />
      )}

      {skillChoice &&
        Array.from({ length: skillChoice.count }, (_, index) => {
          const slot = index as 0 | 1;
          const other = selectedSkills[slot === 0 ? 1 : 0];
          return (
            <div key={slot} className="min-w-0">
              <label htmlFor={`skill-choice-${slot}`} className="mb-2 block">
                {skillChoice.count === 1
                  ? copy.skillProficiency
                  : copy.skillSlot(slot)}
              </label>
              <NativeSelect
                id={`skill-choice-${slot}`}
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
      {variantHuman && featNeedsChoice(selectedFeat) && (
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
        Array.from({ length: languageChoice.count }, (_, index) => {
          const slot = index as 0 | 1;
          const other = selectedLanguages[slot === 0 ? 1 : 0];
          return (
            <div key={slot} className="min-w-0">
              <label htmlFor={`language-choice-${slot}`} className="mb-2 block">
                {languageChoice.count === 1
                  ? copy.extraLanguage
                  : copy.languageSlot(slot)}
              </label>
              <NativeSelect
                id={`language-choice-${slot}`}
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
