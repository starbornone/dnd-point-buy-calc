"use client";

import { useSettings } from "@/context/SettingsContext";

export const AdvancedOptions = () => {
  const { settings, updateSettings } = useSettings();

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    updateSettings({ [key]: e.target.checked });
  };

  return (
    <div className="mt-4 bg-lightGray p-4 rounded">
      <h3 className="font-bold">Advanced Options</h3>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={settings.playersHandbook}
            onChange={(e) => handleCheckboxChange(e, "playersHandbook")}
          />
          Player&apos;s Handbook
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={settings.dungeonMastersGuide}
            onChange={(e) => handleCheckboxChange(e, "dungeonMastersGuide")}
          />
          Dungeon Master&apos;s Guide
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={settings.uaEberron}
            onChange={(e) => handleCheckboxChange(e, "uaEberron")}
          />
          Unearthed Arcana: Eberron
        </label>
      </div>
    </div>
  );
};
