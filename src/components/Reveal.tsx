import { motion } from 'motion/react';
import type { ReactNode } from 'react';

export const EASE = [0.22, 1, 0.36, 1] as const;
// iOS-like spring: settles quickly with a hint of overshoot.
export const SPRING = { type: 'spring', bounce: 0.2, duration: 0.8 } as const;

type Props = { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'li' };

/** Springs content up the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, as = 'div' }: Props) {
  const Comp = as === 'li' ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </Comp>
  );
}

/** Every section shares one layout: the title above, content on the 12-column grid. */
export function Section({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section id={id} className="section">
      <div className="container grid section-grid">
        <h2 className="section-label">{label}</h2>
        <div className="section-body">{children}</div>
      </div>
    </section>
  );
}
