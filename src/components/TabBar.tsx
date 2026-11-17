import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { animate, motion, useMotionValue } from 'motion/react';
import Icon, { type IconName } from './Icon';
import { SPRING } from './Reveal';

type Item = { id: string; label: string; icon: IconName };
type Props = { items: Item[]; active: string; onSelect: (id: string) => void; label: string };

const PAD = 6; // keep in sync with .tabbar padding
const DRAG_START = 6; // px of horizontal movement before a touch becomes a drag

/**
 * Phone tab bar in the style of iOS "liquid glass":
 * - a glass pill springs to the active tab;
 * - press and slide across the bar and the pill lifts into a lens that follows
 *   your finger, then snaps to the nearest tab and goes there on release;
 * - the bar tucks its labels away while you scroll down and returns on scroll up.
 */
export default function TabBar({ items, active, onSelect, label }: Props) {
  const bar = useRef<HTMLElement>(null);
  const x = useMotionValue(PAD);
  const [slot, setSlot] = useState(0); // width of one tab
  const [lens, setLens] = useState<number | null>(null); // tab under the finger while dragging
  const [compact, setCompact] = useState(false);
  const gesture = useRef<{ startX: number; left: number; dragging: boolean } | null>(null);
  const swallowClick = useRef(false);
  const index = items.findIndex((i) => i.id === active);

  // Measure one tab's width.
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSlot((el.clientWidth - PAD * 2) / items.length));
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  // Spring the pill to the active tab whenever we are not dragging. When only the
  // bar's size changed (it shrinks on scroll), follow it directly instead of re-springing.
  const placed = useRef(-1);
  useEffect(() => {
    if (lens !== null || !slot || index < 0) return;
    const target = PAD + index * slot;
    if (placed.current === index) {
      x.set(target);
      return;
    }
    placed.current = index;
    const c = animate(x, target, SPRING);
    return () => c.stop();
  }, [index, slot, lens, x]);

  // Tuck the labels away while scrolling down; bring them back on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setCompact(y > last && y > 240);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nearest = (pos: number) => Math.min(items.length - 1, Math.max(0, Math.round((pos - PAD) / slot)));

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    swallowClick.current = false;
    gesture.current = { startX: e.clientX, left: bar.current!.getBoundingClientRect().left, dragging: false };
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const g = gesture.current;
    if (!g || !slot) return;
    if (!g.dragging) {
      if (Math.abs(e.clientX - g.startX) < DRAG_START) return;
      g.dragging = true;
      bar.current!.setPointerCapture(e.pointerId);
      setCompact(false);
    }
    const pos = Math.min(PAD + (items.length - 1) * slot, Math.max(PAD, e.clientX - g.left - slot / 2));
    x.set(pos);
    setLens(nearest(pos));
  };

  const end = (commit: boolean) => {
    const g = gesture.current;
    gesture.current = null;
    if (!g?.dragging) return;
    swallowClick.current = true; // the click that follows a drag is not a tap
    const i = nearest(x.get());
    placed.current = -1; // spring from the lens to the chosen tab
    setLens(null);
    if (commit) onSelect(items[i].id);
  };

  const onTap = (e: MouseEvent, id: string) => {
    e.preventDefault();
    if (swallowClick.current) {
      swallowClick.current = false;
      return;
    }
    onSelect(id);
  };

  return (
    <nav
      ref={bar}
      className={`tabbar${compact ? ' is-compact' : ''}${lens !== null ? ' is-dragging' : ''}`}
      aria-label={label}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={() => end(true)}
      onPointerCancel={() => end(false)}
    >
      <motion.span
        className="tab-pill"
        aria-hidden="true"
        style={{ x, width: slot }}
        initial={false}
        animate={{ opacity: index < 0 && lens === null ? 0 : 1, scale: lens !== null ? 1.14 : 1 }}
        transition={SPRING}
      />
      {items.map((item, i) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`tab${lens === i ? ' is-lensed' : ''}`}
          aria-current={active === item.id ? 'true' : undefined}
          onClick={(e) => onTap(e, item.id)}
          draggable={false}
        >
          <Icon name={item.icon} size={22} />
          <span className="tab-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
