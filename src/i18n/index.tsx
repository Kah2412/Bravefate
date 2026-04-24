import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import pt from "@/locales/pt.json";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

export type Locale = "pt" | "en" | "es";

type TranslationValue = string | number | boolean | null | TranslationObject | TranslationValue[];
type TranslationObject = { [key: string]: TranslationValue };
type Params = Record<string, string | number>;

const STORAGE_KEY = "brave-language";
const DEFAULT_LOCALE: Locale = "pt";

const messages = { pt, en, es } as const;

const localeMap: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

const getInitialLocale = (): Locale => {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "pt" || stored === "en" || stored === "es" ? stored : DEFAULT_LOCALE;
};

let currentLocale: Locale = getInitialLocale();

const resolvePath = (key: string, locale: Locale): TranslationValue | undefined =>
  key.split(".").reduce<TranslationValue | undefined>((accumulator, part) => {
    if (accumulator && typeof accumulator === "object" && !Array.isArray(accumulator) && part in accumulator) {
      return (accumulator as TranslationObject)[part];
    }

    return undefined;
  }, messages[locale] as TranslationValue);

const interpolate = (value: string, params?: Params) =>
  value.replace(/\{(\w+)\}/g, (_, token) => String(params?.[token] ?? `{${token}}`));

export const setLocale = (locale: Locale) => {
  currentLocale = locale;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, locale);
  }

  if (typeof document !== "undefined") {
    document.documentElement.lang = localeMap[locale];
  }
};

export const getLocale = () => currentLocale;

export const translate = (key: string, params?: Params): string => {
  const value = resolvePath(key, currentLocale) ?? resolvePath(key, DEFAULT_LOCALE);

  if (typeof value === "string") {
    return interpolate(value, params);
  }

  if (typeof value === "number") {
    return String(value);
  }

  return key;
};

export const getRawTranslation = <T,>(key: string): T =>
  (resolvePath(key, currentLocale) ?? resolvePath(key, DEFAULT_LOCALE)) as T;

interface I18nContextValue {
  language: Locale;
  setLanguage: (locale: Locale) => void;
  t: (key: string, params?: Params) => string;
  raw: <T,>(key: string) => T;
  formatDate: (value: string | number | Date) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Locale>(() => getInitialLocale());

  useEffect(() => {
    setLocale(language);
  }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: (key, params) => {
        const previous = currentLocale;
        currentLocale = language;
        const result = translate(key, params);
        currentLocale = previous;
        return result;
      },
      raw: <T,>(key: string) => {
        const previous = currentLocale;
        currentLocale = language;
        const result = getRawTranslation<T>(key);
        currentLocale = previous;
        return result;
      },
      formatDate: (value) => new Intl.DateTimeFormat(localeMap[language]).format(new Date(value)),
    }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
};
