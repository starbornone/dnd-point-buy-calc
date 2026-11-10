
import { NativeSelect } from "@/components/ui/native-select";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { raceData } from "@/data/raceData";
import { raceDropdown } from "@/data/raceDropdown";
import { raceLabel, variantLabel } from "@/i18n/names";

export const RaceSelector = () => {
  const { locale } = useLocale();
  const copy = useMessages();
  const { selectedRace, setSelectedRace, selectedVariant, setSelectedVariant } =
    useRace();
  const availableVariants =
    raceData[selectedRace]?.variants?.map((variant) => variant.name) ?? [];

  const handleRaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRace(e.target.value);
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariant(e.target.value);
  };

  return (
    <>
      <div className="min-w-0">
        <label htmlFor="race" className="mb-2 block font-bold">
          {copy.selectRace}
        </label>
        <NativeSelect
          id="race"
          value={selectedRace}
          onChange={handleRaceChange}
        >
          <option value="" disabled>
            {copy.selectRacePlaceholder}
          </option>
          {raceDropdown.map((race) => (
            <option key={race.value} value={race.value}>
              {raceLabel(locale, race.value)}
            </option>
          ))}
        </NativeSelect>
      </div>
      {availableVariants.length > 0 && (
        <div className="min-w-0">
          <label htmlFor="variant" className="mb-2 block font-bold">
            {copy.selectVariant}
          </label>
          <NativeSelect
            id="variant"
            value={selectedVariant}
            onChange={handleVariantChange}
          >
            {selectedRace === "human" ? null : (
              <option value="" disabled>
                {copy.selectVariantPlaceholder}
              </option>
            )}
            {availableVariants.map((variant) => (
              <option key={variant} value={variant}>
                {variantLabel(locale, variant)}
              </option>
            ))}
          </NativeSelect>
        </div>
      )}
    </>
  );
};
