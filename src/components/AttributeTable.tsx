"use client";

import { useLocale, useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { attributeKeys } from "@/data";
import { featOptions, feats } from "@/data/feats";
import { raceData } from "@/data/raceData";
import { abilityLabel, skillLabel } from "@/i18n/names";
import { skills } from "@/data/skills";
import {
  calculateFeatBonus,
  calculateRacialBonuses,
  featGrantsIncrease,
  featNeedsChoice,
  getFixedBonuses,
  handleAttributeChange,
  resolveFloatingBonus,
  resolveSkillChoice,
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
