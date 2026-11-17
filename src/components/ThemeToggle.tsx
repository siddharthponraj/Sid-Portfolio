import { useLang } from '../i18n';
import { useTheme } from '../theme';

/** Sun / moon switch. Both icons are drawn; CSS cross-fades and rotates them. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useLang();
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={dark ? t.nav.themeLight : t.nav.themeDark}
      aria-pressed={dark}
    >
      <svg className="icon-sun" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <svg className="icon-moon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
