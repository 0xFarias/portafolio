/* ==========================================================================
   project-modal.js — Modal con el detalle de cada proyecto.
   Usa el elemento nativo <dialog>. El contenido se toma del <template>
   de cada card, así el HTML sigue siendo la única fuente de contenido.
   ========================================================================== */
(() => {
  'use strict';

  const modal = document.getElementById('project-modal');
  if (!modal || typeof modal.showModal !== 'function') return;

  const titleEl = document.getElementById('modal-title');
  const kickerEl = document.getElementById('modal-kicker');
  const bodyEl = document.getElementById('modal-body');
  const footerEl = document.getElementById('modal-footer');
  let lastTrigger = null;

  const openProject = (card, trigger) => {
    const template = card.querySelector('template[data-project-details]');
    if (!template) return;

    const content = template.content.cloneNode(true);
    const bodySlot = content.querySelector('[data-slot="body"]');
    const footerSlot = content.querySelector('[data-slot="footer"]');

    titleEl.textContent = card.querySelector('.card-project__title')?.textContent.trim() || 'Proyecto';
    kickerEl.textContent = template.dataset.kicker || '';
    bodyEl.replaceChildren(...(bodySlot ? bodySlot.children : []));
    footerEl.replaceChildren(...(footerSlot ? footerSlot.children : []));

    lastTrigger = trigger;
    modal.showModal();
    document.body.classList.add('is-modal-open');
    bodyEl.scrollTop = 0;
  };

  // Cualquier botón con data-project="id-de-la-card" abre el modal
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-project]');
    if (!trigger) return;

    const card = document.getElementById(trigger.dataset.project);
    if (card) openProject(card, trigger);
  });

  modal.addEventListener('click', (event) => {
    const clickedClose = event.target.closest('[data-modal-close]');
    const clickedBackdrop = event.target === modal;
    if (clickedClose || clickedBackdrop) modal.close();
  });

  // Escape cierra el <dialog> de forma nativa; aquí se restaura el foco
  modal.addEventListener('close', () => {
    document.body.classList.remove('is-modal-open');
    lastTrigger?.focus();
  });
})();
