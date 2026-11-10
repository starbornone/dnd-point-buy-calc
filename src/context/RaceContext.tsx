
import { raceData } from "@/data/raceData";
import { AttributeState, BonusPicks } from "@/types";
import { emptyBonusPicks, type CharacterBuild } from "@/utils/characterBuild";
import { emptyLanguagePicks, LanguagePicks } from "@/utils/languageChoice";
import { emptyOrigin2024, type Origin2024, type RulesEdition } from "@/utils/origin2024";
import { emptySkillPicks, SkillPicks } from "@/utils/skillChoice";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

interface RaceContextType {
  edition: RulesEdition;
  setEdition: (edition: RulesEdition) => void;
  origin2024: Origin2024;
  setOrigin2024: Dispatch<SetStateAction<Origin2024>>;
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
  loadRace: (build: CharacterBuild) => void;
}

const RaceContext = createContext<RaceContextType | undefined>(undefined);

const variantForRace = (race: string) =>
  raceData[race]?.variants?.some((variant) => variant.name === "Standard Human")
    ? "Standard Human"
    : "";

export const RaceProvider = ({ children }: { children: ReactNode }) => {
  const [edition, setEdition] = useState<RulesEdition>("2024");
  const [origin2024, setOrigin2024] = useState(emptyOrigin2024);
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
    (build: CharacterBuild) => {
      setEdition(build.origin2024 ? "2024" : "2014");
      setOrigin2024(build.origin2024 ?? emptyOrigin2024());
      setRace(build.race);
      setVariant(build.variant);
      setSelectedBonuses(build.bonuses);
      setSelectedSkills(build.skills);
      setSelectedLanguages(build.languages);
      setTool(build.tool);
      setCantrip(build.cantrip);
      setDragon(build.dragon);
      setFeat(build.feat);
      setSelectedFeatAbility(build.featAbility);
    },
    []
  );

  const value = useMemo(
    () => ({
      edition,
      setEdition,
      origin2024,
      setOrigin2024,
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
      edition,
      origin2024,
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
