import { MotionConfig } from 'motion/react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Contact from './components/Contact';
import { About, Certifications, Experience, Skills, Work } from './components/Sections';
import { LangProvider, useLang } from './i18n';
import { ThemeProvider } from './theme';

function Page() {
  const { t } = useLang();
  return (
    <>
      <a href="#about" className="skip-link">
        {t.nav.skip}
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LangProvider>
          <Page />
        </LangProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
