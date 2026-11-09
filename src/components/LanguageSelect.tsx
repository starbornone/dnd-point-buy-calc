"use client";

import { NativeSelect } from "@/components/ui/native-select";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { isLocale, PLANNED_LOCALES } from "@/i18n/locale";

const PLANNED_SORT = { ja: "Japanese", mk: "Macedonian", ru: "Russian" } as const;

const LOCALE_OPTIONS = [
  { code: "zh", name: "简体中文", sort: "Chinese", disabled: false },
  { code: "en", name: "English", sort: "English", disabled: false },
  ...PLANNED_LOCALES.map(({ code, name }) => ({
    code,
    name,
    sort: PLANNED_SORT[code],
    disabled: true,
  })),
].sort((a, b) => a.sort.localeCompare(b.sort, "en"));

export const LanguageSelect = () => {
  const { locale, setLocale } = useLocale();
  const copy = useMessages();

  return (
    <NativeSelect
      id="language"
      aria-label={copy.language}
      value={locale}
      onChange={(event) => {
        const next = event.target.value;
        if (isLocale(next)) setLocale(next);
      }}
    >
      {LOCALE_OPTIONS.map(({ code, name, disabled }) => (
        <option key={code} value={code} disabled={disabled}>
          {name}
        </option>
      ))}
    </NativeSelect>
  );
};
