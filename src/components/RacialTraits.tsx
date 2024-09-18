"use client";

import { useRace } from "@/context/RaceContext";
import {
  aasimar,
  changeling,
  dragonborn,
  dwarf,
  elf,
  gnome,
  halfElf,
  halfling,
  halfOrc,
  human,
  shifter,
  tiefling,
} from "@/data";
import { Race } from "@/types/race";
import { mergeRaceAndVariant } from "@/utils";

const raceData: { [key: string]: Race } = {
  aasimar,
  changeling,
  dragonborn,
  dwarf,
  elf,
  gnome,
  halfElf,
  halfling,
  halfOrc,
  human,
  shifter,
  tiefling,
};

const defaultTraits: Race = {
  name: "",
  ability: "",
  age: "",
  alignment: "",
  size: "",
  speed: "",
  language: "",
  other: [],
};

export const RacialTraits = () => {
  const { selectedRace, selectedVariant } = useRace();

  const baseRaceTraits = raceData[selectedRace] || defaultTraits;

  const selectedRaceTraits = mergeRaceAndVariant(
    baseRaceTraits,
    selectedVariant
  );

  return (
    <div className="bg-lightGray p-4 mt-4 rounded">
      <h2 className="font-bold">Racial Traits</h2>
      {selectedRace ? (
        <>
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              <dl>
                <dt>Ability Score Increase:</dt>
                <dd>{selectedRaceTraits.ability}</dd>
                <dt>Age:</dt>
                <dd>{selectedRaceTraits.age}</dd>
                <dt>Alignment:</dt>
                <dd>{selectedRaceTraits.alignment}</dd>
                <dt>Size:</dt>
                <dd>{selectedRaceTraits.size}</dd>
                <dt>Speed:</dt>
                <dd>{selectedRaceTraits.speed}</dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt>Languages:</dt>
                <dd>{selectedRaceTraits.language}</dd>
                {selectedRaceTraits.other.map((trait, index) => {
                  if (index % 2 === 0) {
                    return <dt key={index}>{trait}:</dt>;
                  }
                  return <dd key={index}>{trait}</dd>;
                })}
              </dl>
            </div>
          </div>
        </>
      ) : (
        <p>Please select a race to see the racial traits.</p>
      )}
    </div>
  );
};
