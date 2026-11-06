"use client";

import { raceData } from "@/data/raceData";
import { AttributeState, BonusPicks } from "@/types";
import { emptyBonusPicks } from "@/utils/characterBuild";
import { emptyLanguagePicks, LanguagePicks } from "@/utils/languageChoice";
import { emptySkillPicks, SkillPicks } from "@/utils/skillChoice";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface RaceContextType {
  selectedRace: string;
  selectedVariant: string;
  selectedBonuses: BonusPicks;
  selectedSkills: SkillPicks;
  selectedLanguages: LanguagePicks;
  selectedTool: string;
  selectedCantrip: string;
  selectedDragon: string;
  selectedFeat: string;
  selectedFeatAbility: keyof AttributeState | "";
  setSelectedRace: (race: string) => void;
  setSelectedVariant: (variant: string) => void;
  setSelectedBonuses: (
    value: BonusPicks | ((prev: BonusPicks) => BonusPicks)
  ) => void;
  setSelectedSkill: (index: 0 | 1, skill: string) => void;
  setSelectedLanguage: (index: 0 | 1, language: string) => void;
  setSelectedTool: (tool: string) => void;
  setSelectedCantrip: (cantrip: string) => void;
  setSelectedDragon: (dragon: string) => void;
  setSelectedFeat: (feat: string) => void;
  setSelectedFeatAbility: (ability: keyof AttributeState | "") => void;
  loadRace: (
    race: string,
    variant: string,
    bonuses: BonusPicks,
    skills: SkillPicks,
    languages: LanguagePicks,
    tool: string,
    cantrip: string,
    dragon: string,
    feat: string,
    featAbility: keyof AttributeState | ""
  ) => void;
}

const RaceContext = createContext<RaceContextType | undefined>(undefined);

const variantForRace = (race: string) =>
  raceData[race]?.variants?.some((variant) => variant.name === "Standard Human")
    ? "Standard Human"
    : "";

export const RaceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRace, setRace] = useState("");
  const [selectedVariant, setVariant] = useState("");
  const [selectedBonuses, setSelectedBonuses] = useState<BonusPicks>(
    emptyBonusPicks
  );
  const [selectedSkills, setSelectedSkills] = useState<SkillPicks>(emptySkillPicks);
  const [selectedLanguages, setSelectedLanguages] =
    useState<LanguagePicks>(emptyLanguagePicks);
  const [selectedTool, setTool] = useState("");
  const [selectedCantrip, setCantrip] = useState("");
  const [selectedDragon, setDragon] = useState("");
  const [selectedFeat, setFeat] = useState("");
  const [selectedFeatAbility, setSelectedFeatAbility] = useState<
    keyof AttributeState | ""
  >("");

  const clearChoices = useCallback(() => {
    setSelectedBonuses(emptyBonusPicks());
    setSelectedSkills(emptySkillPicks());
    setSelectedLanguages(emptyLanguagePicks());
    setTool("");
    setCantrip("");
    setDragon("");
    setFeat("");
    setSelectedFeatAbility("");
  }, []);

  const setSelectedSkill = useCallback((index: 0 | 1, skill: string) => {
    setSelectedSkills((current) => {
      const next: SkillPicks = [current[0], current[1]];
      next[index] = skill;
      const other = index === 0 ? 1 : 0;
      if (skill && next[other] === skill) next[other] = "";
      return next;
    });
  }, []);

  const setSelectedLanguage = useCallback((index: 0 | 1, language: string) => {
    setSelectedLanguages((current) => {
      const next: LanguagePicks = [current[0], current[1]];
      next[index] = language;
      const other = index === 0 ? 1 : 0;
      if (language && next[other] === language) next[other] = "";
      return next;
    });
  }, []);

  const setSelectedTool = useCallback((tool: string) => {
    setTool(tool);
  }, []);

  const setSelectedCantrip = useCallback((cantrip: string) => {
    setCantrip(cantrip);
  }, []);

  const setSelectedDragon = useCallback((dragon: string) => {
    setDragon(dragon);
  }, []);

  const setSelectedFeat = useCallback((feat: string) => {
    setFeat(feat);
    setSelectedFeatAbility("");
  }, []);

  const setSelectedRace = useCallback(
    (race: string) => {
      setRace(race);
      setVariant(variantForRace(race));
      clearChoices();
    },
    [clearChoices]
  );

  const setSelectedVariant = useCallback(
    (variant: string) => {
      setVariant(variant);
      clearChoices();
    },
    [clearChoices]
  );

  const loadRace = useCallback(
    (
      race: string,
      variant: string,
      bonuses: BonusPicks,
      skills: SkillPicks,
      languages: LanguagePicks,
      tool: string,
      cantrip: string,
      dragon: string,
      feat: string,
      featAbility: keyof AttributeState | ""
    ) => {
      setRace(race);
      setVariant(variant);
      setSelectedBonuses(bonuses);
      setSelectedSkills(skills);
      setSelectedLanguages(languages);
      setTool(tool);
      setCantrip(cantrip);
      setDragon(dragon);
      setFeat(feat);
      setSelectedFeatAbility(featAbility);
    },
    []
  );

  const value = useMemo(
    () => ({
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
      setSelectedRace,
      setSelectedVariant,
      setSelectedBonuses,
      setSelectedSkill,
      setSelectedLanguage,
      setSelectedTool,
      setSelectedCantrip,
      setSelectedDragon,
      setSelectedFeat,
      setSelectedFeatAbility,
      loadRace,
    }),
    [
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
      setSelectedRace,
      setSelectedVariant,
      setSelectedBonuses,
      setSelectedSkill,
      setSelectedLanguage,
      setSelectedTool,
      setSelectedCantrip,
      setSelectedDragon,
      setSelectedFeat,
      setSelectedFeatAbility,
      loadRace,
    ]
  );

  return <RaceContext.Provider value={value}>{children}</RaceContext.Provider>;
};

export const useRace = () => {
  const context = useContext(RaceContext);
  if (!context) {
    throw new Error("useRace must be used within a RaceProvider");
  }
  return context;
};
