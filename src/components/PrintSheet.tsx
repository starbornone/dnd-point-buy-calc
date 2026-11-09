"use client";

import { useLocale, useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { attributeKeys } from "@/data";
import {
  abilityLabel,
  ancestryLabel,
  cantripLabel,
  languageLabel,
  raceLabel,
  skillLabel,
  toolLabel,
  variantLabel,
} from "@/i18n/names";
import { getRaceTraits } from "@/i18n/raceTraits";
import { raceData } from "@/data/raceData";
import {
  calculateFeatBonus,
  calculateModifier,
  calculatePointCost,
  calculateRacialBonuses,
  featGrantsIncrease,
  formatPointCost,
  getFixedBonuses,
  resolveFloatingBonus,
  resolveGrantedCantrips,
  resolveGrantedSkills,
  resolveGrantedTools,
} from "@/utils";

export const PrintSheet = () => {
  const { locale } = useLocale();
  const copy = useMessages();
  const { attributes, pointBudget } = useStats();
  const {
    selectedRace,
    selectedVariant,
    selectedBonuses,
    selectedSkills,
    selectedLanguages,
    selectedTool,
    selectedCantrip,
    selectedDragon,
    selectedFeat,
    selectedFeatAbility,
  } = useRace();

  const race = raceData[selectedRace];
  const variant = race?.variants?.find((entry) => entry.name === selectedVariant);
  const racialBonuses = calculateRacialBonuses({
    fixedBonuses: getFixedBonuses(selectedRace, selectedVariant),
    floatingBonus: resolveFloatingBonus(race, variant),
    selectedBonuses,
  });
  const featBonuses = calculateFeatBonus(selectedFeat, selectedFeatAbility);
  const showFeat = featGrantsIncrease(selectedFeat);
  const traits = getRaceTraits(locale, selectedRace, selectedVariant);
  const grantedSkills = resolveGrantedSkills(race, variant);
  const grantedTools = resolveGrantedTools(race, variant);
  const grantedCantrips = resolveGrantedCantrips(race, variant);
  const costs = attributeKeys.map((key) => calculatePointCost(attributes[key]));
  const pointCost = costs.every((cost) => !Number.isNaN(cost))
    ? costs.reduce((sum, cost) => sum + cost, 0)
    : null;

  return (
    <section className="hidden print:block">
      <h1>{copy.title}</h1>
      <p>
        {race ? raceLabel(locale, selectedRace) : copy.noRace}
        {selectedVariant ? ` — ${variantLabel(locale, selectedVariant)}` : ""}
      </p>
      <p>
        {copy.pointSummary(
          pointCost === null ? "—" : String(pointCost),
          pointBudget,
          pointCost === null ? "—" : String(pointBudget - pointCost)
        )}
      </p>
      <table>
        <thead>
          <tr>
            <th>{copy.attribute}</th>
            <th>{copy.score}</th>
            <th>{copy.cost}</th>
            <th>{copy.racial}</th>
            {showFeat ? <th>{copy.feat}</th> : null}
            <th>{copy.total}</th>
            <th>{copy.modifier}</th>
          </tr>
        </thead>
        <tbody>
          {attributeKeys.map((key) => {
            const total = attributes[key] + racialBonuses[key] + featBonuses[key];
            return (
              <tr key={key}>
                <td>{abilityLabel(locale, key)}</td>
                <td>{attributes[key]}</td>
                <td>{formatPointCost(attributes[key])}</td>
                <td>{racialBonuses[key]}</td>
                {showFeat ? <td>{featBonuses[key]}</td> : null}
                <td>{total}</td>
                <td>{calculateModifier(total)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {grantedSkills.length > 0 ? (
        <p>
          {grantedSkills.length > 1 ? copy.grantedSkills : copy.grantedSkill}{" "}
          {grantedSkills.map((skill) => skillLabel(locale, skill)).join(", ")}
        </p>
      ) : null}
      {grantedCantrips.length > 0 ? (
        <p>
          {grantedCantrips.length > 1 ? copy.grantedCantrips : copy.grantedCantrip}{" "}
          {grantedCantrips.map((cantrip) => cantripLabel(locale, cantrip)).join(", ")}
        </p>
      ) : null}
      {grantedTools.map((tool) => (
        <p key={tool}>
          {copy.grantedTool} {toolLabel(locale, tool)}
        </p>
      ))}
      {selectedSkills.some(Boolean) ? (
        <p>
          {selectedSkills.filter(Boolean).length > 1 ? copy.chosenSkills : copy.skillLine}{" "}
          {selectedSkills
            .filter(Boolean)
            .map((skill) => skillLabel(locale, skill))
            .join(", ")}
        </p>
      ) : null}
      {selectedLanguages.some(Boolean) ? (
        <p>
          {selectedLanguages.filter(Boolean).length > 1
            ? copy.chosenLanguages
            : copy.chosenLanguage}{" "}
          {selectedLanguages
            .filter(Boolean)
            .map((language) => languageLabel(locale, language))
            .join(", ")}
        </p>
      ) : null}
      {selectedTool ? (
        <p>
          {copy.chosenTool} {toolLabel(locale, selectedTool)}
        </p>
      ) : null}
      {selectedDragon ? (
        <p>
          {copy.chosenAncestry} {ancestryLabel(locale, selectedDragon)}
        </p>
      ) : null}
      {selectedCantrip ? (
        <p>
          {copy.chosenCantrip} {cantripLabel(locale, selectedCantrip)}
        </p>
      ) : null}
      {selectedFeat ? (
        <p>
          {copy.feat}: {selectedFeat}
        </p>
      ) : null}
      {traits ? (
        <>
          <h2>{copy.racialTraits}</h2>
          {copy.rulesInEnglish ? <p>{copy.rulesInEnglish}</p> : null}
          {traits.description ? <p>{traits.description}</p> : null}
          <p>{traits.ability}</p>
          {traits.other.map((trait) => (
            <p key={trait}>{trait}</p>
          ))}
        </>
      ) : null}
    </section>
  );
};
