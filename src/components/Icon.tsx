import { useId } from 'react';
import {
  siCss,
  siDart,
  siCapacitor,
  siDotnet,
  siExpress,
  siFigma,
  siFlutter,
  siGit,
  siGithub,
  siGooglecloud,
  siHtml5,
  siInstagram,
  siJavascript,
  siJest,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSupabase,
  siTensorflow,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
  siWhatsapp,
  type SimpleIcon,
} from 'simple-icons';

// Brand logos come from simple-icons (filled, brand colour).
const brands = {
  react: siReact,
  typescript: siTypescript,
  javascript: siJavascript,
  html: siHtml5,
  css: siCss,
  mysql: siMysql,
  nodejs: siNodedotjs,
  postgresql: siPostgresql,
  java: siOpenjdk,
  python: siPython,
  dotnet: siDotnet,
  figma: siFigma,
  flutter: siFlutter,
  dart: siDart,
  tensorflow: siTensorflow,
  git: siGit,
  github: siGithub,
  instagram: siInstagram,
  whatsapp: siWhatsapp,
  vite: siVite,
  express: siExpress,
  redis: siRedis,
  supabase: siSupabase,
  capacitor: siCapacitor,
  googlecloud: siGooglecloud,
  jest: siJest,
  vitest: siVitest,
  vercel: siVercel,
} satisfies Record<string, SimpleIcon>;

// Concepts and brands simple-icons doesn't carry are drawn as 24px line icons.
const lines = {
  csharp: 'M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5zM14.5 9.2a3.2 3.2 0 1 0 0 5.6M16.6 9.5v5M18.6 9.5v5M15.8 11h3.6M15.8 13h3.6',
  api: 'M8 4H7a2 2 0 0 0-2 2v3.5L3.5 12 5 14.5V18a2 2 0 0 0 2 2h1M16 4h1a2 2 0 0 1 2 2v3.5l1.5 2.5-1.5 2.5V18a2 2 0 0 1-2 2h-1',
  lock: 'M6 10.5h12v9.5H6zM8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3M12 14.5v2',
  hash: 'M9.5 4l-2 16M16.5 4l-2 16M5 9h15M4 15h15',
  key: 'M14.5 4.5a5 5 0 1 1-4.2 7.7L4 18.5V20h3v-2h2v-2h2l1.3-1.3M16 8h.01',
  layout: 'M4 4h16v16H4zM4 9h16M10 9v11',
  wireframe: 'M4 4h16v16H4zM4 4l16 16M20 4L4 20',
  cursor: 'M5 4l13 6-5.5 1.8L10.7 17.5zM12.5 11.8L18 18',
  loop: 'M4 12a8 8 0 0 1 13.7-5.6L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.6L4 15.5M4 20v-4.5h4.5',
  cloud: 'M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 17.9 9a4.75 4.75 0 0 1-.4 9.5z',
  linkedin: 'M4 4h16v16H4zM8 10.5V16M8 7.8v.01M11.5 16v-5.5M11.5 13a2.5 2.5 0 0 1 5 0V16',
  mail: 'M3.5 5.5h17v13h-17zM3.5 6l8.5 7 8.5-7',
  phone: 'M8.6 3.5H5.8A1.8 1.8 0 0 0 4 5.4 15 15 0 0 0 18.6 20a1.8 1.8 0 0 0 1.9-1.8v-2.8l-3.9-1.6-1.9 1.9a11 11 0 0 1-5.4-5.4l1.9-1.9z',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrow: 'M7 17L17 7M8 7h9v9',
  download: 'M12 4v11M7 10.5l5 5 5-5M5 19.5h14',
  user: 'M12 11.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5zM4.75 20c0-3.6 3.25-6 7.25-6s7.25 2.4 7.25 6',
  briefcase: 'M5 7.5h14a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2zM9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5',
  grid: 'M3 7a2 2 0 0 1 2-2h4.2l2 2.2H19a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  stack: 'M12 3.75l8.25 4.25L12 12.25 3.75 8zM3.75 12L12 16.25 20.25 12M3.75 16L12 20.25 20.25 16',
  chat: 'M5 5.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z',
};

// Solid shapes behind some outline icons; CSS fades them in for the "filled" state (like SF Symbols' .fill).
const fills: Partial<Record<keyof typeof lines, string>> = {
  user: 'M12 11.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5zM4.75 20c0-3.6 3.25-6 7.25-6s7.25 2.4 7.25 6z',
  briefcase: 'M5 7.5h14a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2z',
  grid: 'M3 7a2 2 0 0 1 2-2h4.2l2 2.2H19a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  stack: 'M12 3.75l8.25 4.25L12 12.25 3.75 8z',
  chat: 'M5 5.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z',
};

// Inner lines: drawn as strokes in the outline state, cut out of the solid shape in the filled state.
const details: Partial<Record<keyof typeof lines, string>> = {
  briefcase: 'M3 13h18',
  grid: 'M3 9.5h18',
  chat: 'M3.5 7.5l8.5 6 8.5-6',
};

export type IconName = keyof typeof brands | keyof typeof lines;

// Brand colours that would vanish on the page (near-black) fall back to the text colour.
const luminance = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export default function Icon({ name, size = 18, mono = false }: { name: IconName; size?: number; mono?: boolean }) {
  const maskId = `cut${useId().replace(/[^\w-]/g, '')}`;
  if (name in brands) {
    const b = brands[name as keyof typeof brands];
    const l = luminance(b.hex);
    const brand = !mono && l > 0.08;
    // Dark brand colours (e.g. .NET purple) get lifted in dark mode via .icon-dim.
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={brand && l < 0.45 ? 'icon icon-dim' : 'icon'}>
        <path d={b.path} fill={brand ? `#${b.hex}` : 'currentColor'} />
      </svg>
    );
  }
  const key = name as keyof typeof lines;
  const fill = fills[key];
  const detail = details[key];
  const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="icon">
      {detail && (
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <path d={detail} {...stroke} stroke="black" />
        </mask>
      )}
      {fill && <path className="icon-fill" d={fill} fill="currentColor" mask={detail ? `url(#${maskId})` : undefined} />}
      <path d={lines[key]} {...stroke} />
      {detail && <path className="icon-detail" d={detail} {...stroke} />}
    </svg>
  );
}
