/* ==========================================================================
   theme-toggle.js — Cambio entre tema claro y oscuro.
   Persiste la preferencia en localStorage y avisa al resto de módulos con
   el evento personalizado "themechange".
   ========================================================================== */
(() => {
  'use strict';

  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;
  const buttons = document.querySelectorAll('.theme-toggle');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  if (!buttons.length) return;

  const getTheme = () => (root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  const syncUI = (theme) => {
    const label = theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro';

    buttons.forEach((button) => {
      button.setAttribute('aria-label', label);
      button.title = label;
    });

    if (metaThemeColor) {
      const background = getComputedStyle(root).getPropertyValue('--color-background').trim();
      metaThemeColor.setAttribute('content', background);
    }
  };

  const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // Sin persistencia disponible: el cambio solo dura esta visita
    }

    syncUI(theme);
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      setTheme(getTheme() === 'light' ? 'dark' : 'light');
    });
  });

  syncUI(getTheme());
})();
