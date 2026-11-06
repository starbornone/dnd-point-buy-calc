"use client";

import { messages } from "@/i18n/messages";
import { DEFAULT_LOCALE, Locale } from "@/i18n/locale";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface LocaleValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleValue | null>(null);

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const setLocale = useCallback((next: Locale) => {
    setLocaleState((current) => (current === next ? current : next));
  }, []);
  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = (): LocaleValue => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
};

export const useMessages = () => messages[useLocale().locale];

export const LocaleDocument = () => {
  const { locale } = useLocale();

  useEffect(() => {
    const apply = () => {
      document.documentElement.lang = locale;
      const title = messages[locale].title;
      if (document.title !== title) document.title = title;
      const description = document.querySelector('meta[name="description"]');
      const content = messages[locale].description;
      if (description?.getAttribute("content") !== content) {
        description?.setAttribute("content", content);
      }
    };

    apply();
    const titleNode = document.querySelector("title");
    if (!titleNode) return;
    const observer = new MutationObserver(apply);
    observer.observe(titleNode, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [locale]);

  return null;
};
