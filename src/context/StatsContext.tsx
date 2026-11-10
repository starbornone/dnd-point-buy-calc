
import { AttributeState } from "@/types/race";
import { POINT_BUY_BUDGET } from "@/utils/calculatePointCost";
import { defaultAttributes } from "@/utils/characterBuild";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface StatsContextType {
  attributes: AttributeState;
  setAttributes: (
    attributes: AttributeState | ((prev: AttributeState) => AttributeState)
  ) => void;
  pointBudget: number;
  setPointBudget: (budget: number) => void;
  loadStats: (attributes: AttributeState, budget: number) => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [attributes, setAttributes] = useState<AttributeState>(defaultAttributes);
  const [pointBudget, setPointBudget] = useState(POINT_BUY_BUDGET);

  const loadStats = useCallback((next: AttributeState, budget: number) => {
    setAttributes(next);
    setPointBudget(budget);
  }, []);

  const value = useMemo(
    () => ({
      attributes,
      setAttributes,
      pointBudget,
      setPointBudget,
      loadStats,
    }),
    [attributes, pointBudget, loadStats]
  );

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
};
