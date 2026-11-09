import type { Metadata } from "next";
import { messages } from "@/i18n/messages";
import { DEFAULT_LOCALE, htmlLang, Locale, LOCALES } from "@/i18n/locale";
import { absoluteUrl, getSiteUrl, localeCanonicalPath, localeCanonicalUrl } from "@/lib/site";

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
    "标准属性",
    "角色创建",
  ],
};

export function buildMetadata(locale: Locale): Metadata {
  const copy = messages[locale];
  const canonical = localeCanonicalUrl(locale);
  const languageAlternates = Object.fromEntries(
    LOCALES.map((code) => [htmlLang(code), absoluteUrl(localeCanonicalPath(code))])
  );

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: copy.title,
      template: `%s · ${copy.title}`,
    },
    description: copy.description,
    applicationName: copy.title,
    keywords: keywordsByLocale[locale],
    authors: [{ name: "Starmist Studio", url: "https://starmist.studio/" }],
    creator: "Starmist Studio",
    publisher: "Starmist Studio",
    category: "games",
    alternates: {
      canonical,
      languages: {
        ...languageAlternates,
        "x-default": absoluteUrl(localeCanonicalPath(DEFAULT_LOCALE)),
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: copy.title,
      title: copy.title,
      description: copy.description,
      locale: htmlLang(locale),
      alternateLocale: LOCALES.filter((code) => code !== locale).map(htmlLang),
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
    },
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
