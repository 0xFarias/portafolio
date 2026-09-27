/* ==========================================================================
   reveal-on-scroll.js — Animaciones controladas.
   Los elementos con [data-reveal] aparecen al entrar en pantalla, una sola
   vez. Respeta la preferencia "reducir movimiento" del sistema.
   ========================================================================== */
(() => {
  'use strict';

  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  // Pequeño escalonado entre elementos hermanos (0, 80, 160, 240 ms)
  items.forEach((item) => {
    const siblings = [...item.parentElement.children].filter((el) => el.hasAttribute('data-reveal'));
    const index = siblings.indexOf(item) % 4;
    item.style.setProperty('--reveal-delay', `${index * 80}ms`);
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((item) => observer.observe(item));
})();
