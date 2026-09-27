/* ==========================================================================
   design-tokens.js — Interactividad de la página Design System.
   - Lee el valor REAL de cada token desde CSS (se actualiza al cambiar de tema).
   - Copia el nombre de un token al portapapeles.
   - Demos de chips y notificaciones.
   ========================================================================== */
(() => {
  'use strict';

  const root = document.documentElement;
  const valueElements = document.querySelectorAll('[data-token-value]');

  // 1. Valores en vivo: garantiza que la documentación coincide con el CSS
  const refreshTokenValues = () => {
    const styles = getComputedStyle(root);
    valueElements.forEach((element) => {
      const value = styles.getPropertyValue(element.dataset.tokenValue).trim();
      if (value) element.textContent = value;
    });
  };

  refreshTokenValues();
  document.addEventListener('themechange', refreshTokenValues);

  // 2. Copiar token
  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;

    const text = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      window.Portfolio?.toast(`Copiado: ${text}`, 'success');
    } catch (error) {
      window.Portfolio?.toast('No se pudo copiar; selecciona el texto manualmente.', 'error');
    }
  });

  // 3. Demo de chips (selección única)
  document.querySelectorAll('[data-chip-demo]').forEach((group) => {
    group.addEventListener('click', (event) => {
      const chip = event.target.closest('.chip');
      if (!chip) return;
      group.querySelectorAll('.chip').forEach((item) => {
        item.setAttribute('aria-pressed', String(item === chip));
      });
    });
  });

  // 4. Demo de notificaciones
  document.querySelectorAll('[data-toast-demo]').forEach((button) => {
    button.addEventListener('click', () => {
      const type = button.dataset.toastDemo;
      const text = type === 'error' ? 'Ejemplo de notificación de error.' : 'Ejemplo de notificación de éxito.';
      window.Portfolio?.toast(text, type);
    });
  });
})();
