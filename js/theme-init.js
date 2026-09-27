/* ==========================================================================
   theme-init.js
   Se carga en <head> SIN defer para aplicar el tema guardado antes de que
   el navegador pinte la página (evita el "parpadeo" de tema).
   ========================================================================== */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js-enabled');

  let theme = 'dark'; // tema por defecto (identidad visual del portafolio)

  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') {
      theme = saved;
    }
  } catch (error) {
    // localStorage no disponible (modo privado estricto): se usa el tema por defecto
  }

  root.setAttribute('data-theme', theme);
})();
