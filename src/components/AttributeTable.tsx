"use client";

import { useLocale, useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { attributeKeys } from "@/data";
import { featOptions, feats } from "@/data/feats";
import { raceData } from "@/data/raceData";
import { abilityLabel, ancestryLabel, cantripLabel, languageLabel, skillLabel, toolGroupLabel, toolLabel } from "@/i18n/names";
import { skills } from "@/data/skills";
import {
  calculateFeatBonus,
  calculateRacialBonuses,
  featGrantsIncrease,
  featNeedsChoice,
  getFixedBonuses,
  handleAttributeChange,
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
import { AttributeTableBody } from "./AttributeTableBody";
import { VariantBonusSelector } from "./VariantBonusSelector";

export const AttributeTable = () => {
  const { locale } = useLocale();
  const copy = useMessages();
  const { attributes, setAttributes, pointBudget } = useStats();
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
  const racialBonuses = calculateRacialBonuses({
    fixedBonuses: getFixedBonuses(selectedRace, selectedVariant),
    floatingBonus,
    selectedBonuses,
  });
  const variantHuman = selectedVariant === "Variant Human";
  const skillChoice = resolveSkillChoice(race, variant);
  const skillOptions = skillChoice?.options ?? skills;
  const languageChoice = resolveLanguageChoice(race, variant);
  const toolChoice = resolveToolChoice(race, variant);
  const cantripChoice = resolveCantripChoice(race, variant);
  const featBonuses = calculateFeatBonus(selectedFeat, selectedFeatAbility);
  const showFeat = featGrantsIncrease(selectedFeat);

  return (
    <div className="mt-4">
      {floatingBonus && (
        <VariantBonusSelector
          selectedBonuses={selectedBonuses}
          setSelectedBonuses={setSelectedBonuses}
          attributeKeys={attributeKeys}
          floatingBonus={floatingBonus}
        />
      )}

      {(skillChoice || variantHuman) && (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillChoice &&
            Array.from({ length: skillChoice.count }, (_, index) => {
              const slot = index as 0 | 1;
              const other = selectedSkills[slot === 0 ? 1 : 0];
              return (
                <div key={slot}>
                  <label htmlFor={`skill-choice-${slot}`} className="block">
                    {skillChoice.count === 1
                      ? copy.skillProficiency
                      : copy.skillSlot(slot)}
                  </label>
                  <select
                    id={`skill-choice-${slot}`}
                    className="mt-2 block w-full p-2 border border-lightGray rounded"
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
                  </select>
                </div>
              );
            })}
          {variantHuman && (
          <div>
            <label htmlFor="variant-feat" className="block">
              {copy.feat}
            </label>
            <select
              id="variant-feat"
              className="mt-2 block w-full p-2 border border-lightGray rounded"
              value={selectedFeat}
              onChange={(event) => setSelectedFeat(event.target.value)}
            >
              <option value="">{copy.selectFeat}</option>
              {feats.map((feat) => (
                <option key={feat} value={feat}>
                  {feat}
                </option>
              ))}
            </select>
            {featNeedsChoice(selectedFeat) && (
              <>
                <label htmlFor="feat-ability" className="mt-4 block">
                  {copy.featAbility}
                </label>
                <select
                  id="feat-ability"
                  className="mt-2 block w-full p-2 border border-lightGray rounded"
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
                </select>
              </>
            )}
          </div>
          )}
        </div>
      )}

      {languageChoice && (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: languageChoice.count }, (_, index) => {
            const slot = index as 0 | 1;
            const other = selectedLanguages[slot === 0 ? 1 : 0];
            return (
              <div key={slot}>
                <label htmlFor={`language-choice-${slot}`} className="block">
                  {languageChoice.count === 1
                    ? copy.extraLanguage
                    : copy.languageSlot(slot)}
                </label>
                <select
                  id={`language-choice-${slot}`}
                  className="mt-2 block w-full p-2 border border-lightGray rounded"
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
                </select>
              </div>
            );
          })}
        </div>
      )}

      {(toolChoice || cantripChoice) && (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolChoice && (
            <div>
              <label htmlFor="tool-choice" className="block">
                {copy.toolProficiency}
              </label>
              <select
                id="tool-choice"
                className="mt-2 block w-full p-2 border border-lightGray rounded"
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
              </select>
            </div>
          )}
          {cantripChoice && (
            <div>
              <label htmlFor="cantrip-choice" className="block">
                {copy.cantrip}
              </label>
              <select
                id="cantrip-choice"
                className="mt-2 block w-full p-2 border border-lightGray rounded"
                value={selectedCantrip}
                onChange={(event) => setSelectedCantrip(event.target.value)}
              >
                <option value="">{copy.selectCantrip}</option>
                {cantripOptions(cantripChoice).map((cantrip) => (
                  <option key={cantrip} value={cantrip}>
                    {cantripLabel(locale, cantrip)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {race?.draconicAncestry && (
        <div className="mb-4">
          <label htmlFor="dragon-ancestry" className="block">
            {copy.draconicAncestry}
          </label>
          <select
            id="dragon-ancestry"
            className="mt-2 block w-full p-2 border border-lightGray rounded"
            value={selectedDragon}
            onChange={(event) => setSelectedDragon(event.target.value)}
          >
            <option value="">{copy.selectDragon}</option>
            {dragonOptions().map((dragon) => (
              <option key={dragon} value={dragon}>
                {ancestryLabel(locale, dragon)}
              </option>
            ))}
          </select>
        </div>
      )}

      <table className="w-full">
        <thead className="hidden md:table-header-group">
          <tr>
            <th scope="col" className="text-left">
              {copy.attribute}
            </th>
            <th scope="col" className="text-center">
              {copy.score}
            </th>
            <th scope="col" className="text-center">
              {copy.cost}
            </th>
            <th scope="col" className="text-center">
              {copy.racial}
            </th>
            {showFeat ? (
              <th scope="col" className="text-center">
                {copy.feat}
              </th>
            ) : null}
            <th scope="col" className="text-center">
              {copy.total}
            </th>
            <th scope="col" className="text-center">
              {copy.modifier}
            </th>
          </tr>
        </thead>

        <AttributeTableBody
          key={`${selectedRace}:${selectedVariant}`}
          attributes={attributes}
          racialBonuses={racialBonuses}
          featBonuses={showFeat ? featBonuses : undefined}
          attributeKeys={attributeKeys}
          pointBudget={pointBudget}
          handleChange={(event, attr) =>
            handleAttributeChange(event, attr, setAttributes)
          }
        />
      </table>
    </div>
  );
};
