/* =========================================================
   THEME.JS
   Light / Dark / System theme with localStorage persistence
   ========================================================= */

(function () {
  'use strict';

  const STORAGE_KEY = 'nr-theme';
  const THEMES = ['light', 'dark', 'system'];

  const root = document.documentElement;
  const button = document.getElementById('themeToggle');
  const iconEl = button ? button.querySelector('.theme-icon') : null;
  const labelEl = button ? button.querySelector('.theme-label') : null;

  function getStoredTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return THEMES.includes(saved) ? saved : 'system';
    } catch {
      return 'system';
    }
  }

  function saveTheme(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }

  function systemPrefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    const effective =
      theme === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : theme;

    if (effective === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }

    const icons = { light: '☀', dark: '◐', system: '⚙' };
    const labels = { light: 'Light', dark: 'Dark', system: 'System' };

    if (iconEl) iconEl.textContent = icons[theme] || '◐';
    if (labelEl) labelEl.textContent = labels[theme] || 'Theme';
    if (button) button.setAttribute('aria-label', `Theme: ${labels[theme]}`);
  }

  function nextTheme(current) {
    const index = THEMES.indexOf(current);
    return THEMES[(index + 1) % THEMES.length];
  }

  function init() {
    let current = getStoredTheme();
    applyTheme(current);

    if (button) {
      button.addEventListener('click', () => {
        current = nextTheme(current);
        saveTheme(current);
        applyTheme(current);
      });
    }

    // React to OS theme changes if user chose "system"
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (getStoredTheme() === 'system') applyTheme('system');
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();