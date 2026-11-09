"use client";

import { NativeSelect } from "@/components/ui/native-select";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { isLocale, PLANNED_LOCALES } from "@/i18n/locale";

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
      <option value="en">English</option>
      <option value="zh">简体中文</option>
      {PLANNED_LOCALES.map(({ code, name }) => (
        <option key={code} value={code} disabled>
          {name}
        </option>
      ))}
    </NativeSelect>
  );
};
