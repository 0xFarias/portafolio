/* ==========================================================================
   scroll-spy.js — Navegación dinámica.
   Resalta en la barra lateral y en los puntos de la derecha la sección
   que el usuario está viendo, usando IntersectionObserver.
   ========================================================================== */
(() => {
  'use strict';

  const links = document.querySelectorAll('[data-spy]');
  if (!links.length || !('IntersectionObserver' in window)) return;

  const sectionIds = [...new Set([...links].map((link) => link.dataset.spy))];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.dataset.spy === id;
      link.classList.toggle('is-active', active);

      if (active) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  // La sección activa es la que cruza la franja central de la pantalla
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();
