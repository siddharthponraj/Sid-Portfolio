import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { languages, useLang } from '../i18n';

/**
 * Custom language dropdown following the WAI-ARIA listbox pattern:
 * a button that opens a listbox; arrows / Home / End move, Enter / Space choose,
 * Escape or Tab close, and focus returns to the button.
 */
export default function LanguageMenu() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const current = languages.findIndex((l) => l.code === lang);
  const [active, setActive] = useState(current);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();

  const openMenu = (index = current) => {
    setActive(index);
    setOpen(true);
  };
  const close = (focusButton = true) => {
    setOpen(false);
    if (focusButton) button.current?.focus();
  };
  const choose = (index: number) => {
    setLang(languages[index].code);
    close();
  };

  useEffect(() => {
    if (!open) return;
    list.current?.focus();
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  const onButtonKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      openMenu(e.key === 'ArrowUp' ? languages.length - 1 : current);
    }
  };

  const onListKey = (e: KeyboardEvent) => {
    const last = languages.length - 1;
    const keys: Record<string, () => void> = {
      ArrowDown: () => setActive((i) => Math.min(i + 1, last)),
      ArrowUp: () => setActive((i) => Math.max(i - 1, 0)),
      Home: () => setActive(0),
      End: () => setActive(last),
      Enter: () => choose(active),
      ' ': () => choose(active),
      Escape: () => close(),
    };
    if (e.key === 'Tab') return close(false);
    const fn = keys[e.key];
    if (fn) {
      e.preventDefault();
      fn();
    }
  };

  return (
    <div className="lang" ref={root}>
      <button
        ref={button}
        type="button"
        className="lang-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={`${t.nav.language}: ${languages[current].label}`}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onButtonKey}
      >
        <span className="lang-code">{languages[current].short}</span>
        <svg className="lang-chevron" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {open && (
        <ul
          ref={list}
          id={`${id}-list`}
          className="lang-list"
          role="listbox"
          tabIndex={-1}
          aria-label={t.nav.language}
          aria-activedescendant={`${id}-opt-${active}`}
          onKeyDown={onListKey}
        >
          {languages.map((l, i) => (
            <li
              key={l.code}
              id={`${id}-opt-${i}`}
              role="option"
              lang={l.code}
              aria-selected={l.code === lang}
              className={`lang-option${i === active ? ' is-active' : ''}`}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(i)}
            >
              <span className="lang-option-code" aria-hidden="true">
                {l.short}
              </span>
              <span>{l.label}</span>
              {l.code === lang && (
                <svg className="lang-check" width="12" height="10" viewBox="0 0 12 10" aria-hidden="true">
                  <path d="M1 5l3.5 3.5L11 1" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
