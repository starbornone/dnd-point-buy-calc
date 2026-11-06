import { toolGroups, tools } from "@/data/tools";
import { Race, ToolChoice, Variant } from "@/types";

const toolNames: readonly string[] = tools;

export const resolveToolChoice = (
  race: Race | undefined,
  variant: Variant | undefined
): ToolChoice | undefined => {
  if (!race) return undefined;
  return variant?.toolChoice ?? race.toolChoice;
};

export const toolGroupsFor = (
  choice: ToolChoice
): { name: string; tools: readonly string[] }[] => {
  const allowed = new Set(choice.options ?? toolNames);
  return toolGroups
    .map((group) => ({
      name: group.name,
      tools: group.tools.filter((tool) => allowed.has(tool)),
    }))
    .filter((group) => group.tools.length > 0);
};

export const selectTool = (choice: ToolChoice | undefined, requested: string): string => {
  if (!choice || !toolNames.includes(requested)) return "";
  const allowed = choice.options ?? toolNames;
  return allowed.includes(requested) ? requested : "";
};
