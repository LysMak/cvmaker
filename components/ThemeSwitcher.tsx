'use client';

import { useEffect, useState } from 'react';

const THEMES = [
  { id: 'light', icon: '☀', label: 'Light' },
  { id: 'dim', icon: '◐', label: 'Dim' },
  { id: 'dark', icon: '☾', label: 'Dark' },
] as const;

type ThemeId = (typeof THEMES)[number]['id'];

const BRIGHTNESS_MIN = 60;
const BRIGHTNESS_MAX = 140;
const BRIGHTNESS_DEFAULT = 100;

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>('light');
  const [brightness, setBrightness] = useState(BRIGHTNESS_DEFAULT);

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as ThemeId | null;
    if (current) setTheme(current);

    try {
      const storedBrightness = Number(localStorage.getItem('brightness'));
      if (storedBrightness) setBrightness(storedBrightness);
    } catch {
      // ignore
    }
  }, []);

  function applyTheme(id: ThemeId) {
    setTheme(id);
    if (id === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', id);
    }
    try {
      localStorage.setItem('theme', id);
    } catch {
      // ignore (private browsing, storage disabled, ...)
    }
    applyBrightness(BRIGHTNESS_DEFAULT);
  }

  function applyBrightness(value: number) {
    setBrightness(value);
    document.documentElement.style.filter = value === 100 ? '' : `brightness(${value}%)`;
    try {
      localStorage.setItem('brightness', String(value));
    } catch {
      // ignore
    }
  }

  return (
    <div className="theme-switch" role="group" aria-label="Theme and brightness">
      <div className="theme-switch__buttons">
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-label={t.label}
            aria-pressed={theme === t.id}
            className={theme === t.id ? 'is-active' : undefined}
            onClick={() => applyTheme(t.id)}
          >
            {t.icon}
          </button>
        ))}
      </div>
      <input
        type="range"
        className="theme-switch__brightness"
        min={BRIGHTNESS_MIN}
        max={BRIGHTNESS_MAX}
        value={brightness}
        onChange={(e) => applyBrightness(Number(e.target.value))}
        aria-label="Brightness"
        title={`Brightness: ${brightness}%`}
      />
    </div>
  );
}
