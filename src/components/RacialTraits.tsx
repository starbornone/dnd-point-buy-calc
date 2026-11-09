"use client";

import { Card } from "@/components/ui/card";
import { Fragment } from "react";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { raceData } from "@/data/raceData";
import { abilityLabel, ancestryLabel, cantripLabel, featLabel, languageLabel, skillLabel, toolLabel } from "@/i18n/names";
import { getRaceTraits } from "@/i18n/raceTraits";
import { grantedFeatAbility, resolveGrantedCantrips, resolveGrantedSkills, resolveGrantedTools } from "@/utils";

export const RacialTraits = () => {
  const { locale } = useLocale();
  const copy = useMessages();
  const {
    selectedRace,
    selectedVariant,
    selectedSkills,
    selectedLanguages,
    selectedTool,
    selectedCantrip,
    selectedDragon,
    selectedFeat,
    selectedFeatAbility,
  } = useRace();
  const chosenSkills = selectedSkills.filter(Boolean);
  const race = raceData[selectedRace];
  const variant = race?.variants?.find((entry) => entry.name === selectedVariant);
  const grantedSkills = resolveGrantedSkills(race, variant);
  const grantedTools = resolveGrantedTools(race, variant);
  const grantedCantrips = resolveGrantedCantrips(race, variant);
  const chosenLanguages = selectedLanguages.filter(Boolean);
  const featAbility = grantedFeatAbility(selectedFeat, selectedFeatAbility);

  const selectedRaceTraits = getRaceTraits(locale, selectedRace, selectedVariant);

  return (
    <Card
      role="region"
      aria-labelledby="racial-traits-heading"
      className="flex flex-col gap-3 sm:gap-4 sm:p-5 xl:p-6"
    >
      <h2 id="racial-traits-heading" className="font-display text-2xl leading-tight text-primary">{copy.racialTraits}</h2>
      {selectedRaceTraits ? (
        <>
          {selectedRaceTraits.description ? (
            <div className="space-y-1 text-sm leading-relaxed">
              <p>{selectedRaceTraits.description}</p>
              <dl className="text-muted-foreground">
                <dt className="inline font-semibold">{copy.abilityScoreIncrease}</dt>
                <dd className="inline">{selectedRaceTraits.ability}</dd>
              </dl>
            </div>
          ) : null}
          <div className="grid gap-x-7 gap-y-4 border-t border-border pt-3 text-sm md:grid-cols-2 [&_dd]:leading-relaxed [&_dt]:mt-3 [&_dt]:font-semibold [&_dt]:text-primary [&_dt:first-child]:mt-0">
            <div>
              <dl>
                {selectedRaceTraits.description ? null : (
                  <>
                    <dt>{copy.abilityScoreIncrease}</dt>
                    <dd>{selectedRaceTraits.ability}</dd>
                  </>
                )}
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
                {chosenLanguages.length > 0 && (
                  <>
                    <dt>
                      {chosenLanguages.length > 1 ? copy.chosenLanguages : copy.chosenLanguage}
                    </dt>
                    {chosenLanguages.map((language) => (
                      <dd key={language}>{languageLabel(locale, language)}</dd>
                    ))}
                  </>
                )}
                {selectedRaceTraits.other.map((trait, index) => {
                  if (index % 2 === 0) {
                    return <dt key={index}>{trait}{locale === "zh" ? "：" : ":"}</dt>;
                  }
                  return <dd key={index}>{trait}</dd>;
                })}
                {grantedSkills.length > 0 && (
                  <>
                    <dt>{grantedSkills.length > 1 ? copy.grantedSkills : copy.grantedSkill}</dt>
                    {grantedSkills.map((skill) => (
                      <dd key={skill}>{skillLabel(locale, skill)}</dd>
                    ))}
                  </>
                )}
                {grantedCantrips.length > 0 && (
                  <>
                    <dt>
                      {grantedCantrips.length > 1 ? copy.grantedCantrips : copy.grantedCantrip}
                    </dt>
                    {grantedCantrips.map((cantrip) => (
                      <dd key={cantrip}>{cantripLabel(locale, cantrip)}</dd>
                    ))}
                  </>
                )}
                {grantedTools.map((tool) => (
                  <Fragment key={tool}>
                    <dt>{copy.grantedTool}</dt>
                    <dd>{toolLabel(locale, tool)}</dd>
                  </Fragment>
                ))}
                {chosenSkills.length > 0 && (
                  <>
                    <dt>{chosenSkills.length > 1 ? copy.chosenSkills : copy.chosenSkill}</dt>
                    {chosenSkills.map((skill) => (
                      <dd key={skill}>{skillLabel(locale, skill)}</dd>
                    ))}
                  </>
                )}
                {selectedTool && (
                  <>
                    <dt>{copy.chosenTool}</dt>
                    <dd>{toolLabel(locale, selectedTool)}</dd>
                  </>
                )}
                {selectedDragon && (
                  <>
                    <dt>{copy.chosenAncestry}</dt>
                    <dd>{ancestryLabel(locale, selectedDragon)}</dd>
                  </>
                )}
                {selectedCantrip && (
                  <>
                    <dt>{copy.chosenCantrip}</dt>
                    <dd>{cantripLabel(locale, selectedCantrip)}</dd>
                  </>
                )}
                {selectedFeat && (
                  <>
                    <dt>{copy.chosenFeat}</dt>
                    <dd>
                      {featLabel(locale, selectedFeat)}
                      {featAbility ? ` (+1 ${abilityLabel(locale, featAbility)})` : ""}
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">{copy.selectRacePrompt}</p>
      )}
    </Card>
  );
};
