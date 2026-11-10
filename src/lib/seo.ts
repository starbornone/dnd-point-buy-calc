import { messages } from "@/i18n/messages";
import { DEFAULT_LOCALE, htmlLang, Locale, LOCALES } from "@/i18n/locale";
import { absoluteUrl, localeCanonicalPath, localeCanonicalUrl } from "@/lib/site";

const keywordsByLocale: Record<Locale, string[]> = {
  en: [
    "D&D 5e",
    "Dungeons & Dragons",
    "point buy calculator",
    "ability scores",
    "racial bonuses",
    "standard array",
    "character creation",
  ],
  zh: [
    "D&D 5e",
    "龙与地下城",
    "购点计算器",
    "属性值",
    "种族加成",
    "标准数组",
    "角色创建",
  ],
};

export type DocumentMeta = {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  languageAlternates: Record<string, string>;
  socialImage: string;
  openGraphLocale: string;
  openGraphAlternateLocales: string[];
};

export function buildDocumentMeta(locale: Locale): DocumentMeta {
  const copy = messages[locale];
  const canonical = localeCanonicalUrl(locale);
  const socialImage = absoluteUrl("/opengraph-image.svg");
  const languageAlternates = Object.fromEntries(
    LOCALES.map((code) => [htmlLang(code), absoluteUrl(localeCanonicalPath(code))])
  );

  return {
    title: copy.title,
    description: copy.description,
    keywords: keywordsByLocale[locale],
    canonical,
    languageAlternates: {
      ...languageAlternates,
      "x-default": absoluteUrl(localeCanonicalPath(DEFAULT_LOCALE)),
    },
    socialImage,
    openGraphLocale: htmlLang(locale),
    openGraphAlternateLocales: LOCALES.filter((code) => code !== locale).map(htmlLang),
  };
}

export function buildJsonLd(locale: Locale) {
  const copy = messages[locale];
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: copy.title,
    description: copy.description,
    url: localeCanonicalUrl(locale),
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: LOCALES.map(htmlLang),
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Starmist Studio",
      url: "https://starmist.studio/",
    },
  };
}
