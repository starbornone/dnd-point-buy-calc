import type { MetadataRoute } from "next";
import { htmlLang, LOCALES } from "@/i18n/locale";
import { absoluteUrl, localeCanonicalPath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.map((locale) => {
    const path = localeCanonicalPath(locale);
    return {
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: locale === "en" ? 1 : 0.9,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((code) => [htmlLang(code), absoluteUrl(localeCanonicalPath(code))])
        ),
      },
    };
  });
}
