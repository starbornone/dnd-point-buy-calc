import { Race } from "../types/race";

/**
 * Generates race options for the select dropdown
 * @param racialInfo - Array of Race objects
 */
export const getRaceSelect = (racialInfo: Race[]): string => {
  let raceSelect =
    `<select class="form-control" id="race" name="race">` +
    `<option value="---" disabled selected>Please select a race</option>`;

  racialInfo.forEach((race) => {
    raceSelect += `<option value="${race.name}">${race.name}</option>`;
  });

  raceSelect += `</select>`;
  return raceSelect;
};

/**
 * Resets racial attributes
 */
export const resetRacialAbilityScores = (
  setState: (state: Partial<Record<string, number>>) => void
) => {
  setState({
    racialStr: 0,
    racialDex: 0,
    racialCon: 0,
    racialInt: 0,
    racialWis: 0,
    racialCha: 0,
  });
};
