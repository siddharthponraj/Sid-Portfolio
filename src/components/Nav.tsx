import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import TabBar from './TabBar';
import { profile } from '../data';
import { useLang } from '../i18n';
import LanguageMenu from './LanguageMenu';
import ThemeToggle from './ThemeToggle';
import Icon, { type IconName } from './Icon';
import { SPRING } from './Reveal';

const ids = ['about', 'experience', 'work', 'skills', 'contact'] as const;
const tabIcons: Record<(typeof ids)[number], IconName> = {
  about: 'user',
  experience: 'briefcase',
  work: 'grid',
  skills: 'stack',
  contact: 'chat',
};
const DESKTOP = 1100; // keep in sync with the nav breakpoint in styles.css

export default function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While scrolling to a chosen section, ignore the sections passed on the way
  // so the tab pill doesn't flicker across them.
  const pending = useRef<string | null>(null);
  const pendingTimer = useRef(0);
  const select = (id: string) => {
    setActive(id);
    pending.current = id;
    clearTimeout(pendingTimer.current);
    pendingTimer.current = window.setTimeout(() => (pending.current = null), 1200);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };

  // Highlight the section crossing the middle of the viewport.
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((s): s is HTMLElement => !!s);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const id = e.target.id;
          if (pending.current && pending.current !== id) return;
          if (!e.isIntersecting) {
            // Back in the hero (or between sections): nothing is highlighted.
            setActive((a) => (a === id ? '' : a));
            return;
          }
          pending.current = null;
          setActive(id);
        }),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Like iOS: the small title appears only once the section's large title has scrolled under the bar.
  const [titleOn, setTitleOn] = useState(false);
  useEffect(() => {
    const label = active ? document.querySelector(`#${active} .section-label`) : null;
    const check = () => setTitleOn(!!label && label.getBoundingClientRect().bottom < 72);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, [active]);
  // In the hero (no section active) the bar is titled "Portfolio".
  const title = !active ? 'top' : titleOn ? active : '';

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > DESKTOP && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`nav${scrolled || open ? ' is-solid' : ''}`}>
        <div className="container grid nav-grid">
          {/* Phone only: the current section's name, like an iOS navigation title. Tap to go to the top. */}
          <a href="#top" className="nav-title" aria-hidden={!title} tabIndex={title ? 0 : -1}>
            <AnimatePresence mode="popLayout" initial={false}>
              {title && (
                <motion.span
                  key={title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={SPRING}
                >
                  {title === 'top' ? t.hero.kicker : t.nav[title as (typeof ids)[number]]}
                </motion.span>
              )}
            </AnimatePresence>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {ids.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  select(id);
                }}
              >
                {active === id && <motion.span layoutId="nav-pill" className="nav-pill" transition={SPRING} />}
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <ThemeToggle />
            <LanguageMenu />
            <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-sm nav-resume" aria-label={t.nav.resume}>
              <Icon name="download" size={16} />
              <span className="nav-resume-text">{t.nav.resume}</span>
            </a>
            <button
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
      </header>

      {/* Phone only: app-style tab bar. Outside the header so it can sit at the bottom. */}
      <TabBar
        label={t.nav.sections}
        items={ids.map((id) => ({ id, label: t.nav[id], icon: tabIcons[id] }))}
        active={active}
        onSelect={select}
      />

      {/* Outside the header: its backdrop-filter would otherwise trap this fixed layer. */}
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav className="container" aria-label="Mobile">
          {ids.map((id) => (
            <a key={id} href={`#${id}`} onClick={close}>
              {t.nav[id]}
            </a>
          ))}
          <a href={profile.resume} target="_blank" rel="noopener" onClick={close}>
            {t.nav.resume}
          </a>
        </nav>
      </div>
    </>
  );
}
