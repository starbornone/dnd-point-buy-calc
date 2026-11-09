export const LOCALES = ["en", "zh"] as const;

export const PLANNED_LOCALES = [
  { code: "ja", name: "日本語" },
  { code: "mk", name: "Македонски" },
  { code: "ru", name: "Русский" },
] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_PARAM = "lang";

export const isLocale = (value: string | null): value is Locale =>
  LOCALES.some((locale) => locale === value);

export const htmlLang = (locale: Locale): string => (locale === "zh" ? "zh-Hans" : locale);

export const readLocale = (search: string): Locale => {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search
  );
  const value = params.get(LOCALE_PARAM);
  return isLocale(value) ? value : DEFAULT_LOCALE;
};

export const withLocale = (query: string, locale: Locale): string => {
  const params = new URLSearchParams(query);
  if (locale === DEFAULT_LOCALE) params.delete(LOCALE_PARAM);
  else params.set(LOCALE_PARAM, locale);
  return params.toString();
};
