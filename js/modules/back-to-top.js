/* ==========================================================================
   back-to-top.js — Botón para volver al inicio.
   Aparece tras desplazarse casi una pantalla completa.
   ========================================================================== */
(() => {
  'use strict';

  const button = document.querySelector('.back-to-top');
  if (!button) return;

  const updateVisibility = () => {
    button.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
  };

  button.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    // Devuelve el foco al inicio para usuarios de teclado
    document.querySelector('.brand')?.focus({ preventScroll: true });
  });

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();
})();
