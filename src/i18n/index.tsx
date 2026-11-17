import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { en, type Content } from './en';
import { ta } from './ta';
import { hi } from './hi';

export const languages = [
  { code: 'en', short: 'EN', label: 'English', locale: 'en-GB', content: en },
  { code: 'ta', short: 'TA', label: 'தமிழ்', locale: 'ta-IN', content: ta },
  { code: 'hi', short: 'HI', label: 'हिन्दी', locale: 'hi-IN', content: hi },
] as const;

export type Lang = (typeof languages)[number]['code'];

const STORAGE_KEY = 'lang';
export const isLang = (v: unknown): v is Lang => languages.some((l) => l.code === v);

// English is the default for every first visit; only an explicit choice is remembered.
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* storage blocked — fall back to English */
  }
  return 'en';
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Content; locale: string };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const entry = languages.find((l) => l.code === lang)!;

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  // Keep <html lang>, the tab title and the meta description in sync.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = entry.content.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', entry.content.meta.description);
  }, [lang, entry]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: entry.content, locale: entry.locale }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
