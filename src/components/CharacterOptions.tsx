"use client";

import { NativeSelect } from "@/components/ui/native-select";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { addBonuses } from "@/data/bonuses";
import { feats } from "@/data/feats";
import { raceData } from "@/data/raceData";
import {
  ancestryLabel,
  cantripLabel,
  featLabel,
  languageGroupLabel,
  languageLabel,
  skillLabel,
  toolGroupLabel,
  toolLabel,
  variantLabel,
} from "@/i18n/names";
import { skills } from "@/data/skills";
import {
  featNeedsChoice,
  resolveFloatingBonus,
  cantripOptions,
  calculateRacialBonuses,
  dragonOptions,
  getFixedBonuses,
  getSelectedFloatingBonuses,
  languageGroupsFor,
  resolveCantripChoice,
  resolveLanguageChoice,
  resolveSkillChoice,
  resolveToolChoice,
  toolGroupsFor,
} from "@/utils";
import { FeatPicker } from "./FeatPicker";
import { FeatSummary } from "./FeatSummary";
import { RaceSelector } from "./RaceSelector";
import { SetupChecklist } from "./SetupChecklist";
import { VariantBonusSelector } from "./VariantBonusSelector";

const choiceSlots = [0, 1] as const;

export const CharacterOptions = () => {
  const { locale } = useLocale();
  const copy = useMessages();
  const { attributes } = useStats();
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
  const missingFeatAbility = featNeedsChoice(selectedFeat) && !selectedFeatAbility;
  const scoresBeforeFeat = variantHuman ? addBonuses(attributes, calculateRacialBonuses({
    fixedBonuses: getFixedBonuses(selectedRace, selectedVariant),
    floatingBonus,
    selectedBonuses,
  })) : undefined;
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
  const missingBonuses = floatingBonus
    ? floatingBonus.count - getSelectedFloatingBonuses(floatingBonus, selectedBonuses).size
    : 0;
  const missingChoices = [
    { id: "race", label: copy.selectRacePlaceholder, missing: !race },
    {
      id: "variant",
      label: copy.selectVariantPlaceholder,
      // The Human selector already defaults to Standard Human.
      missing: race?.variants?.length && selectedRace !== "human" && !variant,
    },
    { id: "ability-bonuses", label: copy.missingAbilityBonuses(missingBonuses), missing: missingBonuses > 0 },
    ...skillSlots.map(({ slot, id, label }) => ({ id, label, missing: !selectedSkills[slot] })),
    {
      id: "variant-feat",
      label: missingFeatAbility ? copy.featAbility(featLabel(locale, selectedFeat)) : copy.feat,
      missing: variantHuman && (!selectedFeat || missingFeatAbility),
    },
    ...languageSlots.map(({ slot, id, label }) => ({ id, label, missing: !selectedLanguages[slot] })),
    { id: "tool-choice", label: copy.toolProficiency, missing: toolChoice && !selectedTool },
    { id: "cantrip-choice", label: copy.cantrip, missing: cantripChoice && !selectedCantrip },
    { id: "dragon-ancestry", label: copy.draconicAncestry, missing: race?.draconicAncestry && !selectedDragon },
  ].filter(({ missing }) => missing);
  const missingChoiceCount = missingChoices.length + Math.max(0, missingBonuses - 1);

  return (
    <>
      <SetupChecklist choices={missingChoices} count={missingChoiceCount} />
      <RaceSelector />
      {floatingBonus && (
        <VariantBonusSelector
          selectedBonuses={selectedBonuses}
          setSelectedBonuses={setSelectedBonuses}
          fixedBonuses={getFixedBonuses(selectedRace, selectedVariant)}
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
        <FeatPicker
          id="variant-feat"
          label={copy.feat}
          edition="2014"
          options={feats}
          value={selectedFeat}
          abilityChoice={selectedFeatAbility}
          scoresBeforeFeat={scoresBeforeFeat}
          onSelect={(feat, ability) => {
            setSelectedFeat(feat);
            setSelectedFeatAbility(ability);
          }}
        />
      )}
      {variantHuman && selectedFeat && (
        <FeatSummary
          edition="2014"
          feat={selectedFeat}
          source={copy.featChosenAs(variantLabel(locale, selectedVariant))}
          abilityChoice={selectedFeatAbility}
          className="col-span-full"
        />
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
                {languageGroupsFor(languageChoice).map((group) => {
                  const options = group.languages
                    .filter((language) => language !== other)
                    .slice()
                    .sort((a, b) =>
                      languageLabel(locale, a).localeCompare(
                        languageLabel(locale, b),
                        locale
                      )
                    );
                  if (options.length === 0) return null;
                  return (
                    <optgroup
                      key={group.name}
                      label={languageGroupLabel(locale, group.name)}
                    >
                      {options.map((language) => (
                        <option key={language} value={language}>
                          {languageLabel(locale, language)}
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
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
