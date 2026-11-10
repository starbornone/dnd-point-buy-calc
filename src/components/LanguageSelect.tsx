
import { NativeSelect } from "@/components/ui/native-select";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { isLocale } from "@/i18n/locale";

const LOCALE_OPTIONS = [
  { code: "zh", name: "简体中文", sort: "Chinese" },
  { code: "en", name: "English", sort: "English" },
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
      {LOCALE_OPTIONS.map(({ code, name }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </NativeSelect>
  );
};
