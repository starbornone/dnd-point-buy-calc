"use client";

import { NativeSelect } from "@/components/ui/native-select";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { isLocale } from "@/i18n/locale";

export const LanguageSelect = () => {
  const { locale, setLocale } = useLocale();
  const copy = useMessages();

  return (
    <NativeSelect
      id="language"
      aria-label={copy.language}
      className="border-gray-500"
      value={locale}
      onChange={(event) => {
        const next = event.target.value;
        if (isLocale(next)) setLocale(next);
      }}
    >
      <option value="en">English</option>
      <option value="zh">中文</option>
      <option value="es">Español</option>
    </NativeSelect>
  );
};
