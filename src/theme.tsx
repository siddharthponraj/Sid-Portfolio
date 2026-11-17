import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const media = () => window.matchMedia('(prefers-color-scheme: dark)');

function stored(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

type Ctx = { theme: Theme; toggle: () => void };
const ThemeContext = createContext<Ctx | null>(null);

/**
 * Follows the device setting until the visitor picks a theme; after that the
 * choice is remembered. index.html applies the same rule before first paint.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<Theme | null>(stored);
  const [system, setSystem] = useState<Theme>(() => (media().matches ? 'dark' : 'light'));
  const theme = choice ?? system;

  useEffect(() => {
    const mq = media();
    const onChange = () => setSystem(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0f0f0e' : '#f4f3ef');
  }, [theme]);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setChoice(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
