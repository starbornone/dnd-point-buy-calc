import { DEFAULT_LOCALE, Locale, LOCALE_PARAM } from "@/i18n/locale";

/** Canonical site origin for metadata, sitemap, and JSON-LD. */
export function getSiteUrl(): string {
  const explicit = import.meta.env.VITE_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel =
    import.meta.env.VITE_VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    import.meta.env.VITE_VERCEL_URL?.trim();
  if (vercel) {
    return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  }

  return "https://dnd.starmist.studio";
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Clean URL for a locale — omits build-share query params. */
export function localeCanonicalPath(locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return "/";
  return `/?${LOCALE_PARAM}=${locale}`;
}

export function localeCanonicalUrl(locale: Locale): string {
  return absoluteUrl(localeCanonicalPath(locale));
}
