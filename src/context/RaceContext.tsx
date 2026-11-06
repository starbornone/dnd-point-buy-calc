"use client";

import { raceData } from "@/data/raceData";
import { AttributeState, BonusPicks } from "@/types";
import { emptyBonusPicks } from "@/utils/characterBuild";
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
  selectedFeat: string;
  selectedFeatAbility: keyof AttributeState | "";
  setSelectedRace: (race: string) => void;
  setSelectedVariant: (variant: string) => void;
  setSelectedBonuses: (
    value: BonusPicks | ((prev: BonusPicks) => BonusPicks)
  ) => void;
  setSelectedSkill: (index: 0 | 1, skill: string) => void;
  setSelectedFeat: (feat: string) => void;
  setSelectedFeatAbility: (ability: keyof AttributeState | "") => void;
  loadRace: (
    race: string,
    variant: string,
    bonuses: BonusPicks,
    skills: SkillPicks,
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
  const [selectedFeat, setFeat] = useState("");
  const [selectedFeatAbility, setSelectedFeatAbility] = useState<
    keyof AttributeState | ""
  >("");

  const clearChoices = useCallback(() => {
    setSelectedBonuses(emptyBonusPicks());
    setSelectedSkills(emptySkillPicks());
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
      feat: string,
      featAbility: keyof AttributeState | ""
    ) => {
      setRace(race);
      setVariant(variant);
      setSelectedBonuses(bonuses);
      setSelectedSkills(skills);
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
      selectedFeat,
      selectedFeatAbility,
      setSelectedRace,
      setSelectedVariant,
      setSelectedBonuses,
      setSelectedSkill,
      setSelectedFeat,
      setSelectedFeatAbility,
      loadRace,
    }),
    [
      selectedRace,
      selectedVariant,
      selectedBonuses,
      selectedSkills,
      selectedFeat,
      selectedFeatAbility,
      setSelectedRace,
      setSelectedVariant,
      setSelectedBonuses,
      setSelectedSkill,
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
