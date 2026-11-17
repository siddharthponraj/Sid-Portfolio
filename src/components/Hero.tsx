import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { certifications, profile, projectMeta } from '../data';
import { useLang } from '../i18n';
import { EASE } from './Reveal';

// three.js is split into its own chunk so the text paints first.
const Stack = lazy(() => import('./Stack'));

export default function Hero() {
  const { t, lang, locale } = useLang();
  const [y, m] = profile.joined.split('-').map(Number);
  const joined = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(new Date(y, m - 1, 1));
  const facts = [
    { value: joined, label: t.hero.facts.joined },
    { value: String(projectMeta.length), label: t.hero.facts.projects },
    { value: String(certifications.length), label: t.hero.facts.certs },
    { value: profile.cgpa, label: t.hero.facts.cgpa },
  ];

  return (
    <section id="top" className="hero">
      <div className="container grid hero-grid">
        <div className="hero-copy">
          <motion.p
            className="kicker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            {t.hero.kicker}
          </motion.p>

          {/* key on lang replays the reveal when the language changes */}
          <h1 className="hero-title" key={lang}>
            <span className="line-mask">
              <motion.span
                className="line"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              >
                {t.hero.name}
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          >
            <p className="hero-role">{t.hero.role}</p>
            <p className="hero-lede">{t.hero.lede}</p>
            <div className="hero-cta">
              <a href="#work" className="btn">
                {t.hero.cta}
              </a>
              <a href="#contact" className="btn btn-ghost">
                {t.nav.contact}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
        >
          <Suspense fallback={null}>
            <Stack />
          </Suspense>
        </motion.div>

        <motion.dl
          className="hero-facts"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
        >
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="meta">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
