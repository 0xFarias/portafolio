/* ==========================================================================
   mobile-menu.js — Menú responsive (móvil y tablet).
   Abre/cierra el panel de navegación, actualiza aria-expanded y se cierra
   con Escape, al elegir un enlace o al tocar fuera del panel.
   ========================================================================== */
(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const toggle = header?.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');

  if (!header || !toggle || !nav) return;

  const desktopQuery = window.matchMedia('(min-width: 64rem)');
  const isOpen = () => header.classList.contains('is-menu-open');

  const setOpen = (open) => {
    header.classList.toggle('is-menu-open', open);
    document.body.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');

    if (open) {
      nav.querySelector('a')?.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Al elegir una sección, el menú se cierra
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  // Clic sobre el fondo oscuro (pseudo-elemento del header)
  header.addEventListener('click', (event) => {
    if (event.target === header && isOpen()) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Si la ventana pasa a escritorio con el menú abierto, se restablece
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
})();
