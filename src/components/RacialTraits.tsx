"use client";

import { useLocale, useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { emptyBonuses } from "@/data/bonuses";
import { raceData } from "@/data";
import { Race } from "@/types/race";
import { DEFAULT_LOCALE } from "@/i18n/locale";
import { abilityLabel, skillLabel } from "@/i18n/names";
import { grantedFeatAbility, mergeRaceAndVariant } from "@/utils";

const defaultTraits: Race = {
  name: "",
  bonuses: emptyBonuses(),
  ability: "",
  age: "",
  alignment: "",
  size: "",
  speed: "",
  language: "",
  other: [],
};

export const RacialTraits = () => {
  const { locale } = useLocale();
  const copy = useMessages();
  const { selectedRace, selectedVariant, selectedSkills, selectedFeat, selectedFeatAbility } =
    useRace();
  const chosenSkills = selectedSkills.filter(Boolean);
  const featAbility = grantedFeatAbility(selectedFeat, selectedFeatAbility);

  const baseRaceTraits = raceData[selectedRace] || defaultTraits;

  const selectedRaceTraits = mergeRaceAndVariant(
    baseRaceTraits,
    selectedVariant
  );

  return (
    <div className="bg-lightGray p-4 mt-4 rounded">
      <h2 className="font-bold">{copy.racialTraits}</h2>
      {locale !== DEFAULT_LOCALE ? <p>{copy.rulesInEnglish}</p> : null}
      {selectedRace ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <dl>
                <dt>{copy.abilityScoreIncrease}</dt>
                <dd>{selectedRaceTraits.ability}</dd>
                <dt>{copy.age}</dt>
                <dd>{selectedRaceTraits.age}</dd>
                <dt>{copy.alignment}</dt>
                <dd>{selectedRaceTraits.alignment}</dd>
                <dt>{copy.size}</dt>
                <dd>{selectedRaceTraits.size}</dd>
                <dt>{copy.speed}</dt>
                <dd>{selectedRaceTraits.speed}</dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt>{copy.languages}</dt>
                <dd>{selectedRaceTraits.language}</dd>
                {selectedRaceTraits.other.map((trait, index) => {
                  if (index % 2 === 0) {
                    return <dt key={index}>{trait}:</dt>;
                  }
                  return <dd key={index}>{trait}</dd>;
                })}
                {chosenSkills.length > 0 && (
                  <>
                    <dt>{chosenSkills.length > 1 ? copy.chosenSkills : copy.chosenSkill}</dt>
                    {chosenSkills.map((skill) => (
                      <dd key={skill}>{skillLabel(locale, skill)}</dd>
                    ))}
                  </>
                )}
                {selectedFeat && (
                  <>
                    <dt>{copy.chosenFeat}</dt>
                    <dd>
                      {selectedFeat}
                      {featAbility ? ` (+1 ${abilityLabel(locale, featAbility)})` : ""}
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </div>
        </>
      ) : (
        <p>{copy.selectRacePrompt}</p>
      )}
    </div>
  );
};
