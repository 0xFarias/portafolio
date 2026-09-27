/* ==========================================================================
   project-filter.js — Filtro de proyectos por tecnología.
   Cada chip indica cuántos proyectos usan esa tecnología; al pulsarlo se
   muestran solo las cards cuyo data-tech la incluye.
   ========================================================================== */
(() => {
  'use strict';

  const bar = document.querySelector('.filter-bar');
  const cards = [...document.querySelectorAll('.card-project[data-tech]')];
  const status = document.getElementById('filter-status');

  if (!bar || !cards.length) return;

  const chips = [...bar.querySelectorAll('[data-filter]')];

  const matches = (card, filter) =>
    filter === 'all' || card.dataset.tech.split(' ').includes(filter);

  const chipLabel = (chip) => chip.firstChild.textContent.trim();

  // Contador de proyectos por tecnología
  chips.forEach((chip) => {
    const total = cards.filter((card) => matches(card, chip.dataset.filter)).length;
    const counter = chip.querySelector('[data-count]');
    if (counter) counter.textContent = `(${total})`;
  });

  const applyFilter = (filter) => {
    let visible = 0;

    cards.forEach((card) => {
      const show = matches(card, filter);
      const wasHidden = card.hidden;
      card.hidden = !show;

      if (show) {
        visible += 1;
        // Animación de entrada solo para cards que vuelven a mostrarse
        if (wasHidden) {
          card.classList.remove('is-entering');
          void card.offsetWidth; // reinicia la animación
          card.classList.add('is-entering');
        }
      }
    });

    chips.forEach((chip) => {
      chip.setAttribute('aria-pressed', String(chip.dataset.filter === filter));
    });

    if (status) {
      const active = chips.find((chip) => chip.dataset.filter === filter);
      const noun = visible === 1 ? 'proyecto' : 'proyectos';
      status.textContent =
        filter === 'all'
          ? `Mostrando los ${visible} proyectos.`
          : `Mostrando ${visible} ${noun} con ${chipLabel(active)}.`;
    }
  };

  bar.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-filter]');
    if (chip) applyFilter(chip.dataset.filter);
  });

  cards.forEach((card) => {
    card.addEventListener('animationend', () => card.classList.remove('is-entering'));
  });
})();
